/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { createCodecs } from '#/codecs';
import { RichTextReader } from '#/entries/reader';
import { align } from '#/features/blocksAlign/feature';
import { heading } from '#/features/blocksHeading/feature';
import { core } from '#/features/core/feature';
import { language } from '#/features/marksLanguage/feature';
import { compileContentModel, type RichTextDocument } from '#/model';

const model = compileContentModel([core(), heading(), align(), language()], { id: 'test.output', version: 1 });

const document = {
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: model.ref,
    requiredCapabilities: model.capabilities,
    content: {
        type: 'doc',
        attrs: { lang: 'en', dir: 'ltr' },
        content: [
            {
                type: 'paragraph',
                attrs: { lang: 'de', align: null },
                content: [
                    { type: 'text', text: 'Danke ' },
                    {
                        type: 'text',
                        text: 'شكرا',
                        marks: [{ type: 'language', attrs: { lang: 'ar', dir: 'rtl' } }],
                    },
                ],
            },
            ...(['left', 'center', 'right', 'justify'] as const).map((value) => ({
                type: 'paragraph',
                attrs: { lang: null, align: value },
                content: [{ type: 'text', text: value }],
            })),
        ],
    },
} as unknown as RichTextDocument;

const reader = () => renderToStaticMarkup(createElement(RichTextReader, { document, model }));

describe('alignment, direction and language output', () => {
    it('writes lang and dir from the document, a block and a language mark', () => {
        const markup = reader();

        expect(markup).toContain('lang="en"');
        expect(markup).toContain('dir="ltr"');
        expect(markup).toContain('lang="de"');
        expect(markup).toContain('lang="ar"');
        expect(markup).toContain('dir="rtl"');
        expect(markup).toMatchSnapshot();
    });

    it('writes each alignment as an inline text-align style in the reader and in HTML', () => {
        const markup = reader();
        const html = createCodecs(model).toHTML(document).html;

        for (const value of ['left', 'center', 'right', 'justify']) {
            expect(markup).toContain(`text-align:${value}`);
            expect(html).toContain(`text-align:${value}`);
        }

        expect(html).toMatchSnapshot();
        expect(markup).toBe(html);
    });
});
