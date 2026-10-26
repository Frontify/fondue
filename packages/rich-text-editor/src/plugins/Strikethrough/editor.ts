/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/plugin';

import { strike } from './feature';

/** Toggles strikethrough on the selection or at the caret, from Mod+Shift+X, `~~`, or the toolbar. */
export const strikeEditor = defineEditorPart(strike, {
    needs: ['marks'],
    commands: {
        'mark.strike.toggle': {
            run: (api) => api.marks.toggle('strike'),
            active: (api) => api.marks.active('strike'),
        },
    },
    keys: { 'Mod-Shift-x': 'mark.strike.toggle' },
    inputRules: [{ id: 'strike.tildes', kind: 'mark-delimiter', open: '~~', close: '~~', mark: 'strike' }],
    toolbar: [
        {
            id: 'strike',
            kind: 'toggle',
            command: 'mark.strike.toggle',
            labelKey: 'RichTextEditor_strike',
            icon: 'IconTextFormatStrikethrough',
        },
    ],
});
