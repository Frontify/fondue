/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Flyout } from '../Flyout';

const FLYOUT_TEST_ID = 'test-flyout';
const FLYOUT_TEXT = 'sample flyout';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Flyout data-test-id={FLYOUT_TEST_ID}>{FLYOUT_TEXT}</Flyout>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(FLYOUT_TEXT);
});
