/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    BlockType,
    InputNodeTypes,
    LeafType,
    NodeType,
    OptionType,
    PartialOptionType,
    defaultNodeTypes,
} from '../types';
import { applyFormattingToLeafNode } from './applyFormattingToLeafNode';
import { isLeafNode } from './isLeafNode';
import { processNodes } from './processNodes';
import { BREAK_TAG, LINK_DESTINATION_KEY } from './utils';

const VOID_ELEMENTS: Array<keyof InputNodeTypes> = ['thematicBreak', 'image'];

const isChildAList = (chunk: NodeType, LIST_TYPES: string[]) =>
    !isLeafNode(chunk) ? LIST_TYPES.includes(chunk.type || '') : false;

const doesChildHasALink = (chunk: NodeType, nodeTypes: InputNodeTypes) =>
    !isLeafNode(chunk) && Array.isArray(chunk.children)
        ? chunk.children.some(
              (child) => !isLeafNode(child) && (child.type === nodeTypes.link || child.type === nodeTypes.image),
          )
        : false;

const shouldIgnoreParagraphNewline = (
    ignoreParagraphNewline: boolean,
    text: string,
    chunk: NodeType,
    nodeTypes: InputNodeTypes,
) => !ignoreParagraphNewline && (text === '' || text === '\n') && chunk.parentType === nodeTypes.paragraph;

const getDepthOfNestedLists = (listTypes: string[], children: NodeType, listDepth: number) =>
    listTypes.includes((children as BlockType).type || '') ? listDepth + 1 : listDepth;

const defaultOptions: OptionType = {
    nodeTypes: defaultNodeTypes,
    ignoreParagraphNewline: false,
    listDepth: 0,
    linkDestinationKey: LINK_DESTINATION_KEY,
};

const process = (chunk: NodeType, options: OptionType) => {
    const nodeTypes = options.nodeTypes as InputNodeTypes;
    const text = (chunk as LeafType).text ?? '';
    let type = (chunk as BlockType).type ?? undefined;
    const parentType = (chunk as BlockType).parentType ?? undefined;
    const LIST_TYPES = [nodeTypes.ulList, nodeTypes.olList];
    let children = text;

    if (!isLeafNode(chunk)) {
        children = chunk.children
            .map((c: NodeType) => {
                const isList = isChildAList(c, LIST_TYPES);
                const selfIsList = LIST_TYPES.includes(chunk.type ?? '');

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

                return process(
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
                            (options.ignoreParagraphNewline || isList || selfIsList || childrenHasLink) &&
                            // if we have c.break, never ignore empty paragraph new line
                            !(c as BlockType).break,

                        // track depth of nested lists so we can add proper spacing
                        listDepth: getDepthOfNestedLists(LIST_TYPES, c, options.listDepth),
                        linkDestinationKey: options.linkDestinationKey,
                    },
                );
            })
            .join('');
    }

    // This is pretty fragile code, check the long comment where we iterate over children
    if (shouldIgnoreParagraphNewline(options.ignoreParagraphNewline, text, chunk, nodeTypes)) {
        type = nodeTypes.paragraph;
        children = BREAK_TAG;
    }

    if (children === '' && !VOID_ELEMENTS.find((k) => nodeTypes[k] === type)) {
        return;
    }

    if (children !== BREAK_TAG && isLeafNode(chunk)) {
        children = applyFormattingToLeafNode(children, chunk);
    }

    return processNodes(options, children, chunk, options.listDepth, type, parentType);
};

export default function serialize(options: PartialOptionType) {
    const userOptions = {
        ...defaultOptions,
        ...options,
        nodeTypes: {
            ...defaultOptions.nodeTypes,
            ...options?.nodeTypes,
            heading: {
                ...defaultOptions.nodeTypes.heading,
                ...options?.nodeTypes?.heading,
            },
        },
    };

    return (tree: NodeType[]): string => tree.map((node) => process(node, userOptions)).join('');
}
