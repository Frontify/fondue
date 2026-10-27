/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { afterEach, describe, expect, it, vi } from 'vitest';

import { type PasteHandler, type RtePlugin } from '#/core';
import { defaultPlugins } from '#/plugins';

import { destroyEditors, editorWith, paragraph, shipped, text } from './testEditor';

/**
 * A feature's `onPaste` runs before the editor's own paste, and the link
 * feature uses it to turn a pasted address over selected text into a link.
 */

afterEach(destroyEditors);

const withPaste = (...handlers: PasteHandler[]): RtePlugin[] => [
    ...defaultPlugins,
    ...handlers.map((onPaste, index) => ({ id: `paste-${index}`, onPaste })),
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
