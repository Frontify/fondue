/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/** Numbered lists as `ordered_list`, whose `start` its toggle and its numbering dialog set. */
export const orderedList = defineFeature({
    id: 'lists.ordered',
    version: 1,
    requires: [{ id: 'lists.item', version: 1 }],
    nodes: {
        ordered_list: {
            group: 'block',
            content: 'list_item+',
            attrs: {
                start: { type: 'integer', min: 0, max: 1_000_000, default: 1 },
                marker: {
                    type: 'enum',
                    values: ['decimal', 'lower-alpha', 'upper-alpha', 'lower-roman', 'upper-roman'],
                    nullable: true,
                    default: null,
                },
            },
            html: ['ol', { start: { attr: 'start' }, 'data-marker': { attr: 'marker' } }, 0],
            parse: [{ tag: 'ol', attrs: { start: { from: 'start' }, marker: { from: 'data-marker' } } }],
        },
    },
    // Markdown has no marker style.
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
});
