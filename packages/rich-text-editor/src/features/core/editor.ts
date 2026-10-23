/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPlugin } from '#/bridge/plugin';

import { core } from './feature';

/** Sets a paragraph, inserts text, and undoes and redoes. */
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
        'history.undo': { run: (api) => api.history.undo(), enabled: (api) => api.history.canUndo() },
        'history.redo': { run: (api) => api.history.redo(), enabled: (api) => api.history.canRedo() },
    },
    keys: {
        'mac:Mod-Alt-0': 'paragraph.set',
        'other:Ctrl-Shift-0': 'paragraph.set',
        'Mod-z': 'history.undo',
        'Mod-Shift-z': 'history.redo',
        'other:Ctrl-y': 'history.redo',
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
