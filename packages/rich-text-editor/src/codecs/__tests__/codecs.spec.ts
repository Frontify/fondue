/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { link, mark, node, paragraph, table, text } from '#/features/__tests__/fixtures/documents';
import { core } from '#/features/core/feature';
import {
    compileContentModel,
    createEmptyDocument,
    defineFeature,
    type CodecOverrides,
    type Diagnostic,
    type FeatureDeclaration,
    type FeatureFormats,
    type JsonValue,
    type RichTextDocument,
} from '#/model';

import { semanticModel } from '../../reader/__tests__/fixtures/semantic';
import { fixturesIn } from '../../reader/__tests__/helpers/helpers';
import { createCodecs } from '../codecs';

import { requires, failureOf, compile, testDocument, codesOf } from './fixtures/codecDocuments';
import { semanticCodecs, stored } from './helpers/helpers';

describe('createCodecs model check', () => {
    const widget = (formats: FeatureFormats, codecs: CodecOverrides = {}): FeatureDeclaration => ({
        id: 'test.widget',
        version: 1,
        requires,
        nodes: { widget: { group: 'block', attrs: {}, html: ['div', { 'data-widget': '' }], parse: [] } },
        formats,
        codecs,
    });

    it.each(['text', 'markdown'] as const)(
        'throws definition.missing-codec for %s when a leaf node has no rule, form or override for it',
        (format) => {
            const formats = {
                html: 'lossless',
                text: 'unsupported',
                markdown: 'unsupported',
                [format]: 'lossy',
            } as const;

            expect(failureOf(() => createCodecs(compile(widget(formats))))).toEqual({
                code: 'definition.missing-codec',
                details: { feature: 'test.widget', format, path: '/nodes/widget' },
            });
        },
    );

    it('throws definition.missing-codec for html when a node with content has a spec with no content hole', () => {
        const caption: FeatureDeclaration = {
            id: 'test.caption',
            version: 1,
            requires,
            nodes: { caption: { group: 'block', content: 'inline*', attrs: {}, html: ['figcaption'], parse: [] } },
            formats: { html: 'lossless', text: 'lossless', markdown: 'unsupported' },
        };

        expect(failureOf(() => createCodecs(compile(caption)))).toEqual({
            code: 'definition.missing-codec',
            details: { feature: 'test.caption', format: 'html', path: '/nodes/caption' },
        });
    });

    it('accepts each format once a codec override provides it, and skips one marked unsupported', () => {
        const formats = { html: 'lossless', text: 'lossless', markdown: 'lossless' } as const;
        const overrides = {
            text: { nodes: { widget: () => 'widget' } },
            markdown: { nodes: { widget: () => '(widget)' } },
        };
        const unsupported = { html: 'lossless', text: 'unsupported', markdown: 'unsupported' } as const;

        expect(() => createCodecs(compile(widget(formats, overrides)))).not.toThrow();
        expect(() => createCodecs(compile(widget(unsupported)))).not.toThrow();
    });

    it('accepts a Markdown form in place of an override', () => {
        const formats = { html: 'lossless', text: 'lossless', markdown: 'lossless' } as const;
        const aside: FeatureDeclaration = {
            id: 'test.aside',
            version: 1,
            requires,
            nodes: {
                aside: { group: 'block', attrs: {}, html: ['hr'], parse: [], markdown: { prefix: '*** ' } },
            },
            formats,
        };

        expect(failureOf(() => createCodecs(compile(aside)))).toEqual({
            code: 'definition.missing-codec',
            details: { feature: 'test.aside', format: 'text', path: '/nodes/aside' },
        });
        expect(() => createCodecs(compile({ ...aside, formats: { ...formats, text: 'unsupported' } }))).not.toThrow();
    });

    it('accepts a feature with no nodes, marks or formats', () => {
        expect(() => createCodecs(compile({ id: 'test.empty', version: 1, requires }))).not.toThrow();
    });
});

