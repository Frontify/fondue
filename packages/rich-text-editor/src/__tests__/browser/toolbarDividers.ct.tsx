/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { ToolbarDividersHost } from './ToolbarDividersHost';
import { BLANK_LABEL } from './toolbarDividersValues';

const SEPARATOR = '[data-toolbar-separator]';
const GROUP = '[data-toolbar-group]';
const SLOT = '[data-toolbar-slot]';
/** Home and End scroll the page instead of moving the caret in WebKit on macOS. */
const SELECT_ALL = 'ControlOrMeta+a';
/** A group and the divider before it. */
const GROUP_WITH_DIVIDER = 2;

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

/** Whether every slot the toolbar draws (not `display: none`) has something in it. */
const everyDrawnSlotHasContent = async (page: Page): Promise<boolean> =>
    page.getByRole('toolbar').evaluate((toolbar, slotSelector) => {
        const slots = [...toolbar.querySelectorAll(slotSelector)];
        const drawn = slots.filter((slot) => getComputedStyle(slot).display !== 'none');

        return drawn.every((slot) => slot.hasChildNodes());
    }, SLOT);

/** How many parts the toolbar draws in its row. */
const rowLengthOf = async (page: Page): Promise<number> => {
    const row = await rowOf(page);

    return row.length;
};

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
    test('a last group that draws nothing leaves no divider at the end', async ({ mount, page }) => {
        await mount(<ToolbarDividersHost placement="top" blankAt="last" blankDraws={false} />);
        await page.getByRole('textbox').getByText('Before').click();

        await expect.poll(() => rowLengthOf(page)).toBeGreaterThan(1);
        const row = await rowOf(page);
        expectDividersBetweenSections(row);
        expect(row[row.length - 1]).toBe('group');
    });

    test('a middle group that draws nothing leaves no doubled divider', async ({ mount, page }) => {
        await mount(<ToolbarDividersHost placement="top" blankAt="middle" blankDraws={false} />);
        await page.getByRole('textbox').getByText('Before').click();

        await expect.poll(() => rowLengthOf(page)).toBeGreaterThan(1);
        expectDividersBetweenSections(await rowOf(page));
    });

    test('a first group that draws nothing leaves no divider at the start', async ({ mount, page }) => {
        await mount(<ToolbarDividersHost placement="top" blankAt="first" blankDraws={false} />);
        await page.getByRole('textbox').getByText('Before').click();

        await expect.poll(() => rowLengthOf(page)).toBeGreaterThan(1);
        const row = await rowOf(page);
        expectDividersBetweenSections(row);
        expect(row[0]).toBe('group');
    });

    test('an empty control beside ones that draw takes no place in its group', async ({ mount, page }) => {
        await mount(<ToolbarDividersHost placement="top" blankAt="beside" blankDraws={false} />);
        await page.getByRole('textbox').getByText('Before').click();

        await expect.poll(() => rowLengthOf(page)).toBeGreaterThan(1);
        expectDividersBetweenSections(await rowOf(page));
        expect(await everyDrawnSlotHasContent(page)).toBe(true);
    });

    test('a control that starts and stops drawing on its own gets and loses its group and divider', async ({
        mount,
        page,
    }) => {
        const component = await mount(<ToolbarDividersHost placement="top" blankAt="middle" blankDraws />);
        await page.getByRole('textbox').getByText('Before').click();
        const blankButton = page.getByRole('toolbar').getByRole('button', { name: BLANK_LABEL });
        await expect(blankButton).toBeVisible();
        const drawing = await rowOf(page);
        expectDividersBetweenSections(drawing);

        // Only the control re-renders, not the toolbar: the stylesheet alone drops its group and divider.
        await component.update(<ToolbarDividersHost placement="top" blankAt="middle" blankDraws={false} />);

        await expect(blankButton).toHaveCount(0);
        await expect.poll(() => rowLengthOf(page)).toBe(drawing.length - GROUP_WITH_DIVIDER);
        expectDividersBetweenSections(await rowOf(page));

        await component.update(<ToolbarDividersHost placement="top" blankAt="middle" blankDraws />);

        await expect(blankButton).toBeVisible();
        await expect.poll(() => rowLengthOf(page)).toBe(drawing.length);
        expectDividersBetweenSections(await rowOf(page));
    });

    test('the floating bar leaves no divider at the end when the last group draws nothing', async ({ mount, page }) => {
        await mount(<ToolbarDividersHost placement="floating" blankAt="last" blankDraws={false} />);
        await page.getByRole('textbox').getByText('Before').click();
        await page.keyboard.press(SELECT_ALL);
        await expect(page.getByRole('toolbar')).toBeVisible();

        await expect.poll(() => rowLengthOf(page)).toBeGreaterThan(0);
        expectDividersBetweenSections(await rowOf(page));
    });
});
