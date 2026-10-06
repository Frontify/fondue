/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';

import fc from 'fast-check';
import { Node, Schema } from 'prosemirror-model';
import { TableMap, tableNodes } from 'prosemirror-tables';
import { describe, expect, it } from 'vitest';

import { envelope, type Json } from '#/features/__fixtures__/documents';
import { vocabularyModel } from '#/features/__fixtures__/vocabulary';
import { decodeDocument, type RichTextDocument } from '#/model';

import { type TreeNode } from './content';
import { decodeToTree } from './decode';
import { encodeTree } from './encode';
import { canonicalJson } from './hash';

const model = vocabularyModel();
const seed = Number(process.env.FC_SEED ?? Math.floor(Math.random() * 2 ** 31));
const settings = { seed, numRuns: 200 };
/** Each suite title prints the seed, so a run replays with `FC_SEED`. */
const seeded = (title: string) => `${title} (fast-check seed ${seed})`;

type Node_ = Record<string, Json>;
const paragraphAttrs = { lang: null, styleId: null, align: null, indent: 0 };
/** The vocabulary's marks in rank order, then declared order, with their features. */
const MARKS: readonly (readonly [string, Json | undefined, string])[] = [
    ['link', { href: 'https://frontify.com/a', openInNewWindow: false, styleId: null }, 'fixture.link'],
    ['font_color', { tokenId: 'brand.red', value: null }, 'fixture.colors'],
    ['highlight', { tokenId: null, value: '#ffcc00' }, 'fixture.colors'],
    ['bold', undefined, 'fixture.marks'],
    ['italic', undefined, 'fixture.marks'],
    ['underline', undefined, 'fixture.marks'],
    ['strike', undefined, 'fixture.marks'],
    ['code', undefined, 'fixture.marks'],
    ['subscript', undefined, 'fixture.marks'],
    ['superscript', undefined, 'fixture.marks'],
    ['language', { lang: 'de', dir: null }, 'fixture.marks'],
];
const FEATURES: Readonly<Record<string, string>> = {
    heading: 'fixture.blocks',
    blockquote: 'fixture.blocks',
    code_block: 'fixture.blocks',
    horizontal_rule: 'fixture.blocks',
    bullet_list: 'fixture.lists',
    list_item: 'fixture.lists',
    task_list: 'fixture.lists',
    task_item: 'fixture.lists',
    table: 'fixture.tables',
    table_row: 'fixture.tables',
    table_cell: 'fixture.tables',
    mention: 'fixture.mention',
};

const marksArb = fc.subarray([...MARKS.keys()]).map((indices) => {
    const chosen = indices.filter((index, position) => !(index === 9 && indices[position - 1] === 8));
    return chosen.map((index) => {
        const [type, attrs] = MARKS[index] ?? ['bold'];
        return attrs === undefined ? { type } : { type, attrs };
    });
});
const withMarks = (node: Node_, marks: readonly Json[]): Node_ =>
    marks.length === 0 ? node : { ...node, marks: [...marks] };
const textArb = fc
    .tuple(fc.string({ minLength: 1, maxLength: 6, unit: 'grapheme' }), marksArb)
    .map(([value, marks]) => withMarks({ type: 'text', text: value }, marks));
const inlineArb = fc.oneof(
    { weight: 4, arbitrary: textArb },
    { weight: 1, arbitrary: marksArb.map((marks) => withMarks({ type: 'hard_break' }, marks)) },
    {
        weight: 1,
        arbitrary: fc.constant({
            type: 'mention',
            attrs: { nodeId: '', resourceType: 'user', resourceId: '7', labelSnapshot: 'Ada' },
        }),
    },
);
const withContent = (node: Node_, content: readonly Json[]): Node_ =>
    content.length === 0 ? node : { ...node, content: [...content] };
const paragraphArb = fc
    .array(inlineArb, { maxLength: 4 })
    .map((content) => withContent({ type: 'paragraph', attrs: paragraphAttrs }, content));

