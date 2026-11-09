/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ColorPicker } from '@frontify/fondue-components';
import { type ComponentProps } from 'react';

import { NAMED_COLORS } from './namedColors';

/** What a colour carries in the document: lowercase `#rrggbb`, or `#rrggbbaa` when translucent. Any other CSS colour reads as its hex. */
export type FontColorValue = {
    color: string;
};

/** The picker's colour type, derived from the component because Fondue does not export it. */
export type RgbaColor = NonNullable<ComponentProps<typeof ColorPicker.Root>['currentColor']>;

const HEX_COLOR = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/;
const COLOR_FUNCTION = /^(rgba?|hsla?)\(([^()]*)\)$/;
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
        return (lightness - chroma * Math.max(-1, Math.min(step - 3, 9 - step, 1))) * 255;
    };
    return [channel(0), channel(8), channel(4)];
};

/**
 * The three channels and the optional alpha of a colour function, in one of
 * CSS Color 4's two forms: `1, 2, 3, 0.5` or `1 2 3 / 0.5`, never a mix.
 */
const splitArguments = (
    args: string,
): { channels: string[]; alpha: string | undefined; syntax: 'comma' | 'space' } | undefined => {
    const value = args.trim();
    if (value.includes(',')) {
        const parts = value.split(',').map((part) => part.trim());
        if (value.includes('/') || (parts.length !== 3 && parts.length !== 4)) {
            return undefined;
        }
        return { channels: parts.slice(0, 3), alpha: parts[3], syntax: 'comma' };
    }
    const [channels = '', alpha, ...rest] = value.split('/');
    const parts = channels.trim().split(/\s+/);
    if (rest.length > 0 || parts.length !== 3) {
        return undefined;
    }
    return { channels: parts, alpha: alpha?.trim(), syntax: 'space' };
};

/** One `rgb()`/`rgba()`/`hsl()`/`hsla()`, with an optional alpha. */
const readColorFunction = (name: string, args: string): RgbaColor | undefined => {
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

    if (name.startsWith('rgb')) {
        // The comma form takes three numbers or three percentages, not a mix.
        if (syntax === 'comma' && new Set(parts.map((part) => part.endsWith('%'))).size > 1) {
            return undefined;
        }
        const [red, green, blue] = parts.map((part) => readNumber(part, 255));
        if (red === undefined || green === undefined || blue === undefined) {
            return undefined;
        }
        return { red: clamp(red, 255), green: clamp(green, 255), blue: clamp(blue, 255), alpha: clamp(alpha, 1) };
    }

    // A hue is a number or degrees, never a percentage.
    const huePart = parts[0]?.replace(/deg$/, '');
    let hue: number | undefined;
    if (!huePart?.endsWith('%')) {
        hue = readNumber(huePart, 360);
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
        ((hue % 360) + 360) % 360,
        clamp(saturation, 100) / 100,
        clamp(lightness, 100) / 100,
    );
    return { red, green, blue, alpha: clamp(alpha, 1) };
};

/**
 * A pasted CSS colour as the document stores it: a named colour, hex in three
 * to eight digits, or one `rgb()`/`rgba()`/`hsl()`/`hsla()` of plain numbers.
 * Anything else, system colours and `inherit` included, is no colour.
 */
export const toStoredColor = (css: string): string | undefined => {
    // CSS whitespace is ASCII, and a Kelvin sign must not lowercase into `khaki`; ASCII only keeps `trim` and `\s` to CSS whitespace.
    if (!/^[\t\n\f\r -~]*$/.test(css)) {
        return undefined;
    }
    const value = css.trim().toLowerCase();
    const named = NAMED_COLORS.get(value);
    if (named !== undefined) {
        return named;
    }

    const hex = HEX_COLOR.exec(value)?.[1];
    if (hex !== undefined) {
        // `#abc` is `#aabbcc`, and an opaque alpha is left out.
        let digits = hex;
        if (hex.length <= 4) {
            digits = [...hex].map((digit) => digit + digit).join('');
        }
        if (digits.length === 8 && digits.endsWith('ff')) {
            return `#${digits.slice(0, 6)}`;
        }
        return `#${digits}`;
    }

    const [, name, args] = COLOR_FUNCTION.exec(value) ?? [];
    if (name === undefined || args === undefined) {
        return undefined;
    }
    const color = readColorFunction(name, args);
    if (color === undefined) {
        return undefined;
    }
    return toCssColor(color);
};

/**
 * A stored value as a stored colour, or `undefined` when it is no colour. Any
 * colour `toStoredColor` reads counts, so one another tool wrote, such as the
 * legacy editor's `rgba()`, still shows, and nothing else reaches a `style`.
 */
export const readStoredColor = (value: unknown): string | undefined => {
    if (typeof value !== 'string') {
        return undefined;
    }
    return toStoredColor(value);
};

/** A stored colour's channels, alpha to two decimals, so an alpha the picker wrote reads back unchanged. */
export const decodeStoredColor = (stored: string): RgbaColor => {
    const channel = (index: number): number => Number.parseInt(stored.slice(1 + index * 2, 3 + index * 2), 16);
    let alpha = 1;
    if (stored.length === 9) {
        alpha = Math.round((channel(3) / 255) * 100) / 100;
    }
    return { red: channel(0), green: channel(1), blue: channel(2), alpha };
};

/** Reads any colour that `toStoredColor` reads, as the picker's colour. */
export const parseCssColor = (css: string | undefined): RgbaColor | undefined => {
    if (css === undefined) {
        return undefined;
    }
    const stored = toStoredColor(css);
    if (stored === undefined) {
        return undefined;
    }
    return decodeStoredColor(stored);
};

/** The picker's colour as the document stores it. */
export const toCssColor = ({ red, green, blue, alpha = 1 }: RgbaColor): string => {
    const channels = [red, green, blue].map((channel) => Math.round(clamp(channel, 255)));
    const opacity = Math.round(clamp(alpha, 1) * 255);
    if (opacity < 255) {
        channels.push(opacity);
    }
    return `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
};

/** Hex while opaque, `rgba()` otherwise: hex alpha is not understood everywhere exported HTML ends up. */
export const toExportedColor = (stored: string): string => {
    if (stored.length === 7) {
        return stored;
    }
    const { red, green, blue } = decodeStoredColor(stored);
    const byte = Number.parseInt(stored.slice(7, 9), 16);
    // The shortest alpha that pastes back as the same byte.
    let alpha = Math.round((byte / 255) * 100) / 100;
    if (Math.round(alpha * 255) !== byte) {
        alpha = Math.round((byte / 255) * 1000) / 1000;
    }
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};
