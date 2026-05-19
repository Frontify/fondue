/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The canonical Frontify document. This is what gets stored, sent over
 * the wire, and round-tripped through serializers. It is NOT the editor's
 * internal representation — the adapter converts to/from the engine's
 * native format at the boundary.
 */
export type FrontifyDocument = {
    version: 1;
    blocks: FrontifyBlock[];
};

export type FrontifyBlock =
    | ParagraphBlock
    | HeadingBlock
    | QuoteBlock
    | UnorderedListBlock
    | OrderedListBlock
    | CheckboxListBlock
    | ColumnBreakBlock;

type BlockBase = {
    align?: 'left' | 'center' | 'right' | 'justify';
};

export type ParagraphBlock = BlockBase & {
    type: 'paragraph';
    children: FrontifyInline[];
};

export type HeadingBlock = BlockBase & {
    type: 'heading';
    level: 1 | 2 | 3 | 4;
    children: FrontifyInline[];
};

export type QuoteBlock = BlockBase & {
    type: 'quote';
    children: FrontifyInline[];
};

export type UnorderedListBlock = {
    type: 'unorderedList';
    items: ListItem[];
};

export type OrderedListBlock = {
    type: 'orderedList';
    items: ListItem[];
};

export type CheckboxListBlock = {
    type: 'checkboxList';
    items: CheckboxItem[];
};

export type ListItem = {
    children: FrontifyInline[];
    nested?: UnorderedListBlock | OrderedListBlock;
};

export type CheckboxItem = {
    checked: boolean;
    children: FrontifyInline[];
};

export type ColumnBreakBlock = {
    type: 'columnBreak';
};

export type FrontifyInline = FrontifyText | LinkInline | MentionInline;

export type FrontifyText = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
    subscript?: boolean;
    superscript?: boolean;
    color?: string;
};

export type LinkInline = {
    type: 'link';
    url: string;
    openInNewTab?: boolean;
    children: FrontifyText[];
};

export type MentionInline = {
    type: 'mention';
    id: string;
    category: 'user' | 'group' | 'all';
    children: [{ text: '' }];
};

export type FrontifySelection = {
    anchor: FrontifyPoint;
    focus: FrontifyPoint;
};

export type FrontifyPoint = {
    path: number[];
    offset: number;
};
