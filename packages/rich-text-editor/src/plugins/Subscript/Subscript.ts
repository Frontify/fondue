/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSubscript } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

/**
 * The flag this plugin sets on text nodes
 */
export type SubscriptMark = {
    /**
     * Whether the text is subscript. Present means on, and `true` is the only value.
     */
    subscript?: true;
};

/**
 * Subscript text, written as `<sub>`
 */
export const subscriptContent = /* @__PURE__ */ defineContent({
    marks: {
        subscript: /* @__PURE__ */ defineMark({ tag: 'sub' }),
    },
});

/**
 * Subscript text with the `Mod-,` shortcut
 */
export const subscriptPlugin = /* @__PURE__ */ definePlugin({
    content: subscriptContent,
    toolbar: [{ label: 'Subscript', icon: IconSubscript, shortcut: 'Mod-,' }],
});
