/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { MentionProbe } from './fixtures/MentionProbe';

type MentionRte = NonNullable<Window['mentionRte']>;

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const listOf = (page: Page) => page.getByRole('listbox', { name: 'Mention suggestions' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.mentionRte !== undefined)).toBe(true);
};
/** Puts the caret after `text` in the focused surface. */
const caretAfter = async (page: Page, text: string) => {
    await surfaceOf(page).click();
    await page.evaluate((after) => {
        const rte = window.mentionRte as MentionRte;
        rte.setSelection(rte.handle, { text: after, from: after.length, to: after.length });
    }, text);
};
/** The node types of the first paragraph, with each text and mention label. */
const inlineOf = (page: Page) =>
    page.evaluate(() => {
        const rte = window.mentionRte as MentionRte;
        const [first] = rte.handle.getSnapshot().document.content.content ?? [];
        const content = first?.content;
        return (content ?? []).map((node) =>
            node.type === 'mention'
                ? `@${typeof node.attrs?.labelSnapshot === 'string' ? node.attrs.labelSnapshot : ''}`
                : (node.text ?? ''),
        );
    });

test('commits an IME candidate into the mention query on Enter without choosing a result @engine', async ({
    mount,
    page,
    browserName,
}) => {
    test.skip(browserName !== 'chromium', 'CDP drives composition in Chromium only.');
    await mount(<MentionProbe />);
    await ready(page);
    await caretAfter(page, 'Hi');
    await page.keyboard.type(' @');
    await expect(listOf(page).getByRole('option')).toHaveCount(3);
    const cdp = await page.context().newCDPSession(page);

    await cdp.send('Input.imeSetComposition', { text: 'gra', selectionStart: 3, selectionEnd: 3 });
    // The Enter that confirms a candidate is a composition keydown, as Chromium sends it.
    await page.evaluate(() => {
        const event = new KeyboardEvent('keydown', {
            key: 'Enter',
            isComposing: true,
            bubbles: true,
            cancelable: true,
        });
        Object.defineProperty(event, 'keyCode', { get: () => 229 });
        document.activeElement?.dispatchEvent(event);
    });
    await cdp.send('Input.insertText', { text: 'gra' });

    await expect.poll(() => inlineOf(page)).toEqual(['Hi @gra']);
    await expect(listOf(page).getByRole('option')).toHaveText(['Grace Hopperuser']);
    await expect(surfaceOf(page)).toBeFocused();
});

test('inserts a mention through the toolbar search dialog by keyboard only, at the caret it opened from', async ({
    mount,
    page,
}) => {
    await mount(<MentionProbe />);
    await ready(page);
    await caretAfter(page, 'Hi');
    await page.keyboard.type(' ');

    await page.keyboard.press('Alt+F10');
    await expect(page.getByRole('button', { name: 'Mention' })).toBeFocused();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Mention' });
    const field = dialog.getByRole('combobox', { name: 'Search to mention' });
    await expect(field).toBeFocused();
    await page.keyboard.type('a');
    await expect(dialog.getByRole('option')).toHaveCount(3);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(dialog).toHaveCount(0);
    await expect.poll(() => inlineOf(page)).toEqual(['Hi ', '@Grace Hopper', ' ']);
    await expect(surfaceOf(page)).toBeFocused();
});

test('closes the mention search dialog on Escape with no change and returns focus to its toolbar button', async ({
    mount,
    page,
}) => {
    await mount(<MentionProbe />);
    await ready(page);
    await caretAfter(page, 'Hi');
    await page.keyboard.press('Alt+F10');
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Mention' });
    await expect(dialog.getByRole('combobox', { name: 'Search to mention' })).toBeFocused();
    // A modal dialog holds focus.
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(dialog.locator(':focus')).toHaveCount(1);

    // Radix arms its Escape listener two commits after the dialog opens; a loaded run can press before that.
    await expect(async () => {
        await page.keyboard.press('Escape');
        await expect(dialog).toHaveCount(0, { timeout: 1000 });
    }).toPass({ timeout: 5000 });
    await expect(page.getByRole('button', { name: 'Mention' })).toBeFocused();
    expect(await inlineOf(page)).toEqual(['Hi']);
});

