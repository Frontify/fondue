/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/**
 * Stands in for `media.embed` until it ships: an `embed` atom with its `title`, whose `embed.edit` is in `editors.ts`,
 * so the content checks meet an embed with and without a title. Never in the registry or a profile.
 */
export const fixtureEmbed = defineFeature({
    id: 'media.embed',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        embed: {
            group: 'block',
            atom: true,
            attrs: {
                nodeId: { type: 'string', required: true },
                url: { type: 'string', required: true },
                title: { type: 'string', nullable: true, default: null },
            },
            html: ['div', { 'data-embed': { attr: 'url' } }],
            parse: [],
        },
    },
});
