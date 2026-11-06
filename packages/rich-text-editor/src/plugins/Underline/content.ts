/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineMark } from '#/core';

import { declaresDecoration } from '../shared/helpers/declaredStyle';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type UnderlineMark = {
    underline?: true;
};

/** Underlined text: `<u>`. */
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
