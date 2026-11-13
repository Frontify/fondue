/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin, INLINE_PLACEHOLDER, type RteInputRule, WORD_START_CONTEXT } from '#/core';

const TYPOGRAPHY_GROUPS = ['quotes', 'ellipsis', 'dashes', 'symbols', 'numeric'] as const;

/**
 * Every group but `numeric`, which reads too much technical text as numbers to be on unasked, and
 * `quotes`, which curls English quotes whatever the language of the text.
 */
const DEFAULT_GROUPS: readonly TypographyGroup[] = ['ellipsis', 'dashes', 'symbols'];

/**
 * A set of shortcuts that can be turned on or off together.
 */
export type TypographyGroup = (typeof TYPOGRAPHY_GROUPS)[number];

/**
 * Which typographic shortcuts the plugin turns on.
 */
export type TypographyPluginOptions = {
    /**
     * The groups of shortcuts to turn on.
     * @default ['ellipsis', 'dashes', 'symbols']
     */
    groups?: readonly TypographyGroup[];
};

/**
 * A shortcut: the text typed, what it becomes, and whether it waits for the run to end (a space or
 * punctuation is typed), so `--flag`, `-->` and `10^23` stay as typed.
 */
type Replacement = readonly [match: string | RegExp, replace: string, waitForRunEnd?: typeof AT_RUN_END];

/**
 * Marks a shortcut that fires only once the run ends.
 */
const AT_RUN_END = true;

/**
 * Not right after a letter, digit or underscore.
 */
const NOT_IN_A_WORD = String.raw`(?<![\p{L}\p{N}_])`;

/**
 * Where a double quote opens: also after an inline element, such as a soft break. The engine cannot yet tell a
 * mention from a soft break.
 */
const DOUBLE_QUOTE_OPENS = `(?<=^|[${WORD_START_CONTEXT}${INLINE_PLACEHOLDER}])`;

/**
 * Where a single quote opens. After an inline element it is an apostrophe, as a mention may be: `@Noah's`.
 */
const SINGLE_QUOTE_OPENS = `(?<=^|[${WORD_START_CONTEXT}])`;

/**
 * Not right after a letter, digit, underscore, slash or full stop, so a number stands as a whole token:
 * `v1/2`, `11/2` and `/1/2` stay as typed.
 */
const TOKEN_START = String.raw`(?<![\p{L}\p{N}_/.])`;

/**
 * Right after a whole number: `2^2`, not `x^2` or `v2^2`.
 */
const AFTER_A_NUMBER = String.raw`(?<=${NOT_IN_A_WORD}\d+)`;

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
    AT_RUN_END,
]);

/**
 * Each digit typed after `~`, with the subscript glyph it becomes.
 */
const SUBSCRIPT_PAIRS: readonly (readonly [character: string, glyph: string])[] = [
    ['0', '₀'],
    ['1', '₁'],
    ['2', '₂'],
    ['3', '₃'],
    ['4', '₄'],
    ['5', '₅'],
    ['6', '₆'],
    ['7', '₇'],
    ['8', '₈'],
    ['9', '₉'],
];

/**
 * Right after a letter or a closing bracket, as in a formula: `H~2O`, `(OH)~2`. Not after a space,
 * so `~2 hours` stays as typed, nor after a `~`, so a strikethrough can open on a digit: `~~2~~`.
 */
const AFTER_A_FORMULA = String.raw`(?<=[\p{L})\]])`;

/**
 * `~2` for `₂` in a formula, the moment the digit is typed: `H~2O` becomes `H₂O`.
 */
const SUBSCRIPTS: readonly Replacement[] = SUBSCRIPT_PAIRS.map(([character, glyph]): Replacement => [
    new RegExp(`${AFTER_A_FORMULA}~${character}`, 'u'),
    glyph,
]);

/**
 * `^o` for a degree sign right after a whole number, before a unit is typed: `20^oC`.
 */
const DEGREE: Replacement = [new RegExp(String.raw`${AFTER_A_NUMBER}\^o`, 'u'), '°'];

/**
 * `1/2` for `½`, as a whole token, so dates (`11/2`), paths (`/1/2`), decimals (`0.1/2`) and
 * addresses (`10.0.0.1/8`) stay as typed, and so does `1/25`: it waits for the run to end.
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
).map(([fraction, glyph]): Replacement => [new RegExp(`${TOKEN_START}${fraction}`, 'u'), glyph, AT_RUN_END]);

/**
 * Two hyphens, not after a hyphen, `<` or `!`, so `---`, `<--` and `<!--` stay as typed.
 */
const DOUBLE_HYPHEN = /(?<![-<!])--/;

/**
 * `->`, not after a hyphen, so `-->` stays as typed.
 */
const RIGHT_ARROW = /(?<!-)->/;

/**
 * Two whole numbers around an `x`, as in `3x4`, but not a hexadecimal number such as `0x10`.
 */
const DIMENSIONS = new RegExp(String.raw`${NOT_IN_A_WORD}(?!0x)(\d+)x(\d+)`, 'u');

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
    dashes: [[DOUBLE_HYPHEN, '–', AT_RUN_END]],
    symbols: [
        ['<->', '↔'],
        [RIGHT_ARROW, '→'],
        ['<-', '←', AT_RUN_END],
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
        ['!=', '≠', AT_RUN_END],
    ],
    numeric: [...SUPERSCRIPTS, ...SUBSCRIPTS, DEGREE, ...FRACTIONS, [DIMENSIONS, '$1×$2', AT_RUN_END]],
};

const toRule = ([match, replace, waitForRunEnd]: Replacement): RteInputRule => ({
    kind: 'text',
    match,
    replace,
    waitForRunEnd,
});

/**
 * Typographic shortcuts, rewritten as they are typed: `->` becomes `→`, `(c)`
 * becomes `©`; with the `quotes` group a straight quote becomes an English curly
 * one, and with the `numeric` group `1/2` becomes `½` and `H~2O` becomes `H₂O`.
 * Backspace right after takes one back. Text in inline code is left alone. No
 * toolbar and no document types: only typing rules. `groups` keeps only some.
 * @example
 * typographyPlugin({ groups: ['quotes', 'dashes'] })
 */
export const typographyPlugin = ({ groups = DEFAULT_GROUPS }: TypographyPluginOptions = {}) => {
    const inputRules: RteInputRule[] = [];
    // In the fixed order, so how the host lists the groups never changes which rule goes first.
    for (const group of TYPOGRAPHY_GROUPS) {
        if (groups.includes(group)) {
            inputRules.push(...RULES[group].map(toRule));
        }
    }
    return definePlugin({ id: 'typography', inputRules });
};
