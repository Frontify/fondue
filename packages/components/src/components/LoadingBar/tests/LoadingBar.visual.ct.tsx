/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { LoadingBar } from '../LoadingBar';

/**
 * Visual regression tests for LoadingBar component
 * These tests capture screenshots of all LoadingBar variants to ensure
 * the migration from Tailwind to SCSS modules doesn't change the appearance
 */

test.describe('LoadingBar Visual Regression', () => {
    test.describe('Variants', () => {
        test('default variant', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={60} variant="default" aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-variant-default.png');
        });

        test('positive variant', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={60} variant="positive" aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-variant-positive.png');
        });

        test('negative variant', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={60} variant="negative" aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-variant-negative.png');
        });
    });

    test.describe('Sizes', () => {
        test('small size', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={60} size="small" aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-size-small.png');
        });

        test('medium size', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={60} size="medium" aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-size-medium.png');
        });

        test('large size', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={60} size="large" aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-size-large.png');
        });

        test('x-large size', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={60} size="x-large" aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-size-xlarge.png');
        });
    });

    test.describe('Rounded', () => {
        test('rounded true', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={60} rounded={true} size="large" aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-rounded-true.png');
        });

        test('rounded false', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={60} rounded={false} size="large" aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-rounded-false.png');
        });
    });

    test.describe('Progress States', () => {
        test('progress at 0%', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={0} aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-progress-0.png');
        });

        test('progress at 25%', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={25} aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-progress-25.png');
        });

        test('progress at 50%', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={50} aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-progress-50.png');
        });

        test('progress at 75%', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={75} aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-progress-75.png');
        });

        test('progress at 100%', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={100} aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-progress-100.png');
        });

        test('indeterminate state', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={null} aria-label="Loading" />
                </div>,
            );
            // Wait a bit for animation to start
            await wrapper.page().waitForTimeout(100);
            await expect(wrapper).toHaveScreenshot('loadingbar-indeterminate.png', {
                animations: 'disabled', // Disable animations for consistent screenshots
            });
        });
    });

    test.describe('Combined Variations', () => {
        test('small positive rounded at 40%', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={40} size="small" variant="positive" rounded aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-combined-small-positive-rounded.png');
        });

        test('large negative not rounded at 80%', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={80} size="large" variant="negative" rounded={false} aria-label="Loading" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('loadingbar-combined-large-negative-no-rounded.png');
        });

        test('x-large default rounded indeterminate', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <LoadingBar value={null} size="x-large" variant="default" rounded aria-label="Loading" />
                </div>,
            );
            await wrapper.page().waitForTimeout(100);
            await expect(wrapper).toHaveScreenshot('loadingbar-combined-xlarge-default-indeterminate.png', {
                animations: 'disabled',
            });
        });
    });
});
