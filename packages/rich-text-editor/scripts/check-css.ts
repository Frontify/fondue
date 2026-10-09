/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { KEYFRAMES_ALLOWLIST } from '../src/styles/keyframes.allowlist.ts';

export interface CssRule {
    readonly selectors: readonly string[];
    readonly declarations: readonly (readonly [property: string, value: string])[];
    /** The preludes of the at-rules around the rule, outermost first. */
    readonly atRules: readonly string[];
    readonly line: number;
}
export interface ParsedCss {
    readonly rules: readonly CssRule[];
    readonly keyframes: readonly { readonly name: string; readonly line: number }[];
    /** At-rules other than media and keyframes whose block holds declarations, such as `@page`. */
    readonly declaringAtRules: readonly { readonly prelude: string; readonly line: number }[];
}

const CONTENT_SCOPE = ':where(.fondue-rte-content';

// CSS Color 4 named and system colours; `transparent` and `currentcolor` are keywords that carry no colour of their own.
const NAMED_COLORS = new Set(
    `aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown burlywood
    cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray
    darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen
    darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue
    firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew
    hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan
    lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray
    lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue
    mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred
    midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid
    palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple
    rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue
    slategray slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet wheat white whitesmoke yellow
    yellowgreen accentcolor accentcolortext activetext buttonborder buttonface buttontext canvas canvastext field fieldtext
    graytext highlight highlighttext linktext mark marktext selecteditem selecteditemtext visitedtext`.split(/\s+/),
);
const LITERAL_COLOR = /#[\da-f]{3,8}\b|\b(rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(|(?<![\w-])[a-z]+(?![\w-])/gi;

/** Splits `text` at each top-level `separator`, outside parentheses and strings. */
const splitTopLevel = (text: string, separator: string): string[] => {
    const parts: string[] = [];
    let depth = 0;
    let quote: string | undefined;
    let start = 0;
    for (let index = 0; index < text.length; index += 1) {
        const character = text[index];
        if (quote !== undefined) {
            if (character === '\\') {
                index += 1;
            } else if (character === quote) {
                quote = undefined;
            }
        } else if (character === '"' || character === "'") {
            quote = character;
        } else if (character === '(') {
            depth += 1;
        } else if (character === ')') {
            depth -= 1;
        } else if (character === separator && depth === 0) {
            parts.push(text.slice(start, index));
            start = index + 1;
        }
    }
    parts.push(text.slice(start));
    return parts.map((part) => part.trim()).filter((part) => part !== '');
};

