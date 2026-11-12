/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteBlockNode, type RteDocumentOf, type RteInlineNode } from '../../core/document';
import { type RteDocument } from '../../index';

// Shared by the spacing tests and the documents they mount, apart from the fixture components for the reason
// in hostStylingValues.ts.

export const SPACING_TEXTS = {
    title: 'Title',
    intro: 'Intro',
    itemText: 'Item text',
    itemHeading: 'Item heading',
    nestedItem: 'Nested item',
    quote: 'Quoted',
    last: 'Last',
} as const;

/** Any block with a text style, nested as deep as needed. */
type StyledBlock = RteBlockNode & { style?: string; children?: RteInlineNode[] | StyledBlock[] };

/**
 * A heading first, a paragraph, a nested list whose item holds a paragraph and a heading, a quote, and a last block.
 * Untyped: the official document has no heading in a list item, which the readonly view and the export still draw.
 */
export const SPACING_DOCUMENT: RteDocumentOf<StyledBlock> = {
    version: 1,
    blocks: [
        { type: 'textStyle', style: 'heading1', children: [{ text: SPACING_TEXTS.title }] },
        { type: 'paragraph', children: [{ text: SPACING_TEXTS.intro }] },
        {
            type: 'bulletList',
            children: [
                {
                    type: 'listItem',
                    children: [
                        { type: 'paragraph', children: [{ text: SPACING_TEXTS.itemText }] },
                        { type: 'textStyle', style: 'heading2', children: [{ text: SPACING_TEXTS.itemHeading }] },
                        {
                            type: 'bulletList',
                            children: [
                                {
                                    type: 'listItem',
                                    children: [{ type: 'paragraph', children: [{ text: SPACING_TEXTS.nestedItem }] }],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        { type: 'quote', children: [{ text: SPACING_TEXTS.quote }] },
        { type: 'paragraph', children: [{ text: SPACING_TEXTS.last }] },
    ],
};

export const CHECK_TEXTS = {
    item: 'Check text',
    nested: 'Nested check',
    after: 'After',
} as const;

/** A check item holding a paragraph and a nested check list, then a block after the list. */
export const CHECK_ITEM_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [
        {
            type: 'checkList',
            children: [
                {
                    type: 'checkItem',
                    checked: false,
                    children: [
                        { type: 'paragraph', children: [{ text: CHECK_TEXTS.item }] },
                        {
                            type: 'checkList',
                            children: [
                                {
                                    type: 'checkItem',
                                    checked: false,
                                    children: [{ type: 'paragraph', children: [{ text: CHECK_TEXTS.nested }] }],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        { type: 'paragraph', children: [{ text: CHECK_TEXTS.after }] },
    ],
};
