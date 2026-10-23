/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/** Stands in for `media.image` until it ships: a leaf with an `assetId` and alternative text, whose chrome `view.tsx` adds. */
export const fixtureMediaImage = defineFeature({
    id: 'fixture.media-image',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        media_image: {
            group: 'block',
            atom: true,
            attrs: {
                nodeId: { type: 'string', required: true },
                assetId: { type: 'id', nullable: true, default: null },
                alt: { type: 'string', default: '' },
            },
            html: ['figure', { 'data-media-image': { attr: 'nodeId' } }],
            parse: [],
        },
    },
});
