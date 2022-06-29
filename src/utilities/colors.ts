/* (c) Copyright Frontify Ltd., all rights reserved. */

import tinycolor from 'tinycolor2';
import { Color, ColorFormat } from '../types/colors';

export const getColorDisplayValue = (color: Color, format: ColorFormat, showAlpha = true): string => {
    const parsedColor = tinycolor(color);

    switch (format) {
        case ColorFormat.Rgba:
            return parsedColor.toRgbString();
        case ColorFormat.Hex:
            const hex = parsedColor.toHexString();
            return showAlpha && color.a && color.a < 1 ? `${hex} ${Math.trunc(parsedColor.getAlpha() * 100)}%` : hex;
        default:
            return parsedColor.toHexString();
    }
};

export const isColorLight = (color: Color): boolean => {
    const parsedColor = tinycolor(color);
    return parsedColor.isLight() || parsedColor.getAlpha() < 0.25;
};
