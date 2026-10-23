/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/** Subscript as `sub`; its editor part removes `superscript` from the range when it adds it. */
export const subscript = defineFeature({
    id: 'marks.subscript',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: {
        subscript: {
            attrs: {},
            html: ['sub', 0],
            parse: [{ tag: 'sub' }, { style: 'vertical-align', value: 'sub' }],
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
});
