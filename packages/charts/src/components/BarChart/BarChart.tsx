/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Grid, XYChart } from '@visx/xychart';
import { useState } from 'react';

import { BandwidthAdjuster } from '@components/BarChart/components/BandwidthAdjuster';
import { getInitialBandTicks } from '@components/BarChart/helpers';
import { Legend, Tooltip } from '@components/common/components';
import { colorAccessorByKey, getNonZeroLinearScaleDomain } from '@components/common/helpers';
import { getLinearScaleTicks } from '@components/common/helpers/getLinearScaleTicks';
import { useMargin } from '@components/common/hooks';
import { type ValueFormatter } from '@components/common/types';
import { BASE_COLORS } from '@theme/consts';
import { createTheme } from '@theme/createTheme';

import { Axes, Bars } from './components';
import { type BarChartProps } from './types';

const Y_TICKS_LENGTH = 5;
const DEFAULT_VALUE_FORMATTER: ValueFormatter = (value) => String(value);
const DEFAULT_LABEL_FORMATTER = (label: string) => label;

export const BarChart = <DataPointDetails extends Record<string, any> | void = void>({
    series,
    height,
    width,
    horizontal = false,
    displayStyle = 'default',
    hideLegend = false,
    allowDecimalTickValues = true,
    legendPosition = 'top',
    valueFormatter = DEFAULT_VALUE_FORMATTER,
    labelFormatter = DEFAULT_LABEL_FORMATTER,
    onBarClick,
}: BarChartProps<DataPointDetails>) => {
    const [maxLabelHeight, setMaxLabelHeight] = useState<number>(0);
    const [firstLabelOverflowsBy, setFirstLabelOverflowsBy] = useState<number>(0);
    const [bandScaleTicks, setBandScaleTicks] = useState<string[]>(() => getInitialBandTicks(series));
    const scalePadding = displayStyle === 'overlapped' ? 0.2 : 0;
    const theme = createTheme(BASE_COLORS);

    const linearScaleDomain = getNonZeroLinearScaleDomain(series, 0);
    const linearScaleTicks = getLinearScaleTicks(linearScaleDomain, Y_TICKS_LENGTH, allowDecimalTickValues);

    const margin = useMargin({
        ticks: horizontal ? bandScaleTicks : linearScaleTicks,
        tickLabelStyle: theme.axisStyles.y.left.tickLabel,
        tickLength: theme.axisStyles.y.left.tickLength,
        valueFormatter,
        maxLabelHeight,
        firstLabelOverflowsBy,
    });

    return (
        <div className="tw-flex tw-flex-col tw-gap-6 tw-z-[1]">
            {!hideLegend && legendPosition === 'top' && (
                <Legend style="rectangle" names={series.map((series) => series.name)} />
            )}
            <span className={onBarClick ? 'bar-chart-cursor-pointer' : ''}>
                <XYChart
                    theme={theme}
                    width={width}
                    height={height}
                    horizontal={horizontal}
                    xScale={
                        horizontal
                            ? { type: 'linear', padding: scalePadding, domain: linearScaleDomain }
                            : { type: 'band', padding: scalePadding }
                    }
                    yScale={
                        horizontal
                            ? { type: 'band', padding: scalePadding }
                            : { type: 'linear', padding: scalePadding, domain: linearScaleDomain }
                    }
                    margin={margin}
                    onPointerDown={onBarClick}
                >
                    <BandwidthAdjuster horizontal={horizontal} />
                    <Grid
                        key={'grid'}
                        rows={!horizontal}
                        columns={horizontal}
                        numTicks={linearScaleTicks.length - 1}
                        stroke={'var(--fc-grid-stroke-color)'}
                    />
                    <Axes
                        linearAxesTicks={linearScaleTicks}
                        horizontal={horizontal}
                        updateFirstLabelOverflowsBy={setFirstLabelOverflowsBy}
                        updateMaxLabelHeight={setMaxLabelHeight}
                        updateBandScaleTicks={setBandScaleTicks}
                        valueFormatter={valueFormatter}
                        labelFormatter={labelFormatter}
                    />
                    <Bars series={series} horizontal={horizontal} displayStyle={displayStyle} />
                    <Tooltip
                        crossHairStyle="bar"
                        hideGlyphs
                        colorAccessor={(key) => colorAccessorByKey(key, series)}
                        horizontal={horizontal}
                        scalePadding={scalePadding}
                        valueFormatter={valueFormatter}
                        labelFormatter={labelFormatter}
                    />
                </XYChart>
            </span>
            {!hideLegend && legendPosition === 'bottom' && (
                <Legend style="rectangle" names={series.map((series) => series.name)} />
            )}
        </div>
    );
};
