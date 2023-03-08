/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InternalLinkNode } from '../../types';
import { getLinkNodeByProp } from './getLinkNodeByProp';

export const getExpandedIds = (selectedNode: InternalLinkNode, tree: InternalLinkNode): string[] => {
    const ids = [selectedNode.id];

    if (!selectedNode.parentId) {
        return ids;
    }

    const parentNode = getLinkNodeByProp('id', selectedNode.parentId, tree);
    if (parentNode) {
        ids.push(...getExpandedIds(parentNode, tree));
    }

    return ids;
};
