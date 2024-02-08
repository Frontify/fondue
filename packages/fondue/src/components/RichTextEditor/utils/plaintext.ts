/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TDescendant, isDescendant } from '@udecode/slate';
import { getNodeString } from '@udecode/slate';

export const toPlaintext = (nodes: TDescendant[] | string): string => {
    const nodesArray = Array.isArray(nodes) ? nodes : JSON.parse(nodes);
    return nodesArray
        .map((node: TDescendant) => {
            if (!isDescendant(node)) {
                return '';
            }

            return Array.isArray(node.children) ? toPlaintext(node.children) : getNodeString(node);
        })
        .join('\n');
};
