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

const DROPDOWN_TRIGGER_TEST_ID = 'overflow-items-dropdown-trigger';
const DROPDOWN_CONTENT_TEST_ID = 'overflow-items-dropdown-content';

test('should render with first tab active', async ({ mount }) => {
    const component = (
        await mount(
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
        )
    ).getByTestId(TABS_ROOT_TEST_ID);

    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(ACTIVE_TAB_INDICATOR_TEST_ID)).toBeVisible();
});

test('should rerender when the trigger content changes', async ({ mount }) => {
    const wrapper = await mount(
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
    const component = wrapper.getByTestId(TABS_ROOT_TEST_ID);
    await expect(component.getByText('First Tab')).toBeVisible();
    await expect(component.getByText('Swapped Tab')).not.toBeVisible();

    await wrapper.update(
        <Tabs.Root data-test-id={TABS_ROOT_TEST_ID}>
            <Tabs.Tab value="first">
                <Tabs.Trigger data-test-id={FIRST_TAB_TRIGGER_TEST_ID}>Swapped Tab</Tabs.Trigger>
                <Tabs.Content data-test-id={FIRST_TAB_CONTENT_TEST_ID}>First Content</Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="second">
                <Tabs.Trigger data-test-id={SECOND_TAB_TRIGGER_TEST_ID}>Second Tab</Tabs.Trigger>
                <Tabs.Content data-test-id={SECOND_TAB_CONTENT_TEST_ID}>Second Content</Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>,
    );
    await expect(component.getByText('First Tab')).not.toBeVisible();
    await expect(component.getByText('Swapped Tab')).toBeVisible();
});

test('should render with default tab active', async ({ mount }) => {
    const component = (
        await mount(
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
        )
    ).getByTestId(TABS_ROOT_TEST_ID);

    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).toBeVisible();
});

test('should render indicator under active tab', async ({ mount, page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const component = (
        await mount(
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
        )
    ).getByTestId(TABS_ROOT_TEST_ID);

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
    const component = (
        await mount(
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
        )
    ).getByTestId(TABS_ROOT_TEST_ID);

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

test('should allow switching tabs with keyboard', async ({ mount }) => {
    const component = (
        await mount(
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
        )
    ).getByTestId(TABS_ROOT_TEST_ID);

    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();

    await component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID).focus();
    await component.press('ArrowRight');

    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).toBeVisible();
});

test('should not allow disabled tab to be selected', async ({ mount }) => {
    const component = (
        await mount(
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
        )
    ).getByTestId(TABS_ROOT_TEST_ID);

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
    await component.press('ArrowRight');

    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(THIRD_TAB_CONTENT_TEST_ID)).toBeVisible();
});

test('should allow looping when switching tabs with keyboard', async ({ mount, page }) => {
    const component = (
        await mount(
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
        )
    ).getByTestId(TABS_ROOT_TEST_ID);

    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
    await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(ACTIVE_TAB_INDICATOR_TEST_ID)).toBeVisible();

    await component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID).focus();
    await component.press('ArrowRight');

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
    const component = (
        await mount(
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
        )
    ).getByTestId(TABS_ROOT_TEST_ID);

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
    const tolerance = 2;

    expect(Math.abs(firstTriggerCenter - indicatorCenter)).toBeLessThanOrEqual(tolerance);

    await component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID).focus();
    await component.press('ArrowRight');

    await page.waitForTimeout(500);
    indicatorBox = await component.getByTestId(ACTIVE_TAB_INDICATOR_TEST_ID).boundingBox();

    if (!firstTriggerBox || !secondTriggerBox || !indicatorBox) {
        throw new Error('Bounding boxes are undefined');
    }

    indicatorCenter = indicatorBox.x + indicatorBox.width / 2;
    expect(Math.abs(secondTriggerCenter - indicatorCenter)).toBeLessThanOrEqual(tolerance);
});

