/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCode } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin } from '#/core';

import styles from './code.module.scss';

/**
 * The flag this plugin sets on text nodes
 */
export type CodeMark = {
    /**
     * Whether the text is inline code. Present means on, and `true` is the only value.
     */
    code?: true;
};

/**
 * Inline code, written as `<code>`
 */
export const codeContent = defineContent({
    marks: {
        code: defineMark({
            // Code is literal: `--` and `**` stay as typed inside it.
            excludesInputRules: true,
            // Typing at the end of code does not carry it on.
            inclusive: false,
            toHtml: () => ({ tag: 'code', attrs: { class: styles.code ?? '' }, children: true }),
            parse: [{ tag: 'code' }],
        }),
    },
});

/**
 * Inline code with the `Mod-e` shortcut, and `` `text` `` while typing
 */
export const codePlugin = /* @__PURE__ */ definePlugin({
    content: codeContent,
    toolbar: [{ label: 'Code', icon: IconCode, shortcut: 'Mod-e' }],
    inputRules: [{ delimiter: '`' }],
});
