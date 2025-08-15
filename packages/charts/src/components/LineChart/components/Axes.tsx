/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DataContext, Axis as VisxAxis } from '@visx/xychart';
import { useContext } from 'react';

import { type LineChartSeries } from '@components/LineChart';
import { type ValueFormatter } from '@components/common/types';

import { getXTickValues } from './helpers';

type AxesProps = {
    linearScaleTicks: number[];
    valueFormatter?: ValueFormatter;
    locale?: string;
    series: LineChartSeries[];
};

export const Axes = ({ linearScaleTicks, valueFormatter, locale, series }: AxesProps) => {
    const { innerWidth } = useContext(DataContext);
    const xTickValues = getXTickValues(series, innerWidth);

    const formatTickLabel = (value: number) => {
        return new Intl.DateTimeFormat(locale ?? Intl.DateTimeFormat().resolvedOptions().locale, {
            month: 'short',
            day: '2-digit',
        }).format(value);
    };

    return (
        <>
            <VisxAxis
                hideAxisLine
                numTicks={5}
                orientation={'left'}
                tickValues={linearScaleTicks}
                tickFormat={valueFormatter}
            />
            <VisxAxis
                tickValues={xTickValues}
                hideAxisLine={false}
                orientation={'bottom'}
                tickFormat={formatTickLabel}
            />
        </>
    );
};
