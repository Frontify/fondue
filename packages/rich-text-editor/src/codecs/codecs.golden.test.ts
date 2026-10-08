/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type RichTextDocument } from '#/model';

import { fixturesIn, pretty } from '../../fixtures/reader/helpers';
import { semanticModel } from '../../fixtures/reader/semantic';

import { createCodecs } from './codecs';

const codecs = createCodecs(semanticModel());
const resolveAssetUrl = (assetId: string) => `https://cdn.example/${assetId}`;

describe('codec golden files', () => {
    it.each(fixturesIn('valid'))(
        'SPEC-rich-text-output/AC-028 writes the valid fixture %s as its golden HTML, plain text and Markdown',
        (_, fixture) => {
            const document = fixture as RichTextDocument;
            const html = codecs.toHTML(document);

            expect(pretty(html.html)).toMatchSnapshot('html');
            expect(html.diagnostics).toMatchSnapshot('html diagnostics');
            expect(codecs.toPlainText(document)).toMatchSnapshot('text');
            expect(codecs.toMarkdown(document, { resolveAssetUrl })).toMatchSnapshot('markdown');
        },
    );

    it.each([...fixturesIn('unknown'), ...fixturesIn('invalid')])(
        'SPEC-rich-text-output/AC-028 writes %s as its golden HTML, plain text and Markdown',
        (_, fixture) => {
            const document = fixture as RichTextDocument;

            expect(pretty(codecs.toHTML(document).html)).toMatchSnapshot('html');
            expect(codecs.toPlainText(document).text).toMatchSnapshot('text');
            expect(codecs.toMarkdown(document).markdown).toMatchSnapshot('markdown');
        },
    );
});
