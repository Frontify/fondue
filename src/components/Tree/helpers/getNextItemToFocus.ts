/* (c) Copyright Frontify Ltd., all rights reserved. */

import { UniqueIdentifier } from '@dnd-kit/core';
import type { TreeItemState, TreeState } from '../types';

export const getNextItemToFocus = (
    id: UniqueIdentifier,
    currentItemState: TreeItemState | undefined,
    treeState: TreeState,
): TreeItemState | undefined => {
    if (treeState.expandedIds.has(id) && currentItemState?.childrenIds && currentItemState.childrenIds.length > 0) {
        // If expanded folder, select the first child
        const firstChildId = currentItemState.childrenIds[0];
        const firstChildState = treeState.items.get(firstChildId);
        if (!firstChildState) {
            throw new Error(`Item with id ${firstChildId} is not a registered item.`);
        }

        return firstChildState;
    } else if (currentItemState?.parentId) {
        // If within a folder, select the next sibling
        const nextFirstItemId = getNextFirstItemIdInParent(id, treeState);

        if (nextFirstItemId !== undefined) {
            const nextFirstItemState = treeState.items.get(nextFirstItemId);
            nextFirstItemState?.domElement?.focus();
        }
    }

    return undefined;
};

const isItemLastInParent = (id: UniqueIdentifier, parentId: UniqueIdentifier, treeState: TreeState): boolean => {
    const parentState = treeState.items.get(parentId);
    if (!parentState) {
        throw new Error(`Item with id ${parentId} is not a registered item.`);
    }

    return parentState.childrenIds?.at(-1) === id;
};

const getNextFirstItemIdInParent = (id: UniqueIdentifier, treeState: TreeState): UniqueIdentifier | undefined => {
    const currentItemState = treeState.items.get(id);
    if (!currentItemState) {
        throw new Error(`Item with id ${id} is not a registered item.`);
    }

    if (currentItemState.parentId !== undefined) {
        const parentState = treeState.items.get(currentItemState.parentId);
        if (!parentState) {
            throw new Error(`Item with id ${currentItemState.parentId} is not a registered item.`);
        }

        if (parentState && parentState.childrenIds && parentState.childrenIds.length > 0) {
            if (isItemLastInParent(id, currentItemState.parentId, treeState)) {
                return getNextFirstItemIdInParent(currentItemState.parentId, treeState);
            } else {
                const currentItemIndexInParent = parentState.childrenIds.findIndex((childId) => childId === id);
                return parentState.childrenIds[currentItemIndexInParent + 1];
            }
        }
    }

    return undefined;
};
