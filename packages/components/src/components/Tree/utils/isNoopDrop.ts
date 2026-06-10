/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isOrderedDragTarget, type TreeInstance } from '@headless-tree/core';

import { type TreeItemData } from '../types';

/**
 * `true` when the drop would land the dragged item at its existing position — used to
 * hide the drop indicator where releasing wouldn't move anything. Only single-item
 * drags are checked; multi-item drags conservatively return `false`.
 */
export const isNoopDrop = (tree: TreeInstance<TreeItemData>): boolean => {
    const target = tree.getDragTarget();
    const draggedItems = tree.getState().dnd?.draggedItems;
    if (!target || !isOrderedDragTarget(target) || !draggedItems || draggedItems.length !== 1) {
        return false;
    }
    const draggedItem = draggedItems[0];
    if (!draggedItem) {
        return false;
    }
    const draggedParent = draggedItem.getParent();
    if (!draggedParent || target.item.getId() !== draggedParent.getId()) {
        return false;
    }
    return target.insertionIndex === draggedItem.getIndexInParent();
};
