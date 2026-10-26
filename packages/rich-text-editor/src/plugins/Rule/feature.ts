/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/** Horizontal rules as `horizontal_rule`, a leaf block that the reader writes as `<hr>`. */
export const rule = defineFeature({
    id: 'blocks.rule',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        horizontal_rule: { group: 'block', attrs: {}, html: ['hr'], parse: [{ tag: 'hr' }] },
    },
    formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
});
