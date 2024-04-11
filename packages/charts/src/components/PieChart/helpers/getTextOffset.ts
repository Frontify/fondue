/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FONT_SIZE } from '@components/PieChart/components/consts';

export const getTextOffset = (showLabelTitle: boolean, showLabelValue: boolean, showLabelPercentage: boolean) => {
    const pxInRem = getComputedStyle(document.body).getPropertyValue('font-size');

    const fontSizeRem = getComputedStyle(document.documentElement).getPropertyValue(FONT_SIZE) ?? '0';
    const fontSizePx = parseFloat(fontSizeRem) * parseFloat(pxInRem);
    const textTopOffset = fontSizePx;
    const textBottomOffset = showLabelTitle && (showLabelValue || showLabelPercentage) ? fontSizePx : 0;

    return {
        textTopOffset,
        textBottomOffset,
    };
};
