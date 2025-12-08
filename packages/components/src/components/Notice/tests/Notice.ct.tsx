/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconArrowRoundAntiClockwise,
    IconCheckMark,
    IconExclamationMarkTriangle,
    IconInfo,
} from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';

import { Button } from '../../Button/Button';
import { Notice } from '../Notice';

const NOTICE_TEXT = 'Test notice message';

test('should render basic notice with text', async ({ mount }) => {
    const component = await mount(<Notice>{NOTICE_TEXT}</Notice>);
    await expect(component).toContainText(NOTICE_TEXT);
});

test('should have proper accessibility attributes', async ({ mount }) => {
    const component = await mount(<Notice data-test-id="notice-root">{NOTICE_TEXT}</Notice>);
    const notice = component.getByTestId('notice-root');
    await expect(notice).toHaveAttribute('role', 'status');
    await expect(notice).toHaveAttribute('aria-live', 'polite');
    await expect(notice).toHaveAttribute('data-component', 'notice');
});

test('should apply default variant', async ({ mount }) => {
    const component = await mount(<Notice data-test-id="notice-root">{NOTICE_TEXT}</Notice>);
    const notice = component.getByTestId('notice-root');
    await expect(notice).toHaveAttribute('data-variant', 'default');
});

test('should apply highlight variant', async ({ mount }) => {
    const component = await mount(
        <Notice data-test-id="notice-root" variant="highlight">
            {NOTICE_TEXT}
        </Notice>,
    );
    const notice = component.getByTestId('notice-root');
    await expect(notice).toHaveAttribute('data-variant', 'highlight');
});

test('should apply positive variant', async ({ mount }) => {
    const component = await mount(
        <Notice data-test-id="notice-root" variant="positive">
            {NOTICE_TEXT}
        </Notice>,
    );
    const notice = component.getByTestId('notice-root');
    await expect(notice).toHaveAttribute('data-variant', 'positive');
});

test('should apply danger variant', async ({ mount }) => {
    const component = await mount(
        <Notice data-test-id="notice-root" variant="danger">
            {NOTICE_TEXT}
        </Notice>,
    );
    const notice = component.getByTestId('notice-root');
    await expect(notice).toHaveAttribute('data-variant', 'danger');
});

test('should apply warning variant', async ({ mount }) => {
    const component = await mount(
        <Notice data-test-id="notice-root" variant="warning">
            {NOTICE_TEXT}
        </Notice>,
    );
    const notice = component.getByTestId('notice-root');
    await expect(notice).toHaveAttribute('data-variant', 'warning');
});

test('should apply default emphasis', async ({ mount }) => {
    const component = await mount(<Notice data-test-id="notice-root">{NOTICE_TEXT}</Notice>);
    const notice = component.getByTestId('notice-root');
    await expect(notice).toHaveAttribute('data-emphasis', 'default');
});

test('should apply strong emphasis', async ({ mount }) => {
    const component = await mount(
        <Notice data-test-id="notice-root" emphasis="strong">
            {NOTICE_TEXT}
        </Notice>,
    );
    const notice = component.getByTestId('notice-root');
    await expect(notice).toHaveAttribute('data-emphasis', 'strong');
});

test('should apply weak emphasis', async ({ mount }) => {
    const component = await mount(
        <Notice data-test-id="notice-root" emphasis="weak">
            {NOTICE_TEXT}
        </Notice>,
    );
    const notice = component.getByTestId('notice-root');
    await expect(notice).toHaveAttribute('data-emphasis', 'weak');
});

test('should apply medium size by default', async ({ mount }) => {
    const component = await mount(<Notice data-test-id="notice-root">{NOTICE_TEXT}</Notice>);
    const notice = component.getByTestId('notice-root');
    await expect(notice).toHaveAttribute('data-size', 'medium');
});

test('should apply large size', async ({ mount }) => {
    const component = await mount(
        <Notice data-test-id="notice-root" size="large">
            {NOTICE_TEXT}
        </Notice>,
    );
    const notice = component.getByTestId('notice-root');
    await expect(notice).toHaveAttribute('data-size', 'large');
});

