/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Select } from '../SelectWrapper';

const DROPDOWN_TEST_ID = 'test-dropdown';
const DROPDOWN_TEXT = 'sample dropdown';

test('should render without error', async ({ mount }) => {
    const component = await mount(
        <Select aria-label="tedst" data-test-id={DROPDOWN_TEST_ID}>
            {DROPDOWN_TEXT}
        </Select>,
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText(DROPDOWN_TEXT);
});
