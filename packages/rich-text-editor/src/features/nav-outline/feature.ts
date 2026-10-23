/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/** A navigation list of the document's headings, which its editor part shows; it declares no content. */
export const outline = defineFeature({
    id: 'nav.outline',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
});
