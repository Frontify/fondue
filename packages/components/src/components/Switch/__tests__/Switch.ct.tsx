/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Switch } from '../Switch';

const SWITCH_TEST_ID = 'test-switch';
const SWITCH_TEXT = 'sample switch';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Switch data-test-id={SWITCH_TEST_ID}>{SWITCH_TEXT}</Switch>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(SWITCH_TEXT);
});
