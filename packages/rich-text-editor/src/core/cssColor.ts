/* (c) Copyright Frontify Ltd., all rights reserved. */

// Plain CSS, no feature: the one way the editor reads a CSS colour. The renderer never loads it.

import { clamp, encodeStoredColor, MAX_CHANNEL, OPAQUE_ALPHA, readHexDigits, type Rgba, toHex } from './storedColor';

type ColorSyntax = 'comma' | 'space';
type ColorArguments = { channels: string[]; alpha: string | undefined; syntax: ColorSyntax };

const COLOR_FUNCTIONS = ['rgb', 'hsl'] as const;
type ColorFunction = (typeof COLOR_FUNCTIONS)[number];

const FULL_TURN = 360;
const WHITESPACE = /\s+/;
const NONE = 'none';
/** CSS Color 4 hue units, in degrees per unit. */
const HUE_UNIT_DEGREES = {
    deg: 1,
    grad: 0.9,
    rad: 180 / Math.PI,
    turn: FULL_TURN,
};
type HueUnit = keyof typeof HUE_UNIT_DEGREES;
const isHueUnit = (unit: string): unit is HueUnit => unit in HUE_UNIT_DEGREES;
// Leftmost matching makes `grad` win over `rad`.
const HUE_UNIT = /* @__PURE__ */ new RegExp(`(${Object.keys(HUE_UNIT_DEGREES).join('|')})$`);
const PRINTABLE_ASCII = /^[\t\n\f\r -~]*$/;
const PERCENT = 100;

const HEX_COLOR = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/;
const COLOR_FUNCTION = /* @__PURE__ */ new RegExp(String.raw`^(${COLOR_FUNCTIONS.join('|')})a?\(([^()]*)\)$`);
// The cast widens the literal tuple so `includes` accepts any string.
const isColorFunction = (kind: string): kind is ColorFunction => (COLOR_FUNCTIONS as readonly string[]).includes(kind);
const NUMBER = /^[+-]?(\d+(\.\d+)?|\.\d+)(e[+-]?\d+)?%?$/;

/**
 * The CSS Color Module Level 4 named colours as hex, so a pasted name is stored
 * as the hex value it stands for. A map, so `constructor` never reads as a colour.
 */
export const NAMED_COLORS: ReadonlyMap<string, string> = /* @__PURE__ */ new Map(
    Object.entries({
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32',
        transparent: '#00000000',
    }),
);

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
const readComponent = (part: string | undefined, full: number, syntax: ColorSyntax): number | undefined => {
    if (syntax === 'space' && part === NONE) {
        return 0;
    }
    return readNumber(part, full);
};

/** A hue in degrees: a plain number or one followed by a CSS hue unit, never a percentage. */
const readHue = (part: string | undefined, syntax: ColorSyntax): number | undefined => {
    if (part === undefined) {
        return undefined;
    }
    const unit = HUE_UNIT.exec(part)?.[1];
    let number = part;
    if (unit !== undefined) {
        number = part.slice(0, -unit.length);
    }
    if (number.endsWith('%')) {
        return undefined;
    }
    if (unit === undefined || !isHueUnit(unit)) {
        return readComponent(number, FULL_TURN, syntax);
    }
    const value = readNumber(number, FULL_TURN);
    if (value === undefined) {
        return undefined;
    }
    return value * HUE_UNIT_DEGREES[unit];
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

const readRgb = (parts: string[], syntax: ColorSyntax, alpha: number): Rgba | undefined => {
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

const readHsl = (parts: string[], syntax: ColorSyntax, alpha: number): Rgba | undefined => {
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

type ColorReader = (parts: string[], syntax: ColorSyntax, alpha: number) => Rgba | undefined;

/** A new `ColorFunction` fails to compile until it has a reader here. */
const COLOR_FUNCTION_READERS: Record<ColorFunction, ColorReader> = { rgb: readRgb, hsl: readHsl };

/** One `rgb()`/`rgba()`/`hsl()`/`hsla()`, with an optional alpha. */
const readColorFunction = (kind: ColorFunction, args: string): Rgba | undefined => {
    const split = splitArguments(args);
    if (split === undefined) {
        return undefined;
    }
    const { channels: parts, syntax } = split;
    let alpha: number | undefined = OPAQUE_ALPHA;
    if (split.alpha !== undefined) {
        alpha = readComponent(split.alpha, 1, syntax);
    }
    if (alpha === undefined) {
        return undefined;
    }
    return COLOR_FUNCTION_READERS[kind](parts, syntax, alpha);
};

/**
 * A CSS colour as the document stores it, lowercase `#rrggbb` or `#rrggbbaa`:
 * from a named colour, hex in three to eight digits, or one
 * `rgb()`/`rgba()`/`hsl()`/`hsla()` of plain numbers. Plain CSS, no feature.
 * Anything else, system colours and `inherit` included, is no colour. The
 * input may be any value, since another tool may have written it, so any
 * colour read here counts, such as the legacy editor's `rgba()`, and nothing
 * else reaches a `style`.
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
    if (!isColorFunction(kind)) {
        return undefined;
    }
    const color = readColorFunction(kind, args);
    if (color === undefined) {
        return undefined;
    }
    return encodeStoredColor(color);
};
