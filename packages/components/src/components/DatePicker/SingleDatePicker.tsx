/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, useMemo, useState, type ForwardedRef } from 'react';
import { type OnSelectHandler } from 'react-day-picker';

import { type DatePickerBaseProps, DatePickerCalendar } from './DatePickerCalendar';
import { useSingleDate } from './hooks/useSingleDate';
import { type DatePickerDate } from './types';

type SingleDatePickerProps = {
    selected?: DatePickerDate;
    onSelect?: (date?: DatePickerDate) => void;
} & DatePickerBaseProps;

export const SingleDatePicker = (
    { 'data-test-id': dataTestId, onSelect, selected, ...props }: SingleDatePickerProps,
    ref: ForwardedRef<HTMLDivElement>,
): JSX.Element => {
    const { selectedDate, handleSelect } = useSingleDate(selected, onSelect);
    return (
        <DatePickerCalendar
            {...props}
            ref={ref}
            data-test-id={dataTestId}
            mode="single"
            required
            selected={selectedDate}
            onSelect={handleSelect}
        />
    );
};

SingleDatePicker.displayName = 'SingleDatePicker';
export const ForwardedRefSingleDatePicker = forwardRef<HTMLDivElement, SingleDatePickerProps>(SingleDatePicker);
