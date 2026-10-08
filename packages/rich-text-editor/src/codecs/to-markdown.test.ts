/* (c) Copyright Frontify Ltd., all rights reserved. */

import fc from 'fast-check';
import MarkdownIt from 'markdown-it';
import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import { describe, expect, it } from 'vitest';

import {
    blockquote,
    bulletList,
    cell,
    heading,
    link,
    listItem,
    mark,
    mention,
    node,
    paragraph,
    row,
    rule,
    table,
    taskItem,
    taskList,
    text,
} from '#/features/__fixtures__/documents';
import { type JsonValue, type RichTextDocument } from '#/model';
import { decodeToTree } from '#/model/decode';
import { encodeTree } from '#/model/encode';

import { semanticCodecs, stored, withoutIds } from '../../fixtures/codecs/helpers';
import { semanticModel } from '../../fixtures/reader/semantic';

const codecs = semanticCodecs();
const commonMark = new MarkdownIt('commonmark');
const gfmHtmlOf = (markdown: string) => micromark(markdown, { extensions: [gfm()], htmlExtensions: [gfmHtml()] });
const styled = (attrs: object, ...children: readonly JsonValue[]) =>
    node('paragraph', { lang: null, styleId: null, align: null, indent: 0, ...attrs }, ...children);
const header = (...children: readonly JsonValue[]) =>
    node('table_header', { colspan: 1, rowspan: 1, colwidth: null, scope: 'col' }, ...children);
const figure = (nodeId: string, assetId: string) =>
    node(
        'figure',
        { nodeId, align: 'center' },
        node('asset_image', {
            nodeId: `${nodeId}-image`,
            assetId,
            labelSnapshot: 'Photo',
            altIntent: 'meaningful',
            altText: 'A cat',
            width: 640,
            height: null,
            displayWidth: null,
            mediaType: null,
        }),
    );
const resolveAssetUrl = (assetId: string) => {
    if (assetId === 'missing') {
        return null;
    }
    if (assetId === 'unsafe') {
        return 'javascript:alert(1)';
    }
    return `https://cdn.example/${assetId}`;
};

interface Row {
    readonly name: string;
    readonly blocks: readonly JsonValue[];
    readonly markdown: string;
    readonly losses: readonly { readonly featureId: string; readonly count: number }[];
    /** What a reference parser renders from the output: `markdown-it` in CommonMark mode, or `micromark` with GFM for the GFM rows. */
    readonly parsed: string;
    readonly dialect: 'commonmark' | 'gfm';
}

