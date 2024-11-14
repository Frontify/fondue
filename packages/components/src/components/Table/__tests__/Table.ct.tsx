/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Table } from '../Table';

const TABLE_TEST_ID = 'test-table';
const TABLE_TEXT = 'sample table';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Table data-test-id={TABLE_TEST_ID}>{TABLE_TEXT}</Table>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(TABLE_TEXT);
});
