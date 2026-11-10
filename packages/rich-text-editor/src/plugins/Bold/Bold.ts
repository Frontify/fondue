/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatBold } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import { declaresBoldWeight, declaresNormalWeight } from '../shared/helpers/declaredStyle';

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
                { tag: 'span', value: (element) => (declaresBoldWeight(element) ? {} : null) },
            ],
        }),
    },
});

/**
 * Bold text with the `Mod-b` shortcut, and `**text**` while typing
 */
export const boldPlugin = /* @__PURE__ */ definePlugin({
    content: boldContent,
    toolbar: [{ label: 'Bold', icon: IconTextFormatBold, shortcut: 'Mod-b' }],
    inputRules: [{ delimiter: '**' }],
});
