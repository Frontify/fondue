/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteInlineNode, defineBlock, defineContent } from '#/core';

import styles from './quote.module.scss';

/** The block type this plugin adds. Part of the assembled RteBlock union at the package root. */
export type QuoteBlock = {
    type: 'quote';
    children: RteInlineNode[];
};

/** A block quote: `<blockquote>`. */
export const quoteContent = defineContent({
    blocks: {
        quote: defineBlock({
            content: 'text',
            toHtml: () => ({ tag: 'blockquote', attrs: { class: styles.quote }, children: true }),
            parse: [{ tag: 'blockquote' }],
        }),
    },
});
