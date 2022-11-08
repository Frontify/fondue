/* (c) Copyright Frontify Ltd., all rights reserved. */

import escapeHtml from 'escape-html';
import { BlockType, InputNodeTypes, LeafType, NodeType, defaultNodeTypes } from '../astTypes';
import { applyFormattingToLeafNode } from './appplyFormatingToLeafNode';
import { isLeafNode } from './isLeafNode';
import { processNodes } from './processNodes';
import { BREAK_TAG } from './utils';

interface Options {
    nodeTypes?: InputNodeTypes;
    listDepth?: number;
    ignoreParagraphNewline?: boolean;
}

const VOID_ELEMENTS: Array<keyof InputNodeTypes> = ['thematic_break', 'image'];

const isChildAList = (chunk: NodeType, LIST_TYPES: string[]) =>
    !isLeafNode(chunk) ? LIST_TYPES.includes(chunk.type || '') : false;

const doesChildHasALink = (chunk: NodeType, nodeTypes: InputNodeTypes) =>
    !isLeafNode(chunk) && Array.isArray(chunk.children)
        ? chunk.children.some((child) => !isLeafNode(child) && child.type === nodeTypes.link)
        : false;

const shouldIgnoreParagraphNewline = (
    ignoreParagraphNewline: boolean,
    text: string,
    chunk: NodeType,
    nodeTypes: InputNodeTypes,
) => !ignoreParagraphNewline && (text === '' || text === '\n') && chunk.parentType === nodeTypes.paragraph;

const shouldEscapeNode = (children: string, nodeTypes: InputNodeTypes, type?: string, parentType?: string) => {
    // don't escape if: code block
    if (parentType !== nodeTypes.code_block && type !== nodeTypes.code_block) {
        children = escapeHtml(children);
    }

    return children;
};

const getDepthOfNestedLists = (listTypes: string[], children: NodeType, listDepth: number) =>
    listTypes.includes((children as BlockType).type || '') ? listDepth + 1 : listDepth;

export default function serialize(chunk: NodeType, opts: Options = { nodeTypes: defaultNodeTypes }) {
    const { nodeTypes: userNodeTypes = defaultNodeTypes, ignoreParagraphNewline = false, listDepth = 0 } = opts;

    const text = (chunk as LeafType).text ?? '';
    let type = (chunk as BlockType).type ?? undefined;
    const parentType = (chunk as BlockType).parentType ?? undefined;

    const nodeTypes: InputNodeTypes = {
        ...defaultNodeTypes,
        ...userNodeTypes,
        heading: {
            ...defaultNodeTypes.heading,
            ...userNodeTypes.heading,
        },
    };

    const LIST_TYPES = [nodeTypes.ul_list, nodeTypes.ol_list];

    let children = text;

    if (!isLeafNode(chunk)) {
        children = chunk.children
            .map((c: NodeType) => {
                const isList = isChildAList(c, LIST_TYPES);
                const selfIsList = LIST_TYPES.includes(chunk.type || '');

                // Links can have the following shape
                // In which case we don't want to surround
                // with break tags
                // {
                //  type: 'paragraph',
                //  children: [
                //    { text: '' },
                //    { type: 'link', children: [{ text: foo.com }]}
                //    { text: '' }
                //  ]
                // }
                const childrenHasLink = doesChildHasALink(chunk, nodeTypes);

                return serialize(
                    { ...c, parentType: type },
                    {
                        nodeTypes,
                        // WOAH.
                        // what we're doing here is pretty tricky, it relates to the block below where
                        // we check for ignoreParagraphNewline and set type to paragraph.
                        // We want to strip out empty paragraphs sometimes, but other times we don't.
                        // If we're the descendant of a list, we know we don't want a bunch
                        // of whitespace. If we're parallel to a link we also don't want
                        // to respect neighboring paragraphs
                        ignoreParagraphNewline:
                            (ignoreParagraphNewline || isList || selfIsList || childrenHasLink) &&
                            // if we have c.break, never ignore empty paragraph new line
                            !(c as BlockType).break,

                        // track depth of nested lists so we can add proper spacing
                        listDepth: getDepthOfNestedLists(LIST_TYPES, c, listDepth),
                    },
                );
            })
            .join('');
    }

    // This is pretty fragile code, check the long comment where we iterate over children
    if (shouldIgnoreParagraphNewline(ignoreParagraphNewline, text, chunk, nodeTypes)) {
        type = nodeTypes.paragraph;
        children = BREAK_TAG;
    }

    if (children === '' && !VOID_ELEMENTS.find((k) => nodeTypes[k] === type)) {
        return;
    }

    if (children !== BREAK_TAG && isLeafNode(chunk)) {
        children = applyFormattingToLeafNode(children, chunk);
    }

    children = processNodes(nodeTypes, children, chunk, listDepth, type);

    return shouldEscapeNode(children, nodeTypes, type, parentType);
}
