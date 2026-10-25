/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import MarkdownIt from 'markdown-it';
import { describe, expect, it } from 'vitest';

import {
    blockquote,
    bulletList,
    listItem,
    mark,
    node,
    paragraph,
    table,
    text,
} from '#/features/__tests__/fixtures/documents';
import { core } from '#/features/core/feature';
import { compileContentModel, defineFeature, type JsonValue } from '#/model';

import { createCodecs } from '../codecs';

import { requires, testDocument, codesOf } from './fixtures/codec-documents';
import { semanticCodecs, stored } from './helpers/helpers';

describe('fromMarkdown structures the model cannot hold', () => {
    const model = compileContentModel([core()], { id: 'test.core', version: 1 });
    const codecs = createCodecs(model);

    it('keeps the text of a table and a fenced code block and reports each with its path and feature', () => {
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

    it('reports emphasis and links the model lacks, keeping their text', () => {
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

    it('keeps the text of headings, quotes, lists, images and marks, and drops rules, each with a diagnostic', () => {
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

    it('reads empty Markdown as one empty paragraph', () => {
        const result = codecs.fromMarkdown('');

        expect(result.status === 'editable' && result.document.content.content).toEqual([
            { type: 'paragraph', attrs: { lang: null } },
        ]);
        expect(result.diagnostics).toEqual([]);
    });
});

describe('fromMarkdown', () => {
    it('builds blocks the model holds with new nodeIds from generateId', () => {
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

    it('reads a list with some task markers as bullets with literal text, marks over a hard break, and a javascript: link as text', () => {
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

    it('writes Markdown forms and overrides, and loses a mark or container with neither', () => {
        expect(codecs.toMarkdown(document)).toEqual({
            markdown: '==a== [[k]] x p f :"wave":\n\n!> Note\n\n$$\nx^2\n$$\n\nin panel',
            losses: [
                { featureId: 'test.custom', count: 2 },
                { featureId: 'test.off', count: 2 },
            ],
            diagnostics: failures('markdown'),
            blocked: false,
        });
    });

    it('writes the text inside a mark or inline node whose override throws, from each codec', () => {
        expect(codecs.toPlainText(document)).toEqual({
            text: 'a <k> x p f :"wave":\n\nNote\n\nx^2\n\nin panel',
            losses: [{ featureId: 'test.off', count: 2 }],
            diagnostics: failures('text'),
            blocked: false,
        });
    });

    it('counts each use of a feature that marks a format unsupported or lossy', () => {
        const html = codecs.toHTML(document);

        expect(html.html).toContain('<mark>a</mark> <kbd>k</kbd> <b>x</b>');
        expect(html.diagnostics).toEqual([expect.objectContaining({ featureId: 'test.off', details: { count: 2 } })]);
    });
});

describe('Markdown output a stored document cannot turn into markup', () => {
    const commonMark = new MarkdownIt('commonmark');
    const hostile = '<img src=x onerror=alert(1)>\n[x](javascript:alert(1))\n```\n<script>alert(1)</script>';
    const fenced = (fence: string) =>
        compileContentModel(
            [
                core(),
                defineFeature({
                    id: 'test.fenced',
                    version: 1,
                    requires,
                    nodes: {
                        formula: {
                            group: 'block',
                            content: 'text*',
                            marks: [],
                            attrs: {},
                            html: ['pre', 0],
                            parse: [],
                            markdown: { fence },
                        },
                    },
                    formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
                })(),
            ],
            { id: 'test.fenced', version: 1 },
        );

    it.each(['$$', '```', '~~~'])(
        'writes the body of a %j fence form so it never parses as HTML or a link',
        (fence) => {
            const model = fenced(fence);
            const output = createCodecs(model).toMarkdown(
                testDocument(model, { type: 'formula', content: [{ type: 'text', text: hostile }] }),
            );
            const rendered = commonMark.render(output.markdown);

            expect(rendered).not.toMatch(/<(img|script|a)[\s>]/);
            expect(rendered).toContain('alert(1)');
        },
    );

    it.each(['```', '````', '~~~', '~~~~'])(
        'writes the body of a %j code fence form so it reads back exactly',
        (fence) => {
            const body = 'a ``` b\n~~~~~\n<b>x</b> \\';
            const model = fenced(fence);
            const output = createCodecs(model).toMarkdown(
                testDocument(model, { type: 'formula', content: [{ type: 'text', text: body }] }),
            );
            const tokens = commonMark.parse(output.markdown, {});

            expect(tokens.map(({ type }) => type)).toEqual(['fence']);
            expect(tokens[0]?.content).toBe(`${body}\n`);
        },
    );

    it.each([
        ['a paragraph', (code: JsonValue) => stored(paragraph(code))],
        [
            'a table cell',
            (code: JsonValue) =>
                stored(
                    table(
                        't-1',
                        node(
                            'table_row',
                            undefined,
                            node(
                                'table_header',
                                { colspan: 1, rowspan: 1, colwidth: null, scope: 'col' },
                                paragraph(code),
                            ),
                        ),
                    ),
                ),
        ],
    ])('keeps a line break in code text inside its code span in %s', (_, documentOf) => {
        const codecs = semanticCodecs();
        const output = codecs.toMarkdown(documentOf(text('a\n<script>alert(1)</script>\r\nb', mark('code'))));
        const rendered = new MarkdownIt('commonmark').use((parser) => parser).render(output.markdown);

        expect(rendered).not.toContain('<script>');
        expect(output.markdown).toContain('`a <script>alert(1)</script> b`');
    });

    it('hands an inline node Markdown override the escaped Markdown of its text', () => {
        const model = compileContentModel(
            [
                core(),
                defineFeature({
                    id: 'test.tag',
                    version: 1,
                    requires,
                    nodes: { tag: { group: 'inline', content: 'text*', attrs: {}, html: ['span', 0], parse: [] } },
                    formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
                    codecs: { markdown: { nodes: { tag: (inner) => `{${inner}}` } } },
                })(),
            ],
            { id: 'test.tag', version: 1 },
        );
        const document = testDocument(model, {
            type: 'paragraph',
            attrs: { lang: null },
            content: [{ type: 'tag', content: [{ type: 'text', text: '*a* <b>' }] }],
        });

        expect(createCodecs(model).toMarkdown(document).markdown).toBe('{\\*a\\* \\<b>}');
    });
});
