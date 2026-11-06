/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/core';

import { softBreakContent } from './content';

/**
 * Shift-Enter breaks the line without ending the block. No toolbar: the
 * keybinding is the whole feature.
 */
export const softBreakPlugin = definePlugin({
    id: 'soft-break',
    content: softBreakContent,
    hotkeys: { 'Shift-Enter': (api) => api.insert('break') },
});
