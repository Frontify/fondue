/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/domain';

/**
 * Typography applied while typing: punctuation, symbols and curly quotes. Every
 * rule is a declaration the editor matches — this plugin has no schema and no UI.
 *
 * The markdown shortcuts are not here. `**bold**` belongs to the bold plugin the
 * same way its toolbar button and its `Mod-b` do, so each feature declares its
 * own shortcut and this plugin is left with the rules that name no feature at
 * all.
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
        { kind: 'text', match: '1/2', replaceWith: '½' },
        { kind: 'text', match: '1/3', replaceWith: '⅓' },
        { kind: 'text', match: '2/3', replaceWith: '⅔' },
        { kind: 'text', match: '1/4', replaceWith: '¼' },
        { kind: 'text', match: '3/4', replaceWith: '¾' },
        { kind: 'quotes', match: '"', open: '“', close: '”' },
        { kind: 'quotes', match: "'", open: '‘', close: '’' },
    ],
});
