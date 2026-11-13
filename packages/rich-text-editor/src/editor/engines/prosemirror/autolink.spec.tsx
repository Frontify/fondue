/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { undo as pmUndo } from 'prosemirror-history';
import { type EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { definePlugin } from '#/core';
import { defaultPlugins } from '#/plugins';

import {
    destroyEditors,
    editorWith,
    paragraph,
    text,
    token,
    TOKEN_TRIM,
    tokenPlugin,
    type TokenPluginOptions,
} from './testEditor';

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
        const editor = editorWith(defaultPlugins, [paragraph(text('xy', { code: true }))]);
        editor.caretAfter('x');

        editor.type(' https://example.com ');

        expect(editor.stored()).toEqual([paragraph(text('x https://example.com y', { code: true }))]);
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

const tokenEditor = (options: TokenPluginOptions = { trim: TOKEN_TRIM }) =>
    editorWith([...defaultPlugins, tokenPlugin(options)], [paragraph()]);

const typedToken = (value: string, options?: TokenPluginOptions) => {
    const editor = tokenEditor(options);
    editor.type(value);
    return editor.stored();
};

describe('typing a token a rule declares', () => {
    it('leaves a run of closing punctuation and brackets out of the token', () => {
        const stored = typedToken('(see tok:a/x"),. ');

        expect(stored).toEqual([paragraph(text('(see '), token('tok:a/x'), text('"),. '))]);
    });

    it.each([
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
        ['<', '>'],
    ])('marks a token after an opening %s and leaves the closing one out', (open, close) => {
        const stored = typedToken(`${open}tok:a/x${close} `);

        expect(stored).toEqual([paragraph(text(open), token('tok:a/x'), text(`${close} `))]);
    });

    it('keeps a closing bracket that balances an opening one', () => {
        const stored = typedToken('tok:a/Foo_(bar). ');

        expect(stored).toEqual([paragraph(token('tok:a/Foo_(bar)'), text('. '))]);
    });

    it.each([
        ['straight double quotes', '"', '"'],
        ['straight single quotes', "'", "'"],
        ['curly double quotes', '“', '”'],
        ['curly single quotes', '‘', '’'],
    ])('marks a token in %s', (_name, open, close) => {
        const stored = typedToken(`see ${open}tok:a/x${close} `);

        expect(stored).toEqual([paragraph(text(`see ${open}`), token('tok:a/x'), text(`${close} `))]);
    });

    it('does not mark a token that continues a word', () => {
        const stored = typedToken('xtok:a ');

        expect(stored).toEqual([paragraph(text('xtok:a '))]);
    });

    it('does not mark inside text that already carries the mark', () => {
        const editor = tokenEditor();
        editor.type('tok:a ');
        editor.caretAfter('tok');

        editor.type(' tok:b ');

        expect(editor.stored()).toEqual([paragraph(token('tok tok:b :a', 'tok:a'), text(' '))]);
    });

    it('leaves a token as typed when the rule refuses it', () => {
        const stored = typedToken('tok:no tok:yes ', { trim: TOKEN_TRIM, refuses: (value) => value === 'tok:no' });

        expect(stored).toEqual([paragraph(text('tok:no '), token('tok:yes'), text(' '))]);
    });

    it('keeps the punctuation and brackets of a token whose rule declares no trim', () => {
        const stored = typedToken('tok:a). ', {});

        expect(stored).toEqual([paragraph(token('tok:a).'), text(' '))]);
    });

    it('builds a rule whose pattern uses the v flag', () => {
        expect(() => tokenEditor({ pattern: new RegExp(String.raw`#\w+`, 'v') })).not.toThrow();
    });

    it('starts a token of a rule with the v flag after an opening bracket', () => {
        const stored = typedToken('(#tag ', { pattern: new RegExp(String.raw`#\w+`, 'v') });

        expect(stored).toEqual([paragraph(text('('), token('#tag'), text(' '))]);
    });
});

const press = (view: EditorView, key: string, modifiers: KeyboardEventInit = {}): boolean =>
    view.someProp('handleKeyDown', (handle) => handle(view, new KeyboardEvent('keydown', { key, ...modifiers }))) ===
    true;

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

    it.each([
        ['inside an address', 'see https://example.com/page', 'https://exa', 'https://exa', 'mple.com/page'],
        [
            'before a closing parenthesis',
            '(see https://example.com)',
            'https://example.com',
            'https://example.com',
            ')',
        ],
    ])('links what a typed space would when the caret is %s', (_where, value, caretAfter, linked, rest) => {
        const prefix = value.slice(0, value.indexOf(linked));
        const spaced = editorWith(defaultPlugins, [paragraph(text(value))]);
        spaced.caretAfter(caretAfter);
        spaced.type(' ');
        expect(spaced.stored()).toEqual([paragraph(text(prefix), link(linked), text(` ${rest}`))]);

        const editor = editorWith(defaultPlugins, [paragraph(text(value))]);
        editor.caretAfter(caretAfter);

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([paragraph(text(prefix), link(linked)), paragraph(text(rest))]);
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

    it('is undone in two steps: the link first, keeping the new line, then the split', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com'))]);
        editor.caretAfter('https://example.com');
        press(editor.view, 'Enter');

        undo(editor.view);
        expect(editor.stored()).toEqual([paragraph(text('https://example.com')), paragraph()]);

        undo(editor.view);
        expect(editor.stored()).toEqual([paragraph(text('https://example.com'))]);
    });

    it('is taken back by Backspace right after, keeping the new line', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com'))]);
        editor.caretAfter('https://example.com');
        press(editor.view, 'Enter');

        const handled = press(editor.view, 'Backspace');

        expect(handled).toBe(true);
        expect(editor.stored()).toEqual([paragraph(text('https://example.com')), paragraph()]);
    });

    it.each(['altKey', 'ctrlKey', 'metaKey', 'shiftKey'])(
        'keeps the link when Backspace is pressed with %s',
        (modifier) => {
            const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com'))]);
            editor.caretAfter('https://example.com');
            press(editor.view, 'Enter');

            press(editor.view, 'Backspace', { [modifier]: true });

            expect(editor.stored()?.[0]).toEqual(paragraph(link('https://example.com')));
        },
    );

    it('still links when a state is applied and thrown away while Enter is handled', () => {
        let editor: ReturnType<typeof editorWith> | undefined;
        const peek = definePlugin({
            id: 'peek-on-enter',
            hotkeys: {
                Enter: {
                    label: 'Peek',
                    run: () => {
                        const state = editor?.view.state;
                        state?.apply(state.tr.insertText('x'));
                        return false;
                    },
                },
            },
        });
        editor = editorWith([...defaultPlugins, peek], [paragraph(text('https://example.com'))]);
        editor.caretAfter('https://example.com');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([paragraph(link('https://example.com')), paragraph()]);
    });

    it('keeps the link when Backspace follows a mark toggled at the caret', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com'))]);
        editor.caretAfter('https://example.com');
        press(editor.view, 'Enter');
        const { state } = editor.view;
        editor.view.dispatch(state.tr.addStoredMark(state.schema.mark('bold')));

        press(editor.view, 'Backspace');

        expect(editor.stored()?.[0]).toEqual(paragraph(link('https://example.com')));
    });

    it('keeps the link when Backspace follows focus leaving the editor', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com'))]);
        editor.caretAfter('https://example.com');
        press(editor.view, 'Enter');
        editor.view.dom.dispatchEvent(new FocusEvent('blur'));

        press(editor.view, 'Backspace');

        expect(editor.stored()?.[0]).toEqual(paragraph(link('https://example.com')));
    });

    it('keeps the link when Backspace follows a caret move', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com'))]);
        editor.caretAfter('https://example.com');
        press(editor.view, 'Enter');
        editor.caretBefore('https');

        press(editor.view, 'Backspace');

        expect(editor.stored()?.[0]).toEqual(paragraph(link('https://example.com')));
    });

    it('does nothing when inline code is switched on at the caret, only splitting', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com'))]);
        editor.caretAfter('https://example.com');
        const { state } = editor.view;
        editor.view.dispatch(state.tr.addStoredMark(state.schema.mark('code')));

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([paragraph(text('https://example.com')), paragraph()]);
    });

    it('reads no further back than a typed space does', () => {
        const address = `https://${'a'.repeat(600)}`;
        const editor = editorWith(defaultPlugins, [paragraph(text(address))]);
        editor.caretAfter(address);

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([paragraph(text(address)), paragraph()]);
        expect(typedIntoEmptyParagraph(`${address} `)).toEqual([paragraph(text(`${address} `))]);
    });

    it('is taken back by Backspace after a key that changed nothing, while the editor has focus', async () => {
        const keepEnter = definePlugin({
            id: 'keep-enter',
            hotkeys: { Enter: { label: 'Keep Enter', run: () => true } },
        });
        const editor = editorWith([...defaultPlugins, keepEnter], [paragraph(text('https://example.com'))]);
        editor.caretAfter('https://example.com');
        vi.spyOn(editor.view, 'hasFocus').mockReturnValue(true);

        press(editor.view, 'Enter');
        await Promise.resolve();
        expect(editor.stored()).toEqual([paragraph(link('https://example.com'))]);

        expect(press(editor.view, 'Backspace')).toBe(true);
        expect(editor.stored()).toEqual([paragraph(text('https://example.com'))]);
    });

    it('leaves Backspace to join the lines once something else happened', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com'))]);
        editor.caretAfter('https://example.com');
        press(editor.view, 'Enter');
        editor.type('x');
        const { state } = editor.view;
        editor.view.dispatch(state.tr.delete(state.selection.from - 1, state.selection.from));

        press(editor.view, 'Backspace');

        expect(editor.stored()).toEqual([paragraph(link('https://example.com'))]);
    });

    it('links the address in an editor where Enter blurs instead of splitting', async () => {
        // What `blurOnBreakPlugin` does outside a list.
        const blurOnEnter = definePlugin({
            id: 'blur-on-enter',
            hotkeys: {
                Enter: {
                    label: 'Blur',
                    run: (api) => {
                        api.blur();
                        return true;
                    },
                },
            },
        });
        const editor = editorWith([...defaultPlugins, blurOnEnter], [paragraph(text('https://example.com'))]);
        editor.caretAfter('https://example.com');

        press(editor.view, 'Enter');
        await Promise.resolve();

        expect(editor.stored()).toEqual([paragraph(link('https://example.com'))]);
        // The editor has lost focus: a later Backspace edits the text as usual.
        press(editor.view, 'Backspace');
        expect(editor.stored()).toEqual([paragraph(link('https://example.com'))]);
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

    it('is linked by Enter when a break follows the caret', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com'), lineBreak, text('x'))]);
        editor.caretAfter('https://example.com');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([paragraph(link('https://example.com')), paragraph(lineBreak, text('x'))]);
    });

    it('is linked by Shift-Enter, which then breaks the line', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('https://example.com'))]);
        editor.caretAfter('https://example.com');

        press(editor.view, 'Enter', { shiftKey: true });

        expect(editor.stored()).toEqual([paragraph(link('https://example.com'), lineBreak)]);
    });
});
