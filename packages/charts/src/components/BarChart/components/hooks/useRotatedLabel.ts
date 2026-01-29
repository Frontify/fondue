/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DataContext } from '@visx/xychart';
import { useContext, useEffect, useState, type Dispatch, type SetStateAction } from 'react';

import { getBandScaleColumnWidth } from '@components/BarChart/components/helpers';
import { getSVGTextDimensions } from '@components/common/helpers';
import { type LabelFormatter } from '@components/common/types';
import { TICK_LABEL_STYLE } from '@theme/createTheme';

const getRotationAngleAndMaxHeight = (ticks: string[], columnWidth: number) => {
    const style = TICK_LABEL_STYLE;
    return ticks.reduce(
        (currentValue, tick, index) => {
            let angle = currentValue.rotationAngle;
            let { width, height } = getSVGTextDimensions(tick, style);

            if (width > columnWidth) {
                angle = 315;
                ({ width, height } = getSVGTextDimensions(tick, {
                    ...style,
                    transform: `rotate(${angle}deg)`,
                }));
            }

            const maxHeight = Math.max(currentValue.maxHeight, height);
            const firstItemWidth = index === 0 ? width : currentValue.firstItemWidth;
            const maxAngle = Math.max(angle, currentValue.rotationAngle);

            return { rotationAngle: maxAngle, maxHeight, firstItemWidth };
        },
        { rotationAngle: 0, maxHeight: 0, firstItemWidth: 0 },
    );
};

export const useRotatedLabel = (
    horizontal: boolean,
    updateMaxLabelHeight: Dispatch<SetStateAction<number>>,
    updateFirstLabelOverflowsBy: Dispatch<SetStateAction<number>>,
    labelFormatter: LabelFormatter,
) => {
    const [angle, setAngle] = useState(0);
    const dataContext = useContext(DataContext);
    const { xScale } = dataContext;
    const scale = horizontal ? undefined : xScale;
    const formattedTicks = scale ? scale.domain().map((tick) => labelFormatter(tick)) : null;
    const ticksJSON = scale ? JSON.stringify(formattedTicks) : null;
    const columnWidth = Math.round(getBandScaleColumnWidth(scale));

    useEffect(() => {
        if (columnWidth > 0 && ticksJSON) {
            const ticks: string[] = JSON.parse(ticksJSON);

            const { rotationAngle, maxHeight, firstItemWidth } = getRotationAngleAndMaxHeight(ticks, columnWidth);

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAngle(rotationAngle);
            updateMaxLabelHeight(maxHeight);
            updateFirstLabelOverflowsBy(firstItemWidth - columnWidth / 2);
        } else {
            setAngle(0);
        }
    }, [columnWidth, ticksJSON, updateMaxLabelHeight, updateFirstLabelOverflowsBy]);

    return angle;
};
