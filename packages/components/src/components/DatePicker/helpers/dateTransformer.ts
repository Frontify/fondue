/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DateRange as InternalDayPickerDateRange } from 'react-day-picker';

import { type DatePickerDate, type DatePickerDateRange } from '../types';

export const transformDateToDatePickerDate = (date?: Date): DatePickerDate | undefined => {
    if (!date) {
        return undefined;
    }
    return {
        year: date.getUTCFullYear(),
        // Month is 0-indexed in JavaScript, so we add 1 to get the correct month
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
    };
};

export const transformDatePickerDateToDate = (datePickerDate?: DatePickerDate): Date | undefined => {
    if (!datePickerDate) {
        return undefined;
    }
    // Month is 0-indexed in JavaScript, so we subtract 1 to get the correct month
    return new Date(Date.UTC(datePickerDate.year, datePickerDate.month - 1, datePickerDate.day));
};

export const transformPickerDateRangeToFondueDateRange = (
    dateRange?: InternalDayPickerDateRange,
): DatePickerDateRange => {
    const fromDate = transformDateToDatePickerDate(dateRange?.from);
    const toDate = transformDateToDatePickerDate(dateRange?.to);
    if (!fromDate || !toDate) {
        return undefined;
    }

    return {
        from: fromDate,
        to: toDate,
    };
};

export const transformFondueDateRangeToPickerDateRange = (
    dateRange: DatePickerDateRange,
): InternalDayPickerDateRange | undefined => {
    if (!dateRange) {
        return undefined;
    }

    return {
        from: transformDatePickerDateToDate(dateRange.from),
        to: transformDatePickerDateToDate(dateRange.to),
    };
};
