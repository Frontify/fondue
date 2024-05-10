/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Tooltip } from '../Tooltip';

const TOOLTIP_TRIGGER_TEST_ID = 'fondue-tooltip-trigger';
const TOOLTIP_CONTENT_TEST_ID = 'fondue-tooltip-content';
const TOOLTIP_TEXT =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

test('should render without error', async ({ mount }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content>{TOOLTIP_TEXT}</Tooltip.Content>
        </Tooltip.Root>,
    );
    await expect(component).toBeVisible();
});

test('should appear on hover', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content data-test-id={TOOLTIP_CONTENT_TEST_ID}>{TOOLTIP_TEXT}</Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
});

test('should have correct padding spacious', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content data-test-id={TOOLTIP_CONTENT_TEST_ID} padding="spacious">
                {TOOLTIP_TEXT}
            </Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
    await expect(tooltipContent).toHaveClass(/tw-px-3 tw-py-2/);
});

test('should have correct padding compact', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content data-test-id={TOOLTIP_CONTENT_TEST_ID} padding="compact">
                {TOOLTIP_TEXT}
            </Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
    await expect(tooltipContent).toHaveClass(/tw-px-2 tw-py-1/);
});

test('should have correct padding compact', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content data-test-id={TOOLTIP_CONTENT_TEST_ID} padding="compact">
                {TOOLTIP_TEXT}
            </Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
    await expect(tooltipContent).toHaveClass(/tw-px-2 tw-py-1/);
});

test('should have correct max width', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content data-test-id={TOOLTIP_CONTENT_TEST_ID}>{TOOLTIP_TEXT}</Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
    await expect(tooltipContent).toHaveClass(/tw-max-w-48/);
});

test('should have custom max width', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content data-test-id={TOOLTIP_CONTENT_TEST_ID} maxWidth="400px">
                {TOOLTIP_TEXT}
            </Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
    await expect(tooltipContent).toHaveCSS('max-width', '400px');
});

test('should show on correct default side top', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button style={{ margin: 250 }}>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content data-test-id={TOOLTIP_CONTENT_TEST_ID}>{TOOLTIP_TEXT}</Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
    const tooltipTriggerRect = await component.boundingBox();
    const tooltipContentRect = await tooltipContent.boundingBox();
    expect(tooltipContentRect).not.toBeUndefined();
    expect(tooltipTriggerRect).not.toBeUndefined();
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipContentRect.y + tooltipContentRect.height).toBeLessThan(tooltipTriggerRect.y);
    }
});

test('should show on custom side top', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button style={{ margin: 250 }}>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content side="top" data-test-id={TOOLTIP_CONTENT_TEST_ID}>
                {TOOLTIP_TEXT}
            </Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
    const tooltipTriggerRect = await component.boundingBox();
    const tooltipContentRect = await tooltipContent.boundingBox();
    expect(tooltipContentRect).not.toBeUndefined();
    expect(tooltipTriggerRect).not.toBeUndefined();
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipContentRect.y + tooltipContentRect.height).toBeLessThan(tooltipTriggerRect.y);
    }
});

test('should show on custom side bottom', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button style={{ margin: 250 }}>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content side="bottom" data-test-id={TOOLTIP_CONTENT_TEST_ID}>
                {TOOLTIP_TEXT}
            </Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
    const tooltipTriggerRect = await component.boundingBox();
    const tooltipContentRect = await tooltipContent.boundingBox();
    expect(tooltipContentRect).not.toBeUndefined();
    expect(tooltipTriggerRect).not.toBeUndefined();
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipTriggerRect.y + tooltipTriggerRect.height).toBeLessThan(tooltipContentRect.y);
    }
});

test('should show on custom side left', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button style={{ margin: 250 }}>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content side="left" data-test-id={TOOLTIP_CONTENT_TEST_ID}>
                {TOOLTIP_TEXT}
            </Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
    const tooltipTriggerRect = await component.boundingBox();
    const tooltipContentRect = await tooltipContent.boundingBox();
    expect(tooltipContentRect).not.toBeUndefined();
    expect(tooltipTriggerRect).not.toBeUndefined();
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipContentRect.x + tooltipContentRect.width).toBeLessThan(tooltipTriggerRect.x);
    }
});

test('should show on custom side right', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button style={{ margin: 250 }}>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content side="right" data-test-id={TOOLTIP_CONTENT_TEST_ID}>
                {TOOLTIP_TEXT}
            </Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
    const tooltipTriggerRect = await component.boundingBox();
    const tooltipContentRect = await tooltipContent.boundingBox();
    expect(tooltipContentRect).not.toBeUndefined();
    expect(tooltipTriggerRect).not.toBeUndefined();
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipTriggerRect.x + tooltipTriggerRect.width).toBeLessThan(tooltipContentRect.x);
    }
});

test('should detect left collision and show on the right', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content side="left" data-test-id={TOOLTIP_CONTENT_TEST_ID}>
                {TOOLTIP_TEXT}
            </Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
    const tooltipTriggerRect = await component.boundingBox();
    const tooltipContentRect = await tooltipContent.boundingBox();
    expect(tooltipContentRect).not.toBeUndefined();
    expect(tooltipTriggerRect).not.toBeUndefined();
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipTriggerRect.x + tooltipTriggerRect.width).toBeLessThan(tooltipContentRect.x);
    }
});

test('should detect top collision and show on the bottom', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content side="top" data-test-id={TOOLTIP_CONTENT_TEST_ID}>
                {TOOLTIP_TEXT}
            </Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
    const tooltipTriggerRect = await component.boundingBox();
    const tooltipContentRect = await tooltipContent.boundingBox();
    expect(tooltipContentRect).not.toBeUndefined();
    expect(tooltipTriggerRect).not.toBeUndefined();
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipTriggerRect.y + tooltipTriggerRect.height).toBeLessThan(tooltipContentRect.y);
    }
});

test('should ignore left collision', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content side="left" ignoreCollisions data-test-id={TOOLTIP_CONTENT_TEST_ID}>
                {TOOLTIP_TEXT}
            </Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
    const tooltipTriggerRect = await component.boundingBox();
    const tooltipContentRect = await tooltipContent.boundingBox();
    expect(tooltipContentRect).not.toBeUndefined();
    expect(tooltipTriggerRect).not.toBeUndefined();
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipContentRect.x + tooltipContentRect.width).toBeLessThan(tooltipTriggerRect.x);
    }
});

test('should ignore top collision', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content side="top" ignoreCollisions data-test-id={TOOLTIP_CONTENT_TEST_ID}>
                {TOOLTIP_TEXT}
            </Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
    const tooltipTriggerRect = await component.boundingBox();
    const tooltipContentRect = await tooltipContent.boundingBox();
    expect(tooltipContentRect).not.toBeUndefined();
    expect(tooltipTriggerRect).not.toBeUndefined();
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipContentRect.y + tooltipContentRect.height).toBeLessThan(tooltipTriggerRect.y);
    }
});
