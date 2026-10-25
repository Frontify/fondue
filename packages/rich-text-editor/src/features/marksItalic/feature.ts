/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/** Emphasis as `em`; its editor part toggles it on the selection or at the caret. */
export const italic = defineFeature({
    id: 'marks.italic',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: {
        italic: {
            attrs: {},
            html: ['em', 0],
            parse: [{ tag: 'em' }, { tag: 'i' }, { style: 'font-style', value: 'italic' }],
            markdown: { open: '*', close: '*' },
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
});
