/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/**
 * Stands in for `marks.highlight`, which ships in 1.x, with its mark and parse rules, and its command in `editors.ts`,
 * so the colour menu, reapply, Clear, the output and paste run against a highlight. Never in the registry or a profile.
 */
const declaration = {
    id: 'marks.highlight',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    options: { literalColors: { type: 'boolean', default: false } },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
} as const;
const attrs = {
    tokenId: { type: 'id', nullable: true, default: null },
    value: { type: 'color', nullable: true, default: null },
} as const;
const TOKEN_RULES = [{ tag: 'mark[data-rte-color]', attrs: { tokenId: { from: 'data-rte-color' } } }] as const;

const tokenHighlight = defineFeature({
    ...declaration,
    marks: {
        highlight: {
            attrs,
            exactlyOne: ['tokenId', 'value'],
            html: ['mark', { 'data-rte-color': { attr: 'tokenId' } }, 0],
            parse: TOKEN_RULES,
            rank: -1,
        },
    },
});

const literalHighlight = defineFeature({
    ...declaration,
    marks: {
        highlight: {
            attrs,
            exactlyOne: ['tokenId', 'value'],
            html: ['mark', { 'data-rte-color': { attr: 'tokenId' } }, 0],
            parse: [
                ...TOKEN_RULES,
                { tag: 'mark', attrs: { value: { fromStyle: 'background-color' } } },
                { tag: 'span', attrs: { value: { fromStyle: 'background-color' } } },
            ],
            rank: -1,
        },
    },
});

export const fixtureHighlight: typeof tokenHighlight = (options) => {
    if (options?.literalColors === true) {
        return literalHighlight(options);
    }

    return tokenHighlight(options);
};
