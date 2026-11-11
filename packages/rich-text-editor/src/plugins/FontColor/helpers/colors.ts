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
const HUE_UNIT = /(deg|grad|rad|turn)$/;
const NONE = 'none';
/** CSS Color 4 hue units, in degrees per unit. */
const HUE_UNIT_DEGREES: Record<'deg' | 'grad' | 'rad' | 'turn', number> = {
    deg: 1,
    grad: 0.9,
    rad: 180 / Math.PI,
    turn: FULL_TURN,
};
const PRINTABLE_ASCII = /^[\t\n\f\r -~]*$/;
const PERCENT = 100;

/** What the picker's hex field takes: three or six digits; anything else is its error state, not a colour. */
const HEX_FIELD_DIGITS = /^([\dA-Fa-f]{3}){1,2}$/;

/** A leading `#` on typed hex. */
const LEADING_HASH = /^#/;

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
        return (value / PERCENT) * full;
    }
    return value;
};

/** `readNumber`, where the space syntax also takes `none` as 0. */
const readComponent = (
    part: string | undefined,
    full: number,
    syntax: ColorArguments['syntax'],
): number | undefined => {
    if (syntax === 'space' && part === NONE) {
        return 0;
    }
    return readNumber(part, full);
};

/** A hue in degrees: a plain number or one followed by a CSS hue unit, never a percentage. */
const readHue = (part: string | undefined, syntax: ColorArguments['syntax']): number | undefined => {
    if (part === undefined) {
        return undefined;
    }
    const unit = HUE_UNIT.exec(part)?.[1];
    let number = part;
    let degrees = 1;
    if (unit !== undefined) {
        number = part.slice(0, -unit.length);
        // `none` stands alone: with a unit it is no hue.
        if (number === NONE) {
            return undefined;
        }
        // HUE_UNIT only captures the units HUE_UNIT_DEGREES lists.
        degrees = HUE_UNIT_DEGREES[unit as keyof typeof HUE_UNIT_DEGREES];
    }
    if (number.endsWith('%')) {
        return undefined;
    }
    const value = readComponent(number, FULL_TURN, syntax);
    if (value === undefined) {
        return undefined;
    }
    return value * degrees;
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
    const [red, green, blue] = parts.map((part) => readComponent(part, MAX_CHANNEL, syntax));
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
    const hue = readHue(parts[0], syntax);
    // Saturation and lightness are percentages; only the space form may drop the sign.
    if (syntax === 'comma' && !parts.slice(1).every((part) => part.endsWith('%'))) {
        return undefined;
    }
    const [saturation, lightness] = parts.slice(1).map((part) => readComponent(part, PERCENT, syntax));
    if (hue === undefined || saturation === undefined || lightness === undefined) {
        return undefined;
    }
    const [red, green, blue] = hslToRgb(
        ((hue % FULL_TURN) + FULL_TURN) % FULL_TURN,
        clamp(saturation, PERCENT) / PERCENT,
        clamp(lightness, PERCENT) / PERCENT,
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
        alpha = readComponent(split.alpha, 1, syntax);
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
 *
 * @example
 * ```ts
 * toStoredColor('hsl(0, 50%, 50%)'); // '#bf4040'
 * ```
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
    return encodeStoredColor(color);
};

/**
 * A stored colour's channels, with alpha exactly `byte / 255`, so re-encoding gives back the same byte.
 *
 * @param stored - a lowercase `#rrggbb` or `#rrggbbaa` from `toStoredColor`
 *
 * @example
 * ```ts
 * decodeStoredColor('#ff0000'); // { red: 255, green: 0, blue: 0, alpha: 1 }
 * ```
 */
export const decodeStoredColor = (stored: string): Rgba => {
    const [red, green, blue, alphaByte] = readHexDigits(stored.slice(1));
    return { red, green, blue, alpha: alphaByte / MAX_CHANNEL };
};

/**
 * The picker's colour as the document stores it.
 *
 * @example
 * ```ts
 * encodeStoredColor({ red: 255, green: 0, blue: 0, alpha: 0.5 }); // '#ff000080'
 * ```
 */
export const encodeStoredColor = ({ red, green, blue, alpha }: Rgba): string => {
    const bytes: Bytes = [
        Math.round(clamp(red, MAX_CHANNEL)),
        Math.round(clamp(green, MAX_CHANNEL)),
        Math.round(clamp(blue, MAX_CHANNEL)),
        Math.round(clamp(alpha * MAX_CHANNEL, MAX_CHANNEL)),
    ];
    return toHex(bytes);
};

/**
 * A colour named as upper-case hex, then the opacity while translucent, as the picker's fields read.
 *
 * @example
 * ```ts
 * toColorName({ red: 255, green: 0, blue: 0, alpha: 0.5 }); // '#FF0000 50%'
 * ```
 */
export const toColorName = (color: Rgba): string => {
    let name = encodeStoredColor({ ...color, alpha: 1 }).toUpperCase();
    if (color.alpha < 1) {
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
    return { ...decodeStoredColor(stored), alpha: alpha ?? 1 };
};

/**
 * Hex while opaque, `rgba()` otherwise: hex alpha is not understood everywhere exported HTML ends up.
 *
 * @param stored - a lowercase `#rrggbb` or `#rrggbbaa` from `toStoredColor`
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
    // The shortest alpha that pastes back as the same byte.
    let alpha = Math.round((byte / MAX_CHANNEL) * 100) / 100;
    if (Math.round(alpha * MAX_CHANNEL) !== byte) {
        alpha = Math.round((byte / MAX_CHANNEL) * 1000) / 1000;
    }
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};
