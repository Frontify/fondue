/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toggleMark } from '#/bridge/pluginApi/define';
import { defineEditorPart } from '#/bridge/pluginApi/plugin';

import { code } from './feature';

/** Toggles inline code on the selection or at the caret, from Mod+E, backticks, or the toolbar. */
export const codeEditor = defineEditorPart(
    code,
    toggleMark({
        mark: 'code',
        keys: ['Mod-e'],
        inputRules: [{ id: 'code.backtick', open: '`', close: '`' }],
        toolbar: { labelKey: 'RichTextEditor_code', icon: 'IconCode' },
    }),
);
