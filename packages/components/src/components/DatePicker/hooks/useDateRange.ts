/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo, useState } from 'react';
import { type DateRange as InternalDayPickerDateRange, type OnSelectHandler } from 'react-day-picker';

import { transformDateRangeToPickerDateRange, transformPickerDateRangeToDateRange } from '../helpers/dateTransformer';
import { type DatePickerDateRange } from '../types';

export const useDateRange = (selected: DatePickerDateRange, onSelect?: (dateRange: DatePickerDateRange) => void) => {
    const [internalSelectedDateRange, setInternalSelectedDateRange] = useState<DatePickerDateRange>(selected);

    const selectedDateRange = useMemo(() => {
        return transformDateRangeToPickerDateRange(selected ?? internalSelectedDateRange);
    }, [selected, internalSelectedDateRange]);

    const handleSelect: OnSelectHandler<InternalDayPickerDateRange> = (pickerDateRange) => {
        const dateRange = transformPickerDateRangeToDateRange(pickerDateRange);

        if (dateRange) {
            onSelect?.(dateRange);
            setInternalSelectedDateRange(dateRange);
        }
    };

    return {
        selectedDateRange,
        handleSelect,
    };
};
