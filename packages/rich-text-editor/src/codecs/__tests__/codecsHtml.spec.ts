/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { codeBlock, link, mark, paragraph, text } from '#/features/__tests__/fixtures/documents';
import { vocabularyModel } from '#/features/__tests__/fixtures/vocabulary';
import { core } from '#/features/core/feature';
import { compileContentModel, defineFeature, type JsonValue, type RichTextDocument } from '#/model';

import { fixturesIn, renderReader } from '../../reader/__tests__/helpers/helpers';
import { createCodecs } from '../codecs';

import { requires, testDocument, codesOf } from './fixtures/codecDocuments';
import { semanticCodecs, stored } from './helpers/helpers';

describe('toHTML', () => {
    const codecs = semanticCodecs();

    it('reports one codecs.lossy-output info per lossy feature with its count', () => {
        const document = stored(
            paragraph(text('Hi', mark('font_color', { tokenId: 'brand.red', value: null }))),
            paragraph(
                text('Go', link('https://frontify.com')),
                text('!', mark('highlight', { tokenId: null, value: '#ffcc00' })),
            ),
        );
        const lossy = codecs.toHTML(document).diagnostics.filter(({ code }) => code === 'codecs.lossy-output');

        expect(lossy).toEqual([
            {
                code: 'codecs.lossy-output',
                severity: 'info',
                messageKey: 'codecs.lossy-output',
                featureId: 'fixture.colors',
                details: { count: 2 },
            },
            {
                code: 'codecs.lossy-output',
                severity: 'info',
                messageKey: 'codecs.lossy-output',
                featureId: 'fixture.link',
                details: { count: 1 },
            },
        ]);
        expect(codecs.toHTML(stored(paragraph(text('plain')))).diagnostics).toEqual([]);
    });

    it('escapes text and attribute values and drops a URL that fails checkHref', () => {
        const hostile = '"><script>alert(1)</script>&';
        const output = codecs.toHTML(stored(paragraph(text(hostile, link(`https://frontify.com/?q=${hostile}`)))));

        expect(output.html).toBe(
            '<div class="fondue-rte-content"><p dir="auto"><a href="https://frontify.com/?q=&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;&amp;">&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;&amp;</a></p></div>',
        );
    });

    it.each([...fixturesIn('valid'), ...fixturesIn('unknown'), ...fixturesIn('invalid')])(
        "writes the reader's static markup for %s",
        (_, document) => {
            const model = vocabularyModel();
            const html = createCodecs(model).toHTML(document as RichTextDocument).html;

            expect(html).toBe(renderReader(document, model).replaceAll('<!-- -->', ''));
        },
    );

    it('writes the content classes of the presentation as the reader does', () => {
        const [[, document]] = fixturesIn('valid') as [[string, unknown]];
        const model = vocabularyModel();
        const presentation = { styles: [], colorTokens: [], contentClassName: 'host-content' };
        const { html } = createCodecs(model).toHTML(document as RichTextDocument, presentation);

        expect(html).toMatch(/^<div class="fondue-rte-content host-content"/);
        expect(html).toBe(renderReader(document, model, { presentation }).replaceAll('<!-- -->', ''));
    });

    it('escapes a content class that would close the attribute', () => {
        const [[, document]] = fixturesIn('valid') as [[string, unknown]];
        const model = vocabularyModel();
        const presentation = { styles: [], colorTokens: [], contentClassName: 'a" onmouseover="x' };
        const { html } = createCodecs(model).toHTML(document as RichTextDocument, presentation);

        expect(html).toMatch(/^<div class="fondue-rte-content a&quot; onmouseover=&quot;x"/);
        expect(html).not.toContain(' onmouseover="x"');
        expect(html).toBe(renderReader(document, model, { presentation }).replaceAll('<!-- -->', ''));
    });

    it.each([
        ['a b', 'a b'],
        ['a  b', 'a \u00A0b'],
        ['a     b', 'a \u00A0 \u00A0 b'],
    ])('writes %j with U+0020 and U+00A0 alternating from a space', (input, expected) => {
        expect(codecs.toHTML(stored(paragraph(text(input)))).html).toBe(
            `<div class="fondue-rte-content"><p dir="auto">${expected}</p></div>`,
        );
    });

    it('keeps every space of a code block as U+0020', () => {
        expect(codecs.toHTML(stored(codeBlock(text('a  b')))).html).toBe(
            '<div class="fondue-rte-content"><pre dir="auto"><code>a  b</code></pre></div>',
        );
    });
});

