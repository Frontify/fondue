/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { bullets, listItem, paragraph } from '../../../fixtures/editor/list-blocks';
import { ListProbe } from '../../../fixtures/editor/ListProbe';

type ListRte = NonNullable<Window['listRte']>;

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = (page: Page) =>
    expect(page.locator('[data-test-id="fondue-rich-text-editor"]').first()).not.toHaveAttribute('aria-busy');
// ProseMirror writes its selection back to the DOM 20 ms after the surface gains focus, which would undo a key pressed sooner.
const settleFocus = (page: Page) => page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
const caretIn = async (page: Page, text: string, from = 1, to = from) => {
    await surfaceOf(page).focus();
    await settleFocus(page);
    await page.evaluate(
        ([value, start, end]) => {
            const rte = window.listRte as ListRte;
            rte.setSelection(rte.handle, { text: value, from: start, to: end });
        },
        [text, from, to] as const,
    );
};
const commandsOf = (page: Page) =>
    page.evaluate(() => (window.listRte as ListRte).changes.map(({ commandId }) => commandId));
const nested = [bullets(listItem('first'), listItem('second', bullets(listItem('inner one'), listItem('inner two'))))];

test('SPEC-rich-text-react/AC-031 moves focus out of the editor with Tab from a first and a nested first item, which cannot nest', async ({
    mount,
    page,
}) => {
    await mount(<ListProbe blocks={nested} />);
    await ready(page);

    await caretIn(page, 'first');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'After' })).toBeFocused();
    await caretIn(page, 'inner one');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'After' })).toBeFocused();

    expect(await commandsOf(page)).toEqual([]);
});

test('SPEC-rich-text-react/AC-031 indents a nested item that can nest with Tab and outdents it with Shift+Tab, keeping focus', async ({
    mount,
    page,
}) => {
    await mount(<ListProbe blocks={nested} />);
    await ready(page);

    await caretIn(page, 'inner two');
    await page.keyboard.press('Tab');
    await expect(surfaceOf(page)).toBeFocused();
    await expect(surfaceOf(page).locator('ul ul ul li')).toHaveText('inner two');
    await page.keyboard.press('Shift+Tab');
    await expect(surfaceOf(page)).toBeFocused();
    await page.keyboard.press('Shift+Tab');

    await expect(surfaceOf(page).locator(':scope > ul > li')).toHaveText(['first', /^second/, 'inner two']);
    expect(await commandsOf(page)).toEqual(['list.indent', 'list.outdent', 'list.outdent']);
});

test('SPEC-rich-text-react/AC-036 returns focus to the surface with the text selected after the bulleted list toggle', async ({
    mount,
    page,
}) => {
    await mount(<ListProbe blocks={[paragraph('one two three')]} />);
    await ready(page);
    await caretIn(page, 'one two three', 4, 7);

    await page.getByRole('button', { name: 'Bulleted list' }).click();

    await expect(surfaceOf(page)).toBeFocused();
    await expect(surfaceOf(page).locator('ul li')).toHaveText('one two three');
    expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('two');
});

test('SPEC-rich-text-react/AC-092 turns "- " typed in a paragraph into a bulleted list', async ({ mount, page }) => {
    await mount(<ListProbe blocks={[{ type: 'paragraph', attrs: { lang: null } }]} />);
    await ready(page);
    await surfaceOf(page).focus();
    await settleFocus(page);

    await page.keyboard.type('- Logo');

    await expect(surfaceOf(page).locator('ul li')).toHaveText('Logo');
});

test('SPEC-rich-text-react/AC-104 mirrors a nested bulleted list under rtl', async ({ mount, page }, testInfo) => {
    /** How far the nested item's text sits in from the surface edge where the line starts. */
    const startGap = async (dir: 'ltr' | 'rtl') => {
        const editor = await mount(<ListProbe blocks={nested} dir={dir} />);
        await ready(page);
        const gap = await surfaceOf(page).evaluate((surface, rtl) => {
            const text = surface.querySelector('ul ul li p')?.firstChild as Node;
            const range = document.createRange();
            range.selectNodeContents(text);
            const line = range.getBoundingClientRect();
            const box = surface.getBoundingClientRect();
            if (rtl) {
                return box.right - line.right;
            }
            return line.left - box.left;
        }, dir === 'rtl');
        await testInfo.attach(`nested list under ${dir}`, {
            body: await surfaceOf(page).screenshot(),
            contentType: 'image/png',
        });
        await editor.unmount();
        return gap;
    };
    const ltr = await startGap('ltr');
    const rtl = await startGap('rtl');

    expect(ltr).toBeGreaterThan(40);
    expect(Math.abs(rtl - ltr)).toBeLessThanOrEqual(2);
});
