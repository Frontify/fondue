/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/** A host block: a box of paragraphs with a tone, stored as `callout`. */
export const callout = defineFeature({
    id: 'acme.callout',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        callout: {
            group: 'block',
            content: 'paragraph+',
            attrs: {
                tone: { type: 'enum', values: ['note', 'warning'], default: 'note' },
            },
            html: ['aside', { 'data-tone': { attr: 'tone' } }, 0],
            parse: [{ tag: 'aside[data-tone]', attrs: { tone: { from: 'data-tone' } } }],
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
});
