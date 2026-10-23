/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPlugin } from '#/bridge/plugin';

import { bold } from './feature';

/** Toggles bold on the selection or at the caret, from Mod+B, `**` and `__`, or the toolbar. */
export const boldEditor = defineEditorPlugin(bold, {
    commands: {
        'mark.bold.toggle': {
            run: (api) => api.marks.toggle('bold'),
            active: (api) => api.marks.active('bold'),
        },
    },
    keys: { 'Mod-b': 'mark.bold.toggle' },
    inputRules: [
        { id: 'bold.stars', kind: 'mark-delimiter', open: '**', close: '**', mark: 'bold' },
        { id: 'bold.underscores', kind: 'mark-delimiter', open: '__', close: '__', mark: 'bold' },
    ],
    toolbar: [
        {
            id: 'bold',
            kind: 'toggle',
            command: 'mark.bold.toggle',
            labelKey: 'RichTextEditor_bold',
            icon: 'IconTextFormatBold',
            bubble: true,
        },
    ],
});