const { block: blockArb } = fc.letrec<{ block: Node_ }>((tie) => ({
    block: fc.oneof(
        { depthSize: 'small', withCrossShrink: true },
        paragraphArb,
        fc
            .tuple(fc.integer({ min: 1, max: 6 }), fc.array(inlineArb, { maxLength: 3 }))
            .map(([level, content]) =>
                withContent(
                    { type: 'heading', attrs: { nodeId: '', level, ...paragraphAttrs, align: 'center' } },
                    content,
                ),
            ),
        fc
            .array(tie('block'), { minLength: 1, maxLength: 2 })
            .map((content) => ({ type: 'blockquote', attrs: { styleId: null }, content })),
        fc
            .array(fc.tuple(paragraphArb, fc.array(tie('block'), { maxLength: 1 })), { minLength: 1, maxLength: 2 })
            .map((items) => ({
                type: 'bullet_list',
                attrs: { marker: null },
                content: items.map(([first, rest]) => ({ type: 'list_item', content: [first, ...rest] })),
            })),
        fc.array(paragraphArb, { minLength: 1, maxLength: 2 }).map((items) => ({
            type: 'task_list',
            content: items.map((first) => ({
                type: 'task_item',
                attrs: { nodeId: '', checked: false },
                content: [first],
            })),
        })),
        fc.string({ minLength: 1, maxLength: 8 }).map((code) => ({
            type: 'code_block',
            attrs: { languageId: null },
            content: [{ type: 'text', text: code }],
        })),
        fc.constant({ type: 'horizontal_rule' }),
        fc.tuple(fc.integer({ min: 1, max: 3 }), fc.integer({ min: 1, max: 3 })).map(([rows, columns]) => ({
            type: 'table',
            attrs: { nodeId: '' },
            content: Array.from({ length: rows }, () => ({
                type: 'table_row',
                content: Array.from({ length: columns }, () => ({
                    type: 'table_cell',
                    attrs: { colspan: 1, rowspan: 1, colwidth: null },
                    content: [{ type: 'paragraph', attrs: paragraphAttrs }],
                })),
            })),
        })),
    ),
}));

const marksOf = (node: Node_) => canonicalJson(node.marks ?? null);
const sameMarks = (a: Node_, b: Node_) => marksOf(a) === marksOf(b);

/** Unique `nodeId`s in document order, and adjacent texts with equal marks joined, so the document is canonical. */
const canonicalize = (root: Json): Json => {
    let next = 0;
    const visit = (value: Json): Json => {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            return value;
        }
        const node = { ...(value as Node_) };
        if (typeof node.attrs === 'object' && node.attrs !== null && 'nodeId' in node.attrs) {
            next += 1;
            node.attrs = { ...node.attrs, nodeId: `n${next}` };
        }
        if (Array.isArray(node.content)) {
            const joined: Node_[] = [];
            for (const child of node.content.map(visit) as Node_[]) {
                const previous = joined.at(-1);
                if (
                    previous !== undefined &&
                    previous.type === 'text' &&
                    child.type === 'text' &&
                    sameMarks(previous, child)
                ) {
                    joined[joined.length - 1] = {
                        ...previous,
                        text: `${previous.text as string}${child.text as string}`,
                    };
                } else {
                    joined.push(child);
                }
            }
            node.content = joined;
        }
        return node;
    };
    return visit(root);
};
const documentArb = fc
    .array(blockArb, { minLength: 1, maxLength: 4 })
    .map((content) => canonicalize({ type: 'doc', attrs: { lang: null, dir: 'auto' }, content }));

/** Omits default attributes, reverses marks and splits texts: the normalizations decode accepts and encoding undoes. */
const denormalize = (value: Json): Json => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return value;
    }
    const node = { ...(value as Node_) };
    if (node.type === 'paragraph') {
        delete node.attrs;
    }
    if (Array.isArray(node.marks)) {
        node.marks = [...(node.marks as readonly Json[])].reverse();
    }
    if (Array.isArray(node.content)) {
        node.content = (node.content as readonly Json[]).flatMap((child) => {
            const copy = denormalize(child) as Node_;
            const chars = typeof copy.text === 'string' ? [...copy.text] : [];
            return copy.type === 'text' && chars.length > 1
                ? [
                      { ...copy, text: chars[0] ?? '' },
                      { ...copy, text: chars.slice(1).join('') },
                  ]
                : [copy];
        });
    } else if (node.type === 'paragraph') {
        node.content = [];
    }
    return node;
};

const encodedOf = (input: unknown) => {
    const { result, tree } = decodeToTree(input, model);
    const stored = (input as RichTextDocument).requiredCapabilities;
    return { result, document: tree === undefined ? undefined : encodeTree(tree, model, stored).document };
};

const fixtures = readdirSync(new URL('../../fixtures/model/valid', import.meta.url)).map(
    (name) => JSON.parse(readFileSync(new URL(`../../fixtures/model/valid/${name}`, import.meta.url), 'utf8')) as Json,
);

