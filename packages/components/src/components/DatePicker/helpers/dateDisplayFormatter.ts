/* (c) Copyright Frontify Ltd., all rights reserved. */

import { format } from 'date-fns';

import { type DatePickerDate, type DatePickerDateRange } from '../types';

const toLocalDate = (date: DatePickerDate): Date | undefined => {
    if (!date) {
        return undefined;
    }
    return new Date(date.year, date.month - 1, date.day);
};

const isDateRange = (selected?: DatePickerDateRange | DatePickerDate): selected is DatePickerDateRange => {
    return Boolean(selected && 'from' in selected && 'to' in selected);
};

const getSingleDateDisplayString = (selected?: DatePickerDate): string | undefined => {
    const singleDate = toLocalDate(selected);
    if (!singleDate) {
        return undefined;
    }
    return format(singleDate, 'MMMM d, yyyy');
};

const getDateRangeDisplayString = (selected?: DatePickerDateRange): string | undefined => {
    const from = toLocalDate(selected?.from);
    const to = toLocalDate(selected?.to);
    if (!from || !to) {
        return undefined;
    }

    const isSameYear = from.getFullYear() === to.getFullYear();
    const isSameMonth = isSameYear && from.getMonth() === to.getMonth();

    if (isSameMonth) {
        return `${format(from, 'MMM d')}\u2013${format(to, 'd, yyyy')}`;
    }

    if (isSameYear) {
        return `${format(from, 'MMM d')}\u2013${format(to, 'MMM d, yyyy')}`;
    }

    return `${format(from, 'MMM d, yyyy')}\u2013${format(to, 'MMM d, yyyy')}`;
};

export const getDateDisplayString = (selected?: DatePickerDateRange | DatePickerDate): string | undefined => {
    if (isDateRange(selected)) {
        return getDateRangeDisplayString(selected);
    }
    return getSingleDateDisplayString(selected);
};
