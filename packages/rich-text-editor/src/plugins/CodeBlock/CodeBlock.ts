/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCodeFrame } from '@frontify/fondue-icons';

import { defineBlock, defineContent, definePlugin, type MarkdownFence, type RteTextNode } from '#/core';
import { translatedLabel } from '#/ui/translation';

import styles from './codeBlock.module.scss';

/**
 * The block type this plugin adds
 */
export type CodeBlockBlock = {
    type: 'codeBlock';
    /**
     * The language of the code, absent when it is not named
     */
    language?: string;
    /**
     * The code as written, line breaks included. Empty for a block with no code.
     */
    children: Pick<RteTextNode, 'text'>[];
};

type CodeBlockValue = { language: string | null };

const BACKTICK = '`';

const BACKTICK_RUN = /`+/g;

const MIN_FENCE_LENGTH = 3;

/**
 * A token that names a language: letters, digits and the symbols of `c++`, `c#`, `objective-c` and `x.y`
 */
const LANGUAGE_PATTERN = /^[\w#+.-]{1,64}$/;

/**
 * What the class of a `code` element starts with before the language. CommonMark, GitHub, highlight.js and Prism write the first.
 */
const LANGUAGE_CLASS_PREFIXES = ['language-', 'lang-'] as const;

const WHITESPACE = /\s+/;

/**
 * The token when it names a language, otherwise undefined
 */
const languageOf = (token: string | null | undefined): string | undefined => {
    if (token === undefined || token === null || !LANGUAGE_PATTERN.test(token)) {
        return undefined;
    }

    return token;
};

/**
 * The language to store for a token, or nothing when the token is not a language
 */
const languageValueOf = (token: string | undefined): Partial<CodeBlockValue> => {
    const language = languageOf(token);
    if (language === undefined) {
        return {};
    }

    return { language };
};

/**
 * The language the first class with a language prefix names, or undefined when none has one
 */
const classLanguageOf = (code: Element | null): string | undefined => {
    if (code === null) {
        return undefined;
    }

    for (const name of code.classList) {
        const prefix = LANGUAGE_CLASS_PREFIXES.find((candidate) => name.startsWith(candidate));
        if (prefix !== undefined) {
            return name.slice(prefix.length);
        }
    }

    return undefined;
};

/**
 * A fence one backtick longer than any run in the code, and at least three, so the code never closes it.
 * The info string names the language only when it is a language token, so a stored value cannot end the fence line.
 */
const fenceOf = (code: string, language: string | null): MarkdownFence => {
    let longestRun = 0;
    for (const [run] of code.matchAll(BACKTICK_RUN)) {
        longestRun = Math.max(longestRun, run.length);
    }

    const fence = BACKTICK.repeat(Math.max(MIN_FENCE_LENGTH, longestRun + 1));

    return { open: `${fence}${languageOf(language) ?? ''}`, close: fence };
};

/**
 * A block of code, written as `<pre><code>`, with the language in the class of `code`
 */
export const codeBlockContent = defineContent({
    blocks: {
        codeBlock: defineBlock<CodeBlockValue>({
            content: 'code',
            defaults: { language: null },
            toHtml: ({ language }) => {
                let codeClass: string | undefined;
                if (language !== null) {
                    codeClass = `${LANGUAGE_CLASS_PREFIXES[0]}${language}`;
                }

                return {
                    tag: 'pre',
                    attrs: { class: styles.codeBlock },
                    children: [{ tag: 'code', attrs: { class: codeClass }, children: true }],
                };
            },
            parse: [
                { tag: 'pre', value: (element) => languageValueOf(classLanguageOf(element.querySelector('code'))) },
            ],
            markdown: {
                read: [
                    { token: 'fence', value: ({ info }) => languageValueOf(info.trim().split(WHITESPACE)[0]) },
                    { token: 'code_block' },
                ],
                write: ({ language }, code) => fenceOf(code, language),
            },
        }),
    },
});

/**
 * A block of code, with a `/` entry, and a fence of three backticks while typing
 */
export const codeBlockPlugin = () =>
    definePlugin({
        content: codeBlockContent,
        toolbarGroup: 'text',
        toolbar: [
            {
                label: translatedLabel('RichTextEditor_codeBlock'),
                icon: IconCodeFrame,
                menu: { keywords: ['code', 'pre', 'snippet', 'fence'] },
            },
        ],
        inputRules: [{ kind: 'block', match: '``` ', block: 'codeBlock' }],
    });
