/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DraggableItem } from '@utilities/dnd/types';

export const draggableItemCompareFn = <T extends object>(itemA: DraggableItem<T>, itemB: DraggableItem<T>): number => {
    if (itemA.sort === null && itemB.sort === null) {
        return 1;
    }
    if (itemA.sort === null) {
        return 1;
    }
    if (itemB.sort === null) {
        return -1;
    }

    return itemA.sort - itemB.sort;
};
