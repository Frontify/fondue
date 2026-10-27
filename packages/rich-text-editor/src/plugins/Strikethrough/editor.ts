/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toggleMark } from '#/bridge/pluginApi/define';
import { defineEditorPart } from '#/bridge/pluginApi/plugin';

import { strikethrough } from './feature';

/** Toggles strikethrough on the selection or at the caret, from Mod+Shift+X, `~~`, or the toolbar. */
export const strikeEditor = defineEditorPart(
    strikethrough,
    toggleMark({
        mark: 'strike',
        keys: ['Mod-Shift-x'],
        inputRules: [{ id: 'strike.tildes', open: '~~', close: '~~' }],
        toolbar: { labelKey: 'RichTextEditor_strike', icon: 'IconTextFormatStrikethrough' },
    }),
);
