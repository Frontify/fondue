/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin, INLINE_PLACEHOLDER, type RteInputRule } from '#/core';

const TYPOGRAPHY_GROUPS = ['quotes', 'ellipsis', 'dashes', 'symbols', 'numeric'] as const;

/**
 * A set of shortcuts that can be turned on or off together.
 */
export type TypographyGroup = (typeof TYPOGRAPHY_GROUPS)[number];

export type TypographyPluginOptions = {
    /**
     * The groups of shortcuts to turn on.
     * @default TYPOGRAPHY_GROUPS
     */
    groups?: readonly TypographyGroup[];
};

/**
 * `waitForRunEnd` waits for the run to end (a space or punctuation is typed), so `--flag`, `-->` and `10^23` stay as typed.
 */
type Replacement = readonly [match: string | RegExp, replace: string, waitForRunEnd?: true];

/**
 * Where a quote opens: the start of a block, whitespace, an inline element, or an opening bracket or quote.
 */
const OPENERS = String.raw`(?<=^|[\s([{<'"“‘${INLINE_PLACEHOLDER}])`;

/**
 * `^2` for `²`, only right after a digit and at the end of a run (`2^2`, not `x^2` or `10^23`). `^o` for a degree sign.
 */
const SUPERSCRIPTS: readonly Replacement[] = [...'0123456789o+-'].map((character, index): Replacement => {
    const glyph = '⁰¹²³⁴⁵⁶⁷⁸⁹°⁺⁻'.charAt(index);
    if (/\d/.test(character)) {
        return [new RegExp(String.raw`(?<=\d)\^${character}`), glyph, true];
    }
    return [`^${character}`, glyph];
});

/**
 * `1/2` for `½`. Not right after a digit or a slash, so dates (`11/2`) and
 * paths (`/1/2`) stay as typed, and so does `1/25`: it waits for the run to end.
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
).map(([fraction, glyph]): Replacement => [new RegExp(`(?<![\\d/])${fraction}`), glyph, true]);

/**
 * The rules of each group, in the order they are tried: `<->` before `->`, which
 * ignores a leading hyphen so `-->` stays. A quote opens at the start of a block
 * or after whitespace, a bracket or another quote; otherwise it closes.
 */
const RULES: Record<TypographyGroup, readonly Replacement[]> = {
    quotes: [
        [new RegExp(`${OPENERS}"`), '“'],
        ['"', '”'],
        [new RegExp(`${OPENERS}'`), '‘'],
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
    numeric: [...SUPERSCRIPTS, ...FRACTIONS, [/(?<![\p{L}\p{N}_])(?!0x)(\d+)x(\d+)/u, '$1×$2', true]],
};

const toRule = ([match, replace, waitForRunEnd]: Replacement): RteInputRule => ({
    kind: 'text',
    match,
    replace,
    waitForRunEnd,
});

/**
 * Typographic shortcuts, rewritten as they are typed: `->` becomes `→`, `(c)`
 * becomes `©`, `1/2` becomes `½`, a straight quote becomes a curly one.
 * Backspace right after takes one back. Text in inline code is left alone. No
 * toolbar and no document types: only typing rules. `groups` keeps only some.
 * @example
 * typographyPlugin({ groups: ['quotes', 'dashes'] })
 */
export const typographyPlugin = ({ groups = TYPOGRAPHY_GROUPS }: TypographyPluginOptions = {}) =>
    definePlugin({
        id: 'typography',
        // In the fixed order, so how the host lists the groups never changes which rule goes first.
        inputRules: TYPOGRAPHY_GROUPS.filter((group) => groups.includes(group)).flatMap((group) =>
            RULES[group].map(toRule),
        ),
    });
