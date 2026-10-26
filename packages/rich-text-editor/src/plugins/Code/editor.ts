/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/pluginApi/plugin';

import { code } from './feature';

/** Toggles inline code on the selection or at the caret, from Mod+E, backticks, or the toolbar. */
export const codeEditor = defineEditorPart(code, {
    needs: ['marks'],
    commands: {
        'mark.code.toggle': {
            run: (api) => api.marks.toggle('code'),
            active: (api) => api.marks.active('code'),
        },
    },
    keys: { 'Mod-e': 'mark.code.toggle' },
    inputRules: [{ id: 'code.backtick', kind: 'mark-delimiter', open: '`', close: '`', mark: 'code' }],
    toolbar: [
        {
            id: 'code',
            kind: 'toggle',
            command: 'mark.code.toggle',
            labelKey: 'RichTextEditor_code',
            icon: 'IconCode',
        },
    ],
});
