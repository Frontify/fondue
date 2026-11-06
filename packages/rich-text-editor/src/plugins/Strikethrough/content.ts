/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineMark } from '#/core';

import { declaresDecoration } from '../shared/helpers/declaredStyle';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type StrikethroughMark = {
    strikethrough?: true;
};

/** Struck-through text: `<s>`. */
export const strikethroughContent = defineContent({
    marks: {
        strikethrough: defineMark({
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
