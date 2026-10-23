/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPlugin } from '#/bridge/plugin';

import { quote } from './feature';

/** Toggles a quote from `>` at a line start or the toolbar. */
export const quoteEditor = defineEditorPlugin(quote, {
    commands: {
        'quote.toggle': {
            run: (api) => api.blocks.wrap('blockquote'),
            active: (api) => api.blocks.active('blockquote'),
        },
    },
    inputRules: [{ id: 'quote.angle', kind: 'line-start', command: 'quote.toggle', markers: ['>'] }],
    toolbar: [
        {
            id: 'quote',
            kind: 'toggle',
            command: 'quote.toggle',
            labelKey: 'RichTextEditor_quote',
            icon: 'IconSpeechBubbleQuote',
        },
    ],
});
