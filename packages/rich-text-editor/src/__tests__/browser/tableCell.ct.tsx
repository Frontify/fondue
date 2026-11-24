/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { TableCellFrame } from './TableCellFrame';
import { FIRST_IN_CELL, LAST_IN_CELL, MIDDLE_IN_CELL } from './tableCellValues';

// A table cell spaces its blocks as the document does, and they sit flush with the cell's padding.

const SURFACES = ['renderer', 'editor'];

for (const surface of SURFACES) {
    test(`a table cell in the ${surface} spaces its blocks with the document gap`, async ({ mount }) => {
        const component = await mount(<TableCellFrame />);
        const root = component.getByTestId(surface);
        const documentGap = await root
            .locator('p')
            .first()
            .evaluate((node) => getComputedStyle(node).marginBottom);
        const cell = root.locator('td');

        expect(documentGap).not.toBe('0px');
        await expect(cell.getByText(FIRST_IN_CELL)).toHaveCSS('margin-top', '0px');
        await expect(cell.getByText(FIRST_IN_CELL)).toHaveCSS('margin-bottom', documentGap);
        await expect(cell.getByText(MIDDLE_IN_CELL)).toHaveCSS('margin-top', '0px');
        await expect(cell.getByText(MIDDLE_IN_CELL)).toHaveCSS('margin-bottom', documentGap);
        await expect(cell.getByText(LAST_IN_CELL)).toHaveCSS('margin-bottom', '0px');
    });
}
