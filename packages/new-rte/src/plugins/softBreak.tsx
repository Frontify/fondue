/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

/** A line break inside a block — the void inline this plugin adds. */
export type BreakInline = {
    type: 'break';
};

/**
 * Shift-Enter breaks the line without ending the block. No toolbar: the
 * keybinding is the whole feature.
 */
export const SoftBreakPlugin: RtePlugin = {
    id: 'soft-break',
    schema: {
        inlines: [{ type: 'break', render: () => <br />, parseRules: [{ tag: 'br' }] }],
    },
    hotkeys: { 'Shift-Enter': (api) => api.insert('break') },
};
