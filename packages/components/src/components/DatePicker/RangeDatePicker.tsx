/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef } from 'react';
import { type OnSelectHandler, type DateRange as DayPickerDateRange } from 'react-day-picker';

import { DatePickerCalendar } from './DatePickerCalendar';

type DateRange = {
    from: Date;
    to: Date;
};

type RangeDatePickerProps = {
    'data-test-id'?: string;
    selected?: DateRange;
    onSelect?: (dateRange: DateRange) => void;
};

const transformPickerDateRangeToFondueDateRange = (dateRange: DayPickerDateRange): DateRange => {
    if (!dateRange.from || !dateRange.to) {
        throw new Error('Date range is not valid');
    }

    return {
        from: dateRange.from,
        to: dateRange.to,
    };
};

export const RangeDatePickerRoot = (
    { 'data-test-id': dataTestId, onSelect, selected }: RangeDatePickerProps,
    ref: ForwardedRef<HTMLDivElement>,
): JSX.Element => {
    const handleSelect: OnSelectHandler<DayPickerDateRange> = (pickerDateRange) => {
        const dateRange = transformPickerDateRangeToFondueDateRange(pickerDateRange);
        onSelect?.(dateRange);
    };

    return (
        <DatePickerCalendar
            ref={ref}
            data-test-id={dataTestId}
            mode="range"
            required
            selected={selected}
            onSelect={handleSelect}
        />
    );
};

RangeDatePickerRoot.displayName = 'RangeDatePicker';

export type { DateRange, RangeDatePickerProps };
export const RangeDatePicker = forwardRef<HTMLDivElement, RangeDatePickerProps>(RangeDatePickerRoot);
