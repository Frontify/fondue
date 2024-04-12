/* (c) Copyright Frontify Ltd., all rights reserved. */

import { WEAK_COLORS, WEAK_COLOR_NO_DATA } from '@theme/consts';

export const getAreaFillColors = (seriesLength: number, backfilledSeriesLength: number): string[] => {
    const backfilledSeriesColors = Array(backfilledSeriesLength).fill(WEAK_COLOR_NO_DATA);
    const seriesColors = Array.from({ length: seriesLength }, (_, i) => WEAK_COLORS[i % WEAK_COLORS.length]);

    return [...seriesColors, ...backfilledSeriesColors];
};
