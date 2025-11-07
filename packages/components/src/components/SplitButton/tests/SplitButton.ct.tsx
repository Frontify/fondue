/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';

import { Button } from '../../Button/Button';
import { SplitButton } from '../SplitButton';

const SPLIT_BUTTON_TEXT = 'Primary Action';
const ACTION_BUTTON_TEXT = 'Action';

test('should render basic split button with content and action', async ({ mount }) => {
    const component = await mount(
        <SplitButton>
            <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
            <SplitButton.Action>
                <button type="button">{ACTION_BUTTON_TEXT}</button>
            </SplitButton.Action>
        </SplitButton>,
    );
    await expect(component).toContainText(SPLIT_BUTTON_TEXT);
    await expect(component.locator('button').first()).toBeVisible();
});

test('should have role="group"', async ({ mount }) => {
    const component = await mount(
        <SplitButton>
            <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
            <SplitButton.Action>
                <button type="button">{ACTION_BUTTON_TEXT}</button>
            </SplitButton.Action>
        </SplitButton>,
    );
    await expect(component).toHaveRole('group');
});

test('should apply variant styles', async ({ mount }) => {
    const component = await mount(
        <SplitButton variant="positive">
            <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
            <SplitButton.Action>
                <button type="button">{ACTION_BUTTON_TEXT}</button>
            </SplitButton.Action>
        </SplitButton>,
    );
    await expect(component).toHaveAttribute('data-variant', 'positive');
});

test('should apply size styles', async ({ mount }) => {
    const component = await mount(
        <SplitButton size="large">
            <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
            <SplitButton.Action>
                <button type="button">{ACTION_BUTTON_TEXT}</button>
            </SplitButton.Action>
        </SplitButton>,
    );
    await expect(component).toHaveAttribute('data-size', 'large');
});

test('should apply emphasis styles', async ({ mount }) => {
    const component = await mount(
        <SplitButton emphasis="weak">
            <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
            <SplitButton.Action>
                <button type="button">{ACTION_BUTTON_TEXT}</button>
            </SplitButton.Action>
        </SplitButton>,
    );
    await expect(component).toHaveAttribute('data-emphasis', 'weak');
});

test('should handle disabled state', async ({ mount }) => {
    const component = await mount(
        <SplitButton disabled>
            <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
            <SplitButton.Action>
                <button type="button">{ACTION_BUTTON_TEXT}</button>
            </SplitButton.Action>
        </SplitButton>,
    );
    await expect(component).toHaveAttribute('data-disabled', 'true');
});

test('should render content button as interactive element', async ({ mount }) => {
    const component = await mount(
        <SplitButton>
            <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
            <SplitButton.Action>
                <button type="button">{ACTION_BUTTON_TEXT}</button>
            </SplitButton.Action>
        </SplitButton>,
    );
    const contentButton = component.getByTestId('split-button-content');
    await expect(contentButton).toBeVisible();
    await expect(contentButton).toHaveRole('button');
});

test('should render action slot with child element', async ({ mount }) => {
    const component = await mount(
        <SplitButton>
            <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
            <SplitButton.Action>
                <Button aspect="square">
                    <span>{ACTION_BUTTON_TEXT}</span>
                </Button>
            </SplitButton.Action>
        </SplitButton>,
    );
    const actionSlot = component.getByTestId('split-button-action');
    await expect(actionSlot).toBeVisible();
    await expect(actionSlot).toContainText(ACTION_BUTTON_TEXT);
});

test('should render icon with text in content', async ({ mount }) => {
    const component = await mount(
        <SplitButton>
            <SplitButton.Content>
                <IconPlus size={16} />
                {SPLIT_BUTTON_TEXT}
            </SplitButton.Content>
            <SplitButton.Action>
                <button type="button">{ACTION_BUTTON_TEXT}</button>
            </SplitButton.Action>
        </SplitButton>,
    );
    await expect(component.locator('svg').first()).toBeVisible();
    await expect(component).toContainText(SPLIT_BUTTON_TEXT);
});

test('should trigger onPress when content clicked', async ({ mount }) => {
    let pressed = false;
    const component = await mount(
        <SplitButton>
            <SplitButton.Content
                onPress={() => {
                    pressed = true;
                }}
            >
                {SPLIT_BUTTON_TEXT}
            </SplitButton.Content>
            <SplitButton.Action>
                <button type="button">{ACTION_BUTTON_TEXT}</button>
            </SplitButton.Action>
        </SplitButton>,
    );
    await component.getByTestId('split-button-content').click();
    expect(pressed).toBe(true);
});

test('should render with custom aria-label', async ({ mount }) => {
    const ariaLabel = 'Custom button group';
    const component = await mount(
        <SplitButton aria-label={ariaLabel}>
            <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
            <SplitButton.Action>
                <button type="button">{ACTION_BUTTON_TEXT}</button>
            </SplitButton.Action>
        </SplitButton>,
    );
    await expect(component).toHaveAttribute('aria-label', ariaLabel);
});

test('should render all variant options', async ({ mount }) => {
    const variants = ['default', 'positive', 'negative', 'danger', 'loud'] as const;

    for (const variant of variants) {
        const component = await mount(
            <SplitButton variant={variant}>
                <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
                <SplitButton.Action>
                    <button type="button">{ACTION_BUTTON_TEXT}</button>
                </SplitButton.Action>
            </SplitButton>,
        );
        await expect(component).toHaveAttribute('data-variant', variant);
        await component.unmount();
    }
});

test('should render all size options', async ({ mount }) => {
    const sizes = ['small', 'medium', 'large'] as const;

    for (const size of sizes) {
        const component = await mount(
            <SplitButton size={size}>
                <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
                <SplitButton.Action>
                    <button type="button">{ACTION_BUTTON_TEXT}</button>
                </SplitButton.Action>
            </SplitButton>,
        );
        await expect(component).toHaveAttribute('data-size', size);
        await component.unmount();
    }
});

test('should render all emphasis options', async ({ mount }) => {
    const emphases = ['default', 'weak', 'strong'] as const;

    for (const emphasis of emphases) {
        const component = await mount(
            <SplitButton emphasis={emphasis}>
                <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
                <SplitButton.Action>
                    <button type="button">{ACTION_BUTTON_TEXT}</button>
                </SplitButton.Action>
            </SplitButton>,
        );
        await expect(component).toHaveAttribute('data-emphasis', emphasis);
        await component.unmount();
    }
});
