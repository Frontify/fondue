/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DragTarget, type ItemInstance } from '@headless-tree/core';
import { describe, expect, it, vi } from 'vitest';

import { type TreeDropCandidate, type TreeItemData } from '../types';

import { createCanDrop } from './createCanDrop';

const makeDragged = (data: TreeItemData): ItemInstance<TreeItemData> =>
    ({
        getId: () => data.id,
        getItemData: () => data,
    }) as unknown as ItemInstance<TreeItemData>;

const makeOrderedTarget = (parentId: string, insertionIndex: number): DragTarget<TreeItemData> =>
    ({
        item: { getId: () => parentId },
        // `childIndex` is the discriminator used by `isOrderedDragTarget`.
        childIndex: insertionIndex,
        insertionIndex,
        dragLineIndex: insertionIndex,
    }) as unknown as DragTarget<TreeItemData>;

const makeUnorderedTarget = (parentId: string): DragTarget<TreeItemData> =>
    ({
        item: { getId: () => parentId },
    }) as unknown as DragTarget<TreeItemData>;

const indexById = (items: TreeItemData[]): ReadonlyMap<string, TreeItemData> =>
    new Map(items.map((item) => [item.id, item]));

const draggedLeaf: TreeItemData = { id: 'd', name: 'D', isFolder: false };

describe('createCanDrop', () => {
    it('rejects drops onto a leaf item', () => {
        const canDrop = createCanDrop({
            itemsById: indexById([{ id: 'leaf', name: 'Leaf', isFolder: false }, draggedLeaf]),
        });
        expect(canDrop([makeDragged(draggedLeaf)], makeUnorderedTarget('leaf'))).toBe(false);
    });

    it('accepts when the target folder has no `accepts` predicate', () => {
        const canDrop = createCanDrop({
            itemsById: indexById([{ id: 'folder', name: 'Folder', isFolder: true, children: [] }, draggedLeaf]),
        });
        expect(canDrop([makeDragged(draggedLeaf)], makeUnorderedTarget('folder'))).toBe(true);
    });

    it('delegates to the folder `accepts` predicate when present', () => {
        const accepts = vi.fn<(items: TreeDropCandidate[]) => boolean>().mockReturnValue(true);
        const canDrop = createCanDrop({
            itemsById: indexById([
                { id: 'folder', name: 'Folder', isFolder: true, children: [], accepts },
                draggedLeaf,
            ]),
        });

        const result = canDrop([makeDragged(draggedLeaf)], makeUnorderedTarget('folder'));

        expect(result).toBe(true);
        expect(accepts).toHaveBeenCalledTimes(1);
        expect(accepts.mock.calls[0]?.[0]?.[0]).toMatchObject({ id: 'd', isFolder: false });
    });

    it('rejects when the folder `accepts` predicate returns false', () => {
        const canDrop = createCanDrop({
            itemsById: indexById([
                { id: 'folder', name: 'Folder', isFolder: true, children: [], accepts: () => false },
                draggedLeaf,
            ]),
        });
        expect(canDrop([makeDragged(draggedLeaf)], makeUnorderedTarget('folder'))).toBe(false);
    });

    it('rejects drops into a disabled folder even without an `accepts` predicate', () => {
        const canDrop = createCanDrop({
            itemsById: indexById([
                { id: 'folder', name: 'Folder', isFolder: true, children: [], isDisabled: true },
                draggedLeaf,
            ]),
        });
        expect(canDrop([makeDragged(draggedLeaf)], makeUnorderedTarget('folder'))).toBe(false);
    });

    it('allows an ordered drop right after an expanded, rejecting folder', () => {
        // siblings of "parent" = [restricted, ...]; insertionIndex 1 sits right after it.
        const canDrop = createCanDrop({
            itemsById: indexById([
                { id: 'parent', name: 'Parent', isFolder: true, children: ['restricted'] },
                {
                    id: 'restricted',
                    name: 'Restricted',
                    isFolder: true,
                    isExpanded: true,
                    children: ['restricted-child'],
                    accepts: () => false,
                },
                { id: 'restricted-child', name: 'RC', isFolder: false, parentId: 'restricted' },
                draggedLeaf,
            ]),
        });
        expect(canDrop([makeDragged(draggedLeaf)], makeOrderedTarget('parent', 1))).toBe(true);
    });

    it('allows an ordered drop right before an expanded, rejecting folder', () => {
        // siblings of "parent" = [restricted, ...]; insertionIndex 0 sits right before it.
        const canDrop = createCanDrop({
            itemsById: indexById([
                { id: 'parent', name: 'Parent', isFolder: true, children: ['restricted'] },
                {
                    id: 'restricted',
                    name: 'Restricted',
                    isFolder: true,
                    isExpanded: true,
                    children: ['restricted-child'],
                    accepts: () => false,
                },
                { id: 'restricted-child', name: 'RC', isFolder: false, parentId: 'restricted' },
                draggedLeaf,
            ]),
        });
        expect(canDrop([makeDragged(draggedLeaf)], makeOrderedTarget('parent', 0))).toBe(true);
    });

    it('still rejects an unordered drop into the rejecting folder itself', () => {
        const canDrop = createCanDrop({
            itemsById: indexById([
                { id: 'parent', name: 'Parent', isFolder: true, children: ['restricted'] },
                {
                    id: 'restricted',
                    name: 'Restricted',
                    isFolder: true,
                    isExpanded: true,
                    children: ['restricted-child'],
                    accepts: () => false,
                },
                { id: 'restricted-child', name: 'RC', isFolder: false, parentId: 'restricted' },
                draggedLeaf,
            ]),
        });
        expect(canDrop([makeDragged(draggedLeaf)], makeUnorderedTarget('restricted'))).toBe(false);
    });
});
