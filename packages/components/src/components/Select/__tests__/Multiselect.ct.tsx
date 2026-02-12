/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import * as sinon from 'sinon';

import { Select } from '#/components/Select';

import { SelectMultiple } from '../SelectMultiple';

const SELECT_TEST_ID = 'test-multiselect';
const ITEM_TEST_ID1 = 'test-item1';
const ITEM_TEST_ID2 = 'test-item2';
const ITEM_TEXT1 = 'sample text1';
const ITEM_TEXT2 = 'sample text2';

test('should select an item with empty string value', async ({ mount, page }) => {
    const onSelectChange = sinon.spy();
    const wrapper = await mount(
        <SelectMultiple
            onSelect={onSelectChange}
            aria-label="test"
            data-test-id={SELECT_TEST_ID}
            placeholder="Choose items"
        >
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </SelectMultiple>,
    );
    const component = wrapper.getByTestId(SELECT_TEST_ID);

    await expect(component).toBeVisible();
    await component.click();

    await page.getByTestId(ITEM_TEST_ID1).click();

    expect(onSelectChange.callCount).toBe(1);
    expect(onSelectChange.calledWith([''])).toBe(true);
    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveAttribute('aria-selected', 'true');
});

// FIXME: flaky test on CI only
test.skip('should deselect an item with empty string value', async ({ mount, page }) => {
    const onSelectChange = sinon.spy();
    const wrapper = await mount(
        <SelectMultiple onSelect={onSelectChange} aria-label="test" data-test-id={SELECT_TEST_ID} defaultValue={['']}>
            <Select.Slot name="menu">
                <Select.Item data-test-id={ITEM_TEST_ID1} value="">
                    {ITEM_TEXT1}
                </Select.Item>
                <Select.Item data-test-id={ITEM_TEST_ID2} value="test2">
                    {ITEM_TEXT2}
                </Select.Item>
            </Select.Slot>
        </SelectMultiple>,
    );
    const component = wrapper.getByTestId(SELECT_TEST_ID);

    await expect(component).toBeVisible();
    await component.click();

    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveAttribute('aria-selected', 'true');

    await page.getByTestId(ITEM_TEST_ID1).click();

    expect(onSelectChange.callCount).toBe(1);
    expect(onSelectChange.calledWith([])).toBe(true);
    await expect(page.getByTestId(ITEM_TEST_ID1)).toHaveAttribute('aria-selected', 'false');
});
