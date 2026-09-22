/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ItemInstance } from '@headless-tree/core';
import { describe, expect, it } from 'vitest';

import { type TreeItemData } from '../types';

import { canDragItems } from './canDragItems';

const makeItem = (data: Partial<TreeItemData>): ItemInstance<TreeItemData> =>
    ({
        getItemData: () => ({ id: 'x', name: 'X', isFolder: false, ...data }),
    }) as unknown as ItemInstance<TreeItemData>;

describe('canDragItems', () => {
    it('allows items that set no draggable flag', () => {
        expect(canDragItems([makeItem({}), makeItem({ isDraggable: true })])).toBe(true);
    });

    it('rejects a set holding an item with isDraggable false', () => {
        expect(canDragItems([makeItem({}), makeItem({ isDraggable: false })])).toBe(false);
    });

    it('rejects a set holding a disabled item', () => {
        expect(canDragItems([makeItem({ isDisabled: true })])).toBe(false);
    });

    it('allows an empty set', () => {
        expect(canDragItems([])).toBe(true);
    });
});
