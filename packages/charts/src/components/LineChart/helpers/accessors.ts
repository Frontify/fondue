/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type LineChartDataPoint } from '@components/LineChart/types';
import { BASE_COLOR_NEGATIVE } from '@theme/consts';

export const xAccessor = (d?: LineChartDataPoint) => (d ? d.timestamp.valueOf() || 0 : null);
export const yAccessor = (d?: LineChartDataPoint) => d?.value ?? null;

export const glyphColorAccessor = (
    value: number | null,
    highlightNegativeValue: boolean,
    positiveColor?: string,
): string | undefined => {
    return value !== null && value < 0 && highlightNegativeValue ? BASE_COLOR_NEGATIVE : positiveColor;
};
