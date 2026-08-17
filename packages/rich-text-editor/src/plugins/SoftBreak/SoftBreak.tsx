/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/core';

/** A line break inside a block — the void inline this plugin adds. */
export type BreakInline = {
    type: 'break';
};

/**
 * Shift-Enter breaks the line without ending the block. No toolbar: the
 * keybinding is the whole feature.
 */
export const softBreakPlugin = (): RtePlugin => ({
    id: 'soft-break',
    schema: [
        {
            kind: 'inline',
            type: 'break',
            toDom: () => ({ tag: 'br' }),
            renderComponent: () => <br />,
            parseRules: [{ tag: 'br' }],
        },
    ],
    hotkeys: { 'Shift-Enter': (api) => api.insert('break') },
});
