/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCode } from '@frontify/fondue-icons';

import { defineContent, defineMark, definePlugin, type MarkdownDelimiters } from '#/core';
import { translatedLabel } from '#/ui/translation';

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

const BACKTICK = '`';

const BACKTICK_RUN = /`+/g;

/**
 * A fence one backtick longer than any run in the text, with a space inside each end when the text starts or ends
 * with a backtick, which the reader strips again
 */
const codeDelimiters = (text: string): MarkdownDelimiters => {
    let longestRun = 0;
    for (const [run] of text.matchAll(BACKTICK_RUN)) {
        longestRun = Math.max(longestRun, run.length);
    }

    const fence = BACKTICK.repeat(longestRun + 1);
    if (text.startsWith(BACKTICK) || text.endsWith(BACKTICK)) {
        return { open: `${fence} `, close: ` ${fence}` };
    }

    return { open: fence, close: fence };
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
            markdown: {
                read: [{ token: 'code_inline' }],
                write: (_value, text) => codeDelimiters(text),
                literal: true,
            },
        }),
    },
});

/**
 * Inline code with the `Mod-e` shortcut, and `` `text` `` while typing
 */
export const codePlugin = () =>
    definePlugin({
        content: codeContent,
        toolbarGroup: 'marks',
        toolbar: [{ label: translatedLabel('RichTextEditor_code'), icon: IconCode, shortcut: 'Mod-e' }],
        inputRules: [{ delimiter: '`' }],
    });
