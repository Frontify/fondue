/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Label } from '../Label';

/**
 * Visual regression tests for Label component
 * These tests capture screenshots of all Label variants to ensure
 * the migration from cn() utility to data attributes doesn't change the appearance
 */

test.describe('Label Visual Regression', () => {
    test.describe('Variants', () => {
        test('default variant', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Label htmlFor="input-default">Default Label</Label>
                    <input id="input-default" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('label-variant-default.png');
        });

        test('strong variant', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Label htmlFor="input-strong" variant="strong">
                        Strong Label
                    </Label>
                    <input id="input-strong" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('label-variant-strong.png');
        });
    });

    test.describe('Required State', () => {
        test('required - default variant', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Label htmlFor="input-required" required>
                        Required Label
                    </Label>
                    <input id="input-required" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('label-required-default.png');
        });

        test('required - strong variant', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Label htmlFor="input-required-strong" variant="strong" required>
                        Required Strong Label
                    </Label>
                    <input id="input-required-strong" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('label-required-strong.png');
        });
    });

    test.describe('Interactive States', () => {
        test('with hovered input', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Label htmlFor="input-hover">Label with Hover</Label>
                    <input id="input-hover" data-test-id="input-hover" />
                </div>,
            );
            const input = wrapper.getByTestId('input-hover');
            await input.hover();
            await expect(wrapper).toHaveScreenshot('label-input-hover.png');
        });

        test('with disabled input', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Label htmlFor="input-disabled">Disabled Label</Label>
                    <input id="input-disabled" disabled />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('label-input-disabled.png');
        });

        test('with readonly input', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Label htmlFor="input-readonly">Readonly Label</Label>
                    <input id="input-readonly" aria-readonly="true" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('label-input-readonly.png');
        });

        test('required with disabled input', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Label htmlFor="input-disabled-required" required>
                        Disabled Required Label
                    </Label>
                    <input id="input-disabled-required" disabled />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('label-input-disabled-required.png');
        });
    });

    test.describe('Custom className', () => {
        test('with custom className', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <style>{`
                        .custom-label-class {
                            color: rgb(255, 0, 0);
                            font-size: 18px;
                        }
                    `}</style>
                    <Label htmlFor="input-custom" className="custom-label-class">
                        Custom Styled Label
                    </Label>
                    <input id="input-custom" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('label-custom-classname.png');
        });

        test('custom className with required', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <style>{`
                        .custom-label-required {
                            text-decoration: underline;
                        }
                    `}</style>
                    <Label htmlFor="input-custom-required" className="custom-label-required" required>
                        Custom Required Label
                    </Label>
                    <input id="input-custom-required" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('label-custom-classname-required.png');
        });
    });

    test.describe('RTL Support', () => {
        test('RTL - default variant', async ({ mount }) => {
            const wrapper = await mount(
                <div dir="rtl" style={{ padding: '20px' }}>
                    <Label htmlFor="input-rtl">RTL Label</Label>
                    <input id="input-rtl" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('label-rtl-default.png');
        });

        test('RTL - required', async ({ mount }) => {
            const wrapper = await mount(
                <div dir="rtl" style={{ padding: '20px' }}>
                    <Label htmlFor="input-rtl-required" required>
                        RTL Required Label
                    </Label>
                    <input id="input-rtl-required" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('label-rtl-required.png');
        });

        test('RTL - strong variant', async ({ mount }) => {
            const wrapper = await mount(
                <div dir="rtl" style={{ padding: '20px' }}>
                    <Label htmlFor="input-rtl-strong" variant="strong">
                        RTL Strong Label
                    </Label>
                    <input id="input-rtl-strong" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('label-rtl-strong.png');
        });

        test('RTL - required strong variant', async ({ mount }) => {
            const wrapper = await mount(
                <div dir="rtl" style={{ padding: '20px' }}>
                    <Label htmlFor="input-rtl-required-strong" variant="strong" required>
                        RTL Required Strong Label
                    </Label>
                    <input id="input-rtl-required-strong" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('label-rtl-required-strong.png');
        });
    });

    test.describe('Complex Content', () => {
        test('with complex children (icon)', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px' }}>
                    <Label htmlFor="input-complex">
                        Label with Icon
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <circle cx="8" cy="8" r="4" />
                        </svg>
                    </Label>
                    <input id="input-complex" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('label-complex-content.png');
        });

        test('with long text', async ({ mount }) => {
            const wrapper = await mount(
                <div style={{ padding: '20px', maxWidth: '300px' }}>
                    <Label htmlFor="input-long">
                        This is a very long label text that should wrap properly and maintain its styling across
                        multiple lines
                    </Label>
                    <input id="input-long" />
                </div>,
            );
            await expect(wrapper).toHaveScreenshot('label-long-text.png');
        });
    });
});
