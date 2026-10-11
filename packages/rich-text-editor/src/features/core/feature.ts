/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, insertText } from '#/model';

const lang = { type: 'language', nullable: true, default: null } as const;

/** The document, paragraphs, text and hard breaks that every model installs. */
export const core = defineFeature({
    id: 'core',
    version: 1,
    nodes: {
        doc: {
            content: 'section+',
            attrs: { lang, dir: { type: 'enum', values: ['ltr', 'rtl', 'auto'], default: 'auto' } },
            html: ['div', { lang: { attr: 'lang' }, dir: { attr: 'dir' } }, 0],
            parse: [],
        },
        paragraph: {
            group: 'block',
            content: 'inline*',
            attrs: { lang },
            html: ['p', { lang: { attr: 'lang' } }, 0],
            parse: [{ tag: 'p', attrs: { lang: { from: 'lang' } } }],
        },
        text: { group: 'inline', attrs: {}, html: ['span', 0], parse: [] },
        hard_break: { group: 'inline', attrs: {}, html: ['br'], parse: [{ tag: 'br' }] },
    },
    formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
    commands: { 'text.insert': insertText() },
});
