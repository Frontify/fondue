/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TDescendant, isDescendant } from '@udecode/plate';
import { Node } from 'slate';

export const toPlaintext = (nodes: TDescendant[] | string): string => {
    const nodesArray = typeof nodes === 'string' ? JSON.parse(nodes) : nodes;
    return nodesArray
        .map((node: TDescendant) => {
            if (!isDescendant(node)) {
                return '';
            }

            return Array.isArray(node.children) ? toPlaintext(node.children) : Node.string(node);
        })
        .join('\n');
};
