/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, wrapIn } from '#/model';

/** Quotations as `blockquote`, a container of blocks that Enter in its empty last paragraph leaves. */
export const quote = defineFeature({
    id: 'blocks.quote',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        blockquote: {
            group: 'block',
            content: 'block+',
            attrs: {},
            html: ['blockquote', 0],
            parse: [{ tag: 'blockquote' }],
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
    commands: { 'quote.toggle': wrapIn('blockquote') },
    inputRules: [{ id: 'quote.angle', kind: 'line-start', command: 'quote.toggle', markers: ['>'] }],
    toolbar: [
        { kind: 'toggle', command: 'quote.toggle', labelKey: 'RichTextEditor_quote', icon: 'IconSpeechBubbleQuote' },
    ],
});
