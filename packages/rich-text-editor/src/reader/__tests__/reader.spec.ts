/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readFileSync } from 'node:fs';

import fc from 'fast-check';
import { createElement, type ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
    blockquote,
    bulletList,
    doc,
    envelope,
    heading,
    link,
    listItem,
    mark,
    mention,
    node,
    paragraph,
    rule,
    table,
    text,
} from '#/features/__tests__/fixtures/documents';
import {
    vocabularyBlocks,
    vocabularyLink,
    vocabularyMarks,
    vocabularyMention,
} from '#/features/__tests__/fixtures/vocabulary';
import { core } from '#/features/core/feature';
import { deDE } from '#/locales/de-DE';
import {
    compileContentModel,
    decodeDocument,
    defineFeature,
    type Diagnostic,
    featureFromManifest,
    type JsonObject,
    type JsonValue,
    type RichTextDocument,
} from '#/model';

import { defineReaderFeature, type ReaderNodeProps } from '../define';

import { semanticModel } from './fixtures/semantic';
import { fixturesIn, renderReader } from './helpers/helpers';

const model = semanticModel();
const read = (document: unknown, props: Parameters<typeof renderReader>[2] = {}) =>
    renderReader(document, model, props);
const capabilities = [
    'core',
    'fixture.align',
    'fixture.blocks',
    'fixture.lists',
    'fixture.marks',
    'fixture.media',
    'fixture.mention',
    'fixture.tables',
];
const wrap = (...blocks: readonly JsonValue[]) => envelope(doc(...blocks), capabilities);
const levelled = (level: number, ...children: readonly JsonValue[]) =>
    node('heading', { nodeId: `h-${level}`, level, lang: null, styleId: null, align: null, indent: 0 }, ...children);
const NOTICE = 'data-rte-message="islands"';

describe('RichTextReader modes', () => {
    it.each(fixturesIn('valid'))('renders the valid fixture %s in full', (_, document) => {
        const html = read(document);

        expect(html).toMatch(/^<div[ >]/);
        expect(html).not.toContain('data-rte-message');
    });

    it.each([
        [
            'another content model',
            { ...(wrap(paragraph(text('a'))) as object), model: { id: 'other.model', version: 1 } },
        ],
        ['an unknown format version', { ...(wrap(paragraph(text('a'))) as object), formatVersion: 2 }],
    ])('shows only the "cannot be shown here" message for %s', (_, document) => {
        expect(read(document)).toBe(
            '<div role="note" data-rte-message="unsupported" lang="en-US">This content cannot be shown here</div>',
        );
    });

    it.each([
        ['text that is not JSON', 'not json'],
        ['an envelope without its format', { content: {} }],
    ])('shows only the "cannot be shown" message for %s', (_, document) => {
        expect(read(document)).toBe(
            '<div role="note" data-rte-message="invalid" lang="en-US">This content cannot be shown</div>',
        );
    });

    it('decodes with its limits prop, so a document over a limit shows the invalid message', () => {
        const document = wrap(paragraph(text('a')), paragraph(text('b')), paragraph(text('c')));

        expect(read(document)).toContain('<p>c</p>');
        expect(read(document, { limits: { maxDocumentNodes: 3 } })).toContain('data-rte-message="invalid"');
        expect(read(JSON.stringify(document))).toContain('<p>c</p>');
    });

    it.each([...fixturesIn('unknown'), ...fixturesIn('invalid')])(
        'renders %s without throwing, keeping what it understands',
        (_, document) => {
            expect(read(document)).toMatch(/^<div[ >]/);
        },
    );

    it('passes the decode diagnostics of a blocked document and of one with islands to onDiagnostic', () => {
        const blocked = { ...(wrap(paragraph(text('a'))) as object), formatVersion: 2 };
        const unknown = fixturesIn('unknown').find(([name]) => name === 'unknown-nodes.json')?.[1];
        for (const document of [blocked, unknown]) {
            const onDiagnostic = vi.fn();
            read(document, { onDiagnostic });
            const { diagnostics } = decodeDocument(document, model);

            expect(diagnostics.length).toBeGreaterThan(0);
            expect(onDiagnostic.mock.calls.map(([diagnostic]) => diagnostic as Diagnostic)).toEqual(diagnostics);
        }
    });

    it('translates its messages through the locale prop', () => {
        const blocked = { ...(wrap(paragraph()) as object), formatVersion: 2 };

        expect(read(blocked, { locale: deDE })).toBe(
            '<div role="note" data-rte-message="unsupported" lang="de-DE">Dieser Inhalt kann hier nicht angezeigt werden</div>',
        );
    });
});

