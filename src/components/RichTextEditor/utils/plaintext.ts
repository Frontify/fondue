import { isDescendant, TDescendant } from '@udecode/plate-core';
import { Node } from 'slate';

export const toPlaintext = (nodes: TDescendant[] | string): string => {
    const nodesArray = typeof nodes === 'string' ? JSON.parse(nodes) : nodes;
    return nodesArray
        .map((node) => {
            if (!isDescendant(node)) {
                return '';
            }

            return Array.isArray(node.children) ? toPlaintext(node.children) : Node.string(node);
        })
        .join('\n');
};
