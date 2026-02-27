/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, useMemo, useState, type ForwardedRef } from 'react';
import { type OnSelectHandler } from 'react-day-picker';

import { type DatePickerBaseProps, DatePickerCalendar } from './DatePickerCalendar';

type SingleDatePickerProps = {
    selected?: Date;
    onSelect?: (date: Date) => void;
} & DatePickerBaseProps;

export const SingleDatePicker = (
    { 'data-test-id': dataTestId, onSelect, selected, ...props }: SingleDatePickerProps,
    ref: ForwardedRef<HTMLDivElement>,
): JSX.Element => {
    const [internalSelectedDate, setInternalSelectedDate] = useState<Date | undefined>(selected);
    const selectedDate = useMemo(() => {
        if (selected) {
            return selected;
        }
        return internalSelectedDate;
    }, [internalSelectedDate, selected]);

    const handleSelect: OnSelectHandler<Date> = (date) => {
        setInternalSelectedDate(date);
        onSelect?.(date);
    };

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
