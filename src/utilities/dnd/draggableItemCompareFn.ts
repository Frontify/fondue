/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DraggableItem } from "@utilities/dnd/types";

export const draggableItemCompareFn = (itemA: DraggableItem, itemB: DraggableItem): number => {
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
