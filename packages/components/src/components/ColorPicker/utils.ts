/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RgbaColor } from './types';

export const DEFAULT_COLOR = { red: 255, green: 255, blue: 255, alpha: 1 };

export const colorToCss = (color?: RgbaColor) => {
    if (!color) {
        return undefined;
    }
    return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha || 1})`;
};

export const isColorLight = (color: RgbaColor): boolean => {
    // copied brightness calculation from tiny color
    const brightness = (color.red * 299 + color.green * 587 + color.blue * 114) / 1000;

    return brightness > 128 || (color.alpha && color.alpha < 0.25) || false;
};

export const areColorsEqual = (color1?: RgbaColor, color2?: RgbaColor): boolean => {
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

export const isValidHexColor = (color: string): boolean => {
    const hexRegex = /^([\dA-Fa-f]{3}){1,2}$/;
    return color.length > 2 && hexRegex.test(color);
};

type RgbColor = {
    red: number;
    green: number;
    blue: number;
};

export const hexColorToRgb = (hex: string): RgbColor => {
    const hexRegex = /^([\dA-Fa-f]{3}){1,2}$/;
    const matches = hex.match(hexRegex);
    if (!matches) {
        return {
            red: 0,
            green: 0,
            blue: 0,
        };
    }
    const hexColor = matches[0];
    if (hexColor.length === 3) {
        return {
            red: parseInt(`${hexColor[0]}${hexColor[0]}`, 16),
            green: parseInt(`${hexColor[1]}${hexColor[1]}`, 16),
            blue: parseInt(`${hexColor[2]}${hexColor[2]}`, 16),
        };
    }
    return {
        red: parseInt(hexColor.slice(0, 2), 16),
        green: parseInt(hexColor.slice(2, 4), 16),
        blue: parseInt(hexColor.slice(4, 6), 16),
    };
};

export const rgbColorToHex = (rgb: RgbColor): string => {
    const { red, green, blue } = rgb;
    return `${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
};
