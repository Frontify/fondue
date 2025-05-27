/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RgbaColor } from './types';

export const DEFAULT_COLOR = { red: 255, green: 255, blue: 255, alpha: 1, name: '' };

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
