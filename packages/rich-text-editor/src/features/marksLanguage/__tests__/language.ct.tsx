/* (c) Copyright Frontify Ltd., all rights reserved. */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import { LanguageProbe } from './fixtures/LanguageProbe';

type LanguageRte = NonNullable<Window['languageRte']>;

// The tags the accessibility suite checks.
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const dialogOf = (page: Page) => page.getByRole('dialog', { name: 'Language' });
const toolbarButton = (page: Page) => page.getByRole('toolbar').getByRole('button', { name: 'Language' });
const moreButton = (page: Page) => page.getByRole('button', { name: 'More' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.languageRte !== undefined)).toBe(true);
};
// ProseMirror writes its selection back to the DOM 20 ms after the surface gains focus, which would undo a key pressed sooner.
const settleFocus = (page: Page) => page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
const caretInPassage = async (page: Page) => {
    await surfaceOf(page).focus();
    await settleFocus(page);
    await page.evaluate(() => {
        const rte = window.languageRte as LanguageRte;
        rte.setSelection(rte.handle, { text: '你好', from: 1, to: 1 });
    });
};
const languageOf = (page: Page) =>
    page.evaluate(
        () =>
            (window.languageRte as LanguageRte).handle.getSnapshot().document.content.content?.[0]?.content?.[1]
                ?.marks?.[0]?.attrs?.lang,
    );

