/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';
import * as sinon from 'sinon';

import { MockComboboxWithAsyncFetcher } from '#/components/Select/__tests__/MockComboboxWithAsyncFetcher.tsx';

import { Select } from '../Select';

const SELECT_TEST_ID = 'test-combobox';
const GROUP_TEST_ID = 'test-group';
const ITEM_TEST_ID1 = 'test-item1';
const ITEM_TEST_ID2 = 'test-item2';
const SLOT_LEFT_TEST_ID = 'test-slot-left';
const SLOT_RIGHT_TEST_ID = 'test-slot-right';
const SLOT_CLEAR_TEST_ID = 'test-slot-clear';
const PLACEHOLDER_TEXT = 'sample placeholder1';
const ITEM_LABEL1 = 'test1';
const ITEM_TEXT1 = 'sample text1';
const ITEM_LABEL2 = 'test2';
const ITEM_TEXT2 = 'sample text2';
const SELECT_SUCCESS_ICON_TEST_ID = `${SELECT_TEST_ID}-success-icon`;
const SELECT_ERROR_ICON_TEST_ID = `${SELECT_TEST_ID}-error-icon`;

test('should render with placeholder', async ({ mount, page }) => {
    const component = await mount(
        <Select.Combobox aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot name="menu">
                <Select.Item value="test1">{ITEM_TEXT1}</Select.Item>
            </Select.Slot>
        </Select.Combobox>,
    );

    await expect(component).toBeVisible();
    await expect(page.getByPlaceholder(PLACEHOLDER_TEXT)).toBeVisible();
});

test('render the success status', async ({ mount }) => {
    const component = await mount(
        <Select aria-label="test" data-test-id={SELECT_TEST_ID} status="success">
            <Select.Slot name="menu">
                <Select.Item value="test1">{ITEM_TEXT1}</Select.Item>
            </Select.Slot>
        </Select>,
    );

    await expect(component).toHaveAttribute('data-status', 'success');
    await expect(component).toHaveCSS('border', '1px solid rgb(22, 133, 0)');
    await expect(component.getByTestId(SELECT_SUCCESS_ICON_TEST_ID)).toBeVisible();
});

test('render the error status', async ({ mount }) => {
    const component = await mount(
        <Select aria-label="test" data-test-id={SELECT_TEST_ID} status="error">
            <Select.Slot name="menu">
                <Select.Item value="test1">{ITEM_TEXT1}</Select.Item>
            </Select.Slot>
        </Select>,
    );

    await expect(component).toHaveAttribute('data-status', 'error');
    await expect(component).toHaveCSS('border', '1px solid rgb(222, 36, 23)');
    await expect(component.getByTestId(SELECT_ERROR_ICON_TEST_ID)).toBeVisible();
});

test('should open menu and show item', async ({ mount, page }) => {
    const component = await mount(
        <Select.Combobox aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="test1">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </Select.Combobox>,
    );

    await expect(component).toBeVisible();
    await component.click();

    await expect(page.getByTestId(ITEM_TEST_ID1)).toBeVisible();
    await expect(page.getByTestId(ITEM_TEST_ID1)).toContainText(ITEM_TEXT1);
    await expect(page.getByTestId(ITEM_TEST_ID2)).toBeVisible();
    await expect(page.getByTestId(ITEM_TEST_ID2)).toContainText(ITEM_TEXT2);
});

