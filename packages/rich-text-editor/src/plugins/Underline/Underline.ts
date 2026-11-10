/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatUnderline } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import { declaresDecoration } from '../shared/helpers/declaredStyle';

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
            // A span with the decoration is underlined too: how Google Docs writes it.
            parse: [
                { tag: 'u' },
                { tag: 'span', value: (element) => (declaresDecoration(element, 'underline') ? {} : null) },
            ],
        }),
    },
});

/**
 * Underlined text with the `Mod-u` shortcut
 */
export const underlinePlugin = /* @__PURE__ */ definePlugin({
    content: underlineContent,
    toolbar: [{ label: 'Underline', icon: IconTextFormatUnderline, shortcut: 'Mod-u' }],
});
