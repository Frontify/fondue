/* (c) Copyright Frontify Ltd., all rights reserved. */

// The CSS named colours as `#rrggbb`, which DOM implementations report as written.
const NAMED = new Map(
    (
        'aliceblue:f0f8ff antiquewhite:faebd7 aqua:00ffff aquamarine:7fffd4 azure:f0ffff beige:f5f5dc bisque:ffe4c4 ' +
        'black:000000 blanchedalmond:ffebcd blue:0000ff blueviolet:8a2be2 brown:a52a2a burlywood:deb887 ' +
        'cadetblue:5f9ea0 chartreuse:7fff00 chocolate:d2691e coral:ff7f50 cornflowerblue:6495ed cornsilk:fff8dc ' +
        'crimson:dc143c cyan:00ffff darkblue:00008b darkcyan:008b8b darkgoldenrod:b8860b darkgray:a9a9a9 ' +
        'darkgreen:006400 darkgrey:a9a9a9 darkkhaki:bdb76b darkmagenta:8b008b darkolivegreen:556b2f ' +
        'darkorange:ff8c00 darkorchid:9932cc darkred:8b0000 darksalmon:e9967a darkseagreen:8fbc8f ' +
        'darkslateblue:483d8b darkslategray:2f4f4f darkslategrey:2f4f4f darkturquoise:00ced1 darkviolet:9400d3 ' +
        'deeppink:ff1493 deepskyblue:00bfff dimgray:696969 dimgrey:696969 dodgerblue:1e90ff firebrick:b22222 ' +
        'floralwhite:fffaf0 forestgreen:228b22 fuchsia:ff00ff gainsboro:dcdcdc ghostwhite:f8f8ff gold:ffd700 ' +
        'goldenrod:daa520 gray:808080 green:008000 greenyellow:adff2f grey:808080 honeydew:f0fff0 hotpink:ff69b4 ' +
        'indianred:cd5c5c indigo:4b0082 ivory:fffff0 khaki:f0e68c lavender:e6e6fa lavenderblush:fff0f5 ' +
        'lawngreen:7cfc00 lemonchiffon:fffacd lightblue:add8e6 lightcoral:f08080 lightcyan:e0ffff ' +
        'lightgoldenrodyellow:fafad2 lightgray:d3d3d3 lightgreen:90ee90 lightgrey:d3d3d3 lightpink:ffb6c1 ' +
        'lightsalmon:ffa07a lightseagreen:20b2aa lightskyblue:87cefa lightslategray:778899 lightslategrey:778899 ' +
        'lightsteelblue:b0c4de lightyellow:ffffe0 lime:00ff00 limegreen:32cd32 linen:faf0e6 magenta:ff00ff ' +
        'maroon:800000 mediumaquamarine:66cdaa mediumblue:0000cd mediumorchid:ba55d3 mediumpurple:9370db ' +
        'mediumseagreen:3cb371 mediumslateblue:7b68ee mediumspringgreen:00fa9a mediumturquoise:48d1cc ' +
        'mediumvioletred:c71585 midnightblue:191970 mintcream:f5fffa mistyrose:ffe4e1 moccasin:ffe4b5 ' +
        'navajowhite:ffdead navy:000080 oldlace:fdf5e6 olive:808000 olivedrab:6b8e23 orange:ffa500 ' +
        'orangered:ff4500 orchid:da70d6 palegoldenrod:eee8aa palegreen:98fb98 paleturquoise:afeeee ' +
        'palevioletred:db7093 papayawhip:ffefd5 peachpuff:ffdab9 peru:cd853f pink:ffc0cb plum:dda0dd ' +
        'powderblue:b0e0e6 purple:800080 rebeccapurple:663399 red:ff0000 rosybrown:bc8f8f royalblue:4169e1 ' +
        'saddlebrown:8b4513 salmon:fa8072 sandybrown:f4a460 seagreen:2e8b57 seashell:fff5ee sienna:a0522d ' +
        'silver:c0c0c0 skyblue:87ceeb slateblue:6a5acd slategray:708090 slategrey:708090 snow:fffafa ' +
        'springgreen:00ff7f steelblue:4682b4 tan:d2b48c teal:008080 thistle:d8bfd8 tomato:ff6347 turquoise:40e0d0 ' +
        'violet:ee82ee wheat:f5deb3 white:ffffff whitesmoke:f5f5f5 yellow:ffff00 yellowgreen:9acd32 ' +
        'transparent:00000000'
    )
        .split(' ')
        .map((entry) => {
            const [name = '', hex = ''] = entry.split(':');
            return [name, `#${hex}`] as const;
        }),
);

