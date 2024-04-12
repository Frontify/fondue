/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AreaSeries } from '@visx/xychart';
import { Fragment } from 'react';

import { type LineChartSeries } from '@components/LineChart';
import { MISSING_DATA_SERIES_KEY_SUFFIX } from '@components/LineChart/consts';
import { xAccessor, yAccessor } from '@components/LineChart/helpers';
import { WEAK_COLOR_NEGATIVE } from '@theme/consts';

import { NEGATIVE_CLIP_PATH_ID, POSITIVE_CLIP_PATH_ID } from './SeriesClipPath';

type AreaProps = {
    series: LineChartSeries[];
    backfilledSeries: LineChartSeries[];
    hideArea: boolean;
};

export const Area = ({ series, backfilledSeries, hideArea }: AreaProps) => {
    const fillOpacity = hideArea ? 0 : 1;

    return (
        <>
            {series.map((item) => (
                <Fragment key={`${item.name}-area`}>
                    <AreaSeries
                        key={`${item.name}-area-positive`}
                        dataKey={item.name}
                        data={item.dataPoints}
                        xAccessor={xAccessor}
                        yAccessor={yAccessor}
                        renderLine={false}
                        clipPath={`url(#${POSITIVE_CLIP_PATH_ID})`}
                        fillOpacity={fillOpacity}
                    />
                    <AreaSeries
                        key={`${item.name}-area-negative`}
                        dataKey={item.name}
                        data={item.dataPoints}
                        xAccessor={xAccessor}
                        yAccessor={yAccessor}
                        renderLine={false}
                        clipPath={`url(#${NEGATIVE_CLIP_PATH_ID})`}
                        fillOpacity={fillOpacity}
                        fill={WEAK_COLOR_NEGATIVE}
                    />
                </Fragment>
            ))}
            {backfilledSeries.map((item, index) => (
                <AreaSeries
                    key={`${item.name}${MISSING_DATA_SERIES_KEY_SUFFIX}-${index}-area`}
                    dataKey={`${item.name}${MISSING_DATA_SERIES_KEY_SUFFIX}-${index}`}
                    data={item.dataPoints}
                    xAccessor={xAccessor}
                    yAccessor={yAccessor}
                    renderLine={false}
                    fillOpacity={fillOpacity}
                />
            ))}
        </>
    );
};
