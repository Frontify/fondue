/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, toggleMark } from '#/model';

/** Subscript as `sub`; adding it removes `superscript` from the range. */
export const subscript = defineFeature({
    id: 'marks.subscript',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: {
        subscript: {
            attrs: {},
            html: ['sub', 0],
            parse: [{ tag: 'sub' }, { style: 'vertical-align', value: 'sub' }],
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
    commands: { 'mark.subscript.toggle': toggleMark('subscript', undefined, 'superscript') },
    keys: { 'Mod-,': 'mark.subscript.toggle' },
    toolbar: [
        {
            kind: 'toggle',
            command: 'mark.subscript.toggle',
            labelKey: 'RichTextEditor_subscript',
            icon: 'IconSubscript',
        },
    ],
});
