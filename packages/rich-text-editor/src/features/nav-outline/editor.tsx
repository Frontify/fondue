/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/plugin';

import { outline } from './feature';
import { OutlinePanel } from './outline-panel';

const PANEL = 'outline';

/** `outline.toggle` shows or hides the outline panel; choosing a heading moves the selection and changes nothing. */
export const outlineEditor = defineEditorPart(outline, {
    needs: ['panels'],
    commands: {
        'outline.toggle': {
            readOnly: true,
            run: (api) => {
                api.panels.toggle(PANEL);
                return true;
            },
        },
    },
    toolbar: [
        {
            id: 'outline',
            kind: 'toggle',
            command: 'outline.toggle',
            labelKey: 'RichTextEditor_outline',
            icon: 'IconListIndented',
            panel: PANEL,
        },
    ],
    panels: [{ control: PANEL, component: OutlinePanel }],
});
