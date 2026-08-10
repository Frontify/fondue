/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DragTarget, type ItemInstance } from '@headless-tree/core';
import { describe, expect, it, vi } from 'vitest';

import { ROOT_ID } from '../constants';
import { type TreeChangeState, type TreeItemData, type TreeMoveInfo } from '../types';

import { type FlatTreeState } from './buildChangeState';
import { createDropHandler } from './createDropHandler';

const makeDragged = (id: string): ItemInstance<TreeItemData> =>
    ({ getId: () => id }) as unknown as ItemInstance<TreeItemData>;

const makeOrderedTarget = (parentId: string, insertionIndex: number): DragTarget<TreeItemData> =>
    ({
        item: { getId: () => parentId },
        // `childIndex` is the discriminator used by `isOrderedDragTarget`.
        childIndex: insertionIndex,
        insertionIndex,
        dragLineIndex: insertionIndex,
    }) as unknown as DragTarget<TreeItemData>;

const emptyState: FlatTreeState = { expandedItems: [], checkedItems: [] };

describe('createDropHandler', () => {
    it('is a no-op when the target parent is unknown', () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const handler = createDropHandler({
            items: [],
            itemsById: new Map(),
            treeState: emptyState,
            rootId: ROOT_ID,
            onChange,
        });

        handler([makeDragged('x')], makeOrderedTarget('missing', 0));
        expect(onChange).not.toHaveBeenCalled();
    });

    it('emits onChange with the moved item under the new parent', () => {
        const items: TreeItemData[] = [
            { id: ROOT_ID, name: 'Root', isFolder: true, children: ['a', 'folder'] },
            { id: 'a', name: 'A', isFolder: false, parentId: ROOT_ID },
            { id: 'folder', name: 'Folder', isFolder: true, parentId: ROOT_ID, children: [] },
        ];
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const handler = createDropHandler({
            items,
            itemsById: new Map(items.map((item) => [item.id, item])),
            treeState: emptyState,
            rootId: ROOT_ID,
            onChange,
        });

        handler([makeDragged('a')], makeOrderedTarget('folder', 0));

        expect(onChange).toHaveBeenCalledTimes(1);
        const next = onChange.mock.calls[0]?.[0] ?? [];
        const folder = next.find((node) => node.id === 'folder');
        expect(folder?.isFolder && folder.children?.map((child) => child.id)).toEqual(['a']);
    });

    it('fires onMove on the dragged item with its new parent and index', () => {
        const onMove = vi.fn<(info: TreeMoveInfo) => void>();
        const items: TreeItemData[] = [
            { id: ROOT_ID, name: 'Root', isFolder: true, children: ['a', 'folder'] },
            { id: 'a', name: 'A', isFolder: false, parentId: ROOT_ID, onMove },
            { id: 'folder', name: 'Folder', isFolder: true, parentId: ROOT_ID, children: ['x'] },
            { id: 'x', name: 'X', isFolder: false, parentId: 'folder' },
        ];
        const handler = createDropHandler({
            items,
            itemsById: new Map(items.map((item) => [item.id, item])),
            treeState: emptyState,
            rootId: ROOT_ID,
        });

        handler([makeDragged('a')], makeOrderedTarget('folder', 1));

        expect(onMove).toHaveBeenCalledWith({ parentId: 'folder', index: 1 });
    });

    it('fires onMove for each dragged item with its own resolved index', () => {
        const onMoveA = vi.fn<(info: TreeMoveInfo) => void>();
        const onMoveB = vi.fn<(info: TreeMoveInfo) => void>();
        const items: TreeItemData[] = [
            { id: ROOT_ID, name: 'Root', isFolder: true, children: ['a', 'b', 'folder'] },
            { id: 'a', name: 'A', isFolder: false, parentId: ROOT_ID, onMove: onMoveA },
            { id: 'b', name: 'B', isFolder: false, parentId: ROOT_ID, onMove: onMoveB },
            { id: 'folder', name: 'Folder', isFolder: true, parentId: ROOT_ID, children: [] },
        ];
        const handler = createDropHandler({
            items,
            itemsById: new Map(items.map((item) => [item.id, item])),
            treeState: emptyState,
            rootId: ROOT_ID,
        });

        handler([makeDragged('a'), makeDragged('b')], makeOrderedTarget('folder', 0));

        expect(onMoveA).toHaveBeenCalledWith({ parentId: 'folder', index: 0 });
        expect(onMoveB).toHaveBeenCalledWith({ parentId: 'folder', index: 1 });
    });
});
