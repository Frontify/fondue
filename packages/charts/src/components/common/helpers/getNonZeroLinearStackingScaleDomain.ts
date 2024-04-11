/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AreaStackChartSeries } from '@components/AreaStackChart/types';

import { getRoundFactor } from './getNonZeroLinearScaleDomain';

const getMaxStackingValue = (series: AreaStackChartSeries[]) => {
    if (!series[0]) {
        return 0;
    }

    let max = 0;
    const dataPointsLength = series[0].dataPoints.length;

    for (let i = 0; i < dataPointsLength; i++) {
        const sum = series.reduce((acc, series) => acc + (series?.dataPoints[i]?.value || 0), 0);
        max = Math.max(max, sum);
    }
    return max;
};

export const getNonZeroLinearStackingScaleDomain = (
    series: AreaStackChartSeries[],
    markLineValue?: number,
): [number, number] => {
    const maxStackingValue = getMaxStackingValue(series);
    const roundFactor = getRoundFactor(Math.max(maxStackingValue, markLineValue ?? 0));
    const max = Math.ceil(Math.max(maxStackingValue, markLineValue || 0) / roundFactor) * roundFactor;

    return max === 0 ? [0, 1] : [0, max];
};
