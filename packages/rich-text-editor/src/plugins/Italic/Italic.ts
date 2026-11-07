/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatItalic } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type ItalicMark = {
    italic?: true;
};

/** Italic text: `<em>`. */
export const italicContent = /* @__PURE__ */ defineContent({
    marks: {
        italic: /* @__PURE__ */ defineMark({
            tag: 'em',
            // An element with the style is italic too: how Google Docs writes it.
            parse: [
                { tag: 'em' },
                { tag: 'i' },
                { style: 'font-style', value: (value) => (/^(italic|oblique)\b/i.test(value) ? {} : null) },
                { style: 'font-style', clears: (value) => value.trim().toLowerCase() === 'normal' },
            ],
        }),
    },
});

/** Italic text: `Mod-i`, and `*text*` or `_text_` while typing. */
export const italicPlugin = /* @__PURE__ */ definePlugin({
    content: italicContent,
    toolbar: [{ icon: IconTextFormatItalic, shortcut: 'Mod-i' }],
    // `_text_` is emphasis in markdown, as `*text*` is.
    inputRules: [{ delimiter: '*' }, { delimiter: '_' }],
});
