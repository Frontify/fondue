/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatUnderline } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import { hasDecorationLine } from '../shared/helpers/declaredStyle';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type UnderlineMark = {
    underline?: true;
};

/** Underlined text: `<u>`. */
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

/** Underlined text: `<u>` and `Mod-u`. */
export const underlinePlugin = /* @__PURE__ */ definePlugin({
    content: underlineContent,
    toolbar: [{ icon: IconTextFormatUnderline, shortcut: 'Mod-u' }],
});
