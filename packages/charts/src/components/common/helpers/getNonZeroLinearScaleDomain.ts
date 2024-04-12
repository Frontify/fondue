/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type BarChartSeries } from '@components/BarChart';
import { type LineChartSeries } from '@components/LineChart';

export const getRoundFactor = (value: number): number => {
    const absValue = Math.abs(value);
    const numDigits = Math.round(absValue).toString().length;
    return 10 ** (numDigits - 1);
};

const getLinearScaleDomainValue = (
    series: (BarChartSeries | LineChartSeries)[],
    markLineValue: number,
    extreme: 'min' | 'max',
) => {
    const minMaxFunc = extreme === 'min' ? Math.min : Math.max;
    const roundingFunction = extreme === 'min' ? Math.floor : Math.ceil;
    const extremeSeriesValues = series.map((item) => minMaxFunc(...item.dataPoints.map((point) => point.value ?? 0)));
    const extremeChartValue = minMaxFunc(...extremeSeriesValues, markLineValue);
    const roundFactor = getRoundFactor(extremeChartValue);

    return roundingFunction(extremeChartValue / roundFactor) * roundFactor;
};

const getLinearScaleDomain = (
    series: (BarChartSeries | LineChartSeries)[],
    markLineValue?: number,
): [number, number] => {
    const min = getLinearScaleDomainValue(series, markLineValue ?? 0, 'min');
    const max = getLinearScaleDomainValue(series, markLineValue ?? 0, 'max');

    return [min, max];
};

export const getNonZeroLinearScaleDomain = (
    series: (BarChartSeries | LineChartSeries)[],
    markLineValue?: number,
): [number, number] => {
    const [min, max] = getLinearScaleDomain(series, markLineValue);

    return min === 0 && max === 0 ? [0, 1] : [min, max];
};