describe('toPlainText and toMarkdown losses', () => {
    const codecs = semanticCodecs();
    const styled = node('paragraph', { lang: null, styleId: 'brand.lead', align: null, indent: 0 }, text('Lead'));
    const grid = table(
        'tb-1',
        node(
            'table_row',
            undefined,
            node('table_cell', { colspan: 1, rowspan: 1, colwidth: null }, paragraph(text('a'))),
        ),
    );

    it('lists one loss per lossy text feature with its count', () => {
        const output = codecs.toPlainText(stored(styled, grid, node('column_break'), node('column_break')));

        expect(output.losses).toEqual([
            { featureId: 'fixture.styles', count: 1 },
            { featureId: 'fixture.tables', count: 3 },
            { featureId: 'fixture.blocks', count: 2 },
        ]);
        expect(codecs.toPlainText(stored(paragraph(text('a')), paragraph(text('b')))).losses).toEqual([]);
    });

    it('lists a feature that marks text and Markdown unsupported, with its count, from each codec', () => {
        const model = compileContentModel(
            [
                core(),
                defineFeature({
                    id: 'test.note',
                    version: 1,
                    requires,
                    nodes: { note: { group: 'block', content: 'inline*', attrs: {}, html: ['aside', 0], parse: [] } },
                    formats: { html: 'lossless', text: 'unsupported', markdown: 'unsupported' },
                })(),
            ],
            { id: 'test.model', version: 1 },
        );
        const note = { type: 'note', content: [{ type: 'text', text: 'Hi' }] };
        const document = testDocument(model, note, note, {
            type: 'paragraph',
            attrs: { lang: null },
            content: [{ type: 'text', text: 'Plain' }],
        });
        const unsupported = createCodecs(model);

        expect(unsupported.toPlainText(document)).toMatchObject({
            text: 'Hi\n\nHi\n\nPlain',
            losses: [{ featureId: 'test.note', count: 2 }],
        });
        expect(unsupported.toMarkdown(document)).toMatchObject({
            markdown: 'Hi\n\nHi\n\nPlain',
            losses: [{ featureId: 'test.note', count: 2 }],
        });
    });
});

describe('codec overrides', () => {
    const quote = (codecs: CodecOverrides) =>
        compile({
            id: 'test.quote',
            version: 1,
            requires,
            nodes: { quote: { group: 'block', content: 'inline*', attrs: {}, html: ['blockquote', 0], parse: [] } },
            formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
            codecs,
        });
    const fail = () => {
        throw new Error('override failed');
    };

    const quoteDocument = (model: ReturnType<typeof quote>) =>
        testDocument(
            model,
            { type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text: 'Before' }] },
            { type: 'quote', content: [{ type: 'text', text: 'Quoted <b>' }] },
            { type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text: 'After' }] },
        );
    const failure = (format: string) => ({
        code: 'codecs.override-failed',
        severity: 'error',
        messageKey: 'codecs.override-failed',
        path: '/content/content/1',
        featureId: 'test.quote',
        details: { name: 'quote', format },
    });

    it('writes the text of a node whose Markdown override throws and reports codecs.override-failed', () => {
        const model = quote({ markdown: { nodes: { quote: fail } } });
        const output = createCodecs(model).toMarkdown(quoteDocument(model));

        expect(output.markdown).toBe('Before\n\nQuoted \\<b>\n\nAfter');
        expect(output.diagnostics).toEqual([failure('markdown')]);
    });

    it('writes a node whose HTML override throws as the island fallback', () => {
        const model = quote({ html: { nodes: { quote: fail } } });
        const output = createCodecs(model).toHTML(quoteDocument(model));

        expect(output.html).toBe(
            '<div class="fondue-rte-content"><p dir="auto">Before</p><div role="group" aria-label="Unsupported content: test.quote" data-rte-island="">Quoted &lt;b&gt;</div><p dir="auto">After</p></div>',
        );
        expect(output.diagnostics).toEqual([failure('html')]);
    });

    it('writes the text of a node whose text override throws', () => {
        const model = quote({ text: { nodes: { quote: fail } } });
        const output = createCodecs(model).toPlainText(quoteDocument(model));

        expect(output.text).toBe('Before\n\nQuoted <b>\n\nAfter');
        expect(output.diagnostics).toEqual([failure('text')]);
    });

    it('writes what each override returns when it does not throw', () => {
        const model = quote({
            html: { nodes: { quote: () => ['q', { cite: 'https://frontify.com' }, 0] } },
            markdown: { nodes: { quote: (inner) => `> ${inner}` } },
            text: { nodes: { quote: (inner) => `“${inner}”` } },
        });
        const codecs = createCodecs(model);

        expect(codecs.toHTML(quoteDocument(model)).html).toContain(
            '<q cite="https://frontify.com" dir="auto">Quoted &lt;b&gt;</q>',
        );
        expect(codecs.toMarkdown(quoteDocument(model)).markdown).toContain('\n\n> Quoted \\<b>\n\n');
        expect(codecs.toPlainText(quoteDocument(model)).text).toContain('“Quoted <b>”');
    });

    it('rejects an HTML override that binds a stored value to style', () => {
        const model = quote({ html: { nodes: { quote: () => ['blockquote', { style: { attr: 'x' } }, 0] } } });

        expect(codesOf(createCodecs(model).toHTML(quoteDocument(model)).diagnostics)).toEqual([
            'codecs.override-failed',
        ]);
    });
});

