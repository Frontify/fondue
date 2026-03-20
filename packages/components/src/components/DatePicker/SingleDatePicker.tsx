/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef } from 'react';

import { type DatePickerBaseProps, DatePickerCalendar } from './DatePickerCalendar';
import { useSingleDate } from './hooks/useSingleDate';
import { type DatePickerDate } from './types';

type SingleDatePickerProps = {
    selected?: DatePickerDate;
    onChange?: (date?: DatePickerDate) => void;
} & DatePickerBaseProps;

export const SingleDatePicker = (
    { 'data-test-id': dataTestId, onChange, selected, ...props }: SingleDatePickerProps,
    ref: ForwardedRef<HTMLDivElement>,
): JSX.Element => {
    const { selectedDate, handleSelect } = useSingleDate(selected, onChange);
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

SingleDatePicker.displayName = 'DatePicker';
export const ForwardedRefSingleDatePicker = forwardRef<HTMLDivElement, SingleDatePickerProps>(SingleDatePicker);
