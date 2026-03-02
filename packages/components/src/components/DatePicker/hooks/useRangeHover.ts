/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo, useState } from 'react';
import { type DateRange as InternalDayPickerDateRange } from 'react-day-picker';

export const useRangeHover = (selectedDateRange?: InternalDayPickerDateRange) => {
    const [hoveredDay, setHoveredDay] = useState<Date | undefined>(undefined);
    const hoverModifiers = useMemo(() => {
        const hoverTime = hoveredDay?.getTime();
        const fromTime = selectedDateRange?.from?.getTime();
        const toTime = selectedDateRange?.to?.getTime();

        let fromModifier: Date | undefined;
        let toModifier: Date | undefined;

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
            hoverStart: fromModifier ?? false,
            hoverEnd: toModifier ?? false,
        };
    }, [hoveredDay, selectedDateRange]);

    const handleDayMouseEnter = (day: Date) => {
        setHoveredDay(day);
    };
    const handleDayMouseLeave = () => {
        setHoveredDay(undefined);
    };

    return {
        hoverModifiers,
        handleDayMouseEnter,
        handleDayMouseLeave,
    };
};
