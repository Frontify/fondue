/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ValueFormatter } from '@components/common/types';

export type LineChartDataPoint = {
    timestamp: Date;
    value: number | null;
    description?: string;
};

export type LineChartSeries = {
    dataPoints: LineChartDataPoint[];
    name: string;
};

export type MarkLineProps = {
    name: string;
    value: number;
};

export type LegendPosition = 'top' | 'bottom';

export type LineChartProps = {
    series: LineChartSeries[];
    height: number;
    width?: number;
    missingValueLabel?: string;
    locale?: string;
    hideGlyphs?: boolean;
    hideArea?: boolean;
    hideLegend?: boolean;
    legendPosition?: LegendPosition;
    highlightNegativeValues?: boolean;
    markLine?: MarkLineProps;
    valueFormatter?: ValueFormatter;
};