describe('RichTextReader islands', () => {
    const unknown = fixturesIn('unknown').find(([name]) => name === 'unknown-nodes.json')?.[1];
    const html = read(unknown);

    it('keeps the surrounding content and shows exactly one notice', () => {
        expect(html).toContain('<p>Before</p>');
        expect(html).toContain('<p>After</p>');
        expect(html).toContain('<li><p>Item</p>');
        expect(html.split(NOTICE)).toHaveLength(2);
        expect(html).toContain('Some content is not supported here.');
    });

    it('labels each island with its feature and escapes its text', () => {
        expect(html).toContain(
            '<div role="group" aria-label="Unsupported content: callout" data-rte-island="">Heads up &lt;b&gt;&amp;&lt;/b&gt;</div>',
        );
        expect(html).toContain('aria-label="Unsupported content: poll" data-rte-island="">Deep</div>');
        expect(html).not.toContain('<b>');
    });

    it('labels an island that holds no node type with the generic label', () => {
        expect(html).toContain('<div role="group" aria-label="Unsupported content" data-rte-island=""></div>');
    });

    it('renders an unsupported_inline inside a paragraph as a span, never a div', () => {
        expect(html).toContain(
            '<p>Mood <span role="group" aria-label="Unsupported content: sticker" data-rte-island="">smile</span> and after</p>',
        );
    });

    it('renders a valid node that a requires-review migration step flagged as an island with the notice', () => {
        const flagged = compileContentModel([core()], {
            id: 'fixture.reviewed',
            version: 2,
            migrations: [
                {
                    id: 'flag',
                    from: 1,
                    migrate: (document) => ({
                        status: 'requires-review',
                        document,
                        diagnostics: [
                            {
                                code: 'migration.requires-review',
                                severity: 'warning',
                                messageKey: 'migration.requires-review',
                                path: '/content/content/1',
                            },
                        ],
                    }),
                },
            ],
        });
        const stored = { ...(envelope(doc(paragraph(text('One')), paragraph(text('Two'))), ['core']) as object) };
        const output = renderReader({ ...stored, model: { id: 'fixture.reviewed', version: 1 } }, flagged);

        expect(output).toContain('<p>One</p>');
        expect(output).toContain('data-rte-island="">Two</div>');
        expect(output).not.toContain('<p>Two</p>');
        expect(output.split(NOTICE)).toHaveLength(2);
    });

    it('renders the text of an island with the same space alternation as other text', () => {
        const spaced = read(wrap(paragraph(node('unsupported_inline_x', {}, text('a  b')))));
        const block = read(wrap(node('mystery_block', {}, paragraph(text('a  b')))));

        expect(spaced).toContain('data-rte-island="">a \u00A0b</span>');
        expect(block).toContain('data-rte-island="">a \u00A0b</div>');
    });

    it('continues the space alternation through an inline island and the text after it', () => {
        const html = read(wrap(paragraph(text('a '), node('unsupported_inline_x', {}, text(' b ')), text(' c'))));

        expect(html).toContain('<p>a <span role="group"');
        expect(html).toContain('data-rte-island="">\u00A0b </span>\u00A0c</p>');
    });

    it('never writes the original JSON of an island', () => {
        expect(html).not.toContain('javascript:');
        expect(html).not.toContain('Which?');
    });
});

