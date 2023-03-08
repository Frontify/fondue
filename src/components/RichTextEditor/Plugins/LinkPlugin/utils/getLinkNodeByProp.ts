/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InternalLinkNode } from '../../types';

type SupportedNodeProps = Pick<InternalLinkNode, 'id' | 'url'>;

export const getLinkNodeByProp = (
    nodeProp: keyof SupportedNodeProps,
    value: string,
    node: InternalLinkNode,
): InternalLinkNode | null => {
    if (node[nodeProp] === value) {
        return node;
    }

    for (const subNode of node.subNodes ?? []) {
        const foundNode = getLinkNodeByProp(nodeProp, value, subNode);
        if (foundNode) {
            return foundNode;
        }
    }

    return null;
};
