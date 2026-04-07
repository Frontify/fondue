/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Tree } from '../Tree';

const TREE_TEST_ID = 'test-tree';
const TREE_TEXT = 'sample tree';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Tree data-test-id={TREE_TEST_ID}>{TREE_TEXT}</Tree>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(TREE_TEXT);
});
