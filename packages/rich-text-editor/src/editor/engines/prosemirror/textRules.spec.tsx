/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { type EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it } from 'vitest';

import { type RteBlockNode, type RteInputRule, type RtePlugin } from '#/core';
import { defaultPlugins, typographyPlugin } from '#/plugins';

import { destroyEditors, editorWith, paragraph, shipped, text } from './testEditor';

/**
 * Text input rules (`kind: 'text'`): typed text swapped for other text, which
 * is all `typographyPlugin` declares.
 */

const rulesPlugin = (...inputRules: RteInputRule[]): RtePlugin => ({ id: 'rules', inputRules });

const typed = (value: string, plugins: readonly RtePlugin[]): RteBlockNode[] | null => {
    const editor = editorWith(plugins, [paragraph()]);
    editor.type(value);
    return editor.stored();
};

const press = (view: EditorView, key: string): boolean =>
    view.someProp('handleKeyDown', (handle) => handle(view, new KeyboardEvent('keydown', { key }))) === true;

const withTypography = [...defaultPlugins, typographyPlugin()];

afterEach(destroyEditors);

describe('a text rule', () => {
    it('swaps the text the moment its last character is typed', () => {
        expect(typed('a->', [rulesPlugin({ kind: 'text', match: '->', replace: '→' })])).toEqual([
            paragraph(text('a→')),
        ]);
    });

    it('anchors a pattern to the caret, so a lookbehind can rule out what comes before', () => {
        const plugins = [rulesPlugin({ kind: 'text', match: /(?<!\d)1\/2/, replace: '½' })];

        expect(typed('a 1/2', plugins)).toEqual([paragraph(text('a ½'))]);
        expect(typed('11/2', plugins)).toEqual([paragraph(text('11/2'))]);
    });

    it('keeps the marks of the text it replaces', () => {
        const editor = editorWith(
            [...shipped('bold'), rulesPlugin({ kind: 'text', match: '->', replace: '→' })],
            [paragraph(text('x', { bold: true }))],
        );
        editor.caretAfter('x');

        editor.type('->');

        expect(editor.stored()).toEqual([paragraph(text('x→', { bold: true }))]);
    });

    it('steps aside inside a mark that opts out of typing rules', () => {
        const editor = editorWith(
            [...shipped('code'), rulesPlugin({ kind: 'text', match: '->', replace: '→' })],
            [paragraph(text('x', { code: true }))],
        );
        editor.caretAfter('x');

        editor.type('->');

        expect(editor.stored()).toEqual([paragraph(text('x->', { code: true }))]);
    });

    it('is taken back on Backspace, leaving what was typed', () => {
        const editor = editorWith([rulesPlugin({ kind: 'text', match: '->', replace: '→' })], [paragraph()]);
        editor.type('a->');

        expect(press(editor.view, 'Backspace')).toBe(true);

        expect(editor.stored()).toEqual([paragraph(text('a->'))]);
    });
});

describe('typographyPlugin', () => {
    it.each([
        ['--', '—'],
        ['...', '…'],
        ['>>', '»'],
        ['<<', '«'],
        ['->', '→'],
        ['<-', '←'],
        ['=>', '⇒'],
        ['<=', '⇐'],
        ['(c)', '©'],
        ['(R)', '®'],
        ['(tm)', '™'],
        ['~2', '₂'],
        ['~-', '₋'],
        ['^2', '²'],
        ['^o', '°'],
        ['1/2', '½'],
        ['1/10', '⅒'],
        ['7/8', '⅞'],
    ])('turns "%s" into "%s"', (shortcut, glyph) => {
        expect(typed(`a ${shortcut}`, withTypography)).toEqual([paragraph(text(`a ${glyph}`))]);
    });

    it('leaves a fraction after a digit or a slash as typed: dates and paths', () => {
        expect(typed('11/2', withTypography)).toEqual([paragraph(text('11/2'))]);
        expect(typed('a/1/2', withTypography)).toEqual([paragraph(text('a/1/2'))]);
    });

    it('leaves a strikethrough opening on a digit to the strikethrough rule', () => {
        expect(typed('~~2~~', withTypography)).toEqual([paragraph(text('2', { strikethrough: true }))]);
    });

    it('leaves the markdown block shortcuts alone', () => {
        expect(typed('> quoted', withTypography)).toEqual([{ type: 'quote', children: [{ text: 'quoted' }] }]);
    });
});
