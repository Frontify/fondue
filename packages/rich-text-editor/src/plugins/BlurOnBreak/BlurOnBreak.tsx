/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/core';

/**
 * Enter commits instead of adding a paragraph — what a single-line editor (a
 * title field, a comment box) wants. Inside a list Enter still splits the
 * item, so a list typed into such an editor can grow; anywhere else it gives
 * up focus. Plugin hotkeys run before the editor's own keys, so this handler
 * splits the item itself rather than leaving Enter to the list.
 */
export const blurOnBreakPlugin = (): RtePlugin => ({
    id: 'blur-on-break',
    hotkeys: {
        Enter: (api) => {
            if (!api.lists.split()) {
                api.blur();
            }
            return true;
        },
    },
});
