/* (c) Copyright Frontify Ltd., all rights reserved. */

// Small enough for the renderer to load: the CSS parser that produces these colours lives in cssColor.ts.

/** A colour as a document stores it: lowercase `#rrggbb`, or `#rrggbbaa` when translucent. */
const STORED_COLOR = /^#([\da-f]{6}|[\da-f]{8})$/;

/**
 * Whether a value is a colour in the stored form, so it may go into a `style` as it is.
 *
 * @example
 * ```ts
 * isStoredColor('#ff0000'); // true
 * isStoredColor('red'); // false
 * ```
 */
export const isStoredColor = (value: unknown): value is string => typeof value === 'string' && STORED_COLOR.test(value);

/** A colour decoded from or encoded to the stored form: channels run from 0 to 255 and alpha from 0 to 1. */
export type Rgba = { red: number; green: number; blue: number; alpha: number };

/** Red, green, blue and alpha, each a byte. */
export type RgbaBytes = [number, number, number, number];

/** Full opacity, which the stored form leaves out. */
export const OPAQUE_ALPHA = 1;

/** The largest channel value, and the alpha byte of full opacity. */
export const MAX_CHANNEL = 255;

const SHORT_ALPHA_SCALE = 100;
const LONG_ALPHA_SCALE = 1000;

export const clamp = (value: number, max: number): number => Math.min(Math.max(value, 0), max);

/** The shortest alpha, in two decimals or else three, that encodes back to the same byte. */
export const toShortestAlpha = (byte: number): number => {
    const short = Math.round((byte / MAX_CHANNEL) * SHORT_ALPHA_SCALE) / SHORT_ALPHA_SCALE;
    if (Math.round(short * MAX_CHANNEL) === byte) {
        return short;
    }
    return Math.round((byte / MAX_CHANNEL) * LONG_ALPHA_SCALE) / LONG_ALPHA_SCALE;
};

/** Reads 6 or 8 lowercase hex digits as red, green, blue and alpha bytes; alpha is full with 6. */
export const readHexDigits = (digits: string): RgbaBytes => {
    const byte = (index: number): number => Number.parseInt(digits.slice(index * 2, index * 2 + 2), 16);
    let alpha = MAX_CHANNEL;
    if (digits.length === 8) {
        alpha = byte(3);
    }
    return [byte(0), byte(1), byte(2), alpha];
};

/** Writes `#rrggbb`, with the alpha pair only while it is not full. */
export const toHex = (bytes: RgbaBytes): string => {
    const [red, green, blue, alpha] = bytes;
    const pairs = [red, green, blue];
    if (alpha !== MAX_CHANNEL) {
        pairs.push(alpha);
    }
    return `#${pairs.map((byte) => byte.toString(16).padStart(2, '0')).join('')}`;
};

/**
 * A stored colour's channels, with the shortest alpha that encodes back to the same byte, so a whole percent the picker wrote reads back unchanged.
 *
 * @param stored - a lowercase `#rrggbb` or `#rrggbbaa`
 *
 * @example
 * ```ts
 * decodeStoredColor('#ff0000'); // { red: 255, green: 0, blue: 0, alpha: 1 }
 * ```
 */
export const decodeStoredColor = (stored: string): Rgba => {
    const [red, green, blue, alphaByte] = readHexDigits(stored.slice(1));
    return { red, green, blue, alpha: toShortestAlpha(alphaByte) };
};

/**
 * A colour as the document stores it.
 *
 * @example
 * ```ts
 * encodeStoredColor({ red: 255, green: 0, blue: 0, alpha: 0.5 }); // '#ff000080'
 * ```
 */
export const encodeStoredColor = ({ red, green, blue, alpha }: Rgba): string => {
    const bytes: RgbaBytes = [
        Math.round(clamp(red, MAX_CHANNEL)),
        Math.round(clamp(green, MAX_CHANNEL)),
        Math.round(clamp(blue, MAX_CHANNEL)),
        Math.round(clamp(alpha * MAX_CHANNEL, MAX_CHANNEL)),
    ];
    return toHex(bytes);
};
