/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import {
    transformDateToDatePickerDate,
    transformDatePickerDateToDate,
    transformPickerDateRangeToDateRange,
    transformDateRangeToPickerDateRange,
    transformDisabledDates,
} from '../dateTransformer';

describe('transformDateToDatePickerDate', () => {
    it('should return undefined when no date is provided', () => {
        expect(transformDateToDatePickerDate(undefined)).toBeUndefined();
    });

    it('should convert a Date to DatePickerDate with 1-based month', () => {
        const date = new Date(2025, 0, 15);
        expect(transformDateToDatePickerDate(date)).toStrictEqual({ year: 2025, month: 1, day: 15 });
    });

    it('should handle December correctly', () => {
        const date = new Date(2025, 11, 31);
        expect(transformDateToDatePickerDate(date)).toStrictEqual({ year: 2025, month: 12, day: 31 });
    });

    it('should handle first day of year', () => {
        const date = new Date(2025, 0, 1);
        expect(transformDateToDatePickerDate(date)).toStrictEqual({ year: 2025, month: 1, day: 1 });
    });
});

describe('transformDatePickerDateToDate', () => {
    it('should return undefined when no DatePickerDate is provided', () => {
        expect(transformDatePickerDateToDate(undefined)).toBeUndefined();
    });

    it('should convert DatePickerDate to a Date with 0-based month', () => {
        const result = transformDatePickerDateToDate({ year: 2025, month: 3, day: 10 });
        expect(result).toStrictEqual(new Date(2025, 2, 10));
    });

    it('should round-trip through both transforms without data loss', () => {
        const original = { year: 2025, month: 6, day: 20 };
        const asDate = transformDatePickerDateToDate(original);
        const backToPickerDate = transformDateToDatePickerDate(asDate);
        expect(backToPickerDate).toStrictEqual(original);
    });
});

describe('transformPickerDateRangeToDateRange', () => {
    it('should return undefined when no range is provided', () => {
        expect(transformPickerDateRangeToDateRange(undefined)).toBeUndefined();
    });

    it('should return undefined when from is missing', () => {
        const range = { from: undefined, to: new Date(2025, 5, 15) };
        expect(transformPickerDateRangeToDateRange(range)).toBeUndefined();
    });

    it('should return undefined when to is missing', () => {
        const range = { from: new Date(2025, 5, 1) };
        expect(transformPickerDateRangeToDateRange(range)).toBeUndefined();
    });

    it('should convert a complete date range to DatePickerDateRange', () => {
        const range = {
            from: new Date(2025, 2, 1),
            to: new Date(2025, 2, 15),
        };
        expect(transformPickerDateRangeToDateRange(range)).toStrictEqual({
            from: { year: 2025, month: 3, day: 1 },
            to: { year: 2025, month: 3, day: 15 },
        });
    });
});

describe('transformDateRangeToPickerDateRange', () => {
    it('should return undefined when no range is provided', () => {
        expect(transformDateRangeToPickerDateRange(undefined)).toBeUndefined();
    });

    it('should convert DatePickerDateRange to InternalDayPickerDateRange', () => {
        const range = {
            from: { year: 2025, month: 1, day: 10 },
            to: { year: 2025, month: 1, day: 20 },
        };
        const result = transformDateRangeToPickerDateRange(range);
        expect(result).toStrictEqual({
            from: new Date(2025, 0, 10),
            to: new Date(2025, 0, 20),
        });
    });

    it('should round-trip through both range transforms without data loss', () => {
        const original = {
            from: { year: 2025, month: 4, day: 5 },
            to: { year: 2025, month: 4, day: 25 },
        };
        const asPickerRange = transformDateRangeToPickerDateRange(original);
        const backToDateRange = transformPickerDateRangeToDateRange(asPickerRange);
        expect(backToDateRange).toStrictEqual(original);
    });
});

describe('transformDisabledDates', () => {
    it('should return undefined when no disabled dates are provided', () => {
        expect(transformDisabledDates(undefined)).toBeUndefined();
    });

    it('should transform a single "before" entry', () => {
        const result = transformDisabledDates({ before: { year: 2025, month: 3, day: 10 } });
        expect(result).toStrictEqual([{ before: new Date(2025, 2, 10) }]);
    });

    it('should transform a single "after" entry', () => {
        const result = transformDisabledDates({ after: { year: 2025, month: 6, day: 20 } });
        expect(result).toStrictEqual([{ after: new Date(2025, 5, 20) }]);
    });

    it('should transform an array of entries', () => {
        const result = transformDisabledDates([
            { before: { year: 2025, month: 1, day: 1 } },
            { after: { year: 2025, month: 12, day: 31 } },
        ]);
        expect(result).toStrictEqual([{ before: new Date(2025, 0, 1) }, { after: new Date(2025, 11, 31) }]);
    });

    it('should filter out entries with undefined DatePickerDate', () => {
        const result = transformDisabledDates([{ before: undefined }, { after: { year: 2025, month: 6, day: 15 } }]);
        expect(result).toStrictEqual([{ after: new Date(2025, 5, 15) }]);
    });
});
