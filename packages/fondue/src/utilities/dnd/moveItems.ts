/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CollisionPosition } from '@components/Tree';
import { DraggableItem } from '@utilities/dnd/types';

const isFirstItemWithoutSortValue = (index: number, sort: Nullable<number>) => index === 0 && sort === null;
const isPreviousItemWithoutSortValue = (index: number, movedItemTargetIndex: number, sort: Nullable<number>) =>
    index < movedItemTargetIndex && sort === null;
const isMovedItem = (index: number, movedItemTargetIndex: number) => index === movedItemTargetIndex;
const isFollowingItemWithSortLowerOrEqualToPreviousItem = (
    index: number,
    movedItemTargetIndex: number,
    sort: Nullable<number>,
    previousSort: Nullable<number>,
) => index > movedItemTargetIndex && sort !== null && previousSort !== null && sort <= previousSort;

const updateItemsSort = <T extends object>(
    items: DraggableItem<T>[], // nodes without the moved node
    movedItemTargetIndex: number,
): DraggableItem<T>[] => {
    const modifiedSameLevelArray: DraggableItem<T>[] = [];
    const changedItems: DraggableItem<T>[] = [];

    for (const [index, item] of items.entries()) {
        const previousItem = modifiedSameLevelArray[index - 1];
        let modifiedItem = { ...item };

        const shouldUpdate =
            isFirstItemWithoutSortValue(index, item.sort) ||
            isPreviousItemWithoutSortValue(index, movedItemTargetIndex, item.sort) ||
            isMovedItem(index, movedItemTargetIndex) ||
            isFollowingItemWithSortLowerOrEqualToPreviousItem(
                index,
                movedItemTargetIndex,
                item.sort,
                previousItem?.sort ?? null,
            );

        if (shouldUpdate) {
            const incrementedPreviousItemSort =
                previousItem && previousItem.sort !== null ? previousItem.sort + 1 : null;
            const updatedSortValue = index === 0 ? 0 : incrementedPreviousItemSort;

            modifiedItem = { ...item, sort: updatedSortValue };
            changedItems.push(modifiedItem);
        }

        modifiedSameLevelArray.push(modifiedItem);
        continue;
    }

    return changedItems;
};

export const moveItems = <T extends object>(
    targetItem: DraggableItem<T> | undefined,
    sourceItem: DraggableItem<T>,
    position: CollisionPosition,
    items: DraggableItem<T>[],
): DraggableItem<T>[] => {
    const itemsClone = [...items];
    const sourceIndex = itemsClone.findIndex((item) => item.id === sourceItem.id);

    sourceIndex !== -1 && itemsClone.splice(sourceIndex, 1);

    let targetIndex = itemsClone.findIndex((item) => item.id === targetItem?.id);
    targetIndex = position === 'after' ? targetIndex + 1 : targetIndex;

    itemsClone.splice(targetIndex, 0, sourceItem);

    return updateItemsSort(itemsClone, targetIndex);
};
