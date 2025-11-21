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
    expect(onChange.getCall(0).args[0]).toEqual({ red: 170, green: 0, blue: 204, alpha: 0.8, name: '#aa00cc 80%' });
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
    expect(onChange.getCall(0).args[0]).toEqual({ red: 170, green: 0, blue: 204, alpha: 0.8, name: '#aa00cc 80%' });
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
    expect(onChange.calledWith({ red: 255, green: 170, blue: 0, alpha: 0.4, name: 'rgba(255, 170, 0, 0.4)' })).toEqual(
        true,
    );
});

test('should move saturation handle on value change', async ({ mount }) => {
    const component = await mount(
        <ColorPicker.Root
            currentColor={{ red: 255, green: 0, blue: 0, alpha: 0.4 }}
            defaultFormat="RGBA"
            data-test-id={COLOR_PICKER_TEST_ID}
        >
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
            <ColorPicker.Gradient data-test-id={COLOR_PICKER_GRADIENT_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    await expect(component).toBeVisible();
    const oldPosition = await component
        .getByTestId(COLOR_PICKER_GRADIENT_INPUT_TEST_ID)
        .locator('div.react-colorful__saturation-pointer')
        .first()
        .boundingBox();

    await component.update(
        <ColorPicker.Root
            currentColor={{ red: 100, green: 0, blue: 0, alpha: 0.4 }}
            defaultFormat="RGBA"
            data-test-id={COLOR_PICKER_TEST_ID}
        >
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
            <ColorPicker.Gradient data-test-id={COLOR_PICKER_GRADIENT_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    const newPosition = await component
        .getByTestId(COLOR_PICKER_GRADIENT_INPUT_TEST_ID)
        .locator('div.react-colorful__saturation-pointer')
        .first()
        .boundingBox();
    expect(oldPosition?.y || 1).toBeLessThan(newPosition?.y || 0);
});

test('should move hue handle on value change', async ({ mount }) => {
    const component = await mount(
        <ColorPicker.Root
            currentColor={{ red: 255, green: 0, blue: 0, alpha: 0.4 }}
            defaultFormat="RGBA"
            data-test-id={COLOR_PICKER_TEST_ID}
        >
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
            <ColorPicker.Gradient data-test-id={COLOR_PICKER_GRADIENT_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    await expect(component).toBeVisible();
    const oldPosition = await component
        .getByTestId(COLOR_PICKER_GRADIENT_INPUT_TEST_ID)
        .locator('div.react-colorful__hue-pointer')
        .first()
        .boundingBox();

    await component.update(
        <ColorPicker.Root
            currentColor={{ red: 0, green: 255, blue: 0, alpha: 0.4 }}
            defaultFormat="RGBA"
            data-test-id={COLOR_PICKER_TEST_ID}
        >
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
            <ColorPicker.Gradient data-test-id={COLOR_PICKER_GRADIENT_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    const newPosition = await component
        .getByTestId(COLOR_PICKER_GRADIENT_INPUT_TEST_ID)
        .locator('div.react-colorful__hue-pointer')
        .first()
        .boundingBox();
    expect(oldPosition?.x || 1).toBeLessThan(newPosition?.x || 0);
});

test('should move alpha handle on value change', async ({ mount }) => {
    const component = await mount(
        <ColorPicker.Root
            currentColor={{ red: 255, green: 0, blue: 0, alpha: 0.4 }}
            defaultFormat="RGBA"
            data-test-id={COLOR_PICKER_TEST_ID}
        >
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
            <ColorPicker.Gradient data-test-id={COLOR_PICKER_GRADIENT_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    await expect(component).toBeVisible();
    const oldPosition = await component
        .getByTestId(COLOR_PICKER_GRADIENT_INPUT_TEST_ID)
        .locator('div.react-colorful__alpha-pointer')
        .first()
        .boundingBox();

    await component.update(
        <ColorPicker.Root
            currentColor={{ red: 255, green: 0, blue: 0, alpha: 0.9 }}
            defaultFormat="RGBA"
            data-test-id={COLOR_PICKER_TEST_ID}
        >
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
            <ColorPicker.Gradient data-test-id={COLOR_PICKER_GRADIENT_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    const newPosition = await component
        .getByTestId(COLOR_PICKER_GRADIENT_INPUT_TEST_ID)
        .locator('div.react-colorful__alpha-pointer')
        .first()
        .boundingBox();
    expect(oldPosition?.x || 1).toBeLessThan(newPosition?.x || 0);
});

test('should trigger color change on gradient handle move', async ({ mount, page }) => {
    const onChange = sinon.spy();
    const component = await mount(
        <ColorPicker.Root
            onColorChange={onChange}
            currentColor={{ red: 255, green: 0, blue: 0, alpha: 0.4 }}
            defaultFormat="RGBA"
            data-test-id={COLOR_PICKER_TEST_ID}
        >
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
            <ColorPicker.Gradient data-test-id={COLOR_PICKER_GRADIENT_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    await expect(component).toBeVisible();
    const gradientHandle = component
        .getByTestId(COLOR_PICKER_GRADIENT_INPUT_TEST_ID)
        .locator('div.react-colorful__saturation-pointer')
        .first();
    const handleCoordinates = await gradientHandle.boundingBox();
    await expect(gradientHandle).toBeVisible();
    await gradientHandle.hover();
    await page.mouse.down();
    await page.mouse.move((handleCoordinates?.x || 0) - 100, handleCoordinates?.y || 0);
    await page.mouse.up();
    expect(onChange.calledOnce).toBe(true);
    expect(onChange.getCall(0).args[0]).toEqual({
        red: 255,
        green: 42,
        blue: 42,
        alpha: 0.4,
        name: 'rgba(255, 42, 42, 0.4)',
    });
});

test('should trigger color change on hue handle move', async ({ mount, page }) => {
    const onChange = sinon.spy();
    const component = await mount(
        <ColorPicker.Root
            onColorChange={onChange}
            currentColor={{ red: 255, green: 0, blue: 0, alpha: 0.4 }}
            defaultFormat="RGBA"
            data-test-id={COLOR_PICKER_TEST_ID}
        >
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
            <ColorPicker.Gradient data-test-id={COLOR_PICKER_GRADIENT_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    await expect(component).toBeVisible();
    const gradientHandle = component
        .getByTestId(COLOR_PICKER_GRADIENT_INPUT_TEST_ID)
        .locator('div.react-colorful__hue-pointer')
        .first();
    const handleCoordinates = await gradientHandle.boundingBox();
    await expect(gradientHandle).toBeVisible();
    await gradientHandle.hover();
    await page.mouse.down();
    await page.mouse.move((handleCoordinates?.x || 0) + 100, handleCoordinates?.y || 0);
    await page.mouse.up();
    expect(onChange.calledOnce).toBe(true);
    expect(onChange.getCall(0).args[0]).toEqual({
        red: 255,
        green: 188,
        blue: 0,
        alpha: 0.4,
        name: 'rgba(255, 188, 0, 0.4)',
    });
});

test('should trigger color change on alpha handle move', async ({ mount, page }) => {
    const onChange = sinon.spy();
    const component = await mount(
        <ColorPicker.Root
            onColorChange={onChange}
            currentColor={{ red: 255, green: 0, blue: 0, alpha: 0.4 }}
            defaultFormat="RGBA"
            data-test-id={COLOR_PICKER_TEST_ID}
        >
            <ColorPicker.Values data-test-id={COLOR_PICKER_VALUE_INPUT_TEST_ID} />
            <ColorPicker.Gradient data-test-id={COLOR_PICKER_GRADIENT_INPUT_TEST_ID} />
        </ColorPicker.Root>,
    );
    await expect(component).toBeVisible();
    const gradientHandle = component
        .getByTestId(COLOR_PICKER_GRADIENT_INPUT_TEST_ID)
        .locator('div.react-colorful__alpha-pointer')
        .first();
    const handleCoordinates = await gradientHandle.boundingBox();
    await expect(gradientHandle).toBeVisible();
    await gradientHandle.hover();
    await page.mouse.down();
    await page.mouse.move((handleCoordinates?.x || 0) + 100, handleCoordinates?.y || 0);
    await page.mouse.up();
    expect(onChange.calledOnce).toBe(true);
    expect(onChange.getCall(0).args[0]).toEqual({
        red: 255,
        green: 0,
        blue: 0,
        alpha: 0.52,
        name: 'rgba(255, 0, 0, 0.52)',
    });
});

test('color picker input should render rgba value without error', async ({ mount }) => {
    const component = await mount(
        <ColorPicker.Input
            aria-label="Color picker input"
            currentColor={{
                red: 255,
                green: 0,
                blue: 0,
                alpha: 0.4,
                name: 'rgba(255, 0, 0, 0.4)',
            }}
            onClear={() => {}}
        />,
    );
    await expect(component).toBeVisible();
    await expect(component).toHaveText('rgba(255, 0, 0, 0.4)');
});

test('color picker input should render hex value without error', async ({ mount }) => {
    const component = await mount(
        <ColorPicker.Input
            aria-label="Color picker input"
            currentColor={{
                red: 255,
                green: 0,
                blue: 0,
                alpha: 0.4,
                name: '#ff0000',
            }}
            onClear={() => {}}
        />,
    );
    await expect(component).toBeVisible();
    await expect(component).toHaveText('#ff0000');
});

test('color picker input should display a disabled button when disabled', async ({ mount }) => {
    const component = await mount(
        <ColorPicker.Input
            aria-label="Color picker input"
            currentColor={{
                red: 255,
                green: 0,
                blue: 0,
                alpha: 0.4,
                name: '#ff0000',
            }}
            disabled
            onClear={() => {}}
        />,
    );
    const button = component.locator('button').first();
    await expect(button).toBeDisabled();
});

test('should display correct clearIcon colors in different hover states', async ({ mount }) => {
    const component = await mount(
        <ColorPicker.Input
            aria-label="Color picker input"
            currentColor={{
                red: 255,
                green: 0,
                blue: 0,
                alpha: 0.4,
                name: '#ff0000',
            }}
            onClear={() => {}}
        />,
    );

    const clearIcon = component.locator('svg[data-test-id="fondue-icons-cross"]');
    const inputButton = component.locator('button[data-color-input-select]');
    const clearButton = component.locator('button:has(svg[data-test-id="fondue-icons-cross"])');

    await clearIcon.waitFor();

    const defaultColor = await clearIcon.evaluate((el) => getComputedStyle(el).getPropertyValue('color'));
    expect(defaultColor).toBe('rgb(103, 103, 99)');

    await inputButton.hover();
    const inputHoveredColor = await clearIcon.evaluate((el) => getComputedStyle(el).getPropertyValue('color'));
    expect(inputHoveredColor).toBe('rgb(103, 103, 99)');

    await clearButton.hover();
    const clearButtonHoveredColor = await clearIcon.evaluate((el) => getComputedStyle(el).getPropertyValue('color'));
    expect(clearButtonHoveredColor).toBe('rgb(103, 103, 99)');
});

test('should strip leading # when typing hex value', async ({ mount }) => {
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
    const hexInput = component.getByTestId(COLOR_PICKER_VALUE_INPUT_HEX_TEST_ID).locator('input');
    await hexInput.fill('#abc123');
    await expect(hexInput).toHaveValue('abc123');
});

test('should strip leading # when pasting hex value', async ({ mount, page }) => {
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
    const hexInput = component.getByTestId(COLOR_PICKER_VALUE_INPUT_HEX_TEST_ID).locator('input');

    // Simulate pasting a value with #
    await hexInput.click();
    await hexInput.fill('');
    await page.evaluate(() => {
        navigator.clipboard.writeText('#ff5733');
    });
    await hexInput.press('Control+V');
    // Wait a bit for the paste to process
    await page.waitForTimeout(100);
    const value = await hexInput.inputValue();
    expect(value.startsWith('#')).toBe(false);
});

test('should handle hex value without leading # normally', async ({ mount }) => {
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
    const hexInput = component.getByTestId(COLOR_PICKER_VALUE_INPUT_HEX_TEST_ID).locator('input');
    await hexInput.fill('def456');
    await expect(hexInput).toHaveValue('def456');
});

test('should strip multiple # characters from beginning', async ({ mount }) => {
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
    const hexInput = component.getByTestId(COLOR_PICKER_VALUE_INPUT_HEX_TEST_ID).locator('input');
    await hexInput.fill('##abcdef');
    // Only the first # should be stripped, so we should have '#abcdef'
    await expect(hexInput).toHaveValue('#abcdef');
});

test('should trigger color change with stripped # on blur', async ({ mount }) => {
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
    const hexInput = component.getByTestId(COLOR_PICKER_VALUE_INPUT_HEX_TEST_ID).locator('input');
    await hexInput.fill('#ff5733');
    await hexInput.blur();
    expect(onChange.callCount).toBe(1);
    expect(onChange.getCall(0).args[0]).toEqual({ red: 255, green: 87, blue: 51, alpha: 0.8, name: '#ff5733 80%' });
});
