/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatUnderline } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import { declaresDecoration } from '../shared/helpers/declaredStyle';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type UnderlineMark = {
    underline?: true;
};

/** Underlined text: `<u>`. */
export const underlineContent = /* @__PURE__ */ defineContent({
    marks: {
        underline: /* @__PURE__ */ defineMark({
            tag: 'u',
            // A span with the decoration is underlined too: how Google Docs writes it.
            parse: [
                { tag: 'u' },
                { tag: 'span', value: (element) => (declaresDecoration(element, 'underline') ? {} : null) },
            ],
        }),
    },
});

/** Underlined text: `<u>` and `Mod-u`. */
export const underlinePlugin = /* @__PURE__ */ definePlugin({
    content: underlineContent,
    toolbar: [{ icon: IconTextFormatUnderline, shortcut: 'Mod-u' }],
});
