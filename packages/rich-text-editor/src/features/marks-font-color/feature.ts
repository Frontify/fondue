/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

const tokenId = { type: 'id', nullable: true, default: null } as const;
const value = { type: 'color', nullable: true, default: null } as const;
// Package output names its token; a literal colour is read only with `literalColors`, already as `#rrggbb` or `#rrggbbaa`.
const TOKEN_RULES = [{ tag: 'span[data-rte-color]', attrs: { tokenId: { from: 'data-rte-color' } } }] as const;
const LITERAL_RULES = [
    ...TOKEN_RULES,
    { tag: 'span', attrs: { value: { fromStyle: 'color' } } },
    { tag: 'font', attrs: { value: { from: 'color' } } },
] as const;

const declaration = {
    id: 'marks.font-color',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    options: { literalColors: { type: 'boolean', default: false } },
    // Markdown and plain text keep the text and drop its colour.
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
} as const;

const fontColorMark = {
    attrs: { tokenId, value },
    exactlyOne: ['tokenId', 'value'],
    html: ['span', { 'data-rte-color': { attr: 'tokenId' } }, 0],
    rank: -1,
} as const;

const tokenColors = defineFeature({
    ...declaration,
    // Paste reads a literal colour back only with `literalColors`, so without it a stored one does not survive HTML.
    formats: { ...declaration.formats, html: 'lossy' },
    marks: { font_color: { ...fontColorMark, parse: TOKEN_RULES } },
});

const literalColors = defineFeature({
    ...declaration,
    marks: { font_color: { ...fontColorMark, parse: LITERAL_RULES } },
});

/**
 * Text colour as `font_color`: a presentation colour token, or with `literalColors` any colour, which pasted HTML then
 * keeps too. One "A" menu sets text and highlight colours and Clear removes both; Mod+Shift+H sets the last colour again.
 */
export const fontColor: typeof tokenColors = (options) => {
    if (options?.literalColors === true) {
        return literalColors(options);
    }
    return tokenColors(options);
};
