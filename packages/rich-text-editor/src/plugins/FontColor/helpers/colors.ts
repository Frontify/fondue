/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    decodeStoredColor,
    encodeStoredColor,
    MAX_CHANNEL,
    OPAQUE_ALPHA,
    readHexDigits,
    type Rgba,
    toShortestAlpha,
    toStoredColor,
} from '#/core';

/** What a colour carries in the document: lowercase `#rrggbb`, or `#rrggbbaa` when translucent. */
export type FontColorValue = {
    color: string;
};

const PERCENT = 100;

/** What the picker's hex field takes: three or six digits; anything else is its error state, not a colour. */
const HEX_FIELD_DIGITS = /^([\dA-Fa-f]{3}){1,2}$/;

/** A leading `#` on typed hex. */
const LEADING_HASH = /^#/;

const COMPLETE_HEX = /^#?[\dA-Fa-f]{6}$/;

/**
 * Whether the hex field holds all six digits, with or without a leading `#`, so the picker can preview at once.
 *
 * @example
 * ```ts
 * isCompleteHex('#C5221F'); // true
 * isCompleteHex('f00'); // false
 * ```
 */
export const isCompleteHex = (text: string): boolean => COMPLETE_HEX.test(text);

/**
 * A colour named as upper-case hex, then the opacity while translucent, as the picker's fields read.
 *
 * @example
 * ```ts
 * toColorName({ red: 255, green: 0, blue: 0, alpha: 0.5 }); // '#FF0000 50%'
 * ```
 */
export const toColorName = (color: Rgba): string => {
    let name = encodeStoredColor({ ...color, alpha: OPAQUE_ALPHA }).toUpperCase();
    if (color.alpha < OPAQUE_ALPHA) {
        name += ` ${Math.round(color.alpha * PERCENT)}%`;
    }
    return name;
};

/**
 * The colour typed in the picker's hex field, or `undefined` while it is no colour.
 *
 * @param alpha - the opacity to give the colour, full when `undefined`
 *
 * @example
 * ```ts
 * parseTypedHex('#f00', 0.5); // { red: 255, green: 0, blue: 0, alpha: 0.5 }
 * ```
 */
export const parseTypedHex = (text: string | undefined, alpha: number | undefined): Rgba | undefined => {
    if (text === undefined) {
        return undefined;
    }
    const digits = text.replace(LEADING_HASH, '');
    if (!HEX_FIELD_DIGITS.test(digits)) {
        return undefined;
    }
    const stored = toStoredColor(`#${digits}`);
    if (stored === undefined) {
        return undefined;
    }
    return { ...decodeStoredColor(stored), alpha: alpha ?? OPAQUE_ALPHA };
};

/**
 * Hex while opaque, `rgba()` otherwise: hex alpha is not understood everywhere exported HTML ends up.
 *
 * @param stored - a lowercase `#rrggbb` or `#rrggbbaa`
 *
 * @example
 * ```ts
 * toExportedColor('#ff000080'); // 'rgba(255, 0, 0, 0.5)'
 * ```
 */
export const toExportedColor = (stored: string): string => {
    const [red, green, blue, byte] = readHexDigits(stored.slice(1));
    if (byte === MAX_CHANNEL) {
        return stored;
    }
    return `rgba(${red}, ${green}, ${blue}, ${toShortestAlpha(byte)})`;
};
