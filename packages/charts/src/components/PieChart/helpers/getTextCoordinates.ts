/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LABEL_PADDING_X } from '@components/PieChart/components/consts';

export const getTextCoordinates = (
    centroidAngle: number,
    textWidth: number,
    lineEndPosition: [number, number],
    flipLabelOrientation: boolean,
) => {
    const [lineEndX, lineEndY] = lineEndPosition;
    let textAnchorX;
    if (centroidAngle <= Math.PI || flipLabelOrientation) {
        textAnchorX = lineEndX + LABEL_PADDING_X;
    } else {
        textAnchorX = lineEndX - textWidth - LABEL_PADDING_X;
    }
    const textAnchorY = lineEndY;

    return {
        textAnchorX,
        textAnchorY,
    };
};
