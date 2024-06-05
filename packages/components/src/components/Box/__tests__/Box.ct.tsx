/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Box } from '../Box';

const BOX_TEST_ID = 'test-box';
const BOX_TEXT = 'sample box';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Box data-test-id={BOX_TEST_ID}>{BOX_TEXT}</Box>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(BOX_TEXT);
});
