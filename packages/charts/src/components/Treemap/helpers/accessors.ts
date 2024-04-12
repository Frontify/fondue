/* (c) Copyright Frontify Ltd., all rights reserved. */

import { colorAccessorByIndex, fillColorWeakAccessorByIndex } from '@components/common/helpers/accessors';

export const weakColorAccessor = (color?: string) => {
    if (color) {
        if (color === 'PRIMARY') {
            return fillColorWeakAccessorByIndex(0);
        }
        if (color === 'SECONDARY') {
            return fillColorWeakAccessorByIndex(1);
        }
        if (color === 'TERTIARY') {
            return fillColorWeakAccessorByIndex(2);
        }
        return color;
    }

    return 'transparent';
};

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
