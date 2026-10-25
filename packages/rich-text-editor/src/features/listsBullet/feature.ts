/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/** Bulleted lists as `bullet_list`, whose `marker` null follows the presentation's list levels. */
export const bulletList = defineFeature({
    id: 'lists.bullet',
    version: 1,
    requires: [{ id: 'lists.item', version: 1 }],
    nodes: {
        bullet_list: {
            group: 'block',
            content: 'list_item+',
            attrs: { marker: { type: 'enum', values: ['disc', 'circle', 'square'], nullable: true, default: null } },
            html: ['ul', { 'data-marker': { attr: 'marker' } }, 0],
            parse: [{ tag: 'ul:not([data-task-list])', attrs: { marker: { from: 'data-marker' } } }],
        },
    },
    // Markdown has no marker shape.
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
});