const rows: readonly Row[] = [
    {
        name: 'bold, italic, strike and code as **, *, ~~ and backticks, with no loss',
        blocks: [
            paragraph(
                text('b', mark('bold')),
                text(' '),
                text('i', mark('italic')),
                text(' '),
                text('s', mark('strike')),
                text(' '),
                text('c', mark('code')),
            ),
        ],
        markdown: '**b** *i* ~~s~~ `c`',
        losses: [],
        parsed: '<p><strong>b</strong> <em>i</em> <del>s</del> <code>c</code></p>',
        dialect: 'gfm',
    },
    {
        name: 'hard_break as a backslash at the line end, with no loss',
        blocks: [paragraph(text('a'), node('hard_break'), text('b'))],
        markdown: 'a\\\nb',
        losses: [],
        parsed: '<p>a<br />\nb</p>\n',
        dialect: 'commonmark',
    },
    {
        name: 'underline, subscript, superscript, highlight, font_color and language as text only, with a loss',
        blocks: [
            paragraph(
                text('u', mark('underline')),
                text('x', mark('subscript')),
                text('y', mark('superscript')),
                text('h', mark('highlight', { tokenId: null, value: '#ffcc00' })),
                text('f', mark('font_color', { tokenId: 'brand', value: null })),
                text('l', mark('language', { lang: 'de', dir: null })),
            ),
        ],
        markdown: 'uxyhfl',
        losses: [
            { featureId: 'fixture.marks', count: 4 },
            { featureId: 'fixture.colors', count: 2 },
        ],
        parsed: '<p>uxyhfl</p>\n',
        dialect: 'commonmark',
    },
    {
        name: 'headings, quotes, lists, code blocks and rules in standard syntax, ordered lists keeping start, with no loss',
        blocks: [
            heading('h-1', text('Title')),
            blockquote(paragraph(text('q'))),
            bulletList(listItem(paragraph(text('a'))), listItem(paragraph(text('b')))),
            node(
                'ordered_list',
                { start: 3, marker: null },
                listItem(paragraph(text('c'))),
                listItem(paragraph(text('d'))),
            ),
            node('code_block', { languageId: 'ts' }, text('let a;')),
            rule(),
        ],
        markdown: '## Title\n\n> q\n\n- a\n- b\n\n3. c\n4. d\n\n```ts\nlet a;\n```\n\n---',
        losses: [],
        parsed: '<h2>Title</h2>\n<blockquote>\n<p>q</p>\n</blockquote>\n<ul>\n<li>a</li>\n<li>b</li>\n</ul>\n<ol start="3">\n<li>c</li>\n<li>d</li>\n</ol>\n<pre><code class="language-ts">let a;\n</code></pre>\n<hr />\n',
        dialect: 'commonmark',
    },
    {
        name: 'task items as GFM task list items, with no loss',
        blocks: [
            taskList(
                taskItem('t-1', paragraph(text('open'))),
                node('task_item', { nodeId: 't-2', checked: true }, paragraph(text('done'))),
            ),
        ],
        markdown: '- [ ] open\n- [x] done',
        losses: [],
        parsed: '<ul>\n<li><input type="checkbox" disabled="" /> open</li>\n<li><input type="checkbox" disabled="" checked="" /> done</li>\n</ul>',
        dialect: 'gfm',
    },
    {
        name: 'align, indent, styleId, block lang, list marker and openInNewWindow dropped, with a loss each',
        blocks: [
            styled({ align: 'center' }, text('a')),
            styled({ indent: 2 }, text('b')),
            styled({ styleId: 'brand.lead' }, text('c')),
            styled({ lang: 'de' }, text('d')),
            node('bullet_list', { marker: 'square' }, listItem(paragraph(text('e')))),
            paragraph(text('f', mark('link', { href: 'https://frontify.com', openInNewWindow: true, styleId: null }))),
        ],
        markdown: 'a\n\nb\n\nc\n\nd\n\n- e\n\n[f](https://frontify.com)',
        losses: [
            { featureId: 'fixture.align', count: 1 },
            { featureId: 'fixture.indent', count: 1 },
            { featureId: 'fixture.styles', count: 1 },
            { featureId: 'core', count: 1 },
            { featureId: 'fixture.lists', count: 1 },
            { featureId: 'fixture.link', count: 1 },
        ],
        parsed: '<p>a</p>\n<p>b</p>\n<p>c</p>\n<p>d</p>\n<ul>\n<li>e</li>\n</ul>\n<p><a href="https://frontify.com">f</a></p>\n',
        dialect: 'commonmark',
    },
    {
        name: 'a table with a column header row and one paragraph per cell as a GFM table, with no loss',
        blocks: [
            table(
                't-1',
                row(header(paragraph(text('A'))), header(paragraph(text('B')))),
                row(cell({}, paragraph(text('1'))), cell({}, paragraph(text('2')))),
            ),
        ],
        markdown: '| A | B |\n| --- | --- |\n| 1 | 2 |',
        losses: [],
        parsed: '<table>\n<thead>\n<tr>\n<th>A</th>\n<th>B</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>2</td>\n</tr>\n</tbody>\n</table>',
        dialect: 'gfm',
    },
    {
        name: 'another table with no spans and one paragraph per cell as a GFM table with its first row as header, with a loss',
        blocks: [
            table(
                't-1',
                row(cell({}, paragraph(text('A'))), cell({}, paragraph(text('B')))),
                row(cell({}, paragraph(text('1'))), cell({}, paragraph(text('2')))),
            ),
        ],
        markdown: '| A | B |\n| --- | --- |\n| 1 | 2 |',
        losses: [{ featureId: 'fixture.tables', count: 1 }],
        parsed: '<table>\n<thead>\n<tr>\n<th>A</th>\n<th>B</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>2</td>\n</tr>\n</tbody>\n</table>',
        dialect: 'gfm',
    },
    {
        name: 'a table with spans as its cell text in paragraphs, with a loss',
        blocks: [
            table(
                't-1',
                row(cell({ colspan: 2 }, paragraph(text('A')))),
                row(cell({}, paragraph(text('1'))), cell({}, paragraph(text('2')))),
            ),
        ],
        markdown: 'A\n\n1\n\n2',
        losses: [{ featureId: 'fixture.tables', count: 1 }],
        parsed: '<p>A</p>\n<p>1</p>\n<p>2</p>\n',
        dialect: 'commonmark',
    },
    {
        name: 'links as [text](href), and a link to a heading as # plus its GitHub slug, with no loss',
        blocks: [
            heading('h-1', text('Plan, then ship!')),
            heading('h-2', text('Plan, then ship!')),
            paragraph(text('Frontify', link('https://frontify.com')), text(' '), text('see', link('#h-2'))),
        ],
        markdown:
            '## Plan, then ship!\n\n## Plan, then ship!\n\n[Frontify](https://frontify.com) [see](#plan-then-ship-1)',
        losses: [],
        parsed: '<h2>Plan, then ship!</h2>\n<h2>Plan, then ship!</h2>\n<p><a href="https://frontify.com">Frontify</a> <a href="#plan-then-ship-1">see</a></p>\n',
        dialect: 'commonmark',
    },
    {
        name: 'mentions as @label, with a loss',
        blocks: [paragraph(text('Hi '), mention('m-1'))],
        markdown: 'Hi @Ada',
        losses: [{ featureId: 'fixture.mention', count: 1 }],
        parsed: '<p>Hi @Ada</p>\n',
        dialect: 'commonmark',
    },
    {
        name: 'images as ![alt](url) through resolveAssetUrl after checkHref, or nothing when unresolved or unsafe, with a loss',
        blocks: [figure('f-1', 'a-1'), figure('f-2', 'missing'), figure('f-3', 'unsafe')],
        markdown: '![A cat](https://cdn.example/a-1)',
        losses: [{ featureId: 'fixture.media', count: 3 }],
        parsed: '<p><img src="https://cdn.example/a-1" alt="A cat" /></p>\n',
        dialect: 'commonmark',
    },
    {
        name: 'embeds as [title](url) in their own paragraph, or as an autolink when the title is null, with a loss',
        blocks: [
            node('embed', {
                nodeId: 'e-1',
                url: 'https://www.youtube.com/watch?v=x',
                provider: 'youtube',
                title: 'Talk',
            }),
            node('embed', {
                nodeId: 'e-2',
                url: 'https://www.youtube.com/watch?v=y',
                provider: 'youtube',
                title: null,
            }),
        ],
        markdown: '[Talk](https://www.youtube.com/watch?v=x)\n\n<https://www.youtube.com/watch?v=y>',
        losses: [{ featureId: 'fixture.media', count: 2 }],
        parsed: '<p><a href="https://www.youtube.com/watch?v=x">Talk</a></p>\n<p><a href="https://www.youtube.com/watch?v=y">https://www.youtube.com/watch?v=y</a></p>',
        dialect: 'gfm',
    },
    {
        name: 'column_break dropped, with a loss',
        blocks: [paragraph(text('a')), node('column_break'), paragraph(text('b'))],
        markdown: 'a\n\nb',
        losses: [{ featureId: 'fixture.blocks', count: 1 }],
        parsed: '<p>a</p>\n<p>b</p>\n',
        dialect: 'commonmark',
    },
];

