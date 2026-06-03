/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isOrderedDragTarget, type TreeInstance } from '@headless-tree/core';

import { type TreeItemData } from '../types';

/**
 * Returns `true` when the current drag target would land the dragged items at their
 * existing position — no parent change and no index change. Used to hide the drop
 * indicator while the cursor is just above or below the row being dragged, where
 * releasing wouldn't actually move anything.
 *
 * Only single-item drags are checked; multi-item drags conservatively return `false`
 * (the indicator stays visible).
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
