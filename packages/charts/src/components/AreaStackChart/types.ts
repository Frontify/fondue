/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ValueFormatter } from '@components/common/types';

import { type LegendPosition, type MarkLineProps } from '..';

export type AreaStackChartDataPoint = {
    timestamp: Date;
    value: number | null;
    description?: string;
};

export type AreaStackChartSeries = {
    dataPoints: AreaStackChartDataPoint[];
    name: string;
};

export type AreaStackChartProps = {
    series: AreaStackChartSeries[];
    height: number;
    width?: number;
    missingValueLabel?: string;
    childSumLabel?: string;
    locale?: string;
    hideLegend?: boolean;
    legendPosition?: LegendPosition;
    markLine?: MarkLineProps;
    valueFormatter?: ValueFormatter;
    domain?: 'storage' | 'count';
};