describe('toMarkdown rules', () => {
    it.each(rows)('SPEC-rich-text-output/AC-020 writes $name', ({ blocks, markdown, losses, parsed, dialect }) => {
        const output = codecs.toMarkdown(stored(...blocks), { resolveAssetUrl });

        expect(output.markdown).toBe(markdown);
        expect(output.losses).toEqual(losses);
        if (dialect === 'gfm') {
            expect(gfmHtmlOf(output.markdown)).toBe(parsed);
        } else {
            expect(commonMark.render(output.markdown)).toBe(parsed);
        }
    });

    it('SPEC-rich-text-output/AC-020 writes an opaque island as its escaped text, reported by its decode diagnostic and not in losses', () => {
        const output = codecs.toMarkdown(
            stored(paragraph(text('a')), { type: 'callout', content: [{ type: 'text', text: '# <b>*x*</b>' }] }),
        );

        expect(output.markdown).toBe('a\n\n\\# \\<b>\\*x\\*\\</b>');
        expect(output.losses).toEqual([]);
        expect(output.diagnostics).toEqual([
            expect.objectContaining({ code: 'format.unknown-node', path: '/content/content/1' }),
        ]);
        expect(commonMark.render(output.markdown)).toBe('<p>a</p>\n<p># &lt;b&gt;*x*&lt;/b&gt;</p>\n');
    });

    it('SPEC-rich-text-output/AC-020 reads the column header row of a GFM table back as table_header cells with scope col', () => {
        const exact = rows.find(({ name }) => name.startsWith('a table with a column header'));
        if (exact === undefined) {
            throw new Error('the exact table row is missing');
        }
        const result = codecs.fromMarkdown(exact.markdown);
        const document = stored(...exact.blocks);

        expect(result.status).toBe('editable');
        expect(result.status === 'editable' && withoutIds(result.document.content)).toEqual(
            withoutIds(document.content),
        );
    });
});

