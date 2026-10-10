/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import postcss, { type AtRule, list, type Node } from 'postcss';

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
const KEYFRAMES = /^@(-webkit-)?keyframes\b/;

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
    yellowgreen`.split(/\s+/),
);
// CSS Color 4 system colours, which a forced colours rule may set, since that mode shows only system colours.
const SYSTEM_COLORS = new Set(
    `accentcolor accentcolortext activetext buttonborder buttonface buttontext canvas canvastext field fieldtext graytext
    highlight highlighttext linktext mark marktext selecteditem selecteditemtext visitedtext`.split(/\s+/),
);
const LITERAL_COLOR = /#[\da-f]{3,8}\b|\b(rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(|(?<![\w-])[a-z]+(?![\w-])/gi;

const lineOf = (node: Node) => node.source?.start?.line ?? 0;

/** Reads the style rules, keyframes and declaring at-rules of a stylesheet through PostCSS. */
export const parseCss = (source: string): ParsedCss => {
    const root = postcss.parse(source);
    const rules: CssRule[] = [];
    root.walkRules((rule) => {
        const atRules: string[] = [];
        for (let parent = rule.parent; parent !== undefined && parent.type === 'atrule'; parent = parent.parent) {
            const atRule = parent as AtRule;
            atRules.unshift(`@${atRule.name} ${atRule.params}`.trim());
        }
        // Keyframe steps such as `to` are not style rules.
        if (atRules.some((prelude) => KEYFRAMES.test(prelude))) {
            return;
        }
        const declarations = rule.nodes.flatMap((node) => {
            if (node.type !== 'decl') {
                return [];
            }
            let value = node.value;
            if (node.important) {
                value = `${value} !important`;
            }
            return [[node.prop, value] as const];
        });
        rules.push({ selectors: rule.selectors, declarations, atRules, line: lineOf(rule) });
    });
    const keyframes: { name: string; line: number }[] = [];
    const declaringAtRules: { prelude: string; line: number }[] = [];
    root.walkAtRules((atRule) => {
        const prelude = `@${atRule.name} ${atRule.params}`.trim();
        if (KEYFRAMES.test(prelude)) {
            keyframes.push({ name: atRule.params, line: lineOf(atRule) });
        } else if (atRule.name !== 'media' && atRule.some((node) => node.type === 'decl')) {
            declaringAtRules.push({ prelude, line: lineOf(atRule) });
        }
    });
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

/** The literal colours a declaration value sets outside `var()` fallbacks, less system colours in a `forced` colours rule. */
export const literalColors = (value: string, forced = false): string[] =>
    [...ownValue(value).matchAll(LITERAL_COLOR)]
        .map(([match]) => match)
        .filter((match) => {
            const name = match.toLowerCase();
            if (SYSTEM_COLORS.has(name)) {
                return !forced;
            }
            return !/^[a-z]+$/i.test(match) || NAMED_COLORS.has(name);
        });

/** Whether a rule sits inside `@media (forced-colors: active)`. */
export const inForcedColors = (atRules: readonly string[]): boolean =>
    atRules.some((prelude) => /forced-colors:\s*active/.test(prelude));

/** Whether `selector` stays inside one content root at zero specificity: one `:where()` argument that starts with the root class, then at most a pseudo-element, and no sibling combinator. */
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
    // Anything after the `:where()` but a pseudo-element adds specificity, so a host rule would no longer win (SPEC-rich-text-react/AC-067).
    const tail = selector.slice(end + 1);
    // Attribute values and pseudo-class arguments may hold `~` or `+` that are not combinators.
    const combinators = selector.replaceAll(/\[[^\]]*\]/g, '').replaceAll(/:(?!where\()[\w-]+\([^()]*\)/g, '');
    return (
        /^(::[\w-]+|:(before|after|first-line|first-letter))?$/.test(tail) &&
        list.comma(argument).length === 1 &&
        /^\.fondue-rte-content(?![\w-])/.test(argument) &&
        !/[+~]/.test(combinators)
    );
};

// The scoped name Vite gives a CSS Module class: `_`, the local name, a hash and the source line.
const MODULE_CLASS = /^\._[a-zA-Z][\w-]*_[a-z\d]{5}_\d+(?![\w-])/;

/** Whether `selector` is a chrome rule from a CSS Module: its subject compound starts with a scoped module class (SPEC-rich-text-react/AC-050). */
const fromModule = (selector: string): boolean =>
    MODULE_CLASS.test(selector) && !selector.includes('.fondue-rte-content');

/**
 * Reports each content selector outside `:where(.fondue-rte-content` (SPEC-rich-text-react/AC-050, AC-067), each literal
 * colour outside a `var()` fallback (SPEC-rich-text-react/AC-052) and each keyframe outside the allowlist
 * (SPEC-rich-text-accessibility/AC-020).
 */
export const scanCss = (path: string, source: string, allowlist: readonly string[] = KEYFRAMES_ALLOWLIST): string[] => {
    const { rules, keyframes, declaringAtRules } = parseCss(source);
    const violations: string[] = [];
    for (const { selectors, declarations, atRules, line } of rules) {
        for (const selector of selectors) {
            if (!insideRoot(selector) && !fromModule(selector)) {
                violations.push(`${path}:${line} selector ${selector} is not inside ${CONTENT_SCOPE})`);
            }
        }
        for (const [property, value] of declarations) {
            for (const color of literalColors(value, inForcedColors(atRules))) {
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
    const path = process.argv[2] ?? 'dist/style.css';
    const violations = scanCss(path, await readFile(join(fileURLToPath(new URL('..', import.meta.url)), path), 'utf8'));
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    console.log('check-css: every content rule is scoped and themed by tokens, with only allowlisted keyframes.');
}
