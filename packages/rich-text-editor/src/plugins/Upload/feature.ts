/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/**
 * The upload slot behind images: a chosen, pasted or dropped file starts as an image with no `assetId`, one undo step,
 * whose progress the image chrome shows outside the document, with Cancel while it runs and Retry and Remove once it
 * failed or stopped. Cancel removes the slot and restores what it replaced, or gives a replaced image its previous
 * file back, as one undo step; the completion and Retry add none.
 */
export const mediaUpload = defineFeature({
    id: 'media.upload',
    version: 1,
    requires: [
        { id: 'core', version: 1 },
        { id: 'media.image', version: 1 },
    ],
    formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
});
