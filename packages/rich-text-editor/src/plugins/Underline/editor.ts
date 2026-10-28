/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toggleMark } from '#/bridge/pluginApi/define';
import { defineEditorPart } from '#/bridge/pluginApi/plugin';

import { underline } from './feature';

/** Toggles underline on the selection or at the caret, from Mod+U or the toolbar. */
export const underlineEditor = defineEditorPart(
    underline,
    toggleMark({
        mark: 'underline',
        keys: ['Mod-u'],
        toolbar: { labelKey: 'RichTextEditor_underline', icon: 'IconTextFormatUnderline', group: 'marks' },
    }),
);
