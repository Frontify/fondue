/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    syncDataLoaderFeature,
    checkboxesFeature,
    hotkeysCoreFeature,
    dragAndDropFeature,
    keyboardDragAndDropFeature,
    isOrderedDragTarget,
    type DragTarget,
    type ItemInstance,
    type TreeInstance,
    type Updater,
} from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { useEffect, useMemo, useState } from 'react';

import { type Item, type TreeChangeState } from '../types';
import { assembleTreeState, type FlatTreeState } from '../utils/assembleTreeState';

type UseTreeControllerOptions = {
    items: Item[];
    onChange?: (state: TreeChangeState) => void;
    reorderable?: boolean;
};

const resolveUpdater = <T>(updater: Updater<T>, prev: T): T =>
    typeof updater === 'function' ? (updater as (old: T) => T)(prev) : updater;

const fireListDiff = (
    prev: string[],
    next: string[],
    itemsById: Map<string, Item>,
    getHandler: (item: Item) => ((value: boolean) => void) | undefined,
) => {
    const prevSet = new Set(prev);
    const nextSet = new Set(next);
    for (const id of nextSet) {
        if (!prevSet.has(id)) {
            getHandler(itemsById.get(id) as Item)?.(true);
        }
    }
    for (const id of prevSet) {
        if (!nextSet.has(id)) {
            getHandler(itemsById.get(id) as Item)?.(false);
        }
    }
};

export const useTreeController = ({
    items,
    onChange,
    reorderable = false,
}: UseTreeControllerOptions): TreeInstance<Item> => {
    const expandedItems = items.filter((item) => item.isExpanded).map((item) => item.id);
    const checkedItems = items.filter((item) => item.isSelected).map((item) => item.id);
    // Focus is tracked internally only — headless-tree's TreeFeatureDef requires it in state
    // for keyboard navigation, but consumers don't see it via onChange or the public types.
    // Initialized to the first non-root item so that item gets `tabIndex=0` on mount —
    // otherwise the roving tabindex pattern leaves every row at `-1` and the tree is
    // skipped by Tab, blocking keyboard navigation.
    const [focusedItem, setInternalFocusedItem] = useState<string | undefined>(
        () => items.find((item) => item.id !== 'root')?.id,
    );
    // Memoized so the reference is stable across renders unless content changes — otherwise
    // headless-tree sees "new state" every render and triggers an infinite loop.
    const treeState = useMemo<FlatTreeState>(
        () => ({ expandedItems, checkedItems, focusedItem }),

        [expandedItems.join('|'), checkedItems.join('|'), focusedItem],
    );

    const itemsById = new Map(items.map((item) => [item.id, item]));

    // Headless-tree may fire multiple setters within a single user event (e.g. a row
    // click triggers both setSelectedItems and setFocusedItem). Each setter must build
    // on the previous one's changes — using `treeState` directly would make the second
    // emit overwrite the first because React hasn't re-rendered yet. Threading a shared
    // `pendingState` through them composes the changes correctly.
    let pendingState: FlatTreeState = treeState;
    const emit = (next: FlatTreeState) => {
        pendingState = next;
        onChange?.(assembleTreeState(items, next, 'root'));
    };

    const setExpandedItems = (updater: Updater<string[]>) => {
        const nextExpanded = resolveUpdater(updater, pendingState.expandedItems);
        fireListDiff(pendingState.expandedItems, nextExpanded, itemsById, (item) => item.onExpandChange);
        emit({ ...pendingState, expandedItems: nextExpanded });
    };

    const setCheckedItems = (updater: Updater<string[]>) => {
        const nextChecked = resolveUpdater(updater, pendingState.checkedItems);
        fireListDiff(pendingState.checkedItems, nextChecked, itemsById, (item) => item.onSelectChange);
        emit({ ...pendingState, checkedItems: nextChecked });
    };

    const setFocusedItem = (updater: Updater<string | null>) => {
        const nextFocused = resolveUpdater(updater, pendingState.focusedItem ?? null) ?? undefined;
        pendingState = { ...pendingState, focusedItem: nextFocused };
        setInternalFocusedItem(nextFocused);
    };

    const onDrop = (draggedItems: ItemInstance<Item>[], target: DragTarget<Item>) => {
        const draggedIds = draggedItems.map((item) => item.getId());

        const cloned: Item[] = items.map((item) => ({
            ...item,
            children: item.children ? [...item.children] : undefined,
        }));
        const clonedById = new Map(cloned.map((item) => [item.id, item]));

        for (const id of draggedIds) {
            const item = clonedById.get(id);
            const parent = item?.parentId ? clonedById.get(item.parentId) : undefined;
            if (parent?.children) {
                parent.children = parent.children.filter((c) => c !== id);
            }
        }

        const targetParentId = target.item.getId();
        const targetParent = clonedById.get(targetParentId);
        if (!targetParent) {
            return;
        }
        if (!targetParent.children) {
            targetParent.children = [];
        }

        const insertIndex = isOrderedDragTarget(target) ? target.insertionIndex : targetParent.children.length;
        targetParent.children = [
            ...targetParent.children.slice(0, insertIndex),
            ...draggedIds,
            ...targetParent.children.slice(insertIndex),
        ];

        for (const id of draggedIds) {
            const item = clonedById.get(id);
            if (item) {
                item.parentId = targetParentId;
            }
        }

        onChange?.(assembleTreeState(cloned, treeState, 'root'));
    };

    const structureKey = items
        .map((item) => `${item.id}:${item.parentId ?? ''}>${(item.children ?? []).join(',')}`)
        .join('|');

    const tree = useTree<Item>({
        rootItemId: 'root',
        getItemName: (item) => item.getItemData().name,
        isItemFolder: (item) => Boolean(item.getItemData().isFolder),
        canReorder: reorderable,
        onDrop: reorderable ? onDrop : undefined,
        dataLoader: {
            getItem: (itemId) => items.find((item) => item.id === itemId) as Item,
            getChildren: (itemId) => items.find((item) => item.id === itemId)?.children ?? [],
        },
        state: treeState,
        setExpandedItems,
        setCheckedItems,
        setFocusedItem,
        canCheckFolders: true,
        propagateCheckedState: true,
        indent: 20,
        features: [
            syncDataLoaderFeature,
            checkboxesFeature,
            hotkeysCoreFeature,
            ...(reorderable ? [dragAndDropFeature, keyboardDragAndDropFeature] : []),
        ],
    });

    useEffect(() => {
        tree.rebuildTree();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [structureKey]);

    return tree;
};
