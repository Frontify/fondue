/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';

import { Button } from '../Button';

const BUTTON_TEXT = 'Button';

/**
 * Visual regression tests for Button component
 * These tests capture screenshots of all Button variants to ensure
 * the migration from Tailwind to SCSS modules doesn't change the appearance
 */

test.describe('Button Visual Regression', () => {
    test.describe('Variants', () => {
        test('default variant - strong emphasis', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button variant="default" emphasis="strong">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-default-strong.png');
        });

        test('default variant - default emphasis', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button variant="default" emphasis="default">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-default-default.png');
        });

        test('default variant - weak emphasis', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button variant="default" emphasis="weak">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-default-weak.png');
        });

        test('positive variant - strong emphasis', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button variant="positive" emphasis="strong">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-positive-strong.png');
        });

        test('positive variant - default emphasis', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button variant="positive" emphasis="default">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-positive-default.png');
        });

        test('positive variant - weak emphasis', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button variant="positive" emphasis="weak">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-positive-weak.png');
        });

        test('negative variant - strong emphasis', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button variant="negative" emphasis="strong">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-negative-strong.png');
        });

        test('negative variant - default emphasis', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button variant="negative" emphasis="default">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-negative-default.png');
        });

        test('negative variant - weak emphasis', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button variant="negative" emphasis="weak">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-negative-weak.png');
        });

        test('danger variant - strong emphasis', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button variant="danger" emphasis="strong">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-danger-strong.png');
        });

        test('danger variant - default emphasis', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button variant="danger" emphasis="default">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-danger-default.png');
        });

        test('danger variant - weak emphasis', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button variant="danger" emphasis="weak">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-danger-weak.png');
        });

        test('loud variant - strong emphasis', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button variant="loud" emphasis="strong">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-loud-strong.png');
        });

        test('loud variant - default emphasis', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button variant="loud" emphasis="default">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-loud-default.png');
        });

        test('loud variant - weak emphasis', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button variant="loud" emphasis="weak">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-loud-weak.png');
        });
    });

    test.describe('Sizes', () => {
        test('small size', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button size="small">{BUTTON_TEXT}</Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-size-small.png');
        });

        test('medium size', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button size="medium">{BUTTON_TEXT}</Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-size-medium.png');
        });

        test('large size', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button size="large">{BUTTON_TEXT}</Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-size-large.png');
        });
    });

    test.describe('Rounding', () => {
        test('medium rounding', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button rounding="medium">{BUTTON_TEXT}</Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-rounding-medium.png');
        });

        test('full rounding', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button rounding="full">{BUTTON_TEXT}</Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-rounding-full.png');
        });
    });

    test.describe('Aspect', () => {
        test('default aspect', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button aspect="default">{BUTTON_TEXT}</Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-aspect-default.png');
        });

        test('square aspect', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button aspect="square">
                        <IconIcon />
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-aspect-square.png');
        });
    });

    test.describe('HugWidth', () => {
        test('hugWidth true', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <Button hugWidth={true}>{BUTTON_TEXT}</Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-hugwidth-true.png');
        });

        test('hugWidth false', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', width: '300px' }}>
                    <Button hugWidth={false}>{BUTTON_TEXT}</Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-hugwidth-false.png');
        });
    });

    test.describe('States', () => {
        test('disabled state', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button disabled>{BUTTON_TEXT}</Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-disabled.png');
        });

        test('hover state', async ({ mount, page }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button data-test-id="button-hover">{BUTTON_TEXT}</Button>
                </div>,
            );
            const button = wrapper.getByTestId('button-hover');
            await button.hover();
            await expect(wrapper).toHaveScreenshot('button-hover.png');
        });
    });

    test.describe('Content Variations', () => {
        test('text only', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button>{BUTTON_TEXT}</Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-text-only.png');
        });

        test('icon only', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button>
                        <IconIcon />
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-icon-only.png');
        });

        test('icon and text', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button>
                        <IconIcon />
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-icon-text.png');
        });

        test('text and icon', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button>
                        {BUTTON_TEXT}
                        <IconIcon />
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-text-icon.png');
        });
    });

    test.describe('Combined Variations', () => {
        test('small positive weak with icon', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button size="small" variant="positive" emphasis="weak">
                        <IconIcon />
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-combined-small-positive-weak-icon.png');
        });

        test('large danger strong full rounding', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button size="large" variant="danger" emphasis="strong" rounding="full">
                        {BUTTON_TEXT}
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-combined-large-danger-strong-full.png');
        });

        test('medium loud default with square aspect', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Button size="medium" variant="loud" emphasis="default" aspect="square">
                        <IconIcon />
                    </Button>
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('button-combined-medium-loud-default-square.png');
        });
    });
});
