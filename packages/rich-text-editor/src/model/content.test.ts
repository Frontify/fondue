/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import {
    blockquote,
    bulletList,
    cell,
    codeBlock,
    doc,
    envelope,
    heading,
    type Json,
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
import { vocabularyModel } from '#/features/__fixtures__/vocabulary';

import { type TreeNode } from './content';
import { decodeToTree } from './decode';
import { encodeTree } from './encode';
import { canonicalJson } from './hash';

const model = vocabularyModel();

const decode = (content: Json) => {
    const { result, tree } = decodeToTree(envelope(content), model);
    if (result.status !== 'editable' || tree === undefined) {
        throw new Error(`expected editable, got ${JSON.stringify(result)}`);
    }
    const encoded = canonicalJson(encodeTree(tree, model).document.content as unknown as Json);
    const codes = result.diagnostics.map(({ code, path }) => `${code} ${path ?? ''}`);
    return { tree, encoded, codes };
};
/** Decodes `content` inside a doc and expects the round trip to give it back byte for byte in canonical form. */
const roundTrip = (content: Json) => {
    const decoded = decode(content);
    expect(decoded.encoded).toBe(canonicalJson(content));
    return decoded;
};
const islandAt = (tree: TreeNode, ...indices: readonly number[]): TreeNode => {
    let current = tree;
    for (const index of indices) {
        const child = current.content === undefined ? undefined : current.content[index];
        if (child === undefined) {
            throw new Error(`no node at ${indices.join('/')}`);
        }
        current = child;
    }
    return current;
};
const attrsAt = (tree: TreeNode, ...indices: readonly number[]) => islandAt(tree, ...indices).attrs ?? {};
const marksAt = (tree: TreeNode, ...indices: readonly number[]) => islandAt(tree, ...indices).marks ?? [];
const unknownNode = (extra: Record<string, Json> = {}): Json => ({ type: 'acme_widget', attrs: { size: 3 }, ...extra });

describe('unknown nodes', () => {
    it('SPEC-rich-text-format/AC-013 keeps two unknown nodes at different depths as islands with their paths', () => {
        const inline = { type: 'acme_chip', attrs: { id: 'c' } };
        const content = doc(unknownNode(), blockquote(paragraph(text('a'), inline)));
        const { tree, codes } = roundTrip(content);
        expect(islandAt(tree, 0)).toEqual({
            type: 'unsupported_block',
            attrs: { original: unknownNode(), feature: 'acme_widget', unknownAttributes: null },
        });
        expect(islandAt(tree, 1, 0, 1).type).toBe('unsupported_inline');
        expect(codes).toEqual([
            'format.unknown-node /content/content/0',
            'format.unknown-node /content/content/1/content/0/content/1',
        ]);
    });

    it('SPEC-rich-text-format/AC-013 makes the list and the table the islands when their parent takes none', () => {
        const list = bulletList(listItem(paragraph()), unknownNode());
        expect(islandAt(roundTrip(doc(list)).tree, 0)).toMatchObject({
            type: 'unsupported_block',
            attrs: { feature: 'bullet_list' },
        });
        const grid = table('t1', row(cell({}, paragraph()), unknownNode()));
        const { tree, codes } = roundTrip(doc(grid));
        expect(islandAt(tree, 0)).toMatchObject({
            type: 'unsupported_block',
            attrs: { original: grid, feature: 'table' },
        });
        expect(codes).toEqual(['format.unknown-node /content/content/0/content/0/content/1']);
    });

    it('SPEC-rich-text-format/AC-013 checks nothing inside an unknown node, an extra key and all', () => {
        const outer = unknownNode({ extra: true, content: [unknownNode()] });
        const { tree, codes } = roundTrip(doc(outer));
        expect(tree.content).toHaveLength(1);
        expect(codes).toEqual(['format.unknown-node /content/content/0']);
    });

    it('SPEC-rich-text-format/AC-013 reads a stored island type as unknown content', () => {
        const stored = { type: 'unsupported_block', attrs: { original: paragraph(), feature: 'paragraph' } };
        const { tree, codes } = roundTrip(doc(stored));
        expect(attrsAt(tree, 0).original).toEqual(stored);
        expect(codes).toEqual(['format.unknown-node /content/content/0']);
    });
});

describe('unknown marks and attributes', () => {
    it('SPEC-rich-text-format/AC-014 keeps an unknown mark as an unsupported_mark on the same text', () => {
        const unknown = { type: 'acme_glow', attrs: { level: 2 } };
        const { tree, codes } = roundTrip(doc(paragraph(text('hi', mark('bold'), unknown))));
        expect(marksAt(tree, 0, 0)).toEqual([
            { type: 'bold', attrs: { unknownAttributes: null } },
            { type: 'unsupported_mark', attrs: { original: unknown, unknownAttributes: null } },
        ]);
        expect(codes).toEqual(['format.unknown-mark /content/content/0/content/0/marks/1']);
    });

    it('SPEC-rich-text-format/AC-014 keeps two different unknown marks on one text', () => {
        const first = { type: 'acme_glow' };
        const second = { type: 'acme_glow', attrs: { level: 1 } };
        const { tree, codes } = roundTrip(doc(paragraph(text('hi', first, second))));
        expect(marksAt(tree, 0, 0).map(({ attrs }) => attrs.original)).toEqual([first, second]);
        expect(codes).toHaveLength(2);
    });

    it('SPEC-rich-text-format/AC-015 keeps undeclared attributes in unknownAttributes and writes each back under its name', () => {
        const linked = {
            ...link('https://frontify.com'),
            attrs: { href: 'https://frontify.com', openInNewWindow: false, styleId: null, rel: 'x' },
        };
        const marked = paragraph(text('a', linked));
        const plain = {
            ...paragraph(),
            attrs: { lang: null, styleId: null, align: null, indent: 0, tone: 'warm', unknownAttributes: 5 },
        };
        const root = { ...doc(plain, marked), attrs: { lang: null, dir: 'auto', unknownAttributes: { a: 1 } } };
        const { tree, codes } = roundTrip(root);
        expect(tree.attrs?.unknownAttributes).toEqual({ unknownAttributes: { a: 1 } });
        expect(attrsAt(tree, 0).unknownAttributes).toEqual({ tone: 'warm', unknownAttributes: 5 });
        expect(marksAt(tree, 1, 0)[0]?.attrs).toEqual({
            href: 'https://frontify.com',
            openInNewWindow: false,
            styleId: null,
            unknownAttributes: { rel: 'x' },
        });
        expect(codes).toEqual([
            'format.unknown-attribute /content/attrs/unknownAttributes',
            'format.unknown-attribute /content/content/0/attrs/tone',
            'format.unknown-attribute /content/content/0/attrs/unknownAttributes',
            'format.unknown-attribute /content/content/1/content/0/marks/0/attrs/rel',
        ]);
        const [first, second] = tree.content ?? [];
        const edited = { ...tree, content: [first, second, { type: 'horizontal_rule' }] as readonly TreeNode[] };
        const saved = encodeTree(edited, model).document.content;
        expect(saved).toEqual({ ...root, content: [plain, marked, { type: 'horizontal_rule' }] });
    });
});

/** Each Vocabulary table attribute with one value outside its declaration, and the node or mark that carries it. */
const outOfRange: readonly (readonly [string, Json])[] = [
    ['paragraph.lang', { ...paragraph(), attrs: { lang: 'en_US', styleId: null, align: null, indent: 0 } }],
    ['paragraph.styleId', { ...paragraph(), attrs: { lang: null, styleId: 'Has Space', align: null, indent: 0 } }],
    ['paragraph.align', { ...paragraph(), attrs: { lang: null, styleId: null, align: 'middle', indent: 0 } }],
    ['paragraph.indent', { ...paragraph(), attrs: { lang: null, styleId: null, align: null, indent: 7 } }],
    ['heading.nodeId', node('heading', { nodeId: 5, level: 2, lang: null, styleId: null, align: null, indent: 0 })],
    ['heading.level', node('heading', { nodeId: 'h', level: 7, lang: null, styleId: null, align: null, indent: 0 })],
    ['heading.lang', node('heading', { nodeId: 'h', level: 2, lang: 'x_y', styleId: null, align: null, indent: 0 })],
    [
        'heading.styleId',
        node('heading', { nodeId: 'h', level: 2, lang: null, styleId: 'Has Space', align: null, indent: 0 }),
    ],
    [
        'heading.align',
        node('heading', { nodeId: 'h', level: 2, lang: null, styleId: null, align: 'middle', indent: 0 }),
    ],
    ['heading.indent', node('heading', { nodeId: 'h', level: 2, lang: null, styleId: null, align: null, indent: 7 })],
    [
        'table_header.colspan',
        table('t', row(node('table_header', { colspan: 1.5, rowspan: 1, colwidth: null, scope: null }, paragraph()))),
    ],
    ['blockquote.styleId', node('blockquote', { styleId: '"q"' }, paragraph())],
    ['bullet_list.marker', node('bullet_list', { marker: 'star' }, listItem(paragraph()))],
    ['ordered_list.start', node('ordered_list', { start: 1_000_001, marker: null }, listItem(paragraph()))],
    ['ordered_list.marker', node('ordered_list', { start: 1, marker: 'greek' }, listItem(paragraph()))],
    ['task_item.nodeId', taskList(node('task_item', { checked: false }, paragraph()))],
    ['task_item.checked', taskList(node('task_item', { nodeId: 't', checked: 'yes' }, paragraph()))],
    ['code_block.languageId', node('code_block', { languageId: '<js>' })],
    ['embed.nodeId', node('embed', { nodeId: null, url: 'https://x.test', provider: 'youtube', title: null })],
    ['embed.url', node('embed', { nodeId: 'e', url: 5, provider: 'youtube', title: null })],
    ['embed.provider', node('embed', { nodeId: 'e', url: 'https://x.test', provider: 'You Tube', title: null })],
    ['embed.title', node('embed', { nodeId: 'e', url: 'https://x.test', provider: 'youtube', title: 3 })],
    [
        'figure.nodeId',
        node('figure', { align: 'center' }, node('asset_image', { nodeId: 'i', assetId: 'a', labelSnapshot: 'l' })),
    ],
    [
        'figure.align',
        node(
            'figure',
            { nodeId: 'f', align: 'justify' },
            node('asset_image', { nodeId: 'i', assetId: 'a', labelSnapshot: 'l' }),
        ),
    ],
    ...(
        [
            ['nodeId', { nodeId: 1 }],
            ['assetId', { assetId: 1 }],
            ['labelSnapshot', { labelSnapshot: null }],
            ['altIntent', { altIntent: 'unknown' }],
            ['altText', { altText: null }],
            ['width', { width: 0 }],
            ['height', { height: 65_536 }],
            ['displayWidth', { displayWidth: 9 }],
            ['mediaType', { mediaType: 4 }],
        ] as const
    ).map(([name, value]): readonly [string, Json] => [
        `asset_image.${name}`,
        node(
            'figure',
            { nodeId: 'f', align: 'center' },
            node('asset_image', { nodeId: 'i', assetId: 'a', labelSnapshot: 'l', ...value }),
        ),
    ]),
    ['table.nodeId', node('table', { nodeId: [] }, row(cell({}, paragraph())))],
    ['table_cell.colspan', table('t', row(cell({ colspan: 51 }, paragraph())))],
    ['table_cell.rowspan', table('t', row(cell({ rowspan: 0 }, paragraph())))],
    ['table_cell.colwidth', table('t', row(cell({ colwidth: [0] }, paragraph())))],
    [
        'table_header.rowspan',
        table('t', row(node('table_header', { colspan: 1, rowspan: 51, colwidth: null, scope: null }, paragraph()))),
    ],
    [
        'table_header.colwidth',
        table('t', row(node('table_header', { colspan: 1, rowspan: 1, colwidth: [0], scope: null }, paragraph()))),
    ],
    [
        'table_header.scope',
        table('t', row(node('table_header', { colspan: 1, rowspan: 1, colwidth: null, scope: 'all' }, paragraph()))),
    ],
    ['mention.nodeId', paragraph(mention('m', { nodeId: 2 }))],
    ['mention.resourceType', paragraph(mention('m', { resourceType: 'User' }))],
    ['mention.resourceId', paragraph(mention('m', { resourceId: null }))],
    ['mention.labelSnapshot', paragraph(mention('m', { labelSnapshot: false }))],
    ['link.href', paragraph(text('a', mark('link', { href: 7, openInNewWindow: false, styleId: null })))],
    ['link.openInNewWindow', paragraph(text('a', mark('link', { href: '/a', openInNewWindow: 'no', styleId: null })))],
    ['link.styleId', paragraph(text('a', mark('link', { href: '/a', openInNewWindow: false, styleId: 'A' })))],
    ['font_color.tokenId', paragraph(text('a', mark('font_color', { tokenId: 'Red', value: null })))],
    ['font_color.value', paragraph(text('a', mark('font_color', { tokenId: null, value: '#FFFFFF' })))],
    ['highlight.tokenId', paragraph(text('a', mark('highlight', { tokenId: ' ', value: null })))],
    ['highlight.value', paragraph(text('a', mark('highlight', { tokenId: null, value: 'red' })))],
    ['language.lang', paragraph(text('a', mark('language', { lang: 'en_US', dir: null })))],
    ['language.dir', paragraph(text('a', mark('language', { lang: 'de', dir: 'up' })))],
];

describe('invalid attributes', () => {
    it.each(outOfRange)(
        'SPEC-rich-text-format/AC-016 keeps %s out of range as an island with a warning',
        (_, value) => {
            const { tree, codes } = roundTrip(doc(value));
            const top = islandAt(tree, 0);
            const first = top.content === undefined ? undefined : top.content[0];
            const marks = first === undefined ? [] : (first.marks ?? []);
            const island = top.type === 'unsupported_block' || marks.some((entry) => entry.type === 'unsupported_mark');
            expect(island || first?.type === 'unsupported_inline').toBe(true);
            expect(codes.filter((code) => code.startsWith('format.invalid-attribute'))).toHaveLength(1);
        },
    );

    it('SPEC-rich-text-format/AC-016 keeps an invalid doc attribute in unknownAttributes with its default and writes it back', () => {
        for (const attrs of [
            { lang: 'en_US', dir: 'auto' },
            { lang: null, dir: 'up' },
        ]) {
            const { tree, codes } = roundTrip({ ...doc(paragraph()), attrs });
            const [name, value] =
                Object.entries(attrs).find(([key]) => (key === 'lang' ? attrs.lang !== null : attrs.dir !== 'auto')) ??
                [];
            const key = name ?? '';
            expect(attrsAt(tree)[key]).toBe(key === 'lang' ? null : 'auto');
            expect(attrsAt(tree).unknownAttributes).toEqual({ [key]: value });
            expect(codes).toEqual([`format.invalid-attribute /content/attrs/${name}`]);
        }
    });

    it('SPEC-rich-text-format/AC-016 makes a node with a missing required attribute an island', () => {
        const { tree, codes } = roundTrip(doc(node('heading', { nodeId: 'h' })));
        expect(islandAt(tree, 0).type).toBe('unsupported_block');
        expect(codes).toEqual(['format.invalid-attribute /content/content/0/attrs/level']);
    });
});

describe('content expressions', () => {
    const columnBreak = node('column_break');
    const cases: readonly (readonly [string, Json, readonly number[], string])[] = [
        [
            'column_break in a table cell',
            table('t', row(cell({}, columnBreak))),
            [0, 0, 0, 0],
            '/content/content/0/content/0/content/0/content/0',
        ],
        [
            'column_break in a list item',
            bulletList(listItem(paragraph(), columnBreak)),
            [0, 0, 1],
            '/content/content/0/content/0/content/1',
        ],
        ['column_break in a quote', blockquote(columnBreak), [0, 0], '/content/content/0/content/0'],
        [
            'asset_image under doc',
            node('asset_image', { nodeId: 'i', assetId: 'a', labelSnapshot: 'l' }),
            [0],
            '/content/content/0',
        ],
        [
            'a list item that starts with a heading',
            bulletList(listItem(heading('h'))),
            [0],
            '/content/content/0/content/0/content/0',
        ],
        ['a blockquote with no child', blockquote(), [0], '/content/content/0'],
        [
            'a horizontal rule with a child',
            node('horizontal_rule', undefined, paragraph()),
            [0],
            '/content/content/0/content/0',
        ],
        [
            'a mention with a child',
            paragraph(
                node('mention', { nodeId: 'm', resourceType: 'user', resourceId: 'u', labelSnapshot: 'A' }, text('x')),
            ),
            [0, 0],
            '/content/content/0/content/0/content/0',
        ],
        ['a paragraph inside a paragraph', paragraph(text('a'), paragraph()), [0, 1], '/content/content/0/content/1'],
        ['text directly under doc', text('loose'), [0], '/content/content/0'],
        ['a hard break in a code block', codeBlock(node('hard_break')), [0], '/content/content/0/content/0'],
        ['a cell outside a row', table('t', cell({}, paragraph())), [0], '/content/content/0/content/0'],
        ['a figure with two images', node('figure', { nodeId: 'f', align: 'center' }), [0], '/content/content/0'],
        ['a task item in a bullet list', bulletList(taskItem('t', paragraph())), [0], '/content/content/0/content/0'],
        ['a paragraph directly in a task list', taskList(paragraph()), [0], '/content/content/0/content/0'],
        [
            'a paragraph directly in a table row',
            table('t', row(paragraph())),
            [0],
            '/content/content/0/content/0/content/0',
        ],
    ];

    it.each(cases)('SPEC-rich-text-format/AC-017 places the island for %s', (_, value, at, path) => {
        const { tree, codes } = roundTrip(doc(value));
        expect(islandAt(tree, ...at).type).toMatch(/^unsupported_(block|inline)$/);
        expect(codes).toContain(`format.invalid-structure ${path}`);
    });

    it('SPEC-rich-text-format/AC-017 reads an empty content array as no key', () => {
        const { tree, codes } = decode(doc({ ...paragraph(), content: [] }, { ...rule(), content: [] }));
        expect(tree.content?.map(({ type }) => type)).toEqual(['paragraph', 'horizontal_rule']);
        expect(codes).toEqual([]);
    });
});

describe('attribute checks before mark checks', () => {
    const marked = (chip: ReturnType<typeof mention>) => paragraph({ ...chip, marks: [mark('bold')] });

    it('SPEC-rich-text-format/AC-003 checks attributes before marks on a mention', () => {
        const unknown = roundTrip(doc(marked(mention('m', { tone: 'warm' }))));
        expect(islandAt(unknown.tree, 0, 0)).toMatchObject({
            type: 'unsupported_inline',
            attrs: { feature: 'mention' },
        });
        expect(unknown.codes).toEqual([
            'format.unknown-attribute /content/content/0/content/0/attrs/tone',
            'format.invalid-structure /content/content/0/content/0',
        ]);
        const invalid = roundTrip(doc(marked(mention('m', { resourceType: 'User' }))));
        expect(islandAt(invalid.tree, 0, 0)).toMatchObject({
            type: 'unsupported_inline',
            attrs: { feature: 'mention' },
        });
        expect(invalid.codes).toEqual(['format.invalid-attribute /content/content/0/content/0/attrs/resourceType']);
    });
});

describe('occurrence IDs', () => {
    it.each([
        [
            'two mentions in one paragraph',
            doc(paragraph(mention('m'), mention('m'))),
            [0, 1],
            '/content/content/0/content/1',
        ],
        [
            'a heading in a blockquote',
            doc(heading('h'), blockquote(heading('h'))),
            [1, 0],
            '/content/content/1/content/0',
        ],
        [
            'a heading in a list item',
            doc(heading('h'), bulletList(listItem(paragraph(), heading('h')))),
            [1, 0, 1],
            '/content/content/1/content/0/content/1',
        ],
        [
            'a mention in a quoted paragraph',
            doc(paragraph(mention('m')), blockquote(paragraph(mention('m')))),
            [1, 0, 0],
            '/content/content/1/content/0/content/0',
        ],
    ] as const)('SPEC-rich-text-format/AC-018 islands a duplicate below the root: %s', (_, value, at, path) => {
        const { tree, codes } = roundTrip(value);
        expect(islandAt(tree, ...at).type).toMatch(/^unsupported_(block|inline)$/);
        expect(codes).toEqual([`format.duplicate-occurrence-id ${path}`]);
    });

    it('SPEC-rich-text-format/AC-018 keeps the first task item and mention editable and islands the duplicates', () => {
        const item = taskItem('t1', paragraph(text('a')));
        const chip = mention('m1');
        const content = doc(taskList(item), taskList(item, taskItem('t2', paragraph())), paragraph(chip, chip));
        const { tree, codes } = roundTrip(content);
        expect(islandAt(tree, 0).type).toBe('task_list');
        expect(islandAt(tree, 1).type).toBe('unsupported_block');
        expect(islandAt(tree, 2, 0).type).toBe('mention');
        expect(islandAt(tree, 2, 1).type).toBe('unsupported_inline');
        expect(codes).toEqual([
            'format.duplicate-occurrence-id /content/content/1/content/0',
            'format.duplicate-occurrence-id /content/content/2/content/1',
        ]);
    });

    it('SPEC-rich-text-format/AC-018 makes both lists islands when one list holds the first two occurrences', () => {
        const content = doc(
            taskList(taskItem('x', paragraph()), taskItem('x', paragraph())),
            taskList(taskItem('x', paragraph())),
        );
        const { tree, codes } = roundTrip(content);
        expect(tree.content?.map(({ type }) => type)).toEqual(['unsupported_block', 'unsupported_block']);
        expect(codes).toEqual([
            'format.duplicate-occurrence-id /content/content/0/content/1',
            'format.duplicate-occurrence-id /content/content/1/content/0',
        ]);
    });

    it('SPEC-rich-text-format/AC-018 skips the rest of an island the duplicate walk places', () => {
        const content = doc(
            taskList(taskItem('a', paragraph(text('a')))),
            taskList(taskItem('a', paragraph(text('b')), taskList(taskItem('c', paragraph(text('c')))))),
            taskList(taskItem('c', paragraph(text('d')))),
        );
        const { tree, codes } = roundTrip(content);
        expect(islandAt(tree, 0, 0)).toMatchObject({ type: 'task_item', attrs: { nodeId: 'a' } });
        expect(islandAt(tree, 1)).toMatchObject({ type: 'unsupported_block', attrs: { feature: 'task_list' } });
        expect(islandAt(tree, 2, 0)).toMatchObject({ type: 'task_item', attrs: { nodeId: 'c' } });
        expect(codes).toEqual(['format.duplicate-occurrence-id /content/content/1/content/0']);
    });
});

describe('unsafe URLs', () => {
    type UrlFixture = { readonly input: string; readonly ok: boolean };
    const unsafe = (
        JSON.parse(
            readFileSync(new URL('../../fixtures/security/urls.json', import.meta.url), 'utf8'),
        ) as readonly UrlFixture[]
    ).filter(({ ok }) => !ok);

    it.each(unsafe.map(({ input }) => [input]))(
        'SPEC-rich-text-format/AC-019 keeps a link to %j as an unsupported_mark and an embed as an island',
        (href) => {
            const embed = node('embed', { nodeId: 'e', url: href, provider: 'youtube', title: null });
            const { tree, codes } = roundTrip(doc(paragraph(text('a', link(href))), embed));
            expect(marksAt(tree, 0, 0)).toEqual([
                { type: 'unsupported_mark', attrs: { original: link(href), unknownAttributes: null } },
            ]);
            expect(islandAt(tree, 1).type).toBe('unsupported_block');
            expect(codes).toEqual([
                'format.unsafe-url /content/content/0/content/0/marks/0/attrs/href',
                'format.unsafe-url /content/content/1/attrs/url',
            ]);
            expect(marksAt(tree, 0, 0).some(({ type }) => type === 'link')).toBe(false);
        },
    );
});

describe('stored IDs and colours', () => {
    it.each([
        ['a space', 'brand style'],
        ['a quote', 'brand"style'],
        ['angle brackets', '<style>'],
        ['129 characters', `a${'b'.repeat(128)}`],
    ])('SPEC-rich-text-format/AC-044 rejects a styleId with %s', (_, value) => {
        const { tree, codes } = roundTrip(
            doc({ ...paragraph(), attrs: { lang: null, styleId: value, align: null, indent: 0 } }),
        );
        expect(islandAt(tree, 0).type).toBe('unsupported_block');
        expect(codes).toEqual(['format.invalid-attribute /content/content/0/attrs/styleId']);
    });

    it('SPEC-rich-text-format/AC-044 accepts a 128-character ID and checks tokenId, languageId and resourceType', () => {
        expect(
            decode(
                doc({ ...paragraph(), attrs: { lang: null, styleId: `a${'b'.repeat(127)}`, align: null, indent: 0 } }),
            ).codes,
        ).toEqual([]);
        expect(decode(doc(codeBlock())).codes).toEqual([]);
        expect(decode(doc(node('code_block', { languageId: 'Type Script' }))).codes).toHaveLength(1);
        expect(decode(doc(paragraph(mention('m', { resourceType: 'a b' })))).codes).toHaveLength(1);
        expect(decode(doc(paragraph(text('a', mark('font_color', { tokenId: 'a"b', value: null })))))).toMatchObject({
            codes: ['format.invalid-attribute /content/content/0/content/0/marks/0/attrs/tokenId'],
        });
    });

    const colours: readonly (readonly [string, Json | undefined, boolean])[] = [
        ['6 digits', { tokenId: null, value: '#a1b2c3' }, true],
        ['8 digits', { tokenId: null, value: '#a1b2c3d4' }, true],
        ['a token', { tokenId: 'brand.red', value: null }, true],
        ['3 digits', { tokenId: null, value: '#abc' }, false],
        ['7 digits', { tokenId: null, value: '#abcdef0' }, false],
        ['uppercase digits', { tokenId: null, value: '#ABCDEF' }, false],
        ['both null', { tokenId: null, value: null }, false],
        ['attrs omitted', undefined, false],
        ['both set', { tokenId: 'brand.red', value: '#abcdef' }, false],
    ];

    it.each(colours)('SPEC-rich-text-format/AC-045 decodes font_color and highlight with %s', (_, attrs, valid) => {
        for (const type of ['font_color', 'highlight']) {
            const colour = attrs === undefined ? { type } : { type, attrs };
            const { tree, codes } = roundTrip(doc(paragraph(text('a', colour))));
            expect(marksAt(tree, 0, 0)[0]?.type).toBe(valid ? type : 'unsupported_mark');
            expect(codes.every((code) => code.startsWith('format.invalid-attribute'))).toBe(true);
            expect(codes).toHaveLength(valid ? 0 : 1);
        }
    });
});

describe('marks on nodes that take none', () => {
    const chip = (marks: Json) => paragraph({ ...mention('m'), marks });
    type Case = readonly [string, Json, readonly number[], readonly number[]];
    const at = (name: string, value: Json, island: readonly number[], failing = island): Case => [
        name,
        value,
        island,
        failing,
    ];
    const cases: readonly Case[] = [
        at('bold on a mention', chip([mark('bold')]), [0, 0]),
        at('code on a mention', chip([mark('code')]), [0, 0]),
        at('link on a mention', chip([link('/a')]), [0, 0]),
        at('an unknown mark on a mention', chip([mark('acme_glow')]), [0, 0]),
        at('5 on a mention', chip([5]), [0, 0]),
        at('bold on a paragraph', { ...paragraph(), marks: [mark('bold')] }, [0]),
        at('bold on code block text', codeBlock(text('x', mark('bold'))), [0], [0, 0]),
        at('italic under a bold-only node', node('bold_only', undefined, text('x', mark('italic'))), [0, 0]),
        at(
            'an unknown mark under a bold-only node',
            node('bold_only', undefined, text('x', mark('acme_glow'))),
            [0, 0],
        ),
        at(
            'two bold marks under a bold-only node',
            node('bold_only', undefined, text('x', mark('bold'), mark('bold'))),
            [0, 0],
        ),
        at(
            'bold with attrs 5 under a bold-only node',
            node('bold_only', undefined, text('x', { type: 'bold', attrs: 5 })),
            [0, 0],
        ),
        at(
            'a javascript: link under a link-only node',
            node('link_only', undefined, text('x', link('javascript:alert(1)'))),
            [0, 0],
        ),
    ];

    it.each(cases)('SPEC-rich-text-format/AC-050 islands %s', (_, value, island, failing) => {
        const { tree, codes } = roundTrip(doc(value));
        expect(islandAt(tree, ...island).type).toMatch(/^unsupported_(block|inline)$/);
        expect(codes).toContain(`format.invalid-structure /content/content/${failing.join('/content/')}`);
    });

    it('SPEC-rich-text-format/AC-050 accepts bold on a hard break and an empty marks array on a paragraph', () => {
        const { tree, codes } = decode(
            doc(paragraph({ type: 'hard_break', marks: [mark('bold')] }), { ...paragraph(), marks: [] }),
        );
        expect(marksAt(tree, 0, 0)).toEqual([{ type: 'bold', attrs: { unknownAttributes: null } }]);
        expect(islandAt(tree, 1).type).toBe('paragraph');
        expect(codes).toEqual([]);
    });
});

describe('table grids', () => {
    const p = paragraph();

    it('SPEC-rich-text-format/AC-051 SPEC-rich-text-format/AC-006 rejects a wide sparse table within every limit in under 1 s', () => {
        const wide = row(...Array.from({ length: 1250 }, () => cell({ colspan: 50 }, p)));
        const narrow = Array.from({ length: 1249 }, () => row(cell({}, p)));
        const input = envelope(doc(table('t', wide, ...narrow)));
        const started = performance.now();
        const { result, tree } = decodeToTree(input, model);
        const elapsed = performance.now() - started;
        expect(result.diagnostics.map(({ code }) => code)).toEqual(['format.invalid-structure']);
        expect(tree === undefined ? undefined : islandAt(tree, 0).type).toBe('unsupported_block');
        // Parallel test files under coverage slow this; the unbounded grid took about 4 s.
        expect(elapsed).toBeLessThan(1000);
    });
    const cases: readonly (readonly [string, Json])[] = [
        ['rows of different widths', table('t', row(cell({}, p), cell({}, p)), row(cell({}, p)))],
        ['overlapping spans', table('t', row(cell({ rowspan: 2 }, p), cell({}, p)), row(cell({ colspan: 2 }, p)))],
        ['a rowspan past the last row', table('t', row(cell({ rowspan: 2 }, p)))],
        ['a colwidth longer than its colspan', table('t', row(cell({ colwidth: [100, 100] }, p)))],
        [
            'one column with two colwidths',
            table('t', row(cell({ colwidth: [100] }, p)), row(cell({ colwidth: [120] }, p))),
        ],
        ['one column with a colwidth and none', table('t', row(cell({ colwidth: [100] }, p)), row(cell({}, p)))],
    ];

    it.each(cases)('SPEC-rich-text-format/AC-051 islands a table with %s', (_, value) => {
        const { tree, codes } = roundTrip(doc(value));
        expect(islandAt(tree, 0)).toMatchObject({ type: 'unsupported_block', attrs: { feature: 'table' } });
        expect(codes).toEqual(['format.invalid-structure /content/content/0']);
    });

    it('SPEC-rich-text-format/AC-051 accepts spans that form a grid', () => {
        const value = table(
            't',
            row(cell({ rowspan: 2, colwidth: [80] }, p), cell({ colspan: 2, colwidth: [40, 50] }, p)),
            row(cell({ colwidth: [40] }, p), cell({ colwidth: [50] }, p)),
        );
        expect(roundTrip(doc(value)).codes).toEqual([]);
    });
});

describe('islands next to text', () => {
    const italic = mark('italic');
    it.each([
        ['a text island with attrs', paragraph(text('a'), { type: 'text', text: 'b', attrs: {} })],
        ['a text island with an extra key', paragraph(text('a'), { type: 'text', text: 'b', style: 1 })],
        ['an empty text island', paragraph(text('a'), { type: 'text', text: '' })],
        [
            'two text islands with different extra keys',
            paragraph({ type: 'text', text: 'a', x: 1 }, { type: 'text', text: 'b', x: 2 }),
        ],
        ['two texts where blocks belong', blockquote(text('a'), text('b'))],
        ['two italic texts under a bold-only node', node('bold_only', undefined, text('a', italic), text('b', italic))],
    ])('SPEC-rich-text-format/AC-013 never joins %s with its neighbours', (_, value) => {
        const { tree } = roundTrip(doc(value));
        expect(islandAt(tree, 0).content?.some((child) => child.type.startsWith('unsupported_'))).toBe(true);
    });

    it('SPEC-rich-text-format/AC-022 measures maxTextLength over joined real text only', () => {
        const half = 'x'.repeat(600_000);
        const islands = doc(
            paragraph({ type: 'text', text: half, attrs: {} }, { type: 'text', text: half, attrs: {} }),
        );
        expect(roundTrip(islands).codes).toHaveLength(2);
    });
});

describe('malformed values', () => {
    const untyped: readonly Json[] = [5, null, {}, { type: 7 }];

    it.each(untyped)(
        'SPEC-rich-text-format/AC-053 islands %j as a block child, an inline child and a mark',
        (value) => {
            const block = roundTrip(doc(value));
            expect(islandAt(block.tree, 0).attrs).toEqual({ original: value, feature: null, unknownAttributes: null });
            const inline = roundTrip(doc(paragraph(text('a'), value)));
            expect(islandAt(inline.tree, 0, 1)).toMatchObject({ type: 'unsupported_inline', attrs: { feature: null } });
            const marked = roundTrip(doc(paragraph(text('a', value))));
            expect(marksAt(marked.tree, 0, 0)[0]?.attrs.original).toEqual(value);
            for (const { codes } of [block, inline, marked]) {
                expect(codes).toEqual([expect.stringMatching(/^format\.invalid-structure /)]);
            }
        },
    );

    const cases: readonly (readonly [string, Json, readonly number[], string])[] = [
        ['an extra key on a node', { ...paragraph(), style: 'color: red' }, [0], 'unsupported_block'],
        ['an extra key on a mark', paragraph(text('a', { type: 'bold', class: 'x' })), [0, 0], 'text'],
        ['attrs 5 on a paragraph', { type: 'paragraph', attrs: 5 }, [0], 'unsupported_block'],
        ['attrs [] on a link', paragraph(text('a', { type: 'link', attrs: [] })), [0, 0], 'text'],
        ['marks {} on a text node', paragraph({ type: 'text', text: 'a', marks: {} }), [0, 0], 'unsupported_inline'],
        ['a text node with attrs', paragraph({ type: 'text', text: 'a', attrs: {} }), [0, 0], 'unsupported_inline'],
        ['a text node with content', paragraph({ type: 'text', text: 'a', content: [] }), [0, 0], 'unsupported_inline'],
        ["a text node with text ''", paragraph({ type: 'text', text: '' }), [0, 0], 'unsupported_inline'],
        ['a text node with no text', paragraph({ type: 'text' }), [0, 0], 'unsupported_inline'],
    ];

    it.each(cases)('SPEC-rich-text-format/AC-053 keeps %s', (_, value, at, type) => {
        const { tree, codes } = roundTrip(doc(value));
        const kept = islandAt(tree, ...at);
        expect(kept.type).toBe(type);
        if (type === 'text') {
            expect(marksAt(tree, ...at)[0]?.type).toBe('unsupported_mark');
        }
        expect(codes).toEqual([expect.stringMatching(/^format\.invalid-structure /)]);
    });

    it('SPEC-rich-text-format/AC-053 decodes a doc with content [5] as one unsupported_block', () => {
        const { tree, codes } = roundTrip(doc(5));
        expect(tree.content).toEqual([
            { type: 'unsupported_block', attrs: { original: 5, feature: null, unknownAttributes: null } },
        ]);
        expect(codes).toEqual(['format.invalid-structure /content/content/0']);
    });
});

describe('mark sets', () => {
    const marksOf = (tree: TreeNode, ...at: readonly number[]) => marksAt(tree, ...at).map(({ type }) => type);

    it.each([
        ['two link marks', [link('/a'), link('/b')], ['link', 'unsupported_mark']],
        ['subscript with superscript', [mark('subscript'), mark('superscript')], ['subscript', 'unsupported_mark']],
        [
            'two font_color marks',
            [mark('font_color', { tokenId: 'a', value: null }), mark('font_color', { tokenId: 'b', value: null })],
            ['font_color', 'unsupported_mark'],
        ],
    ] as const)('SPEC-rich-text-format/AC-054 keeps the later of %s as an unsupported_mark', (_, marks, types) => {
        const { tree, codes } = decode(doc(paragraph(text('a', ...marks))));
        expect(marksOf(tree, 0, 0)).toEqual(types);
        expect(codes).toEqual(['format.invalid-structure /content/content/0/content/0/marks/1']);
        expect(decode(doc(paragraph(text('a', ...marks)))).encoded).toBe(
            canonicalJson(doc(paragraph(text('a', ...marks)))),
        );
    });

    it('SPEC-rich-text-format/AC-054 keeps the later of two bold marks on a hard break', () => {
        const { tree, codes } = roundTrip(doc(paragraph({ type: 'hard_break', marks: [mark('bold'), mark('bold')] })));
        expect(marksOf(tree, 0, 0)).toEqual(['bold', 'unsupported_mark']);
        expect(codes).toEqual(['format.invalid-structure /content/content/0/content/0/marks/1']);
    });

    it('SPEC-rich-text-format/AC-054 islands a text with three equal bold marks', () => {
        const { tree, codes } = roundTrip(doc(paragraph(text('a', mark('bold'), mark('bold'), mark('bold')))));
        expect(islandAt(tree, 0, 0).type).toBe('unsupported_inline');
        const at = '/content/content/0/content/0/marks';
        expect(codes).toEqual([
            `format.invalid-structure ${at}/1`,
            `format.invalid-structure ${at}/2`,
            `format.invalid-structure ${at}/2`,
        ]);
    });

    it('SPEC-rich-text-format/AC-054 islands a text with two equal unknown marks', () => {
        const { tree, codes } = roundTrip(
            doc(paragraph(text('a', { type: 'acme', attrs: { a: 1, b: 2 } }, { type: 'acme', attrs: { b: 2, a: 1 } }))),
        );
        expect(islandAt(tree, 0, 0).type).toBe('unsupported_inline');
        const at = '/content/content/0/content/0/marks';
        expect(codes).toEqual([
            `format.unknown-mark ${at}/0`,
            `format.unknown-mark ${at}/1`,
            `format.invalid-structure ${at}/1`,
        ]);
    });
});
