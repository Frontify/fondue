/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DragTarget, type ItemInstance, type TreeInstance } from '@headless-tree/core';
import { describe, expect, it } from 'vitest';

import { type TreeItemData } from '../types';

import { isNoopDrop } from './isNoopDrop';

/**
 * `isNoopDrop` reads from a `TreeInstance`. We only need a thin stub that exposes the
 * accessors the function actually touches: `getDragTarget`, `getState().dnd`. The
 * dragged item itself needs `getParent` + `getIndexInParent`.
 */

type StubArgs = {
    target: DragTarget<TreeItemData> | null;
    draggedItems?: ItemInstance<TreeItemData>[];
};

const makeTree = ({ target, draggedItems }: StubArgs): TreeInstance<TreeItemData> =>
    ({
        getDragTarget: () => target,
        getState: () => ({ dnd: draggedItems ? { draggedItems } : undefined }),
    }) as unknown as TreeInstance<TreeItemData>;

const makeDraggedItem = (parentId: string, indexInParent: number): ItemInstance<TreeItemData> =>
    ({
        getParent: () => ({ getId: () => parentId }),
        getIndexInParent: () => indexInParent,
    }) as unknown as ItemInstance<TreeItemData>;

const makeOrderedTarget = (parentId: string, insertionIndex: number): DragTarget<TreeItemData> =>
    ({
        item: { getId: () => parentId },
        // `childIndex` is the discriminator used by `isOrderedDragTarget`.
        childIndex: insertionIndex,
        insertionIndex,
        dragLineIndex: insertionIndex,
    }) as unknown as DragTarget<TreeItemData>;

describe('isNoopDrop', () => {
    it('returns false when there is no current drag target', () => {
        expect(isNoopDrop(makeTree({ target: null }))).toBe(false);
    });

    it('returns false for multi-item drags (conservatively keeps the indicator visible)', () => {
        const tree = makeTree({
            target: makeOrderedTarget('parent', 1),
            draggedItems: [makeDraggedItem('parent', 0), makeDraggedItem('parent', 2)],
        });
        expect(isNoopDrop(tree)).toBe(false);
    });

    it('returns false when the drop would change the parent', () => {
        const tree = makeTree({
            target: makeOrderedTarget('different-parent', 0),
            draggedItems: [makeDraggedItem('parent', 0)],
        });
        expect(isNoopDrop(tree)).toBe(false);
    });

    it("returns true when the drop would land at the dragged item's current position", () => {
        const tree = makeTree({
            target: makeOrderedTarget('parent', 2),
            draggedItems: [makeDraggedItem('parent', 2)],
        });
        expect(isNoopDrop(tree)).toBe(true);
    });

    it('returns false when the insertion index differs from the dragged index', () => {
        const tree = makeTree({
            target: makeOrderedTarget('parent', 3),
            draggedItems: [makeDraggedItem('parent', 1)],
        });
        expect(isNoopDrop(tree)).toBe(false);
    });
});
