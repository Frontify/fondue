/* (c) Copyright Frontify Ltd., all rights reserved. */

import { XYChart } from '@visx/xychart';

import { Axes, MarkLine } from '@components/LineChart/components';
import { createBackfilledSeries, getAreaFillColors } from '@components/LineChart/helpers';
import { Legend, Tooltip } from '@components/common/components';
import { colorAccessorByKey, getLinearScaleTicks } from '@components/common/helpers';
import { getNonZeroLinearStackingScaleDomain } from '@components/common/helpers/getNonZeroLinearStackingScaleDomain';
import { getTransformedScaleTicks } from '@components/common/helpers/getTransformedScaleTicks';
import { transformDomainToStorageDomain } from '@components/common/helpers/transformDomainToStorageDomain';
import { useMargin } from '@components/common/hooks';
import { createTheme } from '@theme/createTheme';

import { AreaStack } from './components/AreaStack';
import { GridRows } from './components/GridRows';
import { type AreaStackChartProps } from './types';

const Y_TICKS_LENGTH = 5;
const STORAGE_DOMAIN = 'storage';
const COUNT_DOMAIN = 'storage';
const LEGEND_POSITION_TOP = 'top';

export const AreaStackChart = ({
    width,
    height,
    series,
    missingValueLabel,
    locale,
    hideLegend = false,
    legendPosition = LEGEND_POSITION_TOP,
    markLine,
    valueFormatter,
    childSumLabel,
    domain = COUNT_DOMAIN,
}: AreaStackChartProps) => {
    const backfilledSeries = createBackfilledSeries(series);
    const theme = createTheme(getAreaFillColors(series.length, backfilledSeries.length));

    const yDomain = getNonZeroLinearStackingScaleDomain(series, markLine?.value ?? 0);
    const transformedYDomain = domain === STORAGE_DOMAIN ? transformDomainToStorageDomain(yDomain) : yDomain;
    const linearScaleTicks = getLinearScaleTicks(transformedYDomain, Y_TICKS_LENGTH);
    const transformedLinearScaleTicks = getTransformedScaleTicks(transformedYDomain, linearScaleTicks.length);

    const margin = useMargin({
        ticks: transformedLinearScaleTicks,
        tickLabelStyle: theme.axisStyles.y.left.tickLabel,
        valueFormatter,
        tickLength: theme.axisStyles.y.left.tickLength,
    });

    return (
        <div className="tw-flex tw-flex-col tw-gap-6 tw-z-[1]">
            {!hideLegend && legendPosition === LEGEND_POSITION_TOP && (
                <Legend names={series.map((series) => series.name)} style="line" />
            )}
            <XYChart
                theme={theme}
                xScale={{ type: 'time' }}
                yScale={{ type: 'linear', domain: transformedYDomain }}
                height={height}
                width={width}
                margin={margin}
            >
                <GridRows tickValues={transformedLinearScaleTicks} />
                <AreaStack series={series} />
                <Axes
                    linearScaleTicks={transformedLinearScaleTicks}
                    valueFormatter={valueFormatter}
                    locale={locale}
                    series={series}
                />
                {markLine && <MarkLine {...markLine} />}
                <Tooltip
                    crossHairStyle="line"
                    hideGlyphs={false}
                    colorAccessor={(key) => colorAccessorByKey(key, series)}
                    missingValueLabel={missingValueLabel}
                    childSumLabel={childSumLabel}
                    valueFormatter={valueFormatter}
                    locale={locale}
                    stackingGlyphs
                />
            </XYChart>
            {!hideLegend && legendPosition === 'bottom' && (
                <Legend names={series.map((series) => series.name)} style={'line'} />
            )}
        </div>
    );
};