test('should render no padding', async ({ mount, page }) => {
    const component = (
        await mount(
            <Tabs.Root padding="none">
                <Tabs.Tab value="first">
                    <Tabs.Trigger data-test-id={FIRST_TAB_TRIGGER_TEST_ID}>First Tab</Tabs.Trigger>
                    <Tabs.Content data-test-id={FIRST_TAB_CONTENT_TEST_ID}>First Content</Tabs.Content>
                </Tabs.Tab>
            </Tabs.Root>,
        )
    ).getByTestId(TABS_ROOT_TEST_ID);
    await expect(page.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toHaveCSS('padding', '0px');
});

test('should render tight padding', async ({ mount, page }) => {
    const component = (
        await mount(
            <Tabs.Root padding="tight">
                <Tabs.Tab value="first">
                    <Tabs.Trigger data-test-id={FIRST_TAB_TRIGGER_TEST_ID}>First Tab</Tabs.Trigger>
                    <Tabs.Content data-test-id={FIRST_TAB_CONTENT_TEST_ID}>First Content</Tabs.Content>
                </Tabs.Tab>
            </Tabs.Root>,
        )
    ).getByTestId(TABS_ROOT_TEST_ID);
    await expect(page.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toHaveCSS('padding', '8px');
});

test('should render compact padding', async ({ mount, page }) => {
    await mount(
        <Tabs.Root padding="compact">
            <Tabs.Tab value="first">
                <Tabs.Trigger data-test-id={FIRST_TAB_TRIGGER_TEST_ID}>First Tab</Tabs.Trigger>
                <Tabs.Content data-test-id={FIRST_TAB_CONTENT_TEST_ID}>First Content</Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>,
    );
    await expect(page.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toHaveCSS('padding', '12px');
});

test('should render comfortable padding', async ({ mount, page }) => {
    await mount(
        <Tabs.Root padding="comfortable">
            <Tabs.Tab value="first">
                <Tabs.Trigger data-test-id={FIRST_TAB_TRIGGER_TEST_ID}>First Tab</Tabs.Trigger>
                <Tabs.Content data-test-id={FIRST_TAB_CONTENT_TEST_ID}>First Content</Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>,
    );
    await expect(page.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toHaveCSS('padding', '16px');
});

test('should render spacious padding', async ({ mount, page }) => {
    await mount(
        <Tabs.Root padding="spacious">
            <Tabs.Tab value="first">
                <Tabs.Trigger data-test-id={FIRST_TAB_TRIGGER_TEST_ID}>First Tab</Tabs.Trigger>
                <Tabs.Content data-test-id={FIRST_TAB_CONTENT_TEST_ID}>First Content</Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>,
    );
    await expect(page.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toHaveCSS('padding', '24px');
});

test.describe('small viewports', () => {
    test.use({ viewport: { width: 400, height: 800 } });

    test('should render overflowing tabs', async ({ mount }) => {
        const component = (
            await mount(
                <Tabs.Root data-test-id={TABS_ROOT_TEST_ID}>
                    <Tabs.Tab value="first">
                        <Tabs.Trigger data-test-id={FIRST_TAB_TRIGGER_TEST_ID}>
                            First Tab with long test after
                        </Tabs.Trigger>
                        <Tabs.Content data-test-id={FIRST_TAB_CONTENT_TEST_ID}>First Content</Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab value="second" disabled>
                        <Tabs.Trigger data-test-id={SECOND_TAB_TRIGGER_TEST_ID}>
                            Second Tab with long test after
                        </Tabs.Trigger>
                        <Tabs.Content data-test-id={SECOND_TAB_CONTENT_TEST_ID}>Second Content</Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab value="third">
                        <Tabs.Trigger data-test-id={THIRD_TAB_TRIGGER_TEST_ID}>
                            Third Tab with long test after
                        </Tabs.Trigger>
                        <Tabs.Content data-test-id={THIRD_TAB_CONTENT_TEST_ID}>Third Content</Tabs.Content>
                    </Tabs.Tab>
                </Tabs.Root>,
            )
        ).getByTestId(TABS_ROOT_TEST_ID);

        await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toBeVisible();
        await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toBeVisible();
        await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).not.toBeInViewport();
        await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toBeVisible();
        await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();
        await expect(component.getByTestId(THIRD_TAB_CONTENT_TEST_ID)).not.toBeVisible();
    });

    test('should show overflowing tabs on select', async ({ mount, page }) => {
        const component = (
            await mount(
                <Tabs.Root data-test-id={TABS_ROOT_TEST_ID}>
                    <Tabs.Tab value="first">
                        <Tabs.Trigger data-test-id={FIRST_TAB_TRIGGER_TEST_ID}>
                            First Tab with long test after
                        </Tabs.Trigger>
                        <Tabs.Content data-test-id={FIRST_TAB_CONTENT_TEST_ID}>First Content</Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab value="second">
                        <Tabs.Trigger data-test-id={SECOND_TAB_TRIGGER_TEST_ID}>
                            Second Tab with long test after
                        </Tabs.Trigger>
                        <Tabs.Content data-test-id={SECOND_TAB_CONTENT_TEST_ID}>Second Content</Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab value="third">
                        <Tabs.Trigger data-test-id={THIRD_TAB_TRIGGER_TEST_ID}>
                            Third Tab with long test after
                        </Tabs.Trigger>
                        <Tabs.Content data-test-id={THIRD_TAB_CONTENT_TEST_ID}>Third Content</Tabs.Content>
                    </Tabs.Tab>
                </Tabs.Root>,
            )
        ).getByTestId(TABS_ROOT_TEST_ID);

        await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toBeInViewport();
        await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toBeInViewport();
        await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).not.toBeInViewport();
        await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toBeVisible();
        await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();
        await expect(component.getByTestId(THIRD_TAB_CONTENT_TEST_ID)).not.toBeVisible();

        await component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID).focus();
        await component.press('ArrowRight');
        await page.waitForTimeout(500);
        await component.press('ArrowRight');
        await page.waitForTimeout(500);

        await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).not.toBeInViewport();
        await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toBeInViewport();
        await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).toBeInViewport();
        await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).not.toBeVisible();
        await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();
        await expect(component.getByTestId(THIRD_TAB_CONTENT_TEST_ID)).toBeVisible();
    });

    test('should render overflowing tabs in dropdown', async ({ mount, page }) => {
        const FIRST_TAB_TRIGGER_TEXT = 'First Tab with long test after';
        const SECOND_TAB_TRIGGER_TEXT = 'Second Tab with long test after';
        const THIRD_TAB_TRIGGER_TEXT = 'Third Tab with long test after';
        const component = (
            await mount(
                <Tabs.Root data-test-id={TABS_ROOT_TEST_ID}>
                    <Tabs.Tab value="first">
                        <Tabs.Trigger data-test-id={FIRST_TAB_TRIGGER_TEST_ID}>{FIRST_TAB_TRIGGER_TEXT}</Tabs.Trigger>
                        <Tabs.Content data-test-id={FIRST_TAB_CONTENT_TEST_ID}>First Content</Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab value="second" disabled>
                        <Tabs.Trigger data-test-id={SECOND_TAB_TRIGGER_TEST_ID}>{SECOND_TAB_TRIGGER_TEXT}</Tabs.Trigger>
                        <Tabs.Content data-test-id={SECOND_TAB_CONTENT_TEST_ID}>Second Content</Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab value="third">
                        <Tabs.Trigger data-test-id={THIRD_TAB_TRIGGER_TEST_ID}>{THIRD_TAB_TRIGGER_TEXT}</Tabs.Trigger>
                        <Tabs.Content data-test-id={THIRD_TAB_CONTENT_TEST_ID}>Third Content</Tabs.Content>
                    </Tabs.Tab>
                </Tabs.Root>,
            )
        ).getByTestId(TABS_ROOT_TEST_ID);

        await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toBeInViewport();
        await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toBeInViewport();
        await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).not.toBeInViewport();
        await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toBeVisible();
        await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();
        await expect(component.getByTestId(THIRD_TAB_CONTENT_TEST_ID)).not.toBeVisible();

        await component.getByTestId(DROPDOWN_TRIGGER_TEST_ID).click();
        const dropdownContent = page.getByTestId(DROPDOWN_CONTENT_TEST_ID);
        await expect(dropdownContent).toBeVisible();
        await expect(dropdownContent.getByText(SECOND_TAB_TRIGGER_TEXT)).toBeVisible();
        await expect(dropdownContent.getByText(SECOND_TAB_TRIGGER_TEXT).locator('..')).toBeDisabled();
        await expect(dropdownContent.getByText(THIRD_TAB_TRIGGER_TEXT)).toBeVisible();
    });

    test('should update overflowing tabs when scrolled', async ({ mount, page }) => {
        const FIRST_TAB_TRIGGER_TEXT = 'First Tab with long test after';
        const SECOND_TAB_TRIGGER_TEXT = 'Second Tab with long test after';
        const THIRD_TAB_TRIGGER_TEXT = 'Third Tab with long test after';
        const component = (
            await mount(
                <Tabs.Root data-test-id={TABS_ROOT_TEST_ID}>
                    <Tabs.Tab value="first">
                        <Tabs.Trigger data-test-id={FIRST_TAB_TRIGGER_TEST_ID}>{FIRST_TAB_TRIGGER_TEXT}</Tabs.Trigger>
                        <Tabs.Content data-test-id={FIRST_TAB_CONTENT_TEST_ID}>First Content</Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab value="second" disabled>
                        <Tabs.Trigger data-test-id={SECOND_TAB_TRIGGER_TEST_ID}>{SECOND_TAB_TRIGGER_TEXT}</Tabs.Trigger>
                        <Tabs.Content data-test-id={SECOND_TAB_CONTENT_TEST_ID}>Second Content</Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab value="third">
                        <Tabs.Trigger data-test-id={THIRD_TAB_TRIGGER_TEST_ID}>{THIRD_TAB_TRIGGER_TEXT}</Tabs.Trigger>
                        <Tabs.Content data-test-id={THIRD_TAB_CONTENT_TEST_ID}>Third Content</Tabs.Content>
                    </Tabs.Tab>
                </Tabs.Root>,
            )
        ).getByTestId(TABS_ROOT_TEST_ID);

        await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toBeInViewport();
        await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toBeInViewport();
        await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).not.toBeInViewport();
        await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toBeVisible();
        await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();
        await expect(component.getByTestId(THIRD_TAB_CONTENT_TEST_ID)).not.toBeVisible();

        await component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID).focus();
        await component.press('ArrowRight');
        await page.waitForTimeout(500);
        await component.press('ArrowRight');
        await page.waitForTimeout(500);

        await component.getByTestId(DROPDOWN_TRIGGER_TEST_ID).click();
        const dropdownContent = page.getByTestId(DROPDOWN_CONTENT_TEST_ID);
        await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
        await expect(dropdownContent.getByText(SECOND_TAB_TRIGGER_TEXT)).toBeVisible();
        await expect(dropdownContent.getByText(SECOND_TAB_TRIGGER_TEXT).locator('..')).toBeDisabled();
        await expect(dropdownContent.getByText(THIRD_TAB_TRIGGER_TEXT)).toBeVisible();
    });

    test('should allow selecting tabs in dropdown', async ({ mount, page }) => {
        const FIRST_TAB_TRIGGER_TEXT = 'First Tab with long test after';
        const SECOND_TAB_TRIGGER_TEXT = 'Second Tab with long test after';
        const THIRD_TAB_TRIGGER_TEXT = 'Third Tab with long test after';
        const component = (
            await mount(
                <Tabs.Root data-test-id={TABS_ROOT_TEST_ID}>
                    <Tabs.Tab value="first">
                        <Tabs.Trigger data-test-id={FIRST_TAB_TRIGGER_TEST_ID}>{FIRST_TAB_TRIGGER_TEXT}</Tabs.Trigger>
                        <Tabs.Content data-test-id={FIRST_TAB_CONTENT_TEST_ID}>First Content</Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab value="second" disabled>
                        <Tabs.Trigger data-test-id={SECOND_TAB_TRIGGER_TEST_ID}>{SECOND_TAB_TRIGGER_TEXT}</Tabs.Trigger>
                        <Tabs.Content data-test-id={SECOND_TAB_CONTENT_TEST_ID}>Second Content</Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab value="third">
                        <Tabs.Trigger data-test-id={THIRD_TAB_TRIGGER_TEST_ID}>{THIRD_TAB_TRIGGER_TEXT}</Tabs.Trigger>
                        <Tabs.Content data-test-id={THIRD_TAB_CONTENT_TEST_ID}>Third Content</Tabs.Content>
                    </Tabs.Tab>
                </Tabs.Root>,
            )
        ).getByTestId(TABS_ROOT_TEST_ID);

        await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toBeInViewport();
        await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toBeInViewport();
        await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).not.toBeInViewport();
        await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).toBeVisible();
        await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();
        await expect(component.getByTestId(THIRD_TAB_CONTENT_TEST_ID)).not.toBeVisible();

        await component.getByTestId(DROPDOWN_TRIGGER_TEST_ID).click();
        const dropdownContent = page.getByTestId(DROPDOWN_CONTENT_TEST_ID);
        await expect(dropdownContent).toBeVisible();
        await expect(dropdownContent.getByText(SECOND_TAB_TRIGGER_TEXT)).toBeVisible();
        await expect(dropdownContent.getByText(SECOND_TAB_TRIGGER_TEXT).locator('..')).toBeDisabled();
        await expect(dropdownContent.getByText(THIRD_TAB_TRIGGER_TEXT)).toBeVisible();

        await dropdownContent.getByText(THIRD_TAB_TRIGGER_TEXT).click();

        await page.waitForTimeout(500);

        await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).not.toBeInViewport();
        await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).toBeInViewport();
        await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).toBeInViewport();
        await expect(component.getByTestId(FIRST_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(SECOND_TAB_TRIGGER_TEST_ID)).not.toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(THIRD_TAB_TRIGGER_TEST_ID)).toHaveAttribute('data-state', 'active');
        await expect(component.getByTestId(FIRST_TAB_CONTENT_TEST_ID)).not.toBeVisible();
        await expect(component.getByTestId(SECOND_TAB_CONTENT_TEST_ID)).not.toBeVisible();
        await expect(component.getByTestId(THIRD_TAB_CONTENT_TEST_ID)).toBeVisible();
    });
});
