/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkdownDelimiters } from '../../core';
import { defaultContent } from '../../plugins';
import { type MarkdownOptions } from '../index';

const TARGET_PATTERN = /\{target="([^"]*)"\}/;

const NEW_TAB_TARGET = '_blank';

const NEW_TAB_SUFFIX = `{target="${NEW_TAB_TARGET}"}`;

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
