/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Compile-time assertions for the document types.
 * `tsc --noEmit` is the test runner: an unused @ts-expect-error fails the build.
 */
import { type RteBlock, type RteDocument, type RteInlineNode, type RteText } from './index';

// The shipped case: one annotation, everything checked
const doc: RteDocument = {
    version: 1,
    blocks: [
        { type: 'heading', level: 2, children: [{ text: 'x', bold: true }] },
        { type: 'image', src: 'https://example.com/pic.png' },
    ],
};

// prettier-ignore
// @ts-expect-error unknown block types must be rejected
const badBlock: RteDocument = { version: 1, blocks: [{ type: 'nope', children: [] }] };

// prettier-ignore
// @ts-expect-error heading levels beyond 1|2|3|4 must be rejected
const badLevel: RteDocument = { version: 1, blocks: [{ type: 'heading', level: 5, children: [] }] };

// Nesting: a list holds items, an item holds a paragraph and any nested list
const nestedList: RteDocument = {
    version: 1,
    blocks: [
        {
            type: 'bulletList',
            children: [
                {
                    type: 'listItem',
                    children: [
                        { type: 'paragraph', children: [{ text: 'one', bold: true }] },
                        {
                            type: 'numberedList',
                            children: [
                                { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'nested' }] }] },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: 'checkList',
            children: [
                { type: 'checkItem', checked: true, children: [{ type: 'paragraph', children: [{ text: 'done' }] }] },
            ],
        },
    ],
};

// prettier-ignore
// @ts-expect-error the closed inline union reaches into list items too
const listMarkTypo: RteDocument = { version: 1, blocks: [{ type: 'bulletList', children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'x', bod: true }] }] }] }] };

// prettier-ignore
// @ts-expect-error a list may only contain its own item type
const listHoldsBlocks: RteDocument = { version: 1, blocks: [{ type: 'bulletList', children: [{ type: 'paragraph', children: [] }] }] };

// prettier-ignore
// @ts-expect-error text style variants are closed
const variantTypo: RteDocument = { version: 1, blocks: [{ type: 'textStyle', variant: 'custom9', children: [] }] };

// prettier-ignore
// @ts-expect-error alignment values are closed
const alignTypo: RteDocument = { version: 1, blocks: [{ type: 'paragraph', align: 'middle', children: [] }] };

// Alignment and the shipped void inlines are part of the official format — no type argument
const shippedInlines: RteDocument = {
    version: 1,
    blocks: [
        {
            type: 'paragraph',
            align: 'center',
            children: [{ text: 'Ask ' }, { type: 'mention', id: 'jane', label: 'Jane' }, { type: 'break' }],
        },
    ],
};

// prettier-ignore
// @ts-expect-error mark keys are closed: a typo must not pass
const markTypo: RteDocument = { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'x', bod: true }] }] };

// prettier-ignore
// @ts-expect-error value-carrying marks must not accept a bare boolean
const linkAsBoolean: RteText = { text: 'x', link: true };

// Blocks are a discriminated union: no type guard needed to narrow
const narrowed = (block: RteBlock): string => (block.type === 'image' ? block.src : block.type);

// Consumer plugins widen the parameters — the only place type arguments appear
type HighlightMark = { highlight?: boolean };
const consumerMark: RteDocument<RteBlock<RteText & HighlightMark>> = {
    version: 1,
    blocks: [{ type: 'paragraph', children: [{ text: 'x', highlight: true }] }],
};

type MentionInline = { type: 'mention'; id: string };
const consumerInline: RteDocument<RteBlock<MentionInline>> = {
    version: 1,
    blocks: [{ type: 'paragraph', children: [{ text: 'Ask ' }, { type: 'mention', id: 'jane' }] }],
};

type CalloutBlock = { type: 'callout'; children: RteInlineNode[] };
const consumerBlock: RteDocument<RteBlock | CalloutBlock> = {
    version: 1,
    blocks: [{ type: 'callout', children: [{ text: 'x' }] }],
};

export const __typeAssertions = [
    doc,
    badBlock,
    badLevel,
    nestedList,
    listMarkTypo,
    listHoldsBlocks,
    variantTypo,
    alignTypo,
    shippedInlines,
    markTypo,
    linkAsBoolean,
    narrowed,
    consumerMark,
    consumerInline,
    consumerBlock,
];
