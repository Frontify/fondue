/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSpeechBubbleQuote } from '@frontify/fondue-icons';

import { defineBlock, defineContent, definePlugin, type RteInlineNode } from '#/core';
import { translatedLabel } from '#/ui/translation';

import styles from './quote.module.scss';

/**
 * The block type this plugin adds
 */
export type QuoteBlock = {
    type: 'quote';
    children: RteInlineNode[];
};

/**
 * A block quote, written as `<blockquote>`
 */
export const quoteContent = defineContent({
    blocks: {
        quote: defineBlock({
            content: 'text',
            toHtml: () => ({ tag: 'blockquote', attrs: { class: styles.quote }, children: true }),
            parse: [{ tag: 'blockquote' }],
            markdown: { read: [{ token: 'blockquote_open' }], write: () => ({ first: '> ', rest: '> ' }) },
        }),
    },
});

/**
 * A block quote, with a `/` entry, and `> ` while typing
 */
export const quotePlugin = () =>
    definePlugin({
        content: quoteContent,
        toolbarGroup: 'text',
        toolbar: [
            {
                label: translatedLabel('RichTextEditor_quote'),
                icon: IconSpeechBubbleQuote,
                menu: { keywords: ['blockquote', 'citation'] },
            },
        ],
        inputRules: [{ kind: 'block', match: '> ', block: 'quote' }],
    });