describe('RichTextReader semantic elements', () => {
    const html = read(
        wrap(
            ...[1, 2, 3, 4, 5, 6].map((level) => levelled(level, text(`Level ${level}`))),
            blockquote(paragraph(text('Quoted'))),
            bulletList(listItem(paragraph(text('Bullet')))),
            node('ordered_list', { start: 3, marker: null }, listItem(paragraph(text('Ordered')))),
            node('code_block', { languageId: null }, text('const a = 1;')),
            rule(),
            node(
                'figure',
                { nodeId: 'f-1', align: 'center' },
                node('asset_image', {
                    nodeId: 'i-1',
                    assetId: null,
                    labelSnapshot: 'Image',
                    altIntent: 'meaningful',
                    altText: 'A chart',
                    width: null,
                    height: null,
                    displayWidth: null,
                    mediaType: null,
                }),
            ),
            table(
                't-1',
                node(
                    'table_row',
                    undefined,
                    node(
                        'table_header',
                        { colspan: 1, rowspan: 1, colwidth: null, scope: 'col' },
                        paragraph(text('Head')),
                    ),
                ),
                node(
                    'table_row',
                    undefined,
                    node('table_cell', { colspan: 1, rowspan: 1, colwidth: null }, paragraph(text('Cell'))),
                ),
            ),
            paragraph(text('Frontify', link('https://frontify.com'))),
        ),
    );

    it.each([
        '<h1>Level 1</h1>',
        '<h2>Level 2</h2>',
        '<h3>Level 3</h3>',
        '<h4>Level 4</h4>',
        '<h5>Level 5</h5>',
        '<h6>Level 6</h6>',
        '<blockquote><p>Quoted</p></blockquote>',
        '<ul><li><p>Bullet</p></li></ul>',
        '<ol start="3"><li><p>Ordered</p></li></ol>',
        '<pre><code>const a = 1;</code></pre>',
        '<hr/>',
        '<figure><img alt="A chart"/></figure>',
        '<table><thead><tr><th colSpan="1" rowspan="1" scope="col"><p>Head</p></th></tr></thead>',
        '<tbody><tr><td colSpan="1" rowspan="1"><p>Cell</p></td></tr></tbody></table>',
        '<a href="https://frontify.com">Frontify</a>',
    ])('uses the semantic element %s', (element) => {
        expect(html).toContain(element);
    });
});

describe('RichTextReader unknown marks and attributes', () => {
    const [markFixture, attributeFixture] = ['unknown-mark.json', 'unknown-attribute.json'].map(
        (name) => fixturesIn('unknown').find(([file]) => file === name)?.[1],
    );

    const without = (document: unknown, strip: (node: JsonObject) => JsonObject): unknown => {
        const visit = (value: JsonValue): JsonValue => {
            if (typeof value !== 'object' || value === null || Array.isArray(value)) {
                return value;
            }
            const stripped = strip(value as JsonObject);
            const { content } = stripped;
            if (!Array.isArray(content)) {
                return stripped;
            }
            return { ...stripped, content: content.map(visit) };
        };
        const { content } = document as RichTextDocument;
        return { ...(document as object), content: visit(content as unknown as JsonValue) };
    };

    it('renders the text and the known mark as if an unknown mark were absent, with no notice', () => {
        const stripped = without(markFixture, (value) => {
            if (!Array.isArray(value.marks)) {
                return value;
            }
            return { ...value, marks: value.marks.filter((mark) => (mark as JsonObject).type !== 'sparkle') };
        });

        expect(read(markFixture)).toBe(read(stripped));
        expect(read(markFixture)).toContain('<strong>sparkly</strong>');
        expect(read(markFixture)).not.toContain('data-rte-message');
    });

    it('renders the node as if an unknown attribute were absent, with no notice', () => {
        const stripped = without(attributeFixture, (value) => {
            if (value.type !== 'paragraph') {
                return value;
            }
            const { tone: _tone, ...attrs } = value.attrs as JsonObject;
            return { ...value, attrs };
        });

        expect(read(attributeFixture)).toBe(read(stripped));
        expect(read(attributeFixture)).toBe('<div><p>Warm words</p></div>');
    });
});