test('should navigate though menu with arrow', async ({ mount, page }) => {
    const component = await mount(
        <Select.Combobox aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="test1">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </Select.Combobox>,
    );

    await expect(component).toBeVisible();
    await component.click();

    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveAttribute('data-highlighted', 'true');
    await expect(page.getByTestId(ITEM_TEST_ID2)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveCSS('background-color', 'rgb(240, 240, 235)');

    await page.keyboard.press('ArrowDown');

    await expect(page.getByTestId(ITEM_TEST_ID2)).toHaveAttribute('data-highlighted', 'true');
    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(page.getByTestId(ITEM_TEST_ID2)).toHaveCSS('background-color', 'rgb(240, 240, 235)');

    await page.keyboard.press('ArrowUp');

    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveAttribute('data-highlighted', 'true');
    await expect(page.getByTestId(ITEM_TEST_ID2)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveCSS('background-color', 'rgb(240, 240, 235)');
});

test('should select item in list', async ({ mount, page }) => {
    const onSelectChange = sinon.spy();
    const component = await mount(
        <Select.Combobox
            onSelect={onSelectChange}
            aria-label="test"
            data-test-id={SELECT_TEST_ID}
            placeholder={PLACEHOLDER_TEXT}
        >
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="test1">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </Select.Combobox>,
    );

    await expect(component).toBeVisible();
    await component.click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(component.getByTestId(SELECT_TEST_ID)).toHaveValue(ITEM_TEXT2);
    expect(onSelectChange.callCount).toBe(1);
    expect(onSelectChange.calledWith('test2')).toBe(true);
});

test('should select item in group in list', async ({ mount, page }) => {
    const onSelectChange = sinon.spy();
    const component = await mount(
        <Select.Combobox
            onSelect={onSelectChange}
            aria-label="test"
            data-test-id={SELECT_TEST_ID}
            placeholder={PLACEHOLDER_TEXT}
        >
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="test1">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Group data-test-id={GROUP_TEST_ID} groupId="group1">
                    <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                        {ITEM_TEXT2}
                    </Select.Item>
                </Select.Group>
            </Select.Slot>
        </Select.Combobox>,
    );

    await expect(component).toBeVisible();
    await component.click();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(component.getByTestId(SELECT_TEST_ID)).toHaveValue(ITEM_TEXT2);
    expect(onSelectChange.callCount).toBe(1);
    expect(onSelectChange.calledWith('test2')).toBe(true);
});

test('should select custom item in list', async ({ mount, page }) => {
    const onSelectChange = sinon.spy();
    const component = await mount(
        <Select.Combobox
            onSelect={onSelectChange}
            aria-label="test"
            data-test-id={SELECT_TEST_ID}
            placeholder={PLACEHOLDER_TEXT}
        >
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} label={ITEM_LABEL1} value="test1">
                    <IconIcon />
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} label={ITEM_LABEL2} value="test2">
                    <IconIcon />
                </Select.Item>
            </Select.Slot>
        </Select.Combobox>,
    );
    await expect(component).toBeVisible();
    await component.click();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(component.getByTestId(SELECT_TEST_ID)).toHaveValue(ITEM_LABEL2);
    expect(onSelectChange.callCount).toBe(1);
    expect(onSelectChange.calledWith('test2')).toBe(true);
});

test('should not open menu when disabled', async ({ mount, page }) => {
    const component = await mount(
        <Select.Combobox disabled aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="test1">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </Select.Combobox>,
    );
    await expect(component).toBeVisible();
    await component.click();

    await expect(page.getByTestId(ITEM_TEST_ID1)).not.toBeVisible();

    await page.keyboard.press('ArrowDown');

    await expect(page.getByTestId(ITEM_TEST_ID1)).not.toBeVisible();

    await page.keyboard.press('Enter');

    await expect(page.getByPlaceholder(PLACEHOLDER_TEXT)).toBeVisible();
    await expect(component.getByTestId(SELECT_TEST_ID)).not.toHaveValue(ITEM_TEXT2);
});

test('should allow to clear', async ({ mount, page }) => {
    const onSelectChange = sinon.spy();
    const component = await mount(
        <Select.Combobox
            onSelect={onSelectChange}
            data-test-id={SELECT_TEST_ID}
            aria-label="test"
            placeholder={PLACEHOLDER_TEXT}
        >
            <Select.Slot name="left">
                <div data-test-id={SLOT_LEFT_TEST_ID}>Left Slot</div>
            </Select.Slot>
            <Select.Slot data-test-id={SLOT_CLEAR_TEST_ID} name="clear" />
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="test1">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </Select.Combobox>,
    );

    await expect(component).toBeVisible();
    await component.click();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    expect(onSelectChange.callCount).toBe(1);
    expect(onSelectChange.calledWith('test2')).toBe(true);
    await expect(component.getByTestId(SELECT_TEST_ID)).toHaveValue(ITEM_TEXT2);

    await page.click(`[data-test-id=${SLOT_CLEAR_TEST_ID}]`);

    await expect(component.getByTestId(SELECT_TEST_ID)).not.toHaveValue(ITEM_TEXT2);
    await expect(page.getByPlaceholder(PLACEHOLDER_TEXT)).toBeVisible();
    expect(onSelectChange.callCount).toBe(2);
    expect(onSelectChange.calledWith(null)).toBe(true);
});

test('should render left slot', async ({ mount, page }) => {
    const component = await mount(
        <Select.Combobox aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot data-test-id={SLOT_LEFT_TEST_ID} name="left">
                <div>Left Slot</div>
            </Select.Slot>
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="test1">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </Select.Combobox>,
    );

    await expect(component).toBeVisible();
    await expect(page.getByTestId(SLOT_LEFT_TEST_ID)).toBeVisible();
    await expect(component).toContainText('Left Slot');
});

test('should render right slot', async ({ mount, page }) => {
    const component = await mount(
        <Select.Combobox aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot data-test-id={SLOT_RIGHT_TEST_ID} name="right">
                <div>Right Slot</div>
            </Select.Slot>
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="test1">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </Select.Combobox>,
    );

    await expect(component).toBeVisible();
    await expect(page.getByTestId(SLOT_RIGHT_TEST_ID)).toBeVisible();
    await expect(component).toContainText('Right Slot');
});

test('should render custom clear slot', async ({ mount, page }) => {
    const component = await mount(
        <Select.Combobox aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot data-test-id={SLOT_CLEAR_TEST_ID} name="clear">
                <div>Clear Slot</div>
            </Select.Slot>
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="test1">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </Select.Combobox>,
    );

    await expect(component).toBeVisible();
    await expect(page.getByTestId(SLOT_CLEAR_TEST_ID)).toBeVisible();
    await expect(component).toContainText('Clear Slot');
});

