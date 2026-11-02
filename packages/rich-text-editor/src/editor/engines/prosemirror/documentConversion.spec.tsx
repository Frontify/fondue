/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState } from 'prosemirror-state';
import { describe, expect, it, vi } from 'vitest';

import {
    ANY_LIST,
    buildPluginRegistry,
    defineBlock,
    defineInline,
    defineMark,
    emptyDocument,
    PARAGRAPH,
    type RteDocumentOf,
    type RtePlugin,
} from '#/core';

import {
    EXTRA_ATTR,
    mapChildren,
    plainTextOf,
    toEngineDocument,
    toRteDocument,
    UNKNOWN_BLOCK,
} from './documentConversion';
import { buildSchema } from './schema';

/**
 * Enough of a plugin set to exercise every shape the boundary has to carry: a
 * mark that holds nothing, a mark that holds a value, a block with an attribute
 * of its own, an attribute injected into every text block, a void inline, and a
 * list that nests.
 */
const plugins: RtePlugin[] = [
    {
        id: 'bold',
        marks: {
            bold: defineMark({
                toHtml: () => ({ tag: 'strong', children: true }),
                parse: [{ tag: 'strong' }],
            }),
        },
    },
    {
        id: 'link',
        marks: {
            link: defineMark<{ href: string }>({
                toHtml: ({ href }) => ({ tag: 'a', attrs: { href }, children: true }),
                parse: [{ tag: 'a', value: (element) => ({ href: element.getAttribute('href') ?? '' }) }],
            }),
        },
    },
    {
        id: 'heading',
        blocks: {
            heading: defineBlock({
                content: 'text',
                defaults: { level: 1 },
                toHtml: () => ({ tag: 'h1', children: true }),
                parse: [{ tag: 'h1' }],
            }),
        },
    },
    {
        id: 'mention',
        inlines: {
            mention: defineInline<{ id: string }>({
                toHtml: ({ id }) => ({ tag: 'span', children: id }),
                parse: [{ tag: 'span', value: (element) => ({ id: element.textContent ?? '' }) }],
            }),
        },
    },
    {
        id: 'list',
        blocks: {
            bulletList: defineBlock({
                content: { items: 'listItem' },
                toHtml: () => ({ tag: 'ul', children: true }),
                parse: [{ tag: 'ul' }],
            }),
            listItem: defineBlock({
                content: { blocks: [PARAGRAPH, ANY_LIST] },
                toHtml: () => ({ tag: 'li', children: true }),
                parse: [{ tag: 'li' }],
            }),
        },
    },
    {
        id: 'divider',
        blocks: { divider: defineBlock({ toHtml: () => ({ tag: 'hr' }), parse: [{ tag: 'hr' }] }) },
    },
    {
        id: 'align',
        blockAttributes: { align: { style: (value) => ({ 'text-align': value }) } },
    },
];

const schema = buildSchema(buildPluginRegistry(plugins));

const document: RteDocumentOf = {
    version: 1,
    blocks: [
        {
            type: 'paragraph',
            align: 'center',
            children: [
                { text: 'plain ' },
                { text: 'bold', bold: true },
                { text: 'linked', link: { href: 'https://example.com' } },
                { type: 'mention', id: 'jane' },
            ],
        },
        { type: 'heading', level: 2, children: [{ text: 'Title' }] },
        {
            type: 'bulletList',
            children: [
                {
                    type: 'listItem',
                    children: [
                        { type: 'paragraph', children: [{ text: 'one' }] },
                        {
                            type: 'bulletList',
                            children: [
                                { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'nested' }] }] },
                            ],
                        },
                    ],
                },
            ],
        },
    ] as RteDocumentOf['blocks'],
};

