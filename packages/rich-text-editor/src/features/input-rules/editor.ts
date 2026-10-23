/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPlugin } from '#/bridge/plugin';
import { type InputRule, textRule } from '#/model';

import { inputRules, TYPOGRAPHY, type Typography } from './feature';

// A numeric token is whole when a space or the block start comes before it and the typed space after it.
const numeric = (name: string, match: string, replace: string) =>
    textRule({
        id: `typography.numeric.${name}`,
        match: new RegExp(String.raw`(?<=^|\s)${match} $`, 'u'),
        replace,
    });

const SUBSCRIPT_DIGITS = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'] as const;

/** The `typography.*` rules, by the option value that turns them on. */
const RULES: Readonly<Record<Typography, readonly InputRule[]>> = {
    'typography.quotes': [
        { id: 'typography.quotes.double', kind: 'quotes', marker: '"' },
        { id: 'typography.quotes.single', kind: 'quotes', marker: "'" },
    ],
    'typography.ellipsis': [{ id: 'typography.ellipsis', kind: 'text-replace', find: '...', replace: '…' }],
    'typography.dashes': [
        { id: 'typography.dashes', kind: 'text-replace', find: '--', replace: '–', boundary: 'word' },
    ],
    'typography.symbols': [
        { id: 'typography.symbols.copyright', kind: 'text-replace', find: '(c)', replace: '©' },
        { id: 'typography.symbols.registered', kind: 'text-replace', find: '(r)', replace: '®' },
        { id: 'typography.symbols.trademark', kind: 'text-replace', find: '(tm)', replace: '™' },
        { id: 'typography.symbols.service-mark', kind: 'text-replace', find: '(sm)', replace: '℠' },
        { id: 'typography.symbols.plus-minus', kind: 'text-replace', find: '+/-', replace: '±' },
        { id: 'typography.symbols.not-equal', kind: 'text-replace', find: '!=', replace: '≠' },
        { id: 'typography.symbols.left-guillemet', kind: 'text-replace', find: '<<', replace: '«' },
        { id: 'typography.symbols.right-guillemet', kind: 'text-replace', find: '>>', replace: '»' },
        // `<->` precedes `->`, `<-` waits for a following character other than `>`, and `->` ignores a leading hyphen so `-->` stays.
        { id: 'typography.symbols.both-arrow', kind: 'text-replace', find: '<->', replace: '↔' },
        textRule({ id: 'typography.symbols.right-arrow', match: /(?<!-)->$/u, replace: '→' }),
        { id: 'typography.symbols.left-arrow', kind: 'text-replace', find: '<-', replace: '←', boundary: 'word' },
    ],
    'typography.numeric': [
        numeric('half', String.raw`1\/2`, '½ '),
        numeric('quarter', String.raw`1\/4`, '¼ '),
        numeric('three-quarters', String.raw`3\/4`, '¾ '),
        numeric('squared', String.raw`(\d+)\^2`, '$1² '),
        numeric('cubed', String.raw`(\d+)\^3`, '$1³ '),
        numeric('times', String.raw`(\d+)x(\d+)`, '$1×$2 '),
        ...SUBSCRIPT_DIGITS.map((digit, index) => numeric(`subscript-${index}`, `~${index}`, `${digit} `)),
    ],
};

/** Applies the typography rules that the `typography` option lists; every other rule is in its own feature. */
export const inputRulesEditor = defineEditorPlugin(inputRules, (options) => {
    const typography = options.typography as readonly string[];
    return {
        inputRules: TYPOGRAPHY.filter((group) => typography.includes(group)).flatMap((group) => RULES[group]),
    };
});
