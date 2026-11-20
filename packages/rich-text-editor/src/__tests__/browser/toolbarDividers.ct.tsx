/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { FIRST_IN_CELL } from './tableCellValues';
import { ToolbarDividersHost } from './ToolbarDividersHost';
import { BLANK_LABEL, PANEL_LABEL } from './toolbarDividersValues';

// A control that draws nothing takes no place in the toolbar, and gets no divider.

const SEPARATOR = '[data-toolbar-separator]';
const GROUP = '[data-toolbar-group]';
const INSERT_TABLE_LABEL = 'Insert table';
const SLOT = '[data-toolbar-slot]';

type Part = 'separator' | 'group' | 'empty-group' | 'other';

/** What the toolbar draws in its row, in order; a part the stylesheet hides (`display: none`) takes no place and is left out. */
const rowOf = async (page: Page): Promise<Part[]> =>
    page.getByRole('toolbar').evaluate(
        (toolbar, selectors) => {
            const parts: Part[] = [];
            for (const child of toolbar.children) {
                if (getComputedStyle(child).display === 'none') {
                    continue;
                }
                if (child.matches(selectors.separator)) {
                    parts.push('separator');
                } else if (child.matches(selectors.group)) {
                    const slots = [...child.querySelectorAll(selectors.slot)];
                    if (slots.some((slot) => slot.hasChildNodes())) {
                        parts.push('group');
                    } else {
                        parts.push('empty-group');
                    }
                } else {
                    parts.push('other');
                }
            }
            return parts;
        },
        { separator: SEPARATOR, group: GROUP, slot: SLOT },
    );

/** Every divider has something drawn on both sides, and nothing in the row is drawn empty. */
const expectDividersBetweenSections = (row: readonly Part[]): void => {
    expect(row).not.toContain('empty-group');
    expect(row[0]).not.toBe('separator');
    expect(row[row.length - 1]).not.toBe('separator');
    for (const [index, part] of row.entries()) {
        if (part === 'separator') {
            expect(row[index + 1]).not.toBe('separator');
        }
    }
    const separators = row.filter((part) => part === 'separator').length;
    expect(separators).toBe(row.length - separators - 1);
};

