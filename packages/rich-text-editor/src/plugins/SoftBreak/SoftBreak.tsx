/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineInline, definePlugin } from '#/core';

/**
 * The void inline this plugin adds, a line break inside a block
 */
export type BreakInline = {
    type: 'break';
};

/**
 * A line break, written as `<br>`
 */
export const softBreakContent = defineContent({
    inlines: {
        break: defineInline({
            toHtml: () => ({ tag: 'br' }),
            parse: [{ tag: 'br' }],
        }),
    },
});

/**
 * Breaks the line without ending the block with `Shift-Enter`, and has no toolbar button
 */
export const softBreakPlugin = /* @__PURE__ */ definePlugin({
    id: 'soft-break',
    content: softBreakContent,
    hotkeys: { 'Shift-Enter': (api) => api.insert('break') },
});
