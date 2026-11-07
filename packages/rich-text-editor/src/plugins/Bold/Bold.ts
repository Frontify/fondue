/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatBold } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import { declaresBoldWeight, declaresNormalWeight } from '../shared/helpers/declaredStyle';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type BoldMark = {
    bold?: true;
};

/** Bold text: `<strong>`. */
export const boldContent = /* @__PURE__ */ defineContent({
    marks: {
        bold: /* @__PURE__ */ defineMark({
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

/** Bold text: `Mod-b`, and `**text**` while typing. */
export const boldPlugin = /* @__PURE__ */ definePlugin({
    content: boldContent,
    toolbar: [{ icon: IconTextFormatBold, shortcut: 'Mod-b' }],
    inputRules: [{ delimiter: '**' }],
});
