/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatUnderline } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import { decorationLineRules } from '../shared/helpers/declaredStyle';
import * as TOOLBAR_GROUPS from '../shared/toolbarGroups';

/**
 * The flag this plugin sets on text nodes
 */
export type UnderlineMark = {
    /**
     * Whether the text is underlined. Present means on, and `true` is the only value.
     */
    underline?: true;
};

/**
 * Underlined text, written as `<u>`
 */
export const underlineContent = defineContent({
    marks: {
        underline: defineMark({
            tag: 'u',
            // A decorated element counts too, as Google Docs writes it; `text-decoration: none` never removes it, as in a browser.
            parse: [{ tag: 'u' }, ...decorationLineRules('underline')],
        }),
    },
});

/**
 * Underlined text with the `Mod-u` shortcut
 */
export const underlinePlugin = /* @__PURE__ */ definePlugin({
    content: underlineContent,
    toolbarGroup: TOOLBAR_GROUPS.marks,
    toolbar: [{ label: 'Underline', icon: IconTextFormatUnderline, shortcut: 'Mod-u' }],
});
