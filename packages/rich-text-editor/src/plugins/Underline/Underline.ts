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
export const underlineContent = /* @__PURE__ */ defineContent({
    marks: {
        underline: /* @__PURE__ */ defineMark({
            tag: 'u',
            // An element with the decoration is underlined too: how Google Docs writes it.
            // No rule reads `text-decoration: none` as a removal: a browser cannot take an ancestor's line off.
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
    toolbar: [{ icon: IconTextFormatUnderline, shortcut: 'Mod-u' }],
});
