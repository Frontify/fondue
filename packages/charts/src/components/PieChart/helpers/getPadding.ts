/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LABEL_PADDING_X } from '@components/PieChart/components/consts';

export const getPadding = (
    centroidAngle: number,
    radius: number,
    textWidth: number,
    textPosition: [number, number],
    textTopOffset: number,
    textBottomOffset: number,
) => {
    const [textX, textY] = textPosition;
    let paddingTop = 0,
        paddingRight = 0,
        paddingLeft = 0,
        paddingBottom = 0;
    if (centroidAngle < Math.PI / 2) {
        paddingRight = textX + textWidth + LABEL_PADDING_X - radius;
        paddingTop = Math.abs(textY) - radius + textTopOffset;
    } else if (centroidAngle === Math.PI / 2) {
        paddingRight = Math.abs(textX) + textWidth + LABEL_PADDING_X - radius;
    } else if (centroidAngle > Math.PI / 2 && centroidAngle < Math.PI) {
        paddingBottom = textY - radius + textBottomOffset;
        paddingRight = textX + textWidth + LABEL_PADDING_X - radius;
    } else if (centroidAngle === Math.PI) {
        paddingBottom = textY - radius + textBottomOffset;
    } else if (centroidAngle > Math.PI && centroidAngle < Math.PI * 1.5) {
        paddingBottom = Math.abs(textY) - radius + textBottomOffset;
        paddingLeft = Math.abs(textX) - radius + LABEL_PADDING_X;
    } else if (centroidAngle === Math.PI * 1.5) {
        paddingLeft = Math.abs(textX) - radius + LABEL_PADDING_X;
    } else {
        paddingTop = Math.abs(textY) - radius + textTopOffset;
        paddingLeft = Math.abs(textX) - radius + LABEL_PADDING_X;
    }

    return {
        paddingTop,
        paddingRight,
        paddingLeft,
        paddingBottom,
    };
};
