/* (c) Copyright Frontify Ltd., all rights reserved. */

import { NAMED_COLORS } from './namedColors';

/** What a colour carries in the document: lowercase `#rrggbb`, or `#rrggbbaa` when translucent. Any other CSS colour reads as its hex. */
export type FontColorValue = {
    color: string;
};

/** A colour as the picker holds it: channels run from 0 to 255 and alpha from 0 to 1. */
export type Rgba = { red: number; green: number; blue: number; alpha: number };

type Bytes = [number, number, number, number];
type ColorFunction = 'rgb' | 'hsl';
type ColorArguments = { channels: string[]; alpha: string | undefined; syntax: 'comma' | 'space' };

const MAX_CHANNEL = 255;
const FULL_TURN = 360;
const WHITESPACE = /\s+/;
const DEGREES_SUFFIX = /deg$/;
const PRINTABLE_ASCII = /^[\t\n\f\r -~]*$/;

const HEX_COLOR = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/;
const COLOR_FUNCTION = /^(rgb|hsl)a?\(([^()]*)\)$/;
const NUMBER = /^[+-]?(\d+(\.\d+)?|\.\d+)(e[+-]?\d+)?%?$/;

const clamp = (value: number, max: number): number => Math.min(Math.max(value, 0), max);

/** A plain number, or a percentage of `full`; `undefined` for anything else, `none` and units included. */
const readNumber = (part: string | undefined, full: number): number | undefined => {
    if (part === undefined || !NUMBER.test(part)) {
        return undefined;
    }
    // Hundreds of digits read as Infinity, which no channel or hue can be.
    const value = Number.parseFloat(part);
    if (!Number.isFinite(value)) {
        return undefined;
    }
    if (part.endsWith('%')) {
        return (value / 100) * full;
    }
    return value;
};

/** CSS Color 4's `hsl()` in sRGB: hue in degrees, saturation and lightness from 0 to 1. */
const hslToRgb = (hue: number, saturation: number, lightness: number): [number, number, number] => {
    const channel = (offset: number): number => {
        const step = (offset + hue / 30) % 12;
        const chroma = saturation * Math.min(lightness, 1 - lightness);
        return (lightness - chroma * Math.max(-1, Math.min(step - 3, 9 - step, 1))) * MAX_CHANNEL;
    };
    return [channel(0), channel(8), channel(4)];
};

/**
 * The three channels and the optional alpha of a colour function, in one of
 * CSS Color 4's two forms: `1, 2, 3, 0.5` or `1 2 3 / 0.5`, never a mix.
 */
const splitArguments = (args: string): ColorArguments | undefined => {
    const value = args.trim();
    if (value.includes(',')) {
        const parts = value.split(',').map((part) => part.trim());
        if (value.includes('/') || (parts.length !== 3 && parts.length !== 4)) {
            return undefined;
        }
        return { channels: parts.slice(0, 3), alpha: parts[3], syntax: 'comma' };
    }
    const [channels = '', alpha, ...rest] = value.split('/');
    const parts = channels.trim().split(WHITESPACE);
    if (rest.length > 0 || parts.length !== 3) {
        return undefined;
    }
    return { channels: parts, alpha: alpha?.trim(), syntax: 'space' };
};

const readRgb = (parts: string[], syntax: ColorArguments['syntax'], alpha: number): Rgba | undefined => {
    // The comma form takes three numbers or three percentages, not a mix.
    if (syntax === 'comma' && new Set(parts.map((part) => part.endsWith('%'))).size > 1) {
        return undefined;
    }
    const [red, green, blue] = parts.map((part) => readNumber(part, MAX_CHANNEL));
    if (red === undefined || green === undefined || blue === undefined) {
        return undefined;
    }
    return {
        red: clamp(red, MAX_CHANNEL),
        green: clamp(green, MAX_CHANNEL),
        blue: clamp(blue, MAX_CHANNEL),
        alpha: clamp(alpha, 1),
    };
};

const readHsl = (parts: string[], syntax: ColorArguments['syntax'], alpha: number): Rgba | undefined => {
    // A hue is a number or degrees, never a percentage.
    const huePart = parts[0]?.replace(DEGREES_SUFFIX, '');
    let hue: number | undefined;
    if (!huePart?.endsWith('%')) {
        hue = readNumber(huePart, FULL_TURN);
    }
    // Saturation and lightness are percentages; only the space form may drop the sign.
    if (syntax === 'comma' && !parts.slice(1).every((part) => part.endsWith('%'))) {
        return undefined;
    }
    const [saturation, lightness] = parts.slice(1).map((part) => readNumber(part, 100));
    if (hue === undefined || saturation === undefined || lightness === undefined) {
        return undefined;
    }
    const [red, green, blue] = hslToRgb(
        ((hue % FULL_TURN) + FULL_TURN) % FULL_TURN,
        clamp(saturation, 100) / 100,
        clamp(lightness, 100) / 100,
    );
    return { red, green, blue, alpha: clamp(alpha, 1) };
};

