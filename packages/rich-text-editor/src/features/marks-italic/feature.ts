/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, toggleMark } from '#/model';

/** Emphasis as `em`, toggled on the selection or at the caret. */
export const italic = defineFeature({
    id: 'marks.italic',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    marks: {
        italic: {
            attrs: {},
            html: ['em', 0],
            parse: [{ tag: 'em' }, { tag: 'i' }, { style: 'font-style', value: 'italic' }],
            markdown: { open: '*', close: '*' },
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
    commands: { 'mark.italic.toggle': toggleMark('italic') },
    keys: { 'Mod-i': 'mark.italic.toggle' },
    inputRules: [
        { id: 'italic.star', kind: 'mark-delimiter', open: '*', close: '*', mark: 'italic' },
        { id: 'italic.underscore', kind: 'mark-delimiter', open: '_', close: '_', mark: 'italic' },
    ],
    toolbar: [
        {
            kind: 'toggle',
            command: 'mark.italic.toggle',
            labelKey: 'RichTextEditor_italic',
            icon: 'IconTextFormatItalic',
        },
    ],
});
