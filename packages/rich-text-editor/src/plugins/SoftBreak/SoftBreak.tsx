/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineInline, definePlugin } from '#/core';

/** A line break inside a block: the void inline this plugin adds. */
export type BreakInline = {
    type: 'break';
};

/** A line break: `<br>`. */
export const softBreakContent = /* @__PURE__ */ defineContent({
    inlines: {
        break: /* @__PURE__ */ defineInline({
            toHtml: () => ({ tag: 'br' }),
            parse: [{ tag: 'br' }],
        }),
    },
});

/**
 * Shift-Enter breaks the line without ending the block. No toolbar: the
 * keybinding is the whole feature.
 */
export const softBreakPlugin = /* @__PURE__ */ definePlugin({
    id: 'soft-break',
    content: softBreakContent,
    hotkeys: { 'Shift-Enter': (api) => api.insert('break') },
});
