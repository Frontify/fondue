/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import * as sinon from 'sinon';

import { DatePicker } from '../DatePicker';

const INPUT_TEST_ID = 'test-date-picker-input';
const ARIA_LABEL = 'Select date';

test.describe('DatePickerInput', () => {
    test('should render without error', async ({ mount }) => {
        const component = await mount(<DatePicker.Input data-test-id={INPUT_TEST_ID} aria-label={ARIA_LABEL} />);
        await expect(component).toBeVisible();
    });

    test('should render with a custom test id', async ({ mount }) => {
        const component = await mount(<DatePicker.Input data-test-id={INPUT_TEST_ID} aria-label={ARIA_LABEL} />);
        await expect(component.getByTestId(INPUT_TEST_ID)).toBeVisible();
    });

    test('should display a single date as formatted text', async ({ mount }) => {
        const component = await mount(
            <DatePicker.Input
                data-test-id={INPUT_TEST_ID}
                aria-label={ARIA_LABEL}
                selected={{ year: 2025, month: 3, day: 15 }}
            />,
        );
        await expect(component.getByText('March 15, 2025')).toBeVisible();
    });

    test('should display a date range in the same month', async ({ mount }) => {
        const component = await mount(
            <DatePicker.Input
                data-test-id={INPUT_TEST_ID}
                aria-label={ARIA_LABEL}
                selected={{
                    from: { year: 2025, month: 1, day: 10 },
                    to: { year: 2025, month: 1, day: 20 },
                }}
            />,
        );
        await expect(component.getByText('Jan 10–20, 2025')).toBeVisible();
    });

    test('should display a date range spanning different months', async ({ mount }) => {
        const component = await mount(
            <DatePicker.Input
                data-test-id={INPUT_TEST_ID}
                aria-label={ARIA_LABEL}
                selected={{
                    from: { year: 2025, month: 1, day: 10 },
                    to: { year: 2025, month: 6, day: 15 },
                }}
            />,
        );
        await expect(component.getByText('Jan 10–Jun 15, 2025')).toBeVisible();
    });

    test('should display a date range spanning different years', async ({ mount }) => {
        const component = await mount(
            <DatePicker.Input
                data-test-id={INPUT_TEST_ID}
                aria-label={ARIA_LABEL}
                selected={{
                    from: { year: 2024, month: 12, day: 20 },
                    to: { year: 2025, month: 1, day: 5 },
                }}
            />,
        );
        await expect(component.getByText('Dec 20, 2024–Jan 5, 2025')).toBeVisible();
    });

    test('should call onClick when the button is clicked', async ({ mount }) => {
        const onClick = sinon.spy();
        const component = await mount(
            <DatePicker.Input
                data-test-id={INPUT_TEST_ID}
                aria-label={ARIA_LABEL}
                selected={{ year: 2025, month: 1, day: 1 }}
                onClick={onClick}
            />,
        );
        await component.locator('button[data-date-input-select]').click();
        expect(onClick.callCount).toBe(1);
    });

    test('should not trigger onClick when the input is disabled', async ({ mount }) => {
        const onClick = sinon.spy();
        const component = await mount(
            <DatePicker.Input
                data-test-id={INPUT_TEST_ID}
                aria-label={ARIA_LABEL}
                selected={{ year: 2025, month: 1, day: 1 }}
                onClick={onClick}
                disabled
            />,
        );
        await component.locator('button[data-date-input-select]').click({ force: true });
        expect(onClick.callCount).toBe(0);
    });

    test('should render the clear button when onClear is provided', async ({ mount }) => {
        const component = await mount(
            <DatePicker.Input
                data-test-id={INPUT_TEST_ID}
                aria-label={ARIA_LABEL}
                selected={{ year: 2025, month: 1, day: 1 }}
                onClear={() => {}}
            />,
        );
        const buttons = component.locator('button');
        await expect(buttons).toHaveCount(2);
    });

    test('should not render the clear button when onClear is not provided', async ({ mount }) => {
        const component = await mount(
            <DatePicker.Input
                data-test-id={INPUT_TEST_ID}
                aria-label={ARIA_LABEL}
                selected={{ year: 2025, month: 1, day: 1 }}
            />,
        );
        const buttons = component.locator('button');
        await expect(buttons).toHaveCount(1);
    });

    test('should call onClear when the clear button is pressed', async ({ mount }) => {
        const onClear = sinon.spy();
        const component = await mount(
            <DatePicker.Input
                data-test-id={INPUT_TEST_ID}
                aria-label={ARIA_LABEL}
                selected={{ year: 2025, month: 1, day: 1 }}
                onClear={onClear}
            />,
        );
        const clearButton = component.locator('button').nth(1);
        await clearButton.click();
        expect(onClear.callCount).toBe(1);
    });

    test('should show the caret in open state when isOpen is true', async ({ mount }) => {
        const component = await mount(<DatePicker.Input data-test-id={INPUT_TEST_ID} aria-label={ARIA_LABEL} isOpen />);
        await expect(component.locator('[data-state="open"]')).toBeVisible();
    });

    test('should show the caret in closed state when isOpen is false', async ({ mount }) => {
        const component = await mount(
            <DatePicker.Input data-test-id={INPUT_TEST_ID} aria-label={ARIA_LABEL} isOpen={false} />,
        );
        await expect(component.locator('[data-state="closed"]')).toBeVisible();
    });

    test('should show placeholder text when no date is selected', async ({ mount }) => {
        const component = await mount(<DatePicker.Input data-test-id={INPUT_TEST_ID} aria-label={ARIA_LABEL} />);
        await expect(component.locator('button[data-date-input-select]')).toBeVisible();
    });
});