describe('RichTextReader format attributes', () => {
    const hostile = { style: 'color: red', class: 'big', className: 'huge' };
    /** Every node and mark of a document carries the three attributes the vocabulary never declares. */
    const withHostileAttributes = (value: JsonValue): JsonValue => {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            return value;
        }
        const item = value as JsonObject;
        const copy: Record<string, JsonValue> = { ...item };
        if (item.type !== 'text') {
            const attrs: Record<string, JsonValue> = {};
            Object.assign(attrs, item.attrs);
            Object.assign(attrs, hostile);
            copy.attrs = attrs;
        }
        for (const key of ['content', 'marks']) {
            if (Array.isArray(item[key])) {
                copy[key] = (item[key] as readonly JsonValue[]).map(withHostileAttributes);
            }
        }
        return copy;
    };
    const documents = fixturesIn('valid').map(([name, document]) => [name, document as RichTextDocument] as const);

    it.each(documents)('renders %s with no style, class or className read from the document', (_, document) => {
        const hostileDocument = {
            ...document,
            content: withHostileAttributes(document.content as unknown as JsonValue),
        };

        expect(read(hostileDocument)).toBe(read(document));
        expect(read(hostileDocument)).not.toMatch(/ (style|class|className)=/);
    });

    it('hands a reader override only declared attributes, never unknownAttributes', () => {
        const seen: JsonObject[] = [];
        const Probe = ({ attrs }: ReaderNodeProps) => {
            seen.push(attrs);
            return null;
        };
        const probed = compileContentModel([core(), defineReaderFeature(vocabularyMention(), { mention: Probe })], {
            id: 'fixture.vocabulary',
            version: 1,
        });
        const document = envelope(doc(paragraph(mention('m-1', hostile))), ['core', 'fixture.mention']);

        renderReader(document, probed);

        expect(seen).toEqual([{ nodeId: 'm-1', resourceType: 'user', resourceId: 'u-1', labelSnapshot: 'Ada' }]);
    });
});

describe('RichTextReader spaces', () => {
    const spaced = (value: string) => read(wrap(paragraph(text(value))));
    const NBSP = ' ';

    it('keeps one space and alternates U+0020 and U+00A0 in a longer run', () => {
        expect(spaced('a b')).toContain('<p>a b</p>');
        expect(spaced('a  b')).toContain(`<p>a ${NBSP}b</p>`);
        expect(spaced('a     b')).toContain(`<p>a ${NBSP} ${NBSP} b</p>`);
    });

    it('carries the alternation across the text nodes of one block', () => {
        const html = read(wrap(paragraph(text('a ', mark('bold')), text(' b'))));

        expect(html).toContain(`<p><strong>a </strong>${NBSP}b</p>`);
    });

    it('starts a new run in the next block', () => {
        const html = read(wrap(paragraph(text('a ')), paragraph(text(' b'))));

        expect(html).toContain('<p>a </p><p> b</p>');
    });

    it('keeps every space of a code block as U+0020', () => {
        const html = read(wrap(node('code_block', { languageId: null }, text('a  b'))));

        expect(html).toContain('<pre><code>a  b</code></pre>');
        expect(html).not.toContain(NBSP);
    });
});

