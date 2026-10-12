/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, openControl, reapplyMark, removeMark, setMark } from '#/model';

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
    commands: {
        'mark.font-color.set': setMark('font_color', {
            fields: { tokenId: { type: 'id' }, value: { type: 'color' } },
            exactlyOne: ['tokenId', 'value'],
            nullable: true,
        }),
        'mark.color.reapply': reapplyMark(['font_color', 'highlight']),
        'mark.color.clear': removeMark(['font_color', 'highlight']),
        'mark.color.menu.open': openControl('color-menu', {
            fields: { tokenIds: { type: 'list', items: { type: 'id' }, optional: true } },
        }),
    },
    keys: { 'Mod-Shift-h': 'mark.color.reapply' },
    toolbar: [
        { kind: 'button', command: 'mark.color.menu.open', labelKey: 'RichTextEditor_colorMenu', icon: 'IconColorFan' },
    ],
} as const;

const tokenColors = defineFeature({
    ...declaration,
    marks: {
        font_color: {
            attrs: { tokenId, value },
            exactlyOne: ['tokenId', 'value'],
            html: ['span', { 'data-rte-color': { attr: 'tokenId' } }, 0],
            parse: TOKEN_RULES,
            rank: -1,
        },
    },
});

const literalColors = defineFeature({
    ...declaration,
    marks: {
        font_color: {
            attrs: { tokenId, value },
            exactlyOne: ['tokenId', 'value'],
            html: ['span', { 'data-rte-color': { attr: 'tokenId' } }, 0],
            parse: LITERAL_RULES,
            rank: -1,
        },
    },
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
