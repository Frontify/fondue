/* (c) Copyright Frontify Ltd., all rights reserved. */

export type InputNodeTypes = {
    paragraph: string;
    blockQuote: string;
    codeBlock: string;
    link: string;
    ulList: string;
    olList: string;
    listItem: string;
    heading: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
    };
    emphasisMark: string;
    strongMark: string;
    deleteMark: string;
    inlineCodeMark: string;
    thematicBreak: string;
    image: string;
};

export type MarkdownAstNodeType =
    | 'paragraph'
    | 'heading'
    | 'list'
    | 'listItem'
    | 'link'
    | 'image'
    | 'blockquote'
    | 'code'
    | 'html'
    | 'emphasis'
    | 'strong'
    | 'delete'
    | 'inlineCode'
    | 'thematicBreak'
    | 'text';

export const defaultNodeTypes: InputNodeTypes = {
    paragraph: 'paragraph',
    blockQuote: 'block_quote',
    codeBlock: 'code_block',
    link: 'link',
    ulList: 'ul_list',
    olList: 'ol_list',
    listItem: 'list_item',
    heading: {
        1: 'heading_one',
        2: 'heading_two',
        3: 'heading_three',
        4: 'heading_four',
        5: 'heading_five',
        6: 'heading_six',
    },
    emphasisMark: 'italic',
    strongMark: 'bold',
    deleteMark: 'strikethrough',
    inlineCodeMark: 'code',
    thematicBreak: 'thematic_break',
    image: 'image',
};

export type NodeType = BlockType | LeafType;

export type LeafType = {
    text: string;
    strikethrough?: boolean;
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    parentType?: string;
};

export type BlockType = {
    type: string;
    children: NodeType[];
    parentType?: string;
    caption?: string;
    language?: string;
    break?: boolean;
    link?: string;
    url?: string;
};

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

export type OptionType<T extends InputNodeTypes = InputNodeTypes> = {
    nodeTypes: RecursivePartial<T>;
    linkDestinationKey: string;
    ignoreParagraphNewline: boolean;
    listDepth: number;
    imageSourceKey?: string;
    imageCaptionKey?: string;
};

export type PartialOptionType<T extends OptionType = OptionType> = Partial<T>;

export type MarkdownAstNode = {
    type?: MarkdownAstNodeType;
    ordered?: boolean;
    value?: string;
    text?: string;
    children?: Array<MarkdownAstNode>;
    depth?: 1 | 2 | 3 | 4 | 5 | 6;
    url?: string;
    alt?: string;
    lang?: string;
    // Markdown Ast metadata
    position?: any;
    spread?: any;
    checked?: any;
    indent?: any;
};

export type TextNode = { text?: string };

export type CodeBlockNode<T extends InputNodeTypes> = {
    type: T['codeBlock'];
    language: string | undefined;
    children: Array<TextNode>;
};

export type HeadingNode<T extends InputNodeTypes> = {
    type: T['heading'][1] | T['heading'][2] | T['heading'][3] | T['heading'][4] | T['heading'][5] | T['heading'][6];
    children: Array<DeserializedNode<T>>;
};

export type ListNode<T extends InputNodeTypes> = {
    type: T['olList'] | T['ulList'];
    children: Array<DeserializedNode<T>>;
};

export type ListItemNode<T extends InputNodeTypes> = {
    type: T['listItem'];
    children: Array<DeserializedNode<T>>;
};

export type ParagraphNode<T extends InputNodeTypes> = {
    type: T['paragraph'];
    break?: true;
    children: Array<DeserializedNode<T>>;
};

export type LinkNode<T extends InputNodeTypes> = {
    type: T['link'];
    children: Array<DeserializedNode<T>>;
    [urlKey: string]: string | undefined | Array<DeserializedNode<T>>;
};

export type ImageNode<T extends InputNodeTypes> = {
    type: T['image'];
    children: Array<DeserializedNode<T>>;
    [sourceOrCaptionKey: string]: string | undefined | Array<DeserializedNode<T>>;
};

export type BlockQuoteNode<T extends InputNodeTypes> = {
    type: T['blockQuote'];
    children: Array<DeserializedNode<T>>;
};

export type InlineCodeMarkNode<T extends InputNodeTypes> = {
    type: T['inlineCodeMark'];
    children: Array<TextNode>;
    language: string | undefined;
};

export type ThematicBreakNode<T extends InputNodeTypes> = {
    type: T['thematicBreak'];
    children: Array<DeserializedNode<T>>;
};

export type ItalicNode<T extends InputNodeTypes> = {
    [K in T['emphasisMark']]: true;
} & {
    children: TextNode;
};

export type BoldNode = {
    bold: true;
    children: TextNode;
};

export type StrikeThoughNode = {
    strikethrough: true;
    children: TextNode;
};

export type InlineCodeNode = {
    code: true;
    text: string | undefined;
};

export type DeserializedNode<T extends InputNodeTypes> =
    | CodeBlockNode<T>
    | HeadingNode<T>
    | ListNode<T>
    | ListItemNode<T>
    | ParagraphNode<T>
    | LinkNode<T>
    | ImageNode<T>
    | BlockQuoteNode<T>
    | InlineCodeMarkNode<T>
    | ThematicBreakNode<T>
    | ItalicNode<T>
    | BoldNode
    | StrikeThoughNode
    | InlineCodeNode
    | TextNode;
