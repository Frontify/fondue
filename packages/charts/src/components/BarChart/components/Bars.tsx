/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BarGroup, BarSeries, type EventHandlerParams } from '@visx/xychart';
import { useState } from 'react';

import { colorAccessorByIndex, hoverColorWeakAccessorByIndex } from '@components/common/helpers';

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

    const onPointerMove = (e: EventHandlerParams<BarChartDataPoint>) => {
        setFocusedItemLabel(e.datum.label);
        if (e.datum.onBarClick) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'auto';
        }
    };
    const onPointerOut = () => setFocusedItemLabel(null);
    const onPointerDown = (e: EventHandlerParams<BarChartDataPoint>) => e.datum.onBarClick && e.datum.onBarClick(e);

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
                    return hoverColorWeakAccessorByIndex(seriesIndex);
                } else {
                    return colorAccessorByIndex(seriesIndex);
                }
            }}
            onPointerMove={isOverlapped ? onPointerMove : undefined}
            onPointerOut={isOverlapped ? onPointerOut : undefined}
            onPointerDown={isOverlapped ? onPointerDown : undefined}
        />
    ));

    return isOverlapped && seriesElements.length > 0 ? (
        seriesElements
    ) : (
        <BarGroup onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerOut={onPointerOut}>
            {seriesElements}
        </BarGroup>
    );
};
