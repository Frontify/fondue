/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPlugin } from '#/bridge/plugin';

import { core } from './feature';

/** Sets a paragraph and inserts text. */
export const coreEditor = defineEditorPlugin(core, {
    commands: {
        'paragraph.set': {
            run: (api) => api.blocks.set('paragraph'),
            active: (api) => api.blocks.active('paragraph'),
        },
        'text.insert': {
            payload: { fields: { text: { type: 'string' } } },
            run: (api, payload: { readonly text: string }) => api.insert.text(payload.text),
        },
    },
    keys: {
        'mac:Mod-Alt-0': 'paragraph.set',
        'other:Ctrl-Shift-0': 'paragraph.set',
    },
    toolbar: [
        {
            id: 'paragraph',
            kind: 'toggle',
            command: 'paragraph.set',
            labelKey: 'RichTextEditor_normalText',
            icon: 'IconTextBoxStack',
        },
    ],
});
