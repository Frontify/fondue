/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import { press, pressUntil, ready, surfaceOf, toolbarOf } from './fixtures/layout';
import { ProfileProbe } from './fixtures/ProfileProbe';

/** Presses `key` until `control` has focus. */
const pressUntilFocused = async (page: Page, key: string, control: Locator) => {
    for (let step = 0; step < 20; step += 1) {
        if (await control.evaluate((element) => element === element.ownerDocument.activeElement)) {
            return;
        }
        await press(page, key);
    }
    throw new Error(`${key} never focused the control.`);
};

/** The stored content of the probe's document. */
const contentOf = (page: Page) =>
    page.evaluate(() => window.profileProbe?.handle?.getSnapshot().document.content.content as unknown);

/** Types `text` into an empty Document editor and selects its last word with Shift and the arrows. */
const typeAndSelect = async (page: Page, text: string, word: string) => {
    await surfaceOf(page).focus();
    await page.keyboard.insertText(text);
    // An arrow pressed before the editor reads the inserted text moves from a stale caret, so wait for its document.
    await expect.poll(async () => JSON.stringify(await contentOf(page))).toContain(JSON.stringify(text));
    for (let step = 0; step < word.length; step += 1) {
        await press(page, 'Shift+ArrowLeft');
    }
    await expect.poll(() => page.evaluate(() => window.getSelection()?.toString())).toBe(word);
};

/** Runs the toolbar item `name` by Alt+F10 and the arrows, or its More row when the toolbar does not show it. */
const runByKeyboard = async (page: Page, name: string) => {
    await press(page, 'Alt+F10');
    await press(page, 'Home');
    if ((await toolbarOf(page).getByRole('button', { name, exact: true }).count()) > 0) {
        await pressUntil(page, 'ArrowRight', name);
    } else {
        await press(page, 'End');
        await press(page, 'Enter');
        await expect(page.getByRole('menu')).toBeVisible();
        await pressUntil(page, 'ArrowDown', name);
    }
    await press(page, 'Enter');
};

test.describe('in the Document profile, by keyboard alone', () => {
    test('sets a heading level from the text style picker', async ({ mount, page }) => {
        await mount(<ProfileProbe profile="document" />);
        await ready(page);
        await surfaceOf(page).focus();
        await page.keyboard.insertText('Results');

        await runByKeyboard(page, 'Normal text');
        await expect(page.getByRole('menu')).toBeVisible();
        await pressUntil(page, 'ArrowDown', 'Heading 2');
        await press(page, 'Enter');

        await expect(surfaceOf(page).locator('h2')).toHaveText('Results');
    });

    test('sets the text of a link in the link popover', async ({ mount, page }) => {
        await mount(<ProfileProbe profile="document" />);
        await ready(page);
        await typeAndSelect(page, 'Read the guide', 'guide');

        await runByKeyboard(page, 'Link');
        const popover = page.getByRole('dialog');
        await expect(popover.getByRole('textbox', { name: 'URL' })).toBeFocused();
        await page.keyboard.type('frontify.com');
        await pressUntilFocused(page, 'Tab', popover.getByRole('textbox', { name: 'Text', exact: true }));
        await press(page, 'ControlOrMeta+a');
        await page.keyboard.type('the brand guide');
        await press(page, 'Enter');

        await expect(popover).toHaveCount(0);
        await expect(surfaceOf(page).getByRole('link', { name: 'the brand guide' })).toHaveCount(1);
    });

    test('sets the language and direction of a passage in the language dialog', async ({ mount, page }) => {
        await mount(<ProfileProbe profile="document" />);
        await ready(page);
        await typeAndSelect(page, 'Say marhaba', 'marhaba');

        await runByKeyboard(page, 'Language');
        const dialog = page.getByRole('dialog', { name: 'Language' });
        // The profile offers no language list, so the dialog asks for a tag.
        await pressUntilFocused(page, 'Tab', dialog.getByRole('textbox', { name: 'Language tag' }));
        await page.keyboard.type('ar');
        await press(page, 'Tab');
        await expect(dialog.getByRole('radio', { name: 'None' })).toBeFocused();
        await press(page, 'ArrowRight');
        await press(page, 'ArrowRight');
        await expect(dialog.getByRole('radio', { name: 'Right to left' })).toBeFocused();
        await press(page, 'Space');
        // Enter in the tag field submits the form; WebKit's Tab skips buttons.
        await press(page, 'Shift+Tab');
        await press(page, 'Enter');

        await expect(dialog).toHaveCount(0);
        await expect(surfaceOf(page).locator('span[lang="ar"][dir="rtl"]')).toHaveText('marhaba');
    });
});

test.describe('on an image, by keyboard alone', () => {
    /** Inserts an image from the toolbar by keyboard, which leaves it selected. */
    const insertImage = async (page: Page) => {
        await surfaceOf(page).focus();
        await page.keyboard.insertText('Before');
        await runByKeyboard(page, 'Image');
        await expect(surfaceOf(page).locator('figure')).toHaveCount(1);
    };
    const imageAttrs = async (page: Page) => {
        const content = (await contentOf(page)) as readonly {
            readonly type: string;
            readonly content?: readonly { readonly attrs: Readonly<Record<string, unknown>> }[];
        }[];
        const figure = content.find(({ type }) => type === 'figure');
        const children = figure?.content;
        const first = children?.[0];
        return first?.attrs;
    };
    /** Opens the image's alternative text dialog from its chrome by Alt+F10 and the arrows. */
    const openAltText = async (page: Page) => {
        // The image ends the document, so ArrowLeft from the end selects it.
        await surfaceOf(page).focus();
        await press(page, 'ControlOrMeta+End');
        await press(page, 'ArrowLeft');
        await press(page, 'Alt+F10');
        await pressUntil(page, 'ArrowRight', 'Add alternative text');
        await press(page, 'Enter');
        await expect(page.getByRole('dialog', { name: 'Alternative text' })).toBeVisible();
    };

    test('sets meaningful alternative text in the alternative text dialog', async ({ mount, page }) => {
        await mount(<ProfileProbe profile="document" withServices />);
        await ready(page);
        await insertImage(page);

        await openAltText(page);
        await expect(page.getByRole('radio', { name: /^Meaningful/ })).toBeFocused();
        await pressUntilFocused(page, 'Tab', page.getByRole('textbox', { name: 'Alternative text' }));
        await page.keyboard.type('Our logo on a white wall');
        // Enter submits the dialog's form; WebKit's Tab skips buttons.
        await press(page, 'Enter');

        await expect
            .poll(() => imageAttrs(page))
            .toMatchObject({
                altIntent: 'meaningful',
                altText: 'Our logo on a white wall',
            });
    });

    test('marks an image decorative in the alternative text dialog', async ({ mount, page, browserName }) => {
        await mount(<ProfileProbe profile="document" withServices />);
        await ready(page);
        await insertImage(page);

        await openAltText(page);
        await expect(page.getByRole('radio', { name: /^Meaningful/ })).toBeFocused();
        await press(page, 'ArrowDown');
        await press(page, ' ');
        await expect(page.getByRole('radio', { name: /^Decorative/ })).toBeChecked();
        // Safari's Tab skips buttons, which Option+Tab reaches.
        let tab = 'Tab';
        if (browserName === 'webkit') {
            tab = 'Alt+Tab';
        }
        await pressUntil(page, tab, 'Save');
        await press(page, 'Enter');

        await expect.poll(() => imageAttrs(page)).toMatchObject({ altIntent: 'decorative', altText: '' });
    });
});
