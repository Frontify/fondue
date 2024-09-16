/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import * as sinon from 'sinon';

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
    await expect(tooltipContent).toHaveCSS('padding', '8px 12px');
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
    await expect(tooltipContent).toHaveCSS('padding', '4px 8px');
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
    await expect(tooltipContent).toHaveCSS('max-width', '192px');
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
            <Tooltip.Trigger asChild={true} data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
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
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipContentRect.y + tooltipContentRect.height).toBeLessThan(tooltipTriggerRect.y);
    } else {
        throw new Error('Bounding boxes are undefined');
    }
});

test('should show on custom side top', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger asChild={true} data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
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
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipContentRect.y + tooltipContentRect.height).toBeLessThan(tooltipTriggerRect.y);
    } else {
        throw new Error('Bounding boxes are undefined');
    }
});

test('should show on custom side bottom', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger asChild={true} data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
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
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipTriggerRect.y + tooltipTriggerRect.height).toBeLessThan(tooltipContentRect.y);
    } else {
        throw new Error('Bounding boxes are undefined');
    }
});

test('should show on custom side left', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger asChild={true} data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
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
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipContentRect.x + tooltipContentRect.width).toBeLessThan(tooltipTriggerRect.x);
    } else {
        throw new Error('Bounding boxes are undefined');
    }
});

test('should show on custom side right', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger asChild={true} data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
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
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipTriggerRect.x + tooltipTriggerRect.width).toBeLessThan(tooltipContentRect.x);
    } else {
        throw new Error('Bounding boxes are undefined');
    }
});

test('should respect margins when wrapped', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button style={{ margin: 250 }} data-test-id="fondue-tooltip-button">
                    Hover over me!
                </button>
            </Tooltip.Trigger>
            <Tooltip.Content data-test-id={TOOLTIP_CONTENT_TEST_ID}>{TOOLTIP_TEXT}</Tooltip.Content>
        </Tooltip.Root>,
    );
    const tooltipContent = page.getByTestId(TOOLTIP_CONTENT_TEST_ID);
    const tooltipButton = page.getByTestId('fondue-tooltip-button');
    await expect(component).toBeVisible();
    await component.hover();
    await expect(tooltipContent).toBeVisible();
    const tooltipTriggerRect = await tooltipButton.boundingBox();
    const tooltipContentRect = await tooltipContent.boundingBox();
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipContentRect.y).toBe(tooltipTriggerRect.y + tooltipTriggerRect.height + 250 + 16 - 3); // margin + padding - negative offset applied by radix
    } else {
        throw new Error('Bounding boxes are undefined');
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
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipTriggerRect.x + tooltipTriggerRect.width).toBeLessThan(tooltipContentRect.x);
    } else {
        throw new Error('Bounding boxes are undefined');
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
    if (tooltipContentRect && tooltipTriggerRect) {
        expect(tooltipTriggerRect.y + tooltipTriggerRect.height).toBeLessThan(tooltipContentRect.y);
    } else {
        throw new Error('Bounding boxes are undefined');
    }
});

test('should allow for external control of open state', async ({ mount, page }) => {
    const component = await mount(
        <Tooltip.Root open={true}>
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
    await expect(tooltipContent).toBeVisible();
});

test('should trigger callback on open state change', async ({ mount }) => {
    const onOpenChange = sinon.spy();
    const component = await mount(
        <Tooltip.Root onOpenChange={onOpenChange} enterDelay={0}>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
                <button>Hover over me!</button>
            </Tooltip.Trigger>
            <Tooltip.Content side="top" data-test-id={TOOLTIP_CONTENT_TEST_ID}>
                {TOOLTIP_TEXT}
            </Tooltip.Content>
        </Tooltip.Root>,
    );
    await expect(component).toBeVisible();
    expect(onOpenChange.callCount).toBe(0);
    await component.hover();
    expect(onOpenChange.callCount).toBe(1);
});
