/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { type RichTextDocument } from '#/model';

import { semanticModel } from '../../reader/__tests__/fixtures/semantic';
import { fixturesIn, pretty } from '../../reader/__tests__/helpers/helpers';
import { createCodecs } from '../codecs';

const codecs = createCodecs(semanticModel());
const resolveAssetUrl = (assetId: string) => `https://cdn.example/${assetId}`;

describe('codec golden files', () => {
    it.each(fixturesIn('valid'))(
        'writes the valid fixture %s as its golden HTML, plain text and Markdown',
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
        'writes %s as its golden HTML, plain text and Markdown',
        (_, fixture) => {
            const document = fixture as RichTextDocument;

            expect(pretty(codecs.toHTML(document).html)).toMatchSnapshot('html');
            expect(codecs.toPlainText(document).text).toMatchSnapshot('text');
            expect(codecs.toMarkdown(document).markdown).toMatchSnapshot('markdown');
        },
    );
});
