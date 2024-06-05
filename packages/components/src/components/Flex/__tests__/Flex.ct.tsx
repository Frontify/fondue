/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Flex } from '../Flex';

const FLEX_TEST_ID = 'test-flex';
const FLEX_TEXT = 'sample flex';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Flex data-test-id={FLEX_TEST_ID}>{FLEX_TEXT}</Flex>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(FLEX_TEXT);
});