describe(seeded('round trips'), () => {
    it('SPEC-rich-text-format/AC-022 encodes each valid fixture back to itself', () => {
        expect(fixtures.length).toBeGreaterThan(0);
        for (const fixture of fixtures) {
            const { result, document } = encodedOf(fixture);
            expect(result.diagnostics).toEqual([]);
            expect(canonicalJson(document as unknown as Json)).toBe(canonicalJson(fixture));
        }
    });

    it('SPEC-rich-text-format/AC-022 encodes generated valid documents back in canonical form', () => {
        fc.assert(
            fc.property(documentArb, (content) => {
                for (const input of [envelope(content), envelope(denormalize(content))]) {
                    const { result, document } = encodedOf(input);
                    expect(result).toMatchObject({ status: 'editable', diagnostics: [] });
                    expect(canonicalJson(document?.content as unknown as Json)).toBe(canonicalJson(content));
                }
            }),
            settings,
        );
    });

    it('SPEC-rich-text-format/AC-033 writes core and each capability the content uses, sorted, at the installed version', () => {
        const usedBy = (value: Json, used: Set<string>) => {
            if (typeof value !== 'object' || value === null) {
                return used;
            }
            for (const item of Array.isArray(value) ? value : [value]) {
                const node = item as Node_;
                const feature = typeof node.type === 'string' ? FEATURES[node.type] : undefined;
                if (feature !== undefined) {
                    used.add(feature);
                }
                if (node.type === 'heading') {
                    used.add('fixture.align');
                }
                for (const markJson of (Array.isArray(node.marks) ? node.marks : []) as Node_[]) {
                    const entry = MARKS.find(([type]) => type === markJson.type);
                    used.add(entry === undefined ? '' : entry[2]);
                }
                if (Array.isArray(node.content)) {
                    usedBy(node.content, used);
                }
            }
            return used;
        };
        fc.assert(
            fc.property(documentArb, (content) => {
                const { document } = encodedOf(envelope(content, ['core', 'fixture.lists']));
                const expected = [...usedBy(content, new Set(['core']))].sort().map((id) => ({ id, version: 1 }));
                expect(document?.requiredCapabilities).toEqual(expected);
            }),
            settings,
        );
    });

    it.each([
        [
            'an invalid bullet_list',
            {
                type: 'bullet_list',
                attrs: { marker: 'star' },
                content: [{ type: 'list_item', content: [{ type: 'paragraph' }] }],
            },
            'fixture.lists',
        ],
        ['an unknown paragraph attribute', { type: 'paragraph', attrs: { tone: 'warm' } }, 'fixture.styles'],
        [
            'a javascript: link',
            {
                type: 'paragraph',
                content: [
                    { type: 'text', text: 'a', marks: [{ type: 'link', attrs: { href: 'javascript:alert(1)' } }] },
                ],
            },
            'fixture.link',
        ],
    ] as const)('SPEC-rich-text-format/AC-033 keeps every stored capability while %s survives', (_, block, id) => {
        const content = { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [block] };
        const input = {
            ...(envelope(content) as Node_),
            requiredCapabilities: [
                { id: 'core', version: 1 },
                { id, version: 1 },
                { id: 'fixture.marks', version: 0 },
            ],
        };
        const expected = [
            { id: 'core', version: 1 },
            { id, version: 1 },
            { id: 'fixture.marks', version: 1 },
        ];
        expect(encodedOf(input).document?.requiredCapabilities).toEqual(
            expected.sort((a, b) => a.id.localeCompare(b.id)),
        );
    });

    it('SPEC-rich-text-format/AC-033 drops an unused stored capability when no island survives', () => {
        const content = {
            type: 'doc',
            attrs: { lang: null, dir: 'auto' },
            content: [{ type: 'paragraph', attrs: paragraphAttrs }],
        };
        const input = {
            ...(envelope(content) as Node_),
            requiredCapabilities: [
                { id: 'core', version: 1 },
                { id: 'fixture.lists', version: 1 },
            ],
        };
        expect(encodedOf(input).document?.requiredCapabilities).toEqual([{ id: 'core', version: 1 }]);
    });

    it('SPEC-rich-text-format/AC-033 keeps a stored capability whose content survives as an island', () => {
        const content = { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [{ type: 'acme_callout' }] };
        const input = {
            ...(envelope(content) as Node_),
            requiredCapabilities: [
                { id: 'acme.callout', version: 3 },
                { id: 'core', version: 1 },
                { id: 'fixture.marks', version: 2 },
            ],
        };
        expect(encodedOf(input).document?.requiredCapabilities).toEqual([
            { id: 'acme.callout', version: 3 },
            { id: 'core', version: 1 },
            { id: 'fixture.marks', version: 2 },
        ]);
    });
});

