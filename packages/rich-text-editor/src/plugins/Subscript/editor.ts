/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toggleMark } from '#/bridge/pluginApi/define';
import { defineEditorPart } from '#/bridge/pluginApi/plugin';

import { subscript } from './feature';

/** Toggles subscript on the selection or at the caret, from Mod+Comma or the toolbar; adding it removes superscript. */
export const subscriptEditor = defineEditorPart(
    subscript,
    toggleMark({
        mark: 'subscript',
        replaces: 'superscript',
        keys: ['Mod-,'],
        toolbar: { labelKey: 'RichTextEditor_subscript', icon: 'IconSubscript' },
    }),
);
