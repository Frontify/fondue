/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/pluginApi/plugin';

import { quote } from './feature';

/** Toggles a quote from `>` at a line start or the toolbar. */
export const quoteEditor = defineEditorPart(quote, {
    needs: ['blocks'],
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
