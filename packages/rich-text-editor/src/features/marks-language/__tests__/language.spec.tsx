/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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
            text: 'x',
            marks: [{ type: 'language', attrs: { lang: marked, dir: null } }],
        });
    }
    const block = { ...para(...content), attrs: { lang: blockLang, align: null } };
    const document = storedIn(model(), [block]);
    return { ...document, content: { ...document.content, attrs: { lang, dir: 'auto' } } };
};

const typedQuote = (document: RichTextDocument, atEnd = false) => {
    const mounted = mountText({ model: model(), document });
    if (atEnd) {
        setSelection(mounted.handle, { text: 'x', from: 1, to: 1 });
    }
    typeText(mounted.handle, '"');
    const written = mounted.handle
        .getSnapshot()
        .document.content.content?.[0]?.content?.map((node) => node.text)
        .join('');
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
        expect(handle.getSnapshot().document.content.content?.[0]?.content?.[0]?.marks).toEqual([
            { type: 'language', attrs: { lang: 'de-CH', dir: 'ltr' } },
        ]);
    });

    it.each([
        ['en', null, undefined, '“'],
        ['de', null, undefined, '„'],
        ['fr', null, undefined, '«'],
        ['ja', null, undefined, '「'],
        ['en', 'de', 'fr', '»'],
    ] as const)('quotes a passage whose language is %s / %s / %s with %s', (docLang, blockLang, marked, quote) => {
        const atEnd = marked !== undefined;
        expect(typedQuote(documentOf(docLang, blockLang, marked), atEnd)).toContain(quote);
    });
});
