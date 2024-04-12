/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AreaSeries, AreaStack as AreaStackChart } from '@visx/xychart';

import { colorAccessorByIndex } from '@components/common/helpers';

import { xAccessor, yAccessor } from '../../LineChart/helpers';
import { type LineChartSeries } from '../../LineChart/types';

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
