/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';
import { type DateRange as InternalDayPickerDateRange } from 'react-day-picker';

type RangeHoverModifiers = {
    hoverBefore:
        | {
              before: Date;
          }
        | false;
    hoverAfter:
        | {
              after: Date;
          }
        | false;
    hoverSelected: Date | false;
};

const DISABLED_MODIFIERS: RangeHoverModifiers = {
    hoverBefore: false,
    hoverAfter: false,
    hoverSelected: false,
};

export const useRangeHover = (selectedDateRange?: InternalDayPickerDateRange) => {
    const hoverModifiers = useMemo(() => {
        if (
            !selectedDateRange?.from ||
            !selectedDateRange?.to ||
            selectedDateRange?.to.getTime() > selectedDateRange?.from.getTime()
        ) {
            return DISABLED_MODIFIERS;
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
