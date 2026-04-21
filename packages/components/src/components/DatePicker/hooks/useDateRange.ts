/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo, useState } from 'react';
import { type DateRange as InternalDayPickerDateRange, type OnSelectHandler } from 'react-day-picker';

import { transformDateRangeToPickerDateRange, transformPickerDateRangeToDateRange } from '../helpers/dateTransformer';
import { type DatePickerDateRange } from '../types';

export const useDateRange = (selected: DatePickerDateRange, onSelect?: (dateRange: DatePickerDateRange) => void) => {
    const [internalSelectedDateRange, setInternalSelectedDateRange] = useState<DatePickerDateRange>(selected);
    const [isAwaitingEndDate, setIsAwaitingEndDate] = useState(false);
    const [prevSelected, setPrevSelected] = useState<DatePickerDateRange | undefined>(selected);

    if (prevSelected !== selected) {
        setPrevSelected(selected);
        setInternalSelectedDateRange(selected);
        setIsAwaitingEndDate(false);
    }

    const selectedDateRange = useMemo(() => {
        return transformDateRangeToPickerDateRange(internalSelectedDateRange);
    }, [internalSelectedDateRange]);

    const handleSelect: OnSelectHandler<InternalDayPickerDateRange> = (pickerDateRange) => {
        const dateRange = transformPickerDateRangeToDateRange(pickerDateRange);

        if (!dateRange) {
            return;
        }

        setInternalSelectedDateRange(dateRange);

        if (isAwaitingEndDate) {
            setIsAwaitingEndDate(false);
            onSelect?.(dateRange);
        } else {
            setIsAwaitingEndDate(true);
        }
    };

    return {
        selectedDateRange,
        handleSelect,
        isAwaitingEndDate,
    };
};
