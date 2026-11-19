/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GlyphDot } from '@visx/glyph';
import { AreaSeries, AreaStack as AreaStackChart, DataContext } from '@visx/xychart';
import { useContext } from 'react';

import { colorAccessorByIndex } from '@components/common/helpers';

import { xAccessor, yAccessor } from '../../LineChart/helpers';
import { type LineChartSeries } from '../../LineChart/types';

const GLYPH_RADIUS = 3;

type AreaStackProps = {
    series: LineChartSeries[];
};

export const AreaStack = ({ series }: AreaStackProps) => {
    // reverse series to match green color on top
    const reversedSeries = [...series].reverse();

    return (
        <AreaStackChart>
            {reversedSeries.map((item, index) => (
                <AreaSeries
                    key={item.name}
                    dataKey={item.name}
                    data={item.dataPoints}
                    xAccessor={xAccessor}
                    yAccessor={yAccessor}
                    fillOpacity={0.2}
                    lineProps={{ strokeWidth: 2 }}
                    fill={colorAccessorByIndex(reversedSeries.length - 1 - index)}
                />
            ))}
        </AreaStackChart>
    );
};

/** An area needs two points, so with a single date each series is drawn as a circle at the top of its stack. */
export const SinglePointGlyphs = ({ series }: AreaStackProps) => {
    const { xScale, yScale } = useContext(DataContext);

    if (!xScale || !yScale) {
        return null;
    }

    return (
        <g>
            {series.map((item, index) => {
                const dataPoint = item.dataPoints[0];

                if (!dataPoint) {
                    return null;
                }

                // The first series is stacked on top, so its circle sits on the sum of every series below it.
                const stackTop = series
                    .slice(index)
                    .reduce((total, { dataPoints }) => total + (dataPoints[0]?.value ?? 0), 0);
                const color = colorAccessorByIndex(index);

                return (
                    <GlyphDot
                        key={item.name}
                        cx={Number(xScale(dataPoint.timestamp))}
                        cy={Number(yScale(stackTop))}
                        r={GLYPH_RADIUS}
                        fill={color}
                        stroke={color}
                    />
                );
            })}
        </g>
    );
};
