/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

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

import { toEngineDocument, toRteDocument } from './documentConversion';
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

    it('refuses a mark no mounted plugin defines, rather than dropping it', () => {
        const withUnknownMark: RteDocumentOf = {
            version: 1,
            blocks: [{ type: PARAGRAPH, children: [{ text: 'x', highlight: true }] }],
        };

        expect(() => toEngineDocument(withUnknownMark, schema)).toThrow(/Unknown mark type "highlight"/);
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
