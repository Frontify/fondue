/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DragTarget, type ItemInstance } from '@headless-tree/core';

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
 */
export const createCanDrop =
    ({ itemsById }: CanDropDeps) =>
    (draggedItems: ItemInstance<TreeItemData>[], target: DragTarget<TreeItemData>): boolean => {
        const targetData = itemsById.get(target.item.getId());
        if (!targetData?.isFolder || targetData.isDisabled) {
            return false;
        }

        const candidates = draggedItems.map(toCandidate);

        return targetData.accepts ? targetData.accepts(candidates) : true;
    };
