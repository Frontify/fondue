/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DraggableItem, DropZonePosition } from '@utilities/dnd/types';

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
            (index === 0 && item.sort === null) || // First item without a sort value
            (index < movedItemTargetIndex && item.sort === null) || // Previous item without a sort value
            index === movedItemTargetIndex || // Moved item
            (index > movedItemTargetIndex &&
                item.sort !== null &&
                previousItem &&
                previousItem.sort !== null &&
                item.sort <= previousItem.sort); // Following item with a sort prop lower than or equal to value on previousItem

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
    targetItem: DraggableItem<T>,
    sourceItem: DraggableItem<T>,
    position: DropZonePosition,
    items: DraggableItem<T>[],
): DraggableItem<T>[] => {
    const itemsClone = [...items];
    const sourceIndex = itemsClone.findIndex((item) => item.id === sourceItem.id);

    sourceIndex !== -1 && itemsClone.splice(sourceIndex, 1);

    let targetIndex = itemsClone.findIndex((item) => item.id === targetItem.id);
    targetIndex = position === DropZonePosition.After ? targetIndex + 1 : targetIndex;

    itemsClone.splice(targetIndex, 0, sourceItem);

    return updateItemsSort(itemsClone, targetIndex);
};
