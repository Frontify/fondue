/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import { bullets, listItem, numbered, paragraph } from '#/react/__tests__/fixtures/listBlocks';
import { ListProbe } from '#/react/__tests__/fixtures/ListProbe';

type ListRte = NonNullable<Window['listRte']>;

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.listRte !== undefined)).toBe(true);
};
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

test('moves focus out of the editor with Tab from a first and a nested first item, which cannot nest', async ({
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

test('indents a nested item that can nest with Tab and outdents it with Shift+Tab, keeping focus', async ({
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

test('returns focus to the surface with the text selected after the bulleted list toggle', async ({ mount, page }) => {
    await mount(<ListProbe blocks={[paragraph('one two three')]} />);
    await ready(page);
    await caretIn(page, 'one two three', 4, 7);

    await page.getByRole('button', { name: 'Bulleted list' }).click();

    await expect(surfaceOf(page)).toBeFocused();
    await expect(surfaceOf(page).locator('ul li')).toHaveText('one two three');
    expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('two');
});

test('turns "- " typed in a paragraph into a bulleted list', async ({ mount, page }) => {
    await mount(<ListProbe blocks={[{ type: 'paragraph', attrs: { lang: null } }]} />);
    await ready(page);
    await surfaceOf(page).focus();
    await settleFocus(page);

    await page.keyboard.type('- Logo');

    await expect(surfaceOf(page).locator('ul li')).toHaveText('Logo');
});

test('mirrors a nested bulleted list under rtl', async ({ mount, page }, testInfo) => {
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

/** Four levels of each kind: `o1` to `o4` in ordered lists, `b1` to `b4` in bulleted lists. */
const fourLevels = [
    numbered(1, listItem('o1', numbered(1, listItem('o2', numbered(1, listItem('o3', numbered(1, listItem('o4')))))))),
    bullets(listItem('b1', bullets(listItem('b2', bullets(listItem('b3', bullets(listItem('b4')))))))),
];
/** Each item's list marker type, and its marker colour and size beside the item's own. */
const markersOf = (root: Locator) =>
    root.evaluate((element) =>
        [...element.querySelectorAll('li')].map((item) => {
            const marker = getComputedStyle(item, '::marker');
            const own = getComputedStyle(item);
            return {
                text: item.querySelector('p')?.textContent,
                type: getComputedStyle(item.parentElement as Element).listStyleType,
                color: marker.color === own.color ? 'text' : marker.color,
                size: marker.fontSize === own.fontSize ? 'text' : marker.fontSize,
            };
        }),
    );
const readerOf = (page: Page) => page.getByRole('region', { name: 'Reader' });

test('marks a four-level list by depth with the default list levels in the editor and the reader', async ({
    mount,
    page,
}, testInfo) => {
    await mount(<ListProbe blocks={fourLevels} reader />);
    await ready(page);
    await testInfo.attach('default list levels', {
        body: await surfaceOf(page).screenshot(),
        contentType: 'image/png',
    });

    const expected = [
        ['o1', 'decimal'],
        ['o2', 'lower-alpha'],
        ['o3', 'lower-roman'],
        ['o4', 'decimal'],
        ['b1', 'disc'],
        ['b2', 'circle'],
        ['b3', 'square'],
        ['b4', 'disc'],
    ].map(([text, type]) => ({ text, type, color: 'text', size: 'text' }));
    expect(await markersOf(surfaceOf(page))).toEqual(expected);
    expect(await markersOf(readerOf(page))).toEqual(expected);
});

test('marks a four-level list by depth with a custom listLevels, entry n modulo its length, in the editor and the reader', async ({
    mount,
    page,
}, testInfo) => {
    const listLevels = {
        ordered: [{ counterType: 'upper-roman', color: 'rgb(200, 0, 0)' }, { counterType: 'lower-greek' }],
        bullet: [{ shape: 'square', color: 'rgb(0, 0, 200)', size: '24px' }, { shape: 'circle' }],
    };
    await mount(<ListProbe blocks={fourLevels} listLevels={listLevels} reader />);
    await ready(page);
    await testInfo.attach('custom list levels', { body: await surfaceOf(page).screenshot(), contentType: 'image/png' });

    const red = { color: 'rgb(200, 0, 0)', size: 'text' };
    const blue = { color: 'rgb(0, 0, 200)', size: '24px' };
    const plain = { color: 'text', size: 'text' };
    const expected = [
        { text: 'o1', type: 'upper-roman', ...red },
        { text: 'o2', type: 'lower-greek', ...plain },
        { text: 'o3', type: 'upper-roman', ...red },
        { text: 'o4', type: 'lower-greek', ...plain },
        { text: 'b1', type: 'square', ...blue },
        { text: 'b2', type: 'circle', ...plain },
        { text: 'b3', type: 'square', ...blue },
        { text: 'b4', type: 'circle', ...plain },
    ];
    expect(await markersOf(surfaceOf(page))).toEqual(expected);
    expect(await markersOf(readerOf(page))).toEqual(expected);
});
