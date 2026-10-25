/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/plugin';

import { subscript } from './feature';

/** Toggles subscript on the selection or at the caret, from Mod+Comma or the toolbar; adding it removes superscript. */
export const subscriptEditor = defineEditorPart(subscript, {
    commands: {
        'mark.subscript.toggle': {
            run: (api) => {
                if (!api.marks.allowed('subscript')) {
                    return false;
                }
                // Adding the mark takes the other one off in the same undo step.
                if (api.marks.active('subscript') !== true) {
                    api.marks.remove('superscript');
                }
                return api.marks.toggle('subscript');
            },
            active: (api) => api.marks.active('subscript'),
        },
    },
    keys: { 'Mod-,': 'mark.subscript.toggle' },
    toolbar: [
        {
            id: 'subscript',
            kind: 'toggle',
            command: 'mark.subscript.toggle',
            labelKey: 'RichTextEditor_subscript',
            icon: 'IconSubscript',
        },
    ],
});