describe('the document boundary', () => {
    it('round-trips every shape a document can hold', () => {
        expect(toRteDocument(toEngineDocument(document, schema))).toEqual(document);
    });

    describe('content no mounted plugin defines', () => {
        const withUnknown = {
            version: 1,
            blocks: [
                {
                    type: PARAGRAPH,
                    children: [
                        { text: 'glowing', highlight: { color: 'gold' }, bold: true },
                        { type: 'emoji', name: 'wave', text: undefined },
                        { text: ' after' },
                    ],
                },
                { type: 'callout', tone: 'info', children: [{ type: PARAGRAPH, children: [{ text: 'inside' }] }] },
                {
                    type: 'bulletList',
                    children: [{ type: 'listItem', children: [{ type: 'table', rows: [] }] }],
                },
            ],
        } as unknown as RteDocumentOf;

        it('is kept as it was, warning once per type', () => {
            const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
            try {
                const engineDoc = toEngineDocument(withUnknown, schema);

                expect(JSON.parse(JSON.stringify(toRteDocument(engineDoc)))).toEqual(
                    JSON.parse(JSON.stringify(withUnknown)),
                );
                expect(warn).toHaveBeenCalledWith(expect.stringContaining('Unknown mark type "highlight"'));
                expect(warn).toHaveBeenCalledWith(expect.stringContaining('Unknown inline type "emoji"'));
                expect(warn).toHaveBeenCalledWith(expect.stringContaining('Unknown block type "callout"'));
            } finally {
                warn.mockRestore();
            }
        });

        it('survives an edit elsewhere in the document', () => {
            const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
            try {
                const state = EditorState.create({ doc: toEngineDocument(withUnknown, schema) });
                // Typed at the very end of the first paragraph, after " after".
                const end = (state.doc.firstChild?.nodeSize ?? 2) - 1;
                const edited = toRteDocument(state.apply(state.tr.insertText('!', end)).doc);

                expect(edited.blocks[0]?.children).toEqual([
                    { text: 'glowing', bold: true, highlight: { color: 'gold' } },
                    { type: 'emoji', name: 'wave', text: undefined },
                    { text: ' after!' },
                ]);
                expect(edited.blocks.slice(1)).toEqual(withUnknown.blocks.slice(1));
            } finally {
                warn.mockRestore();
            }
        });

        describe("with a block no plugin knows standing among a list's items", () => {
            const item = (...children: unknown[]) => ({ type: 'listItem', children });
            const words = (value: string) => ({ type: PARAGRAPH, children: [{ text: value }] });
            const sidebar = { type: 'sidebar', children: [words('in')] };

            it('keeps the list whole as one unknown block, warning once', () => {
                const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
                try {
                    const amongItems = {
                        version: 1,
                        blocks: [
                            {
                                type: 'bulletList',
                                children: [item(words('one')), sidebar, item(words('two')), sidebar],
                            },
                            words('after'),
                        ],
                    } as unknown as RteDocumentOf;
                    const engineDoc = toEngineDocument(amongItems, schema);

                    expect(mapChildren(engineDoc, (node) => node.type.name)).toEqual([UNKNOWN_BLOCK, PARAGRAPH]);
                    expect(toRteDocument(engineDoc)).toEqual(amongItems);
                    expect(warn.mock.calls.filter(([message]) => String(message).includes('"sidebar"'))).toHaveLength(
                        1,
                    );
                } finally {
                    warn.mockRestore();
                }
            });

            it('keeps only the innermost list that holds it whole, the lists around it editable', () => {
                const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
                try {
                    const nested = { type: 'bulletList', children: [item(words('inner')), sidebar] };
                    const outer = {
                        version: 1,
                        blocks: [{ type: 'bulletList', children: [item(words('outer'), nested)] }],
                    } as unknown as RteDocumentOf;
                    const engineDoc = toEngineDocument(outer, schema);
                    const outerItem = engineDoc.firstChild?.firstChild;

                    expect(engineDoc.firstChild?.type.name).toBe('bulletList');
                    expect(outerItem && mapChildren(outerItem, (node) => node.type.name)).toEqual([
                        PARAGRAPH,
                        UNKNOWN_BLOCK,
                    ]);
                    expect(toRteDocument(engineDoc)).toEqual(outer);
                } finally {
                    warn.mockRestore();
                }
            });

            it('still refuses a known block that does not fit beside it', () => {
                const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
                try {
                    const misfit = {
                        version: 1,
                        blocks: [{ type: 'bulletList', children: [item(words('one')), sidebar, words('loose')] }],
                    } as unknown as RteDocumentOf;

                    expect(() => toEngineDocument(misfit, schema)).toThrow(
                        'Invalid document: a "bulletList" cannot hold',
                    );
                } finally {
                    warn.mockRestore();
                }
            });

            it('shows each block of the list it keeps on a line of its own, the text of one block run together', () => {
                const list = {
                    type: 'bulletList',
                    children: [
                        item(words('one')),
                        sidebar,
                        item({ type: PARAGRAPH, children: [{ text: 't' }, { text: 'wo' }] }),
                    ],
                };

                expect(plainTextOf(list)).toBe('one\nin\ntwo');
            });
        });
    });

    it('drops the empty text run an empty document is written with', () => {
        expect(toRteDocument(toEngineDocument(emptyDocument(), schema))).toEqual({
            version: 1,
            blocks: [{ type: PARAGRAPH, children: [] }],
        });
    });

    it('reuses the conversion of blocks an edit did not touch', () => {
        const state = EditorState.create({ doc: toEngineDocument(document, schema) });
        const before = toRteDocument(state.doc);

        const after = toRteDocument(state.apply(state.tr.insertText('!', 1)).doc);

        expect(after.blocks[0]).not.toBe(before.blocks[0]);
        expect(after.blocks[1]).toBe(before.blocks[1]);
        expect(after.blocks[2]).toBe(before.blocks[2]);
    });

    it('is still correct where it did rebuild', () => {
        const state = EditorState.create({ doc: toEngineDocument(document, schema) });

        const after = toRteDocument(state.apply(state.tr.insertText('!', 1)).doc);

        expect(after.blocks[0]).toEqual({
            type: PARAGRAPH,
            align: 'center',
            children: [
                { text: '!plain ' },
                { text: 'bold', bold: true },
                { text: 'linked', link: { href: 'https://example.com' } },
                { type: 'mention', id: 'jane' },
            ],
        });
    });

    it('refuses blocks that do not fit together, rather than storing them', () => {
        const listHoldingParagraph = {
            version: 1,
            blocks: [{ type: 'bulletList', children: [{ type: PARAGRAPH, children: [{ text: 'x' }] }] }],
        } as RteDocumentOf;

        expect(() => toEngineDocument(listHoldingParagraph, schema)).toThrow(
            'Invalid document: a "bulletList" cannot hold "paragraph".',
        );
    });

    it('fills in content that is only missing, as an empty document is', () => {
        expect(toRteDocument(toEngineDocument({ version: 1, blocks: [] }, schema))).toEqual({
            version: 1,
            blocks: [{ type: PARAGRAPH, children: [] }],
        });
    });

    it('takes back a block it handed out as the node it came from', () => {
        const doc = toEngineDocument(document, schema);
        const handedOut = toRteDocument(doc);

        const echoed = toEngineDocument({ ...handedOut, blocks: [...handedOut.blocks] }, schema);

        expect(echoed.child(1)).toBe(doc.child(1));
        expect(echoed.eq(doc)).toBe(true);
    });
});

