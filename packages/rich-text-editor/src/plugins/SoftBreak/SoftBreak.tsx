/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineInline, definePlugin } from '#/core';

/** A line break inside a block — the void inline this plugin adds. */
export type BreakInline = {
    type: 'break';
};

/**
 * Shift-Enter breaks the line without ending the block. No toolbar: the
 * keybinding is the whole feature.
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
