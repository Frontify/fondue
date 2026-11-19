/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DateGranularity } from '@components/common/types';
import { type LineChartSeries } from '@components/LineChart/types';

const DATE_TICK_FORMATS: Record<DateGranularity, Intl.DateTimeFormatOptions> = {
    day: { month: 'short', day: '2-digit' },
    month: { month: 'short', year: '2-digit' },
};

export const getDateTickLabel = (value: Date | number, locale?: string, dateGranularity: DateGranularity = 'day') =>
    new Intl.DateTimeFormat(
        locale ?? Intl.DateTimeFormat().resolvedOptions().locale,
        DATE_TICK_FORMATS[dateGranularity],
    ).format(value);

export const getFirstDateTickLabel = (
    series: LineChartSeries[],
    locale?: string,
    dateGranularity?: DateGranularity,
) => {
    const firstTimestamp = series[0]?.dataPoints[0]?.timestamp;

    return firstTimestamp ? getDateTickLabel(firstTimestamp, locale, dateGranularity) : undefined;
};
