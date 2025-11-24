/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';
import * as sinon from 'sinon';

import { FOCUS_BORDER_CSS, FOCUS_OUTLINE_CSS } from '#/helpers/constants';
import { MAX_HEIGHT_MARGIN } from '#/utilities/domUtilities';

import { Select } from '../Select';

const SELECT_TEST_ID = 'test-select';
const SELECT_MENU_TEST_ID = 'fondue-select-menu';
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

test('should render with placeholder', async ({ mount }) => {
    const component = await mount(
        <Select aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot name="menu">
                <Select.Item value="test1">{ITEM_TEXT1}</Select.Item>
            </Select.Slot>
        </Select>,
    );

    await expect(component).toBeVisible();
    await expect(component).toContainText(PLACEHOLDER_TEXT);
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
    await expect(component).toHaveCSS('border', '1px solid rgb(21, 129, 111)');
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
    await expect(component).toHaveCSS('border', '1px solid rgb(217, 47, 76)');
    await expect(component.getByTestId(SELECT_ERROR_ICON_TEST_ID)).toBeVisible();
});

test('should open menu and show item', async ({ mount, page }) => {
    const component = await mount(
        <Select aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="test1">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </Select>,
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
        <Select aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="test1">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </Select>,
    );

    await expect(component).toBeVisible();
    await component.click();

    await page.keyboard.press('ArrowDown');

    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveAttribute('data-highlighted', 'true');
    await expect(page.getByTestId(ITEM_TEST_ID2)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveCSS('background-color', 'rgb(241, 241, 241)');

    await page.keyboard.press('ArrowDown');

    await expect(page.getByTestId(ITEM_TEST_ID2)).toHaveAttribute('data-highlighted', 'true');
    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(page.getByTestId(ITEM_TEST_ID2)).toHaveCSS('background-color', 'rgb(241, 241, 241)');

    await page.keyboard.press('ArrowUp');

    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveAttribute('data-highlighted', 'true');
    await expect(page.getByTestId(ITEM_TEST_ID2)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveCSS('background-color', 'rgb(241, 241, 241)');
});

test('should select item in list', async ({ mount, page }) => {
    const onSelectChange = sinon.spy();
    const component = await mount(
        <Select
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
        </Select>,
    );

    await expect(component).toBeVisible();
    await component.click();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(component).toContainText(ITEM_TEXT2);
    expect(onSelectChange.callCount).toBe(1);
    expect(onSelectChange.calledWith('test2')).toBe(true);
});

test('should select item in group in list', async ({ mount, page }) => {
    const onSelectChange = sinon.spy();
    const component = await mount(
        <Select
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
        </Select>,
    );

    await expect(component).toBeVisible();
    await component.click();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(component).toContainText(ITEM_TEXT2);
    expect(onSelectChange.callCount).toBe(1);
    expect(onSelectChange.calledWith('test2')).toBe(true);
});

test('should select custom item in list', async ({ mount, page }) => {
    const onSelectChange = sinon.spy();
    const component = await mount(
        <Select
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
        </Select>,
    );

    await expect(component).toBeVisible();
    await component.click();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(component).toContainText(ITEM_LABEL2);
    expect(onSelectChange.callCount).toBe(1);
    expect(onSelectChange.calledWith('test2')).toBe(true);
});

test('should not open menu when disabled', async ({ mount, page }) => {
    const component = await mount(
        <Select disabled aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="test1">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </Select>,
    );

    await expect(component).toBeVisible();
    await component.click();

    await expect(page.getByTestId(ITEM_TEST_ID1)).not.toBeVisible();

    await page.keyboard.press('ArrowDown');

    await expect(page.getByTestId(ITEM_TEST_ID1)).not.toBeVisible();

    await page.keyboard.press('Enter');

    await expect(component).toContainText(PLACEHOLDER_TEXT);
    await expect(component).not.toContainText(ITEM_TEST_ID1);
});

test('should allow to clear', async ({ mount, page }) => {
    const onSelectChange = sinon.spy();
    const component = await mount(
        <Select
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
        </Select>,
    );

    await expect(component).toBeVisible();
    await component.click();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    expect(onSelectChange.callCount).toBe(1);
    expect(onSelectChange.calledWith('test2')).toBe(true);
    await expect(component).toContainText(ITEM_TEXT2);

    await page.click(`[data-test-id=${SLOT_CLEAR_TEST_ID}]`);

    await expect(component).not.toContainText(ITEM_TEXT2);
    await expect(component).toContainText(PLACEHOLDER_TEXT);
    expect(onSelectChange.callCount).toBe(2);
    expect(onSelectChange.calledWith(null)).toBe(true);
});

test('should render left slot', async ({ mount, page }) => {
    const component = await mount(
        <Select aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
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
        </Select>,
    );

    await expect(component).toBeVisible();
    await expect(page.getByTestId(SLOT_LEFT_TEST_ID)).toBeVisible();
    await expect(component).toContainText('Left Slot');
});

test('should render right slot', async ({ mount, page }) => {
    const component = await mount(
        <Select aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
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
        </Select>,
    );

    await expect(component).toBeVisible();
    await expect(page.getByTestId(SLOT_RIGHT_TEST_ID)).toBeVisible();
    await expect(component).toContainText('Right Slot');
});

test('should render custom clear slot', async ({ mount, page }) => {
    const component = await mount(
        <Select aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
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
        </Select>,
    );

    await expect(component).toBeVisible();
    await expect(page.getByTestId(SLOT_CLEAR_TEST_ID)).toBeVisible();
    await expect(component).toContainText('Clear Slot');
});

test('should have max height equal to available space', async ({ mount, page }) => {
    const component = await mount(
        <Select aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot name="menu">
                <Select.Item value="test1">{ITEM_TEXT1}</Select.Item>
                <Select.Item value="test2">{ITEM_TEXT2}</Select.Item>
                <Select.Item value="test1">{ITEM_TEXT1}</Select.Item>
                <Select.Item value="test2">{ITEM_TEXT2}</Select.Item>
                <Select.Item value="test1">{ITEM_TEXT1}</Select.Item>
                <Select.Item value="test2">{ITEM_TEXT2}</Select.Item>
                <Select.Item value="test1">{ITEM_TEXT1}</Select.Item>
                <Select.Item value="test2">{ITEM_TEXT2}</Select.Item>
                <Select.Item value="test1">{ITEM_TEXT1}</Select.Item>
                <Select.Item value="test2">{ITEM_TEXT2}</Select.Item>
            </Select.Slot>
        </Select>,
    );

    await page.setViewportSize({ width: 800, height: 300 });
    const windowHeight = page.viewportSize()?.height || 0;

    await expect(component).toBeVisible();
    await component.click();

    const dialog = page.getByTestId(SELECT_MENU_TEST_ID);
    await expect(dialog).toBeVisible();

    const boundingBox = await dialog.boundingBox();
    const expectedMaxHeight = windowHeight - (boundingBox?.y || 0) - MAX_HEIGHT_MARGIN;
    const actualMaxHeight = await dialog.evaluate((node) => parseFloat(window.getComputedStyle(node).maxHeight));
    expect(actualMaxHeight).toBe(expectedMaxHeight);
});

test('render focus ring and no border when keyboard focused', async ({ mount, page }) => {
    await mount(
        <Select aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot name="menu">
                <Select.Item value="test1">{ITEM_TEXT1}</Select.Item>
            </Select.Slot>
        </Select>,
    );

    const select = page.getByTestId(SELECT_TEST_ID);

    await page.focus('body');

    await expect(select).not.toHaveCSS(...FOCUS_OUTLINE_CSS);
    await expect(select).not.toHaveCSS(...FOCUS_BORDER_CSS);

    await page.keyboard.press('Tab');

    await expect(select).toBeFocused();

    await expect(select).toHaveCSS(...FOCUS_OUTLINE_CSS);
    await expect(select).not.toHaveCSS(...FOCUS_BORDER_CSS);
});

test('render border and no focus ring when mouse focused', async ({ mount, page }) => {
    const component = await mount(
        <Select aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot name="menu">
                <Select.Item value="test1">{ITEM_TEXT1}</Select.Item>
            </Select.Slot>
        </Select>,
    );
    const select = page.getByTestId(SELECT_TEST_ID);

    await page.focus('body');

    await expect(select).not.toHaveCSS(...FOCUS_BORDER_CSS);
    await expect(select).not.toHaveCSS(...FOCUS_OUTLINE_CSS);

    await component.hover();

    await page.mouse.down();
    await expect(select).toHaveCSS(...FOCUS_BORDER_CSS);
    await page.mouse.up();

    await expect(select).toBeFocused();

    await expect(select).toHaveCSS(...FOCUS_BORDER_CSS);
    await expect(select).not.toHaveCSS(...FOCUS_OUTLINE_CSS);
});

test('render indicator on selected item', async ({ mount, page }) => {
    const component = await mount(
        <Select aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="test1">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </Select>,
    );

    await expect(component).toBeVisible();
    await component.click();

    const firstItem = page.getByTestId(ITEM_TEST_ID1);
    const chekmarkIcon = firstItem.getByTestId('fondue-icons-check-mark');
    await expect(firstItem).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(firstItem).toHaveAttribute('aria-selected', 'false');
    await expect(chekmarkIcon).not.toBeVisible();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(component).toContainText(ITEM_TEXT1);
    await component.click();

    await expect(firstItem).toHaveAttribute('data-selected', 'true');
    await expect(firstItem).toHaveAttribute('aria-selected', 'true');
    await expect(firstItem).toHaveCSS('background-color', 'rgb(234, 235, 235)');
    await expect(chekmarkIcon).toBeVisible();

    await page.keyboard.press('ArrowDown');

    await expect(firstItem).toHaveCSS('background-color', 'rgb(234, 235, 235)');
    await expect(chekmarkIcon).toBeVisible();
});
