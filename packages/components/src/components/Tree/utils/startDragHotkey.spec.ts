/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ItemInstance, type TreeInstance } from '@headless-tree/core';
import { describe, expect, it, vi } from 'vitest';

import { type TreeItemData } from '../types';

import { startDragHotkey } from './startDragHotkey';

const makeItem = (id: string): ItemInstance<TreeItemData> =>
    ({
        getId: () => id,
        getItemData: () => ({ id, name: id, isFolder: false }),
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
    it('drags the selection when the focused item is in it', () => {
        const focused = makeItem('b');
        expect(startDrag([makeItem('a'), focused], focused).draggedIds).toEqual(['a', 'b']);
    });
});