describe('toHTML style, overrides and locale', () => {
    const fail = () => {
        throw new Error('override failed');
    };
    const styled = defineFeature({
        id: 'test.styled',
        version: 1,
        requires,
        attributes: {
            align: {
                on: ['paragraph'],
                value: { type: 'enum', values: ['left', 'right'], nullable: true, default: null },
                html: { style: 'text-align' },
            },
        },
        nodes: {
            badge: {
                group: 'inline',
                atom: true,
                attrs: {},
                html: ['span', { style: 'font-weight: bold; --tone: warm;; color: ; color: red', 'data-x': 'y' }],
                parse: [],
            },
            plainstyle: { group: 'inline', atom: true, attrs: {}, html: ['span', { style: ';' }], parse: [] },
            chip: { group: 'inline', atom: true, attrs: {}, html: ['span'], parse: [] },
            listing: { group: 'block', content: 'text*', whitespace: 'pre', attrs: {}, html: ['pre', 0], parse: [] },
        },
        formats: { html: 'lossless', text: 'unsupported', markdown: 'unsupported' },
        codecs: { html: { nodes: { chip: fail, listing: fail } } },
    });
    const model = compileContentModel([core(), styled()], { id: 'test.styled', version: 1 });
    const codecs = createCodecs(model);
    const paragraphOf = (attrs: object, ...content: readonly JsonValue[]) => ({
        type: 'paragraph',
        attrs: { lang: null, align: null, ...attrs },
        content,
    });

    it('writes style bindings and literal styles as the reader does', () => {
        const document = testDocument(
            model,
            paragraphOf({ align: 'right' }, { type: 'text', text: 'a ' }, { type: 'badge' }, { type: 'plainstyle' }),
        );
        const { html } = codecs.toHTML(document);

        expect(html).toBe(renderReader(document, model).replaceAll('<!-- -->', ''));
        expect(html).toBe(
            '<div class="fondue-rte-content"><p style="text-align:right" dir="auto">a <span style="font-weight:bold;--tone:warm;color:red" data-x="y"></span><span></span></p></div>',
        );
    });

    it('writes an inline node whose override throws as a span that continues the spaces, and a pre node as a div', () => {
        const document = testDocument(
            model,
            paragraphOf({}, { type: 'text', text: 'a ' }, { type: 'chip' }, { type: 'text', text: ' b' }),
            { type: 'listing', content: [{ type: 'text', text: 'x y' }] },
        );
        const { html, diagnostics } = codecs.toHTML(document);

        expect(html).toBe(
            '<div class="fondue-rte-content"><p dir="auto">a <span role="group" aria-label="Unsupported content: test.styled" data-rte-island=""></span> b</p><div role="group" aria-label="Unsupported content: test.styled" data-rte-island="">x y</div></div>',
        );
        expect(codesOf(diagnostics)).toEqual(['codecs.override-failed', 'codecs.override-failed']);
    });

    it('writes island labels and the notice in the locale option, falling back to English', () => {
        const partial = { lang: 'xx', translationStrings: { RichTextEditor_readerIslandGeneric: 'Unbekannt' } };
        const islands = testDocument(model, 5 as unknown as JsonValue, { type: 'widget', content: [] });
        const { html } = codecs.toHTML(islands, { locale: partial });

        expect(html).toBe(
            '<div class="fondue-rte-content"><div role="group" aria-label="Unbekannt" data-rte-island=""></div><div role="group" aria-label="Unsupported content: widget" data-rte-island=""></div><div role="note" data-rte-message="islands" lang="xx">Some content is not supported here.</div></div>',
        );
    });

    it('writes a document of one leaf block or one island, which is not empty', () => {
        const rule = compileContentModel(
            [
                core(),
                defineFeature({
                    id: 'test.rule',
                    version: 1,
                    requires,
                    nodes: { rule: { group: 'block', attrs: {}, html: ['hr'], parse: [] } },
                })(),
            ],
            {
                id: 'test.rule',
                version: 1,
            },
        );

        expect(createCodecs(rule).toHTML(testDocument(rule, { type: 'rule' })).html).toBe(
            '<div class="fondue-rte-content"><hr dir="auto"/></div>',
        );
        expect(codecs.toHTML(testDocument(model, { type: 'widget' })).html).toContain('data-rte-island=""></div>');
    });
});

describe('HTML override tags', () => {
    it.each([
        'script',
        'style',
        'iframe',
        'object',
        'embed',
        'template',
        'meta',
        'link',
        'base',
        'form',
        'Div',
        'x y',
        'svg:a',
    ])('fails an HTML override that writes the tag %j', (tag) => {
        const model = compileContentModel(
            [
                core(),
                defineFeature({
                    id: 'test.unsafe',
                    version: 1,
                    requires,
                    nodes: { box: { group: 'block', content: 'inline*', attrs: {}, html: ['div', 0], parse: [] } },
                    formats: { html: 'lossless', text: 'lossless', markdown: 'unsupported' },
                    codecs: { html: { nodes: { box: () => ['section', [tag, 0]] } } },
                })(),
            ],
            { id: 'test.unsafe', version: 1 },
        );
        const output = createCodecs(model).toHTML(
            testDocument(model, { type: 'box', content: [{ type: 'text', text: 'x' }] }),
        );

        expect(codesOf(output.diagnostics)).toEqual(['codecs.override-failed']);
        expect(output.html).not.toContain(`<${tag}`);
    });
});
