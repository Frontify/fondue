/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, useState, type ForwardedRef } from 'react';

import { type DateRange, RangeDatePicker } from './RangeDatePicker';
import { SingleDatePicker } from './SingleDatePicker';

export type DatePickerRootProps = {
    'data-test-id'?: string;
};

export const DatePickerRoot = (
    { 'data-test-id': dataTestId = 'fondue-date-picker', ...props }: DatePickerRootProps,
    ref: ForwardedRef<HTMLDivElement>,
): JSX.Element => {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange>();

    return (
        <div ref={ref} data-test-id={dataTestId}>
            <SingleDatePicker {...props} selected={selectedDate} onSelect={setSelectedDate} />
            <RangeDatePicker {...props} selected={selectedDateRange} onSelect={setSelectedDateRange} />
        </div>
    );
};
DatePickerRoot.displayName = 'DatePickerRoot';

export const DatePicker = forwardRef<HTMLDivElement, DatePickerRootProps>(DatePickerRoot);
