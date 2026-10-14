/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/core';

/**
 * Typography applied while typing: punctuation, symbols and curly quotes. Every
 * rule is a declaration the editor matches — no nodes of its own, no UI.
 *
 * The markdown shortcuts are not here: `**bold**` belongs to the bold plugin,
 * the way its toolbar button and its `Mod-b` do. What is left here are the
 * rules that name no feature at all.
 */
export const autoformatPlugin = (): RtePlugin => ({
    id: 'autoformat',
    inputRules: [
        { kind: 'text', match: '...', replaceWith: '…' },
        { kind: 'text', match: '--', replaceWith: '—' },
        { kind: 'text', match: '->', replaceWith: '→' },
        { kind: 'text', match: '<-', replaceWith: '←' },
        { kind: 'text', match: '=>', replaceWith: '⇒' },
        { kind: 'text', match: '(c)', replaceWith: '©' },
        { kind: 'text', match: '(r)', replaceWith: '®' },
        { kind: 'text', match: '(tm)', replaceWith: '™' },
        { kind: 'text', match: '+-', replaceWith: '±' },
        // Fractions only once a space ends them, so a date (`1/2/2026`) or a
        // longer number (`11/22`) is left alone while it is still being typed.
        { kind: 'text', match: '1/2 ', replaceWith: '½ ' },
        { kind: 'text', match: '1/3 ', replaceWith: '⅓ ' },
        { kind: 'text', match: '2/3 ', replaceWith: '⅔ ' },
        { kind: 'text', match: '1/4 ', replaceWith: '¼ ' },
        { kind: 'text', match: '3/4 ', replaceWith: '¾ ' },
        { kind: 'quotes', match: '"', open: '“', close: '”' },
        { kind: 'quotes', match: "'", open: '‘', close: '’' },
    ],
});