describe('codecs over blocked and island documents', () => {
    const unlimited = createCodecs(semanticModel());
    const limited = createCodecs(semanticModel(), { limits: { maxDocumentNodes: 3 } });
    const valid = stored(paragraph(text('a')), paragraph(text('b')), paragraph(text('c')));
    const blocked: readonly (readonly [string, unknown, ReturnType<typeof createCodecs>, string])[] = [
        [
            'another content model',
            { ...valid, model: { id: 'other.model', version: 1 } },
            unlimited,
            'format.wrong-model',
        ],
        ['format version 2', { ...valid, formatVersion: 2 }, unlimited, 'format.unknown-format-version'],
        ['a document over maxDocumentNodes', valid, limited, 'format.limit-exceeded'],
    ];

    it.each(blocked)(
        'returns empty output with the decode diagnostic for %s from each codec',
        (_, document, codecs, code) => {
            const input = document as RichTextDocument;

            const diagnostics = [expect.objectContaining({ code })];

            expect(codecs.toHTML(input)).toEqual({ html: '', css: '', diagnostics, blocked: true });
            expect(codecs.toPlainText(input)).toEqual({ text: '', losses: [], diagnostics, blocked: true });
            expect(codecs.toMarkdown(input)).toEqual({ markdown: '', losses: [], diagnostics, blocked: true });
            expect(unlimited.toHTML(valid).blocked).toBe(false);
            expect(unlimited.toPlainText(valid).blocked).toBe(false);
            expect(unlimited.toMarkdown(valid).blocked).toBe(false);
            expect(unlimited.toHTML(valid).html).toBe(
                '<div class="fondue-rte-content"><p dir="auto">a</p><p dir="auto">b</p><p dir="auto">c</p></div>',
            );
        },
    );

    const codecs = semanticCodecs();
    const original = {
        type: 'callout',
        attrs: { href: 'javascript:alert(1)' },
        content: [{ type: 'text', text: '<img src=x onerror=alert(1)>' }],
    };
    const inline = {
        type: 'sticker',
        attrs: { src: 'javascript:alert(2)', html: '<script>' },
        content: [{ type: 'text', text: 'a*b' }],
    };
    const islands = stored(original as unknown as JsonValue, paragraph(text('Mood '), inline as unknown as JsonValue));
    const unknownNodes: readonly Partial<Diagnostic>[] = [
        { code: 'format.unknown-node', path: '/content/content/0' },
        { code: 'format.unknown-node', path: '/content/content/1/content/1' },
    ];

    it('writes the escaped text of each island and reports it by its decode diagnostic', () => {
        const html = codecs.toHTML(islands);
        const plain = codecs.toPlainText(islands);
        const markdown = codecs.toMarkdown(islands);

        expect(html.html).toContain('data-rte-island="">&lt;img src=x onerror=alert(1)&gt;</div>');
        expect(html.html).toContain(
            '<p dir="auto">Mood <span role="group" aria-label="Unsupported content: sticker" data-rte-island="">a*b</span></p>',
        );
        expect(plain.text).toBe('<img src=x onerror=alert(1)>\n\nMood a*b');
        expect(markdown.markdown).toBe('\\<img src=x onerror=alert(1)>\n\nMood a\\*b');
        for (const output of [html, plain, markdown]) {
            expect(output.blocked).toBe(false);
            expect(output.diagnostics.filter(({ code }) => code === 'format.unknown-node')).toEqual(
                unknownNodes.map((expected): unknown => expect.objectContaining(expected)),
            );
            expect(JSON.stringify(output)).not.toContain('javascript:');
            expect(JSON.stringify(output)).not.toContain('<script>');
        }

        expect(plain.losses).toEqual([]);
        expect(markdown.losses).toEqual([]);
    });
});