test('should render icon when provided', async ({ mount }) => {
    const component = await mount(
        <Notice icon={<IconInfo data-testid="test-icon" size="16" />}>{NOTICE_TEXT}</Notice>,
    );
    await expect(component.locator('svg')).toBeVisible();
    await expect(component).toContainText(NOTICE_TEXT);
});

test('should render icon with different variants', async ({ mount }) => {
    const component = await mount(
        <Notice variant="positive" icon={<IconCheckMark size="16" />}>
            {NOTICE_TEXT}
        </Notice>,
    );
    await expect(component.locator('svg')).toBeVisible();
});

test('should render action button when provided', async ({ mount }) => {
    const actionText = 'Undo';
    const component = await mount(
        <Notice
            action={
                <Button size="small" emphasis="default">
                    {actionText}
                </Button>
            }
        >
            {NOTICE_TEXT}
        </Notice>,
    );
    await expect(component).toContainText(actionText);
});

test('should not render dismiss button when onDismiss is not provided', async ({ mount }) => {
    const component = await mount(<Notice>{NOTICE_TEXT}</Notice>);
    await expect(component.locator('button')).not.toBeVisible();
});

test('should render dismiss button when onDismiss is provided', async ({ mount }) => {
    const component = await mount(<Notice onDismiss={() => {}}>{NOTICE_TEXT}</Notice>);
    await expect(component.locator('button[aria-label="Dismiss notice"]')).toBeVisible();
});

test('should trigger onDismiss when dismiss button is clicked', async ({ mount }) => {
    let dismissed = false;
    const component = await mount(
        <Notice
            onDismiss={() => {
                dismissed = true;
            }}
        >
            {NOTICE_TEXT}
        </Notice>,
    );
    await component.locator('button[aria-label="Dismiss notice"]').click();
    expect(dismissed).toBe(true);
});

test('should use custom aria-label for dismiss button', async ({ mount }) => {
    const customLabel = 'Close this notification';
    const component = await mount(
        <Notice onDismiss={() => {}} aria-label={customLabel}>
            {NOTICE_TEXT}
        </Notice>,
    );
    await expect(component.locator(`button[aria-label="${customLabel}"]`)).toBeVisible();
});

test('should render dismiss icon with medium size by default', async ({ mount }) => {
    const component = await mount(<Notice onDismiss={() => {}}>{NOTICE_TEXT}</Notice>);
    const icon = await component.locator('button svg').getAttribute('width');
    expect(icon).toBe('16');
});

test('should render dismiss icon with large size when size is large', async ({ mount }) => {
    const component = await mount(
        <Notice onDismiss={() => {}} size="large">
            {NOTICE_TEXT}
        </Notice>,
    );
    const icon = await component.locator('button svg').getAttribute('width');
    expect(icon).toBe('20');
});

test('should apply custom className', async ({ mount }) => {
    const customClass = 'custom-class';
    const wrapper = await mount(<Notice data-test-id="notice-root" className={customClass}>{NOTICE_TEXT}</Notice>);
    const notice = wrapper.getByTestId('notice-root');
    await expect(notice).toHaveClass(new RegExp(customClass));
});

test('should apply custom test id', async ({ mount }) => {
    const customTestId = 'custom-notice';
    const wrapper = await mount(<Notice data-test-id={customTestId}>{NOTICE_TEXT}</Notice>);
    await expect(wrapper.getByTestId(customTestId)).toBeVisible();
});

test('should render with icon, action, and dismiss button together', async ({ mount }) => {
    const actionText = 'Undo';
    const component = await mount(
        <Notice
            icon={<IconInfo size="16" />}
            action={
                <Button size="small" emphasis="default">
                    <IconArrowRoundAntiClockwise size={16} />
                    {actionText}
                </Button>
            }
            onDismiss={() => {}}
        >
            {NOTICE_TEXT}
        </Notice>,
    );

    await expect(component.locator('svg').first()).toBeVisible();
    await expect(component).toContainText(actionText);
    await expect(component).toContainText(NOTICE_TEXT);
    await expect(component.locator('button[aria-label="Dismiss notice"]')).toBeVisible();
});

