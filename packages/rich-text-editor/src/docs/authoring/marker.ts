/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart, definePlugin } from '#/index';
import { defineFeature } from '#/model';

const marker = defineFeature({
    id: 'acme.marker',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: {
        marker: { attrs: {}, html: ['mark', 0], parse: [{ tag: 'mark' }] },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
});

/** A host mark whose feature and editor part share one file, because no server reads its content. */
export const markerPlugin = definePlugin({
    feature: marker,
    editor: defineEditorPart(marker, {
        commands: {
            'mark.marker.toggle': {
                run: (api) => api.marks.toggle('marker'),
                active: (api) => api.marks.active('marker'),
            },
        },
        toolbar: [
            {
                id: 'marker',
                kind: 'toggle',
                command: 'mark.marker.toggle',
                label: { 'en-US': 'Marker' },
                icon: 'IconPen',
            },
        ],
    }),
});
