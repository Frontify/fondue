/* (c) Copyright Frontify Ltd., all rights reserved. */

import { lazyPart } from '#/bridge/define';
import { defineEditorPart } from '#/bridge/plugin';

import { contentChecks } from './feature';

const IssuesPanel = lazyPart(() => import('./IssuesPanel').then((loaded) => loaded.IssuesPanel));

const PANEL = 'checks';

/** `checks.open` opens the issues panel, or, while it is open, moves focus to the issue last acted on. */
export const contentChecksEditor = defineEditorPart(contentChecks, {
    needs: ['panels'],
    commands: {
        'checks.open': {
            readOnly: true,
            run: (api) => {
                api.panels.open(PANEL);

                return true;
            },
        },
    },
    toolbar: [
        {
            id: 'checks',
            kind: 'button',
            command: 'checks.open',
            labelKey: 'RichTextEditor_checks',
            icon: 'IconListCheck',
            opensOverlay: true,
        },
    ],
    panels: [{ control: PANEL, component: IssuesPanel }],
});
