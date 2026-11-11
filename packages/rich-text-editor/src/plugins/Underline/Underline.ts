/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatUnderline } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import { hasDecorationLine } from '../shared/helpers/declaredStyle';

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
            parse: [
                { tag: 'u' },
                { style: 'text-decoration', value: (value) => (hasDecorationLine(value, 'underline') ? {} : null) },
                {
                    style: 'text-decoration-line',
                    value: (value) => (hasDecorationLine(value, 'underline') ? {} : null),
                },
            ],
        }),
    },
});

/**
 * Underlined text with the `Mod-u` shortcut
 */
export const underlinePlugin = /* @__PURE__ */ definePlugin({
    content: underlineContent,
    toolbarGroup: 'marks',
    toolbar: [{ label: 'Underline', icon: IconTextFormatUnderline, shortcut: 'Mod-u' }],
});
