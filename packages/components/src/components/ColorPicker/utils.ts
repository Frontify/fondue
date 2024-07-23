/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Color } from './types';

export const colorToCss = (color?: Color) => {
    if (!color) {
        return 'rgba(0, 0, 0, 1)';
    }
    return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha || 1})`;
};

export const isColorLight = (color: Color): boolean => {
    // copied brightness calculation from tiny color
    const brightness = (color.red * 299 + color.green * 587 + color.blue * 114) / 1000;

    return brightness > 128 || (color.alpha && color.alpha < 0.25) || false;
};

export const areColorsEqual = (color1?: Color, color2?: Color): boolean => {
    if (!color1 || !color2) {
        return false;
    }
    return (
        color1.red === color2.red &&
        color1.green === color2.green &&
        color1.blue === color2.blue &&
        color1.alpha === color2.alpha
    );
};
