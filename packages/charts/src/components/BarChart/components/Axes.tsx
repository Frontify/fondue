/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Axis as VisxAxis } from '@visx/xychart';
import { type Dispatch, type SetStateAction } from 'react';

import { useBandTicks } from '@components/BarChart/components/hooks/useBandTicks';
import { useRotatedLabel } from '@components/BarChart/components/hooks/useRotatedLabel';
import { type LabelFormatter, type ValueFormatter } from '@components/common/types';

import { truncateTextLabel } from '../helpers';

type AxesProps = {
    linearAxesTicks: number[];
    horizontal: boolean;
    updateMaxLabelHeight: Dispatch<SetStateAction<number>>;
    updateFirstLabelOverflowsBy: Dispatch<SetStateAction<number>>;
    updateBandScaleTicks: Dispatch<SetStateAction<string[]>>;
    valueFormatter: ValueFormatter;
    labelFormatter: LabelFormatter;
};

const getTextAnchorProp = (horizontal: boolean, angle: number) => {
    let textAnchor: 'end' | 'middle';
    if (horizontal) {
        textAnchor = 'end';
    } else {
        textAnchor = angle > 0 ? 'end' : 'middle';
    }
    return textAnchor;
};

export const Axes = ({
    linearAxesTicks,
    horizontal,
    updateMaxLabelHeight,
    updateFirstLabelOverflowsBy,
    updateBandScaleTicks,
    valueFormatter,
    labelFormatter,
}: AxesProps) => {
    const formatLabel = (label: string) => truncateTextLabel(labelFormatter(label).toString());
    const angle = useRotatedLabel(horizontal, updateMaxLabelHeight, updateFirstLabelOverflowsBy, formatLabel);
    const filteredTicks = useBandTicks(horizontal, updateBandScaleTicks);
    const textAnchor = getTextAnchorProp(horizontal, angle);

    return (
        <>
            <VisxAxis
                tickClassName={'tick'}
                tickLength={4}
                hideAxisLine={false}
                stroke={'var(--fc-axis-y-color)'}
                tickStroke={'var(--fc-tick-stroke-color)'}
                numTicks={linearAxesTicks.length}
                orientation={horizontal ? 'bottom' : 'left'}
                tickValues={linearAxesTicks}
                tickFormat={valueFormatter}
            />
            <VisxAxis
                tickClassName={'tick'}
                tickLength={4}
                hideAxisLine={false}
                orientation={horizontal ? 'left' : 'bottom'}
                stroke={'var(--fc-axis-x-color)'}
                tickStroke={'var(--fc-tick-stroke-color)'}
                tickLabelProps={() => ({
                    angle,
                    textAnchor,
                })}
                tickFormat={formatLabel}
                tickValues={filteredTicks}
            />
        </>
    );
};
