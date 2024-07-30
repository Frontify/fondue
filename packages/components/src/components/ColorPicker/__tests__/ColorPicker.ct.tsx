/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import * as sinon from 'sinon';

import { ColorPicker } from '../ColorPicker';

const COLOR_PICKER_TEST_ID = 'fondue-color-picker';
const COLOR_PICKER_VALUE_INPUT_TEST_ID = 'fondue-color-picker-value-input';
const COLOR_PICKER_GRADIENT_INPUT_TEST_ID = 'fondue-color-picker-gradient-input';
const SELECT_TEST_ID = 'color-picker-select-format';
const COLOR_PICKER_VALUE_INPUT_RED_TEST_ID = 'color-picker-value-input-red';
const COLOR_PICKER_VALUE_INPUT_GREEN_TEST_ID = 'color-picker-value-input-green';
const COLOR_PICKER_VALUE_INPUT_BLUE_TEST_ID = 'color-picker-value-input-blue';
const COLOR_PICKER_VALUE_INPUT_ALPHA_TEST_ID = 'color-picker-value-input-alpha';
const COLOR_PICKER_VALUE_INPUT_HEX_TEST_ID = 'color-picker-value-input-hex';
const SAMPLE_COLOR_INPUT_VALUE = {
    red: 255,
    green: 170,
    blue: 0,
    alpha: 0.8,
};

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

test('should show HEX color format by default', async ({ mount }) => {
    const component = await mount(
        <ColorPicker.Root data-test-id={COLOR_PICKER_TEST_ID}>
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    await expect(component).toBeVisible();
    await expect(component.getByTestId(COLOR_PICKER_VALUE_INPUT_TEST_ID).getByTestId(SELECT_TEST_ID)).toHaveText('HEX');
});

test('should show HEX color explicitly', async ({ mount }) => {
    const component = await mount(
        <ColorPicker.Root defaultFormat="HEX" data-test-id={COLOR_PICKER_TEST_ID}>
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    await expect(component).toBeVisible();
    await expect(component.getByTestId(COLOR_PICKER_VALUE_INPUT_TEST_ID).getByTestId(SELECT_TEST_ID)).toHaveText('HEX');
});

test('should show RGBA color explicitly', async ({ mount }) => {
    const component = await mount(
        <ColorPicker.Root defaultFormat="RGBA" data-test-id={COLOR_PICKER_TEST_ID}>
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    await expect(component).toBeVisible();
    await expect(component.getByTestId(COLOR_PICKER_VALUE_INPUT_TEST_ID).getByTestId(SELECT_TEST_ID)).toHaveText(
        'RGBA',
    );
});

test('should show HEX color value', async ({ mount }) => {
    const component = await mount(
        <ColorPicker.Root
            currentColor={SAMPLE_COLOR_INPUT_VALUE}
            defaultFormat="HEX"
            data-test-id={COLOR_PICKER_TEST_ID}
        >
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    await expect(component).toBeVisible();
    await expect(component.getByTestId(COLOR_PICKER_VALUE_INPUT_HEX_TEST_ID).locator('input')).toHaveValue('ffaa00');
    await expect(component.getByTestId(COLOR_PICKER_VALUE_INPUT_ALPHA_TEST_ID).locator('input')).toHaveValue('80');
});

test('should show RGBA color value', async ({ mount }) => {
    const component = await mount(
        <ColorPicker.Root
            currentColor={SAMPLE_COLOR_INPUT_VALUE}
            defaultFormat="RGBA"
            data-test-id={COLOR_PICKER_TEST_ID}
        >
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    await expect(component).toBeVisible();
    await expect(component.getByTestId(COLOR_PICKER_VALUE_INPUT_RED_TEST_ID).locator('input')).toHaveValue('255');
    await expect(component.getByTestId(COLOR_PICKER_VALUE_INPUT_GREEN_TEST_ID).locator('input')).toHaveValue('170');
    await expect(component.getByTestId(COLOR_PICKER_VALUE_INPUT_BLUE_TEST_ID).locator('input')).toHaveValue('0');
    await expect(component.getByTestId(COLOR_PICKER_VALUE_INPUT_ALPHA_TEST_ID).locator('input')).toHaveValue('80');
});

test('should trigger color change event from long HEX input', async ({ mount }) => {
    const onChange = sinon.spy();
    const component = await mount(
        <ColorPicker.Root
            onColorChange={onChange}
            currentColor={SAMPLE_COLOR_INPUT_VALUE}
            defaultFormat="HEX"
            data-test-id={COLOR_PICKER_TEST_ID}
        >
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    await expect(component).toBeVisible();
    await component.getByTestId(COLOR_PICKER_VALUE_INPUT_HEX_TEST_ID).locator('input').fill('aa00cc');
    await component.getByTestId(COLOR_PICKER_VALUE_INPUT_HEX_TEST_ID).locator('input').blur();
    expect(onChange.callCount).toBe(1);
    expect(onChange.getCall(0).args[0]).toEqual({ red: 170, green: 0, blue: 204, alpha: 1, name: '#aa00cc' });
});

test('should trigger color change event from short HEX input', async ({ mount }) => {
    const onChange = sinon.spy();
    const component = await mount(
        <ColorPicker.Root
            onColorChange={onChange}
            currentColor={SAMPLE_COLOR_INPUT_VALUE}
            defaultFormat="HEX"
            data-test-id={COLOR_PICKER_TEST_ID}
        >
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    await expect(component).toBeVisible();
    await component.getByTestId(COLOR_PICKER_VALUE_INPUT_HEX_TEST_ID).locator('input').fill('a0c');
    await component.getByTestId(COLOR_PICKER_VALUE_INPUT_HEX_TEST_ID).locator('input').blur();
    expect(onChange.callCount).toBe(1);
    expect(onChange.getCall(0).args[0]).toEqual({ red: 170, green: 0, blue: 204, alpha: 1, name: '#aa00cc' });
});

test('should trigger color change event from RGB input', async ({ mount }) => {
    const onChange = sinon.spy();
    const component = await mount(
        <ColorPicker.Root
            onColorChange={onChange}
            currentColor={SAMPLE_COLOR_INPUT_VALUE}
            defaultFormat="RGBA"
            data-test-id={COLOR_PICKER_TEST_ID}
        >
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    await expect(component).toBeVisible();
    await component.getByTestId(COLOR_PICKER_VALUE_INPUT_RED_TEST_ID).locator('input').fill('200');
    await component.getByTestId(COLOR_PICKER_VALUE_INPUT_GREEN_TEST_ID).locator('input').fill('50');
    await component.getByTestId(COLOR_PICKER_VALUE_INPUT_BLUE_TEST_ID).locator('input').fill('100');
    await component.getByTestId(COLOR_PICKER_VALUE_INPUT_ALPHA_TEST_ID).locator('input').fill('40');
    expect(onChange.callCount).toBe(4);
    expect(
        onChange.calledWith({
            red: 200,
            green: 50,
            blue: 200,
            alpha: 0.4,
            name: 'rgba(200, 170, 0, 0.8)',
        }),
    ).toEqual(true);
});
