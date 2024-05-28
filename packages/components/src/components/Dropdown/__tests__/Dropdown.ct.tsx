/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Dropdown } from '../Dropdown';

const DROPDOWN_TEST_ID = 'test-dropdown';
const DROPDOWN_TEXT = 'sample dropdown';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Dropdown data-test-id={DROPDOWN_TEST_ID}>{DROPDOWN_TEXT}</Dropdown>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(DROPDOWN_TEXT);
});
