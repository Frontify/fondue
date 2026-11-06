/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineMark } from '#/core';

import { declaredStyle } from '../shared/helpers/declaredStyle';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type ItalicMark = {
    italic?: true;
};

/** Italic text: `<em>`. */
export const italicContent = defineContent({
    marks: {
        italic: defineMark({
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
