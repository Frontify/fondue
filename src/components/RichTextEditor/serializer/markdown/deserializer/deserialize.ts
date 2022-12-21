/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    BlockQuoteNode,
    CodeBlockNode,
    DeserializedNode,
    HeadingNode,
    ImageNode,
    InputNodeTypes,
    ItalicNode,
    LinkNode,
    ListItemNode,
    ListNode,
    MarkdownAstNode,
    OptionType,
    ParagraphNode,
    TextNode,
    ThematicBreakNode,
} from '../types';

export default function deserialize<T extends InputNodeTypes>(node: MarkdownAstNode, options: OptionType) {
    const types = options?.nodeTypes as InputNodeTypes;

    const linkDestinationKey = options?.linkDestinationKey ?? 'link';
    const imageSourceKey = options?.imageSourceKey ?? 'link';
    const imageCaptionKey = options?.imageCaptionKey ?? 'caption';

    let children: Array<DeserializedNode<T>> = [{ text: '' }];

    if (hasNodeChildren(node.children)) {
        children = node.children.flatMap((c: MarkdownAstNode) =>
            deserialize(
                {
                    ...c,
                    ordered: node.ordered || false,
                },
                options,
            ),
        );
    }

    switch (node.type) {
        case 'mention':
            const value = node.children ? node.children[0].value : undefined;
            const matches = value?.match(/@\[([a-z]+):\s(\d+)]/i) as RegExpMatchArray;
            return {
                type: types.mention,
                category: matches[1],
                key: matches[2],
                children: [{ text: '' }],
            };
        case 'heading':
            return {
                type: types.heading[node.depth || 1],
                children,
            } as HeadingNode<T>;
        case 'list':
            return {
                type: node.ordered ? types.olList : types.ulList,
                children,
            } as ListNode<T>;
        case 'listItem':
            return { type: types.listItem, children } as ListItemNode<T>;
        case 'paragraph':
            return { type: types.paragraph, children } as ParagraphNode<T>;
        case 'link':
            return {
                type: types.link,
                [linkDestinationKey]: node.url,
                children,
            } as LinkNode<T>;
        case 'image':
            return {
                type: types.image,
                children: [{ text: '' }],
                [imageSourceKey]: node.url,
                [imageCaptionKey]: node.alt,
            } as ImageNode<T>;
        case 'blockquote':
            return { type: types.blockQuote, children } as BlockQuoteNode<T>;
        case 'code':
            return {
                type: types.codeBlock,
                language: node.lang ?? undefined,
                children: [{ text: node.value }],
            } as CodeBlockNode<T>;

        case 'html':
            if (node.value?.includes('<br>')) {
                return {
                    break: true,
                    type: types.paragraph,
                    children: [{ text: node.value?.replace(/<br>/g, '') || '' }],
                } as ParagraphNode<T>;
            }
            return { type: 'paragraph', children: [{ text: node.value || '' }] };

        case 'emphasis':
            return {
                [types.emphasisMark as string]: true,
                ...forceLeafNode(children as Array<TextNode>),
                ...persistLeafFormats(children as Array<MarkdownAstNode>),
            } as unknown as ItalicNode<T>;
        case 'strong':
            return {
                [types.strongMark as string]: true,
                ...forceLeafNode(children as Array<TextNode>),
                ...persistLeafFormats(children as Array<MarkdownAstNode>),
            };
        case 'delete':
            return {
                [types.deleteMark as string]: true,
                ...forceLeafNode(children as Array<TextNode>),
                ...persistLeafFormats(children as Array<MarkdownAstNode>),
            };
        case 'inlineCode':
            return {
                [types.inlineCodeMark as string]: true,
                text: node.value,
                ...persistLeafFormats(children as Array<MarkdownAstNode>),
            };
        case 'thematicBreak':
            return {
                type: types.thematicBreak,
                children: [{ text: '' }],
            } as ThematicBreakNode<T>;

        case 'text':
        default:
            return { text: node.value ?? '' };
    }
}

const hasNodeChildren = (children: MarkdownAstNode['children']): children is MarkdownAstNode[] =>
    !!children && Array.isArray(children) && children.length > 0;

const forceLeafNode = (children: Array<TextNode>) => ({
    text: children.map((k) => k?.text).join(''),
});

// This function is will take any unknown keys, and bring them up a level
// allowing leaf nodes to have many different formats at once
// for example, bold and italic on the same node
const persistLeafFormats = (children: Array<MarkdownAstNode>): Omit<MarkdownAstNode, 'children' | 'type' | 'text'> => {
    return children.reduce((acc, node) => {
        for (const key of Object.keys(node) as Array<keyof MarkdownAstNode>) {
            if (key === 'children' || key === 'type' || key === 'text') {
                continue;
            }

            acc[key] = node[key];
        }

        return acc;
    }, {});
};
