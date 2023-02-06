/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { TreeItemState, TreeState } from '../types';

export const getNextItemToFocus = (
    id: string,
    currentItemState: TreeItemState,
    treeState: TreeState,
): TreeItemState | undefined => {
    if (treeState.expandedIds.has(id) && currentItemState.childrenIds && currentItemState.childrenIds.length > 0) {
        // If expanded folder, select the first child
        const firstChildId = currentItemState.childrenIds[0];
        const firstChildState = treeState.items.get(firstChildId);
        if (!firstChildState) {
            throw new Error(`Item with id ${firstChildId} is not a registered item.`);
        }

        return firstChildState;
    } else if (currentItemState.parentId && !isItemLastInParent(id, currentItemState.parentId, treeState)) {
        // If within a folder, select the next child
        const parentState = treeState.items.get(currentItemState.parentId);
        if (parentState?.childrenIds && parentState.childrenIds.length > 0) {
            const currentItemIndexInParent = parentState.childrenIds.findIndex((childId) => childId === id) as number;
            const nextSiblingId = parentState.childrenIds[currentItemIndexInParent + 1] as string;
            return treeState.items.get(nextSiblingId);
        }
    } else if (currentItemState.parentId && isItemLastInParent(id, currentItemState.parentId, treeState)) {
        // If within a folder and last child, select the next sibling of parent
        const nextFirstItemId = getNextFirstItemIdInParent(id, treeState);
        if (nextFirstItemId) {
            const nextFirstItemState = treeState.items.get(nextFirstItemId);
            nextFirstItemState?.domElement?.focus();
        }
    }

    return undefined;
};

const isItemLastInParent = (id: string, parentId: string, treeState: TreeState): boolean => {
    const parentState = treeState.items.get(parentId);
    if (!parentState) {
        throw new Error(`Item with id ${parentId} is not a registered item.`);
    }

    return parentState.childrenIds?.at(-1) === id;
};

const getNextFirstItemIdInParent = (id: string, treeState: TreeState): string | undefined => {
    const currentItemState = treeState.items.get(id);
    if (!currentItemState) {
        throw new Error(`Item with id ${id} is not a registered item.`);
    }

    if (currentItemState.parentId) {
        const parentState = treeState.items.get(currentItemState.parentId);
        if (!parentState) {
            throw new Error(`Item with id ${currentItemState.parentId} is not a registered item.`);
        }

        if (parentState.parentId !== undefined) {
            const grandParentState = treeState.items.get(parentState.parentId);
            if (grandParentState && grandParentState.childrenIds) {
                const currentParentIndexInGrandParent: number = grandParentState.childrenIds.findIndex(
                    (childId) => childId === currentItemState.parentId,
                );
                const nextParentSiblingId: string = grandParentState.childrenIds[currentParentIndexInGrandParent + 1];

                if (!nextParentSiblingId) {
                    return getNextFirstItemIdInParent(currentItemState.parentId, treeState);
                }
                return nextParentSiblingId;
            }
        }
    }

    return undefined;
};