// Markdown and HTML syntax characters, with letters and spaces between them.
const SPECIAL = [...'*_[]()#>|~`<&!\\-+=.:/@ \tab1'];
const specialText = fc.string({ unit: fc.constantFrom(...SPECIAL), minLength: 1, maxLength: 12 });
const model = semanticModel();
/** The document in canonical form: adjacent text joined, marks in rank order. */
const canonical = (document: RichTextDocument): RichTextDocument => {
    const { tree } = decodeToTree(document, model);
    if (tree === undefined) {
        throw new Error('the generated document does not decode');
    }
    return encodeTree(tree, model).document;
};
const textOf = (value: unknown): string => {
    if (typeof value !== 'object' || value === null) {
        return '';
    }
    const { text: own = '', content = [] } = value as { readonly text?: string; readonly content?: readonly unknown[] };
    return own + content.map(textOf).join('|');
};

describe('toMarkdown escaping', () => {
    it('SPEC-rich-text-output/AC-021 escapes Markdown and HTML characters so fromMarkdown reads the same text back', () => {
        fc.assert(
            fc.property(fc.array(specialText, { minLength: 1, maxLength: 4 }), (texts) => {
                const document = canonical(stored(...texts.map((value) => paragraph(text(value)))));
                const result = codecs.fromMarkdown(codecs.toMarkdown(document).markdown);

                expect(result.status).toBe('editable');
                expect(result.status === 'editable' && textOf(result.document.content)).toBe(textOf(document.content));
            }),
            { numRuns: 300 },
        );
    });
});

const LOSSLESS_MARKS = ['link', 'bold', 'italic', 'strike', 'code'];
const marksArb = fc.subarray(LOSSLESS_MARKS).map((names) =>
    names.map((name) => {
        if (name === 'link') {
            return link('https://example.com/a');
        }
        return mark(name);
    }),
);
const textArb = fc.tuple(specialText, marksArb).map(([value, marks]) => text(value, ...marks));
const inlineArb = fc.oneof(
    { weight: 5, arbitrary: textArb },
    { weight: 1, arbitrary: fc.constant(node('hard_break')) },
);
const paragraphArb = fc.array(inlineArb, { minLength: 1, maxLength: 5 }).map((content) => paragraph(...content));
const headerRow = (cells: readonly (readonly JsonValue[])[]) =>
    row(...cells.map((content) => header(paragraph(...content))));
const tableArb = fc
    .tuple(fc.integer({ min: 1, max: 3 }), fc.integer({ min: 1, max: 3 }))
    .chain(([columns, rows_]) =>
        fc.array(fc.array(fc.array(textArb, { maxLength: 2 }), { minLength: columns, maxLength: columns }), {
            minLength: rows_,
            maxLength: rows_,
        }),
    )
    .map(([first = [], ...rest]) =>
        table(
            't',
            headerRow(first),
            ...rest.map((cellsOfRow) => row(...cellsOfRow.map((content) => cell({}, paragraph(...content))))),
        ),
    );