/** One `rgb()`/`rgba()`/`hsl()`/`hsla()`, with an optional alpha. */
const readColorFunction = (kind: ColorFunction, args: string): Rgba | undefined => {
    const split = splitArguments(args);
    if (split === undefined) {
        return undefined;
    }
    const { channels: parts, syntax } = split;
    let alpha: number | undefined = 1;
    if (split.alpha !== undefined) {
        alpha = readNumber(split.alpha, 1);
    }
    if (alpha === undefined) {
        return undefined;
    }
    switch (kind) {
        case 'rgb': {
            return readRgb(parts, syntax, alpha);
        }
        case 'hsl': {
            return readHsl(parts, syntax, alpha);
        }
    }
};

/** Reads 6 or 8 lowercase hex digits as red, green, blue and alpha bytes; alpha is full with 6. */
const readHexDigits = (digits: string): Bytes => {
    const byte = (index: number): number => Number.parseInt(digits.slice(index * 2, index * 2 + 2), 16);
    let alpha = MAX_CHANNEL;
    if (digits.length === 8) {
        alpha = byte(3);
    }
    return [byte(0), byte(1), byte(2), alpha];
};

/** Writes `#rrggbb`, with the alpha pair only while it is not full. */
const toHex = (bytes: Bytes): string => {
    const [red, green, blue, alpha] = bytes;
    const pairs = [red, green, blue];
    if (alpha !== MAX_CHANNEL) {
        pairs.push(alpha);
    }
    return `#${pairs.map((byte) => byte.toString(16).padStart(2, '0')).join('')}`;
};

/**
 * A CSS colour as the document stores it: a named colour, hex in three to
 * eight digits, or one `rgb()`/`rgba()`/`hsl()`/`hsla()` of plain numbers.
 * Anything else, system colours and `inherit` included, is no colour. The
 * input may be any value, since another tool may have written the stored
 * value, so any colour read here counts, such as the legacy editor's `rgba()`,
 * and nothing else reaches a `style`.
 */
export const toStoredColor = (css: unknown): string | undefined => {
    if (typeof css !== 'string') {
        return undefined;
    }
    // Only ASCII: `\s` and `toLowerCase` would otherwise let other Unicode through, such as a Kelvin sign lowercasing to `k`.
    if (!PRINTABLE_ASCII.test(css)) {
        return undefined;
    }
    const value = css.trim().toLowerCase();
    const named = NAMED_COLORS.get(value);
    if (named !== undefined) {
        return named;
    }

    const hex = HEX_COLOR.exec(value)?.[1];
    if (hex !== undefined) {
        // `#abc` is `#aabbcc`.
        let digits = hex;
        if (hex.length <= 4) {
            digits = [...hex].map((digit) => digit + digit).join('');
        }
        return toHex(readHexDigits(digits));
    }

    const [, kind, args] = COLOR_FUNCTION.exec(value) ?? [];
    if (kind === undefined || args === undefined) {
        return undefined;
    }
    // COLOR_FUNCTION only captures rgb or hsl.
    const color = readColorFunction(kind as ColorFunction, args);
    if (color === undefined) {
        return undefined;
    }
    return toCssColor(color);
};

/** A stored colour's channels, alpha to two decimals, so an alpha the picker wrote reads back unchanged. */
export const decodeStoredColor = (stored: string): Rgba => {
    const [red, green, blue, alphaByte] = readHexDigits(stored.slice(1));
    return { red, green, blue, alpha: Math.round((alphaByte / MAX_CHANNEL) * 100) / 100 };
};

/** The picker's colour as the document stores it. */
export const toCssColor = ({ red, green, blue, alpha }: Rgba): string => {
    const bytes: Bytes = [
        Math.round(clamp(red, MAX_CHANNEL)),
        Math.round(clamp(green, MAX_CHANNEL)),
        Math.round(clamp(blue, MAX_CHANNEL)),
        Math.round(clamp(alpha * MAX_CHANNEL, MAX_CHANNEL)),
    ];
    return toHex(bytes);
};

/** Hex while opaque, `rgba()` otherwise: hex alpha is not understood everywhere exported HTML ends up. */
export const toExportedColor = (stored: string): string => {
    const [red, green, blue, byte] = readHexDigits(stored.slice(1));
    if (byte === MAX_CHANNEL) {
        return stored;
    }
    // The shortest alpha that pastes back as the same byte.
    let alpha = Math.round((byte / MAX_CHANNEL) * 100) / 100;
    if (Math.round(alpha * MAX_CHANNEL) !== byte) {
        alpha = Math.round((byte / MAX_CHANNEL) * 1000) / 1000;
    }
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};