describe('RichTextReader override failures', () => {
    const Throws = () => {
        throw new Error('boom');
    };
    const overridden = compileContentModel(
        [
            core(),
            defineReaderFeature(vocabularyBlocks(), { blockquote: Throws }),
            vocabularyMarks(),
            defineReaderFeature(vocabularyMention(), { mention: Throws }),
            defineReaderFeature(vocabularyLink(), { link: Throws }),
        ],
        { id: 'fixture.vocabulary', version: 1 },
    );
    const collect = (document: unknown) => {
        const diagnostics: Diagnostic[] = [];
        const html = renderReader(document, overridden, { onDiagnostic: (diagnostic) => diagnostics.push(diagnostic) });
        return { html, diagnostics };
    };
    const document = envelope(
        doc(
            paragraph(text('Hello '), mention('m-1'), text(' there')),
            blockquote(paragraph(text('Quoted words'))),
            paragraph(text('Linked', link('https://frontify.com'))),
            paragraph(text('Safe')),
        ),
        ['core', 'fixture.blocks', 'fixture.link', 'fixture.mention'],
    );
    const { html, diagnostics } = collect(document);

    it('renders a node whose override throws as a div fallback with its text and renders the rest', () => {
        expect(html).toContain(
            '<div role="group" aria-label="Unsupported content: fixture.blocks" data-rte-island="">Quoted words</div>',
        );
        expect(html).toContain('<p>Safe</p>');
    });

    it('renders the text of a failed override with the same space alternation', () => {
        const spaced = renderReader(
            envelope(doc(blockquote(paragraph(text('a  b')))), ['core', 'fixture.blocks']),
            overridden,
        );

        expect(spaced).toContain('data-rte-island="">a \u00A0b</div>');
    });

    it('continues the space alternation through the text of a failed inline override', () => {
        const chip = defineFeature({
            id: 'fixture.chip',
            version: 1,
            nodes: {
                chip: { group: 'inline', attrs: {}, content: 'text*', html: ['span', 0], parse: [] },
            },
        })();
        const failing = compileContentModel([core(), defineReaderFeature(chip, { chip: Throws })], {
            id: 'fixture.vocabulary',
            version: 1,
        });
        const html = renderReader(
            envelope(doc(paragraph(text('a '), node('chip', {}, text(' b ')), text(' c'))), ['core', 'fixture.chip']),
            failing,
        );

        expect(html).toContain('<p>a <span role="group"');
        expect(html).toContain('data-rte-island="">\u00A0b </span>\u00A0c</p>');
    });

    it('renders an inline node whose override throws as a span, with no div inside the p', () => {
        const paragraphs = html.match(/<p>.*?<\/p>/g) ?? [];

        expect(html).toContain(
            '<span role="group" aria-label="Unsupported content: fixture.mention" data-rte-island=""></span>',
        );
        expect(paragraphs.some((markup) => markup.includes('<div'))).toBe(false);
    });

    it('keeps the text a failing mark override wraps, in a span fallback', () => {
        expect(html).toContain(
            '<p><span role="group" aria-label="Unsupported content: fixture.link" data-rte-island="">Linked</span></p>',
        );
    });

    it('reports one reader.override-failed error naming the feature and the path per failure', () => {
        expect(diagnostics.filter(({ code }) => code !== 'format.unknown-attribute')).toEqual([
            {
                code: 'reader.override-failed',
                severity: 'error',
                messageKey: 'reader.override-failed',
                path: '/content/content/0/content/1',
                featureId: 'fixture.mention',
                details: { name: 'mention' },
            },
            {
                code: 'reader.override-failed',
                severity: 'error',
                messageKey: 'reader.override-failed',
                path: '/content/content/1',
                featureId: 'fixture.blocks',
                details: { name: 'blockquote' },
            },
            {
                code: 'reader.override-failed',
                severity: 'error',
                messageKey: 'reader.override-failed',
                path: '/content/content/2/content/0/marks/0',
                featureId: 'fixture.link',
                details: { name: 'link' },
            },
        ]);
    });

    it('shows no island notice for a failed override', () => {
        expect(html).not.toContain('data-rte-message');
    });

    it('renders without a callback and with a class component as an override', () => {
        class Legacy {}
        const classed = compileContentModel(
            [core(), defineReaderFeature(vocabularyMention(), { mention: Legacy as never })],
            { id: 'fixture.vocabulary', version: 1 },
        );
        const output = renderReader(envelope(doc(paragraph(mention('m-1'))), ['core', 'fixture.mention']), classed);

        expect(output).toContain('<span role="group" aria-label="Unsupported content: fixture.mention"');
    });
});