test.describe('toolbar dividers', () => {
    test('the top toolbar with the table plugin draws a divider only between groups, caret in a paragraph', async ({
        mount,
        page,
    }) => {
        await mount(<ToolbarDividersHost controls="table" placement="top" />);
        await page.getByRole('textbox').getByText('Before').click();
        await expect(page.getByRole('button', { name: 'Bulleted list' })).toBeVisible();

        await expect
            .poll(() => rowOf(page))
            .toEqual(['group', 'separator', 'group', 'separator', 'group', 'separator', 'group']);
        expectDividersBetweenSections(await rowOf(page));
        await expect(page.getByRole('toolbar').getByRole('button', { name: INSERT_TABLE_LABEL })).toBeVisible();
        await expect(page.getByRole('toolbar').getByRole('button', { name: 'Table', exact: true })).toHaveCount(0);

        const insertGroupSlotsTakingSpace = await page.getByRole('toolbar').evaluate(
            (toolbar, selectors) => {
                const insertButton = [...toolbar.querySelectorAll('button')].find(
                    (button) => button.getAttribute('aria-label') === selectors.label,
                );
                const group = insertButton?.closest(selectors.group);
                if (!group) {
                    return undefined;
                }
                return [...group.children]
                    .filter((child) => getComputedStyle(child).display !== 'none')
                    .map((child) => child.hasChildNodes());
            },
            { group: GROUP, label: INSERT_TABLE_LABEL },
        );
        expect(insertGroupSlotsTakingSpace).toBeDefined();
        expect(insertGroupSlotsTakingSpace).not.toContain(false);
    });

    test('the table menu shows in a table cell, after a divider', async ({ mount, page }) => {
        await mount(<ToolbarDividersHost controls="table" placement="top" />);
        await page.getByRole('textbox').getByText(FIRST_IN_CELL).click();

        await expect(page.getByRole('toolbar').getByRole('button', { name: 'Table' })).toBeVisible();
        await expect
            .poll(() => rowOf(page))
            .toEqual(['group', 'separator', 'group', 'separator', 'group', 'separator', 'group']);
        expectDividersBetweenSections(await rowOf(page));
    });

    test('a group that draws nothing between two that do gets no doubled divider', async ({ mount, page }) => {
        await mount(<ToolbarDividersHost controls="blank" placement="top" blankDraws={false} />);
        await page.getByRole('textbox').getByText('Before').click();
        await expect(page.getByRole('button', { name: PANEL_LABEL })).toBeVisible();

        await expect
            .poll(() => rowOf(page))
            .toEqual(['group', 'separator', 'group', 'separator', 'group', 'separator', 'group']);
        expectDividersBetweenSections(await rowOf(page));
        await expect(page.getByRole('toolbar').getByRole('button', { name: BLANK_LABEL })).toHaveCount(0);
    });

    test('a control that starts drawing on its own gets its group and divider back', async ({ mount, page }) => {
        const component = await mount(<ToolbarDividersHost controls="blank" placement="top" blankDraws={false} />);
        await page.getByRole('textbox').getByText('Before').click();
        await expect(page.getByRole('button', { name: PANEL_LABEL })).toBeVisible();
        const withoutBlank = await rowOf(page);

        // Only the control re-renders, not the toolbar: the stylesheet alone brings its group and divider back.
        await component.update(<ToolbarDividersHost controls="blank" placement="top" blankDraws />);

        await expect(page.getByRole('toolbar').getByRole('button', { name: BLANK_LABEL })).toBeVisible();
        await expect
            .poll(async () => {
                const row = await rowOf(page);
                return row.length;
            })
            .toBe(withoutBlank.length + 2);
        expectDividersBetweenSections(await rowOf(page));
    });

    test('a control that stops drawing on its own loses its group and divider', async ({ mount, page }) => {
        const component = await mount(<ToolbarDividersHost controls="blank" placement="top" blankDraws />);
        await page.getByRole('textbox').getByText('Before').click();
        await expect(page.getByRole('toolbar').getByRole('button', { name: BLANK_LABEL })).toBeVisible();
        await expect
            .poll(() => rowOf(page))
            .toEqual(['group', 'separator', 'group', 'separator', 'group', 'separator', 'group', 'separator', 'group']);

        // Only the control re-renders, not the toolbar: the stylesheet alone drops its group and divider.
        await component.update(<ToolbarDividersHost controls="blank" placement="top" blankDraws={false} />);

        await expect(page.getByRole('toolbar').getByRole('button', { name: BLANK_LABEL })).toHaveCount(0);
        await expect
            .poll(() => rowOf(page))
            .toEqual(['group', 'separator', 'group', 'separator', 'group', 'separator', 'group']);
        expectDividersBetweenSections(await rowOf(page));
    });

    test('a first group that draws nothing gets no divider before the next one', async ({ mount, page }) => {
        await mount(<ToolbarDividersHost controls="blank" placement="top" blankDraws={false} blankInFirstGroup />);
        await page.getByRole('textbox').getByText('Before').click();
        await expect(page.getByRole('button', { name: PANEL_LABEL })).toBeVisible();

        await expect
            .poll(() => rowOf(page))
            .toEqual(['group', 'separator', 'group', 'separator', 'group', 'separator', 'group']);
        expectDividersBetweenSections(await rowOf(page));
        await expect(page.getByRole('toolbar').getByRole('button', { name: BLANK_LABEL })).toHaveCount(0);
    });

    test('the floating bar draws no divider after the last group that shows a control', async ({ mount, page }) => {
        await mount(<ToolbarDividersHost controls="table" placement="floating" />);
        await page.getByRole('textbox').getByText('Before').click();
        await page.keyboard.press('Home');
        await page.keyboard.press('Shift+End');
        await expect(page.getByRole('toolbar')).toBeVisible();

        const row = await rowOf(page);
        expect(row.length).toBeGreaterThan(1);
        expectDividersBetweenSections(row);
        await expect(page.getByRole('toolbar').getByRole('button', { name: 'Table' })).toHaveCount(0);
    });
});
