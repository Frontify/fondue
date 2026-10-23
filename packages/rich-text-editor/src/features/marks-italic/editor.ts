/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPlugin } from '#/bridge/plugin';

import { italic } from './feature';

/** Toggles italic on the selection or at the caret, from Mod+I, `*` and `_`, or the toolbar. */
export const italicEditor = defineEditorPlugin(italic, {
    commands: {
        'mark.italic.toggle': {
            run: (api) => api.marks.toggle('italic'),
            active: (api) => api.marks.active('italic'),
        },
    },
    keys: { 'Mod-i': 'mark.italic.toggle' },
    inputRules: [
        { id: 'italic.star', kind: 'mark-delimiter', open: '*', close: '*', mark: 'italic' },
        { id: 'italic.underscore', kind: 'mark-delimiter', open: '_', close: '_', mark: 'italic' },
    ],
    toolbar: [
        {
            id: 'italic',
            kind: 'toggle',
            command: 'mark.italic.toggle',
            labelKey: 'RichTextEditor_italic',
            icon: 'IconTextFormatItalic',
        },
    ],
});
