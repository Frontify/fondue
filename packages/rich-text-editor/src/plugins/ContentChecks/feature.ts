/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/**
 * Accessibility checks of the content, which `findContentIssues` runs the same way outside the editor. The issues
 * panel lists what they find and the surface marks it while the panel is open; nothing they find is stored, and no
 * save waits for them. `enclosingHeadingLevel`, the host page's heading level around the editor, is what the first
 * heading's level is checked against; without it the first heading is exempt.
 */
export const contentChecks = defineFeature({
    id: 'a11y.content-checks',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    options: {
        enclosingHeadingLevel: { type: 'integer', min: 1, max: 6, nullable: true, default: null },
    },
    formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
});
