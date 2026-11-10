/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { type EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it } from 'vitest';

import { definePlugin, type RteBlockNode, type RteInputRule, type RtePlugin } from '#/core';
import { defaultPlugins, typographyPlugin } from '#/plugins';

import { destroyEditors, editorWith, paragraph, shipped, text } from './testEditor';

/**
 * Text input rules (`kind: 'text'`): typed text swapped for other text, which
 * is all `typographyPlugin` declares.
 */

const rulesPlugin = (...inputRules: RteInputRule[]): RtePlugin => definePlugin({ id: 'rules', inputRules });

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
            [paragraph(text('xy', { code: true }))],
        );
        editor.caretAfter('x');

        editor.type('->');

        expect(editor.stored()).toEqual([paragraph(text('x->y', { code: true }))]);
    });

    it('is taken back on Backspace, leaving what was typed', () => {
        const editor = editorWith([rulesPlugin({ kind: 'text', match: '->', replace: '→' })], [paragraph()]);
        editor.type('a->');

        expect(press(editor.view, 'Backspace')).toBe(true);

        expect(editor.stored()).toEqual([paragraph(text('a->'))]);
    });
});

describe('a text rule that waits for the run to end', () => {
    const plugins = [rulesPlugin({ kind: 'text', match: /(?<![-<!])--/, replace: '—', waitForRunEnd: true })];

    it('waits for the next character and keeps it', () => {
        expect(typed('a -- b', plugins)).toEqual([paragraph(text('a — b'))]);
        expect(typed('a --,', plugins)).toEqual([paragraph(text('a —,'))]);
        expect(typed('(a --)', plugins)).toEqual([paragraph(text('(a —)'))]);
    });

    it('leaves a run ended by a full stop as typed: a decimal point or a file extension', () => {
        expect(typed('a --.', plugins)).toEqual([paragraph(text('a --.'))]);
    });

    it('fires only before whitespace or sentence punctuation', () => {
        expect(typed('--flag', plugins)).toEqual([paragraph(text('--flag'))]);
        expect(typed('--brand-color', plugins)).toEqual([paragraph(text('--brand-color'))]);
        expect(typed('a -->', plugins)).toEqual([paragraph(text('a -->'))]);
        expect(typed('--_x', plugins)).toEqual([paragraph(text('--_x'))]);
        expect(typed('a --/ b', plugins)).toEqual([paragraph(text('a --/ b'))]);
    });

    it('is cancelled by what the match says may not come before it', () => {
        expect(typed('a --- b', plugins)).toEqual([paragraph(text('a --- b'))]);
        expect(typed('<!-- ', plugins)).toEqual([paragraph(text('<!-- '))]);
        expect(typed('<-- ', plugins)).toEqual([paragraph(text('<-- '))]);
    });

    it('steps aside inside a mark that opts out of typing rules', () => {
        const editor = editorWith([...shipped('code'), ...plugins], [paragraph(text('xy', { code: true }))]);
        editor.caretAfter('x');

        editor.type('-- ');

        expect(editor.stored()).toEqual([paragraph(text('x-- y', { code: true }))]);
    });

    it('stays as typed in a code run when a plain space follows it', () => {
        const editor = editorWith([...shipped('code'), ...plugins], [paragraph(text('npm i --', { code: true }))]);
        editor.caretAfter('npm i --');

        editor.type(' ');

        expect(editor.stored()).toEqual([paragraph(text('npm i --', { code: true }), text(' '))]);
    });

    it('keeps the marks of the replaced text and gives the typed character the marks typing carries', () => {
        const editor = editorWith([...shipped('bold'), ...plugins], [paragraph(text('a --', { bold: true }))]);
        editor.caretAfter('a --');
        editor.api.marks.toggle('bold');

        editor.type(' ');

        expect(editor.stored()).toEqual([paragraph(text('a —', { bold: true }), text(' '))]);
    });

    it('is taken back on Backspace, leaving what was typed', () => {
        const editor = editorWith(plugins, [paragraph()]);
        editor.type('a -- ');

        expect(press(editor.view, 'Backspace')).toBe(true);

        expect(editor.stored()).toEqual([paragraph(text('a -- '))]);
    });

    it('does not fire when a composition leaves the text as it was', async () => {
        const editor = editorWith(plugins, [paragraph(text('a -- '))]);
        editor.caretAfter('a -- ');

        editor.view.dom.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
        editor.view.dom.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true }));
        await new Promise((resolve) => setTimeout(resolve));

        expect(editor.view.state.doc.textContent).toBe('a -- ');
    });

    it('fires when a phone keyboard composes the dash and the space that ends the run', async () => {
        const editor = editorWith(plugins, [paragraph(text('a '))]);
        editor.caretAfter('a ');

        editor.view.dom.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
        editor.view.dispatch(editor.view.state.tr.insertText('-- '));
        editor.view.dom.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true }));
        await new Promise((resolve) => setTimeout(resolve));

        expect(editor.view.state.doc.textContent).toBe('a — ');
    });
});

