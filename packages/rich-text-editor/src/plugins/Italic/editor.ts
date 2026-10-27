/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toggleMark } from '#/bridge/pluginApi/define';
import { defineEditorPart } from '#/bridge/pluginApi/plugin';

import { italic } from './feature';

/** Toggles italic on the selection or at the caret, from Mod+I, `*` and `_`, or the toolbar. */
export const italicEditor = defineEditorPart(
    italic,
    toggleMark({
        mark: 'italic',
        keys: ['Mod-i'],
        inputRules: [
            { id: 'italic.star', open: '*', close: '*' },
            { id: 'italic.underscore', open: '_', close: '_' },
        ],
        toolbar: { labelKey: 'RichTextEditor_italic', icon: 'IconTextFormatItalic' },
    }),
);
