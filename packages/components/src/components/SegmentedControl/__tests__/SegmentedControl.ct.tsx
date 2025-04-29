/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { SegmentedControl } from '../SegmentedControl';

const SEGMENTED_CONTROL_TEST_ID = 'test-segmented-controls';

test('should render with default value', async ({ mount }) => {
    const component = await mount(
        <SegmentedControl.Root data-test-id={SEGMENTED_CONTROL_TEST_ID} defaultValue="second">
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>,
    );

    await expect(component.getByRole('radio').locator('nth=1')).toHaveAttribute('aria-checked', 'true');
});

test('should render with custom value', async ({ mount }) => {
    const component = await mount(
        <SegmentedControl.Root data-test-id={SEGMENTED_CONTROL_TEST_ID} defaultValue="first" value="second">
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>,
    );

    await expect(component.getByRole('radio').locator('nth=1')).toHaveAttribute('aria-checked', 'true');
});

test('should render with `disabled` state', async ({ mount }) => {
    const component = await mount(
        <SegmentedControl.Root data-test-id={SEGMENTED_CONTROL_TEST_ID} defaultValue="first" disabled>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>,
    );

    await expect(component.getByRole('radio').locator('nth=0')).toBeDisabled();
    await expect(component.getByRole('radio').locator('nth=1')).toBeDisabled();
    await expect(component.getByRole('radio').locator('nth=2')).toBeDisabled();
});

test('should call `onValueChange` callback', async ({ mount }) => {
    const onValueChange = sinon.spy();

    const component = await mount(
        <SegmentedControl.Root
            data-test-id={SEGMENTED_CONTROL_TEST_ID}
            defaultValue="first"
            onValueChange={onValueChange}
        >
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>,
    );

    await component.getByRole('radio').locator('nth=1').click();

    expect(onValueChange.calledWith('second')).toBe(true);
});

test('should not call `onValueChange` callback when `disabled`', async ({ mount }) => {
    const onValueChange = sinon.spy();

    const component = await mount(
        <SegmentedControl.Root
            data-test-id={SEGMENTED_CONTROL_TEST_ID}
            defaultValue="first"
            onValueChange={onValueChange}
            disabled
        >
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>,
    );

    await component.getByRole('radio').locator('nth=1').click({ force: true }); // `force: true` as the radio button is disabled

    expect(onValueChange.called).toBe(false);
});

test('should navigate with keyboard', async ({ mount }) => {
    const component = await mount(
        <SegmentedControl.Root data-test-id={SEGMENTED_CONTROL_TEST_ID} defaultValue="first">
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>,
    );

    await component.getByRole('radio').locator('nth=1').focus();

    await component.getByRole('radio').locator('nth=1').press('ArrowRight');
    await expect(component.getByRole('radio').locator('nth=2')).toBeFocused();

    await component.getByRole('radio').locator('nth=2').press('ArrowLeft');
    await expect(component.getByRole('radio').locator('nth=1')).toBeFocused();

    await component.getByRole('radio').locator('nth=1').press('ArrowDown');
    await expect(component.getByRole('radio').locator('nth=2')).toBeFocused();

    await component.getByRole('radio').locator('nth=2').press('ArrowUp');
    await expect(component.getByRole('radio').locator('nth=1')).toBeFocused();

    await component.getByRole('radio').locator('nth=1').press('Home');
    await expect(component.getByRole('radio').locator('nth=0')).toBeFocused();

    await component.getByRole('radio').locator('nth=0').press('End');
    await expect(component.getByRole('radio').locator('nth=2')).toBeFocused();
});

test('should render full width', async ({ mount }) => {
    const component = await mount(
        <div style={{ width: '550px' }}>
            <SegmentedControl.Root data-test-id={SEGMENTED_CONTROL_TEST_ID} defaultValue="second" hugWidth={false}>
                <SegmentedControl.Item value="first">First</SegmentedControl.Item>
                <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
                <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
            </SegmentedControl.Root>
        </div>,
    );

    const boundingBox = await component.getByTestId(SEGMENTED_CONTROL_TEST_ID).boundingBox();
    expect(boundingBox?.width).toBe(550);
});

test('should work with enum values', async ({ mount }) => {
    // Define an enum for testing generic type functionality
    const enum TabOptions {
        First = 'first',
        Second = 'second',
        Third = 'third',
    }

    const onValueChange = sinon.spy();

    const component = await mount(
        <SegmentedControl.Root<TabOptions>
            data-test-id={SEGMENTED_CONTROL_TEST_ID}
            defaultValue={TabOptions.First}
            onValueChange={onValueChange}
        >
            <SegmentedControl.Item value={TabOptions.First}>First</SegmentedControl.Item>
            <SegmentedControl.Item value={TabOptions.Second}>Second</SegmentedControl.Item>
            <SegmentedControl.Item value={TabOptions.Third}>Third</SegmentedControl.Item>
        </SegmentedControl.Root>,
    );

    // Check initial state
    await expect(component.getByRole('radio').locator('nth=0')).toHaveAttribute('aria-checked', 'true');

    // Click second option
    await component.getByRole('radio').locator('nth=1').click();

    // Verify callback was called with the enum value
    expect(onValueChange.calledOnce).toBe(true);
    expect(onValueChange.firstCall.args[0]).toBe(TabOptions.Second);

    // Check the UI updates correctly
    await expect(component.getByRole('radio').locator('nth=1')).toHaveAttribute('aria-checked', 'true');
});
