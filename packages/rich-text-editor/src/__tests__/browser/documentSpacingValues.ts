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

export const UNKNOWN_TEXTS = {
    first: 'Callout first',
    last: 'Callout last',
} as const;

/** A block no plugin defines, holding two paragraphs, between two more. */
export const UNKNOWN_CONTAINER_DOCUMENT: RteDocumentOf = {
    version: 1,
    blocks: [
        { type: 'paragraph', children: [{ text: 'Before' }] },
        {
            type: 'callout',
            children: [
                { type: 'paragraph', children: [{ text: UNKNOWN_TEXTS.first }] },
                { type: 'paragraph', children: [{ text: UNKNOWN_TEXTS.last }] },
            ],
        },
        { type: 'paragraph', children: [{ text: 'After' }] },
    ],
};

export const NEWER_STYLE_TEXT = 'Newer style';

/** A text style block whose style no preset names, as a newer version may write, between two paragraphs. */
export const NEWER_STYLE_DOCUMENT: RteDocumentOf<StyledBlock> = {
    version: 1,
    blocks: [
        { type: 'paragraph', children: [{ text: 'Before' }] },
        { type: 'textStyle', style: 'heading9', children: [{ text: NEWER_STYLE_TEXT }] },
        { type: 'paragraph', children: [{ text: 'After' }] },
    ],
};

export const COLUMN_BREAK_SELECTOR = '[data-column-break]';
/** The margin above and below a column break, which `columnBreak.module.scss` writes: `--spacing-xx-small`. */
export const COLUMN_BREAK_MARGIN = '4px';

/** A column break between two paragraphs, where the document would give it no gap above. */
export const COLUMN_BREAK_DOCUMENT: RteDocumentOf = {
    version: 1,
    blocks: [
        { type: 'paragraph', children: [{ text: 'Before' }] },
        { type: 'columnBreak' },
        { type: 'paragraph', children: [{ text: 'After' }] },
    ],
};

/** The block type of `ownMarginsPlugin.tsx`, drawn by its own component, whose class writes its margins. */
export const BOXED_TYPE = 'boxed';
export const BOXED_TEXT = 'Boxed';
/** The margins `ownMarginsPlugin.module.scss` writes. */
export const BOXED_MARGIN = '20px';

/** The block that owns its margins, between two paragraphs, where the document would give it none above. */
export const BOXED_DOCUMENT: RteDocumentOf = {
    version: 1,
    blocks: [
        { type: 'paragraph', children: [{ text: 'Before' }] },
        { type: BOXED_TYPE, children: [{ text: BOXED_TEXT }] },
        { type: 'paragraph', children: [{ text: 'After' }] },
    ],
};
