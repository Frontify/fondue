/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Switch } from '../Switch';

const ARIA_LABEL = 'Toggle airplane mode';

/**
 * Visual regression tests for Switch component
 * These tests capture screenshots of all Switch variants to ensure
 * the migration from Tailwind to SCSS modules doesn't change the appearance
 */

test.describe('Switch Visual Regression', () => {
    test.describe('Sizes', () => {
        test('small size - unchecked', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Switch size="small" aria-label={ARIA_LABEL} defaultValue={false} />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('switch-size-small-unchecked.png');
        });

        test('small size - checked', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Switch size="small" aria-label={ARIA_LABEL} defaultValue={true} />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('switch-size-small-checked.png');
        });

        test('medium size - unchecked', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Switch size="medium" aria-label={ARIA_LABEL} defaultValue={false} />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('switch-size-medium-unchecked.png');
        });

        test('medium size - checked', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Switch size="medium" aria-label={ARIA_LABEL} defaultValue={true} />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('switch-size-medium-checked.png');
        });

        test('large size - unchecked', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Switch size="large" aria-label={ARIA_LABEL} defaultValue={false} />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('switch-size-large-unchecked.png');
        });

        test('large size - checked', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Switch size="large" aria-label={ARIA_LABEL} defaultValue={true} />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('switch-size-large-checked.png');
        });
    });

    test.describe('States', () => {
        test('disabled - unchecked', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Switch aria-label={ARIA_LABEL} disabled defaultValue={false} />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('switch-disabled-unchecked.png');
        });

        test('disabled - checked', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Switch aria-label={ARIA_LABEL} disabled defaultValue={true} />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('switch-disabled-checked.png');
        });

        test('hover - unchecked', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Switch aria-label={ARIA_LABEL} defaultValue={false} data-test-id="switch-hover" />
                </div>,
            );
            const switchElement = wrapper.getByTestId('switch-hover');
            await switchElement.hover();
            await expect(wrapper).toHaveScreenshot('switch-hover-unchecked.png');
        });

        test('hover - checked', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Switch aria-label={ARIA_LABEL} defaultValue={true} data-test-id="switch-hover" />
                </div>,
            );
            const switchElement = wrapper.getByTestId('switch-hover');
            await switchElement.hover();
            await expect(wrapper).toHaveScreenshot('switch-hover-checked.png');
        });

        test('focus - unchecked', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Switch aria-label={ARIA_LABEL} defaultValue={false} data-test-id="switch-focus" />
                </div>,
            );
            const switchElement = wrapper.getByTestId('switch-focus');
            await switchElement.focus();
            await expect(wrapper).toHaveScreenshot('switch-focus-unchecked.png');
        });

        test('focus - checked', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Switch aria-label={ARIA_LABEL} defaultValue={true} data-test-id="switch-focus" />
                </div>,
            );
            const switchElement = wrapper.getByTestId('switch-focus');
            await switchElement.focus();
            await expect(wrapper).toHaveScreenshot('switch-focus-checked.png');
        });
    });

    test.describe('RTL Support', () => {
        test('RTL - unchecked', async ({ mount }) => {
            const wrapper = await mount(
                <div dir="rtl" style={{ padding: '20px' }}>
                    <Switch aria-label={ARIA_LABEL} defaultValue={false} />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('switch-rtl-unchecked.png');
        });

        test('RTL - checked', async ({ mount }) => {
            const wrapper = await mount(
                <div dir="rtl" style={{ padding: '20px' }}>
                    <Switch aria-label={ARIA_LABEL} defaultValue={true} />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('switch-rtl-checked.png');
        });

        test('RTL - small size checked', async ({ mount }) => {
            const wrapper = await mount(
                <div dir="rtl" style={{ padding: '20px' }}>
                    <Switch size="small" aria-label={ARIA_LABEL} defaultValue={true} />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('switch-rtl-small-checked.png');
        });

        test('RTL - large size checked', async ({ mount }) => {
            const wrapper = await mount(
                <div dir="rtl" style={{ padding: '20px' }}>
                    <Switch size="large" aria-label={ARIA_LABEL} defaultValue={true} />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('switch-rtl-large-checked.png');
        });
    });

    test.describe('Combined Variations', () => {
        test('small disabled checked', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Switch size="small" aria-label={ARIA_LABEL} disabled defaultValue={true} />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('switch-combined-small-disabled-checked.png');
        });

        test('large disabled unchecked', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Switch size="large" aria-label={ARIA_LABEL} disabled defaultValue={false} />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('switch-combined-large-disabled-unchecked.png');
        });
    });
});
