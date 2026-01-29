/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { useRef, useState } from 'react';

import { DEFAULT_PADDING } from '@components/PieChart/consts';
import { useResponsiveChart } from '@components/PieChart/hooks/useResponsiveChart';
import { Legend } from '@components/common/components';
import { colorAccessorByIndex } from '@components/common/helpers';

import { Arc } from './components';
import { type Padding, type PieChartDatum, type PieChartProps } from './types';

export const PieChart = ({
    size: sizeProp,
    data,
    valueFormatter,
    showLabelTitle = false,
    showLabelValue = false,
    showLabelPercentage = false,
    shouldSortData = false,
}: PieChartProps) => {
    const [labelsPadding, setLabelsPadding] = useState<Padding>(DEFAULT_PADDING);
    const containerRef = useRef<HTMLDivElement>(null);
    const { radius, labelStyle, center, width, height } = useResponsiveChart(sizeProp, containerRef, labelsPadding);

    const nonZeroData = data.filter((d) => d.value > 0);
    const pieData = nonZeroData.length > 0 ? nonZeroData : data;

    const sortedPieData = shouldSortData ? pieData.sort((a, b) => b.value - a.value) : pieData;

    return (
        <div
            ref={containerRef}
            className="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-gap-8 md:tw-gap-6"
        >
            <svg width={width} height={height}>
                <Group top={center[1]} left={center[0]}>
                    <Pie
                        data={sortedPieData}
                        pieValue={(datum: PieChartDatum) => datum.value}
                        outerRadius={radius}
                        pieSort={null}
                        pieSortValues={null}
                    >
                        {({ arcs, path }) => {
                            return (
                                <g>
                                    {arcs.map((arc, i) => (
                                        <Arc
                                            key={`${arc.startAngle}-${arc.index}-${arc.value}-${arc.data.label}`}
                                            arc={arc}
                                            previousArc={arcs[i - 1]}
                                            numberOfArcs={arcs.length}
                                            radius={radius}
                                            isLabelHidden={labelStyle === 'legend'}
                                            showLabelValue={showLabelValue}
                                            showLabelPercentage={showLabelPercentage}
                                            showLabelTitle={showLabelTitle}
                                            path={path}
                                            setPaddingForLabels={setLabelsPadding}
                                            valueFormatter={valueFormatter}
                                        />
                                    ))}
                                </g>
                            );
                        }}
                    </Pie>
                </Group>
            </svg>
            {labelStyle === 'legend' && (
                <Legend
                    names={data.map((datum) => datum.label)}
                    style={'circle'}
                    colorAccessor={colorAccessorByIndex}
                />
            )}
        </div>
    );
};
