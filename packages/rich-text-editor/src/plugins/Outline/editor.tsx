/* (c) Copyright Frontify Ltd., all rights reserved. */

import { lazyPart } from '#/bridge/pluginApi/define';
import { defineEditorPart } from '#/bridge/pluginApi/plugin';

import { outline } from './feature';

const OutlinePanel = lazyPart(() => import('./components/OutlinePanel').then((loaded) => loaded.OutlinePanel));

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