const tableSchema = new Schema({
    nodes: {
        doc: { content: 'block+' },
        paragraph: { group: 'block', content: 'inline*' },
        text: { group: 'inline' },
        ...tableNodes({ tableGroup: 'block', cellContent: 'block+', cellAttributes: {} }),
    },
});
const cellArb = fc.record({
    colspan: fc.integer({ min: 1, max: 3 }),
    rowspan: fc.oneof(
        { weight: 3, arbitrary: fc.constant(1) },
        { weight: 1, arbitrary: fc.integer({ min: 1, max: 3 }) },
    ),
    widths: fc.option(fc.integer({ min: 50, max: 52 }), { nil: undefined }),
});
const tableArb = fc
    .array(fc.array(cellArb, { minLength: 1, maxLength: 3 }), { minLength: 1, maxLength: 3 })
    .map((rows) => ({
        type: 'table',
        attrs: { nodeId: 't' },
        content: rows.map((cells) => ({
            type: 'table_row',
            content: cells.map(({ colspan, rowspan, widths }) => ({
                type: rowspan === 3 ? 'table_header' : 'table_cell',
                attrs: {
                    colspan,
                    rowspan,
                    colwidth: widths === undefined ? null : Array.from({ length: colspan }, () => widths),
                    ...(rowspan === 3 ? { scope: null } : {}),
                },
                content: [{ type: 'paragraph', attrs: paragraphAttrs }],
            })),
        })),
    }));
const engineTable = (node: TreeNode): unknown => {
    const attrs = node.attrs ?? {};
    return {
        type: node.type,
        attrs:
            node.type === 'paragraph'
                ? {}
                : { colspan: attrs.colspan, rowspan: attrs.rowspan, colwidth: attrs.colwidth },
        content: (node.content ?? []).map(engineTable),
    };
};

describe(seeded('table grids'), () => {
    it('SPEC-rich-text-format/AC-051 gives every table in an editable result a TableMap with no problems', () => {
        let accepted = 0;
        fc.assert(
            fc.property(tableArb, (table) => {
                const { result, tree } = decodeToTree(
                    envelope({ type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [table] }),
                    model,
                );
                expect(result.status).toBe('editable');
                const decoded = tree === undefined ? undefined : tree.content?.[0];
                if (decoded !== undefined && decoded.type === 'table') {
                    accepted += 1;
                    const engine = Node.fromJSON(tableSchema, { ...(engineTable(decoded) as object), attrs: {} });
                    expect(TableMap.get(engine).problems).toBeNull();
                }
            }),
            { ...settings, numRuns: 500 },
        );
        expect(accepted).toBeGreaterThan(0);
    });
});

describe(seeded('decode never throws'), () => {
    const mutate = (value: Json, index: number, replacement: Json): Json => {
        let position = 0;
        const visit = (current: Json): Json => {
            position += 1;
            if (position - 1 === index) {
                return replacement;
            }
            if (Array.isArray(current)) {
                return current.map(visit);
            }
            if (typeof current === 'object' && current !== null) {
                return Object.fromEntries(Object.entries(current).map(([key, item]) => [key, visit(item)]));
            }
            return current;
        };
        return visit(value);
    };
    const decodes = (input: unknown) => {
        const result = decodeDocument(input, model);
        expect(['editable', 'blocked']).toContain(result.status);
    };

    it('SPEC-rich-text-quality/AC-005 returns a result for arbitrary JSON, as text, as a value and as content', () => {
        fc.assert(
            fc.property(fc.jsonValue() as fc.Arbitrary<Json>, (value) => {
                decodes(value);
                decodes(JSON.stringify(value));
                decodes(envelope(value));
                decodes(envelope({ type: 'doc', content: [value] }));
            }),
            { ...settings, numRuns: 500 },
        );
    });

    it('SPEC-rich-text-quality/AC-005 returns a result for mutated valid fixtures and generated documents', () => {
        const sources = fc.oneof(
            fc.constantFrom(...fixtures),
            documentArb.map((content) => envelope(content)),
        );
        fc.assert(
            fc.property(
                sources,
                fc.nat(400),
                fc.jsonValue({ maxDepth: 3 }) as fc.Arbitrary<Json>,
                (source, index, replacement) => {
                    const mutated = mutate(source, index, replacement);
                    decodes(mutated);
                    decodes(JSON.stringify(mutated));
                },
            ),
            { ...settings, numRuns: 500 },
        );
    });
});