const { block } = fc.letrec<{ block: JsonValue }>((tie) => ({
    block: fc.oneof(
        { depthSize: 'small', withCrossShrink: true },
        paragraphArb,
        fc
            .tuple(fc.integer({ min: 1, max: 6 }), fc.array(textArb, { maxLength: 3 }))
            .map(([level, content]) =>
                node('heading', { nodeId: 'h', level, lang: null, styleId: null, align: null, indent: 0 }, ...content),
            ),
        fc.array(tie('block'), { minLength: 1, maxLength: 2 }).map((content) => blockquote(...content)),
        fc
            .array(fc.tuple(paragraphArb, fc.array(tie('block'), { maxLength: 1 })), { minLength: 1, maxLength: 3 })
            .map((items) => bulletList(...items.map(([first, rest]) => listItem(first, ...rest)))),
        fc
            .tuple(fc.integer({ min: 0, max: 20 }), fc.array(paragraphArb, { minLength: 1, maxLength: 3 }))
            .map(([start, items]) =>
                node('ordered_list', { start, marker: null }, ...items.map((first) => listItem(first))),
            ),
        fc
            .array(fc.tuple(fc.boolean(), paragraphArb), { minLength: 1, maxLength: 3 })
            .map((items) =>
                taskList(...items.map(([checked, first]) => node('task_item', { nodeId: 't', checked }, first))),
            ),
        fc
            .tuple(fc.constantFrom(null, 'ts'), fc.string({ unit: fc.constantFrom(...SPECIAL, '\n'), maxLength: 12 }))
            .map(([languageId, code]) => {
                if (code === '') {
                    return node('code_block', { languageId });
                }
                return node('code_block', { languageId }, text(code));
            }),
        fc.constant(rule()),
        tableArb,
    ),
}));
let nodeIds = 0;
/** Every `nodeId` unique, as decode requires. */
const unique = (value: JsonValue): JsonValue =>
    JSON.parse(
        JSON.stringify(value, (key, child: unknown) => {
            if (key !== 'nodeId') {
                return child;
            }
            nodeIds += 1;
            return `n-${nodeIds}`;
        }),
    ) as JsonValue;
const documentArb = fc
    .array(block, { minLength: 1, maxLength: 4 })
    .map((blocks) => canonical(stored(...blocks.map(unique))));

describe('Markdown round trip', () => {
    it('SPEC-rich-text-output/AC-024 returns an equal document, ignoring nodeIds, whenever toMarkdown reports no loss', () => {
        let lossless = 0;
        fc.assert(
            fc.property(documentArb, (document) => {
                const output = codecs.toMarkdown(document);
                if (output.losses.length > 0) {
                    return;
                }
                lossless += 1;
                const result = codecs.fromMarkdown(output.markdown);

                expect(result.status).toBe('editable');
                expect(result.status === 'editable' && withoutIds(result.document)).toEqual(withoutIds(document));
            }),
            { numRuns: 500 },
        );
        // Most generated documents must reach the comparison, or the property would hold by skipping them.
        expect(lossless).toBeGreaterThan(250);
        // Coverage instrumentation slows 500 documents past the default 5 s.
    }, 60_000);
});

