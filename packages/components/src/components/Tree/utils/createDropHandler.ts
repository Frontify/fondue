/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isOrderedDragTarget, type DragTarget, type ItemInstance } from '@headless-tree/core';

import { type TreeChangeState, type TreeItemData } from '../types';

import { buildChangeState, type FlatTreeState } from './buildChangeState';
import { moveItems } from './moveItems';

type DropHandlerDeps = {
    items: TreeItemData[];
    itemsById: ReadonlyMap<string, TreeItemData>;
    treeState: FlatTreeState;
    rootId: string;
    onChange?: (state: TreeChangeState) => void;
};

/**
 * Builds the `onDrop` handler passed to headless-tree. Computes the next flat items array
 * via `moveItems`, fires each dragged item's own `onMove` with its new position, and
 * emits the assembled `TreeChangeState` via `onChange`.
 *
 * The handler is a no-op when the resolved target parent doesn't exist in the current
 * items map (defensive: shouldn't happen, but keeps the handler safe under racy updates).
 */
export const createDropHandler =
    ({ items, itemsById, treeState, rootId, onChange }: DropHandlerDeps) =>
    (draggedItems: ItemInstance<TreeItemData>[], target: DragTarget<TreeItemData>): void => {
        const targetParentId = target.item.getId();
        const targetParent = itemsById.get(targetParentId);
        if (!targetParent) {
            return;
        }

        const draggedIds = draggedItems.map((item) => item.getId());
        const currentChildren = targetParent.children ?? [];
        const insertIndex = isOrderedDragTarget(target) ? target.insertionIndex : currentChildren.length;
        const nextItems = moveItems(items, draggedIds, targetParentId, insertIndex);

        const nextChildren = nextItems.find((item) => item.id === targetParentId)?.children ?? [];
        for (const draggedId of draggedIds) {
            const item = itemsById.get(draggedId);
            const index = nextChildren.indexOf(draggedId);
            if (item?.onMove && index !== -1) {
                item.onMove({ parentId: targetParentId, index });
            }
        }

        onChange?.(buildChangeState(nextItems, treeState, rootId));
    };
