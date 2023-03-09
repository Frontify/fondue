/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LinkNode } from '../../types';

type SupportedNodeProps = Pick<LinkNode, 'id' | 'url'>;

export const getLinkNodeByProp = (
    nodeProp: keyof SupportedNodeProps,
    value: string,
    nodes: LinkNode[],
): LinkNode | null => {
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
