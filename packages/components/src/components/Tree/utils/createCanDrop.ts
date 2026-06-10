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
 * Builds the `canDrop` predicate passed to headless-tree's drag-and-drop feature. Two
 * rules combine here:
 *
 * 1. Drops onto a leaf item are always rejected — items don't have children.
 * 2. Disabled folders reject all drops — their contents are frozen.
 * 3. The target folder's `accepts` predicate (if any) must approve every dragged item.
 *
 * Bypass-loophole guard: at the outer indent immediately below an expanded folder's
 * header, headless-tree resolves the target to "after that folder at the parent level"
 * — visually it sits inside the folder's body. If the folder above would reject the
 * items, we also reject here so users can't sneak past its `accepts` by clipping the
 * boundary. Only fires when the folder has visible children (otherwise there's no
 * visual overlap to disambiguate).
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
