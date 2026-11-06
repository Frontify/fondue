/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineMark } from '#/core';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type SubscriptMark = {
    subscript?: true;
};

/** Subscript text: `<sub>`. */
export const subscriptContent = defineContent({
    marks: {
        subscript: defineMark({ tag: 'sub' }),
    },
});
