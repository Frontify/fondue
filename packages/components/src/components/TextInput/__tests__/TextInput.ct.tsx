/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { FOCUS_BORDER_CSS, FOCUS_OUTLINE_CSS } from '#/helpers/constants';

import { TextInput } from '../TextInput';

const TEXT_INPUT_TEXT = 'sample text input';
const TEXT_INPUT_TEST_ID = 'fondue-text-input';
const TEXT_INPUT_LOADER_TEST_ID = 'fondue-text-input-loader';
const TEXT_INPUT_SUCCESS_ICON_TEST_ID = 'fondue-text-input-success-icon';
const TEXT_INPUT_ERROR_ICON_TEST_ID = 'fondue-text-input-error-icon';

test('render with the correct value', async ({ mount }) => {
    const component = await mount(<TextInput value={TEXT_INPUT_TEXT} />);

    await expect(component.getByRole('textbox')).toHaveValue(TEXT_INPUT_TEXT);
});

test('render with the correct placeholder', async ({ mount }) => {
    const component = await mount(<TextInput placeholder={TEXT_INPUT_TEXT} />);

    await expect(component.getByRole('textbox')).toHaveAttribute('placeholder', TEXT_INPUT_TEXT);
});

test('render the success status', async ({ mount }) => {
    const component = await mount(<TextInput status="success" />);

    await expect(component).toHaveAttribute('data-status', 'success');
    await expect(component).toHaveCSS('border', '1px solid rgb(21, 129, 111)');
    await expect(component.getByTestId(TEXT_INPUT_SUCCESS_ICON_TEST_ID)).toBeVisible();
});

test('render the loading status', async ({ mount }) => {
    const component = await mount(<TextInput status="loading" />);

    await expect(component).toHaveAttribute('data-status', 'loading');
    await expect(component).toHaveCSS('border', '1px solid rgba(8, 8, 8, 0.15)');
    await expect(component.getByTestId(TEXT_INPUT_LOADER_TEST_ID)).toBeVisible();
});

test('render the error status ', async ({ mount }) => {
    const component = await mount(<TextInput status="error" />);

    await expect(component).toHaveAttribute('data-status', 'error');
    await expect(component.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    await expect(component).toHaveCSS('border', '1px solid rgb(217, 47, 76)');
    await expect(component.getByTestId(TEXT_INPUT_ERROR_ICON_TEST_ID)).toBeVisible();
});

test('emits on change event', async ({ mount }) => {
    const onChange = sinon.spy();
    const component = await mount(<TextInput onChange={onChange} />);

    await component.getByRole('textbox').pressSequentially(TEXT_INPUT_TEXT);

    expect(onChange.callCount).toBe(TEXT_INPUT_TEXT.length);
});

test('emits the focus and blur events', async ({ mount }) => {
    const onFocus = sinon.spy();
    const onBlur = sinon.spy();
    const component = await mount(<TextInput onFocus={onFocus} onBlur={onBlur} />);

    await component.getByRole('textbox').focus();
    expect(onFocus.called).toBe(true);

    await component.getByRole('textbox').blur();
    expect(onBlur.called).toBe(true);
});

test('render disabled state', async ({ mount }) => {
    const component = await mount(<TextInput disabled />);

    await expect(component.getByRole('textbox')).toBeDisabled();
});

test('render read-only state', async ({ mount }) => {
    const component = await mount(<TextInput readOnly />);

    await expect(component.getByRole('textbox')).toHaveAttribute('readonly');
});

test('render both slots side', async ({ mount }) => {
    const component = await mount(
        <TextInput.Root>
            <TextInput.Slot name="left">
                <button type="button" data-test-id="left-button-slot">
                    left
                </button>
            </TextInput.Slot>
            <TextInput.Slot name="right">
                <button type="button" data-test-id="right-button-slot">
                    right
                </button>
            </TextInput.Slot>
        </TextInput.Root>,
    );

    await expect(component.getByTestId('left-button-slot')).toBeVisible();
    await expect(component.getByTestId('right-button-slot')).toBeVisible();
});

test('render slot on the right side and apply correct focus order', async ({ mount }) => {
    const component = await mount(
        <TextInput.Root>
            <TextInput.Slot name="right">
                <button type="button" data-test-id="right-button-slot">
                    Focus
                </button>
            </TextInput.Slot>
        </TextInput.Root>,
    );

    // Focus input
    await component.press('Tab');
    // Focus the right slot
    await component.press('Tab');

    await expect(component.getByTestId('right-button-slot')).toBeFocused();
});

test('render focus ring and no border when keyboard focused', async ({ mount, page }) => {
    const component = await mount(<TextInput value={TEXT_INPUT_TEXT} />);
    const input = page.getByTestId(TEXT_INPUT_TEST_ID);

    await page.focus('body');

    await expect(input).not.toHaveCSS(...FOCUS_OUTLINE_CSS);
    await expect(input).not.toHaveCSS(...FOCUS_BORDER_CSS);

    await page.keyboard.press('Tab');

    await expect(component.getByRole('textbox')).toBeFocused();

    await expect(input).toHaveCSS(...FOCUS_OUTLINE_CSS);
    await expect(input).not.toHaveCSS(...FOCUS_BORDER_CSS);
});

test('render border and no focus ring when mouse focused', async ({ mount, page }) => {
    const component = await mount(<TextInput value={TEXT_INPUT_TEXT} />);
    const input = page.getByTestId(TEXT_INPUT_TEST_ID);

    await page.focus('body');

    await expect(input).not.toHaveCSS(...FOCUS_BORDER_CSS);
    await expect(input).not.toHaveCSS(...FOCUS_OUTLINE_CSS);

    await component.click();

    await expect(component.getByRole('textbox')).toBeFocused();

    await expect(input).toHaveCSS(...FOCUS_BORDER_CSS);
    await expect(input).not.toHaveCSS(...FOCUS_OUTLINE_CSS);
});
