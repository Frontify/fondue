/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkdownDelimiters } from '../../core';
import { defaultContent } from '../../plugins';
import { type MarkdownOptions } from '../index';

const TARGET_PATTERN = /\{target="([^"]*)"\}/;

const NEW_TAB_TARGET = '_blank';

const NEW_TAB_SUFFIX = `{target="${NEW_TAB_TARGET}"}`;

const LANG_PATTERN = /\{lang="([^"]*)"\}/;

/** A link that opens in a new tab, written with a Pandoc-style `{target="_blank"}` right after it. */
export const linkTargetOverrideOptions: MarkdownOptions = {
    plugins: defaultContent,
    overrides: {
        marks: {
            link: {
                read: [
                    {
                        token: 'link_open',
                        value: ({ attrs }) => ({ href: attrs.href }),
                        suffix: {
                            pattern: TARGET_PATTERN,
                            value: (value, match) => {
                                if (match[1] === NEW_TAB_TARGET) {
                                    return { ...value, openInNewTab: true };
                                }

                                return null;
                            },
                        },
                    },
                ],
                write: ({ href, openInNewTab }) => {
                    const delimiters: MarkdownDelimiters = { open: '[', close: `](${String(href)})` };
                    if (openInNewTab === true) {
                        delimiters.suffix = NEW_TAB_SUFFIX;
                    }

                    return delimiters;
                },
            },
        },
    },
};

/** Inline code with its language written as `{lang="ts"}` right after it, the way a leaf mark takes a suffix. */
export const codeLanguageOverrideOptions: MarkdownOptions = {
    plugins: defaultContent,
    overrides: {
        marks: {
            code: {
                read: [
                    {
                        token: 'code_inline',
                        suffix: { pattern: LANG_PATTERN, value: (value, match) => ({ ...value, lang: match[1] }) },
                    },
                ],
                write: ({ lang }) => {
                    const delimiters: MarkdownDelimiters = { open: '`', close: '`', literal: true };
                    if (typeof lang === 'string') {
                        delimiters.suffix = `{lang="${lang}"}`;
                    }

                    return delimiters;
                },
            },
        },
    },
};
