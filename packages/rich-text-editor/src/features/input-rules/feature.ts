/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, type InputRule, type TextRule, textRule } from '#/model';

const TYPOGRAPHY = [
    'typography.quotes',
    'typography.ellipsis',
    'typography.dashes',
    'typography.symbols',
    'typography.numeric',
] as const;
type Typography = (typeof TYPOGRAPHY)[number];

// A numeric token is whole when a space or the block start comes before it and the typed space after it (AC-077).
const numeric = (match: string, replace: string) =>
    textRule({ id: 'typography.numeric', match: new RegExp(String.raw`(?<=^|\s)${match} $`, 'u'), replace });

/** The `typography.*` rows of the Input rules table (SPEC-rich-text-editing). */
const RULES: readonly (InputRule | TextRule)[] = [
    { id: 'typography.quotes', kind: 'quotes', marker: '"' },
    { id: 'typography.quotes', kind: 'quotes', marker: "'" },
    { id: 'typography.ellipsis', kind: 'text-replace', find: '...', replace: '…' },
    { id: 'typography.dashes', kind: 'text-replace', find: '--', replace: '–', boundary: 'word' },
    { id: 'typography.symbols', kind: 'text-replace', find: '(c)', replace: '©' },
    { id: 'typography.symbols', kind: 'text-replace', find: '(r)', replace: '®' },
    { id: 'typography.symbols', kind: 'text-replace', find: '(tm)', replace: '™' },
    numeric(String.raw`1\/2`, '½ '),
    numeric(String.raw`1\/4`, '¼ '),
    numeric(String.raw`3\/4`, '¾ '),
    numeric(String.raw`(\d+)\^2`, '$1² '),
    numeric(String.raw`(\d+)\^3`, '$1³ '),
    numeric(String.raw`(\d+)x(\d+)`, '$1×$2 '),
];

/**
 * The typography input rules, each off until the `typography` option lists its ID; every other rule is in its own
 * feature. The option picks the rules, as Tiptap's Typography extension builds its rules from its options.
 */
export const inputRules = (options?: { readonly typography?: readonly Typography[] }) => {
    let typography: readonly string[] = [];
    if (options?.typography !== undefined) {
        typography = options.typography;
    }
    return defineFeature({
        id: 'input-rules',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        options: {
            typography: { type: 'list', items: { type: 'enum', values: TYPOGRAPHY }, default: [] },
        },
        formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
        inputRules: RULES.filter((rule) => typography.includes(rule.id)),
    })(options);
};
