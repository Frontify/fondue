/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeState } from '../types';

export const getItemPositionInParent = (id: string, parentId: string, treeState: TreeState): number => {
    const parentState = treeState.items.get(parentId);
    if (parentState) {
        return parentState.childrenIds?.findIndex((childId) => childId === id) as number;
    }

    return -1;
};
