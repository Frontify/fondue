/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ItemInstance, type TreeInstance } from '@headless-tree/core';
import { describe, expect, it, vi } from 'vitest';

import { type TreeItemData } from '../types';

import { startDragHotkey } from './startDragHotkey';

const makeItem = (id: string, isDraggable?: boolean): ItemInstance<TreeItemData> =>
    ({
        getId: () => id,
        getItemData: () => ({ id, name: id, isFolder: false, isDraggable }),
    }) as unknown as ItemInstance<TreeItemData>;

const startDrag = (selectedItems: ItemInstance<TreeItemData>[], focusedItem: ItemInstance<TreeItemData>) => {
    const startKeyboardDrag = vi.fn<(items: ItemInstance<TreeItemData>[]) => void>();
    const tree = {
        getSelectedItems: () => selectedItems,
        getFocusedItem: () => focusedItem,
        startKeyboardDrag,
    } as unknown as TreeInstance<TreeItemData>;
    startDragHotkey.handler(new KeyboardEvent('keydown'), tree);
    const draggedItems = startKeyboardDrag.mock.calls[0]?.[0];
    return {
        wasCalled: startKeyboardDrag.mock.calls.length > 0,
        draggedIds: draggedItems?.map((item) => item.getId()),
    };
};

describe('startDragHotkey', () => {
    it('drags the selection plus the focused item', () => {
        expect(startDrag([makeItem('a')], makeItem('b')).draggedIds).toEqual(['a', 'b']);
    });

    it('lists an already selected focused item once', () => {
        const focused = makeItem('a');
        expect(startDrag([focused], focused).draggedIds).toEqual(['a']);
    });

    it('drops items with isDraggable false from the dragged set', () => {
        expect(startDrag([makeItem('a', false)], makeItem('b')).draggedIds).toEqual(['b']);
    });

    it('starts no drag when every candidate has isDraggable false', () => {
        const focused = makeItem('a', false);
        expect(startDrag([focused], focused).wasCalled).toBe(false);
    });
});
