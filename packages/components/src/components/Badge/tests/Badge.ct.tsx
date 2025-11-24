/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';

import { Badge } from '../Badge';

const BADGE_TEXT = 'Frontify';

test('should render basic badge with text', async ({ mount }) => {
    const component = await mount(<Badge>{BADGE_TEXT}</Badge>);
    await expect(component).toContainText(BADGE_TEXT);
});

test('should render as button when clickable', async ({ mount }) => {
    const component = (
        await mount(
            <Badge data-test-id="badge-root" onClick={() => {}}>
                {BADGE_TEXT}
            </Badge>,
        )
    ).getByTestId('badge-root');
    await expect(component).toHaveRole('button');
});

test('should render status indicator when provided', async ({ mount }) => {
    const component = (
        await mount(
            <Badge data-test-id="badge-root" status="positive">
                {BADGE_TEXT}
            </Badge>,
        )
    ).getByTestId('badge-root');
    await expect(component.getByTestId('badge-status')).toBeVisible();
});

test('should render dismiss button when dismissable', async ({ mount }) => {
    const component = (
        await mount(
            <Badge data-test-id="badge-root" onDismiss={() => {}}>
                {BADGE_TEXT}
            </Badge>,
        )
    ).getByTestId('badge-root');
    await expect(component.locator('button[aria-label^="Dismiss"]')).toBeVisible();
});

test('should apply variant styles', async ({ mount }) => {
    const component = (
        await mount(
            <Badge data-test-id="badge-root" variant="warning">
                {BADGE_TEXT}
            </Badge>,
        )
    ).getByTestId('badge-root');
    await expect(component).toHaveAttribute('data-variant', 'warning');
});

test('should apply size styles', async ({ mount }) => {
    const component = (
        await mount(
            <Badge data-test-id="badge-root" size="small">
                {BADGE_TEXT}
            </Badge>,
        )
    ).getByTestId('badge-root');
    await expect(component).toHaveAttribute('data-size', 'small');
});

test('should apply emphasis styles', async ({ mount }) => {
    const component = (
        await mount(
            <Badge data-test-id="badge-root" emphasis="weak">
                {BADGE_TEXT}
            </Badge>,
        )
    ).getByTestId('badge-root');
    await expect(component).toHaveAttribute('data-emphasis', 'weak');
});

test('should handle disabled state', async ({ mount }) => {
    const component = (
        await mount(
            <Badge data-test-id="badge-root" disabled>
                {BADGE_TEXT}
            </Badge>,
        )
    ).getByTestId('badge-root');
    await expect(component).toHaveAttribute('data-disabled', 'true');
});

test('should render icon with text', async ({ mount }) => {
    const component = await mount(
        <Badge>
            <IconIcon />
            {BADGE_TEXT}
        </Badge>,
    );
    await expect(component.locator('svg')).toBeVisible();
    await expect(component).toContainText(BADGE_TEXT);
});

test('should trigger onDismiss when close clicked', async ({ mount }) => {
    let dismissed = false;
    const component = await mount(
        <Badge
            onDismiss={() => {
                dismissed = true;
            }}
        >
            {BADGE_TEXT}
        </Badge>,
    );
    await component.locator('button[aria-label^="Dismiss"]').click();
    expect(dismissed).toBe(true);
});

test('should render correct cross icon size', async ({ mount }) => {
    const component = await mount(<Badge onDismiss={() => {}}>{BADGE_TEXT}</Badge>);
    const icon = await component.locator('svg').getAttribute('width');
    expect(icon).toBe('12');
});
