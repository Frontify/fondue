/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Tabs } from '../Tabs';

const TABS_ROOT_TEST_ID = 'test-tabs-root';
const FIRST_TAB_TRIGGER_TEST_ID = 'test-first-tab-trigger';
const FIRST_TAB_CONTENT_TEST_ID = 'test-first-tab-content';
const SECOND_TAB_TRIGGER_TEST_ID = 'test-second-tab-trigger';
const SECOND_TAB_CONTENT_TEST_ID = 'test-second-tab-content';
const ACTIVE_TAB_INDICATOR_TEST_ID = 'active-tab-indicator';

test('should render with first tab active', async ({ mount, page }) => {
    const component = await mount(
        <Tabs.Root data-test-id={TABS_ROOT_TEST_ID}>
            <Tabs.Tab value="first">
                <Tabs.Trigger data-test-id={FIRST_TAB_TRIGGER_TEST_ID}>First Tab</Tabs.Trigger>
                <Tabs.Content data-test-id={FIRST_TAB_CONTENT_TEST_ID}>First Content</Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="second">
                <Tabs.Trigger data-test-id={SECOND_TAB_TRIGGER_TEST_ID}>Second Tab</Tabs.Trigger>
                <Tabs.Content data-test-id={SECOND_TAB_CONTENT_TEST_ID}>Second Content</Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>,
    );

    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(ACTIVE_TAB_INDICATOR_TEST_ID)).toBeVisible();
});

test('should render with default tab active', async ({ mount }) => {
    const component = await mount(
        <Tabs.Root data-test-id={TABS_ROOT_TEST_ID} defaultActiveTab="second">
            <Tabs.Tab value="first">
                <Tabs.Trigger data-test-id={FIRST_TAB_TRIGGER_TEST_ID}>First Tab</Tabs.Trigger>
                <Tabs.Content data-test-id={FIRST_TAB_CONTENT_TEST_ID}>First Content</Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="second">
                <Tabs.Trigger data-test-id={SECOND_TAB_TRIGGER_TEST_ID}>Second Tab</Tabs.Trigger>
                <Tabs.Content data-test-id={SECOND_TAB_CONTENT_TEST_ID}>Second Content</Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>,
    );

    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).toBeVisible();
});

test('should render indicator under active tab', async ({ mount, page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const component = await mount(
        <Tabs.Root data-test-id={TABS_ROOT_TEST_ID} defaultActiveTab="second">
            <Tabs.Tab value="first">
                <Tabs.Trigger data-test-id={FIRST_TAB_TRIGGER_TEST_ID}>First Tab</Tabs.Trigger>
                <Tabs.Content data-test-id={FIRST_TAB_CONTENT_TEST_ID}>First Content</Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="second">
                <Tabs.Trigger data-test-id={SECOND_TAB_TRIGGER_TEST_ID}>Second Tab</Tabs.Trigger>
                <Tabs.Content data-test-id={SECOND_TAB_CONTENT_TEST_ID}>Second Content</Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>,
    );

    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).toHaveAttribute('data-state', 'active');
    const indicator = component.getByTestId(ACTIVE_TAB_INDICATOR_TEST_ID);
    await expect(indicator).toBeVisible();

    // Get the positions
    const trigger = component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID);
    const triggerBox = await trigger.boundingBox();
    const indicatorBox = await indicator.boundingBox();

    // Ensure we have valid measurements
    expect(triggerBox).toBeTruthy();
    expect(indicatorBox).toBeTruthy();

    if (triggerBox && indicatorBox) {
        // Compare the center positions rather than exact x coordinates
        const triggerCenter = triggerBox.x + triggerBox.width / 2;
        const indicatorCenter = indicatorBox.x + indicatorBox.width / 2;

        // Allow for small differences in position because of scaling (1px margin of error)
        const tolerance = 1;
        const difference = Math.abs(triggerCenter - indicatorCenter);

        expect(difference).toBeLessThanOrEqual(tolerance);

        // Optionally, also verify vertical positioning
        // The indicator should be at or below the trigger
        expect(indicatorBox.y).toBeGreaterThanOrEqual(triggerBox.y);
    }
});
