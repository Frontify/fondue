/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSuperscript } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

/**
 * The flag this plugin sets on text nodes
 */
export type SuperscriptMark = {
    /**
     * Whether the text is superscript. Present means on, and `true` is the only value.
     */
    superscript?: true;
};

/**
 * Superscript text, written as `<sup>`
 */
export const superscriptContent = /* @__PURE__ */ defineContent({
    marks: {
        superscript: /* @__PURE__ */ defineMark({ tag: 'sup' }),
    },
});

/**
 * Superscript text with the `Mod-.` shortcut
 */
export const superscriptPlugin = /* @__PURE__ */ definePlugin({
    content: superscriptContent,
    toolbar: [{ label: 'Superscript', icon: IconSuperscript, shortcut: 'Mod-.' }],
});
