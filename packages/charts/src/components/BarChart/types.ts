/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AxisScale, type EventHandlerParams } from '@visx/xychart';
import { type ScaleBand } from 'd3-scale';

import { type LabelFormatter, type ValueFormatter } from '@components/common/types';

type BarChartDataPointBase = {
    label: string;
    value: number | null;
    description?: string;
};

export type BarChartDataPoint<DataPointDetails extends Record<string, any> | void = void> =
    DataPointDetails extends void
        ? BarChartDataPointBase
        : BarChartDataPointBase & {
              details: DataPointDetails;
          };

export type BarChartSeries<DataPointDetails extends Record<string, any> | void = void> = {
    name: string;
    dataPoints: BarChartDataPoint<DataPointDetails>[];
};

export type DisplayStyle = 'default' | 'overlapped';

type LegendPosition = 'top' | 'bottom';

export type BarChartProps<DataPointDetails extends Record<string, any> | void = void> = {
    series: BarChartSeries<DataPointDetails>[];
    height: number;
    width?: number;
    displayStyle?: DisplayStyle;
    horizontal?: boolean;
    hideLegend?: boolean;
    allowDecimalTickValues?: boolean;
    legendPosition?: LegendPosition;
    valueFormatter?: ValueFormatter;
    labelFormatter?: LabelFormatter;
    valueContextBySeries?: string[];
    onBarClick?: (e: BarChartClickHandlerParams<DataPointDetails>) => void;
};

export type BarChartClickHandlerParams<DataPointDetails extends Record<string, any> | void = void> = EventHandlerParams<
    BarChartDataPoint<DataPointDetails>
>;

export const isBandScale = (scale: AxisScale): scale is ScaleBand<string> => {
    return 'bandwidth' in scale && 'paddingInner' in scale && 'paddingOuter' in scale;
};
