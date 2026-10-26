/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/pluginApi/plugin';

import { superscript } from './feature';

/** Toggles superscript on the selection or at the caret, from Mod+Period or the toolbar; adding it removes subscript. */
export const superscriptEditor = defineEditorPart(superscript, {
    needs: ['marks'],
    commands: {
        'mark.superscript.toggle': {
            run: (api) => {
                if (!api.marks.allowed('superscript')) {
                    return false;
                }

                // Adding the mark takes the other one off in the same undo step.
                if (api.marks.active('superscript') !== true) {
                    api.marks.remove('subscript');
                }

                return api.marks.toggle('superscript');
            },
            active: (api) => api.marks.active('superscript'),
        },
    },
    keys: { 'Mod-.': 'mark.superscript.toggle' },
    toolbar: [
        {
            id: 'superscript',
            kind: 'toggle',
            command: 'mark.superscript.toggle',
            labelKey: 'RichTextEditor_superscript',
            icon: 'IconSuperscript',
        },
    ],
});
