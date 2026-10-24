/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOMParser } from 'prosemirror-model';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs/codecs';
import { buildSchema } from '#/definition/schema';
import { RichTextReader } from '#/entries/reader';
import { fontColor } from '#/features/marks-font-color/feature';
import { language } from '#/features/marks-language/feature';
import { type ContentNodeJSON, type RichTextDocument } from '#/model';
import { mountText, para, storedIn, text, textFeatures, textModel } from '#/react/__tests__/fixtures/text';
import { setSelection, typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const model = () => textModel([...textFeatures(['typography.quotes']), language()]);

const documentOf = (lang: string | null, blockLang: string | null, marked?: string): RichTextDocument => {
    const content: ContentNodeJSON[] = [];
    if (marked !== undefined) {
        content.push({
            type: 'text',
            text: 'xx',
            marks: [{ type: 'language', attrs: { lang: marked, dir: null } }],
        });
    }
    const block = { ...para(...content), attrs: { lang: blockLang, align: null } };
    const document = storedIn(model(), [block]);
    return { ...document, content: { ...document.content, attrs: { lang, dir: 'auto' } } };
};

const typedQuote = (document: RichTextDocument, inPassage = false) => {
    const mounted = mountText({ model: model(), document });
    if (inPassage) {
        setSelection(mounted.handle, { text: 'xx', from: 1, to: 1 });
    }
    typeText(mounted.handle, '"');
    const block = mounted.handle.getSnapshot().document.content.content?.[0];
    const nodes = block?.content;
    const written = nodes?.map((node) => node.text).join('');
    mounted.unmount();
    return written ?? '';
};

describe('language marks', () => {
    it('rejects a language tag Intl cannot accept and stores a valid one', () => {
        const { handle } = mountText({ model: model(), blocks: [para(text('Hallo'))] });
        setSelection(handle, { text: 'Hallo' });
        const before = JSON.stringify(handle.getSnapshot().document);

        expect(handle.execute('mark.language.set', { lang: 'en_US!', dir: null })).toMatchObject({
            status: 'rejected',
            code: 'invalid-payload',
        });
        expect(handle.execute('mark.language.set', { lang: '', dir: null })).toMatchObject({
            status: 'rejected',
            code: 'invalid-payload',
        });
        expect(JSON.stringify(handle.getSnapshot().document)).toBe(before);

        expect(handle.execute('mark.language.set', { lang: 'de-CH', dir: 'ltr' }).status).toBe('applied');
        const block = handle.getSnapshot().document.content.content?.[0];
        const children = block?.content;
        const run = children?.[0];
        expect(run?.marks).toEqual([{ type: 'language', attrs: { lang: 'de-CH', dir: 'ltr' } }]);
    });

    it.each([
        ['en', null, undefined, '“'],
        ['de', null, undefined, '„'],
        ['fr', null, undefined, '«'],
        ['ja', null, undefined, '「'],
        ['en', 'de', 'fr', '»'],
    ] as const)('quotes a passage whose language is %s / %s / %s with %s', (docLang, blockLang, marked, quote) => {
        const inPassage = marked !== undefined;
        expect(typedQuote(documentOf(docLang, blockLang, marked), inPassage)).toContain(quote);
    });
});

const passage = (value: string, lang: string, dir: string | null = null): ContentNodeJSON =>
    ({ type: 'text', text: value, marks: [{ type: 'language', attrs: { lang, dir } }] }) as ContentNodeJSON;

const blockOf = (handle: ReturnType<typeof mountText>['handle']) =>
    handle.getSnapshot().document.content.content?.[0]?.content;

describe('language passages', () => {
    it('sets and removes the language of the whole passage around a caret', () => {
        const { handle } = mountText({
            model: model(),
            blocks: [para(text('Hello '), passage('Bonjour', 'fr'), text(' end'))],
        });
        setSelection(handle, { text: 'Bonjour', from: 3, to: 3 });

        expect(handle.execute('mark.language.set', { lang: 'de', dir: null }).status).toBe('applied');
        expect(blockOf(handle)).toEqual([text('Hello '), passage('Bonjour', 'de'), text(' end')]);

        setSelection(handle, { text: 'Bonjour', from: 3, to: 3 });
        expect(handle.execute('mark.language.set', null).status).toBe('applied');
        expect(blockOf(handle)).toEqual([text('Hello Bonjour end')]);
    });

    it.each([
        ['inside the second passage', { text: 'Bonjour', from: 3, to: 3 }],
        ['between the two passages', { text: 'Bonjour', from: 0, to: 0 }],
    ] as const)('changes only the passage under a caret %s, not its neighbour in another language', (_where, caret) => {
        const { handle } = mountText({
            model: model(),
            blocks: [para(passage('Hello', 'en'), passage('Bonjour', 'fr'))],
        });
        setSelection(handle, caret);

        expect(handle.execute('mark.language.set', { lang: 'de', dir: null }).status).toBe('applied');
        expect(blockOf(handle)).toEqual([passage('Hello', 'en'), passage('Bonjour', 'de')]);

        setSelection(handle, caret);
        expect(handle.execute('mark.language.set', null).status).toBe('applied');
        expect(blockOf(handle)).toEqual([passage('Hello', 'en'), text('Bonjour')]);
    });

    it('changes and removes the whole passage from a caret on its first character', () => {
        const { handle } = mountText({ model: model(), blocks: [para(passage('Bonjour', 'fr'))] });
        setSelection(handle, { text: 'Bonjour', from: 0, to: 0 });

        expect(handle.execute('mark.language.set', { lang: 'de', dir: null }).status).toBe('applied');
        expect(blockOf(handle)).toEqual([passage('Bonjour', 'de')]);

        setSelection(handle, { text: 'Bonjour', from: 0, to: 0 });
        expect(handle.execute('mark.language.set', null).status).toBe('applied');
        expect(blockOf(handle)).toEqual([text('Bonjour')]);
    });

    it('keeps text typed at the end of a passage out of it', () => {
        const { handle } = mountText({ model: model(), blocks: [para(passage('مرحبا', 'ar', 'rtl'), text(' end'))] });
        setSelection(handle, { text: 'مرحبا', from: 5, to: 5 });

        typeText(handle, '!');

        expect(blockOf(handle)).toEqual([passage('مرحبا', 'ar', 'rtl'), text('! end')]);
    });

    it('reads dir in any case from a pasted passage', () => {
        const schema = buildSchema(model());
        const host = document.createElement('div');
        host.innerHTML = '<p><span lang="ar" dir="RTL">a</span><span lang="en" dir="Ltr">b</span></p>';

        const marks = DOMParser.fromSchema(schema)
            .parse(host)
            .firstChild?.content.content.map((node): unknown => node.marks[0]?.attrs.dir);

        expect(marks).toEqual(['rtl', 'ltr']);
    });

    it('gives a block that starts in a passage with a dir that dir, in the editor, the reader and toHTML', () => {
        const languageModel = model();
        const blocks = [
            para(passage('مرحبا', 'ar', 'rtl'), text(' 2026.')),
            para(text('Say '), passage('مرحبا', 'ar', 'rtl')),
            para(text('42 '), passage('שלום', 'he', 'rtl')),
            para(passage('مرحبا', 'ar')),
        ];
        const document = storedIn(languageModel, blocks);
        const { view, unmount } = mountText({ model: languageModel, document });
        const edited = [...view.dom.querySelectorAll('p')].map((block) => block.getAttribute('dir'));
        unmount();
        const host = window.document.createElement('div');
        host.innerHTML = renderToStaticMarkup(createElement(RichTextReader, { document, model: languageModel }));
        const read = [...host.querySelectorAll('p')].map((block) => block.getAttribute('dir'));
        host.innerHTML = createCodecs(languageModel).toHTML(document).html;
        const written = [...host.querySelectorAll('p')].map((block) => block.getAttribute('dir'));

        expect(edited).toEqual(['rtl', null, 'rtl', null]);
        expect(read).toEqual(['rtl', 'auto', 'rtl', 'auto']);
        expect(written).toEqual(['rtl', 'auto', 'rtl', 'auto']);
        expect(host.querySelector('p span')?.getAttribute('dir')).toBe('rtl');
    });

    it('reapplies the last colour after a language was set', () => {
        const colorModel = textModel([...textFeatures(), language(), fontColor({ literalColors: true })]);
        const { handle } = mountText({ model: colorModel, blocks: [para(text('one two three'))] });
        setSelection(handle, { text: 'one' });
        expect(handle.execute('mark.font-color.set', { value: '#112233' }).status).toBe('applied');
        setSelection(handle, { text: 'two' });
        expect(handle.execute('mark.language.set', { lang: 'de', dir: null }).status).toBe('applied');
        setSelection(handle, { text: 'three' });

        expect(handle.execute('mark.color.reapply').status).toBe('applied');
        expect(blockOf(handle)?.at(-1)).toEqual({
            type: 'text',
            text: 'three',
            marks: [{ type: 'font_color', attrs: { tokenId: null, value: '#112233' } }],
        });
    });
});
