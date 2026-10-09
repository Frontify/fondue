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
}

const CONTENT_SCOPE = ':where(.fondue-rte-content';

// CSS Color 4 named colors; `transparent` and `currentcolor` are keywords that carry no colour of their own.
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
    yellowgreen`.split(/\s+/),
);
const LITERAL_COLOR = /#[\da-f]{3,8}\b|\b(rgba?|hsla?)\(|(?<![\w-])[a-z]+(?![\w-])/gi;

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
    const blocks: { readonly prelude: string; readonly body: number; readonly line: number }[] = [];
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
            blocks.push({ prelude, body: index + 1, line: lineAt(index) });
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
            preludeStart = index + 1;
        } else if (character === ';') {
            preludeStart = index + 1;
        }
    }
    return { rules, keyframes };
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

/**
 * Reports each content selector outside `:where(.fondue-rte-content` (SPEC-rich-text-react/AC-050, AC-067), each literal
 * colour outside a `var()` fallback (SPEC-rich-text-react/AC-052) and each keyframe outside the allowlist
 * (SPEC-rich-text-accessibility/AC-020).
 */
export const scanCss = (path: string, source: string, allowlist: readonly string[] = KEYFRAMES_ALLOWLIST): string[] => {
    const { rules, keyframes } = parseCss(source);
    const violations: string[] = [];
    for (const { selectors, declarations, line } of rules) {
        for (const selector of selectors) {
            if (!selector.startsWith(CONTENT_SCOPE)) {
                violations.push(`${path}:${line} selector ${selector} is not inside ${CONTENT_SCOPE})`);
            }
        }
        for (const [property, value] of declarations) {
            for (const color of literalColors(value)) {
                violations.push(`${path}:${line} ${property} sets the literal colour ${color}`);
            }
        }
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
