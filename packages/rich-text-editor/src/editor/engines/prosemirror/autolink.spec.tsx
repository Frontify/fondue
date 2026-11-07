/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { afterEach, describe, expect, it } from 'vitest';

import { defaultPlugins, linkPlugin } from '#/plugins';

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
