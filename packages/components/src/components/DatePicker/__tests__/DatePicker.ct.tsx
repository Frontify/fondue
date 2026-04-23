/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import * as sinon from 'sinon';

import { DatePicker } from '../DatePicker';

const DATE_PICKER_TEST_ID = 'test-date-picker';

test.describe('SingleDatePicker', () => {
    test('should render without error', async ({ mount }) => {
        const component = await mount(<DatePicker data-test-id={DATE_PICKER_TEST_ID} />);
        await expect(component).toBeVisible();
    });

    test('should render with a custom test id', async ({ mount }) => {
        const component = await mount(<DatePicker data-test-id={DATE_PICKER_TEST_ID} />);
        await expect(component.getByTestId(DATE_PICKER_TEST_ID).first()).toBeVisible();
    });

    test('should render the calendar grid', async ({ mount }) => {
        const component = await mount(
            <DatePicker data-test-id={DATE_PICKER_TEST_ID} selected={{ year: 2025, month: 3, day: 15 }} />,
        );
        await expect(component.locator('table')).toBeVisible();
    });

    test('should display the current month caption', async ({ mount }) => {
        const component = await mount(
            <DatePicker data-test-id={DATE_PICKER_TEST_ID} selected={{ year: 2025, month: 3, day: 15 }} />,
        );
        await expect(component.getByText('March 2025')).toBeVisible();
    });

    test('should highlight the selected day', async ({ mount }) => {
        const component = await mount(
            <DatePicker data-test-id={DATE_PICKER_TEST_ID} selected={{ year: 2025, month: 3, day: 15 }} />,
        );
        const selectedDay = component.locator('td[class*="selected"] button');
        await expect(selectedDay).toBeVisible();
        await expect(selectedDay.locator('div')).toHaveText('15');
    });

    test('should call onChange when a day is clicked', async ({ mount }) => {
        const onChange = sinon.spy();
        const component = await mount(
            <DatePicker
                data-test-id={DATE_PICKER_TEST_ID}
                selected={{ year: 2025, month: 3, day: 15 }}
                onChange={onChange}
            />,
        );
        await component.getByText('20', { exact: true }).click();
        expect(onChange.callCount).toBe(1);
        expect(onChange.getCall(0).args[0]).toEqual({ year: 2025, month: 3, day: 20 });
    });

    test('should navigate to the next month', async ({ mount }) => {
        const component = await mount(
            <DatePicker data-test-id={DATE_PICKER_TEST_ID} selected={{ year: 2025, month: 3, day: 15 }} />,
        );
        await component.getByRole('button', { name: /next month/i }).click();
        await expect(component.getByText('April 2025')).toBeVisible();
    });

    test('should navigate to the previous month', async ({ mount }) => {
        const component = await mount(
            <DatePicker data-test-id={DATE_PICKER_TEST_ID} selected={{ year: 2025, month: 3, day: 15 }} />,
        );
        await component.getByRole('button', { name: /previous month/i }).click();
        await expect(component.getByText('February 2025')).toBeVisible();
    });

    test('should navigate to the next year', async ({ mount }) => {
        const component = await mount(
            <DatePicker data-test-id={DATE_PICKER_TEST_ID} selected={{ year: 2025, month: 3, day: 15 }} />,
        );
        await component.getByRole('button', { name: /next year/i }).click();
        await expect(component.getByText('March 2026')).toBeVisible();
    });

    test('should navigate to the previous year', async ({ mount }) => {
        const component = await mount(
            <DatePicker data-test-id={DATE_PICKER_TEST_ID} selected={{ year: 2025, month: 3, day: 15 }} />,
        );
        await component.getByRole('button', { name: /previous year/i }).click();
        await expect(component.getByText('March 2024')).toBeVisible();
    });

    test('should render 7 weekday columns', async ({ mount }) => {
        const component = await mount(
            <DatePicker data-test-id={DATE_PICKER_TEST_ID} selected={{ year: 2025, month: 3, day: 15 }} />,
        );
        const weekdays = component.locator('th');
        await expect(weekdays).toHaveCount(7);
    });

    test('should support keyboard navigation between days', async ({ mount, page }) => {
        const component = await mount(
            <DatePicker data-test-id={DATE_PICKER_TEST_ID} selected={{ year: 2025, month: 3, day: 15 }} />,
        );
        await component.getByText('15', { exact: true }).click();
        await page.keyboard.press('ArrowRight');
        await expect(component.locator('button:focus div')).toHaveText('16');
    });

    test('should disable dates before a given DatePickerDate', async ({ mount }) => {
        const component = await mount(
            <DatePicker
                data-test-id={DATE_PICKER_TEST_ID}
                selected={{ year: 2025, month: 3, day: 15 }}
                disabledDates={[{ before: { year: 2025, month: 3, day: 10 } }]}
            />,
        );
        const disabledDay = component.locator('td[class*="disabled"]').filter({ hasText: /^5$/ });
        await expect(disabledDay).toBeVisible();
    });

    test('should disable dates after a given DatePickerDate', async ({ mount }) => {
        const component = await mount(
            <DatePicker
                data-test-id={DATE_PICKER_TEST_ID}
                selected={{ year: 2025, month: 3, day: 15 }}
                disabledDates={[{ after: { year: 2025, month: 3, day: 20 } }]}
            />,
        );
        const disabledDay = component.locator('td[class*="disabled"]').filter({ hasText: /^25$/ });
        await expect(disabledDay).toBeVisible();
    });

    test('should not disable dates within the allowed range', async ({ mount }) => {
        const component = await mount(
            <DatePicker
                data-test-id={DATE_PICKER_TEST_ID}
                selected={{ year: 2025, month: 3, day: 15 }}
                disabledDates={[{ before: { year: 2025, month: 3, day: 10 } }]}
            />,
        );
        const enabledDay = component.locator('td:not([class*="disabled"])').filter({ hasText: /^15$/ });
        await expect(enabledDay).toBeVisible();
    });
});
