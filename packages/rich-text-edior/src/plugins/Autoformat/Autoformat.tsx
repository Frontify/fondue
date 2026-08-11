/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/RichTextEditor';

/**
 * Markdown shortcuts and typography, applied while typing. Every rule is a
 * declaration the editor matches — this plugin has no schema and no UI, and
 * rules naming a mark, block or list that is not mounted simply never fire.
 */
export const AutoformatPlugin = definePlugin(() => ({
    id: 'autoformat',
    inputRules: [
        // Marks. Longer delimiters are tried first, so `**bold**` never reads as italic.
        { kind: 'mark', key: 'bold', delimiter: '**' },
        { kind: 'mark', key: 'strikethrough', delimiter: '~~' },
        { kind: 'mark', key: 'italic', delimiter: '*' },
        { kind: 'mark', key: 'underline', delimiter: '_' },
        { kind: 'mark', key: 'code', delimiter: '`' },

        // Blocks.
        { kind: 'block', match: '# ', block: 'textStyle', attributes: { style: 'heading1' } },
        { kind: 'block', match: '## ', block: 'textStyle', attributes: { style: 'heading2' } },
        { kind: 'block', match: '### ', block: 'textStyle', attributes: { style: 'heading3' } },
        { kind: 'block', match: '#### ', block: 'textStyle', attributes: { style: 'heading4' } },
        { kind: 'block', match: '> ', block: 'quote' },

        // Lists.
        { kind: 'list', match: '- ', list: 'bulletList' },
        { kind: 'list', match: '* ', list: 'bulletList' },
        { kind: 'list', match: '1. ', list: 'numberedList' },
        { kind: 'list', match: '1) ', list: 'numberedList' },
        { kind: 'list', match: '[] ', list: 'checkList' },

        // Punctuation and symbols.
        { kind: 'text', match: '...', replaceWith: '…' },
        { kind: 'text', match: '--', replaceWith: '—' },
        { kind: 'text', match: '->', replaceWith: '→' },
        { kind: 'text', match: '<-', replaceWith: '←' },
        { kind: 'text', match: '=>', replaceWith: '⇒' },
        { kind: 'text', match: '(c)', replaceWith: '©' },
        { kind: 'text', match: '(r)', replaceWith: '®' },
        { kind: 'text', match: '(tm)', replaceWith: '™' },
        { kind: 'text', match: '+-', replaceWith: '±' },
        { kind: 'text', match: '1/2', replaceWith: '½' },
        { kind: 'text', match: '1/3', replaceWith: '⅓' },
        { kind: 'text', match: '2/3', replaceWith: '⅔' },
        { kind: 'text', match: '1/4', replaceWith: '¼' },
        { kind: 'text', match: '3/4', replaceWith: '¾' },
        { kind: 'quotes', match: '"', open: '“', close: '”' },
        { kind: 'quotes', match: "'", open: '‘', close: '’' },
    ],
}));
