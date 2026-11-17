/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatBold } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import { declaresNormalWeight, isBoldWeight, isNormalWeight, markWhen } from '../shared/helpers/declaredStyle';
import * as TOOLBAR_GROUPS from '../shared/toolbarGroups';

/**
 * The flag this plugin sets on text nodes
 */
export type BoldMark = {
    /**
     * Whether the text is bold. Present means on, and `true` is the only value.
     */
    bold?: true;
};

/**
 * Bold text, written as `<strong>`
 */
export const boldContent = defineContent({
    marks: {
        bold: defineMark({
            tag: 'strong',
            // Pasted HTML says bold in more ways than the tags: Google Docs
            // writes a span with a weight, and wraps everything it copies in
            // a `<b>` that sets the weight back to normal.
            parse: [
                { tag: 'strong', value: (element) => (declaresNormalWeight(element) ? null : {}) },
                { tag: 'b', value: (element) => (declaresNormalWeight(element) ? null : {}) },
                { style: 'font-weight', value: markWhen(isBoldWeight) },
                { style: 'font-weight', clears: isNormalWeight },
            ],
        }),
    },
});

/**
 * Bold text with the `Mod-b` shortcut, and `**text**` or `__text__` while typing
 */
export const boldPlugin = /* @__PURE__ */ definePlugin({
    content: boldContent,
    toolbarGroup: TOOLBAR_GROUPS.marks,
    toolbar: [{ label: 'Bold', icon: IconTextFormatBold, shortcut: 'Mod-b' }],
    // Bounded by words, so `foo__bar__` and `self.__dict__` stay as typed.
    inputRules: [{ delimiter: '**' }, { delimiter: '__', wordBounded: true }],
});
