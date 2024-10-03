/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Tabs } from '../Tabs';

const TABS_ROOT_TEST_ID = 'test-tabs-root';
const FIRST_TAB_TRIGGER_TEST_ID = 'test-first-tab-trigger';
const FIRST_TAB_CONTENT_TEST_ID = 'test-first-tab-content';
const SECOND_TAB_TRIGGER_TEST_ID = 'test-second-tab-trigger';
const SECOND_TAB_CONTENT_TEST_ID = 'test-second-tab-content';
const THIRD_TAB_TRIGGER_TEST_ID = 'test-third-tab-trigger';
const THIRD_TAB_CONTENT_TEST_ID = 'test-third-tab-content';
const ACTIVE_TAB_INDICATOR_TEST_ID = 'active-tab-indicator';

test('should render with first tab active', async ({ mount }) => {
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
    }
});

test('should allow switching tabs with mouse', async ({ mount }) => {
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

    await component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID).click();

    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).toBeVisible();
});

test('should allow switching tabs with keyboard', async ({ mount, page }) => {
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

    await component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID).focus();
    await page.keyboard.press('ArrowRight');

    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).toBeVisible();
});

test('should not allow disabled tab to be selected', async ({ mount, page }) => {
    const component = await mount(
        <Tabs.Root data-test-id={TABS_ROOT_TEST_ID}>
            <Tabs.Tab value="first">
                <Tabs.Trigger data-test-id={FIRST_TAB_TRIGGER_TEST_ID}>First Tab</Tabs.Trigger>
                <Tabs.Content data-test-id={FIRST_TAB_CONTENT_TEST_ID}>First Content</Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="second" disabled>
                <Tabs.Trigger data-test-id={SECOND_TAB_TRIGGER_TEST_ID}>Second Tab</Tabs.Trigger>
                <Tabs.Content data-test-id={SECOND_TAB_CONTENT_TEST_ID}>Second Content</Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="third">
                <Tabs.Trigger data-test-id={THIRD_TAB_TRIGGER_TEST_ID}>Third Tab</Tabs.Trigger>
                <Tabs.Content data-test-id={THIRD_TAB_CONTENT_TEST_ID}>Third Content</Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>,
    );

    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(THIRD_TAB_CONTENT_TEST_ID)).not.toBeVisible();

    await component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID).focus();
    await page.keyboard.press('ArrowRight');

    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(THIRD_TAB_CONTENT_TEST_ID)).toBeVisible();
});

test('should allow looping when switching tabs with keyboard', async ({ mount, page }) => {
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

    await component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID).focus();
    await page.keyboard.press('ArrowRight');

    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).toBeVisible();

    await page.keyboard.press('ArrowRight');

    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();
});

test('should move indicator on tab change', async ({ mount, page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
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

    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(ACTIVE_TAB_INDICATOR_TEST_ID)).toBeVisible();

    // Get the positions
    const firstTrigger = component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID);
    const firstTriggerBox = await firstTrigger.boundingBox();
    const secondTrigger = component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID);
    const secondTriggerBox = await secondTrigger.boundingBox();
    let indicatorBox = await component.getByTestId(ACTIVE_TAB_INDICATOR_TEST_ID).boundingBox();

    // Ensure we have valid measurements
    expect(firstTriggerBox).toBeTruthy();
    expect(secondTriggerBox).toBeTruthy();
    expect(indicatorBox).toBeTruthy();

    if (!firstTriggerBox || !secondTriggerBox || !indicatorBox) {
        throw new Error('Bounding boxes are undefined');
    }

    // Compare the center positions rather than exact x coordinates
    const firstTriggerCenter = firstTriggerBox.x + firstTriggerBox.width / 2;
    const secondTriggerCenter = secondTriggerBox.x + secondTriggerBox.width / 2;
    let indicatorCenter = indicatorBox.x + indicatorBox.width / 2;

    // Allow for small differences in position because of scaling (1px margin of error)
    const tolerance = 1;

    expect(Math.abs(firstTriggerCenter - indicatorCenter)).toBeLessThanOrEqual(tolerance);

    await component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID).focus();
    await page.keyboard.press('ArrowRight');

    indicatorBox = await component.getByTestId(ACTIVE_TAB_INDICATOR_TEST_ID).boundingBox();

    if (!firstTriggerBox || !secondTriggerBox || !indicatorBox) {
        throw new Error('Bounding boxes are undefined');
    }
    indicatorCenter = indicatorBox.x + indicatorBox.width / 2;

    expect(Math.abs(secondTriggerCenter - indicatorCenter)).toBeLessThanOrEqual(tolerance);
});
