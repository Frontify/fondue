/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatStrikethrough } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import { decorationLineRules } from '../shared/helpers/declaredStyle';

/**
 * The flag this plugin sets on text nodes
 */
export type StrikethroughMark = {
    /**
     * Whether the text is struck through. Present means on, and `true` is the only value.
     */
    strikethrough?: true;
};

/**
 * Struck-through text, written as `<s>`
 */
export const strikethroughContent = defineContent({
    marks: {
        strikethrough: defineMark({
            tag: 's',
            // A decorated element counts too, as Google Docs writes it; `text-decoration: none` never removes it, as in a browser.
            parse: [{ tag: 's' }, { tag: 'del' }, { tag: 'strike' }, ...decorationLineRules('line-through')],
        }),
    },
});

/**
 * Struck-through text with the `Mod-Shift-x` shortcut, and `~~text~~` while typing
 */
export const strikethroughPlugin = /* @__PURE__ */ definePlugin({
    content: strikethroughContent,
    toolbarGroup: 'marks',
    toolbar: [{ label: 'Strikethrough', icon: IconTextFormatStrikethrough, shortcut: 'Mod-Shift-x' }],
    inputRules: [{ delimiter: '~~' }],
});
