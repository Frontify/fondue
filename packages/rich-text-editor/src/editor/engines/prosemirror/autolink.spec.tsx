/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { undo as pmUndo } from 'prosemirror-history';
import { type EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { defineContent, defineMark, definePlugin } from '#/core';
import { defaultPlugins, linkPlugin } from '#/plugins';

import { destroyEditors, editorWith, paragraph, shipped, text } from './testEditor';

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

    it('leaves a run of closing punctuation and brackets out of the link', () => {
        const stored = typedIntoEmptyParagraph('(see https://a.com/x"),. ');

        expect(stored).toEqual([paragraph(text('(see '), link('https://a.com/x'), text('"),. '))]);
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

describe('typing a mail or phone address', () => {
    it('links a mailto: address once a space follows', () => {
        const stored = typedIntoEmptyParagraph('write mailto:ana@example.com ');

        expect(stored).toEqual([paragraph(text('write '), link('mailto:ana@example.com'), text(' '))]);
    });

    it('links a tel: number and leaves the full stop out', () => {
        const stored = typedIntoEmptyParagraph('call tel:+41791234567. ');

        expect(stored).toEqual([paragraph(text('call '), link('tel:+41791234567'), text('. '))]);
    });

    it('does not link a bare mail address', () => {
        const stored = typedIntoEmptyParagraph('ana@example.com ');

        expect(stored).toEqual([paragraph(text('ana@example.com '))]);
    });

    it('does not link a scheme with nothing after it', () => {
        const stored = typedIntoEmptyParagraph('mailto: tel:. ');

        expect(stored).toEqual([paragraph(text('mailto: tel:. '))]);
    });

    it('does not link inside an existing link', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('xy', { link: { href: 'https://a.com' } }))]);
        editor.caretAfter('x');

        editor.type(' mailto:ana@example.com ');

        expect(editor.stored()).toEqual([
            paragraph(text('x mailto:ana@example.com y', { link: { href: 'https://a.com' } })),
        ]);
    });

    it('does nothing inside inline code', () => {
        const editor = editorWith(defaultPlugins, [paragraph(text('xy', { code: true }))]);
        editor.caretAfter('x');

        editor.type(' tel:+41791234567 ');

        expect(editor.stored()).toEqual([paragraph(text('x tel:+41791234567 y', { code: true }))]);
    });
});

