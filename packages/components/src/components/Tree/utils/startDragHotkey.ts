/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HotkeyConfig } from '@headless-tree/core';

import { type TreeItemData } from '../types';

export const startDragHotkey: HotkeyConfig<TreeItemData> = {
    hotkey: 'Control+Shift+KeyD',
    isEnabled: (tree) => !tree.getState().dnd,
    handler: (_event, tree) => {
        const focused = tree.getFocusedItem();
        const selected = tree.getSelectedItems?.() ?? [];
        if (selected.includes(focused)) {
            tree.startKeyboardDrag(selected);
        } else {
            tree.startKeyboardDrag([focused]);
        }
    },
};
