/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { ColorPicker } from '../ColorPicker';

const COLOR_PICKER_TEST_ID = 'test-color-picker';
const COLOR_PICKER_TEXT = 'sample color-picker';

test('should render without error', async ({ mount }) => {
    const component = await mount(<ColorPicker data-test-id={COLOR_PICKER_TEST_ID}>{COLOR_PICKER_TEXT}</ColorPicker>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(COLOR_PICKER_TEXT);
});
