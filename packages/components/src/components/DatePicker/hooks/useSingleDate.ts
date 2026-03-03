/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo, useState } from 'react';
import { type OnSelectHandler } from 'react-day-picker';

import { transformDatePickerDateToDate, transformDateToDatePickerDate } from '../helpers/dateTransformer';
import { type DatePickerDate } from '../types';

export const useSingleDate = (selected?: DatePickerDate, onSelect?: (date?: DatePickerDate) => void) => {
    const [internalSelectedDate, setInternalSelectedDate] = useState<DatePickerDate | undefined>(selected);
    const [prevSelected, setPrevSelected] = useState<DatePickerDate | undefined>(selected);

    if (prevSelected !== selected) {
        setPrevSelected(selected);
        setInternalSelectedDate(selected);
    }

    const selectedDate = useMemo(() => {
        return transformDatePickerDateToDate(internalSelectedDate);
    }, [internalSelectedDate]);

    const handleSelect: OnSelectHandler<Date> = (date) => {
        const datePickerDate = transformDateToDatePickerDate(date);

        setInternalSelectedDate(datePickerDate);
        onSelect?.(datePickerDate);
    };

    return {
        selectedDate,
        handleSelect,
    };
};
