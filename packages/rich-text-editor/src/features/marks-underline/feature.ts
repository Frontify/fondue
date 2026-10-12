/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, toggleMark } from '#/model';

/** Underlined text as `u`, which Markdown cannot hold. */
export const underline = defineFeature({
    id: 'marks.underline',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: {
        underline: {
            attrs: {},
            html: ['u', 0],
            parse: [{ tag: 'u' }, { style: 'text-decoration', value: 'underline' }],
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
    commands: { 'mark.underline.toggle': toggleMark('underline') },
    keys: { 'Mod-u': 'mark.underline.toggle' },
    toolbar: [
        {
            kind: 'toggle',
            command: 'mark.underline.toggle',
            labelKey: 'RichTextEditor_underline',
            icon: 'IconTextFormatUnderline',
        },
    ],
});
