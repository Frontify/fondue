/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/** The groups of typography rules the `typography` option can list. */
export const TYPOGRAPHY = [
    'typography.quotes',
    'typography.ellipsis',
    'typography.dashes',
    'typography.symbols',
    'typography.numeric',
] as const;
export type Typography = (typeof TYPOGRAPHY)[number];

/**
 * The typography input rules, each group off until the `typography` option lists it; every other rule is in its own
 * feature. The option picks the rules, as Tiptap's Typography extension builds its rules from its options.
 */
export const inputRules = (options?: {
    /**
     * The groups of typography rules to turn on.
     *
     * @default []
     */
    typography?: readonly Typography[];
}) =>
    defineFeature({
        id: 'input-rules',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        options: {
            typography: { type: 'list', items: { type: 'enum', values: TYPOGRAPHY }, default: [] },
        },
        formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
    })(options);
