/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import { type Dispatch, type SetStateAction, useEffect } from 'react';

import { type Padding, type PieChartDatum } from '@components/PieChart';
import { LABEL_PERCENTAGE_STYLE, LABEL_TITLE_STYLE, LABEL_VALUE_STYLE } from '@components/PieChart/components/consts';
import { DEFAULT_PADDING } from '@components/PieChart/consts';
import { getLineCoordinates, getPadding, getTextCoordinates, getTextOffset } from '@components/PieChart/helpers';
import { useTextWidths } from '@components/PieChart/hooks/useTextWidths';
import { colorAccessorByIndex } from '@components/common/helpers';
import { type ValueFormatter } from '@components/common/types';
import { TICK_LABEL_STYLE } from '@theme/createTheme';

type LabelProps = {
    centroid: [number, number];
    centroidAngle: number;
    prevCentroidAngle: number;
    arcDatum: PieArcDatum<PieChartDatum>;
    radius: number;
    showLabelTitle: boolean;
    showLabelValue: boolean;
    showLabelPercentage: boolean;
    setPadding: Dispatch<SetStateAction<Padding>>;
    labelsShownOnHover: boolean;
    hideLabel: boolean;
    valueFormatter?: ValueFormatter;
};

export const Label = ({
    centroid,
    centroidAngle,
    prevCentroidAngle,
    arcDatum,
    radius,
    showLabelTitle,
    showLabelValue,
    showLabelPercentage,
    setPadding,
    labelsShownOnHover,
    hideLabel,
    valueFormatter,
}: LabelProps) => {
    const { data, startAngle, endAngle, index } = arcDatum;
    const labelExists = showLabelTitle || showLabelValue || showLabelPercentage;
    const percentage = (((endAngle - startAngle) / (Math.PI * 2)) * 100).toFixed(1);
    const formattedValue = valueFormatter?.(data.value) ?? data.value;
    const titleText = showLabelTitle ? data.label : '';
    const valueText = `${showLabelValue ? formattedValue : ''}`;
    const percentageText = showLabelPercentage ? `(${percentage}%)` : '';
    const { labelWidth, valueWidth, percentageWidth } = useTextWidths(titleText, valueText, percentageText);
    const textWidth = Math.max(labelWidth, valueWidth + percentageWidth);

    const flipLabelOrientation = !labelsShownOnHover && centroidAngle - prevCentroidAngle < Math.PI * 0.15;

    const { x1, y1, x2, y2, x3 } = getLineCoordinates(centroidAngle, centroid, radius, flipLabelOrientation);

    const { textAnchorX, textAnchorY } = getTextCoordinates(centroidAngle, textWidth, [x3, y2], flipLabelOrientation);
    const { textTopOffset, textBottomOffset } = getTextOffset(showLabelTitle, showLabelValue, showLabelPercentage);
    const titleXOffset = textAnchorX < x3 ? textWidth - labelWidth : 0;

    useEffect(() => {
        if (labelExists) {
            const { paddingTop, paddingRight, paddingBottom, paddingLeft } = getPadding(
                centroidAngle,
                radius,
                textWidth,
                [textAnchorX, textAnchorY],
                textTopOffset,
                textBottomOffset * 1.5,
            );
            setPadding((origPadding) => {
                return {
                    top: Math.max(origPadding.top, paddingTop),
                    right: Math.max(origPadding.right, paddingRight),
                    bottom: Math.max(origPadding.bottom, paddingBottom),
                    left: Math.max(origPadding.left, paddingLeft),
                };
            });
        } else {
            setPadding(DEFAULT_PADDING);
        }
    }, [
        centroidAngle,
        textWidth,
        radius,
        textAnchorX,
        textAnchorY,
        textTopOffset,
        textBottomOffset,
        labelExists,
        setPadding,
    ]);

    return labelExists && !hideLabel ? (
        <g>
            <path
                d={`M ${x1} ${y1} L ${x2} ${y2} H ${x3}`}
                stroke={colorAccessorByIndex(index)}
                strokeWidth={'2px'}
                fill={'none'}
            ></path>
            <text x={textAnchorX} y={textAnchorY} {...TICK_LABEL_STYLE}>
                {showLabelTitle && (
                    <tspan dx={titleXOffset} {...LABEL_TITLE_STYLE}>
                        {titleText}
                    </tspan>
                )}
                <tspan x={textAnchorX} dy={textBottomOffset * 1.25} {...LABEL_VALUE_STYLE}>
                    {valueText} <tspan {...LABEL_PERCENTAGE_STYLE}>{percentageText}</tspan>
                </tspan>
            </text>
        </g>
    ) : null;
};