test('should render long content correctly', async ({ mount }) => {
    const longContent =
        'This is a very long notice message that should wrap properly and maintain proper spacing between all elements including the icon, text, action button, and dismiss button.';
    const component = await mount(<Notice>{longContent}</Notice>);
    await expect(component).toContainText(longContent);
});

test('should render multiple variants in a container', async ({ mount }) => {
    const component = await mount(
        <div>
            <Notice data-test-id="notice-default" variant="default">
                default variant
            </Notice>
            <Notice data-test-id="notice-highlight" variant="highlight">
                highlight variant
            </Notice>
            <Notice data-test-id="notice-positive" variant="positive">
                positive variant
            </Notice>
            <Notice data-test-id="notice-danger" variant="danger">
                danger variant
            </Notice>
            <Notice data-test-id="notice-warning" variant="warning">
                warning variant
            </Notice>
        </div>,
    );

    await expect(component.getByTestId('notice-default')).toHaveAttribute('data-variant', 'default');
    await expect(component.getByTestId('notice-highlight')).toHaveAttribute('data-variant', 'highlight');
    await expect(component.getByTestId('notice-positive')).toHaveAttribute('data-variant', 'positive');
    await expect(component.getByTestId('notice-danger')).toHaveAttribute('data-variant', 'danger');
    await expect(component.getByTestId('notice-warning')).toHaveAttribute('data-variant', 'warning');
});

test('should render multiple emphasis levels in a container', async ({ mount }) => {
    const component = await mount(
        <div>
            <Notice data-test-id="notice-default" emphasis="default">
                default emphasis
            </Notice>
            <Notice data-test-id="notice-strong" emphasis="strong">
                strong emphasis
            </Notice>
            <Notice data-test-id="notice-weak" emphasis="weak">
                weak emphasis
            </Notice>
        </div>,
    );

    await expect(component.getByTestId('notice-default')).toHaveAttribute('data-emphasis', 'default');
    await expect(component.getByTestId('notice-strong')).toHaveAttribute('data-emphasis', 'strong');
    await expect(component.getByTestId('notice-weak')).toHaveAttribute('data-emphasis', 'weak');
});

test('should handle multiple notices stacked', async ({ mount }) => {
    const component = await mount(
        <div>
            <Notice data-test-id="notice-1" variant="default" icon={<IconInfo size="16" />}>
                Default notice
            </Notice>
            <Notice data-test-id="notice-2" variant="positive" icon={<IconCheckMark size="16" />}>
                Positive notice
            </Notice>
            <Notice data-test-id="notice-3" variant="danger" icon={<IconExclamationMarkTriangle size="16" />}>
                Danger notice
            </Notice>
        </div>,
    );

    await expect(component.getByTestId('notice-1')).toBeVisible();
    await expect(component.getByTestId('notice-2')).toBeVisible();
    await expect(component.getByTestId('notice-3')).toBeVisible();
});

test('should dismiss button work with keyboard navigation', async ({ mount, page }) => {
    let dismissed = false;
    const component = await mount(
        <Notice
            onDismiss={() => {
                dismissed = true;
            }}
        >
            {NOTICE_TEXT}
        </Notice>,
    );

    const dismissButton = component.locator('button[aria-label="Dismiss notice"]');
    await dismissButton.focus();
    await page.keyboard.press('Enter');
    expect(dismissed).toBe(true);
});

test('should render with custom aria-label and verify accessibility', async ({ mount }) => {
    const customLabel = 'Close important notification';
    const component = await mount(
        <Notice data-test-id="notice-root" onDismiss={() => {}} aria-label={customLabel}>
            {NOTICE_TEXT}
        </Notice>,
    );

    const notice = component.getByTestId('notice-root');
    await expect(notice).toHaveAttribute('role', 'status');
    await expect(notice).toHaveAttribute('aria-live', 'polite');

    const dismissButton = component.locator(`button[aria-label="${customLabel}"]`);
    await expect(dismissButton).toBeVisible();
    await expect(dismissButton).toHaveAttribute('type', 'button');
});
