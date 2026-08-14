/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import { reactRenderProbe } from '#/adapters/reactProbe/renderProbe';
import { ANY_LIST, emptyDocument, PARAGRAPH, type RteDocumentOf, type RtePlugin } from '#/domain';

import { buildSchema } from '../setup/schema';

import { toEngineDocument, toRteDocument } from './documentConversion';

/**
 * Enough of a plugin set to exercise every shape the boundary has to carry: a
 * mark that holds nothing, a mark that holds a value, a block with an attribute
 * of its own, an attribute injected into every text block, a void inline, and a
 * list that nests.
 */
const plugins: RtePlugin[] = [
    { id: 'bold', schema: { marks: [{ key: 'bold', render: ({ children }) => <strong>{children}</strong> }] } },
    {
        id: 'link',
        schema: {
            marks: [
                {
                    key: 'link',
                    attributes: { href: {} },
                    // A render function reads back the value it declared.
                    render: ({ children, value }) => <a href={(value as { href?: string }).href}>{children}</a>,
                },
            ],
        },
    },
    {
        id: 'heading',
        schema: {
            blocks: [
                {
                    type: 'heading',
                    attributes: { level: { default: 1 } },
                    render: ({ children }) => <h1>{children}</h1>,
                },
            ],
        },
    },
    {
        id: 'mention',
        schema: {
            inlines: [
                { type: 'mention', attributes: { id: {} }, render: ({ node }) => <span>{String(node.id)}</span> },
            ],
        },
    },
    {
        id: 'list',
        schema: {
            blocks: [
                {
                    type: 'bulletList',
                    content: 'blocks',
                    contains: ['listItem'],
                    isList: true,
                    render: ({ children }) => <ul>{children}</ul>,
                },
                {
                    type: 'listItem',
                    content: 'blocks',
                    contains: [PARAGRAPH, ANY_LIST],
                    render: ({ children }) => <li>{children}</li>,
                },
            ],
        },
    },
    { id: 'align', schema: { blockAttributes: [{ name: 'align', toStyle: (value) => `text-align: ${value}` }] } },
];

const { schema } = buildSchema(plugins, reactRenderProbe);

/** One document holding every one of those shapes at once. */
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
        // The engine has no empty text node to put it in, so it comes back as a
        // paragraph with no children. Asserted rather than fixed: both forms
        // mean the same empty paragraph, and both are accepted going in — but a
        // caller comparing what it sent against what it got back should know.
        expect(toRteDocument(toEngineDocument(emptyDocument(), schema))).toEqual({
            version: 1,
            blocks: [{ type: PARAGRAPH, children: [] }],
        });
    });

    it('reuses the conversion of blocks an edit did not touch', () => {
        const state = EditorState.create({ doc: toEngineDocument(document, schema) });
        const before = toRteDocument(state.doc);

        // A real edit at the very start, so only the first block is rebuilt.
        const after = toRteDocument(state.apply(state.tr.insertText('!', 1)).doc);

        expect(after.blocks[0]).not.toBe(before.blocks[0]);
        // The engine left these alone, so the conversion does too — which is
        // what keeps the per-keystroke cost proportional to the edit rather
        // than to the document, and what lets a host memoize on a block it was
        // handed.
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
