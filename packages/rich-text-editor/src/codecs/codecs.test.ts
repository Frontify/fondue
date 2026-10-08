/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';

import { describe, expect, it, vi } from 'vitest';

import {
    blockquote,
    bulletList,
    codeBlock,
    link,
    listItem,
    mark,
    node,
    paragraph,
    table,
    text,
} from '#/features/__fixtures__/documents';
import { vocabularyModel } from '#/features/__fixtures__/vocabulary';
import { core } from '#/features/core/feature';
import {
    compileContentModel,
    createEmptyDocument,
    defineFeature,
    DefinitionError,
    type CodecOverrides,
    type Diagnostic,
    type FeatureDeclaration,
    type FeatureFormats,
    featureFromManifest,
    type JsonValue,
    type RichTextDocument,
} from '#/model';

import { semanticCodecs, stored } from '../../fixtures/codecs/helpers';
import { fixturesIn, renderReader } from '../../fixtures/reader/helpers';
import { semanticModel } from '../../fixtures/reader/semantic';

import { createCodecs } from './codecs';

const requires = [{ id: 'core', version: 1 }];
const failureOf = (run: () => unknown) => {
    try {
        run();
    } catch (error) {
        if (error instanceof DefinitionError) {
            return { code: error.code, details: error.details };
        }
        throw error;
    }
    throw new Error('expected a DefinitionError');
};
const compile = (...declarations: readonly FeatureDeclaration[]) =>
    compileContentModel([core(), ...declarations.map((declaration) => defineFeature(declaration)())], {
        id: 'test.model',
        version: 1,
    });
