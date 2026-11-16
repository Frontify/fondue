/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSpeechBubbleQuote } from '@frontify/fondue-icons';

import {
    defineBlock,
    defineContent,
    definePlugin,
    LOOK_MARGIN_FALLBACKS,
    lookStyle,
    type RteInlineNode,
    styleOfClass,
} from '#/core';

import { MUTED_COLOR } from '../shared/helpers/mutedText';

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
            ownsMargins: true,
            toHtml: () => ({ tag: 'blockquote', attrs: { class: styles.quote }, children: true }),
            parse: [{ tag: 'blockquote' }],
        }),
    },
    // The same values the stylesheet falls back to; `hostStyling.ct.tsx` holds them equal.
    contentStyles: (properties) =>
        styleOfClass(styles.quote, lookStyle('quote', properties, { ...LOOK_MARGIN_FALLBACKS, color: MUTED_COLOR })),
});

/**
 * A block quote, with a `/` entry, and `> ` while typing
 */
export const quotePlugin = /* @__PURE__ */ definePlugin({
    content: quoteContent,
    toolbarGroup: 'text',
    toolbar: [{ label: 'Quote', icon: IconSpeechBubbleQuote, menu: { keywords: ['blockquote', 'citation'] } }],
    inputRules: [{ kind: 'block', match: '> ', block: 'quote' }],
});
