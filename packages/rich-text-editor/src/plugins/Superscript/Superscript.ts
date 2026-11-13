/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSuperscript } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import { isVerticalAlign, markWhen } from '../shared/helpers/declaredStyle';

/**
 * The flag this plugin sets on text nodes
 */
export type SuperscriptMark = {
    /**
     * Whether the text is superscript. Present means on, and `true` is the only value.
     */
    superscript?: true;
};

/**
 * Superscript text, written as `<sup>`
 */
export const superscriptContent = defineContent({
    marks: {
        superscript: defineMark({
            tag: 'sup',
            excludes: ['subscript'],
            // An element with the alignment is superscript too: how Google Docs writes it.
            parse: [
                { tag: 'sup' },
                { style: 'vertical-align', value: markWhen((value) => isVerticalAlign(value, 'super')) },
            ],
        }),
    },
});

/**
 * Superscript text with the `Mod-.` shortcut
 */
export const superscriptPlugin = /* @__PURE__ */ definePlugin({
    content: superscriptContent,
    toolbarGroup: 'marks',
    toolbar: [{ label: 'Superscript', icon: IconSuperscript, shortcut: 'Mod-.' }],
});
