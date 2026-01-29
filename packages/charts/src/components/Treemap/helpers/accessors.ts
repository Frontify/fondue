/* (c) Copyright Frontify Ltd., all rights reserved. */

import { colorAccessorByIndex, hoverColorAccessorByIndex } from '@components/common/helpers/accessors';

export const colorAccessor = (color?: string) => {
    if (color) {
        if (color === 'PRIMARY') {
            return colorAccessorByIndex(0);
        }
        if (color === 'SECONDARY') {
            return colorAccessorByIndex(1);
        }
        if (color === 'TERTIARY') {
            return colorAccessorByIndex(2);
        }
        return color;
    }

    return 'transparent';
};

export const hoverColorAccessor = (color?: string) => {
    if (color) {
        if (color === 'PRIMARY') {
            return hoverColorAccessorByIndex(0);
        }
        if (color === 'SECONDARY') {
            return hoverColorAccessorByIndex(1);
        }
        if (color === 'TERTIARY') {
            return hoverColorAccessorByIndex(2);
        }
        return color;
    }

    return 'transparent';
};
