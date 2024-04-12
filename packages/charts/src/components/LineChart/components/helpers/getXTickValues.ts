/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type LineChartSeries } from '@components/LineChart';

const MAX_TICK_WIDTH = 50;
const TICK_PADDING = 5;

export const getXTickValues = (series: LineChartSeries[], axisWidth?: number): Date[] => {
    const numXTicks = Math.min(
        Math.floor((axisWidth ?? 0) / (MAX_TICK_WIDTH + 2 * TICK_PADDING)),
        // @ts-expect-error Wrong typing in the original code
        series[0].dataPoints.length,
    );

    // @ts-expect-error Wrong typing in the original code
    return series[0].dataPoints
        .filter((_item, index, array) => {
            return index % Math.round((array.length - 1) / numXTicks) === 0;
        })
        .map((item) => item.timestamp);
};
