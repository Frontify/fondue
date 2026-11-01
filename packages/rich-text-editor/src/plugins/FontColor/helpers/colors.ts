/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ColorPicker } from '@frontify/fondue-components';
import { type ComponentProps } from 'react';

/** What a colour carries in the document. */
export type FontColorValue = {
    color: string;
};

/** The picker's colour type, derived from the component because Fondue does not export it. */
export type RgbaColor = NonNullable<ComponentProps<typeof ColorPicker.Root>['currentColor']>;

const HEX_COLOR = /^#?([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/;
const RGB_COLOR = /^rgba?\(([^)]+)\)$/;

/** The CSS Color Module Level 4 named colours, plus the two keywords that stand for a colour. */
const COLOR_KEYWORDS: ReadonlySet<string> = new Set([
    'aliceblue',
    'antiquewhite',
    'aqua',
    'aquamarine',
    'azure',
    'beige',
    'bisque',
    'black',
    'blanchedalmond',
    'blue',
    'blueviolet',
    'brown',
    'burlywood',
    'cadetblue',
    'chartreuse',
    'chocolate',
    'coral',
    'cornflowerblue',
    'cornsilk',
    'crimson',
    'cyan',
    'darkblue',
    'darkcyan',
    'darkgoldenrod',
    'darkgray',
    'darkgreen',
    'darkgrey',
    'darkkhaki',
    'darkmagenta',
    'darkolivegreen',
    'darkorange',
    'darkorchid',
    'darkred',
    'darksalmon',
    'darkseagreen',
    'darkslateblue',
    'darkslategray',
    'darkslategrey',
    'darkturquoise',
    'darkviolet',
    'deeppink',
    'deepskyblue',
    'dimgray',
    'dimgrey',
    'dodgerblue',
    'firebrick',
    'floralwhite',
    'forestgreen',
    'fuchsia',
    'gainsboro',
    'ghostwhite',
    'gold',
    'goldenrod',
    'gray',
    'green',
    'greenyellow',
    'grey',
    'honeydew',
    'hotpink',
    'indianred',
    'indigo',
    'ivory',
    'khaki',
    'lavender',
    'lavenderblush',
    'lawngreen',
    'lemonchiffon',
    'lightblue',
    'lightcoral',
    'lightcyan',
    'lightgoldenrodyellow',
    'lightgray',
    'lightgreen',
    'lightgrey',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'lightslategray',
    'lightslategrey',
    'lightsteelblue',
    'lightyellow',
    'lime',
    'limegreen',
    'linen',
    'magenta',
    'maroon',
    'mediumaquamarine',
    'mediumblue',
    'mediumorchid',
    'mediumpurple',
    'mediumseagreen',
    'mediumslateblue',
    'mediumspringgreen',
    'mediumturquoise',
    'mediumvioletred',
    'midnightblue',
    'mintcream',
    'mistyrose',
    'moccasin',
    'navajowhite',
    'navy',
    'oldlace',
    'olive',
    'olivedrab',
    'orange',
    'orangered',
    'orchid',
    'palegoldenrod',
    'palegreen',
    'paleturquoise',
    'palevioletred',
    'papayawhip',
    'peachpuff',
    'peru',
    'pink',
    'plum',
    'powderblue',
    'purple',
    'rebeccapurple',
    'red',
    'rosybrown',
    'royalblue',
    'saddlebrown',
    'salmon',
    'sandybrown',
    'seagreen',
    'seashell',
    'sienna',
    'silver',
    'skyblue',
    'slateblue',
    'slategray',
    'slategrey',
    'snow',
    'springgreen',
    'steelblue',
    'tan',
    'teal',
    'thistle',
    'tomato',
    'turquoise',
    'violet',
    'wheat',
    'white',
    'whitesmoke',
    'yellow',
    'yellowgreen',
    'transparent',
    'currentcolor',
]);

/** `#abc`, `#aabbccdd`, or one `rgb()`/`rgba()`/`hsl()`/`hsla()` holding nothing but numbers. */
const CSS_COLOR = /^(#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})|(rgba?|hsla?)\([\d.%,\s/]*\))$/i;

/**
 * Whether a value is a colour safe to write into a `style`: one colour keyword,
 * a hex value, or a single colour function of plain numbers. Anything that could
 * carry more CSS (`;`, braces, `url(`, escapes) is not, and neither is a
 * keyword that is no colour (`inherit`, `banana`), so a stored or pasted colour
 * never becomes a second declaration.
 */
export const isCssColor = (value: unknown): value is string => {
    if (typeof value !== 'string') {
        return false;
    }
    return COLOR_KEYWORDS.has(value.toLowerCase()) || CSS_COLOR.test(value);
};

/**
 * Reads hex (what this plugin writes) and `rgb()`/`rgba()` (what browsers
 * normalise a pasted `style` to). Named colours and `hsl()` read as no colour:
 * resolving them would mean asking the browser.
 */
export const parseCssColor = (css: string | undefined): RgbaColor | undefined => {
    if (css === undefined) {
        return undefined;
    }
    const value = css.trim();

    const hex = HEX_COLOR.exec(value)?.[1];
    if (hex !== undefined) {
        // `#abc` is `#aabbcc`.
        const digits = hex.length === 3 ? [...hex].map((digit) => digit + digit).join('') : hex;
        return {
            red: parseInt(digits.slice(0, 2), 16),
            green: parseInt(digits.slice(2, 4), 16),
            blue: parseInt(digits.slice(4, 6), 16),
            alpha: 1,
        };
    }

    // Handles both `rgb(1, 2, 3)` and the modern `rgb(1 2 3 / 0.5)`.
    const [red, green, blue, alpha] =
        RGB_COLOR.exec(value)?.[1]
            ?.split(/[\s,/]+/)
            .filter((part) => part !== '')
            .map(Number) ?? [];
    if (red === undefined || green === undefined || blue === undefined) {
        return undefined;
    }
    if ([red, green, blue].some((channel) => Number.isNaN(channel))) {
        return undefined;
    }
    // A percentage alpha (`/ 50%`) is not a number, and counts as opaque.
    return {
        red,
        green,
        blue,
        alpha: alpha === undefined || Number.isNaN(alpha) ? 1 : alpha,
    };
};

/** Hex while opaque, `rgba()` otherwise: hex alpha is not understood everywhere exported HTML ends up. */
export const toCssColor = ({ red, green, blue, alpha = 1 }: RgbaColor): string => {
    const channels = [red, green, blue].map((channel) => Math.round(channel));
    return alpha >= 1
        ? `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
        : `rgba(${channels.join(', ')}, ${alpha})`;
};
