/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { FIRST_IN_CELL } from './tableCellValues';
import { ToolbarDividersHost } from './ToolbarDividersHost';
import { PANEL_LABEL } from './toolbarDividersValues';

// A control that draws nothing takes no place in the toolbar, and gets no divider.

const SEPARATOR = '[data-toolbar-separator]';
const GROUP = '[data-toolbar-group]';
const SLOT = '[data-toolbar-slot]';

const NARROW_WIDTH = 60;

type Part = 'separator' | 'group' | 'empty-group' | 'other';

/** What the toolbar draws in its row, in order; a hidden group takes no place and is left out. */
const rowOf = async (page: Page): Promise<Part[]> =>
    page.getByRole('toolbar').evaluate(
        (toolbar, selectors) => {
            const parts: Part[] = [];
            for (const child of toolbar.children) {
                if (child instanceof HTMLElement && child.hidden) {
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
    test('the top toolbar draws no divider after the last group that shows a control', async ({ mount, page }) => {
        await mount(<ToolbarDividersHost placement="top" />);
        await page.getByRole('textbox').getByText('Before').click();
        await expect(page.getByRole('button', { name: 'Bulleted list' })).toBeVisible();

        await expect.poll(() => rowOf(page)).toEqual(['group', 'separator', 'group', 'separator', 'group']);
        expectDividersBetweenSections(await rowOf(page));
        await expect(page.getByRole('toolbar').getByRole('button', { name: 'Table' })).toHaveCount(0);
    });

    test('the table menu shows in a table cell, after a divider', async ({ mount, page }) => {
        await mount(<ToolbarDividersHost placement="top" />);
        await page.getByRole('textbox').getByText(FIRST_IN_CELL).click();

        await expect(page.getByRole('toolbar').getByRole('button', { name: 'Table' })).toBeVisible();
        await expect
            .poll(() => rowOf(page))
            .toEqual(['group', 'separator', 'group', 'separator', 'group', 'separator', 'group']);
        expectDividersBetweenSections(await rowOf(page));
    });

    test('a group that draws nothing between two that do gets no doubled divider', async ({ mount, page }) => {
        await mount(<ToolbarDividersHost placement="top" withPanel />);
        await page.getByRole('textbox').getByText('Before').click();
        await expect(page.getByRole('button', { name: PANEL_LABEL })).toBeVisible();

        await expect
            .poll(() => rowOf(page))
            .toEqual(['group', 'separator', 'group', 'separator', 'group', 'separator', 'group']);
        expectDividersBetweenSections(await rowOf(page));
    });

    test('the group comes back between its neighbours when the caret enters a table', async ({ mount, page }) => {
        await mount(<ToolbarDividersHost placement="top" withPanel />);
        await page.getByRole('textbox').getByText('Before').click();
        await expect(page.getByRole('button', { name: PANEL_LABEL })).toBeVisible();
        const withoutTable = await rowOf(page);

        await page.getByRole('textbox').getByText(FIRST_IN_CELL).click();

        await expect(page.getByRole('toolbar').getByRole('button', { name: 'Table' })).toBeVisible();
        await expect
            .poll(async () => {
                const row = await rowOf(page);
                return row.length;
            })
            .toBe(withoutTable.length + 2);
        expectDividersBetweenSections(await rowOf(page));
    });

    test('a control behind More keeps focus when the table control stops drawing', async ({ mount, page }) => {
        // So narrow that every control is behind More.
        const component = await mount(<ToolbarDividersHost placement="top" width={NARROW_WIDTH} />);
        await page.getByRole('textbox').getByText(FIRST_IN_CELL).click();
        await page.keyboard.press('Alt+F10');
        await page.keyboard.press('Enter');
        const panel = page.getByRole('toolbar', { name: 'More' });
        const bold = panel.getByRole('button', { name: 'Bold' });
        await bold.focus();
        await expect(panel.getByRole('button', { name: 'Table' })).toBeVisible();

        await component.update(<ToolbarDividersHost placement="top" width={NARROW_WIDTH} withoutTable />);

        await expect(panel.getByRole('button', { name: 'Table' })).toHaveCount(0);
        await expect(bold).toBeFocused();
    });

    test('the floating bar draws no divider after the last group that shows a control', async ({ mount, page }) => {
        await mount(<ToolbarDividersHost placement="floating" />);
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
