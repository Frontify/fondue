/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GRADIENT_COLORS, HOVER_GRADIENT_COLORS } from '@theme/consts';

export const gradientColorAccessorByIndex = (index: number) => {
    return GRADIENT_COLORS[index % GRADIENT_COLORS.length];
};

export const hoverGradientColorAccessorByIndex = (index: number) => {
    return HOVER_GRADIENT_COLORS[index % HOVER_GRADIENT_COLORS.length];
};
