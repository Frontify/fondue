/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type BarChartDataPoint } from '@components/BarChart';

const _xAccessor = (dataPoint: BarChartDataPoint) => dataPoint.label;
const _yAccessor = (dataPoint: BarChartDataPoint) => dataPoint.value;

export const xAccessor = (dataPoint: BarChartDataPoint, horizontal?: boolean) =>
    horizontal ? _yAccessor(dataPoint) : _xAccessor(dataPoint);
export const yAccessor = (dataPoint: BarChartDataPoint, horizontal?: boolean) =>
    horizontal ? _xAccessor(dataPoint) : _yAccessor(dataPoint);
