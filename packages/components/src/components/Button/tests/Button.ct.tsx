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

const PRESSED_LAYER = /\/ 0\.09\)/;
const MIXED_LAYER = /\/ 0\.045\)/;
const NO_LAYER = 'none';
const STRONG_BACKGROUND = 'rgb(17, 17, 16)';
const WEAK_HOVER_BACKGROUND = 'rgb(215, 215, 208)';

test.describe('pressed state', () => {
    test('adds the pressed layer for aria-pressed="true"', async ({ mount }) => {
        const wrapper = await mount(
            <Button emphasis="weak" aria-pressed>
                {BUTTON_TEXT}
            </Button>,
        );
        const component = wrapper.locator('button');

        await expect(component).toHaveCSS('background-image', PRESSED_LAYER);
    });

    test('adds the lighter mixed layer for aria-pressed="mixed"', async ({ mount }) => {
        const wrapper = await mount(
            <Button emphasis="weak" aria-pressed="mixed">
                {BUTTON_TEXT}
            </Button>,
        );
        const component = wrapper.locator('button');

        await expect(component).toHaveCSS('background-image', MIXED_LAYER);
    });

    test('adds the pressed layer for aria-checked="true"', async ({ mount }) => {
        const wrapper = await mount(
            <Button emphasis="weak" role="radio" aria-checked>
                {BUTTON_TEXT}
            </Button>,
        );
        const component = wrapper.locator('button');

        await expect(component).toHaveCSS('background-image', PRESSED_LAYER);
    });

    test('adds no layer for aria-pressed="false"', async ({ mount }) => {
        const wrapper = await mount(
            <Button emphasis="weak" aria-pressed={false}>
                {BUTTON_TEXT}
            </Button>,
        );
        const component = wrapper.locator('button');

        await expect(component).toHaveCSS('background-image', NO_LAYER);
    });

    test('keeps the emphasis background under the layer', async ({ mount }) => {
        const wrapper = await mount(
            <Button emphasis="strong" aria-pressed>
                {BUTTON_TEXT}
            </Button>,
        );
        const component = wrapper.locator('button');

        await expect(component).toHaveCSS('background-color', STRONG_BACKGROUND);
        await expect(component).toHaveCSS('background-image', PRESSED_LAYER);
    });

    test('keeps the layer over the hover background', async ({ mount }) => {
        const wrapper = await mount(
            <Button emphasis="weak" aria-pressed>
                {BUTTON_TEXT}
            </Button>,
        );
        const component = wrapper.locator('button');

        await component.hover();

        await expect(component).toHaveCSS('background-color', WEAK_HOVER_BACKGROUND);
        await expect(component).toHaveCSS('background-image', PRESSED_LAYER);
    });

    test('adds no layer when disabled', async ({ mount }) => {
        const wrapper = await mount(
            <Button emphasis="default" aria-pressed disabled>
                {BUTTON_TEXT}
            </Button>,
        );
        const component = wrapper.locator('button');

        await expect(component).toHaveCSS('background-image', NO_LAYER);
    });
});
