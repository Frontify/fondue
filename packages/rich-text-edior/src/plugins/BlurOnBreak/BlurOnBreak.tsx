/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/domain';

/**
 * Enter commits instead of adding a paragraph — what a single-line editor (a
 * title field, a comment box) wants. Mount it *after* any list plugin so that
 * Enter inside a list still splits the item.
 */
export const blurOnBreakPlugin = (): RtePlugin => ({
    id: 'blur-on-break',
    hotkeys: {
        Enter: (api) => {
            api.blur();
        },
    },
});
