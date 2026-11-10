/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatItalic } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import { declaredStyle } from '../shared/helpers/declaredStyle';

/**
 * The flag this plugin sets on text nodes
 */
export type ItalicMark = {
    /**
     * Whether the text is italic. Present means on, and `true` is the only value.
     */
    italic?: true;
};

/**
 * Italic text, written as `<em>`
 */
export const italicContent = /* @__PURE__ */ defineContent({
    marks: {
        italic: /* @__PURE__ */ defineMark({
            tag: 'em',
            // A span with the style is italic too: how Google Docs writes it.
            parse: [
                { tag: 'em' },
                { tag: 'i' },
                { tag: 'span', value: (element) => (declaredStyle(element, 'font-style') === 'italic' ? {} : null) },
            ],
        }),
    },
});

/**
 * Italic text with the `Mod-i` shortcut, and `*text*` or `_text_` while typing
 */
export const italicPlugin = /* @__PURE__ */ definePlugin({
    content: italicContent,
    toolbar: [{ label: 'Italic', icon: IconTextFormatItalic, shortcut: 'Mod-i' }],
    // `_text_` is emphasis in markdown, as `*text*` is.
    inputRules: [{ delimiter: '*' }, { delimiter: '_' }],
});
