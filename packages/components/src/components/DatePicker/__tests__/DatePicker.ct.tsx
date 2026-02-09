/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { DatePicker } from '../DatePicker';

const DATE_PICKER_TEST_ID = 'test-date-picker';

test('should render without error', async ({ mount }) => {
    const component = await mount(<DatePicker data-test-id={DATE_PICKER_TEST_ID} />);
    await expect(component).toBeVisible();
});
