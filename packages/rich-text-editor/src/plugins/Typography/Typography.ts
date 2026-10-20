/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin, type RteInputRule } from '#/core';

type Replacement = readonly [match: string | RegExp, replace: string];

/** `--` for a dash, `...` for an ellipsis, `<<` and `>>` for guillemets. */
const PUNCTUATION: readonly Replacement[] = [
    ['--', '—'],
    ['...', '…'],
    ['>>', '»'],
    ['<<', '«'],
];

const ARROWS: readonly Replacement[] = [
    ['->', '→'],
    ['<-', '←'],
    ['=>', '⇒'],
    ['<=', '⇐'],
    ['≤=', '⇐'],
];

const LEGAL: readonly Replacement[] = [
    ['(tm)', '™'],
    ['(TM)', '™'],
    ['(r)', '®'],
    ['(R)', '®'],
    ['(c)', '©'],
    ['(C)', '©'],
];

/** `^2` for `²`, `^o` for a degree sign. */
const SUPERSCRIPTS: readonly Replacement[] = [...'0123456789o+-'].map(
    (character, index): Replacement => [`^${character}`, '⁰¹²³⁴⁵⁶⁷⁸⁹°⁺⁻'.charAt(index)],
);

/** `~2` for `₂`. Never right after a `~`, so a strikethrough's `~~` can open on a digit: `~~2~~`. */
const SUBSCRIPTS: readonly Replacement[] = [...'0123456789+-'].map(
    (character, index): Replacement => [new RegExp(`(?<!~)~[${character}]`), '₀₁₂₃₄₅₆₇₈₉₊₋'.charAt(index)],
);

/**
 * `1/2` for `½`. Not right after a digit or a slash, so dates (`11/2`) and
 * paths (`/1/2`) stay as typed.
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
).map(([fraction, glyph]): Replacement => [new RegExp(`(?<![\\d/])${fraction}`), glyph]);

const toRule = ([match, replace]: Replacement): RteInputRule => ({ kind: 'text', match, replace });

/**
 * Typographic shortcuts, rewritten as they are typed: `->` becomes `→`, `(c)`
 * becomes `©`, `1/2` becomes `½`. Backspace right after takes one back. Text in
 * inline code is left alone. No toolbar and no document types: only typing rules.
 */
export const typographyPlugin = (): RtePlugin => ({
    id: 'typography',
    inputRules: [...PUNCTUATION, ...ARROWS, ...LEGAL, ...SUBSCRIPTS, ...SUPERSCRIPTS, ...FRACTIONS].map(toRule),
});
