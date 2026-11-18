/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';

import { Button } from '../Button';

const BUTTON_TEXT = 'Frontify';

test('should render without error', async ({ mount }) => {
    const wrapper = await mount(<Button data-test-id="button-root">{BUTTON_TEXT}</Button>);
    const component = wrapper.getByTestId('button-root');
    await expect(component).toContainText(BUTTON_TEXT);
});

test('should render in positive medium and with only text.', async ({ mount }) => {
    const wrapper = await mount(
        <Button variant="positive" size="medium" data-test-id="button-root">
            {BUTTON_TEXT}
        </Button>,
    );
    const component = wrapper.getByTestId('button-root');
    await expect(component).toBeVisible();
    await expect(component).toContainText(BUTTON_TEXT);
});

test('should react on Click', async ({ mount }) => {
    const wrapper = await mount(
        <Button variant="positive" size="medium" data-test-id="button-root">
            {BUTTON_TEXT}
        </Button>,
    );
    const component = wrapper.getByTestId('button-root');
    await expect(component).toBeVisible();
    await expect(component).toContainText(BUTTON_TEXT);
});

test('should render in positive medium and with only icon.', async ({ mount }) => {
    const wrapper = await mount(
        <Button variant="positive" size="medium" data-test-id="button-root">
            <IconIcon data-test-id="fondue-icon-icon" />
        </Button>,
    );
    const component = wrapper.getByTestId('button-root');
    await expect(component).toBeVisible();
    await expect(component.locator('data-test-id=fondue-icon-icon')).toBeVisible();
});

test('should render in positive medium and with only only an icon and fully rounded.', async ({ mount }) => {
    const wrapper = await mount(
        <Button variant="positive" size="medium" rounding="full" data-test-id="button-root">
            <IconIcon data-test-id="fondue-icon-icon" />
        </Button>,
    );
    const component = wrapper.getByTestId('button-root');
    await expect(component).toBeVisible();
    await expect(component).toHaveAttribute('data-rounding', 'full');
    await expect(component.locator('data-test-id=fondue-icon-icon')).toBeVisible();
});

test('should render in positive medium with an icon and text.', async ({ mount }) => {
    const wrapper = await mount(
        <Button variant="positive" size="medium" data-test-id="button-root">
            <IconIcon data-test-id="fondue-icon-icon" />
            {BUTTON_TEXT}
        </Button>,
    );
    const component = wrapper.getByTestId('button-root');
    await expect(component).toBeVisible();
    await expect(component).toHaveText(BUTTON_TEXT);
    await expect(component.locator('data-test-id=fondue-icon-icon')).toBeVisible();
});

test('should render lang on the button element', async ({ mount }) => {
    const wrapper = await mount(
        <Button data-test-id="button-root" lang="fr-CH">
            {BUTTON_TEXT}
        </Button>,
    );
    await expect(wrapper.getByTestId('button-root')).toHaveAttribute('lang', 'fr-CH');
});

const WEAK_PRESSED_BACKGROUND = 'rgb(234, 234, 228)';
const DEFAULT_PRESSED_BACKGROUND = 'rgb(191, 191, 184)';
const STRONG_PRESSED_BACKGROUND = 'rgb(70, 70, 67)';
const TRANSPARENT = 'rgba(0, 0, 0, 0)';

test.describe('pressed state', () => {
    test('shows the weak pressed colour for aria-pressed="true"', async ({ mount }) => {
        const wrapper = await mount(
            <Button emphasis="weak" aria-pressed>
                {BUTTON_TEXT}
            </Button>,
        );
        const component = wrapper.locator('button');

        await expect(component).toHaveCSS('background-color', WEAK_PRESSED_BACKGROUND);
    });

    test('shows the pressed colour for aria-pressed="mixed"', async ({ mount }) => {
        const wrapper = await mount(
            <Button emphasis="weak" aria-pressed="mixed">
                {BUTTON_TEXT}
            </Button>,
        );
        const component = wrapper.locator('button');

        await expect(component).toHaveCSS('background-color', WEAK_PRESSED_BACKGROUND);
    });

    test('shows the pressed colour for aria-checked="true"', async ({ mount }) => {
        const wrapper = await mount(
            <Button emphasis="weak" role="radio" aria-checked>
                {BUTTON_TEXT}
            </Button>,
        );
        const component = wrapper.locator('button');

        await expect(component).toHaveCSS('background-color', WEAK_PRESSED_BACKGROUND);
    });

    test('keeps the resting colour for aria-pressed="false"', async ({ mount }) => {
        const wrapper = await mount(
            <Button emphasis="weak" aria-pressed={false}>
                {BUTTON_TEXT}
            </Button>,
        );
        const component = wrapper.locator('button');

        await expect(component).toHaveCSS('background-color', TRANSPARENT);
    });

    test('uses the default emphasis pressed colour', async ({ mount }) => {
        const wrapper = await mount(
            <Button emphasis="default" aria-pressed>
                {BUTTON_TEXT}
            </Button>,
        );
        const component = wrapper.locator('button');

        await expect(component).toHaveCSS('background-color', DEFAULT_PRESSED_BACKGROUND);
    });

    test('uses the strong emphasis pressed colour', async ({ mount }) => {
        const wrapper = await mount(
            <Button emphasis="strong" aria-pressed>
                {BUTTON_TEXT}
            </Button>,
        );
        const component = wrapper.locator('button');

        await expect(component).toHaveCSS('background-color', STRONG_PRESSED_BACKGROUND);
    });

    test('stays pressed on hover', async ({ mount }) => {
        const wrapper = await mount(
            <Button emphasis="weak" aria-pressed>
                {BUTTON_TEXT}
            </Button>,
        );
        const component = wrapper.locator('button');

        await component.hover();

        await expect(component).toHaveCSS('background-color', WEAK_PRESSED_BACKGROUND);
    });

    test('keeps the disabled look when disabled', async ({ mount }) => {
        const wrapper = await mount(
            <Button emphasis="default" aria-pressed disabled>
                {BUTTON_TEXT}
            </Button>,
        );
        const component = wrapper.locator('button');

        await expect(component).not.toHaveCSS('background-color', DEFAULT_PRESSED_BACKGROUND);
    });
});
