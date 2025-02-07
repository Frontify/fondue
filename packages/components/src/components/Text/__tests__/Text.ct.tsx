/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Text } from '../Text';

const TEXT_TEST_ID = 'test-text';
const TEXT_TEXT = 'sample text';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Text data-test-id={TEXT_TEST_ID}>{TEXT_TEXT}</Text>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(TEXT_TEXT);
});
