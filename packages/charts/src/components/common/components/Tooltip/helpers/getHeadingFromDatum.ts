/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type BarChartDataPoint } from '@components/BarChart';
import { type LineChartDataPoint } from '@components/LineChart';
import { type LabelFormatter } from '@components/common/types';

import { getFormattedTooltipDate } from './getFormattedTooltipDate';

const isLineDataPoint = (dataPoint?: LineChartDataPoint | BarChartDataPoint): dataPoint is LineChartDataPoint =>
    dataPoint !== undefined &&
    (dataPoint as LineChartDataPoint).value !== undefined &&
    (dataPoint as LineChartDataPoint).timestamp !== undefined;

export const getHeadingFromDatum = (
    datum?: LineChartDataPoint | BarChartDataPoint,
    locale?: string,
    labelFormatter?: LabelFormatter,
) => {
    if (isLineDataPoint(datum)) {
        return getFormattedTooltipDate(datum.timestamp, locale);
    }
    return labelFormatter && datum ? labelFormatter(datum.label) : datum?.label;
};
