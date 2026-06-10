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
 * Builds headless-tree's `onDrop` handler: computes the next flat items via `moveItems`,
 * fires each dragged item's `onMove` with its new position, and emits `onChange`.
 * No-op when the target parent is missing (defensive against racy updates).
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
