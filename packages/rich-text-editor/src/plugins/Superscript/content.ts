/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineMark } from '#/core';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type SuperscriptMark = {
    superscript?: true;
};

/** Superscript text: `<sup>`. */
export const superscriptContent = defineContent({
    marks: {
        superscript: defineMark({ tag: 'sup' }),
    },
});
