/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Color } from './types';

export const colorToCss = (color?: Color) => {
    if (!color) {
        return undefined;
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
