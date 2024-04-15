/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';

import { Button } from '../Button';

const BUTTON_TEXT = 'Frontify';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Button>{BUTTON_TEXT}</Button>);
    await expect(component).toContainText(BUTTON_TEXT);
});

test('should render in positive medium and with only text.', async ({ mount }) => {
    const component = await mount(
        <Button style="positive" size="medium">
            {BUTTON_TEXT}
        </Button>,
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText(BUTTON_TEXT);
});

test('should react on Click', async ({ mount }) => {
    const component = await mount(
        <Button style="positive" size="medium">
            {BUTTON_TEXT}
        </Button>,
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText(BUTTON_TEXT);
});

test('should render in positive medium and with only icon.', async ({ mount }) => {
    const component = await mount(
        <Button style="positive" size="medium" icon={<IconIcon data-test-id="fondue-icon-icon" />} />,
    );
    await expect(component).toBeVisible();
    await expect(component.locator('data-test-id=fondue-icon-icon')).toBeVisible();
});

test('should render in positive medium and with only only an icon and fully rounded.', async ({ mount }) => {
    const component = await mount(
        <Button style="positive" size="medium" icon={<IconIcon data-test-id="fondue-icon-icon" />} rounding="full" />,
    );
    await expect(component).toBeVisible();
    await expect(component).toHaveClass(/tw-rounded-full/);
    await expect(component.locator('data-test-id=fondue-icon-icon')).toBeVisible();
});

test('should render in positive medium with an icon and text.', async ({ mount }) => {
    const component = await mount(
        <Button style="positive" size="medium" icon={<IconIcon data-test-id="fondue-icon-icon" />}>
            {BUTTON_TEXT}
        </Button>,
    );
    await expect(component).toBeVisible();
    await expect(component).toHaveText(BUTTON_TEXT);
    await expect(component.locator('data-test-id=fondue-icon-icon')).toBeVisible();
});
