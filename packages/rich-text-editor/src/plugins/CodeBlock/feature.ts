/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

const languageId = { type: 'id', nullable: true, default: null } as const;

/**
 * Code blocks as `code_block`. The text keeps spaces, tabs and newlines, and `languageId` names a language.
 * A null `languageId` is plain text.
 */
export const codeBlock = defineFeature({
    id: 'blocks.code',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        code_block: {
            group: 'block',
            content: 'text*',
            marks: [],
            whitespace: 'pre',
            attrs: { languageId },
            html: ['pre', { 'data-language': { attr: 'languageId' } }, ['code', 0]],
            parse: [{ tag: 'pre', attrs: { languageId: { from: 'data-language' } } }],
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
});