describe('toMarkdown edge rules', () => {
    const markdownOf = (...blocks: readonly JsonValue[]) => {
        const { markdown, losses } = codecs.toMarkdown(stored(...blocks));
        return { markdown, losses };
    };
    const ordered = (...items: readonly JsonValue[]) => node('ordered_list', { start: 1, marker: null }, ...items);

    it.each<readonly [string, readonly JsonValue[], string, readonly { featureId: string; count: number }[]]>([
        [
            'a hard break in a heading as a space, with a loss',
            [heading('h-1', text('a'), node('hard_break'), text('b'))],
            '## a b',
            [{ featureId: 'core', count: 1 }],
        ],
        [
            'a hard break that ends a paragraph as nothing, with a loss',
            [paragraph(text('a'), node('hard_break'))],
            'a',
            [{ featureId: 'core', count: 1 }],
        ],
        [
            'an empty paragraph beside others as nothing, with a loss',
            [paragraph(text('a')), paragraph(), paragraph(text('b'))],
            'a\n\nb',
            [{ featureId: 'core', count: 1 }],
        ],
        [
            'adjacent bullet lists with alternating markers so they stay apart',
            [
                bulletList(listItem(paragraph(text('a')))),
                bulletList(listItem(paragraph(text('b')))),
                bulletList(listItem(paragraph(text('c')))),
            ],
            '- a\n\n+ b\n\n- c',
            [],
        ],
        [
            'adjacent ordered lists with alternating delimiters',
            [ordered(listItem(paragraph(text('a')))), ordered(listItem(paragraph(text('b'))))],
            '1. a\n\n1) b',
            [],
        ],
        [
            'an empty first paragraph followed by a list, with a loss',
            [bulletList(listItem(paragraph(), bulletList(listItem(paragraph(text('n'))))))],
            '- - n',
            [
                { featureId: 'fixture.lists', count: 1 },
                { featureId: 'core', count: 1 },
            ],
        ],
        [
            'a link whose href the parser would rewrite, with a loss',
            [paragraph(text('x', link('https://a.co/x y')))],
            '[x](<https://a.co/x y>)',
            [{ featureId: 'fixture.link', count: 1 }],
        ],
        [
            'a GFM cell with a hard break and a link holding a pipe, with a loss',
            [
                table(
                    't',
                    row(header(paragraph(text('a'), node('hard_break'), text('b')))),
                    row(cell({}, paragraph(text('x', link('https://a.co/x|y'))))),
                ),
            ],
            '| a b |\n| --- |\n| [x](https://a.co/x\\|y) |',
            [
                { featureId: 'fixture.tables', count: 1 },
                { featureId: 'core', count: 1 },
                { featureId: 'fixture.link', count: 1 },
            ],
        ],
        [
            'an embed with no title and a relative URL as a link to itself',
            [node('embed', { nodeId: 'e', url: '/talk', provider: 'youtube', title: null })],
            '[/talk](/talk)',
            [{ featureId: 'fixture.media', count: 1 }],
        ],
        [
            'an image with no resolveAssetUrl as nothing',
            [paragraph(text('a')), figure('f-1', 'a-1')],
            'a',
            [{ featureId: 'fixture.media', count: 1 }],
        ],
        [
            'a code span holding backticks with padding and a longer fence',
            [paragraph(text('x', mark('bold'), mark('code'))), paragraph(text('`a`', mark('code')))],
            '**`x`**\n\n`` `a` ``',
            [],
        ],
    ])('SPEC-rich-text-output/AC-020 writes %s', (_, blocks, markdown, losses) => {
        expect(markdownOf(...blocks)).toEqual({ markdown, losses });
    });

    it.each<readonly [string, readonly JsonValue[], string]>([
        [
            'list and heading markers at a line start, and the starts of links on import',
            [paragraph(text('1. www.frontify.com a@b.co http://x'), node('hard_break'), text('2) - # > + ='))],
            '1\\. www\\.frontify.com a\\@b.co http\\:\\//x\\\n2\\) - \\# > + =',
        ],
        [
            'spaces at the edges of a line as references',
            [paragraph(text(' lead and trail '))],
            '&#x20;lead and trail&#x20;',
        ],
        [
            'italic as underscores where asterisk runs of italic and bold would merge',
            [paragraph(text('a', mark('italic')), text('a', mark('bold')), text('a', mark('bold'), mark('italic')))],
            '_a_**&#x61;_a_**',
        ],
    ])('SPEC-rich-text-output/AC-021 escapes %s so the text reads back the same', (_, blocks, markdown) => {
        const document = canonical(stored(...blocks));
        const output = codecs.toMarkdown(document);
        const result = codecs.fromMarkdown(output.markdown);

        expect(output).toMatchObject({ markdown, losses: [] });
        expect(result.status === 'editable' && withoutIds(result.document)).toEqual(withoutIds(document));
    });
});
