/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { undo as pmUndo } from 'prosemirror-history';
import { type EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it } from 'vitest';

import { defaultPlugins } from '#/plugins';

import { destroyEditors, editorWith, paragraph, text } from './testEditor';

// A web address followed by a space becomes a link (the link plugin's `markPattern` rule).

afterEach(destroyEditors);

const typedIntoEmptyParagraph = (value: string) => {
    const editor = editorWith(defaultPlugins, [paragraph()]);
    editor.type(value);
    return editor.stored();
};

const link = (value: string, href = value) => text(value, { link: { href } });

describe('typing a web address', () => {
    it('links only the address once a space follows', () => {
        const stored = typedIntoEmptyParagraph('see https://example.com ');

        expect(stored).toEqual([paragraph(text('see '), link('https://example.com'), text(' '))]);
    });

    it('links an address at the start of a block', () => {
        const stored = typedIntoEmptyParagraph('https://example.com ');

        expect(stored).toEqual([paragraph(link('https://example.com'), text(' '))]);
    });

    it('leaves the full stop at the end out of the link', () => {
        const stored = typedIntoEmptyParagraph('go to https://example.com. ');

        expect(stored).toEqual([paragraph(text('go to '), link('https://example.com'), text('. '))]);
    });

    it('leaves typography alone inside the address', () => {
        const stored = typedIntoEmptyParagraph('https://example.com/a--b?x=1->2 ');

        expect(stored).toEqual([paragraph(link('https://example.com/a--b?x=1->2'), text(' '))]);
    });

    it('keeps a closing parenthesis that balances an opening one', () => {
        const stored = typedIntoEmptyParagraph('https://en.wikipedia.org/wiki/Foo_(bar) ');

        expect(stored).toEqual([paragraph(link('https://en.wikipedia.org/wiki/Foo_(bar)'), text(' '))]);
    });

    it('leaves a full stop after a balanced parenthesis out of the link', () => {
        const stored = typedIntoEmptyParagraph('https://en.wikipedia.org/wiki/Foo_(bar). ');

        expect(stored).toEqual([paragraph(link('https://en.wikipedia.org/wiki/Foo_(bar)'), text('. '))]);
    });

    it('leaves an unbalanced closing parenthesis out of the link', () => {
        const stored = typedIntoEmptyParagraph('(see https://a.com/x). ');

        expect(stored).toEqual([paragraph(text('(see '), link('https://a.com/x'), text('). '))]);
    });

    it('does not carry the link on into what is typed next', () => {
        const stored = typedIntoEmptyParagraph('https://example.com next');

        expect(stored).toEqual([paragraph(link('https://example.com'), text(' next'))]);
    });

    it('stays as typed until a space is typed', () => {
        const stored = typedIntoEmptyParagraph('https://example.com');

        expect(stored).toEqual([paragraph(text('https://example.com'))]);
    });

    it('does nothing inside inline code', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('x', { code: true }))]);
        editor.caretAfter('x');

        editor.type(' https://example.com ');

        expect(editor.stored()).toEqual([paragraph(text('x https://example.com ', { code: true }))]);
    });

    it('is taken back by Backspace right after, leaving plain text', () => {
        const editor = editorWith(defaultPlugins, [paragraph()]);
        editor.type('https://example.com ');
        const { view } = editor;

        const handled = view.someProp(
            'handleKeyDown',
            (handle) => handle(view, new KeyboardEvent('keydown', { key: 'Backspace' })) as boolean | undefined,
        );

        expect(handled).toBe(true);
        expect(editor.stored()).toEqual([paragraph(text('https://example.com '))]);
    });
});

const press = (view: EditorView, key: string, shiftKey = false): boolean =>
    view.someProp('handleKeyDown', (handle) => handle(view, new KeyboardEvent('keydown', { key, shiftKey }))) === true;

const undo = (view: EditorView): boolean => pmUndo(view.state, view.dispatch);

// An address followed by Enter becomes a link just as one followed by a space does.

describe('pressing Enter after a web address', () => {
    it('links the address and splits the block', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('see https://example.com'))]);
        editor.caretAfter('https://example.com');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([paragraph(text('see '), link('https://example.com')), paragraph()]);
    });

    it('does nothing inside inline code, only splitting', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com', { code: true }))]);
        editor.caretAfter('https://example.com');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([paragraph(text('https://example.com', { code: true })), paragraph()]);
    });

    it('leaves an address alone when the caret is inside it', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('see https://example.com/page'))]);
        editor.caretAfter('https://exa');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([paragraph(text('see https://exa')), paragraph(text('mple.com/page'))]);
    });

    it('links an address when only a space follows the caret', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com next'))]);
        editor.caretAfter('https://example.com');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([paragraph(link('https://example.com')), paragraph(text(' next'))]);
    });

    it('only splits after a word that is not an address', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('hello'))]);
        editor.caretAfter('hello');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([paragraph(text('hello')), paragraph()]);
    });

    it('is undone in two steps: the split first, then the link', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com'))]);
        editor.caretAfter('https://example.com');
        press(editor.view, 'Enter');

        undo(editor.view);
        expect(editor.stored()).toEqual([paragraph(link('https://example.com'))]);

        undo(editor.view);
        expect(editor.stored()).toEqual([paragraph(text('https://example.com'))]);
    });
});

const lineBreak = { type: 'break' };

// A line break or other inline element ends an address as whitespace does.

describe('a web address next to a line break', () => {
    it('is not joined to the word after the break when a space follows that word', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com'), lineBreak, text('next'))]);
        editor.caretAfter('next');

        editor.type(' ');

        expect(editor.stored()).toEqual([paragraph(text('https://example.com'), lineBreak, text('next '))]);
    });

    it('is not joined to the word after the break when Enter follows that word', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com'), lineBreak, text('next'))]);
        editor.caretAfter('next');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([paragraph(text('https://example.com'), lineBreak, text('next')), paragraph()]);
    });

    it('is linked when typed right after a break', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('see'), lineBreak, text('x'))]);
        editor.caretBefore('x');

        editor.type('https://example.com ');

        expect(editor.stored()).toEqual([paragraph(text('see'), lineBreak, link('https://example.com'), text(' x'))]);
    });

    it('is linked by Shift-Enter, which then breaks the line', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com'))]);
        editor.caretAfter('https://example.com');

        press(editor.view, 'Enter', true);

        expect(editor.stored()).toEqual([paragraph(link('https://example.com'), lineBreak)]);
    });
});
