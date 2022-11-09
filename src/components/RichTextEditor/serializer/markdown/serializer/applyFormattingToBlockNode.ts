/* (c) Copyright Frontify Ltd., all rights reserved. */

import escapeHtml from 'escape-html';
import { BlockType, InputNodeTypes, LeafType, NodeType, OptionType } from '../types';
import { isLeafNode } from './isLeafNode';

const processListItemNode = (
    nodeTypes: InputNodeTypes,
    children: string,
    chunk: NodeType,
    listDepth: number,
): string => {
    const isOL = chunk && chunk.parentType === nodeTypes.ol_list;
    const treatAsLeaf = (chunk as BlockType).children.length === 1 && isLeafNode((chunk as BlockType).children[0]);

    let spacer = '';
    for (let k = 0; listDepth > k; k++) {
        if (isOL) {
            // https://github.com/remarkjs/remark-react/issues/65
            spacer += '   ';
        } else {
            spacer += '  ';
        }
    }
    return `${spacer}${isOL ? '1.' : '-'} ${children}${treatAsLeaf ? '\n' : ''}`;
};

const shouldEscapeNode = (
    chunk: NodeType,
    children: string,
    nodeTypes: InputNodeTypes,
    type?: string,
    parentType?: string,
) => {
    // don't escape if: code block, image
    const isCodeBlock =
        parentType === nodeTypes.code_block || type === nodeTypes.code_block || (chunk as LeafType).code;

    if (!isCodeBlock) {
        children = escapeHtml(children);
    }

    return children;
};

export const applyFormattingToBlockNode = (
    options: OptionType,
    children: string,
    chunk: NodeType,
    listDepth: number,
    type?: string,
    parentType?: string,
) => {
    const nodeTypes = options.nodeTypes as InputNodeTypes;

    switch (type) {
        case nodeTypes.heading[1]:
            return `# ${children}\n`;
        case nodeTypes.heading[2]:
            return `## ${children}\n`;
        case nodeTypes.heading[3]:
            return `### ${children}\n`;
        case nodeTypes.heading[4]:
            return `#### ${children}\n`;
        case nodeTypes.heading[5]:
            return `##### ${children}\n`;
        case nodeTypes.heading[6]:
            return `###### ${children}\n`;

        case nodeTypes.block_quote:
            /**
             * For some reason, marked is parsing blockquote w/ one new line as
             * continued blockquote, so adding two new lines ensures that doesn't
             * happen
             */
            return `> ${children}\n`;

        case nodeTypes.code_block:
            return `\`\`\`${(chunk as BlockType).language || ''}\n${children}\n\`\`\`\n`;

        case nodeTypes.link:
            const linkUrl = (chunk as BlockType).url ?? '';
            return `[${children}](${linkUrl})`;

        case nodeTypes.image:
            const imageUrl = (chunk as BlockType).link ?? '';
            return `![${(chunk as BlockType).caption}](${imageUrl})`;

        case nodeTypes.ul_list:
        case nodeTypes.ol_list:
            return `\n${children}\n`;

        case nodeTypes.listItem:
            return processListItemNode(nodeTypes, children, chunk, listDepth);

        case nodeTypes.paragraph:
            return `${children}\n`;

        case nodeTypes.thematic_break:
            return `\n---${children}\n\n`;

        default:
            return shouldEscapeNode(chunk, children, nodeTypes, type, parentType);
    }
};