describe('keys no mounted plugin declares', () => {
    const roundTrip = (doc: unknown, mounted: RtePlugin[] = plugins): RteDocumentOf =>
        toRteDocument(toEngineDocument(doc as RteDocumentOf, buildSchema(buildPluginRegistry(mounted))));

    it('are kept on a paragraph, a list, a list item, a void block and the document', () => {
        const stored = {
            version: 1,
            site: { id: 'a' },
            blocks: [
                { type: PARAGRAPH, foo: 1, children: [{ text: 'x' }] },
                {
                    type: 'bulletList',
                    marker: 'dash',
                    children: [{ type: 'listItem', ref: 'i1', children: [{ type: PARAGRAPH, children: [] }] }],
                },
                { type: 'divider', thickness: 2 },
            ],
        };

        expect(roundTrip(stored)).toEqual(stored);
    });

    it('keep null and nested values exactly as stored', () => {
        const stored = {
            version: 1,
            blocks: [
                { type: PARAGRAPH, gone: null, deep: { list: [1, { two: null }], flag: false }, children: [] },
                { type: 'divider', align: null },
            ],
        };

        expect(roundTrip(stored)).toStrictEqual({
            ...stored,
            blocks: [stored.blocks[0], { type: 'divider', align: null }],
        });
    });

    it('include a key named like the engine attribute that holds them', () => {
        const stored = {
            version: 1,
            [EXTRA_ATTR]: 'on the document',
            blocks: [{ type: PARAGRAPH, [EXTRA_ATTR]: { nested: true }, foo: 1, children: [] }],
        };

        expect(roundTrip(stored)).toEqual(stored);
    });

    it('include keys named like built-in object properties', () => {
        const stored = {
            version: 1,
            constructor: 'on the document',
            blocks: [{ type: PARAGRAPH, valueOf: 1, toString: 'x', hasOwnProperty: true, children: [] }],
        };

        expect(roundTrip(stored)).toEqual(stored);
    });

    it('include alignment where no plugin mounted declares it, on any block', () => {
        const stored = {
            version: 1,
            blocks: [
                { type: PARAGRAPH, align: 'center', children: [] },
                { type: 'bulletList', align: 'right', children: [{ type: 'listItem', children: [] }] },
                { type: 'divider', align: 'left' },
            ],
        };
        const withoutAlign = plugins.filter((plugin) => plugin.id !== 'align');

        expect(roundTrip(stored, withoutAlign).blocks).toEqual([
            stored.blocks[0],
            { ...stored.blocks[1], children: [{ type: 'listItem', children: [{ type: PARAGRAPH, children: [] }] }] },
            stored.blocks[2],
        ]);
    });

    it('leave no trace on a block or a document that has none', () => {
        const doc = toEngineDocument(document, schema);

        expect(doc.attrs[EXTRA_ATTR]).toBeNull();
        expect(doc.firstChild?.attrs[EXTRA_ATTR]).toBeNull();
        expect(Object.keys(toRteDocument(doc))).toEqual(['version', 'blocks']);
    });

    it('lose to an attribute the block type declares, set or unset', () => {
        const doc = schema.node('doc', { [EXTRA_ATTR]: null }, [
            schema.node('heading', { level: 3, [EXTRA_ATTR]: { level: 9, foo: 1 } }),
            schema.node(PARAGRAPH, { [EXTRA_ATTR]: { align: 'right', foo: 1 } }),
        ]);

        expect(toRteDocument(doc).blocks).toEqual([
            { type: 'heading', level: 3, foo: 1, children: [] },
            { type: PARAGRAPH, foo: 1, children: [] },
        ]);
    });
});

describe('a mark switched off in the document', () => {
    it('reads as absent when it is `false` or `null`', () => {
        const switchedOff = {
            version: 1,
            blocks: [{ type: PARAGRAPH, children: [{ text: 'plain', bold: false, link: null }] }],
        } as unknown as RteDocumentOf;

        const engine = toEngineDocument(switchedOff, schema);

        expect(engine.firstChild?.firstChild?.marks).toEqual([]);
        expect(toRteDocument(engine)).toEqual({
            version: 1,
            blocks: [{ type: PARAGRAPH, children: [{ text: 'plain' }] }],
        });
    });
});
