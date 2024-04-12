/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type GlyphProps, GlyphSeries, LineSeries } from '@visx/xychart';
import { Fragment } from 'react';

import { type LineChartDataPoint, type LineChartSeries } from '@components/LineChart';
import { MISSING_DATA_SERIES_KEY_SUFFIX } from '@components/LineChart/consts';
import { glyphColorAccessor, xAccessor, yAccessor } from '@components/LineChart/helpers';
import { colorAccessorByIndex } from '@components/common/helpers';
import { BASE_COLOR_BACKFILLED, BASE_COLOR_NEGATIVE } from '@theme/consts';

import { NEGATIVE_CLIP_PATH_ID, POSITIVE_CLIP_PATH_ID } from './SeriesClipPath';

type LineProps = {
    series: LineChartSeries[];
    backfilledSeries: LineChartSeries[];
    hideGlyphs: boolean;
    highlightNegativeValues: boolean;
};

const LINE_WIDTH = 1.5;

const renderGlyph = ({ color, x, y }: GlyphProps<LineChartDataPoint>, hideGlyphs: boolean) =>
    hideGlyphs ? null : (
        <circle
            className="visx-circle-glyph"
            fill="var(--fc-base-color)"
            stroke={color}
            strokeWidth="1.5"
            r={3}
            cx={x}
            cy={y}
        ></circle>
    );

export const Line = ({ series, backfilledSeries, hideGlyphs, highlightNegativeValues }: LineProps) => {
    return (
        <>
            {series.map((item, index) => (
                <Fragment key={`${item.name}-line`}>
                    <LineSeries
                        dataKey={item.name}
                        data={item.dataPoints}
                        xAccessor={xAccessor}
                        yAccessor={yAccessor}
                        stroke={colorAccessorByIndex(index)}
                        strokeWidth={LINE_WIDTH}
                        clipPath={`url(#${POSITIVE_CLIP_PATH_ID})`}
                    />
                    <LineSeries
                        dataKey={item.name}
                        data={item.dataPoints}
                        xAccessor={xAccessor}
                        yAccessor={yAccessor}
                        stroke={BASE_COLOR_NEGATIVE}
                        strokeWidth={LINE_WIDTH}
                        clipPath={`url(#${NEGATIVE_CLIP_PATH_ID})`}
                    />
                    <GlyphSeries
                        dataKey={item.name}
                        data={item.dataPoints}
                        xAccessor={xAccessor}
                        yAccessor={yAccessor}
                        colorAccessor={(d) =>
                            glyphColorAccessor(yAccessor(d), highlightNegativeValues, colorAccessorByIndex(index))
                        }
                        renderGlyph={(props) => renderGlyph(props, hideGlyphs)}
                    />
                </Fragment>
            ))}
            {backfilledSeries.map((item, index) => (
                <LineSeries
                    key={`${item.name}${MISSING_DATA_SERIES_KEY_SUFFIX}-${index}-line`}
                    dataKey={`${item.name}${MISSING_DATA_SERIES_KEY_SUFFIX}-${index}`}
                    data={item.dataPoints}
                    xAccessor={xAccessor}
                    yAccessor={yAccessor}
                    stroke={BASE_COLOR_BACKFILLED}
                    opacity={0.3}
                    strokeDasharray="4 4"
                    strokeWidth={LINE_WIDTH}
                />
            ))}
        </>
    );
};
