/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Grid } from '../Grid';

const GRID_TEST_ID = 'test-grid';
const GRID_TEXT = 'sample grid';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Grid data-test-id={GRID_TEST_ID}>{GRID_TEXT}</Grid>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(GRID_TEXT);
});
