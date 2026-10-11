/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import { ColumnsProbe } from './fixtures/ColumnsProbe';

// Layout is asserted with element boxes, since no component test of the package stores screenshots.

const editorOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const readerOf = (page: Page) => page.getByRole('region', { name: 'Reader' }).locator('.fondue-rte-content');
const ready = async (page: Page) => {
    await expect(editorOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).not.toHaveAttribute('aria-busy');
};

/** The box of the paragraph that holds `text`. */
const boxOf = async (root: Locator, text: string) => {
    const box = await root.locator('p', { hasText: text }).boundingBox();
    if (box === null) {
        throw new Error(`The paragraph ${text} has no box.`);
    }
    return box;
};

/** The left edge of each named paragraph, rounded to whole pixels. */
const columnStarts = async (root: Locator, texts: readonly string[]) => {
    const starts: number[] = [];
    for (const text of texts) {
        const box = await boxOf(root, text);
        starts.push(Math.round(box.x));
    }
    return starts;
};

/** Adds a host stylesheet before every other one, so the package rules come later in the cascade. */
const hostStylesheet = (page: Page, css: string) =>
    page.evaluate((source) => {
        const style = document.createElement('style');
        style.textContent = source;
        document.head.prepend(style);
    }, css);

const noSidewaysScroll = (page: Page) =>
    page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);

test('lays the editor and reader out as two columns, the first break active and the later two inactive', async ({
    mount,
    page,
}) => {
    await mount(<ColumnsProbe columns={2} breaks={3} width="1000px" />);
    await ready(page);
    const editor = editorOf(page);
    const breaks = editor.getByRole('separator');

    await expect(editor).toHaveAttribute('data-rte-columns-fit', '');
    await expect(breaks.nth(0)).toHaveAccessibleName('Column break');
    await expect(breaks.nth(1)).toHaveAccessibleName('Column break, inactive');
    await expect(breaks.nth(2)).toHaveAccessibleName('Column break, inactive');
    for (const root of [editor, readerOf(page)]) {
        const [one = 0, two = 0, three, four] = await columnStarts(root, ['One', 'Two', 'Three', 'Four']);
        const { width } = await boxOf(root, 'One');

        expect(two).toBeGreaterThanOrEqual(one + width);
        expect([three, four]).toEqual([two, two]);
    }
    await expect(readerOf(page).locator('[data-rte-column-break="active"]')).toHaveCount(1);
});

test('lays the editor and reader out as three columns, the third break inactive', async ({ mount, page }) => {
    await mount(<ColumnsProbe columns={3} breaks={3} width="1000px" />);
    await ready(page);
    const editor = editorOf(page);
    const breaks = editor.getByRole('separator');

    await expect(breaks.nth(0)).toHaveAccessibleName('Column break');
    await expect(breaks.nth(1)).toHaveAccessibleName('Column break');
    await expect(breaks.nth(2)).toHaveAccessibleName('Column break, inactive');
    await expect(breaks.nth(2)).toHaveAttribute('data-rte-column-break', 'inactive');
    for (const root of [editor, readerOf(page)]) {
        const [one = 0, two = 0, three = 0, four] = await columnStarts(root, ['One', 'Two', 'Three', 'Four']);
        const { width } = await boxOf(root, 'One');

        expect(two).toBeGreaterThanOrEqual(one + width);
        expect(three).toBeGreaterThanOrEqual(two + width);
        expect(four).toBe(three);
    }
    await expect(readerOf(page).locator('[data-rte-column-break="active"]')).toHaveCount(2);
});

test('names each column break Column break, and Column break, inactive while it forces no break, captioned with its name', async ({
    mount,
    page,
}) => {
    await mount(<ColumnsProbe columns={2} breaks={3} width="1000px" />);
    await ready(page);
    const editor = editorOf(page);
    const inactive = editor.getByRole('separator', { name: 'Column break, inactive', exact: true });

    await expect(editor.getByRole('separator', { name: 'Column break', exact: true })).toHaveCount(1);
    await expect(inactive).toHaveCount(2);
    await expect(editor.locator('[role="separator"][aria-disabled]')).toHaveCount(0);
    const caption = await inactive.first().evaluate((element) => getComputedStyle(element, '::after').content);
    expect(caption).toBe('"Column break, inactive"');
});

test('puts the selection in the paragraph of the second column whose text is clicked', async ({ mount, page }) => {
    await mount(<ColumnsProbe columns={2} breaks={1} width="1000px" />);
    await ready(page);
    const editor = editorOf(page);
    await expect(editor).toHaveAttribute('data-rte-columns-fit', '');
    const [one = 0, two = 0] = await columnStarts(editor, ['One', 'Two']);
    expect(two).toBeGreaterThan(one);

    await editor.locator('p', { hasText: 'Two' }).getByText('Two').click();

    const selected = await page.evaluate(() => {
        const anchor = document.getSelection()?.anchorNode;
        const element = anchor instanceof Element ? anchor : anchor?.parentElement;
        return element?.closest('p')?.textContent;
    });
    expect(selected).toBe('Two');
});

test('renders one column in document order at 320 px, with every break inactive and no sideways scroll', async ({
    mount,
    page,
}) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await mount(<ColumnsProbe columns={2} breaks={3} />);
    await ready(page);
    const editor = editorOf(page);

    await expect(editor.getByRole('separator', { name: 'Column break, inactive', exact: true })).toHaveCount(3);
    await expect(editor).not.toHaveAttribute('data-rte-columns-fit');
    for (const root of [editor, readerOf(page)]) {
        const starts = await columnStarts(root, ['One', 'Two', 'Three', 'Four']);
        const tops: number[] = [];
        for (const text of ['One', 'Two', 'Three', 'Four']) {
            const box = await boxOf(root, text);
            tops.push(box.y);
        }

        expect(new Set(starts).size).toBe(1);
        expect([...tops].sort((a, b) => a - b)).toEqual(tops);
    }
    await expect(readerOf(page)).toHaveCSS('column-count', 'auto');
    expect(await noSidewaysScroll(page)).toBe(true);
});

test('lets a host rule on the content class override the package column gap and margin without important', async ({
    mount,
    page,
}) => {
    await mount(<ColumnsProbe columns={2} columnGap="2rem" breaks={1} width="1000px" />);
    await ready(page);
    const editor = editorOf(page);
    const reader = readerOf(page);
    await expect(editor).toHaveAttribute('data-rte-columns-fit', '');
    await expect(reader).toHaveCSS('margin-inline-end', '-32px');

    await hostStylesheet(page, '.host-columns { column-gap: 48px; margin-inline-end: 0px; }');

    await expect(reader).toHaveCSS('margin-inline-end', '0px');
    for (const root of [editor, reader]) {
        await expect(root).toHaveCSS('column-gap', '48px');
        const one = await boxOf(root, 'One');
        const two = await boxOf(root, 'Two');

        expect(Math.round(two.x - (one.x + one.width))).toBe(48);
    }
});
