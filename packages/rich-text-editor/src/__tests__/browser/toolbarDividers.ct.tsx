/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { GROUP_ATTRIBUTE, SEPARATOR_ATTRIBUTE, SLOT_ATTRIBUTE } from '../../editor/helpers/toolbarMarkers';

import { ToolbarDividersHost } from './ToolbarDividersHost';

type ToolbarPart = 'separator' | 'group';

const DRAWN_ROW: readonly ToolbarPart[] = ['group', 'separator', 'group', 'separator', 'group'];

type ToolbarSelectors = {
    separator: string;
    group: string;
    slot: string;
};

type ToolbarDrawing = {
    row: ToolbarPart[];
    everyDrawnSlotHasContent: boolean;
};

const SELECTORS: ToolbarSelectors = {
    separator: `[${SEPARATOR_ATTRIBUTE}]`,
    group: `[${GROUP_ATTRIBUTE}]`,
    slot: `[${SLOT_ATTRIBUTE}]`,
};

const toolbarDrawingOf = async (page: Page): Promise<ToolbarDrawing> =>
    page.getByRole('toolbar').evaluate((toolbar, selectors): ToolbarDrawing => {
        const row: ToolbarPart[] = [];

        for (const child of toolbar.children) {
            if (getComputedStyle(child).display === 'none') {
                continue;
            }

            if (child.matches(selectors.separator)) {
                row.push('separator');
            } else if (child.matches(selectors.group)) {
                row.push('group');
            }
        }

        const slots = [...toolbar.querySelectorAll(selectors.slot)];
        const drawnSlots = slots.filter((slot) => getComputedStyle(slot).display !== 'none');

        return { row, everyDrawnSlotHasContent: drawnSlots.every((slot) => slot.hasChildNodes()) };
    }, SELECTORS);

test.describe('toolbar dividers', () => {
    test('draws dividers only between groups that show a control', async ({ mount, page }) => {
        await mount(<ToolbarDividersHost />);
        await page.getByRole('textbox').getByText('Before').click();

        await expect(page.getByRole('toolbar').getByRole('button').first()).toBeVisible();

        expect(await toolbarDrawingOf(page)).toEqual({ row: DRAWN_ROW, everyDrawnSlotHasContent: true });
    });
});
