/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatStrikethrough } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import { hasDecorationLine } from '../shared/helpers/declaredStyle';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type StrikethroughMark = {
    strikethrough?: true;
};

/** Struck-through text: `<s>`. */
export const strikethroughContent = /* @__PURE__ */ defineContent({
    marks: {
        strikethrough: /* @__PURE__ */ defineMark({
            tag: 's',
            // An element with the decoration is struck through too: how Google Docs writes it.
            // No rule reads `text-decoration: none` as a removal: a browser cannot take an ancestor's line off.
            parse: [
                { tag: 's' },
                { tag: 'del' },
                { tag: 'strike' },
                {
                    style: 'text-decoration',
                    value: (value) => (hasDecorationLine(value, 'line-through') ? {} : null),
                },
                {
                    style: 'text-decoration-line',
                    value: (value) => (hasDecorationLine(value, 'line-through') ? {} : null),
                },
            ],
        }),
    },
});

/** Struck-through text: `Mod-Shift-x`, and `~~text~~` while typing. */
export const strikethroughPlugin = /* @__PURE__ */ definePlugin({
    content: strikethroughContent,
    toolbar: [{ icon: IconTextFormatStrikethrough, shortcut: 'Mod-Shift-x' }],
    inputRules: [{ delimiter: '~~' }],
});