describe('RichTextReader resolvers', () => {
    const Probe = ({ context }: ReaderNodeProps): ReactElement =>
        createElement(
            'span',
            null,
            JSON.stringify([context.resolveAssetUrl?.('a-1', {}), context.resolveReference('user', '1')]),
        );
    const probed = compileContentModel([core(), defineReaderFeature(vocabularyMention(), { mention: Probe })], {
        id: 'fixture.vocabulary',
        version: 1,
    });
    const document = envelope(doc(paragraph(mention('m-1'))), ['core', 'fixture.mention']);

    it('gives an override null or unknown from a resolver that throws, and the resolver value otherwise', () => {
        const thrower = () => {
            throw new Error('down');
        };

        expect(
            renderReader(document, probed, { presentation: { resolveAssetUrl: thrower, resolveReference: thrower } }),
        ).toContain('[null,{&quot;status&quot;:&quot;unknown&quot;}]');
        expect(
            renderReader(document, probed, {
                presentation: {
                    resolveAssetUrl: (id) => `https://assets.test/${id}`,
                    resolveReference: () => ({ status: 'current', label: 'Ada' }),
                },
            }),
        ).toContain(
            '[&quot;https://assets.test/a-1&quot;,{&quot;status&quot;:&quot;current&quot;,&quot;label&quot;:&quot;Ada&quot;}]',
        );
        expect(renderReader(document, probed)).toContain('[null,{&quot;status&quot;:&quot;unknown&quot;}]');
    });
});

describe('RichTextReader data manifest', () => {
    const manifest = JSON.parse(
        readFileSync(new URL('../../model/__tests__/fixtures/manifest/acme-pull-quote.json', import.meta.url), 'utf8'),
    ) as unknown;
    const document = JSON.parse(
        readFileSync(
            new URL('../../model/__tests__/fixtures/manifest/acme-pull-quote.document.json', import.meta.url),
            'utf8',
        ),
    ) as unknown;
    const acme = compileContentModel([core(), featureFromManifest(manifest)()], { id: 'acme.model', version: 1 });

    it('renders the acme.pull-quote fixture from its HtmlSpec alone, evaluating no code', () => {
        const evaluated = vi.spyOn(globalThis, 'eval');
        const constructed = vi.spyOn(globalThis, 'Function');
        try {
            expect(renderReader(document, acme)).toBe(
                '<div><p>Intro</p><blockquote class="acme-pull-quote" data-tone="brand">Design &lt;is&gt; how it works</blockquote></div>',
            );
            expect(evaluated).not.toHaveBeenCalled();
            expect(constructed).not.toHaveBeenCalled();
        } finally {
            evaluated.mockRestore();
            constructed.mockRestore();
        }
    });
});

