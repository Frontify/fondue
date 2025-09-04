/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ColorFormat, type RgbaColor } from './types';

export const DEFAULT_COLOR = { red: 255, green: 255, blue: 255, alpha: 1, name: '' };
export const DEFAULT_FORMAT = 'HEX';

/**
 * Converts a color object to a CSS color string.
 * @param {RgbaColor} color - The color object to be converted.
 * @returns {string}
 * @example
 * colorToCss({ red: 255, green: 255, blue: 255, alpha: 1 }); // 'rgba(255, 255, 255, 1)'
 * @example
 * colorToCss({ red: 255, green: 87, blue: 51, alpha: 1 }); // 'rgba(255, 87, 51, 1)'
 * @example
 * colorToCss({ red: 0, green: 0, blue: 0, alpha: 0 }); // 'rgba(0, 0, 0, 0)'
 */
export const colorToCss = (color?: RgbaColor) => {
    if (!color) {
        return undefined;
    }
    return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha ?? 1})`;
};

/**
 * Checks if a string is a valid hexadecimal color code. This function accepts
 * both three-digit and six-digit hex codes without the '#' symbol.
 * @param {string} color - The color code to be checked.
 * @returns {boolean}
 * @example
 * isValidHexColor('FFF'); // true
 * @example
 * isValidHexColor('FF5733'); // true
 * @example
 * isValidHexColor('XYZ'); // false
 */
export const isValidHexColor = (color: string): boolean => {
    const hexRegex = /^([\dA-Fa-f]{3}){1,2}$/;
    return color.length > 2 && hexRegex.test(color);
};

/**
 * Converts a hexadecimal color code to an RGBA color object. This function accepts
 * both three-digit and six-digit hex codes without the '#' symbol.
 * @param {string} hex - The hex code, either 3 or 6 characters long. Characters should be from the set [0-9A-Fa-f].
 * @returns {RgbaColor}
 * @example
 * hexColorToRgba('FFF'); // { red: 255, green: 255, blue: 255, alpha: 1 }
 * @example
 * hexColorToRgba('FF5733'); // { red: 255, green: 87, blue: 51, alpha: 1 }
 * @example
 * hexColorToRgba('XYZ'); // { red: 0, green: 0, blue: 0, alpha: 0 }
 */
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

/**
 * Converts an RGBA color object to a hexadecimal color code. This function returns a
 * six-digit hex code without the '#' symbol.
 * @param {RgbaColor} rgb - The RGBA color object.
 * @returns {string}
 * @example
 * rgbColorToHex({ red: 255, green: 255, blue: 255, alpha: 1 }); // '#FFFFFF'
 * @example
 * rgbColorToHex({ red: 255, green: 87, blue: 51, alpha: 1 }); // '#FF5733'
 * @example
 * rgbColorToHex({ red: 0, green: 0, blue: 0, alpha: 0 }); // '#000000'
 */
export const rgbColorToHex = (rgb: Omit<RgbaColor, 'alpha'>): string => {
    const { red, green, blue } = rgb;
    return `${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
};

/**
 * Returns a hex color display name with alpha percentage if alpha < 100%.
 * @param {RgbaColor} color - The RGBA color object.
 * @returns {string}
 * @example
 * getHexDisplayName({ red: 255, green: 255, blue: 255, alpha: 1 }); // '#FFFFFF'
 * @example
 * getHexDisplayName({ red: 255, green: 255, blue: 255, alpha: 0.9 }); // '#FFFFFF 90%'
 * @example
 * getHexDisplayName({ red: 255, green: 87, blue: 51, alpha: 0.84 }); // '#FF5733 84%'
 */
export const getHexDisplayName = (color: RgbaColor): string => {
    const hexValue = rgbColorToHex(color);
    const alpha = color.alpha ?? 1;

    if (alpha < 1) {
        const alphaPercentage = Math.round(alpha * 100);
        return `#${hexValue} ${alphaPercentage}%`;
    }

    return `#${hexValue}`;
};

/**
 * Returns a color object with a name property based on the provided color and format.
 * @param {RgbaColor} color - The RGBA color object.
 * @param {ColorFormat} currentFormat - The current format of the color.
 * @returns {RgbaColor}
 * @example
 * getColorWithName({ red: 255, green: 255, blue: 255, alpha: 1 }, 'HEX'); // { red: 255, green: 255, blue: 255, alpha: 1, name: '#FFFFFF' }
 * @example
 * getColorWithName({ red: 255, green: 255, blue: 255, alpha: 0.9 }, 'HEX'); // { red: 255, green: 255, blue: 255, alpha: 0.9, name: '#FFFFFF 90%' }
 * @example
 * getColorWithName({ red: 255, green: 255, blue: 255, alpha: 1 }, 'RGBA'); // { red: 255, green: 255, blue: 255, alpha: 1, name: 'rgba(255, 255, 255, 1)' }
 * @example
 * getColorWithName({ red: 255, green: 87, blue: 51, alpha: 1 }, 'RGBA'); // { red: 255, green: 87, blue: 51, alpha: 1, name: 'rgba(255, 87, 51, 1)' }
 */
export const getColorWithName = (color: RgbaColor, currentFormat: ColorFormat) => {
    if (currentFormat === 'HEX') {
        return {
            ...color,
            name: getHexDisplayName(color),
        };
    }
    return {
        ...color,
        name: `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha ?? 1})`,
    };
};

/**
 * Returns a number between a minimum and maximum value, inclusive.
 * @param {string} value - The value to be limited.
 * @param {number} [min=0] - The minimum value (inclusive).
 * @param {number} [max=255] - The maximum value (inclusive).
 * @returns {number}
 * @example
 * getLimitedColorChannelValue('255'); // 255
 * @example
 * getLimitedColorChannelValue('100'); // 100
 * @example
 * getLimitedColorChannelValue('0'); // 0
 * @example
 * getLimitedColorChannelValue('500'); // 255
 * @example
 * getLimitedColorChannelValue('500', 0, 100); // 100
 */
export const getLimitedColorChannelValue = (value: string, min: number = 0, max: number = 255): number => {
    if (value.length === 0 || parseInt(value) < min) {
        return min;
    } else if (parseInt(value) > max) {
        return max;
    }
    return parseInt(value);
};
