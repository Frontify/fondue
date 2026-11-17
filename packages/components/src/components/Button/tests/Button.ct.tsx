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

const PRESSED_BACKGROUND = 'rgb(234, 234, 228)';
const PRESSED_HOVER_BACKGROUND = 'rgb(215, 215, 208)';
const TRANSPARENT = 'rgba(0, 0, 0, 0)';

test.describe('pressed state', () => {
    test('shows the pressed background for aria-pressed="true"', async ({ mount }) => {
        const component = await mount(
            <Button emphasis="weak" aria-pressed>
                {BUTTON_TEXT}
            </Button>,
        );

        await expect(component).toHaveCSS('background-color', PRESSED_BACKGROUND);
    });

    test('shows the pressed background for aria-pressed="mixed"', async ({ mount }) => {
        const component = await mount(
            <Button emphasis="weak" aria-pressed="mixed">
                {BUTTON_TEXT}
            </Button>,
        );

        await expect(component).toHaveCSS('background-color', PRESSED_BACKGROUND);
    });

    test('shows the pressed background for aria-checked="true"', async ({ mount }) => {
        const component = await mount(
            <Button emphasis="weak" role="radio" aria-checked>
                {BUTTON_TEXT}
            </Button>,
        );

        await expect(component).toHaveCSS('background-color', PRESSED_BACKGROUND);
    });

    test('keeps the resting background for aria-pressed="false"', async ({ mount }) => {
        const component = await mount(
            <Button emphasis="weak" aria-pressed={false}>
                {BUTTON_TEXT}
            </Button>,
        );

        await expect(component).toHaveCSS('background-color', TRANSPARENT);
    });

    test('overrides strong emphasis', async ({ mount }) => {
        const component = await mount(
            <Button emphasis="strong" aria-pressed>
                {BUTTON_TEXT}
            </Button>,
        );

        await expect(component).toHaveCSS('background-color', PRESSED_BACKGROUND);
    });

    test('darkens on hover', async ({ mount }) => {
        const component = await mount(
            <Button emphasis="weak" aria-pressed>
                {BUTTON_TEXT}
            </Button>,
        );

        await component.hover();

        await expect(component).toHaveCSS('background-color', PRESSED_HOVER_BACKGROUND);
    });

    test('keeps the disabled look when disabled', async ({ mount }) => {
        const component = await mount(
            <Button emphasis="default" aria-pressed disabled>
                {BUTTON_TEXT}
            </Button>,
        );

        await expect(component).not.toHaveCSS('background-color', PRESSED_BACKGROUND);
    });
});
