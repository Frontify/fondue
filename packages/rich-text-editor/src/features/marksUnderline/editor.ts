/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/plugin';

import { underline } from './feature';

/** Toggles underline on the selection or at the caret, from Mod+U or the toolbar. */
export const underlineEditor = defineEditorPart(underline, {
    needs: ['marks'],
    commands: {
        'mark.underline.toggle': {
            run: (api) => api.marks.toggle('underline'),
            active: (api) => api.marks.active('underline'),
        },
    },
    keys: { 'Mod-u': 'mark.underline.toggle' },
    toolbar: [
        {
            id: 'underline',
            kind: 'toggle',
            command: 'mark.underline.toggle',
            labelKey: 'RichTextEditor_underline',
            icon: 'IconTextFormatUnderline',
        },
    ],
});
