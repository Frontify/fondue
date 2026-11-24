/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DateGranularity } from '@components/common/types';

const DATE_FORMATS: Record<DateGranularity, Intl.DateTimeFormatOptions> = {
    day: { month: 'short', day: '2-digit', year: 'numeric' },
    month: { month: 'short', year: 'numeric' },
};

export const getFormattedTooltipDate = (timestamp?: Date, locale?: string, dateGranularity: DateGranularity = 'day') => {
    if (timestamp) {
        return new Intl.DateTimeFormat(
            locale ?? Intl.DateTimeFormat().resolvedOptions().locale,
            DATE_FORMATS[dateGranularity],
        ).format(timestamp);
    }
    return '';
};
