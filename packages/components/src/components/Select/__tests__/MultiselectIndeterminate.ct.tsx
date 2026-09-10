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
const MIXED_VALUE_TEST_ID = 'fondue-select-mixed-count';
const MIXED_TEST_ID = 'fondue-select-mixed';
const SELECTED_COUNT_TEST_ID = 'fondue-select-selected-count';
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

test('render the mixed count badge next to the selection badges', async ({ mount }) => {
    const wrapper = await mount(
        <SelectMultiple
            aria-label="test"
            data-test-id={SELECT_TEST_ID}
            value={['selected']}
            indeterminateValues={['partial', 'other-partial']}
        >
            <Select.Slot name="menu">
                <Select.Item value="selected">Selected item</Select.Item>
                <Select.Item value="partial">Partial item</Select.Item>
                <Select.Item value="other-partial">Other partial item</Select.Item>
            </Select.Slot>
        </SelectMultiple>,
    );

    await expect(wrapper.getByTestId(MIXED_VALUE_TEST_ID)).toHaveText('2 mixed');
    await expect(wrapper.getByTestId('badge')).toHaveText('Selected item');
});

test('keep the mixed badge inside the field when the selection badges collapse', async ({ mount }) => {
    const wrapper = await mount(
        <div style={{ width: 300 }}>
            <SelectMultiple
                aria-label="test"
                data-test-id={SELECT_TEST_ID}
                value={['first', 'second', 'third']}
                indeterminateValues={['partial']}
            >
                <Select.Slot name="menu">
                    <Select.Item value="first">A long first value</Select.Item>
                    <Select.Item value="second">A long second value</Select.Item>
                    <Select.Item value="third">A long third value</Select.Item>
                    <Select.Item value="partial">Partial item</Select.Item>
                </Select.Slot>
            </SelectMultiple>
        </div>,
    );

    // The badges collapsed, so an overflow badge stands in for the hidden ones.
    await expect(wrapper.getByText(/^\+\d+$/)).toBeVisible();

    // `toBeVisible` does not catch clipping by an ancestor's `overflow: hidden`, so compare the
    // boxes: the mixed badge must sit inside the field even once the badges have taken their space.
    const mixedBox = await wrapper.getByTestId(MIXED_VALUE_TEST_ID).boundingBox();
    const fieldBox = await wrapper.getByTestId(SELECT_TEST_ID).boundingBox();
    expect(mixedBox).not.toBeNull();
    expect(fieldBox).not.toBeNull();
    expect(mixedBox!.x + mixedBox!.width).toBeLessThanOrEqual(fieldBox!.x + fieldBox!.width);
});

test('replace the "+N" badge with a count once no selection badge fits', async ({ mount }) => {
    const wrapper = await mount(
        <div style={{ width: 150 }}>
            <SelectMultiple aria-label="test" data-test-id={SELECT_TEST_ID} value={['first', 'second', 'third']}>
                <Select.Slot name="menu">
                    <Select.Item value="first">A long first value</Select.Item>
                    <Select.Item value="second">A long second value</Select.Item>
                    <Select.Item value="third">A long third value</Select.Item>
                </Select.Slot>
            </SelectMultiple>
        </div>,
    );

    await expect(wrapper.getByTestId(SELECTED_COUNT_TEST_ID)).toBeVisible();
    await expect(wrapper.getByTestId(SELECTED_COUNT_TEST_ID)).toHaveText('3 selected');
    await expect(wrapper.getByText(/^\+\d+$/)).toHaveCount(0);
    for (const badge of await wrapper.getByTestId('badge').all()) {
        await expect(badge).toBeHidden();
    }
});

test('show both counts once no selection badge fits next to the mixed count', async ({ mount }) => {
    const wrapper = await mount(
        <div style={{ width: 200 }}>
            <SelectMultiple
                aria-label="test"
                data-test-id={SELECT_TEST_ID}
                value={['first', 'second', 'third']}
                indeterminateValues={['partial']}
            >
                <Select.Slot name="menu">
                    <Select.Item value="first">A long first value</Select.Item>
                    <Select.Item value="second">A long second value</Select.Item>
                    <Select.Item value="third">A long third value</Select.Item>
                    <Select.Item value="partial">Partial item</Select.Item>
                </Select.Slot>
            </SelectMultiple>
        </div>,
    );

    await expect(wrapper.getByTestId(SELECTED_COUNT_TEST_ID)).toHaveText('3 selected');
    await expect(wrapper.getByTestId(SELECTED_COUNT_TEST_ID)).toBeVisible();
    await expect(wrapper.getByTestId(MIXED_VALUE_TEST_ID)).toHaveText('1 mixed');
    await expect(wrapper.getByTestId(MIXED_VALUE_TEST_ID)).toBeVisible();
    await expect(wrapper.getByTestId(MIXED_TEST_ID)).toHaveCount(0);
});

test('collapse everything into a single "Mixed" badge once even the counts do not fit', async ({ mount }) => {
    const wrapper = await mount(
        <div style={{ width: 110 }}>
            <SelectMultiple
                aria-label="test"
                data-test-id={SELECT_TEST_ID}
                value={['first', 'second', 'third']}
                indeterminateValues={['partial']}
            >
                <Select.Slot name="menu">
                    <Select.Item value="first">A long first value</Select.Item>
                    <Select.Item value="second">A long second value</Select.Item>
                    <Select.Item value="third">A long third value</Select.Item>
                    <Select.Item value="partial">Partial item</Select.Item>
                </Select.Slot>
            </SelectMultiple>
        </div>,
    );

    const mixedBadge = wrapper.getByTestId(MIXED_TEST_ID);
    await expect(mixedBadge).toHaveText('Mixed');
    await expect(mixedBadge).toBeVisible();
    await expect(wrapper.getByTestId(SELECTED_COUNT_TEST_ID)).toBeHidden();
    await expect(wrapper.getByTestId(MIXED_VALUE_TEST_ID)).toBeHidden();

    const mixedBox = await mixedBadge.boundingBox();
    const fieldBox = await wrapper.getByTestId(SELECT_TEST_ID).boundingBox();
    expect(mixedBox).not.toBeNull();
    expect(fieldBox).not.toBeNull();
    expect(mixedBox!.x + mixedBox!.width).toBeLessThanOrEqual(fieldBox!.x + fieldBox!.width);
});
