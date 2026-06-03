/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TreeItemData } from '../types';

/**
 * Returns a new `items` array with `draggedIds` removed from their original parents
 * and inserted under `targetParentId` at `insertIndex`. Pure: never mutates inputs.
 *
 * If the target parent does not exist, returns the original `items` unchanged.
 */
export const moveItems = (
    items: TreeItemData[],
    draggedIds: string[],
    targetParentId: string,
    insertIndex: number,
): TreeItemData[] => {
    const draggedSet = new Set(draggedIds);
    const hasTarget = items.some((item) => item.id === targetParentId);
    if (!hasTarget) {
        return items;
    }

    return items.map((item) => {
        if (item.id === targetParentId) {
            const filtered = (item.children ?? []).filter((id) => !draggedSet.has(id));
            const bounded = Math.min(Math.max(insertIndex, 0), filtered.length);
            return {
                ...item,
                children: [...filtered.slice(0, bounded), ...draggedIds, ...filtered.slice(bounded)],
            };
        }
        if (item.children && item.children.some((id) => draggedSet.has(id))) {
            return {
                ...item,
                children: item.children.filter((id) => !draggedSet.has(id)),
            };
        }
        if (draggedSet.has(item.id)) {
            return { ...item, parentId: targetParentId };
        }
        return item;
    });
};
