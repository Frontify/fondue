/* (c) Copyright Frontify Ltd., all rights reserved. */

import { VisitorResult, visit } from 'unist-util-visit';
import { NodeChild, ParagraphNode, RegExpMatchArray, Transformer } from './types';

function is(node: NodeChild, type: string): boolean {
    return !!node[type] && node[type].length > 0 && !!node.value;
}

function transformer(tree: ParagraphNode) {
    visit(tree, 'paragraph', visitor);

    function visitor(node: ParagraphNode): VisitorResult {
        const { children } = node;
        node.children = [];

        for (const child of children) {
            if (!is(child, 'text') || !child.value) {
                node.children.push(child);
                continue;
            }

            const matches = [...child.value.matchAll(/@\[[a-z]+:\s\d+]/gi)] as RegExpMatchArray[];
            console.log('matches', matches);

            if (matches === null || matches.length === 0) {
                node.children.push(child);
                continue;
            }

            if (matches[0].index > 0) {
                node.children.push({
                    type: 'text',
                    value: child.value.substr(0, matches[0].index),
                });
            }

            for (const [index, match] of matches.entries()) {
                node.children.push({
                    type: 'mention',
                    children: [{ type: 'text', value: match[0] }],
                });

                if (matches.length > index + 1 && child.value) {
                    const startAt = match.index + match[0].length;
                    node.children.push({
                        type: 'text',
                        value: child.value.slice(startAt, matches[index + 1].index - startAt),
                    });
                }
            }

            const lastMatch = matches[matches.length - 1];

            if (lastMatch.index + lastMatch[0].length < child.value.length) {
                node.children.push({
                    type: 'text',
                    value: child.value.slice(lastMatch.index + lastMatch[0].length),
                });
            }
        }
    }
}

export default function plugin(): Transformer {
    return transformer;
}
