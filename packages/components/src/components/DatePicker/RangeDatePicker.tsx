/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, useMemo, useState, type ForwardedRef } from 'react';
import { type OnSelectHandler, type DateRange as DayPickerDateRange } from 'react-day-picker';

import { type DatePickerBaseProps, DatePickerCalendar } from './DatePickerCalendar';

export type DateRange = {
    from: Date;
    to: Date;
};

type RangeDatePickerProps = {
    'data-test-id'?: string;
    selected?: DateRange;
    onSelect?: (dateRange: DateRange) => void;
} & DatePickerBaseProps;

const transformPickerDateRangeToFondueDateRange = (dateRange: DayPickerDateRange): DateRange => {
    if (!dateRange.from || !dateRange.to) {
        throw new Error('Date range is not valid');
    }

    return {
        from: dateRange.from,
        to: dateRange.to,
    };
};

const transformFondueDateRangeToPickerDateRange = (dateRange?: DateRange): DayPickerDateRange | undefined => {
    if (!dateRange) {
        return undefined;
    }

    return {
        from: dateRange.from,
        to: dateRange.to,
    };
};

export const RangeDatePicker = (
    { 'data-test-id': dataTestId, onSelect, selected, ...props }: RangeDatePickerProps,
    ref: ForwardedRef<HTMLDivElement>,
): JSX.Element => {
    const [internalSelectedDateRange, setInternalSelectedDateRange] = useState<DateRange | undefined>(selected);

    const selectedDateRange = useMemo(() => {
        return transformFondueDateRangeToPickerDateRange(selected ?? internalSelectedDateRange);
    }, [selected, internalSelectedDateRange]);

    const [hoveredDay, setHoveredDay] = useState<Date | undefined>(undefined);

    const handleSelect: OnSelectHandler<DayPickerDateRange> = (pickerDateRange) => {
        const dateRange = transformPickerDateRangeToFondueDateRange(pickerDateRange);
        onSelect?.(dateRange);
        setInternalSelectedDateRange(dateRange);
    };
    const handleDayMouseEnter = (day: Date) => {
        setHoveredDay(day);
    };
    const handleDayMouseLeave = () => {
        setHoveredDay(undefined);
    };

    const hoverModifiers = useMemo(() => {
        const hoverTime = hoveredDay?.getTime();
        const fromTime = selectedDateRange?.from?.getTime();
        const toTime = selectedDateRange?.to?.getTime();

        let fromModifier: Date | undefined = undefined;
        let toModifier: Date | undefined = undefined;

        if (!hoverTime || !fromTime || !toTime || toTime > fromTime) {
            return {
                hoverRange: false,
                hoverStart: false,
                hoverEnd: false,
            };
        }

        if (hoverTime >= toTime) {
            fromModifier = selectedDateRange?.from;
            toModifier = hoveredDay;
        } else if (hoverTime <= fromTime) {
            fromModifier = hoveredDay;
            toModifier = selectedDateRange?.to;
        }

        return {
            hoverRange: {
                from: fromModifier,
                to: toModifier,
            },
            hoverStart: fromModifier ? [fromModifier] : [],
            hoverEnd: toModifier ? [toModifier] : [],
        };
    }, [hoveredDay, selectedDateRange]);

    return (
        <DatePickerCalendar
            {...props}
            ref={ref}
            data-test-id={dataTestId}
            mode="range"
            required
            selected={selectedDateRange}
            onSelect={handleSelect}
            onDayMouseEnter={handleDayMouseEnter}
            onDayMouseLeave={handleDayMouseLeave}
            modifiers={hoverModifiers}
        />
    );
};

RangeDatePicker.displayName = 'RangeDatePicker';
export const ForwardedRefRangeDatePicker = forwardRef<HTMLDivElement, RangeDatePickerProps>(RangeDatePicker);
