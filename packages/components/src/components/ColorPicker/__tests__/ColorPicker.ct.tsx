/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { ColorPicker } from '../ColorPicker';

const COLOR_PICKER_TEST_ID = 'fondue-color-picker';
const COLOR_PICKER_VALUE_INPUT_TEST_ID = 'fondue-color-picker-value-input';
const COLOR_PICKER_GRADIENT_INPUT_TEST_ID = 'fondue-color-picker-gradient-input';

test('should render without error', async ({ mount }) => {
    const component = await mount(
        <ColorPicker.Root data-test-id={COLOR_PICKER_TEST_ID}>
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
            <ColorPicker.Gradient data-test-id={COLOR_PICKER_GRADIENT_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    await expect(component).toBeVisible();
    await expect(component.getByTestId(COLOR_PICKER_VALUE_INPUT_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(COLOR_PICKER_GRADIENT_INPUT_TEST_ID)).toBeVisible();
});