const testDocument = (
    model: { readonly ref: { readonly id: string; readonly version: number } },
    ...blocks: JsonValue[]
) =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: [],
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    }) as unknown as RichTextDocument;
const codesOf = (diagnostics: readonly Diagnostic[]) => diagnostics.map(({ code }) => code);

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
        'SPEC-rich-text/AC-024 throws definition.missing-codec for %s when a leaf node has no rule, form or override for it',
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

    it('SPEC-rich-text/AC-024 throws definition.missing-codec for html when a node with content has a spec with no content hole', () => {
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

    it('SPEC-rich-text/AC-024 accepts each format once a codec override provides it, and skips one marked unsupported', () => {
        const formats = { html: 'lossless', text: 'lossless', markdown: 'lossless' } as const;
        const overrides = {
            text: { nodes: { widget: () => 'widget' } },
            markdown: { nodes: { widget: () => '(widget)' } },
        };
        const unsupported = { html: 'lossless', text: 'unsupported', markdown: 'unsupported' } as const;

        expect(() => createCodecs(compile(widget(formats, overrides)))).not.toThrow();
        expect(() => createCodecs(compile(widget(unsupported)))).not.toThrow();
    });

    it('SPEC-rich-text/AC-024 SPEC-rich-text-output/AC-016 accepts a Markdown form in place of an override', () => {
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

    it('SPEC-rich-text-output/AC-016 accepts a feature with no nodes, marks or formats', () => {
        expect(() => createCodecs(compile({ id: 'test.empty', version: 1, requires }))).not.toThrow();
    });
});

describe('toHTML', () => {
    const codecs = semanticCodecs();

    it('SPEC-rich-text-output/AC-017 reports one codecs.lossy-output info per lossy feature with its count', () => {
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

    it('SPEC-rich-text-output/AC-017 escapes text and attribute values and drops a URL that fails checkHref', () => {
        const hostile = '"><script>alert(1)</script>&';
        const output = codecs.toHTML(stored(paragraph(text(hostile, link(`https://frontify.com/?q=${hostile}`)))));

        expect(output.html).toBe(
            '<div><p><a href="https://frontify.com/?q=&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;&amp;">&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;&amp;</a></p></div>',
        );
    });

    it.each([...fixturesIn('valid'), ...fixturesIn('unknown'), ...fixturesIn('invalid')])(
        "SPEC-rich-text-output/AC-017 writes the reader's static markup for %s",
        (_, document) => {
            const model = vocabularyModel();
            const html = createCodecs(model).toHTML(document as RichTextDocument).html;

            expect(html).toBe(renderReader(document, model).replaceAll('<!-- -->', ''));
        },
    );

    it.each([
        ['a b', 'a b'],
        ['a  b', 'a \u00A0b'],
        ['a     b', 'a \u00A0 \u00A0 b'],
    ])('SPEC-rich-text-output/AC-046 writes %j with U+0020 and U+00A0 alternating from a space', (input, expected) => {
        expect(codecs.toHTML(stored(paragraph(text(input)))).html).toBe(`<div><p>${expected}</p></div>`);
    });

    it('SPEC-rich-text-output/AC-046 keeps every space of a code block as U+0020', () => {
        expect(codecs.toHTML(stored(codeBlock(text('a  b')))).html).toBe('<div><pre><code>a  b</code></pre></div>');
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

    it('SPEC-rich-text-output/AC-038 lists one loss per lossy text feature with its count', () => {
        const output = codecs.toPlainText(stored(styled, grid, node('column_break'), node('column_break')));

        expect(output.losses).toEqual([
            { featureId: 'fixture.styles', count: 1 },
            { featureId: 'fixture.tables', count: 3 },
            { featureId: 'fixture.blocks', count: 2 },
        ]);
        expect(codecs.toPlainText(stored(paragraph(text('a')), paragraph(text('b')))).losses).toEqual([]);
    });

    it('SPEC-rich-text-output/AC-040 lists a feature that marks text and Markdown unsupported, with its count, from each codec', () => {
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

    it('SPEC-rich-text-output/AC-047 writes the text of a node whose Markdown override throws and reports codecs.override-failed', () => {
        const model = quote({ markdown: { nodes: { quote: fail } } });
        const output = createCodecs(model).toMarkdown(quoteDocument(model));

        expect(output.markdown).toBe('Before\n\nQuoted \\<b>\n\nAfter');
        expect(output.diagnostics).toEqual([failure('markdown')]);
    });

    it('SPEC-rich-text-output/AC-047 writes a node whose HTML override throws as the island fallback', () => {
        const model = quote({ html: { nodes: { quote: fail } } });
        const output = createCodecs(model).toHTML(quoteDocument(model));

        expect(output.html).toBe(
            '<div><p>Before</p><div role="group" aria-label="Unsupported content: test.quote" data-rte-island="">Quoted &lt;b&gt;</div><p>After</p></div>',
        );
        expect(output.diagnostics).toEqual([failure('html')]);
    });

    it('SPEC-rich-text-output/AC-047 writes the text of a node whose text override throws', () => {
        const model = quote({ text: { nodes: { quote: fail } } });
        const output = createCodecs(model).toPlainText(quoteDocument(model));

        expect(output.text).toBe('Before\n\nQuoted <b>\n\nAfter');
        expect(output.diagnostics).toEqual([failure('text')]);
    });

    it('SPEC-rich-text-output/AC-047 writes what each override returns when it does not throw', () => {
        const model = quote({
            html: { nodes: { quote: () => ['q', { cite: 'https://frontify.com' }, 0] } },
            markdown: { nodes: { quote: (inner) => `> ${inner}` } },
            text: { nodes: { quote: (inner) => `“${inner}”` } },
        });
        const codecs = createCodecs(model);

        expect(codecs.toHTML(quoteDocument(model)).html).toContain(
            '<q cite="https://frontify.com">Quoted &lt;b&gt;</q>',
        );
        expect(codecs.toMarkdown(quoteDocument(model)).markdown).toContain('\n\n> Quoted \\<b>\n\n');
        expect(codecs.toPlainText(quoteDocument(model)).text).toContain('“Quoted <b>”');
    });

    it('SPEC-rich-text-format/AC-027 rejects an HTML override that binds a stored value to style', () => {
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
        'SPEC-rich-text-output/AC-051 returns empty output with the decode diagnostic for %s from each codec',
        (_, document, codecs, code) => {
            const input = document as RichTextDocument;

            expect(codecs.toHTML(input)).toEqual({ html: '', diagnostics: [expect.objectContaining({ code })] });
            expect(codecs.toPlainText(input)).toEqual({
                text: '',
                losses: [],
                diagnostics: [expect.objectContaining({ code })],
            });
            expect(codecs.toMarkdown(input)).toEqual({
                markdown: '',
                losses: [],
                diagnostics: [expect.objectContaining({ code })],
            });
            expect(unlimited.toHTML(valid).html).toBe('<div><p>a</p><p>b</p><p>c</p></div>');
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

    it('SPEC-rich-text-output/AC-042 SPEC-rich-text-output/AC-051 writes the escaped text of each island and reports it by its decode diagnostic', () => {
        const html = codecs.toHTML(islands);
        const plain = codecs.toPlainText(islands);
        const markdown = codecs.toMarkdown(islands);

        expect(html.html).toContain('data-rte-island="">&lt;img src=x onerror=alert(1)&gt;</div>');
        expect(html.html).toContain(
            '<p>Mood <span role="group" aria-label="Unsupported content: sticker" data-rte-island="">a*b</span></p>',
        );
        expect(plain.text).toBe('<img src=x onerror=alert(1)>\n\nMood a*b');
        expect(markdown.markdown).toBe('\\<img src=x onerror=alert(1)>\n\nMood a\\*b');
        for (const output of [html, plain, markdown]) {
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
    it('SPEC-rich-text-output/AC-050 writes the empty string for an empty document through toHTML and toPlainText', () => {
        const model = semanticModel();
        const codecs = createCodecs(model);
        const empty = createEmptyDocument(model);

        expect(codecs.toHTML(empty).html).toBe('');
        expect(codecs.toPlainText(empty).text).toBe('');
        expect(codecs.toHTML(stored(paragraph(), paragraph())).html).toBe('<div><p></p><p></p></div>');
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
        'SPEC-rich-text-format/AC-027 writes %s through every codec with no style, class or className read from the document',
        (_, fixture) => {
            const clean = fixture as RichTextDocument;
            const dirty = withStyle(fixture) as RichTextDocument;
            const strip = <T extends { readonly diagnostics: readonly Diagnostic[] }>(output: T) => ({
                ...output,
                diagnostics: output.diagnostics.filter(({ code }) => code !== 'format.unknown-attribute'),
            });

            expect(strip(codecs.toHTML(dirty))).toEqual(codecs.toHTML(clean));
            expect(strip(codecs.toPlainText(dirty))).toEqual(codecs.toPlainText(clean));
            expect(strip(codecs.toMarkdown(dirty))).toEqual(codecs.toMarkdown(clean));
            expect(codecs.toHTML(dirty).html).not.toMatch(/ (style|class|classname)=/i);
        },
    );
});

describe('data manifest features', () => {
    const manifest = JSON.parse(
        readFileSync(new URL('../../fixtures/manifest/acme-pull-quote.json', import.meta.url), 'utf8'),
    ) as unknown;
    const document = JSON.parse(
        readFileSync(new URL('../../fixtures/manifest/acme-pull-quote.document.json', import.meta.url), 'utf8'),
    ) as RichTextDocument;

    it('SPEC-rich-text/AC-065 writes the acme.pull-quote fixture through every codec from its HtmlSpec alone, evaluating no code', () => {
        const evaluated = vi.spyOn(globalThis, 'eval');
        const constructed = vi.spyOn(globalThis, 'Function');
        try {
            const acme = compileContentModel([core(), featureFromManifest(manifest)()], {
                id: 'acme.model',
                version: 1,
            });
            const codecs = createCodecs(acme);

            expect(codecs.toHTML(document).html).toBe(
                '<div><p>Intro</p><blockquote class="acme-pull-quote" data-tone="brand">Design &lt;is&gt; how it works</blockquote></div>',
            );
            expect(codecs.toPlainText(document)).toMatchObject({
                text: 'Intro\n\nDesign <is> how it works',
                losses: [{ featureId: 'acme.pull-quote', count: 1 }],
            });
            expect(codecs.toMarkdown(document)).toMatchObject({
                markdown: 'Intro\n\nDesign \\<is> how it works',
                losses: [{ featureId: 'acme.pull-quote', count: 1 }],
            });
            expect(codecs.fromMarkdown('Intro').status).toBe('editable');
            expect(evaluated).not.toHaveBeenCalled();
            expect(constructed).not.toHaveBeenCalled();
        } finally {
            evaluated.mockRestore();
            constructed.mockRestore();
        }
    });
});

describe('fromMarkdown structures the model cannot hold', () => {
    const model = compileContentModel([core()], { id: 'test.core', version: 1 });
    const codecs = createCodecs(model);

    it('SPEC-rich-text-output/AC-035 keeps the text of a table and a fenced code block and reports each with its path and feature', () => {
        const result = codecs.fromMarkdown(
            'Intro\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n\n```ts\nlet a;\nlet b;\n```',
        );
        if (result.status !== 'editable') {
            throw new Error('expected an editable result');
        }
        const paragraphs = result.document.content.content?.map((block) =>
            (block.content ?? []).map((child) => child.text ?? '\n').join(''),
        );

        expect(paragraphs).toEqual(['Intro', 'A', 'B', '1', '2', 'let a;\nlet b;']);
        expect(result.diagnostics).toEqual([
            {
                code: 'codecs.markdown-unsupported',
                severity: 'warning',
                messageKey: 'codecs.markdown-unsupported',
                path: '/content/content/1',
                featureId: 'tables',
                details: { structure: 'table' },
            },
            {
                code: 'codecs.markdown-unsupported',
                severity: 'warning',
                messageKey: 'codecs.markdown-unsupported',
                path: '/content/content/5',
                featureId: 'blocks.code',
                details: { structure: 'code_block' },
            },
        ]);
    });

    it('SPEC-rich-text-output/AC-035 reports emphasis and links the model lacks, keeping their text', () => {
        const result = codecs.fromMarkdown('A **b** [c](https://frontify.com)');

        expect(result.status === 'editable' && result.document.content.content).toEqual([
            { type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text: 'A b c' }] },
        ]);
        expect(codesOf(result.diagnostics)).toEqual(['codecs.markdown-unsupported', 'codecs.markdown-unsupported']);
        expect(result.diagnostics.map(({ featureId }) => featureId)).toEqual(['marks.bold', 'links']);
    });
});

describe('fromMarkdown into a model of core alone', () => {
    const codecs = createCodecs(compileContentModel([core()], { id: 'test.core', version: 1 }));
    const paragraphOf = (...content: readonly JsonValue[]) => ({ type: 'paragraph', attrs: { lang: null }, content });

    it('SPEC-rich-text-output/AC-035 keeps the text of headings, quotes, lists, images and marks, and drops rules, each with a diagnostic', () => {
        const result = codecs.fromMarkdown(
            '# H\n\n> q\n\n- a\n\n1. b\n\n---\n\nl1\nl2 ![alt](x.png) `code` *e* ~~s~~ a  \nb',
        );

        expect(result.status === 'editable' && result.document.content.content).toEqual([
            paragraphOf({ type: 'text', text: 'H' }),
            paragraphOf({ type: 'text', text: 'q' }),
            paragraphOf({ type: 'text', text: 'a' }),
            paragraphOf({ type: 'text', text: 'b' }),
            paragraphOf(
                { type: 'text', text: 'l1 l2 alt code e s a' },
                { type: 'hard_break' },
                { type: 'text', text: 'b' },
            ),
        ]);
        expect(result.diagnostics.map(({ featureId, path }) => [featureId, path])).toEqual([
            ['blocks.heading', '/content/content/0'],
            ['blocks.quote', '/content/content/1'],
            ['lists.bullet', '/content/content/2'],
            ['lists.ordered', '/content/content/3'],
            ['blocks.rule', '/content/content/4'],
            ['media.image', '/content/content/4'],
            ['marks.code', '/content/content/4'],
            ['marks.italic', '/content/content/4'],
            ['marks.strike', '/content/content/4'],
        ]);
    });

    it('SPEC-rich-text-output/AC-035 reads empty Markdown as one empty paragraph', () => {
        const result = codecs.fromMarkdown('');

        expect(result.status === 'editable' && result.document.content.content).toEqual([
            { type: 'paragraph', attrs: { lang: null } },
        ]);
        expect(result.diagnostics).toEqual([]);
    });
});

describe('fromMarkdown', () => {
    it('SPEC-rich-text-output/AC-024 builds blocks the model holds with new nodeIds from the ids option', () => {
        const codecs = semanticCodecs();
        const result = codecs.fromMarkdown('# Title\n\n> quoted\n\n- [x] done');

        expect(result.status === 'editable' && result.document.content.content).toEqual([
            node(
                'heading',
                { nodeId: 'id-1', level: 1, lang: null, styleId: null, align: null, indent: 0 },
                text('Title'),
            ),
            blockquote(paragraph(text('quoted'))),
            node('task_list', undefined, node('task_item', { nodeId: 'id-2', checked: true }, paragraph(text('done')))),
        ]);
    });

    it('SPEC-rich-text-output/AC-024 reads a list with some task markers as bullets with literal text, marks over a hard break, and a javascript: link as text', () => {
        const result = semanticCodecs().fromMarkdown('- [ ] a\n- b\n\n**a\\\nb**\n\n[x](javascript:alert(1))');

        expect(result.status === 'editable' && result.document.content.content).toEqual([
            bulletList(listItem(paragraph(text('[ ] a'))), listItem(paragraph(text('b')))),
            paragraph(text('a', mark('bold')), { type: 'hard_break', marks: [mark('bold')] }, text('b', mark('bold'))),
            paragraph(text('[x](javascript:alert(1))')),
        ]);
    });
});

describe('Markdown forms, mark and inline overrides', () => {
    const fail = () => {
        throw new Error('override failed');
    };
    const custom = defineFeature({
        id: 'test.custom',
        version: 1,
        requires,
        nodes: {
            callout: {
                group: 'block',
                content: 'inline*',
                attrs: {},
                html: ['aside', 0],
                parse: [],
                markdown: { prefix: '!> ' },
            },
            math: {
                group: 'block',
                content: 'text*',
                marks: [],
                attrs: {},
                html: ['pre', 0],
                parse: [],
                markdown: { fence: '$$' },
            },
            panel: { group: 'block', content: 'block+', attrs: {}, html: ['section', 0], parse: [] },
            emoji: {
                group: 'inline',
                atom: true,
                attrs: { name: { type: 'string', default: 'smile' } },
                html: ['span'],
                parse: [],
            },
            chip: { group: 'inline', atom: true, attrs: {}, html: ['span'], parse: [] },
        },
        marks: {
            hl: { attrs: {}, html: ['mark', 0], parse: [], markdown: { open: '==', close: '==' } },
            kbd: { attrs: {}, html: ['kbd', 0], parse: [] },
            boom: { attrs: {}, html: ['b', 0], parse: [] },
            plain: { attrs: {}, html: ['span', 0], parse: [] },
        },
        formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
        codecs: {
            markdown: {
                marks: { kbd: (inner) => `[[${inner}]]`, boom: fail },
                nodes: { emoji: (_, attrs) => `:${JSON.stringify(attrs.name)}:`, chip: fail },
            },
            text: {
                marks: { kbd: (inner) => `<${inner}>`, boom: fail },
                nodes: { emoji: (_, attrs) => `:${JSON.stringify(attrs.name)}:`, chip: fail },
            },
        },
    });
    const off = defineFeature({
        id: 'test.off',
        version: 1,
        requires,
        nodes: { dot: { group: 'inline', atom: true, attrs: {}, html: ['span'], parse: [] } },
        marks: { faint: { attrs: {}, html: ['small', 0], parse: [] } },
        formats: { html: 'lossy', text: 'unsupported', markdown: 'unsupported' },
    });
    const model = compileContentModel([core(), custom(), off()], { id: 'test.custom', version: 1 });
    const codecs = createCodecs(model);
    const marked = (value: string, type: string) => ({ type: 'text', text: value, marks: [{ type }] });
    const words = (...parts: readonly JsonValue[]) =>
        parts.flatMap((part, index) => {
            if (index === 0) {
                return [part];
            }
            return [{ type: 'text', text: ' ' }, part];
        });
    const document = testDocument(
        model,
        {
            type: 'paragraph',
            attrs: { lang: null },
            content: [
                ...words(
                    marked('a', 'hl'),
                    marked('k', 'kbd'),
                    marked('x', 'boom'),
                    marked('p', 'plain'),
                    marked('f', 'faint'),
                ),
                { type: 'text', text: ' ' },
                { type: 'emoji', attrs: { name: 'wave' } },
                { type: 'chip' },
                { type: 'dot' },
            ],
        },
        { type: 'callout', content: [{ type: 'text', text: 'Note' }] },
        { type: 'math', content: [{ type: 'text', text: 'x^2' }] },
        {
            type: 'panel',
            content: [{ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text: 'in panel' }] }],
        },
    );
    const failures = (format: string): unknown[] => [
        expect.objectContaining({
            code: 'codecs.override-failed',
            path: '/content/content/0/content/4/marks/0',
            details: { name: 'boom', format },
        }),
        expect.objectContaining({
            code: 'codecs.override-failed',
            path: '/content/content/0/content/11',
            details: { name: 'chip', format },
        }),
    ];

    it('SPEC-rich-text-output/AC-020 writes Markdown forms and overrides, and loses a mark or container with neither', () => {
        expect(codecs.toMarkdown(document)).toEqual({
            markdown: '==a== [[k]] x p f :"wave":\n\n!> Note\n\n$$\nx^2\n$$\n\nin panel',
            losses: [
                { featureId: 'test.custom', count: 2 },
                { featureId: 'test.off', count: 2 },
            ],
            diagnostics: failures('markdown'),
        });
    });

    it('SPEC-rich-text-output/AC-047 writes the text inside a mark or inline node whose override throws, from each codec', () => {
        expect(codecs.toPlainText(document)).toEqual({
            text: 'a <k> x p f :"wave":\n\nNote\n\nx^2\n\nin panel',
            losses: [{ featureId: 'test.off', count: 2 }],
            diagnostics: failures('text'),
        });
    });

    it('SPEC-rich-text-output/AC-040 SPEC-rich-text-output/AC-017 counts each use of a feature that marks a format unsupported or lossy', () => {
        const html = codecs.toHTML(document);

        expect(html.html).toContain('<mark>a</mark> <kbd>k</kbd> <b>x</b>');
        expect(html.diagnostics).toEqual([expect.objectContaining({ featureId: 'test.off', details: { count: 2 } })]);
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

    it('SPEC-rich-text-output/AC-017 writes style bindings and literal styles as the reader does', () => {
        const document = testDocument(
            model,
            paragraphOf({ align: 'right' }, { type: 'text', text: 'a ' }, { type: 'badge' }, { type: 'plainstyle' }),
        );
        const { html } = codecs.toHTML(document);

        expect(html).toBe(renderReader(document, model).replaceAll('<!-- -->', ''));
        expect(html).toBe(
            '<div><p style="text-align:right">a <span style="font-weight:bold;--tone:warm;color:red" data-x="y"></span><span></span></p></div>',
        );
    });

    it('SPEC-rich-text-output/AC-047 writes an inline node whose override throws as a span that continues the spaces, and a pre node as a div', () => {
        const document = testDocument(
            model,
            paragraphOf({}, { type: 'text', text: 'a ' }, { type: 'chip' }, { type: 'text', text: ' b' }),
            { type: 'listing', content: [{ type: 'text', text: 'x  y' }] },
        );
        const { html, diagnostics } = codecs.toHTML(document);

        expect(html).toBe(
            '<div><p>a <span role="group" aria-label="Unsupported content: test.styled" data-rte-island=""></span> b</p><div role="group" aria-label="Unsupported content: test.styled" data-rte-island="">x  y</div></div>',
        );
        expect(codesOf(diagnostics)).toEqual(['codecs.override-failed', 'codecs.override-failed']);
    });

    it('SPEC-rich-text-output/AC-017 writes island labels and the notice in the locale option, falling back to English', () => {
        const partial = { lang: 'xx', translationStrings: { RichTextEditor_readerIslandGeneric: 'Unbekannt' } };
        const islands = testDocument(model, 5 as unknown as JsonValue, { type: 'widget', content: [] });
        const { html } = codecs.toHTML(islands, { locale: partial });

        expect(html).toBe(
            '<div><div role="group" aria-label="Unbekannt" data-rte-island=""></div><div role="group" aria-label="Unsupported content: widget" data-rte-island=""></div><div role="note" data-rte-message="islands" lang="xx">Some content is not supported here.</div></div>',
        );
    });

    it('SPEC-rich-text-output/AC-050 writes a document of one leaf block or one island, which is not empty', () => {
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

        expect(createCodecs(rule).toHTML(testDocument(rule, { type: 'rule' })).html).toBe('<div><hr/></div>');
        expect(codecs.toHTML(testDocument(model, { type: 'widget' })).html).toContain('data-rte-island=""></div>');
    });
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

    it('SPEC-rich-text-output/AC-020 writes no image when resolveAssetUrl throws, and the rest of the document', () => {
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

    it('SPEC-rich-text-output/AC-047 hands an override a translator that fills each ${var}, keeps a missing one and falls back to the key', () => {
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
    ] as const)(
        'SPEC-rich-text-format/AC-016 writes the declared defaults of doc for %s through every codec',
        (_, attrs) => {
            expect(codecs.toHTML(root(attrs)).html).toBe('<div><p>a</p></div>');
            expect(codecs.toPlainText(root(attrs)).text).toBe('a');
            expect(codecs.toMarkdown(root(attrs))).toMatchObject({ markdown: 'a', losses: [] });
        },
    );

    it('SPEC-rich-text-format/AC-016 writes a valid doc lang and dir on the HTML root and reports their loss in Markdown', () => {
        expect(codecs.toHTML(root({ lang: 'ar', dir: 'rtl' })).html).toBe('<div lang="ar" dir="rtl"><p>a</p></div>');
        expect(codecs.toMarkdown(root({ lang: 'ar', dir: 'rtl' })).losses).toEqual([{ featureId: 'core', count: 1 }]);
    });

    const unsafe = (
        JSON.parse(readFileSync(new URL('../../fixtures/security/urls.json', import.meta.url), 'utf8')) as readonly {
            readonly input: string;
            readonly ok: boolean;
        }[]
    ).flatMap(({ input, ok }) => {
        if (ok) {
            return [];
        }
        return [input];
    });

    it.each(unsafe)(
        'SPEC-rich-text-format/AC-019 writes no href or url for the unsafe input %j through any codec',
        (input) => {
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
        },
    );

    it('SPEC-rich-text/AC-027 writes a partly bold, partly coloured link as one a, one link and one href', () => {
        const colored = mark('font_color', { tokenId: 'brand.red', value: null });
        const document = stored(
            paragraph(
                text('bold ', link('https://frontify.com'), mark('bold')),
                text('colour', link('https://frontify.com'), colored),
            ),
        );

        expect(codecs.toHTML(document).html).toBe(
            '<div><p><a href="https://frontify.com"><strong>bold </strong><span data-rte-color="brand.red">colour</span></a></p></div>',
        );
        expect(codecs.toMarkdown(document).markdown).toBe('[**bold&#x20;**&#x63;olour](https://frontify.com)');
        expect(codecs.toPlainText(document).text).toBe('bold colour (https://frontify.com)');
    });
});
