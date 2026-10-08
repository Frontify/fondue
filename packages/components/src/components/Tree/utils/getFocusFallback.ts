/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ROOT_ID } from '../constants';
import { type TreeItemData } from '../types';

/** Ids of the rows on screen, in screen order; collapsed folders hide their whole subtree. */
export const getVisibleIds = (items: readonly TreeItemData[]): string[] => {
    const itemsById = new Map(items.map((item) => [item.id, item]));
    const visibleIds: string[] = [];
    const visit = (ids: readonly string[]) => {
        for (const id of ids) {
            const item = itemsById.get(id);
            if (!item) {
                continue;
            }
            visibleIds.push(id);
            if (item.isExpanded) {
                visit(item.children ?? []);
            }
        }
    };
    visit(items.filter((item) => !item.parentId || item.parentId === ROOT_ID).map((item) => item.id));
    return visibleIds;
};

/** Hidden by a collapse: the collapsed folder, as Left Arrow would. Removed: next visible row, else previous. */
export const getFocusFallback = (
    focusedId: string | undefined,
    previousItems: readonly TreeItemData[],
    items: readonly TreeItemData[],
): string | undefined => {
    if (focusedId === undefined) {
        return undefined;
    }
    const visibleIds = new Set(getVisibleIds(items));
    if (visibleIds.has(focusedId)) {
        return focusedId;
    }

    // A collapsed nearest visible ancestor means hidden, not removed; removed rows only know their old parent.
    const itemsById = new Map(items.map((item) => [item.id, item]));
    const previousItemsById = new Map(previousItems.map((item) => [item.id, item]));
    const getParentId = (id: string) => (itemsById.get(id) ?? previousItemsById.get(id))?.parentId;
    let ancestorId = getParentId(focusedId);
    while (ancestorId && ancestorId !== ROOT_ID && !visibleIds.has(ancestorId)) {
        ancestorId = getParentId(ancestorId);
    }
    if (ancestorId && visibleIds.has(ancestorId) && !itemsById.get(ancestorId)?.isExpanded) {
        return ancestorId;
    }

    const previousVisibleIds = getVisibleIds(previousItems);
    const focusedIndex = previousVisibleIds.indexOf(focusedId);
    const isVisible = (id: string) => visibleIds.has(id);
    return (
        previousVisibleIds.slice(focusedIndex + 1).find(isVisible) ??
        previousVisibleIds.slice(0, Math.max(focusedIndex, 0)).reverse().find(isVisible)
    );
};
