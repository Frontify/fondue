/* (c) Copyright Frontify Ltd., all rights reserved. */

import { UniqueIdentifier } from '@dnd-kit/core';
import type { TreeItemState, TreeState } from '../types';

export const getPreviousItemToFocus = (
    id: UniqueIdentifier,
    currentItemState: TreeItemState | undefined,
    treeState: TreeState,
): TreeItemState | undefined => {
    if (currentItemState?.parentId && !isItemFirstInParent(id, currentItemState.parentId, treeState)) {
        // If within a folder, select the previous child
        const parentState = treeState.items.get(currentItemState.parentId);
        if (parentState && parentState.childrenIds) {
            const currentItemIndexInParent = parentState.childrenIds.findIndex((childId) => childId === id) as number;
            const previousSiblingId = parentState.childrenIds[currentItemIndexInParent - 1] as string;
            if (treeState.expandedIds.has(previousSiblingId)) {
                const previousSiblingLastItemIdToFocus = getLastNestedItemIdInParent(previousSiblingId, treeState);
                return treeState.items.get(previousSiblingLastItemIdToFocus);
            }

            return treeState.items.get(previousSiblingId);
        }
    } else if (currentItemState?.parentId && isItemFirstInParent(id, currentItemState.parentId, treeState)) {
        // If within a folder and first child, select the parent
        return treeState.items.get(currentItemState.parentId);
    }

    return undefined;
};

const isItemFirstInParent = (id: UniqueIdentifier, parentId: UniqueIdentifier, treeState: TreeState): boolean => {
    const parentState = treeState.items.get(parentId);
    if (!parentState) {
        throw new Error(`Item with id ${parentId} is not a registered item.`);
    }

    return parentState.childrenIds?.[0] === id;
};

const getLastNestedItemIdInParent = (parentId: UniqueIdentifier, treeState: TreeState): UniqueIdentifier => {
    const parentState = treeState.items.get(parentId);
    if (!parentState) {
        throw new Error(`Item with id ${parentId} is not a registered item.`);
    }

    if (parentState.childrenIds && parentState.childrenIds.length > 0) {
        const lastChildId = parentState.childrenIds.at(-1) as string;
        if (lastChildId && treeState.expandedIds.has(lastChildId)) {
            return getLastNestedItemIdInParent(lastChildId, treeState);
        }

        return lastChildId;
    }

    return parentId;
};
