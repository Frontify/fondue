/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ItemInstance } from '@headless-tree/core';

import { type TreeItemData } from '../types';

export const isDraggableItem = (item: ItemInstance<TreeItemData>): boolean => {
    const data = item.getItemData();
    if (data.isDisabled) {
        return false;
    }
    return data.isDraggable !== false;
};

export const canDragItems = (items: ItemInstance<TreeItemData>[]): boolean => items.every(isDraggableItem);
