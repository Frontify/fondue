/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/** Clears formatting. The toolbar button clears blocks; Mod+\ clears inline marks only. */
export const resetFormatting = defineFeature({
    id: 'format.clear',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
});
