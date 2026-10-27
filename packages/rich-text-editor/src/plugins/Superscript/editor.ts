/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toggleMark } from '#/bridge/pluginApi/define';
import { defineEditorPart } from '#/bridge/pluginApi/plugin';

import { superscript } from './feature';

/** Toggles superscript on the selection or at the caret, from Mod+Period or the toolbar; adding it removes subscript. */
export const superscriptEditor = defineEditorPart(
    superscript,
    toggleMark({
        mark: 'superscript',
        replaces: 'subscript',
        keys: ['Mod-.'],
        toolbar: { labelKey: 'RichTextEditor_superscript', icon: 'IconSuperscript' },
    }),
);
