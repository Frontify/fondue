/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InternalLinkNode } from '../../types';

type SupportedNodeProps = Pick<InternalLinkNode, 'id' | 'url'>;

export const getLinkNodeByProp = (
    nodeProp: keyof SupportedNodeProps,
    value: string,
    nodes: InternalLinkNode[],
): InternalLinkNode | null => {
    for (const node of nodes) {
        if (node[nodeProp] === value) {
            return node;
        }

        const foundNode = getLinkNodeByProp(nodeProp, value, node.subNodes ?? []);
        if (foundNode) {
            return foundNode;
        }
    }

    return null;
};
