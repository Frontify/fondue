/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { afterEach, describe, expect, it, vi } from 'vitest';

import { definePlugin, type PasteHandler, type RtePlugin } from '#/core';
import { defaultPlugins } from '#/plugins';

import { destroyEditors, editorWith, paragraph, shipped, text } from './testEditor';

/**
 * A feature's `onPaste` runs before the editor's own paste, and the link
 * feature uses it to turn a pasted address over selected text into a link.
 */

afterEach(destroyEditors);

const withPaste = (...handlers: PasteHandler[]): RtePlugin[] => [
    ...defaultPlugins,
    ...handlers.map((onPaste, index) => definePlugin({ id: `paste-${index}`, onPaste })),
];

describe('a plugin paste handler', () => {
    it('that handles the paste suppresses the default paste', () => {
        const editor = editorWith(
            withPaste(() => true),
            [paragraph(text('a'))],
        );
        editor.caretAfter('a');

        editor.paste('pasted');

        expect(editor.stored()).toBeNull();
    });

    it('that does not handle it lets the default paste happen', () => {
        const handler = vi.fn<PasteHandler>(() => false);
        const editor = editorWith(withPaste(handler), [paragraph(text('a'))]);
        editor.caretAfter('a');

        editor.paste('pasted', '<p>pasted</p>');

        expect(handler).toHaveBeenCalledWith({ text: 'pasted', html: '<p>pasted</p>' }, editor.api);
        expect(editor.stored()).toEqual([paragraph(text('apasted'))]);
    });

    it('is handed null for html the clipboard does not hold', () => {
        const handler = vi.fn<PasteHandler>(() => false);
        const editor = editorWith(withPaste(handler), [paragraph(text('a'))]);
        editor.caretAfter('a');

        editor.paste('pasted');

        expect(handler.mock.calls[0]?.[0]).toEqual({ text: 'pasted', html: null });
    });

    it('stops at the first handler that handles the paste', () => {
        const first = vi.fn<PasteHandler>(() => false);
        const second = vi.fn<PasteHandler>(() => true);
        const third = vi.fn<PasteHandler>(() => true);
        const editor = editorWith(withPaste(first, second, third), [paragraph(text('a'))]);
        editor.caretAfter('a');

        editor.paste('pasted');

        expect(first).toHaveBeenCalledOnce();
        expect(second).toHaveBeenCalledOnce();
        expect(third).not.toHaveBeenCalled();
    });
});