describe('RichTextReader determinism', () => {
    const attr = { lang: null, styleId: null, align: null, indent: 0 };
    const textArb = fc.string({ minLength: 1, maxLength: 12 }).map((value) => text(value.replaceAll('\u0000', ' ')));
    const inlineArb = fc.oneof(
        textArb,
        textArb.map((node_) => ({ ...node_, marks: [{ type: 'bold' }] })),
        fc.constant(mention('m-1')),
        fc.constant({ type: 'hard_break' }),
    );
    const blockArb = fc.oneof(
        fc.array(inlineArb, { maxLength: 4 }).map((content) => paragraph(...content)),
        fc.array(inlineArb, { maxLength: 3 }).map((content) => node('paragraph', attr, ...content)),
        fc.constant(rule()),
        fc.array(textArb, { minLength: 1, maxLength: 2 }).map((content) => blockquote(paragraph(...content))),
    );
    const documentArb = fc.array(blockArb, { minLength: 1, maxLength: 5 }).map((blocks) => wrap(...blocks));

    it('renders the same document twice to byte-identical output', () => {
        fc.assert(
            fc.property(documentArb, (document) => {
                // Each side parses its own copy, so no cached output stands in for a second render.
                const first = read(JSON.parse(JSON.stringify(document)) as unknown);
                const second = read(JSON.parse(JSON.stringify(document)) as unknown);

                expect(second).toBe(first);
                expect(first).toMatch(/^<div/);
            }),
            { numRuns: 100 },
        );
    });

    it('renders a heading and a link the same way twice', () => {
        const document = wrap(heading('h-1', text('Title')), paragraph(text('See ', link('https://frontify.com'))));

        expect(read(structuredClone(document))).toBe(read(structuredClone(document)));
    });
});

describe('RichTextReader urls', () => {
    const entries = JSON.parse(
        readFileSync(new URL('../../model/__tests__/fixtures/urls.json', import.meta.url), 'utf8'),
    ) as readonly { readonly input: string; readonly ok: boolean; readonly href?: string }[];
    const withUrl = (input: string) =>
        wrap(
            paragraph(text('Go', link(input))),
            node('embed', { nodeId: 'e-1', url: input, provider: 'youtube', title: null }),
        );

    it.each(entries.filter(({ ok }) => !ok).map(({ input }) => input))(
        'writes no href or url for the unsafe input %j, as a link or an embed',
        (input) => {
            const html = read(withUrl(input));

            expect(html).not.toContain('href=');
            expect(html).not.toContain('alert(1)');
            expect(html).toContain('<p>Go</p>');
        },
    );

    it.each(entries.flatMap(({ ok, href }) => (ok && href !== undefined ? [href] : [])))(
        'writes the checked href %j',
        (href) => {
            expect(read(wrap(paragraph(text('Go', link(href)))))).toContain(`<a href="${href}">Go</a>`);
        },
    );
});

describe('RichTextReader document attributes', () => {
    const root = (attrs?: JsonObject) => {
        const content: Record<string, JsonValue> = { type: 'doc', content: [paragraph(text('a'))] };
        if (attrs !== undefined) {
            content.attrs = attrs;
        }
        return { ...(wrap() as object), content };
    };

    it('renders the declared defaults of doc for omitted attributes, writing no lang or dir', () => {
        expect(read(root())).toBe('<div><p>a</p></div>');
        expect(read(root({ lang: null, dir: 'auto' }))).toBe('<div><p>a</p></div>');
    });

    it('renders the default for a doc attribute that fails its declaration, not the stored value', () => {
        expect(read(root({ lang: 'not a language', dir: 'sideways' }))).toBe('<div><p>a</p></div>');
    });

    it('writes a valid doc lang and dir on the reader root', () => {
        expect(read(root({ lang: 'ar', dir: 'rtl' }))).toBe('<div lang="ar" dir="rtl"><p>a</p></div>');
    });
});

describe('RichTextReader marks', () => {
    it('renders a partly bold, partly coloured link as one a', () => {
        const colored = mark('font_color', { tokenId: 'brand.red', value: null });
        const html = read(
            wrap(
                paragraph(
                    text('bold ', link('https://frontify.com'), mark('bold')),
                    text('colour', link('https://frontify.com'), colored),
                ),
            ),
        );

        expect(html).toBe(
            '<div><p><a href="https://frontify.com"><strong>bold </strong><span data-rte-color="brand.red">colour</span></a></p></div>',
        );
    });
});
