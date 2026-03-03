/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { OrderableList } from '../OrderableList';

const ORDERABLE_LIST_TEST_ID = 'test-orderable-list';
const ORDERABLE_LIST_TEXT = 'sample orderable-list';

test('should render without error', async ({ mount }) => {
    const component = await mount(<OrderableList data-test-id={ORDERABLE_LIST_TEST_ID}>{ORDERABLE_LIST_TEXT}</OrderableList>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(ORDERABLE_LIST_TEXT);
});