/** Opens the dialog from the More menu by keyboard. */
const openFromMore = async (page: Page) => {
    await page.keyboard.press('Alt+F10');
    await page.keyboard.press('End');
    await expect(moreButton(page)).toBeFocused();
    // Radix moves focus for End in a timer, which would pull it out of a menu opened before it fires when More already had focus.
    await settleFocus(page);
    await page.keyboard.press('Enter');
    // Radix focuses the first item in a timer; focusing Language before it lands loses to it on a loaded run.
    await expect(page.getByRole('menuitem').first()).toBeFocused();
    await page.getByRole('menuitem', { name: 'Language' }).focus();
    await expect(page.getByRole('menuitem', { name: 'Language' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(dialogOf(page)).toBeVisible();
    // The closing menu hands focus on in a timer, so keys wait for it as for the surface.
    await settleFocus(page);
};

test('returns focus to the toolbar button on Cancel and Escape, and to the surface on Apply', async ({
    mount,
    page,
}) => {
    await mount(<LanguageProbe inToolbar />);
    await ready(page);
    await caretInPassage(page);

    await toolbarButton(page).click();
    await expect(dialogOf(page).getByRole('radio', { name: 'Chinese' })).toBeFocused();
    await dialogOf(page).getByRole('button', { name: 'Cancel' }).click();
    await expect(dialogOf(page)).toHaveCount(0);
    await expect(toolbarButton(page)).toBeFocused();

    await toolbarButton(page).click();
    await expect(dialogOf(page)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialogOf(page)).toHaveCount(0);
    await expect(toolbarButton(page)).toBeFocused();

    await toolbarButton(page).click();
    await dialogOf(page).getByRole('radio', { name: 'German' }).check();
    await dialogOf(page).getByRole('button', { name: 'Apply' }).click();
    await expect(dialogOf(page)).toHaveCount(0);
    await expect(surfaceOf(page)).toBeFocused();
    expect(await languageOf(page)).toBe('de');
});

/** The focusable elements inside the element `aria-describedby` names on `dialog`, none when it names none. */
const describedControls = (dialog: Locator) =>
    dialog.evaluate((element) => {
        const description = element.ownerDocument.getElementById(element.getAttribute('aria-describedby') ?? '');
        const found = description?.querySelectorAll('button, input, select, textarea, [href], [tabindex]').length;
        return found ?? 0;
    });

test('names the language dialog by its heading, with no description that holds a control', async ({ mount, page }) => {
    await mount(<LanguageProbe inToolbar />);
    await ready(page);
    await caretInPassage(page);

    await toolbarButton(page).click();

    const heading = await dialogOf(page).getByRole('heading').textContent();
    await expect(dialogOf(page)).toHaveAccessibleName(heading ?? '');
    expect(await describedControls(dialogOf(page))).toBe(0);
});

test.describe('on a touch device', () => {
    test.use({ isMobile: true, hasTouch: true, viewport: { width: 390, height: 844 } });

    test('closes the language dialog with its visible close control, with no change and focus on its toolbar button', async ({
        mount,
        page,
        browserName,
    }) => {
        test.skip(browserName === 'firefox', 'Firefox has no mobile emulation.');
        await mount(<LanguageProbe inToolbar />);
        await ready(page);
        await caretInPassage(page);
        const before = await languageOf(page);
        await toolbarButton(page).tap();
        await dialogOf(page).getByRole('radio', { name: 'German' }).check();
        const close = dialogOf(page).getByRole('button', { name: 'Close' });
        await expect(close).toBeVisible();

        await close.tap();

        await expect(dialogOf(page)).toHaveCount(0);
        await expect(toolbarButton(page)).toBeFocused();
        expect(await languageOf(page)).toBe(before);
    });
});

test('returns focus to More on Escape, and to the surface on Apply, when More opened the dialog', async ({
    mount,
    page,
}) => {
    await mount(<LanguageProbe />);
    await ready(page);
    await caretInPassage(page);

    await openFromMore(page);
    await page.keyboard.press('Escape');
    await expect(dialogOf(page)).toHaveCount(0);
    await expect(moreButton(page)).toBeFocused();

    await openFromMore(page);
    await expect(dialogOf(page).getByRole('radio', { name: 'Chinese' })).toBeFocused();
    // Radix checks the radio it moves to only while the arrow key is still held, and a press releases it at once.
    await page.keyboard.down('ArrowUp');
    await expect(dialogOf(page).getByRole('radio', { name: 'Vietnamese' })).toBeChecked();
    await page.keyboard.up('ArrowUp');
    await page.keyboard.press('Enter');
    await expect(dialogOf(page)).toHaveCount(0);
    await expect(surfaceOf(page)).toBeFocused();
    expect(await languageOf(page)).toBe('vi');
});

test('scrolls the language list inside the dialog and keeps the focused radio in view', async ({ mount, page }) => {
    await page.setViewportSize({ width: 800, height: 480 });
    await mount(<LanguageProbe inToolbar />);
    await ready(page);
    await caretInPassage(page);

    await toolbarButton(page).click();
    const dialog = dialogOf(page);
    const chinese = dialog.getByRole('radio', { name: 'Chinese' });
    await expect(chinese).toBeFocused();
    await expect(chinese).toBeInViewport();
    await expect(dialog.getByRole('button', { name: 'Apply' })).toBeInViewport();
    const list = await dialog.getByRole('radiogroup', { name: 'Language tag' }).evaluate((group) => {
        const options = group.querySelector('div');
        const scrollTop = options?.scrollTop;
        return {
            scrolls: options !== null && options.scrollHeight > options.clientHeight,
            scrolled: scrollTop ?? 0,
        };
    });
    expect(list.scrolls).toBe(true);
    expect(list.scrolled).toBeGreaterThan(0);

    const afrikaans = dialog.getByRole('radio', { name: 'Afrikaans' });
    await afrikaans.focus();
    await expect(afrikaans).toBeFocused();
    await expect(afrikaans).toBeInViewport();
});

test('shows the direction as a Fondue segmented control and the languages as a Fondue radio list', async ({
    mount,
    page,
}) => {
    await mount(<LanguageProbe inToolbar />);
    await ready(page);
    await caretInPassage(page);

    await toolbarButton(page).click();
    const dialog = dialogOf(page);
    const direction = dialog.getByRole('radiogroup', { name: 'Direction' });
    await expect(direction).toHaveAttribute('data-hug-width', 'false');
    await expect(direction.getByRole('radio')).toHaveCount(4);
    await expect(direction.getByRole('radio', { name: 'None' })).toBeChecked();
    await direction.getByRole('radio', { name: 'Right to left' }).click();
    await expect(direction.getByRole('radio', { name: 'Right to left' })).toBeChecked();
    await expect(direction.getByRole('radio', { name: 'None' })).not.toBeChecked();

    const languages = dialog.getByRole('radiogroup', { name: 'Language tag' });
    await expect(languages.getByRole('radio', { name: 'Chinese' })).toBeChecked();
    await expect(languages.getByRole('radio', { name: 'German' })).not.toBeChecked();
    await languages.getByRole('radio', { name: 'German' }).click();
    await expect(languages.getByRole('radio', { name: 'German' })).toBeChecked();
    await expect(languages.getByRole('radio', { name: 'Chinese' })).not.toBeChecked();

    await dialog.getByRole('button', { name: 'Apply' }).click();
    await expect(dialog).toHaveCount(0);
    expect(await languageOf(page)).toBe('de');
});

test('reports no axe violation with the language dialog open', async ({ mount, page }) => {
    await mount(<LanguageProbe inToolbar />);
    await ready(page);
    await caretInPassage(page);

    await toolbarButton(page).click();
    await expect(dialogOf(page).getByRole('radio', { name: 'Chinese' })).toBeFocused();
    // Overlays fade in, so axe reads the dialog once its finite animations have ended.
    await page.evaluate(() =>
        Promise.allSettled(
            document
                .getAnimations()
                .filter((animation) => animation.effect?.getComputedTiming().endTime !== Infinity)
                .map((animation) => animation.finished),
        ),
    );

    const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
    expect(violations.map(({ id, nodes }) => `${id}: ${nodes.map(({ html }) => html).join(' | ')}`)).toEqual([]);
});
