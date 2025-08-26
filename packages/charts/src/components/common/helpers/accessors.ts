/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type BarChartSeries } from '@components/BarChart';
import { type LineChartSeries } from '@components/LineChart';
import { BASE_COLORS, HOVER_COLORS } from '@theme/consts';

export const colorAccessorByKey = (key: string, series: LineChartSeries[] | BarChartSeries[]): string | undefined => {
    const index = series.findIndex((item) => item.name === key);
    return BASE_COLORS[index % BASE_COLORS.length];
};

export const colorAccessorByIndex = (index: number): string | undefined => BASE_COLORS[index % BASE_COLORS.length];

export const hoverColorAccessorByIndex = (index: number): string | undefined =>
    HOVER_COLORS[index % HOVER_COLORS.length];

export const fillColorAccessorByIndex = (index: number): string | undefined => BASE_COLORS[index % BASE_COLORS.length];
