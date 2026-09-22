/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HotkeyConfig } from '@headless-tree/core';

import { type TreeItemData } from '../types';

export const startDragHotkey: HotkeyConfig<TreeItemData> = {
    hotkey: 'Control+Shift+KeyD',
    preventDefault: true,
    isEnabled: (tree) => !tree.getState().dnd,
    handler: (_event, tree) => {
        const candidates = new Set(tree.getSelectedItems?.() ?? [tree.getFocusedItem()]);
        candidates.add(tree.getFocusedItem());
        const draggableItems = [...candidates].filter((item) => item.getItemData().isDraggable !== false);
        if (draggableItems.length === 0) {
            return;
        }
        tree.startKeyboardDrag(draggableItems);
    },
};
