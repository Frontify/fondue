/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef } from 'react';

import { type DatePickerBaseProps, DatePickerCalendar } from './DatePickerCalendar';
import { useDateRange } from './hooks/useDateRange';
import { useRangeHover } from './hooks/useRangeHover';
import { type DatePickerDateRange } from './types';

type RangeDatePickerProps = {
    selected?: DatePickerDateRange;
    onChange?: (dateRange: DatePickerDateRange) => void;
} & DatePickerBaseProps;

export const RangeDatePicker = (
    { 'data-test-id': dataTestId, onChange, selected, ...props }: RangeDatePickerProps,
    ref: ForwardedRef<HTMLDivElement>,
): JSX.Element => {
    const { selectedDateRange, handleSelect } = useDateRange(selected, onChange);
    const { hoverModifiers } = useRangeHover(selectedDateRange);

    return (
        <DatePickerCalendar
            {...props}
            ref={ref}
            data-test-id={dataTestId}
            mode="range"
            required
            selected={selectedDateRange}
            onSelect={handleSelect}
            modifiers={hoverModifiers}
        />
    );
};

RangeDatePicker.displayName = 'RangeDatePicker';
export const ForwardedRefRangeDatePicker = forwardRef<HTMLDivElement, RangeDatePickerProps>(RangeDatePicker);
