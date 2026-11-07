/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSpeechBubbleQuote } from '@frontify/fondue-icons';

import { defineBlock, defineContent, definePlugin, type RteInlineNode } from '#/core';

import styles from './quote.module.scss';

/** The block type this plugin adds. Part of the assembled RteBlock union at the package root. */
export type QuoteBlock = {
    type: 'quote';
    children: RteInlineNode[];
};

/** A block quote: `<blockquote>`. */
export const quoteContent = /* @__PURE__ */ defineContent({
    blocks: {
        quote: /* @__PURE__ */ defineBlock({
            content: 'text',
            toHtml: () => ({ tag: 'blockquote', attrs: { class: styles.quote }, children: true }),
            parse: [{ tag: 'blockquote' }],
        }),
    },
});

/** A block quote: `> ` while typing, and a turn-into command. */
export const quotePlugin = /* @__PURE__ */ definePlugin({
    content: quoteContent,
    toolbar: [{ icon: IconSpeechBubbleQuote, menu: { keywords: ['blockquote', 'citation'] } }],
    inputRules: [{ kind: 'block', match: '> ', block: 'quote' }],
});
