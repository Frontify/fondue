/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef } from 'react';
import { type OnSelectHandler } from 'react-day-picker';

import { DatePickerCalendar } from './DatePickerCalendar';

type SingleDatePickerProps = {
    'data-test-id'?: string;
    selected?: Date;
    onSelect?: (date: Date) => void;
};

export const SingleDatePickerRoot = (
    { 'data-test-id': dataTestId, onSelect, selected }: SingleDatePickerProps,
    ref: ForwardedRef<HTMLDivElement>,
): JSX.Element => {
    const handleSelect: OnSelectHandler<Date> = (date) => {
        onSelect?.(date);
    };

    return (
        <DatePickerCalendar
            ref={ref}
            data-test-id={dataTestId}
            mode="single"
            required
            selected={selected}
            onSelect={handleSelect}
        />
    );
};

SingleDatePickerRoot.displayName = 'SingleDatePicker';

export type { SingleDatePickerProps };
export const SingleDatePicker = forwardRef<HTMLDivElement, SingleDatePickerProps>(SingleDatePickerRoot);
