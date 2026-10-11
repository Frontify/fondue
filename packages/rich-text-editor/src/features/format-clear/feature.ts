/* (c) Copyright Frontify Ltd., all rights reserved. */

import { clearFormatting, defineFeature } from '#/model';

/** Clears formatting. The toolbar button clears blocks; Mod+\ clears inline marks only. */
export const formatClear = defineFeature({
    id: 'format.clear',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
    commands: {
        'format.clear': clearFormatting('all'),
        'format.inline.clear': clearFormatting('inline'),
    },
    keys: { 'Mod-\\': 'format.inline.clear' },
    toolbar: [
        {
            kind: 'button',
            command: 'format.clear',
            labelKey: 'RichTextEditor_clearFormatting',
            icon: 'IconEraser',
        },
    ],
});
