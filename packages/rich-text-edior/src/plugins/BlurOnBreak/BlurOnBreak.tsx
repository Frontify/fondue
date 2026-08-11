/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/RichTextEditor';

/**
 * Enter commits instead of adding a paragraph — what a single-line editor (a
 * title field, a comment box) wants. Mount it *after* any list plugin so that
 * Enter inside a list still splits the item.
 */
export const BlurOnBreakPlugin = definePlugin(() => ({
    id: 'blur-on-break',
    hotkeys: {
        Enter: (api) => {
            api.blur();
        },
    },
}));
