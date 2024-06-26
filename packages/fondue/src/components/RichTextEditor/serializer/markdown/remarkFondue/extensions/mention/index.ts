/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type VisitorResult, visit } from 'unist-util-visit';

import { MENTION_SERIALIZE_REGEX } from '../../../utils';
import { type NodeChild, type NodeChildKey, type RemarkExtension, type TreeNode } from '../../types';

import { type RegExpMatchArray } from './types';

export default function Extension(): RemarkExtension {
    return transformer;
}

const transformer = (tree: TreeNode) => {
    visit(tree, 'paragraph', visitor);

    function visitor(node: TreeNode): VisitorResult {
        const { children } = node;
        node.children = [];

        for (const child of children) {
            if (!is(child, 'text') || !child.value) {
                node.children.push(child);
                continue;
            }

            const matches = [...child.value.matchAll(MENTION_SERIALIZE_REGEX)] as RegExpMatchArray[];

            if (matches === null || matches.length === 0) {
                node.children.push(child);
                continue;
            }

            createNodes(matches, node, child.value);
        }
    }
};

const is = (node: NodeChild, key: NodeChildKey): boolean => node[key] !== '' && !!node.value;

const createNodes = (matches: RegExpMatchArray[], node: TreeNode, value: string) => {
    if (matches[0].index > 0) {
        node.children.push({
            type: 'text',
            value: value.slice(0, matches[0].index),
        });
    }

    for (const [index, match] of matches.entries()) {
        node.children.push({
            type: 'mention',
            children: [{ type: 'text', value: match[0] }],
        });

        if (matches.length > index + 1 && value) {
            const startAt = match.index + match[0].length;
            node.children.push({
                type: 'text',
                value: value.slice(startAt, matches[index + 1].index),
            });
        }
    }

    const lastMatch = matches[matches.length - 1];

    if (lastMatch.index + lastMatch[0].length < value.length) {
        node.children.push({
            type: 'text',
            value: value.slice(lastMatch.index + lastMatch[0].length),
        });
    } else {
        node.children.push({
            type: 'text',
            value: '',
        });
    }
};