const SHORT_HEX = /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/;
const LONG_HEX = /^#[0-9a-f]{6}(?:[0-9a-f]{2})?$/;
const FUNCTION = /^(rgba?|hsla?)\(([^)]*)\)$/;

const byte = (value: number) =>
    Math.min(255, Math.max(0, Math.round(value)))
        .toString(16)
        .padStart(2, '0');

/** A number, or a percentage of `full`, else `undefined`. */
const amount = (text: string, full: number): number | undefined => {
    const percent = text.endsWith('%');
    const value = Number(percent ? text.slice(0, -1) : text);
    if (text === '' || !Number.isFinite(value)) {
        return undefined;
    }
    if (percent) {
        return (value / 100) * full;
    }
    return value;
};

/** A hue in degrees from a number, `deg`, `turn` or `rad`. */
const hueOf = (text: string): number | undefined => {
    const match = /^(-?[\d.]+)(deg|turn|rad)?$/.exec(text);
    if (match === null) {
        return undefined;
    }
    const value = Number(match[1]);
    if (match[2] === 'turn') {
        return value * 360;
    }
    if (match[2] === 'rad') {
        return (value * 180) / Math.PI;
    }
    return value;
};

/** The red, green and blue of a hue, saturation and lightness, each 0 to 255. */
const rgbOfHsl = (hue: number, saturation: number, lightness: number): readonly number[] => {
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const turn = (((hue % 360) + 360) % 360) / 60;
    const second = chroma * (1 - Math.abs((turn % 2) - 1));
    const sectors = [
        [chroma, second, 0],
        [second, chroma, 0],
        [0, chroma, second],
        [0, second, chroma],
        [second, 0, chroma],
        [chroma, 0, second],
    ];
    const sector = sectors[Math.floor(turn) % 6] ?? [0, 0, 0];
    const lift = lightness - chroma / 2;
    return sector.map((part) => (part + lift) * 255);
};

/**
 * A CSS colour as the lowercase `#rrggbb`, or `#rrggbbaa` when translucent, that a `color` value stores: hex in three
 * to eight digits, `rgb()`, `rgba()`, `hsl()`, `hsla()` or a named colour; `undefined` for anything else, such as a
 * system colour or `inherit`.
 * Public so the shipped features and the core share it.
 */
export const hexColor = (text: string): string | undefined => {
    const value = text.trim().toLowerCase();
    const named = NAMED.get(value);
    if (named !== undefined) {
        return named;
    }
    const short = SHORT_HEX.exec(value);
    if (short !== null) {
        const [, red = '', green = '', blue = '', alpha] = short;
        let hex = `#${red}${red}${green}${green}${blue}${blue}`;
        if (alpha !== undefined && alpha !== 'f') {
            hex += `${alpha}${alpha}`;
        }
        return hex;
    }
    if (LONG_HEX.test(value)) {
        return value.endsWith('ff') && value.length === 9 ? value.slice(0, 7) : value;
    }
    const call = FUNCTION.exec(value);
    if (call === null) {
        return undefined;
    }
    const [, name = '', inner = ''] = call;
    const [channels = '', alphaText] = inner.split('/').map((part) => part.trim());
    const parts = channels.split(/[\s,]+/).filter((part) => part !== '');
    let alphaPart = alphaText;
    if (parts.length === 4 && alphaPart === undefined) {
        alphaPart = parts.pop();
    }
    if (parts.length !== 3) {
        return undefined;
    }
    let rgb: readonly (number | undefined)[];
    if (name.startsWith('rgb')) {
        rgb = parts.map((part) => amount(part, 255));
    } else {
        const [hueText = '', saturationText = '', lightnessText = ''] = parts;
        const hue = hueOf(hueText);
        const saturation = amount(saturationText, 1);
        const lightness = amount(lightnessText, 1);
        if (hue === undefined || saturation === undefined || lightness === undefined) {
            return undefined;
        }
        rgb = rgbOfHsl(hue, saturation, lightness);
    }
    if (rgb.some((part) => part === undefined)) {
        return undefined;
    }
    let hex = `#${rgb.map((part) => byte(part ?? 0)).join('')}`;
    if (alphaPart !== undefined) {
        const alpha = amount(alphaPart, 1);
        if (alpha === undefined) {
            return undefined;
        }
        if (alpha < 1) {
            hex += byte(alpha * 255);
        }
    }
    return hex;
};
