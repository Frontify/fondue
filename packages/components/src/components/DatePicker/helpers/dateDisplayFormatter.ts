/* (c) Copyright Frontify Ltd., all rights reserved. */

import { format } from 'date-fns';

import { type DatePickerDate, type DatePickerDateRange } from '../types';

import { transformDateRangeToPickerDateRange, transformDatePickerDateToDate } from './dateTransformer';

const getSingleDateDisplayString = (selected?: DatePickerDate): string | undefined => {
    const singleDate = transformDatePickerDateToDate(selected);
    if (!singleDate) {
        return undefined;
    }
    return format(singleDate, 'MMMM d, yyyy');
};

const getDateRangeDisplayString = (selected?: DatePickerDateRange): string | undefined => {
    const dateRange = transformDateRangeToPickerDateRange(selected);
    if (!dateRange?.from || !dateRange?.to) {
        return undefined;
    }

    const isSameYear = dateRange.from.getFullYear() === dateRange.to.getFullYear();

    const isSameMonth = isSameYear && dateRange.from.getMonth() === dateRange.to.getMonth();

    if (isSameMonth) {
        return `${format(dateRange.from, 'MMM d')}\u2013${format(dateRange.to, 'd, yyyy')}`;
    }

    if (isSameYear) {
        return `${format(dateRange.from, 'MMM d')}\u2013${format(dateRange.to, 'MMM d, yyyy')}`;
    }

    return `${format(dateRange.from, 'MMM d, yyyy')}\u2013${format(dateRange.to, 'MMM d, yyyy')}`;
};

export const getDateDisplayString = (selected?: DatePickerDateRange | DatePickerDate): string | undefined => {
    if (selected && 'from' in selected && 'to' in selected) {
        return getDateRangeDisplayString(selected);
    }
    return getSingleDateDisplayString(selected);
};
