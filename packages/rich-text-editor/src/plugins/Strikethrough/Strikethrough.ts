/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatStrikethrough } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import { declaresDecoration } from '../shared/helpers/declaredStyle';

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
export const strikethroughContent = /* @__PURE__ */ defineContent({
    marks: {
        strikethrough: /* @__PURE__ */ defineMark({
            tag: 's',
            // A span with the decoration is struck through too: how Google Docs writes it.
            parse: [
                { tag: 's' },
                { tag: 'del' },
                { tag: 'strike' },
                { tag: 'span', value: (element) => (declaresDecoration(element, 'line-through') ? {} : null) },
            ],
        }),
    },
});

/**
 * Struck-through text with the `Mod-Shift-x` shortcut, and `~~text~~` while typing
 */
export const strikethroughPlugin = /* @__PURE__ */ definePlugin({
    content: strikethroughContent,
    toolbar: [{ label: 'Strikethrough', icon: IconTextFormatStrikethrough, shortcut: 'Mod-Shift-x' }],
    inputRules: [{ delimiter: '~~' }],
});
