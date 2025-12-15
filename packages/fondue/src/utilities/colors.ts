/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TinyColor } from '@ctrl/tinycolor';

import { type Color, ColorFormat, type ColorRgb } from '../types/colors';

/**
 * @deprecated This function is deprecated and will be removed in the next major version.
 */
export const getColorDisplayValue = (color: Color, format: ColorFormat, showAlpha = true): string => {
    const parsedColor = new TinyColor(toShortRgb(color));

    switch (format) {
        case ColorFormat.Rgba: {
            return parsedColor.toRgbString();
        }
        case ColorFormat.Hex: {
            const hex = parsedColor.toHexString();
            return showAlpha && color.alpha && color.alpha < 1
                ? `${hex} ${Math.trunc(parsedColor.getAlpha() * 100)}%`
                : hex;
        }
        default: {
            return parsedColor.toHexString();
        }
    }
};

const toShortRgb = (color: Color): ColorRgb => {
    const { red, green, blue, alpha } = color;
    return { r: red, g: green, b: blue, a: alpha };
};
