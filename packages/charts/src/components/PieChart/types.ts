/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ValueFormatter } from '@components/common/types';

export type PieChartDatum = {
    value: number;
    label: string;
};

export type ColorScale = 'discrete' | 'continuous';

export type PieChartProps = {
    size: number;
    data: PieChartDatum[];
    valueFormatter?: ValueFormatter;
    showLabelTitle?: boolean;
    showLabelValue?: boolean;
    showLabelPercentage?: boolean;
    shouldSortData?: boolean;
    colorScale?: ColorScale;
};

export type Padding = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
