/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import { ANY_LIST, emptyDocument, PARAGRAPH, type RteDocumentOf, type RtePlugin } from '#/core';

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
        schema: [
            {
                kind: 'mark',
                type: 'bold',
                toDom: () => ({ tag: 'strong', children: true }),
                renderComponent: ({ children }) => <strong>{children}</strong>,
                parseRules: [{ tag: 'strong' }],
            },
        ],
    },
    {
        id: 'link',
        schema: [
            {
                kind: 'mark',
                type: 'link',
                attributes: { href: {} },
                toDom: (attrs) => ({
                    tag: 'a',
                    attrs: { href: typeof attrs.href === 'string' ? attrs.href : '' },
                    children: true,
                }),
                renderComponent: ({ children, value }) => <a href={(value as { href?: string }).href}>{children}</a>,
                parseRules: [{ tag: 'a' }],
            },
        ],
    },
    {
        id: 'heading',
        schema: [
            {
                kind: 'block',
                type: 'heading',
                children: 'text',
                attributes: { level: { default: 1 } },
                toDom: () => ({ tag: 'h1', children: true }),
                renderComponent: ({ children }) => <h1>{children}</h1>,
                parseRules: [{ tag: 'h1' }],
            },
        ],
    },
    {
        id: 'mention',
        schema: [
            {
                kind: 'inline',
                type: 'mention',
                attributes: { id: {} },
                toDom: (attrs) => ({
                    tag: 'span',
                    children: typeof attrs.id === 'string' ? attrs.id : '',
                }),
                renderComponent: ({ node }) => <span>{String(node.id)}</span>,
                parseRules: [{ tag: 'span' }],
            },
        ],
    },
    {
        id: 'list',
        schema: [
            {
                kind: 'block',
                type: 'bulletList',
                children: { items: 'listItem' },
                toDom: () => ({ tag: 'ul', children: true }),
                renderComponent: ({ children }) => <ul>{children}</ul>,
                parseRules: [{ tag: 'ul' }],
            },
            {
                kind: 'block',
                type: 'listItem',
                children: { blocks: [PARAGRAPH, ANY_LIST] },
                toDom: () => ({ tag: 'li', children: true }),
                renderComponent: ({ children }) => <li>{children}</li>,
                parseRules: [{ tag: 'li' }],
            },
        ],
    },
    {
        id: 'align',
        schema: [{ kind: 'attribute', type: 'align', toStyle: (value) => `text-align: ${value}` }],
    },
];

const { schema } = buildSchema(plugins);

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
});
