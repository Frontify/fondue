/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ColorFormat, type RgbaColor } from './types';

export const DEFAULT_COLOR = { red: 255, green: 255, blue: 255, alpha: 1, name: '' };
export const DEFAULT_FORMAT = 'HEX';

export const colorToCss = (color?: RgbaColor) => {
    if (!color) {
        return undefined;
    }
    return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha || 1})`;
};

export const isValidHexColor = (color: string): boolean => {
    const hexRegex = /^([\dA-Fa-f]{3}){1,2}$/;
    return color.length > 2 && hexRegex.test(color);
};

export const hexColorToRgba = (hex: string): RgbaColor => {
    const hexRegex = /^([\dA-Fa-f]{3}){1,2}$/;
    const matches = hex.match(hexRegex);
    if (!matches) {
        return {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 0,
        };
    }
    const hexColor = matches[0];
    if (hexColor.length === 3) {
        return {
            red: parseInt(`${hexColor[0]}${hexColor[0]}`, 16),
            green: parseInt(`${hexColor[1]}${hexColor[1]}`, 16),
            blue: parseInt(`${hexColor[2]}${hexColor[2]}`, 16),
            alpha: 1,
        };
    }
    return {
        red: parseInt(hexColor.slice(0, 2), 16),
        green: parseInt(hexColor.slice(2, 4), 16),
        blue: parseInt(hexColor.slice(4, 6), 16),
        alpha: 1,
    };
};

export const rgbColorToHex = (rgb: Omit<RgbaColor, 'alpha'>): string => {
    const { red, green, blue } = rgb;
    return `${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
};

export const getColorWithName = (color: RgbaColor, currentFormat: ColorFormat) => {
    if (currentFormat === 'HEX') {
        return {
            ...color,
            name: `#${rgbColorToHex(color)}`,
        };
    }
    return {
        ...color,
        name: `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha || 1})`,
    };
};

export const getLimitedColorChannelValue = (value: string, min: number = 0, max: number = 255): number => {
    if (value.length === 0 || parseInt(value) < min) {
        return min;
    } else if (parseInt(value) > max) {
        return max;
    }
    return parseInt(value);
};
