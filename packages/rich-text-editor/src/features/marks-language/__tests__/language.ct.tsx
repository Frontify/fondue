/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { LanguageProbe } from './fixtures/LanguageProbe';

type LanguageRte = NonNullable<Window['languageRte']>;

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
    await page.keyboard.press('Enter');
    await page.getByRole('menuitem', { name: 'Language' }).focus();
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
    await page.keyboard.press('ArrowUp');
    await expect(dialogOf(page).getByRole('radio', { name: 'Vietnamese' })).toBeChecked();
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
        return {
            scrolls: options !== null && options.scrollHeight > options.clientHeight,
            scrolled: options?.scrollTop ?? 0,
        };
    });
    expect(list.scrolls).toBe(true);
    expect(list.scrolled).toBeGreaterThan(0);

    // Arrow keys between native radios belong to the browser, and WebKit's differ, so focus is moved directly.
    const afrikaans = dialog.getByRole('radio', { name: 'Afrikaans' });
    await afrikaans.focus();
    await expect(afrikaans).toBeFocused();
    await expect(afrikaans).toBeInViewport();
});
