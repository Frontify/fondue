/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/** Superscript as `sup`; its editor part removes `subscript` from the range when it adds it. */
export const superscript = defineFeature({
    id: 'marks.superscript',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: {
        superscript: {
            attrs: {},
            html: ['sup', 0],
            parse: [{ tag: 'sup' }, { style: 'vertical-align', value: 'super' }],
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
});
