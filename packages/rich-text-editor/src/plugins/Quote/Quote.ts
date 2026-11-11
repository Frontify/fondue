/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSpeechBubbleQuote } from '@frontify/fondue-icons';

import { defineBlock, defineContent, definePlugin, lookProperties, type RteInlineNode, type TextLook } from '#/core';

import styles from './quote.module.scss';

/**
 * The block type this plugin adds
 */
export type QuoteBlock = {
    type: 'quote';
    children: RteInlineNode[];
};

export type QuotePluginOptions = {
    /**
     * How block quotes look. A field left out keeps Fondue's look.
     * @default {}
     */
    look?: TextLook;
};

// One definition for every content, because the registry throws when two different objects declare one type.
const quoteBlock = defineBlock({
    content: 'text',
    toHtml: () => ({ tag: 'blockquote', attrs: { class: styles.quote }, children: true }),
    parse: [{ tag: 'blockquote' }],
});

/**
 * A block quote, written as `<blockquote>`
 */
export const quoteContent = ({ look = {} }: QuotePluginOptions = {}) =>
    defineContent({ blocks: { quote: quoteBlock }, contentProperties: lookProperties('quote', look) });

/**
 * A block quote, with a `/` entry, and `> ` while typing
 */
export const quotePlugin = (options: QuotePluginOptions = {}) =>
    definePlugin({
        content: quoteContent(options),
        toolbarGroup: 'text',
        toolbar: [{ label: 'Quote', icon: IconSpeechBubbleQuote, menu: { keywords: ['blockquote', 'citation'] } }],
        inputRules: [{ kind: 'block', match: '> ', block: 'quote' }],
    });