/** Whether the element `aria-describedby` names on `dialog`, when there is one, holds a focusable element. */
const describedControls = (dialog: ReturnType<Page['getByRole']>) =>
    dialog.evaluate((element) => {
        const description = element.ownerDocument.getElementById(element.getAttribute('aria-describedby') ?? '');
        const found = description?.querySelectorAll('button, input, select, textarea, [href], [tabindex]').length;
        return found ?? 0;
    });

test('names the mention search dialog by its heading, with no description that holds a control', async ({
    mount,
    page,
}) => {
    await mount(<MentionProbe />);
    await ready(page);
    await caretAfter(page, 'Hi');
    await page.keyboard.press('Alt+F10');
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Mention' });

    const heading = await dialog.getByRole('heading').textContent();
    await expect(dialog).toHaveAccessibleName(heading ?? '');
    expect(await describedControls(dialog)).toBe(0);
});

test.describe('on a touch device', () => {
    test.use({ isMobile: true, hasTouch: true, viewport: { width: 390, height: 844 } });

    test('closes the mention search dialog with its visible close control, with no change and focus on its toolbar button', async ({
        mount,
        page,
        browserName,
    }) => {
        test.skip(browserName === 'firefox', 'Firefox has no mobile emulation.');
        await mount(<MentionProbe />);
        await ready(page);
        await caretAfter(page, 'Hi');
        await page.keyboard.press('Alt+F10');
        await page.keyboard.press('Enter');
        const dialog = page.getByRole('dialog', { name: 'Mention' });
        await dialog.getByRole('combobox', { name: 'Search to mention' }).fill('gra');
        const close = dialog.getByRole('button', { name: 'Close' });
        await expect(close).toBeVisible();

        await close.tap();

        await expect(dialog).toHaveCount(0);
        await expect(page.getByRole('button', { name: 'Mention' })).toBeFocused();
        expect(await inlineOf(page)).toEqual(['Hi']);
    });
});

test('accepts the active option on Tab, and on Shift+Tab closes the list, keeps the text and moves focus back', async ({
    mount,
    page,
}) => {
    await mount(<MentionProbe />);
    await ready(page);
    await caretAfter(page, 'Hi');
    await page.keyboard.type(' @ad');
    await expect(listOf(page).getByRole('option')).toHaveCount(1);

    await page.keyboard.press('Tab');
    await expect(listOf(page)).toHaveCount(0);
    await expect.poll(() => inlineOf(page)).toEqual(['Hi ', '@Ada Lovelace', ' ']);
    await expect(surfaceOf(page)).toBeFocused();

    await page.keyboard.type('@gr');
    await expect(listOf(page).getByRole('option')).toHaveCount(1);
    await page.keyboard.press('Shift+Tab');

    await expect(listOf(page)).toHaveCount(0);
    await expect.poll(() => inlineOf(page)).toEqual(['Hi ', '@Ada Lovelace', ' @gr']);
    await expect(surfaceOf(page)).not.toBeFocused();
});

test('keeps a mention whole while the arrow keys cross it, and deletes it whole with one Backspace after it', async ({
    mount,
    page,
}) => {
    await mount(<MentionProbe content="mention" />);
    await ready(page);
    await caretAfter(page, 'Ask');
    for (const key of ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft']) {
        await page.keyboard.press(key);
    }
    await expect(surfaceOf(page).locator('[data-rte-chrome] > span')).toHaveText('@Ada');
    expect(await inlineOf(page)).toEqual(['Ask ', '@Ada', ' now']);
    await page.evaluate(() => {
        const rte = window.mentionRte as MentionRte;
        rte.setSelection(rte.handle, { text: ' now', from: 0, to: 0 });
    });
    await page.keyboard.press('Backspace');

    await expect.poll(() => inlineOf(page)).toEqual(['Ask  now']);
    await expect(surfaceOf(page)).toBeFocused();
});

test('keeps the mention chip apart from the text around it by a border in forced colours', async ({
    mount,
    page,
    browserName,
}) => {
    test.skip(browserName === 'webkit', 'WebKit has no forced colours mode.');
    await page.emulateMedia({ forcedColors: 'active' });
    await mount(<MentionProbe content="mention" />);
    await ready(page);
    const chip = surfaceOf(page).locator('[data-rte-chrome] > span');
    await expect(chip).toHaveText('@Ada');

    const border = await chip.evaluate((element) => {
        const style = getComputedStyle(element);
        return { style: style.borderTopStyle, width: Number.parseFloat(style.borderTopWidth) };
    });

    expect(border.style).toBe('solid');
    expect(border.width).toBeGreaterThan(0);
});
