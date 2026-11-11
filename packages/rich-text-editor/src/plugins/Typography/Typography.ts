/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin, INLINE_PLACEHOLDER, type RteInputRule } from '#/core';

const TYPOGRAPHY_GROUPS = ['quotes', 'ellipsis', 'dashes', 'symbols', 'numeric'] as const;

/**
 * Every group but `numeric`, which reads too much technical text as numbers to be on unasked.
 */
const DEFAULT_GROUPS: readonly TypographyGroup[] = ['quotes', 'ellipsis', 'dashes', 'symbols'];

/**
 * A set of shortcuts that can be turned on or off together.
 */
export type TypographyGroup = (typeof TYPOGRAPHY_GROUPS)[number];

export type TypographyPluginOptions = {
    /**
     * The groups of shortcuts to turn on.
     * @default ['quotes', 'ellipsis', 'dashes', 'symbols']
     */
    groups?: readonly TypographyGroup[];
};

/**
 * `waitForRunEnd` waits for the run to end (a space or punctuation is typed), so `--flag`, `-->`
 * and `10^23` stay as typed.
 */
type Replacement = readonly [match: string | RegExp, replace: string, waitForRunEnd?: true];

/**
 * What may come before an opening quote, besides the start of a block: whitespace, or an opening
 * bracket or quote.
 */
const OPENING_CONTEXT = String.raw`\s([{<'"“‘`;

/**
 * Where a double quote opens: also after an inline element, such as a soft break.
 */
const DOUBLE_QUOTE_OPENS = `(?<=^|[${OPENING_CONTEXT}${INLINE_PLACEHOLDER}])`;

/**
 * Where a single quote opens. After an inline element it is an apostrophe: `@Noah's`.
 */
const SINGLE_QUOTE_OPENS = `(?<=^|[${OPENING_CONTEXT}])`;

/**
 * Not right after a letter, digit, underscore or slash, so a number stands as a whole token:
 * `v1/2`, `11/2` and `/1/2` stay as typed.
 */
const TOKEN_START = String.raw`(?<![\p{L}\p{N}_/])`;

/**
 * Right after a whole number: `2^2`, not `x^2` or `v2^2`.
 */
const AFTER_A_NUMBER = String.raw`(?<=(?<![\p{L}\p{N}_])\d+)`;

/**
 * Each character typed after `^`, with the superscript glyph it becomes.
 */
const SUPERSCRIPT_PAIRS: readonly (readonly [character: string, glyph: string])[] = [
    ['0', '⁰'],
    ['1', '¹'],
    ['2', '²'],
    ['3', '³'],
    ['4', '⁴'],
    ['5', '⁵'],
    ['6', '⁶'],
    ['7', '⁷'],
    ['8', '⁸'],
    ['9', '⁹'],
];

/**
 * `^2` for `²`, only right after a whole number and at the end of a run (`2^2`, not `x^2` or
 * `10^23`).
 */
const SUPERSCRIPTS: readonly Replacement[] = SUPERSCRIPT_PAIRS.map(([character, glyph]): Replacement => [
    new RegExp(String.raw`${AFTER_A_NUMBER}\^${character}`, 'u'),
    glyph,
    true,
]);

/**
 * `^o` for a degree sign right after a whole number, before a unit is typed: `20^oC`.
 */
const DEGREE: Replacement = [new RegExp(String.raw`${AFTER_A_NUMBER}\^o`, 'u'), '°'];

/**
 * `1/2` for `½`, as a whole token, so dates (`11/2`) and paths (`/1/2`) stay as typed, and so does
 * `1/25`: it waits for the run to end.
 */
const FRACTIONS: readonly Replacement[] = (
    [
        ['1/2', '½'],
        ['1/3', '⅓'],
        ['1/4', '¼'],
        ['1/5', '⅕'],
        ['1/6', '⅙'],
        ['1/7', '⅐'],
        ['1/8', '⅛'],
        ['1/9', '⅑'],
        ['1/10', '⅒'],
        ['2/3', '⅔'],
        ['2/5', '⅖'],
        ['3/4', '¾'],
        ['3/5', '⅗'],
        ['3/8', '⅜'],
        ['4/5', '⅘'],
        ['5/6', '⅚'],
        ['5/8', '⅝'],
        ['7/8', '⅞'],
    ] as const
).map(([fraction, glyph]): Replacement => [new RegExp(`${TOKEN_START}${fraction}`, 'u'), glyph, true]);

/**
 * The rules of each group, in the order they are tried: `<->` before `->`, which
 * ignores a leading hyphen so `-->` stays. A quote opens at the start of a block
 * or after whitespace, a bracket or another quote; otherwise it closes.
 */
const RULES: Record<TypographyGroup, readonly Replacement[]> = {
    quotes: [
        [new RegExp(`${DOUBLE_QUOTE_OPENS}"`), '“'],
        ['"', '”'],
        [new RegExp(`${SINGLE_QUOTE_OPENS}'`), '‘'],
        // A closing single quote and an apostrophe are the same character.
        ["'", '’'],
    ],
    ellipsis: [['...', '…']],
    dashes: [[/(?<![-<!])--/, '—', true]],
    symbols: [
        ['<->', '↔'],
        [/(?<!-)->/, '→'],
        ['<-', '←', true],
        ['>>', '»'],
        ['<<', '«'],
        ['(tm)', '™'],
        ['(TM)', '™'],
        ['(r)', '®'],
        ['(R)', '®'],
        ['(c)', '©'],
        ['(C)', '©'],
        ['(sm)', '℠'],
        ['+/-', '±'],
        ['!=', '≠', true],
    ],
    numeric: [...SUPERSCRIPTS, DEGREE, ...FRACTIONS, [/(?<![\p{L}\p{N}_])(?!0x)(\d+)x(\d+)/u, '$1×$2', true]],
};

const toRule = ([match, replace, waitForRunEnd]: Replacement): RteInputRule => ({
    kind: 'text',
    match,
    replace,
    waitForRunEnd,
});

/**
 * Typographic shortcuts, rewritten as they are typed: `->` becomes `→`, `(c)`
 * becomes `©`, a straight quote becomes a curly one, and, with the `numeric` group,
 * `1/2` becomes `½`.
 * Backspace right after takes one back. Text in inline code is left alone. No
 * toolbar and no document types: only typing rules. `groups` keeps only some.
 * @example
 * typographyPlugin({ groups: ['quotes', 'dashes'] })
 */
export const typographyPlugin = ({ groups = DEFAULT_GROUPS }: TypographyPluginOptions = {}) =>
    definePlugin({
        id: 'typography',
        // In the fixed order, so how the host lists the groups never changes which rule goes first.
        inputRules: TYPOGRAPHY_GROUPS.filter((group) => groups.includes(group)).flatMap((group) =>
            RULES[group].map(toRule),
        ),
    });
