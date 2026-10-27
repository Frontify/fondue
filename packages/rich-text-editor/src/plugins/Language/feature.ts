/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

const DIRECTIONS = ['ltr', 'rtl', 'auto'] as const;

/** A passage's language and direction; text typed at a passage's end stays outside it. */
export const language = defineFeature({
    id: 'marks.language',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    options: {
        /**
         * The language tags the editor offers as choices; with none, the author types a tag.
         *
         * @default []
         */
        languages: { type: 'list', items: { type: 'language' }, default: [] },
    },
    marks: {
        language: {
            attrs: {
                lang: { type: 'language', required: true },
                dir: { type: 'enum', values: DIRECTIONS, nullable: true, default: null },
            },
            html: ['span', { lang: { attr: 'lang' }, dir: { attr: 'dir' } }, 0],
            parse: [{ tag: 'span[lang]', attrs: { lang: { from: 'lang' }, dir: { from: 'dir' } } }],
            inclusive: false,
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
});
