/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    syncDataLoaderFeature,
    selectionFeature,
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
import { useEffect, useMemo } from 'react';

import { type Item, type TreeChangeState } from '../types';
import { assembleTreeState, type FlatTreeState } from '../utils/assembleTreeState';

type UseTreeControllerOptions = {
    items: Item[];
    onChange?: (state: TreeChangeState) => void;
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

export const useTreeController = ({ items, onChange }: UseTreeControllerOptions): TreeInstance<Item> => {
    const expandedItems = items.filter((item) => item.isExpanded).map((item) => item.id);
    const selectedItems = items.filter((item) => item.isSelected).map((item) => item.id);
    const focusedItem = items.find((item) => item.isFocused)?.id;
    // Memoized so the reference is stable across renders unless content changes — otherwise
    // headless-tree sees "new state" every render and triggers an infinite loop.
    const treeState = useMemo<FlatTreeState>(
        () => ({ expandedItems, selectedItems, focusedItem }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [expandedItems.join('|'), selectedItems.join('|'), focusedItem],
    );

    const itemsById = new Map(items.map((item) => [item.id, item]));
    const emit = (next: FlatTreeState) => onChange?.(assembleTreeState(items, next, 'root'));

    const setExpandedItems = (updater: Updater<string[]>) => {
        const nextExpanded = resolveUpdater(updater, treeState.expandedItems);
        fireListDiff(treeState.expandedItems, nextExpanded, itemsById, (item) => item.onExpandChange);
        emit({ ...treeState, expandedItems: nextExpanded });
    };

    const setSelectedItems = (updater: Updater<string[]>) => {
        const nextSelected = resolveUpdater(updater, treeState.selectedItems);
        fireListDiff(treeState.selectedItems, nextSelected, itemsById, (item) => item.onSelectChange);
        emit({ ...treeState, selectedItems: nextSelected });
    };

    const setFocusedItem = (updater: Updater<string | null>) => {
        const nextFocused = resolveUpdater(updater, treeState.focusedItem ?? null);
        if (treeState.focusedItem !== nextFocused) {
            if (treeState.focusedItem) {
                itemsById.get(treeState.focusedItem)?.onFocusChange?.(false);
            }
            if (nextFocused) {
                itemsById.get(nextFocused)?.onFocusChange?.(true);
            }
        }
        emit({ ...treeState, focusedItem: nextFocused ?? undefined });
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
        canReorder: true,
        onDrop,
        dataLoader: {
            getItem: (itemId) => items.find((item) => item.id === itemId) as Item,
            getChildren: (itemId) => items.find((item) => item.id === itemId)?.children ?? [],
        },
        state: treeState,
        setExpandedItems,
        setSelectedItems,
        setFocusedItem,
        indent: 20,
        features: [
            syncDataLoaderFeature,
            selectionFeature,
            hotkeysCoreFeature,
            dragAndDropFeature,
            keyboardDragAndDropFeature,
        ],
    });

    useEffect(() => {
        tree.rebuildTree();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [structureKey]);

    return tree;
};
