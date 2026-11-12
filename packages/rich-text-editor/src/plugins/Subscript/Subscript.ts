/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSubscript } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import { isVerticalAlign, markWhen } from '../shared/helpers/declaredStyle';
import * as TOOLBAR_GROUPS from '../shared/toolbarGroups';

/**
 * The flag this plugin sets on text nodes
 */
export type SubscriptMark = {
    /**
     * Whether the text is subscript. Present means on, and `true` is the only value.
     */
    subscript?: true;
};

/**
 * Subscript text, written as `<sub>`
 */
export const subscriptContent = defineContent({
    marks: {
        subscript: defineMark({
            tag: 'sub',
            excludes: ['superscript'],
            // An element with the alignment is subscript too: how Google Docs writes it.
            parse: [
                { tag: 'sub' },
                { style: 'vertical-align', value: markWhen((value) => isVerticalAlign(value, 'sub')) },
            ],
        }),
    },
});

/**
 * Subscript text with the `Mod-,` shortcut
 */
export const subscriptPlugin = /* @__PURE__ */ definePlugin({
    content: subscriptContent,
    toolbarGroup: TOOLBAR_GROUPS.marks,
    toolbar: [{ label: 'Subscript', icon: IconSubscript, shortcut: 'Mod-,' }],
});
