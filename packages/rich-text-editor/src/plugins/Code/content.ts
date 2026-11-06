/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineMark } from '#/core';

import styles from './code.module.scss';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type CodeMark = {
    code?: true;
};

/** Inline code: `<code>`. */
export const codeContent = defineContent({
    marks: {
        code: defineMark({
            // Code is literal: `--` and `**` stay as typed inside it.
            excludesInputRules: true,
            toHtml: () => ({ tag: 'code', attrs: { class: styles.code ?? '' }, children: true }),
            parse: [{ tag: 'code' }],
        }),
    },
});
