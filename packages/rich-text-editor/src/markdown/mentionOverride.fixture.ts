/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defaultContent, mentionContent } from '../plugins';

import { type MarkdownOptions } from './index';

/** A mention written as `@[user:<id>]`, the way a host with its own Markdown syntax would override the default. */
export const mentionOverrideOptions: MarkdownOptions = {
    plugins: [...defaultContent, mentionContent()],
    overrides: {
        inlines: {
            mention: {
                read: [{ pattern: /@\[user:(\d+)\]/, value: (match: RegExpExecArray) => ({ id: match[1] }) }],
                write: (value) => ({ kind: 'markdown', markdown: `@[user:${String(value.id)}]` }),
            },
        },
    },
};