/** Reads the style rules and keyframes of a stylesheet with no nesting, as the package and ProseMirror write it. */
export const parseCss = (source: string): ParsedCss => {
    const css = source.replaceAll(/\/\*[\s\S]*?\*\//g, (comment) => comment.replaceAll(/[^\n]/g, ' '));
    const lineAt = (index: number) => css.slice(0, index).split('\n').length;
    const rules: CssRule[] = [];
    const keyframes: { name: string; line: number }[] = [];
    const declaringAtRules: { prelude: string; line: number }[] = [];
    const blocks: { readonly prelude: string; readonly body: number; readonly line: number; nests: boolean }[] = [];
    let preludeStart = 0;
    let quote: string | undefined;
    for (let index = 0; index < css.length; index += 1) {
        const character = css[index];
        if (quote !== undefined) {
            if (character === '\\') {
                index += 1;
            } else if (character === quote) {
                quote = undefined;
            }
        } else if (character === '"' || character === "'") {
            quote = character;
        } else if (character === '{') {
            const prelude = css.slice(preludeStart, index).trim();
            const keyframe = /^@(?:-webkit-)?keyframes\s+(\S+)/.exec(prelude);
            if (keyframe?.[1] !== undefined) {
                keyframes.push({ name: keyframe[1], line: lineAt(index) });
            }
            const parent = blocks.at(-1);
            if (parent !== undefined) {
                parent.nests = true;
            }
            blocks.push({ prelude, body: index + 1, line: lineAt(index), nests: false });
            preludeStart = index + 1;
        } else if (character === '}') {
            const block = blocks.pop();
            const atRules = blocks.map(({ prelude }) => prelude);
            const inKeyframes = atRules.some((prelude) => /^@(-webkit-)?keyframes\b/.test(prelude));
            if (block !== undefined && !block.prelude.startsWith('@') && !inKeyframes) {
                const declarations = splitTopLevel(css.slice(block.body, index), ';').map((declaration) => {
                    const colon = declaration.indexOf(':');
                    return [declaration.slice(0, colon).trim(), declaration.slice(colon + 1).trim()] as const;
                });
                rules.push({ selectors: splitTopLevel(block.prelude, ','), declarations, atRules, line: block.line });
            }
            const grouping = /^@(media|(-webkit-)?keyframes)\b/.test(block?.prelude ?? '');
            if (
                block?.prelude.startsWith('@') &&
                !grouping &&
                !block.nests &&
                css.slice(block.body, index).trim() !== ''
            ) {
                declaringAtRules.push({ prelude: block.prelude, line: block.line });
            }
            preludeStart = index + 1;
        } else if (character === ';') {
            preludeStart = index + 1;
        }
    }
    return { rules, keyframes, declaringAtRules };
};

/** `value` with each `var()` fallback and each string removed, so only what the declaration itself sets is left. */
const ownValue = (value: string): string => {
    let result = '';
    let index = 0;
    const unquoted = value.replaceAll(/(["'])(?:\\.|(?!\1).)*\1/g, '""');
    while (index < unquoted.length) {
        if (!unquoted.startsWith('var(', index)) {
            result += unquoted[index];
            index += 1;
            continue;
        }
        let depth = 0;
        let end = index;
        let comma = -1;
        for (; end < unquoted.length; end += 1) {
            const character = unquoted[end];
            if (character === '(') {
                depth += 1;
            } else if (character === ')') {
                depth -= 1;
                if (depth === 0) {
                    break;
                }
            } else if (character === ',' && depth === 1 && comma === -1) {
                comma = end;
            }
        }
        if (comma === -1) {
            result += unquoted.slice(index, end + 1);
        } else {
            result += `${unquoted.slice(index, comma)})`;
        }
        index = end + 1;
    }
    return result;
};

/** The literal colours a declaration value sets outside `var()` fallbacks. */
export const literalColors = (value: string): string[] =>
    [...ownValue(value).matchAll(LITERAL_COLOR)]
        .map(([match]) => match)
        .filter((match) => !/^[a-z]+$/i.test(match) || NAMED_COLORS.has(match.toLowerCase()));

/** Whether `selector` stays inside one content root: one `:where()` argument that starts with the root class, and no sibling combinator. */
const insideRoot = (selector: string): boolean => {
    if (!selector.startsWith(':where(')) {
        return false;
    }
    let depth = 0;
    let end = selector.length;
    for (let index = 6; index < selector.length && end === selector.length; index += 1) {
        if (selector[index] === '(') {
            depth += 1;
        } else if (selector[index] === ')') {
            depth -= 1;
            if (depth === 0) {
                end = index;
            }
        }
    }
    const argument = selector.slice(7, end);
    // Attribute values and pseudo-class arguments may hold `~` or `+` that are not combinators.
    const combinators = selector.replaceAll(/\[[^\]]*\]/g, '').replaceAll(/:(?!where\()[\w-]+\([^()]*\)/g, '');
    return (
        splitTopLevel(argument, ',').length === 1 &&
        /^\.fondue-rte-content(?![\w-])/.test(argument) &&
        !/[+~]/.test(combinators)
    );
};

/**
 * Reports each content selector outside `:where(.fondue-rte-content` (SPEC-rich-text-react/AC-050, AC-067), each literal
 * colour outside a `var()` fallback (SPEC-rich-text-react/AC-052) and each keyframe outside the allowlist
 * (SPEC-rich-text-accessibility/AC-020).
 */
export const scanCss = (path: string, source: string, allowlist: readonly string[] = KEYFRAMES_ALLOWLIST): string[] => {
    const { rules, keyframes, declaringAtRules } = parseCss(source);
    const violations: string[] = [];
    for (const { selectors, declarations, line } of rules) {
        for (const selector of selectors) {
            if (!insideRoot(selector)) {
                violations.push(`${path}:${line} selector ${selector} is not inside ${CONTENT_SCOPE})`);
            }
        }
        for (const [property, value] of declarations) {
            for (const color of literalColors(value)) {
                violations.push(`${path}:${line} ${property} sets the literal colour ${color}`);
            }
        }
    }
    for (const { prelude, line } of declaringAtRules) {
        violations.push(`${path}:${line} at-rule ${prelude} carries declarations outside ${CONTENT_SCOPE})`);
    }
    for (const { name, line } of keyframes) {
        if (!allowlist.includes(name)) {
            violations.push(`${path}:${line} keyframes ${name} is not in src/styles/keyframes.allowlist.ts`);
        }
    }
    return violations;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const path = join(fileURLToPath(new URL('..', import.meta.url)), 'dist', 'style.css');
    const violations = scanCss('dist/style.css', await readFile(path, 'utf8'));
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    console.log('check-css: every content rule is scoped and themed by tokens, with only allowlisted keyframes.');
}
