/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import * as sinon from 'sinon';

import { DatePicker } from '../DatePicker';

const RANGE_TEST_ID = 'test-range-date-picker';

const RANGE_SELECTION = {
    from: { year: 2025, month: 3, day: 5 },
    to: { year: 2025, month: 3, day: 15 },
};

test.describe('RangeDatePicker', () => {
    test('should render without error', async ({ mount }) => {
        const component = await mount(<DatePicker.Range data-test-id={RANGE_TEST_ID} />);
        await expect(component).toBeVisible();
    });

    test('should render with a custom test id', async ({ mount }) => {
        const component = await mount(<DatePicker.Range data-test-id={RANGE_TEST_ID} />);
        await expect(component.getByTestId(RANGE_TEST_ID).first()).toBeVisible();
    });

    test('should render the calendar grid', async ({ mount }) => {
        const component = await mount(<DatePicker.Range data-test-id={RANGE_TEST_ID} selected={RANGE_SELECTION} />);
        await expect(component.locator('table')).toBeVisible();
    });

    test('should display the month caption for the selected range', async ({ mount }) => {
        const component = await mount(<DatePicker.Range data-test-id={RANGE_TEST_ID} selected={RANGE_SELECTION} />);
        await expect(component.getByText('March 2025')).toBeVisible();
    });

    test('should highlight range start and end days', async ({ mount }) => {
        const component = await mount(<DatePicker.Range data-test-id={RANGE_TEST_ID} selected={RANGE_SELECTION} />);
        const rangeStart = component.locator('td[class*="selectedStart"] button div');
        const rangeEnd = component.locator('td[class*="selectedEnd"] button div');
        await expect(rangeStart).toHaveText('5');
        await expect(rangeEnd).toHaveText('15');
    });

    test('should highlight middle days in the range', async ({ mount }) => {
        const component = await mount(<DatePicker.Range data-test-id={RANGE_TEST_ID} selected={RANGE_SELECTION} />);
        const middleDays = component.locator('td[class*="selectedMiddle"]');
        const count = await middleDays.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should call onChange when a day is clicked', async ({ mount }) => {
        const onChange = sinon.spy();
        const component = await mount(
            <DatePicker.Range data-test-id={RANGE_TEST_ID} selected={RANGE_SELECTION} onChange={onChange} />,
        );
        await component.getByText('20', { exact: true }).click();
        expect(onChange.callCount).toBe(1);
    });

    test('should navigate to the next month', async ({ mount }) => {
        const component = await mount(<DatePicker.Range data-test-id={RANGE_TEST_ID} selected={RANGE_SELECTION} />);
        await component.getByRole('button', { name: /next/i }).click();
        await expect(component.getByText('April 2025')).toBeVisible();
    });

    test('should navigate to the previous month', async ({ mount }) => {
        const component = await mount(<DatePicker.Range data-test-id={RANGE_TEST_ID} selected={RANGE_SELECTION} />);
        await component.getByRole('button', { name: /previous/i }).click();
        await expect(component.getByText('February 2025')).toBeVisible();
    });

    test('should render 7 weekday columns', async ({ mount }) => {
        const component = await mount(<DatePicker.Range data-test-id={RANGE_TEST_ID} selected={RANGE_SELECTION} />);
        const weekdays = component.locator('th');
        await expect(weekdays).toHaveCount(7);
    });
});
