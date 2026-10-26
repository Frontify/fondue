/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AtRule, type Node } from 'postcss';

// The CSS named colours (CSS Color 4); `transparent` and `currentcolor` are not among them.
const NAMED_COLORS = new Set(
    (
        'aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown burlywood ' +
        'cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod ' +
        'darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon ' +
        'darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray ' +
        'dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green ' +
        'greenyellow grey honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon ' +
        'lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon ' +
        'lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen magenta ' +
        'maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen ' +
        'mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive ' +
        'olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru ' +
        'pink plum powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen ' +
        'seashell sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan teal thistle tomato ' +
        'turquoise violet wheat white whitesmoke yellow yellowgreen'
    ).split(' '),
);

// The CSS system colours, which only forced colours may name.
const SYSTEM_COLORS = new Set(
    (
        'accentcolor accentcolortext activetext buttonborder buttonface buttontext canvas canvastext field fieldtext ' +
        'graytext highlight highlighttext linktext mark marktext selecteditem selecteditemtext visitedtext'
    ).split(' '),
);

/** `value` without its `var()` expressions, fallbacks included. */
export const withoutVars = (value: string): string => {
    let rest = value;
    let start = rest.indexOf('var(');
    while (start !== -1) {
        let depth = 0;
        let end = start + 3;
        do {
            if (rest[end] === '(') {
                depth += 1;
            }

            if (rest[end] === ')') {
                depth -= 1;
            }

            end += 1;
        } while (depth > 0 && end < rest.length);

        rest = `${rest.slice(0, start)}${rest.slice(end)}`;
        start = rest.indexOf('var(');
    }

    return rest;
};

/** Whether `node` sits in an at-rule whose name and parameters match `test`, as `@media (forced-colors: active)` does. */
export const insideAtRule = (node: Node, test: RegExp): boolean => {
    let parent: Node | undefined = node.parent;
    while (parent !== undefined) {
        if (parent.type === 'atrule') {
            const { name, params } = parent as AtRule;
            if (test.test(`${name} ${params}`)) {
                return true;
            }
        }

        parent = parent.parent;
    }

    return false;
};

/** The literal colours of a declaration value outside its `var()` fallbacks; system colours pass in forced colours. */
export const literalColorsIn = (value: string, forcedColors: boolean): string[] => {
    const bare = withoutVars(value).replaceAll(/"[^"]*"|'[^']*'/g, '');
    const words = (bare.match(/[a-z-]+/gi) ?? []).filter((word) => {
        const name = word.toLowerCase();

        return NAMED_COLORS.has(name) || (!forcedColors && SYSTEM_COLORS.has(name));
    });

    return [...(bare.match(/#[\da-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(/gi) ?? []), ...words];
};
