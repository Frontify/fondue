/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InternalLinkNode, InternalLinkTree } from '../../types';
import { getLinkNodeByProp } from './getLinkNodeByProp';

export const getExpandedIds = (selectedNode: InternalLinkNode, tree: InternalLinkTree): string[] => {
    const ids = [selectedNode.id];

    if (!selectedNode.parentId) {
        return ids;
    }

    const parentNode = getLinkNodeByProp('id', selectedNode.parentId, tree.nodes ?? []);
    if (parentNode) {
        ids.push(...getExpandedIds(parentNode, tree));
    }

    return ids;
};
