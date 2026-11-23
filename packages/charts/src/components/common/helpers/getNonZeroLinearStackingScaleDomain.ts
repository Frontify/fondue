/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AreaStackChartSeries } from '@components/AreaStackChart/types';

import { getRoundFactor } from './getNonZeroLinearScaleDomain';

// The stacked counts are whole numbers, so a smaller maximum can't fill five evenly spaced grid lines.
const MIN_DOMAIN_MAX = 5;

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

    return [0, Math.max(max, MIN_DOMAIN_MAX)];
};
