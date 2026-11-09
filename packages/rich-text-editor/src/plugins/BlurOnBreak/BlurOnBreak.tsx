/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/core';

/**
 * Makes Enter blur the editor instead of adding a paragraph, for single-line editors.
 * Inside a list Enter still splits the item.
 */
export const blurOnBreakPlugin = /* @__PURE__ */ definePlugin({
    id: 'blur-on-break',
    hotkeys: {
        Enter: (api) => {
            // Plugin hotkeys run before the editor's own keys, so the list split has to happen here.
            if (!api.lists.split()) {
                api.blur();
            }
            return true;
        },
    },
});
