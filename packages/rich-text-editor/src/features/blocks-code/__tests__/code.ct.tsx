/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { CodeProbe } from '#/react/__tests__/fixtures/CodeProbe';

type CodeRte = NonNullable<Window['codeRte']>;

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.codeRte !== undefined)).toBe(true);
};
const text = (value: string) => ({ type: 'text', text: value });
const code = (value: string, languageId: string | null = null) => ({
    type: 'code_block',
    attrs: { languageId },
    content: [text(value)],
});
const contentOf = (page: Page) =>
    page.evaluate(() => (window.codeRte as CodeRte).handle.getSnapshot().document.content.content);

test('keeps a pasted tab and typed spaces, and turns autocorrect off on the code', async ({ mount, page }) => {
    await mount(<CodeProbe blocks={[code('let')]} />);
    await ready(page);
    const codeText = surfaceOf(page).locator('code');
    await codeText.click();
    await page.evaluate(() => {
        const rte = window.codeRte as CodeRte;
        rte.setSelection(rte.handle, { text: 'let', from: 3, to: 3 });
    });

    await page.evaluate(() => {
        const data = new DataTransfer();
        data.setData('text/plain', '\t');
        const surface = document.querySelector('[contenteditable="true"]');
        surface?.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }));
    });
    await page.keyboard.type('   ');

    await expect(codeText).toHaveAttribute('autocorrect', 'off');
    await expect(codeText).toHaveAttribute('autocapitalize', 'off');
    expect(await contentOf(page)).toEqual([code('let\t   ')]);
});

test('moves focus out of the surface on Tab, and indents then outdents with Mod-] and Mod-[', async ({
    mount,
    page,
}) => {
    await mount(<CodeProbe blocks={[code('keep')]} />);
    await ready(page);
    await surfaceOf(page).locator('code').click();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'After' })).toBeFocused();

    await surfaceOf(page).locator('code').click();
    await page.keyboard.press('ControlOrMeta+]');
    expect(await contentOf(page)).toEqual([code('  keep')]);
    await page.keyboard.press('ControlOrMeta+[');
    expect(await contentOf(page)).toEqual([code('keep')]);
});

test('names the language menu and Copy, copies the plain text, and sets the language in one undo step', async ({
    mount,
    page,
    context,
    browserName,
}) => {
    test.skip(browserName !== 'chromium', 'Playwright grants the clipboard in Chromium.');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await mount(<CodeProbe blocks={[code('const value = 1;')]} />);
    await ready(page);
    await surfaceOf(page).locator('code').click();

    await expect(page.getByRole('button', { name: 'Language: Plain text' })).toBeVisible();
    await page.getByRole('button', { name: 'Copy code' }).click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe('const value = 1;');

    await page.getByRole('button', { name: 'Language: Plain text' }).click();
    await page.getByRole('menuitemradio', { name: 'TypeScript' }).click();
    const changes = await page.evaluate(() => [...(window.codeRte as CodeRte).changes]);
    expect(await contentOf(page)).toEqual([code('const value = 1;', 'typescript')]);
    expect(changes).toHaveLength(1);

    await page.evaluate(() => (window.codeRte as CodeRte).handle.execute('history.undo'));
    expect(await contentOf(page)).toEqual([code('const value = 1;')]);
});

test('reaches the language menu with Alt+F10, opens it on the checked language, and returns focus to it on close', async ({
    mount,
    page,
}) => {
    await mount(<CodeProbe blocks={[code('one', 'typescript')]} />);
    await ready(page);
    await surfaceOf(page).locator('code').click();
    const trigger = page.getByRole('button', { name: 'Language: TypeScript' });

    await page.keyboard.press('Alt+F10');
    await expect(trigger).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('button', { name: 'Copy code' })).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expect(trigger).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menuitemradio', { name: 'TypeScript' })).toHaveAttribute('aria-checked', 'true');
    await page.keyboard.press('Escape');

    await expect(page.getByRole('menu')).toHaveCount(0);
    await expect(trigger).toBeFocused();
    expect(await contentOf(page)).toEqual([code('one', 'typescript')]);
});
