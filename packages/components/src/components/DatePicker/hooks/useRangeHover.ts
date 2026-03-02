/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';
import { type DateRange as InternalDayPickerDateRange } from 'react-day-picker';

export const useRangeHover = (selectedDateRange?: InternalDayPickerDateRange) => {
    const hoverModifiers = useMemo(() => {
        if (
            !selectedDateRange?.from ||
            !selectedDateRange?.to ||
            selectedDateRange?.to.getTime() > selectedDateRange?.from.getTime()
        ) {
            return {
                hoverBefore: false,
                hoverAfter: false,
                hoverSelected: false,
            };
        }
        return {
            hoverBefore: {
                before: selectedDateRange?.from,
            },
            hoverAfter: {
                after: selectedDateRange?.to,
            },
            hoverSelected: selectedDateRange?.from,
        };
    }, [selectedDateRange]);

    return {
        hoverModifiers,
    };
};
