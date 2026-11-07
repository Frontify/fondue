/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSubscript } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type SubscriptMark = {
    subscript?: true;
};

/** Subscript text: `<sub>`. */
export const subscriptContent = /* @__PURE__ */ defineContent({
    marks: {
        subscript: /* @__PURE__ */ defineMark({ tag: 'sub' }),
    },
});

/** Subscript text: `<sub>` and `Mod-,`. */
export const subscriptPlugin = /* @__PURE__ */ definePlugin({
    content: subscriptContent,
    toolbar: [{ icon: IconSubscript, shortcut: 'Mod-,' }],
});
