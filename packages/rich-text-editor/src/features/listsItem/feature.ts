/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/** The `list_item` of bullet and ordered lists; its editor part nests, outdents and splits items. */
export const listItem = defineFeature({
    id: 'lists.item',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        list_item: {
            content: 'paragraph block*',
            attrs: {},
            html: ['li', 0],
            parse: [{ tag: 'li:not([data-checked])' }],
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
});
