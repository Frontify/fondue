/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSuperscript } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type SuperscriptMark = {
    superscript?: true;
};

/** Superscript text: `<sup>`. */
export const superscriptContent = /* @__PURE__ */ defineContent({
    marks: {
        superscript: /* @__PURE__ */ defineMark({
            tag: 'sup',
            excludes: ['subscript'],
            // An element with the alignment is superscript too: how Google Docs writes it.
            parse: [
                { tag: 'sup' },
                { style: 'vertical-align', value: (value) => (value.trim().toLowerCase() === 'super' ? {} : null) },
            ],
        }),
    },
});

/** Superscript text: `<sup>` and `Mod-.`. */
export const superscriptPlugin = /* @__PURE__ */ definePlugin({
    content: superscriptContent,
    toolbar: [{ icon: IconSuperscript, shortcut: 'Mod-.' }],
});