describe('empty documents', () => {
    it('writes the empty string for an empty document through toHTML and toPlainText', () => {
        const model = semanticModel();
        const codecs = createCodecs(model);
        const empty = createEmptyDocument(model);

        expect(codecs.toHTML(empty).html).toBe('');
        expect(codecs.toPlainText(empty).text).toBe('');
        expect(codecs.toHTML(stored(paragraph(), paragraph())).html).toBe(
            '<div class="fondue-rte-content"><p dir="auto"></p><p dir="auto"></p></div>',
        );
    });
});

describe('format attributes', () => {
    const codecs = semanticCodecs();
    // Every node and mark gets the three attributes that would carry CSS or class names.
    const withStyle = (value: unknown): unknown => {
        if (Array.isArray(value)) {
            return value.map(withStyle);
        }

        if (typeof value !== 'object' || value === null) {
            return value;
        }

        const record = Object.fromEntries(Object.entries(value).map(([key, child]) => [key, withStyle(child)]));
        // A text node holds no attributes at all, so it gets none.
        if (typeof record.type === 'string' && record.type !== 'text') {
            record.attrs = { ...(record.attrs as object), style: 'color:red', class: 'evil', className: 'evil' };
        }

        return record;
    };

    it.each(fixturesIn('valid'))(
        'writes %s through every codec with no style, class or className read from the document',
        (_, fixture) => {
            const clean = fixture as RichTextDocument;
            const dirty = withStyle(fixture) as RichTextDocument;
            const strip = <T extends { diagnostics: readonly Diagnostic[] }>(output: T) => ({
                ...output,
                diagnostics: output.diagnostics.filter(({ code }) => code !== 'format.unknown-attribute'),
            });

            expect(strip(codecs.toHTML(dirty))).toEqual(codecs.toHTML(clean));
            expect(strip(codecs.toPlainText(dirty))).toEqual(codecs.toPlainText(clean));
            expect(strip(codecs.toMarkdown(dirty))).toEqual(codecs.toMarkdown(clean));
            const { html } = codecs.toHTML(dirty);
            expect(html).not.toMatch(/ classname=/i);
            // The only style is a colour mark's, written from its validated `#rrggbb` or `#rrggbbaa` value.
            const styles = html.match(/ style="[^"]*"/gi) ?? [];
            const colours = html.match(/ style="(?:background-)?color:#[0-9a-f]{6}(?:[0-9a-f]{2})?"/g) ?? [];
            expect(styles).toEqual(colours);
            // The one class is the content root's, from the presentation, never a stored value.
            expect(html.match(/ class="[^"]*"/gi)).toEqual([' class="fondue-rte-content"']);
        },
    );
});

describe('codec context', () => {
    const figure = (assetId: string) =>
        node(
            'figure',
            { nodeId: `f-${assetId}`, align: 'center' },
            node('asset_image', {
                nodeId: `i-${assetId}`,
                assetId,
                labelSnapshot: 'Photo',
                altIntent: 'decorative',
                altText: '',
                width: null,
                height: null,
                displayWidth: null,
                mediaType: null,
            }),
        );

    it('writes no image when resolveAssetUrl throws, and the rest of the document', () => {
        const output = semanticCodecs().toMarkdown(stored(figure('a-1'), paragraph(text('after')), figure('a-2')), {
            resolveAssetUrl: (assetId) => {
                if (assetId === 'a-1') {
                    throw new Error('resolver failed');
                }

                return `https://cdn.example/${assetId}`;
            },
        });

        expect(output.markdown).toBe('after\n\n![](https://cdn.example/a-2)');
    });
});

describe('codec context translations', () => {
    const labelled = defineFeature({
        id: 'test.labelled',
        version: 1,
        requires,
        nodes: { label: { group: 'block', attrs: {}, html: ['hr'], parse: [] } },
        formats: { html: 'lossless', text: 'lossless', markdown: 'unsupported' },
        codecs: {
            text: {
                nodes: {
                    label: (_, __, context) =>
                        [
                            context.t('RichTextEditor_readerIslandFeature', { feature: 'x' }),
                            context.t('RichTextEditor_readerIslandFeature', {}),
                            context.t('RichTextEditor_notAKey'),
                        ].join(' / '),
                },
            },
        },
    });

    it('hands an override a translator that fills each ${var}, keeps a missing one and falls back to the key', () => {
        const model = compileContentModel([core(), labelled()], { id: 'test.labelled', version: 1 });

        expect(createCodecs(model).toPlainText(testDocument(model, { type: 'label' })).text).toBe(
            'Unsupported content: x / Unsupported content: ${feature} / RichTextEditor_notAKey',
        );
    });
});

describe('carried legs of earlier packets', () => {
    const codecs = semanticCodecs();
    const root = (attrs?: Readonly<Record<string, JsonValue>>) => {
        const content: Record<string, JsonValue> = { type: 'doc', content: [paragraph(text('a'))] };
        if (attrs !== undefined) {
            content.attrs = attrs;
        }

        return { ...stored(), content } as unknown as RichTextDocument;
    };

    it.each([
        ['omitted attributes', undefined],
        ['the declared defaults', { lang: null, dir: 'auto' }],
        ['attributes that fail their declaration', { lang: 'not a language', dir: 'sideways' }],
    ] as const)('writes the declared defaults of doc for %s through every codec', (_, attrs) => {
        expect(codecs.toHTML(root(attrs)).html).toBe('<div class="fondue-rte-content"><p dir="auto">a</p></div>');
        expect(codecs.toPlainText(root(attrs)).text).toBe('a');
        expect(codecs.toMarkdown(root(attrs))).toMatchObject({ markdown: 'a', losses: [] });
    });

    it('writes a valid doc lang and dir on the HTML root and reports their loss in Markdown', () => {
        expect(codecs.toHTML(root({ lang: 'ar', dir: 'rtl' })).html).toBe(
            '<div class="fondue-rte-content" lang="ar" dir="rtl"><p dir="auto">a</p></div>',
        );
        expect(codecs.toMarkdown(root({ lang: 'ar', dir: 'rtl' })).losses).toEqual([{ featureId: 'core', count: 1 }]);
    });

    const unsafe = (
        JSON.parse(
            readFileSync(new URL('../../model/__tests__/fixtures/urls.json', import.meta.url), 'utf8'),
        ) as readonly {
            input: string;
            ok: boolean;
        }[]
    ).flatMap(({ input, ok }) => {
        if (ok) {
            return [];
        }

        return [input];
    });

    it.each(unsafe)('writes no href or url for the unsafe input %j through any codec', (input) => {
        const document = stored(
            paragraph(text('Go', link(input))),
            node('embed', { nodeId: 'e-1', url: input, provider: 'youtube', title: null }),
        );
        const html = codecs.toHTML(document).html;
        const plain = codecs.toPlainText(document).text;
        const markdown = codecs.toMarkdown(document).markdown;

        expect(html).not.toContain('href=');
        expect(plain).toBe('Go');
        expect(markdown).toBe('Go');
        for (const output of [html, plain, markdown]) {
            expect(output).not.toContain('alert(1)');
        }
    });

    it('writes a partly bold, partly coloured link as one a, one link and one href', () => {
        const colored = mark('font_color', { tokenId: 'brand.red', value: null });
        const document = stored(
            paragraph(
                text('bold ', link('https://frontify.com'), mark('bold')),
                text('colour', link('https://frontify.com'), colored),
            ),
        );

        expect(codecs.toHTML(document).html).toBe(
            '<div class="fondue-rte-content"><p dir="auto"><a href="https://frontify.com"><strong>bold </strong><span data-rte-color="brand.red">colour</span></a></p></div>',
        );
        expect(codecs.toMarkdown(document).markdown).toBe('[**bold&#x20;**&#x63;olour](https://frontify.com)');
        expect(codecs.toPlainText(document).text).toBe('bold colour (https://frontify.com)');
    });
});
