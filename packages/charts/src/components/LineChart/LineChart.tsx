/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Grid, XYChart } from '@visx/xychart';

import { Legend, Tooltip } from '@components/common/components';
import { colorAccessorByKey, getNonZeroLinearScaleDomain } from '@components/common/helpers';
import { getLinearScaleTicks } from '@components/common/helpers/getLinearScaleTicks';
import { useMargin } from '@components/common/hooks';
import { createTheme } from '@theme/createTheme';

import { Axes, MarkLine, Series } from './components';
import { createBackfilledSeries, getAreaFillColors } from './helpers';
import { type LineChartProps } from './types';
const Y_TICKS_LENGTH = 5;

export const LineChart = ({
    width,
    height,
    series,
    missingValueLabel,
    locale,
    hideGlyphs = false,
    hideArea = false,
    hideLegend = false,
    legendPosition = 'top',
    highlightNegativeValues = false,
    markLine,
    valueFormatter,
}: LineChartProps) => {
    const backfilledSeries = createBackfilledSeries(series);
    const theme = createTheme(getAreaFillColors(series.length, backfilledSeries.length));

    const yDomain = getNonZeroLinearScaleDomain(series, markLine?.value ?? 0);
    const linearScaleTicks = getLinearScaleTicks(yDomain, Y_TICKS_LENGTH);
    const margin = useMargin({
        ticks: linearScaleTicks,
        tickLabelStyle: theme.axisStyles.y.left.tickLabel,
        valueFormatter,
        tickLength: theme.axisStyles.y.left.tickLength,
    });

    return (
        <div className="tw-flex tw-flex-col tw-gap-6 tw-z-[1]">
            {!hideLegend && legendPosition === 'top' && (
                <Legend names={series.map((series) => series.name)} style={'line'} />
            )}
            <XYChart
                theme={theme}
                xScale={{ type: 'time' }}
                yScale={{ type: 'linear', domain: yDomain }}
                height={height}
                width={width}
                margin={margin}
            >
                <Grid
                    key={'grid'}
                    rows
                    columns={false}
                    numTicks={Y_TICKS_LENGTH}
                    stroke={'var(--fc-grid-stroke-color)'}
                />
                <Axes
                    linearScaleTicks={linearScaleTicks}
                    valueFormatter={valueFormatter}
                    locale={locale}
                    series={series}
                />
                <Series
                    series={series}
                    backfilledSeries={backfilledSeries}
                    hideGlyphs={hideGlyphs}
                    hideArea={hideArea}
                    highlightNegativeValues={highlightNegativeValues}
                />
                {markLine && <MarkLine {...markLine} />}
                <Tooltip
                    crossHairStyle={'line'}
                    hideGlyphs={false}
                    colorAccessor={(key) => colorAccessorByKey(key, series)}
                    missingValueLabel={missingValueLabel}
                    valueFormatter={valueFormatter}
                    locale={locale}
                />
            </XYChart>
            {!hideLegend && legendPosition === 'bottom' && (
                <Legend names={series.map((series) => series.name)} style={'line'} />
            )}
        </div>
    );
};