describe('typing a web address right after an opening bracket or quote', () => {
    it('links an address in parentheses and leaves the closing one out', () => {
        const stored = typedIntoEmptyParagraph('(https://frontify.com) ');

        expect(stored).toEqual([paragraph(text('('), link('https://frontify.com'), text(') '))]);
    });

    it.each([
        ['[', ']'],
        ['{', '}'],
        ['<', '>'],
    ])('links an address in %s brackets and leaves the closing one out', (open, close) => {
        const stored = typedIntoEmptyParagraph(`${open}https://frontify.com/x${close} `);

        expect(stored).toEqual([paragraph(text(open), link('https://frontify.com/x'), text(`${close} `))]);
    });

    it('builds a rule whose pattern uses the v flag', () => {
        const hashtags = definePlugin({
            id: 'hashtags',
            inputRules: [
                { kind: 'markPattern', pattern: new RegExp(String.raw`#\w+`, 'v'), mark: 'bold', value: () => ({}) },
            ],
        });

        expect(() => editorWith([...defaultPlugins, hashtags], [paragraph()])).not.toThrow();
    });

    it('starts a token of a rule with the v flag after an opening bracket', () => {
        const hashtags = definePlugin({
            id: 'hashtags',
            inputRules: [
                { kind: 'markPattern', pattern: new RegExp(String.raw`#\w+`, 'v'), mark: 'bold', value: () => ({}) },
            ],
        });
        const editor = editorWith([...defaultPlugins, hashtags], [paragraph()]);

        editor.type('(#tag ');

        expect(editor.stored()).toEqual([paragraph(text('('), text('#tag', { bold: true }), text(' '))]);
    });

    it('keeps the punctuation and brackets of a token whose rule declares no trim', () => {
        const mentions = definePlugin({
            id: 'mentions',
            inputRules: [{ kind: 'markPattern', pattern: /@[^\s]+/, mark: 'bold', value: () => ({}) }],
        });
        const editor = editorWith([...defaultPlugins, mentions], [paragraph()]);

        editor.type('@ana). ');

        expect(editor.stored()).toEqual([paragraph(text('@ana).', { bold: true }), text(' '))]);
    });

    it('links an address in straight double quotes', () => {
        const stored = typedIntoEmptyParagraph('see "https://frontify.com" ');

        expect(stored).toEqual([paragraph(text('see "'), link('https://frontify.com'), text('" '))]);
    });

    it('links an address in straight single quotes', () => {
        const stored = typedIntoEmptyParagraph("'https://frontify.com' ");

        expect(stored).toEqual([paragraph(text("'"), link('https://frontify.com'), text("' "))]);
    });

    it('links an address in curly quotes', () => {
        const stored = typedIntoEmptyParagraph('“https://frontify.com” ‘https://frontify.com’ ');

        expect(stored).toEqual([
            paragraph(text('“'), link('https://frontify.com'), text('” ‘'), link('https://frontify.com'), text('’ ')),
        ]);
    });

    it('links a mail address in parentheses', () => {
        const stored = typedIntoEmptyParagraph('(mailto:ana@example.com) ');

        expect(stored).toEqual([paragraph(text('('), link('mailto:ana@example.com'), text(') '))]);
    });

    it('does not link an address that continues a word', () => {
        const stored = typedIntoEmptyParagraph('xhttps://frontify.com ');

        expect(stored).toEqual([paragraph(text('xhttps://frontify.com '))]);
    });
});

describe('typing a web address the policy refuses', () => {
    const plugins = [linkPlugin({ allowedHosts: ['frontify.com'] })];

    it('leaves it as typed', () => {
        const editor = editorWith(plugins, [paragraph()]);

        editor.type('https://example.com ');

        expect(editor.stored()).toEqual([paragraph(text('https://example.com '))]);
    });

    it('links an address the policy allows', () => {
        const editor = editorWith(plugins, [paragraph()]);

        editor.type('https://frontify.com ');

        expect(editor.stored()).toEqual([paragraph(link('https://frontify.com'), text(' '))]);
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

// A second `markPattern` rule gets Enter marking and Backspace undo with no change to the engine.

const TAG_PATTERN = /#\w+/;

const tagPlugin = definePlugin({
    id: 'tags',
    content: defineContent({
        marks: {
            tag: defineMark<{ tag: string }>({
                toHtml: ({ tag }) => ({ tag: 'a', attrs: { href: `#${tag}` }, children: true }),
                parse: [{ tag: 'a' }],
            }),
        },
    }),
    inputRules: [
        {
            kind: 'markPattern',
            pattern: TAG_PATTERN,
            mark: 'tag',
            value: (token) => ({ tag: token.slice(1) }),
        },
    ],
});

const tag = (value: string) => text(`#${value}`, { tag: { tag: value } });

describe('a token of another markPattern rule', () => {
    it('is marked by Enter, which then splits the block', () => {
        const editor = editorWith([...shipped('paragraph'), tagPlugin], [paragraph(text('see #news'))]);
        editor.caretAfter('#news');

        press(editor.view, 'Enter');

        expect(editor.stored()).toEqual([paragraph(text('see '), tag('news')), paragraph()]);
    });

    it('is taken back by Backspace right after, keeping the new line', () => {
        const editor = editorWith([...shipped('paragraph'), tagPlugin], [paragraph(text('#news'))]);
        editor.caretAfter('#news');
        press(editor.view, 'Enter');

        const handled = press(editor.view, 'Backspace');

        expect(handled).toBe(true);
        expect(editor.stored()).toEqual([paragraph(text('#news')), paragraph()]);
    });
});