describe('a text rule on a mark that opts out of typing rules', () => {
    it('does not fire across a code run and plain text: `a-` then a plain `>`', () => {
        const editor = editorWith(
            [...shipped('code'), rulesPlugin({ kind: 'text', match: '->', replace: '→' })],
            [paragraph(text('a-', { code: true }))],
        );
        editor.caretAfter('a-');

        editor.type('>');

        expect(editor.stored()).toEqual([paragraph(text('a-', { code: true }), text('>'))]);
    });
});

describe('typographyPlugin', () => {
    it.each([
        ['...', '…'],
        ['>>', '»'],
        ['<<', '«'],
        ['->', '→'],
        ['<->', '↔'],
        ['(c)', '©'],
        ['(R)', '®'],
        ['(tm)', '™'],
        ['(sm)', '℠'],
        ['+/-', '±'],
        ['^o', '°'],
        ['^+', '⁺'],
        ['^-', '⁻'],
    ])('turns "%s" into "%s"', (shortcut, glyph) => {
        expect(typed(`a ${shortcut}`, withTypography)).toEqual([paragraph(text(`a ${glyph}`))]);
    });

    it.each([
        ['--', '—'],
        ['<-', '←'],
        ['!=', '≠'],
        ['2^2', '2²'],
        ['1/2', '½'],
        ['1/10', '⅒'],
        ['7/8', '⅞'],
        ['3x4', '3×4'],
        ['1920x1080', '1920×1080'],
    ])('turns "%s" into "%s" once the run ends', (shortcut, glyph) => {
        expect(typed(`a ${shortcut} b`, withTypography)).toEqual([paragraph(text(`a ${glyph} b`))]);
        expect(typed(`a ${shortcut},`, withTypography)).toEqual([paragraph(text(`a ${glyph},`))]);
        expect(typed(`a ${shortcut}`, withTypography)).toEqual([paragraph(text(`a ${shortcut}`))]);
    });

    it('keeps dashes and arrows in technical text as typed', () => {
        expect(typed('--flag', withTypography)).toEqual([paragraph(text('--flag'))]);
        expect(typed('--brand-color', withTypography)).toEqual([paragraph(text('--brand-color'))]);
        expect(typed('a --> b', withTypography)).toEqual([paragraph(text('a --> b'))]);
        expect(typed('a --- b', withTypography)).toEqual([paragraph(text('a --- b'))]);
        expect(typed('<!-- x', withTypography)).toEqual([paragraph(text('<!-- x'))]);
        expect(typed('<-- x', withTypography)).toEqual([paragraph(text('<-- x'))]);
    });

    it('keeps a longer run as typed: !==, 0x1F, 10^23, 1/25', () => {
        expect(typed('a !== b', withTypography)).toEqual([paragraph(text('a !== b'))]);
        expect(typed('0x1F ', withTypography)).toEqual([paragraph(text('0x1F '))]);
        expect(typed('0x10 ', withTypography)).toEqual([paragraph(text('0x10 '))]);
        expect(typed('10^23 ', withTypography)).toEqual([paragraph(text('10^23 '))]);
        expect(typed('1/25 ', withTypography)).toEqual([paragraph(text('1/25 '))]);
    });

    it('keeps a run ended by a full stop as typed: file names and decimals', () => {
        expect(typed('banner-1920x1080.png', withTypography)).toEqual([paragraph(text('banner-1920x1080.png'))]);
        expect(typed('2^2.5 ', withTypography)).toEqual([paragraph(text('2^2.5 '))]);
        expect(typed('~2.5 ', withTypography)).toEqual([paragraph(text('~2.5 '))]);
    });

    it('does not rewrite a tilde and a digit: "~2 hours"', () => {
        expect(typed('~2 hours', withTypography)).toEqual([paragraph(text('~2 hours'))]);
        expect(typed('~-5 ', withTypography)).toEqual([paragraph(text('~-5 '))]);
    });

    it('leaves comparison operators and arrow functions alone', () => {
        expect(typed('x <= 5', withTypography)).toEqual([paragraph(text('x <= 5'))]);
        expect(typed('a => b', withTypography)).toEqual([paragraph(text('a => b'))]);
    });

    it('turns a caret into a superscript digit only right after a digit', () => {
        expect(typed('x^2 ', withTypography)).toEqual([paragraph(text('x^2 '))]);
        expect(typed('^2 ', withTypography)).toEqual([paragraph(text('^2 '))]);
    });

    it('leaves a digit and x inside a word as typed', () => {
        expect(typed('v3x4 ', withTypography)).toEqual([paragraph(text('v3x4 '))]);
    });

    describe('quotes', () => {
        it('opens a double quote at the start of the block, after a space and after an opener', () => {
            expect(typed('"hi"', withTypography)).toEqual([paragraph(text('“hi”'))]);
            expect(typed('say "hi"', withTypography)).toEqual([paragraph(text('say “hi”'))]);
            expect(typed('("hi")', withTypography)).toEqual([paragraph(text('(“hi”)'))]);
        });

        it('turns a single quote after a letter into an apostrophe and opens one after a space', () => {
            expect(typed("don't", withTypography)).toEqual([paragraph(text('don’t'))]);
            expect(typed("say 'hi'", withTypography)).toEqual([paragraph(text('say ‘hi’'))]);
        });

        it('curls a closing quote typed right after a dash run, which stays undashed', () => {
            expect(typed('"wait --"', withTypography)).toEqual([paragraph(text('“wait --”'))]);
            expect(typed("'wait --'", withTypography)).toEqual([paragraph(text('‘wait --’'))]);
        });

        it('leaves a quote in inline code as typed', () => {
            const editor = editorWith(
                [...shipped('code'), typographyPlugin()],
                [paragraph(text('xy', { code: true }))],
            );
            editor.caretAfter('x');

            editor.type('"');

            expect(editor.stored()).toEqual([paragraph(text('x"y', { code: true }))]);
        });

        it('opens a quote after an inline element', () => {
            const editor = editorWith(
                [...shipped('softBreak'), typographyPlugin()],
                [paragraph(text('a'), { type: 'break' })],
            );
            editor.caretAfter('￼');

            editor.type('"hi"');

            expect(editor.stored()).toEqual([paragraph(text('a'), { type: 'break' }, text('“hi”'))]);
        });

        it.each([
            ['useState', { code: true }],
            ['Frontify', { link: { href: 'https://frontify.com' } }],
        ])('leaves the run "%s" intact when an apostrophe and "s" are typed after it', (word, marks) => {
            const editor = editorWith([...shipped('code', 'link'), typographyPlugin()], [paragraph(text(word, marks))]);
            editor.caretAfter(word);

            editor.type("'s");

            expect(editor.stored()).toEqual([paragraph(text(word, marks), text('’s'))]);
        });

        it('is taken back on Backspace', () => {
            const editor = editorWith([typographyPlugin()], [paragraph()]);
            editor.type('a "');

            expect(press(editor.view, 'Backspace')).toBe(true);

            expect(editor.stored()).toEqual([paragraph(text('a "'))]);
        });
    });

    it('turns on only the groups asked for', () => {
        const plugins = [...defaultPlugins, typographyPlugin({ groups: ['symbols'] })];

        expect(typed('a -> "b" 1/2 ... --', plugins)).toEqual([paragraph(text('a → "b" 1/2 ... --'))]);
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
