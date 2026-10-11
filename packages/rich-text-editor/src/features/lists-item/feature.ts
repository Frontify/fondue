/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, indentItem, outdentItem } from '#/model';

/** The `list_item` of bullet and ordered lists, which Tab and Mod-] nest under the previous item and Shift-Tab and Mod-[ outdent. */
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
    commands: { 'list.indent': indentItem('list_item'), 'list.outdent': outdentItem('list_item') },
    keys: { 'Mod-]': 'list.indent', Tab: 'list.indent', 'Mod-[': 'list.outdent', 'Shift-Tab': 'list.outdent' },
});
