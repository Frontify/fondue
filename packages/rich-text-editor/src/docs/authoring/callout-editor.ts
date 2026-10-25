/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/index';

import { callout } from './callout-feature';
import { calloutView } from './callout-view';

/** Wraps the selected blocks in a callout, or lifts them out of one, from the toolbar. */
export const calloutEditor = defineEditorPart(callout, {
    needs: ['blocks'],
    commands: {
        'callout.toggle': {
            run: (api) => api.blocks.wrap('callout'),
            active: (api) => api.blocks.active('callout'),
        },
    },
    toolbar: [
        {
            id: 'callout',
            kind: 'toggle',
            command: 'callout.toggle',
            label: { 'en-US': 'Callout' },
            icon: 'IconInfo',
        },
    ],
    views: [calloutView],
});
