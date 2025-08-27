/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BarGroup, BarSeries, type EventHandlerParams } from '@visx/xychart';
import { useState } from 'react';

import { colorAccessorByIndex, hoverColorAccessorByIndex } from '@components/common/helpers';

import { type BarChartDataPoint, type BarChartSeries, type DisplayStyle } from '../types';

import { xAccessor, yAccessor } from './helpers';

type BarGroupProps = {
    series: BarChartSeries[];
    horizontal?: boolean;
    displayStyle: DisplayStyle;
};

export const Bars = ({ series, horizontal, displayStyle }: BarGroupProps) => {
    const [focusedItemLabel, setFocusedItemLabel] = useState<string | null>(null);
    const isOverlapped = displayStyle === 'overlapped';

    const onPointerMove = (e: EventHandlerParams<BarChartDataPoint>) => setFocusedItemLabel(e.datum.label);
    const onPointerOut = () => setFocusedItemLabel(null);

    const seriesElements = series.map((item, seriesIndex) => (
        <BarSeries
            dataKey={`${item.name}`}
            key={`${item.name}-bar-${seriesIndex}`}
            data={item.dataPoints}
            xAccessor={(d) => xAccessor(d, horizontal)}
            yAccessor={(d) => yAccessor(d, horizontal)}
            barPadding={20}
            colorAccessor={(datum: BarChartDataPoint) => {
                if (focusedItemLabel === datum.label) {
                    return hoverColorAccessorByIndex(seriesIndex);
                } else {
                    return colorAccessorByIndex(seriesIndex);
                }
            }}
            onPointerMove={isOverlapped ? onPointerMove : undefined}
            onPointerOut={isOverlapped ? onPointerOut : undefined}
        />
    ));

    return isOverlapped && seriesElements.length > 0 ? (
        seriesElements
    ) : (
        <BarGroup onPointerMove={onPointerMove} onPointerOut={onPointerOut}>
            {seriesElements}
        </BarGroup>
    );
};
