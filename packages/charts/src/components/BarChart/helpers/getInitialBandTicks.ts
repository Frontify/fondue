/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type BarChartSeries } from '@components/BarChart';

export const getInitialBandTicks = (series: BarChartSeries[]): string[] => {
    return series.reduce((labels: string[], item) => {
        return [...labels, ...item.dataPoints.map((dataPoint) => dataPoint.label)];
    }, []);
};
