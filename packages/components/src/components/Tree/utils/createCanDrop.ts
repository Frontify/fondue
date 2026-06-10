/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isOrderedDragTarget, type DragTarget, type ItemInstance } from '@headless-tree/core';

import { type TreeDropCandidate, type TreeItemData } from '../types';

const toCandidate = (item: ItemInstance<TreeItemData>): TreeDropCandidate => {
    const data = item.getItemData();
    return {
        id: data.id,
        label: data.name,
        isFolder: data.isFolder,
        tags: data.tags ?? [],
    };
};

type CanDropDeps = {
    itemsById: ReadonlyMap<string, TreeItemData>;
};

/**
 * Builds headless-tree's `canDrop` predicate: leaves and disabled folders reject all
 * drops; otherwise the target folder's `accepts` (if any) must approve every dragged item.
 *
 * Bypass guard: "after an expanded folder at the parent level" visually overlaps that
 * folder's body, so if the folder above (with visible children) would reject the items,
 * reject here too — its `accepts` can't be skirted by clipping the boundary.
 */
export const createCanDrop =
    ({ itemsById }: CanDropDeps) =>
    (draggedItems: ItemInstance<TreeItemData>[], target: DragTarget<TreeItemData>): boolean => {
        const targetData = itemsById.get(target.item.getId());
        if (!targetData?.isFolder || targetData.isDisabled) {
            return false;
        }

        const candidates = draggedItems.map(toCandidate);

        if (isOrderedDragTarget(target)) {
            const siblings = targetData.children ?? [];
            const aboveId = siblings[target.insertionIndex - 1];
            const above = aboveId ? itemsById.get(aboveId) : undefined;
            const aboveHasVisibleChildren = above?.isFolder && above.isExpanded && (above.children?.length ?? 0) > 0;
            if (aboveHasVisibleChildren && (above?.isDisabled || (above?.accepts && !above.accepts(candidates)))) {
                return false;
            }
        }

        return targetData.accepts ? targetData.accepts(candidates) : true;
    };
