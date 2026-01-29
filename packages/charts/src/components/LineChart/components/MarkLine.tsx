/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DataContext } from '@visx/xychart';
import { useCallback, useContext, useState } from 'react';

import { type MarkLineProps } from '@components/LineChart';

type RectSize = {
    width: number;
    height: number;
};

const NAME_PADDING_X = 8;
const NAME_PADDING_Y = 2;
const DEFAULT_RECT_SIZE = { width: 0, height: 0 };

const getRectSizeFromTextNode = (textNode: SVGTextElement): RectSize => {
    const { width: textWidth, height: textHeight } = textNode.getBBox();
    const width = textWidth + 2 * NAME_PADDING_X;
    const height = textHeight + 2 * NAME_PADDING_Y;

    return { width, height };
};

export const MarkLine = ({ value, name }: MarkLineProps) => {
    const { xScale, yScale } = useContext(DataContext);
    const [rectSize, setRectSize] = useState<RectSize>(DEFAULT_RECT_SIZE);
    const textRef = useCallback(
        (node: SVGTextElement | null) => {
            if (node !== null) {
                setRectSize(getRectSizeFromTextNode(node));
            }
        },
        // rectSize should be updated when name changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [name],
    );

    const xScaleRange = [Number(xScale?.range()[0] ?? 0), Number(xScale?.range()[1] ?? 0)];
    const yPosition = Number(yScale?.(value) ?? 0);

    // @ts-expect-error Wrong typing in the original code
    const xPositionText = xScaleRange[0] + xScaleRange[1] / 2 - rectSize.width / 2;
    // @ts-expect-error Wrong typing in the original code
    const xPositionRect = xScaleRange[0] + xScaleRange[1] / 2 - NAME_PADDING_X - rectSize.width / 2;
    const yPositionText = yPosition + 2 * NAME_PADDING_Y;
    const yPositionRect = yPosition - rectSize.height / 2;

    return (
        <g>
            <line x1={xScaleRange[0]} y1={yPosition} x2={xScaleRange[1]} y2={yPosition} stroke="black" />
            <rect
                x={xPositionRect}
                y={yPositionRect}
                width={rectSize.width}
                height={rectSize.height}
                rx="4"
                fill={'white'}
                stroke={'black'}
            />
            <text
                x={xPositionText}
                y={yPositionText}
                ref={textRef}
                strokeWidth={0}
                fill={'var(--color-secondary-default)'}
                className="tw-text-x-small tw-font-bold tw-font-primary"
            >
                {name}
            </text>
        </g>
    );
};
