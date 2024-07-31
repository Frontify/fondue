/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';
import * as sinon from 'sinon';

import { MAX_HEIGHT_MARGIN } from '#/hooks/useMaxHeight';

import { Select } from '../Select';

const SELECT_TEST_ID = 'test-dropdown';
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
    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveCSS('background-color', 'rgb(234, 235, 235)');

    await page.keyboard.press('ArrowDown');

    await expect(page.getByTestId(ITEM_TEST_ID2)).toHaveAttribute('data-highlighted', 'true');
    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(page.getByTestId(ITEM_TEST_ID2)).toHaveCSS('background-color', 'rgb(234, 235, 235)');

    await page.keyboard.press('ArrowUp');

    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveAttribute('data-highlighted', 'true');
    await expect(page.getByTestId(ITEM_TEST_ID2)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveCSS('background-color', 'rgb(234, 235, 235)');
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
    const component = await mount(
        <Select aria-label="test" data-test-id={SELECT_TEST_ID} placeholder={PLACEHOLDER_TEXT}>
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

    await expect(component).toContainText(ITEM_TEXT2);

    await page.click(`[data-test-id=${SLOT_CLEAR_TEST_ID}]`);

    await expect(component).not.toContainText(ITEM_TEXT2);
    await expect(component).toContainText(PLACEHOLDER_TEXT);
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

    const dialog = page.getByTestId('fondue-select-menu');
    await expect(dialog).toBeVisible();

    const boundingBox = await dialog.boundingBox();
    const windowHeight = page.viewportSize()?.height || 0;
    const expectedMaxHeight = windowHeight - (boundingBox?.y || 0) - MAX_HEIGHT_MARGIN;
    const actualMaxHeight = await dialog.evaluate((node) => parseFloat(window.getComputedStyle(node).maxHeight));
    expect(actualMaxHeight).toBe(expectedMaxHeight);
});
