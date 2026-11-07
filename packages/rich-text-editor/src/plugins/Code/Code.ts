/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCode } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import styles from './code.module.scss';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type CodeMark = {
    code?: true;
};

/** Inline code: `<code>`. */
export const codeContent = /* @__PURE__ */ defineContent({
    marks: {
        code: /* @__PURE__ */ defineMark({
            // Code is literal: `--` and `**` stay as typed inside it.
            excludesInputRules: true,
            // Typing at the end of code does not carry it on.
            inclusive: false,
            toHtml: () => ({ tag: 'code', attrs: { class: styles.code ?? '' }, children: true }),
            parse: [{ tag: 'code' }],
        }),
    },
});

/** Inline code: `Mod-e`, and `` `text` `` while typing. */
export const codePlugin = /* @__PURE__ */ definePlugin({
    content: codeContent,
    toolbar: [{ icon: IconCode, shortcut: 'Mod-e' }],
    inputRules: [{ delimiter: '`' }],
});