describe('pasting formatted text', () => {
    const pasted = (html: string) => {
        const editor = editorWith(defaultPlugins, [paragraph()]);
        editor.pasteHTML(html);
        return editor.stored();
    };

    it.each([
        ['<p style="font-weight: 700">x</p>', { bold: true }],
        ['<p><font style="font-style: italic">x</font></p>', { italic: true }],
        ['<p style="font-style: oblique 10deg">x</p>', { italic: true }],
        ['<p><font style="text-decoration: underline">x</font></p>', { underline: true }],
        ['<div style="text-decoration-line: line-through"><p>x</p></div>', { strikethrough: true }],
        ['<p><span style="vertical-align: sub">x</span></p>', { subscript: true }],
        ['<p><span style="vertical-align: super">x</span></p>', { superscript: true }],
    ])('reads the mark off any element whose style declares it: %s', (html, marks) => {
        expect(pasted(html)).toEqual([paragraph(text('x', marks))]);
    });

    it.each([
        ['<p><strong style="font-style:italic">x</strong></p>', { bold: true, italic: true }],
        ['<p><span style="color:#f00;font-weight:700">x</span></p>', { bold: true, fontColor: { color: '#f00' } }],
    ])('reads a style on an element another mark already reads: %s', (html, marks) => {
        expect(pasted(html)).toEqual([paragraph(text('x', marks))]);
    });

    it.each([
        ['<p><span style="font-weight:650">x</span></p>', [text('x', { bold: true })]],
        ['<p><span style="font-weight:1000">x</span></p>', [text('x', { bold: true })]],
        ['<p><strong><span style="font-weight:500">x</span></strong></p>', [text('x')]],
    ])('reads any weight of 600 or more as bold: %s', (html, children) => {
        expect(pasted(html)).toEqual([paragraph(...children)]);
    });

    it('reads the underline under an anchor that is not a link', () => {
        expect(pasted('<p><a name="x"><span style="text-decoration:underline">x</span></a></p>')).toEqual([
            paragraph(text('x', { underline: true })),
        ]);
    });

    it('reads every mark one element declares', () => {
        expect(
            pasted(
                '<p><span style="font-weight:700;font-style:italic;text-decoration:underline line-through">x</span></p>',
            ),
        ).toEqual([paragraph(text('x', { bold: true, italic: true, underline: true, strikethrough: true }))]);
    });

    it('takes bold off text under a span that sets the weight back to normal', () => {
        expect(pasted('<p><strong>a<span style="font-weight:normal">b</span></strong></p>')).toEqual([
            paragraph(text('a', { bold: true }), text('b')),
        ]);
    });

    it('takes italic off text under a span that sets the style back to normal', () => {
        expect(pasted('<p><em>a<span style="font-style:normal">b</span></em></p>')).toEqual([
            paragraph(text('a', { italic: true }), text('b')),
        ]);
    });

    it('does not read a <b> that sets the weight back to normal as bold', () => {
        expect(pasted('<b style="font-weight:normal"><p>x</p></b>')).toEqual([paragraph(text('x'))]);
    });

    it('keeps a line drawn by an ancestor under text-decoration: none, as a browser does', () => {
        expect(pasted('<p><u>a<span style="text-decoration: none">b</span></u></p>')).toEqual([
            paragraph(text('ab', { underline: true })),
        ]);
    });

    it('does not read the underline a link shows by default as formatting', () => {
        expect(
            pasted('<p><a href="https://example.com"><span style="text-decoration:underline">x</span></a></p>'),
        ).toEqual([paragraph(text('x', { link: { href: 'https://example.com' } }))]);
    });

    it('keeps the other lines a link declares beside the underline', () => {
        expect(
            pasted(
                '<p><a href="https://example.com"><span style="text-decoration:underline line-through">x</span></a></p>',
            ),
        ).toEqual([paragraph(text('x', { link: { href: 'https://example.com' }, strikethrough: true }))]);
    });

    it('does not read the underline a link declares on itself as formatting', () => {
        expect(pasted('<p><a href="https://example.com" style="text-decoration-line:underline">x</a></p>')).toEqual([
            paragraph(text('x', { link: { href: 'https://example.com' } })),
        ]);
    });

    it.each(['<p><b style="font-weight:500">x</b></p>', '<p><strong style="font-weight:lighter">x</strong></p>'])(
        'does not read a bold tag that sets a weight under 600 as bold: %s',
        (html) => {
            expect(pasted(html)).toEqual([paragraph(text('x'))]);
        },
    );

    it('keeps a line-through drawn by an ancestor under text-decoration-line: none', () => {
        expect(pasted('<p><s>a<span style="text-decoration-line: none">b</span></s></p>')).toEqual([
            paragraph(text('ab', { strikethrough: true })),
        ]);
    });

    it('does not read any bold weight a heading shows by default as formatting', () => {
        expect(pasted('<h3><span style="font-weight:650">x</span></h3>')).toEqual([
            { type: 'textStyle', style: 'heading3', children: [text('x')] },
        ]);
    });

    it('does not read the bold a heading shows by default as formatting', () => {
        expect(pasted('<h1><span style="font-weight:bold">x</span></h1>')).toEqual([
            { type: 'textStyle', style: 'heading1', children: [text('x')] },
        ]);
    });

    it('keeps only the inner of subscript and superscript', () => {
        expect(pasted('<p><sub><sup>x</sup></sub></p>')).toEqual([paragraph(text('x', { superscript: true }))]);
    });
});

describe('pasting over selected text with the link plugin', () => {
    const link = (href: string) => ({ link: { href } });

    it('links it when the text is a web address', () => {
        const editor = editorWith(shipped('link'), [paragraph(text('see frontify now'))]);
        editor.select('frontify');

        editor.paste('  https://example.com  ');

        expect(editor.stored()).toEqual([
            paragraph(text('see '), text('frontify', link('https://example.com')), text(' now')),
        ]);
    });

    it('links it when the text is a mail address', () => {
        const editor = editorWith(shipped('link'), [paragraph(text('mail'))]);
        editor.select('mail');

        editor.paste('mailto:ana@example.com');

        expect(editor.stored()).toEqual([paragraph(text('mail', link('mailto:ana@example.com')))]);
    });

    it('replaces the target of text that is linked already', () => {
        const editor = editorWith(shipped('link'), [paragraph(text('frontify', link('https://old.example')))]);
        editor.select('frontify');

        editor.paste('https://new.example');

        expect(editor.stored()).toEqual([paragraph(text('frontify', link('https://new.example')))]);
    });

    it('pastes text that is not an address as usual', () => {
        const editor = editorWith(shipped('link'), [paragraph(text('frontify'))]);
        editor.select('frontify');

        editor.paste('not a url');

        expect(editor.stored()).toEqual([paragraph(text('not a url'))]);
    });

    it('pastes as usual with nothing selected', () => {
        const editor = editorWith(shipped('link'), [paragraph(text('a'))]);
        editor.caretAfter('a');

        editor.paste('https://example.com');

        expect(editor.stored()).toEqual([paragraph(text('ahttps://example.com'))]);
    });

    it('does not link a javascript: address', () => {
        const editor = editorWith(shipped('link'), [paragraph(text('frontify'))]);
        editor.select('frontify');

        editor.paste('javascript:alert(1)');

        expect(editor.stored()).toEqual([paragraph(text('javascript:alert(1)'))]);
    });
});
