/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator } from '@playwright/test';
import * as sinon from 'sinon';

import { Select } from '#/components/Select';

import { SelectMultiple } from '../SelectMultiple';

const SELECT_TEST_ID = 'test-multiselect';
const SELECTED_ITEM_TEST_ID = 'test-item-selected';
const PARTIAL_ITEM_TEST_ID = 'test-item-partial';
const PLAIN_ITEM_TEST_ID = 'test-item-plain';
const MIXED_VALUE_TEST_ID = 'fondue-select-mixed-value';
const CHECKMARK_TEST_ID = 'fondue-icons-check-mark';
const DASH_TEST_ID = 'fondue-icons-minus';

test('render a dash on a partially applied item and a checkmark on a selected one', async ({ mount, page }) => {
    const wrapper = await mount(
        <SelectMultiple
            aria-label="test"
            data-test-id={SELECT_TEST_ID}
            value={['selected']}
            indeterminateValues={['partial']}
        >
            <Select.Slot name="menu">
                <Select.Item data-test-id={SELECTED_ITEM_TEST_ID} value="selected">
                    Selected item
                </Select.Item>
                <Select.Item data-test-id={PARTIAL_ITEM_TEST_ID} value="partial">
                    Partial item
                </Select.Item>
                <Select.Item data-test-id={PLAIN_ITEM_TEST_ID} value="plain">
                    Plain item
                </Select.Item>
            </Select.Slot>
        </SelectMultiple>,
    );
    await wrapper.getByTestId(SELECT_TEST_ID).click();

    // `toBeVisible` respects `display: none`, so this is what actually verifies the stylesheet.
    const partialItem = page.getByTestId(PARTIAL_ITEM_TEST_ID);
    await expect(partialItem.getByTestId(DASH_TEST_ID)).toBeVisible();
    await expect(partialItem.getByTestId(CHECKMARK_TEST_ID)).toBeHidden();

    const selectedItem = page.getByTestId(SELECTED_ITEM_TEST_ID);
    await expect(selectedItem.getByTestId(CHECKMARK_TEST_ID)).toBeVisible();
    await expect(selectedItem.getByTestId(DASH_TEST_ID)).toBeHidden();

    const plainItem = page.getByTestId(PLAIN_ITEM_TEST_ID);
    await expect(plainItem.getByTestId(CHECKMARK_TEST_ID)).toBeHidden();
    await expect(plainItem.getByTestId(DASH_TEST_ID)).toBeHidden();

    // A partially applied item carries a value, so its background matches a selected one.
    const backgroundOf = (item: Locator): Promise<string> =>
        item.evaluate((element: Element) => getComputedStyle(element).backgroundColor);
    expect(await backgroundOf(partialItem)).toBe(await backgroundOf(selectedItem));
    expect(await backgroundOf(partialItem)).not.toBe(await backgroundOf(plainItem));
});

test('swap the dash for a checkmark when a partially applied item is clicked', async ({ mount, page }) => {
    const onSelectChange = sinon.spy();
    const wrapper = await mount(
        <SelectMultiple
            onSelect={onSelectChange}
            aria-label="test"
            data-test-id={SELECT_TEST_ID}
            defaultValue={[]}
            indeterminateValues={['partial', 'other-partial']}
        >
            <Select.Slot name="menu">
                <Select.Item data-test-id={PARTIAL_ITEM_TEST_ID} value="partial">
                    Partial item
                </Select.Item>
                <Select.Item data-test-id={PLAIN_ITEM_TEST_ID} value="other-partial">
                    Other partial item
                </Select.Item>
            </Select.Slot>
        </SelectMultiple>,
    );
    await wrapper.getByTestId(SELECT_TEST_ID).click();

    const partialItem = page.getByTestId(PARTIAL_ITEM_TEST_ID);
    await expect(partialItem.getByTestId(DASH_TEST_ID)).toBeVisible();

    // Use dispatchEvent to avoid Playwright's click simulation issues
    await partialItem.dispatchEvent('click');

    await expect(partialItem.getByTestId(CHECKMARK_TEST_ID)).toBeVisible();
    await expect(partialItem.getByTestId(DASH_TEST_ID)).toBeHidden();
    expect(onSelectChange.calledWith(['partial'])).toBe(true);

    // Switching it off again must not bring the dash back.
    await partialItem.dispatchEvent('click');

    await expect(partialItem.getByTestId(CHECKMARK_TEST_ID)).toBeHidden();
    await expect(partialItem.getByTestId(DASH_TEST_ID)).toBeHidden();
});

test('render the mixed label instead of the selection badges', async ({ mount }) => {
    const wrapper = await mount(
        <SelectMultiple
            aria-label="test"
            data-test-id={SELECT_TEST_ID}
            value={['selected']}
            indeterminateValues={['partial']}
        >
            <Select.Slot name="menu">
                <Select.Item value="selected">Selected item</Select.Item>
                <Select.Item value="partial">Partial item</Select.Item>
            </Select.Slot>
        </SelectMultiple>,
    );

    await expect(wrapper.getByTestId(MIXED_VALUE_TEST_ID)).toHaveText('Mixed');
    await expect(wrapper.getByTestId('badge')).toBeHidden();
});
