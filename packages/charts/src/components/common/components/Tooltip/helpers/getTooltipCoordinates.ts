/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isValidNumber } from '../../../../../utils/isValidNumber';

export const getTooltipCoordinates = (
    datumCoords: { left?: number; top?: number },
    tooltipCoords: { left: number; top: number },
    horizontal?: boolean,
) => {
    const { left, top } = datumCoords;
    const tooltipLeft = !horizontal && isValidNumber(left) ? left : tooltipCoords.left;
    const tooltipTop = horizontal && isValidNumber(top) ? top : tooltipCoords.top;

    return { tooltipLeft, tooltipTop };
};
