/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toggleMark } from '#/bridge/pluginApi/define';
import { defineEditorPart } from '#/bridge/pluginApi/plugin';

import { bold } from './feature';

/** Toggles bold on the selection or at the caret, from Mod+B, `**` and `__`, or the toolbar. */
export const boldEditor = defineEditorPart(
    bold,
    toggleMark({
        mark: 'bold',
        keys: ['Mod-b'],
        inputRules: [
            { id: 'bold.stars', open: '**', close: '**' },
            { id: 'bold.underscores', open: '__', close: '__' },
        ],
        toolbar: { labelKey: 'RichTextEditor_bold', icon: 'IconTextFormatBold', bubble: true },
    }),
);