test('should clear input when typed value is not selected', async ({ mount, page }) => {
    const component = await mount(
        <Select.Combobox aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="test1">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </Select.Combobox>,
    );

    await expect(component).toBeVisible();
    await component.click();

    const nonExistentValue = 'test1';
    await component.getByRole('combobox').fill(nonExistentValue);
    await component.press('Tab');

    await expect(component.getByTestId(SELECT_TEST_ID)).toHaveValue('');
    await expect(page.getByPlaceholder(PLACEHOLDER_TEXT)).toBeVisible();
});

test('should show the other options when opening the menu meanwhile it has a value', async ({ mount, page }) => {
    const onSelectChange = sinon.spy();
    const component = await mount(
        <Select.Combobox
            onSelect={onSelectChange}
            aria-label="test"
            data-test-id={SELECT_TEST_ID}
            placeholder={PLACEHOLDER_TEXT}
            defaultValue={ITEM_LABEL1}
        >
            <Select.Item data-test-id={ITEM_TEST_ID1} value={ITEM_LABEL1}>
                {ITEM_TEXT1}
            </Select.Item>
            <Select.Item data-test-id={ITEM_TEST_ID2} value={ITEM_LABEL2}>
                {ITEM_TEXT2}
            </Select.Item>
        </Select.Combobox>,
    );

    await expect(component).toBeVisible();
    await component.click();

    await expect(page.getByTestId(ITEM_TEST_ID2)).toBeVisible();
});

test('should filter the items when typing', async ({ mount, page }) => {
    const onSelectChange = sinon.spy();
    const component = await mount(
        <Select.Combobox
            onSelect={onSelectChange}
            aria-label="test"
            data-test-id={SELECT_TEST_ID}
            placeholder={PLACEHOLDER_TEXT}
        >
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="test1">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </Select.Combobox>,
    );

    await expect(component).toBeVisible();
    await component.click();

    await page.keyboard.type(ITEM_TEXT1);

    await expect(page.getByTestId(ITEM_TEST_ID1)).toBeVisible();
    await expect(page.getByTestId(ITEM_TEST_ID2)).not.toBeVisible();

    await page.keyboard.press('Backspace');
    await expect(page.getByTestId(ITEM_TEST_ID1)).toBeVisible();
    await expect(page.getByTestId(ITEM_TEST_ID2)).toBeVisible();
});

test('should display loading circle when typing and hide loading circle after loading is finished', async ({
    mount,
    page,
}) => {
    const items = [
        { value: 'test1', label: 'test1', content: <span data-test-id={'test1'}>{'TEST1'}</span> },
        { value: 'test2', label: 'test2', content: <span data-test-id={'test2'}>{'TEST2'}</span> },
    ];
    const component = await mount(
        <MockComboboxWithAsyncFetcher
            aria-label="test"
            data-test-id={SELECT_TEST_ID}
            placeholder={PLACEHOLDER_TEXT}
            asyncItems={items}
        />,
    );

    await expect(component).toBeVisible();
    await component.click();

    component
        .pressSequentially(ITEM_TEXT1, {
            delay: 100,
        })
        .then(async () => {
            await expect(page.getByTestId(`${SELECT_TEST_ID}-loading-circle`)).not.toBeVisible();
        })
        .catch(() => {});
    await expect(page.getByTestId(`${SELECT_TEST_ID}-loading-circle`)).toBeVisible();
});

test('should display error when getAsyncItems fails', async ({ mount, page }) => {
    const items = [
        { value: 'test1', label: 'test1', content: <span data-test-id={'test1'}>{'TEST1'}</span> },
        { value: 'test2', label: 'test2', content: <span data-test-id={'test2'}>{'TEST2'}</span> },
    ];
    const component = await mount(
        <MockComboboxWithAsyncFetcher
            aria-label="test"
            data-test-id={SELECT_TEST_ID}
            placeholder={PLACEHOLDER_TEXT}
            asyncItems={items}
            shouldReject
        />,
    );

    await expect(component).toBeVisible();
    await component.click();

    await expect(page.getByTestId(`${SELECT_TEST_ID}-error-icon`)).toBeVisible();
});

test('should not display error when async items is empty', async ({ mount, page }) => {
    const component = await mount(
        <MockComboboxWithAsyncFetcher
            aria-label="test"
            data-test-id={SELECT_TEST_ID}
            placeholder={PLACEHOLDER_TEXT}
            asyncItems={[]}
        />,
    );

    await expect(component).toBeVisible();
    await component.click();

    await expect(component.getByTestId(`${SELECT_TEST_ID}-error-icon`)).not.toBeVisible();

    await page.keyboard.type(ITEM_TEXT1);

    await expect(component.getByTestId(`${SELECT_TEST_ID}-error-icon`)).not.toBeVisible();
});
