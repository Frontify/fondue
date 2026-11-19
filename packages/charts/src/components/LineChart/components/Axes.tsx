/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DataContext, Axis as VisxAxis } from '@visx/xychart';
import { useContext } from 'react';

import { type LineChartSeries } from '@components/LineChart';
import { getDateTickLabel } from '@components/common/helpers/getDateTickLabel';
import { type DateGranularity, type ValueFormatter } from '@components/common/types';

import { getXTickValues } from './helpers';

type AxesProps = {
    linearScaleTicks: number[];
    valueFormatter?: ValueFormatter;
    locale?: string;
    series: LineChartSeries[];
    dateGranularity?: DateGranularity;
};

export const Axes = ({ linearScaleTicks, valueFormatter, locale, series, dateGranularity }: AxesProps) => {
    const { innerWidth } = useContext(DataContext);
    const xTickValues = getXTickValues(series, innerWidth);

    const formatTickLabel = (value: number) => getDateTickLabel(value, locale, dateGranularity);

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
