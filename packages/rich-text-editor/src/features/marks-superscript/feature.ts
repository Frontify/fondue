/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, toggleMark } from '#/model';

/** Superscript as `sup`; adding it removes `subscript` from the range. */
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
    commands: { 'mark.superscript.toggle': toggleMark('superscript', undefined, 'subscript') },
    keys: { 'Mod-.': 'mark.superscript.toggle' },
    toolbar: [
        {
            kind: 'toggle',
            command: 'mark.superscript.toggle',
            labelKey: 'RichTextEditor_superscript',
            icon: 'IconSuperscript',
        },
    ],
});
