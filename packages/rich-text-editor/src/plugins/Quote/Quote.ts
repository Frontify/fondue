/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSpeechBubbleQuote } from '@frontify/fondue-icons';

import { definePlugin } from '#/core';

import { quoteContent } from './content';

/** A block quote: `> ` while typing, and a turn-into command. */
export const quotePlugin = definePlugin({
    content: quoteContent,
    toolbar: [{ icon: IconSpeechBubbleQuote, menu: { keywords: ['blockquote', 'citation'] } }],
    inputRules: [{ kind: 'block', match: '> ', block: 'quote' }],
});
