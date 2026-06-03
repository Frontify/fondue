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

import { type TreeChangeState, type TreeItemData } from '../types';
import { assembleTreeState, type FlatTreeState } from '../utils/assembleTreeState';
import { diffSelection } from '../utils/diffSelection';
import { getStructureKey } from '../utils/getStructureKey';
import { moveItems } from '../utils/moveItems';

const ROOT_ID = 'root';
const ROOT_NAME = 'Root';

type UseTreeControllerOptions = {
    items: TreeItemData[];
    onChange?: (state: TreeChangeState) => void;
    reorderable?: boolean;
};

const resolveUpdater = <T>(updater: Updater<T>, prev: T): T =>
    typeof updater === 'function' ? (updater as (old: T) => T)(prev) : updater;

export const useTreeController = ({
    items,
    onChange,
    reorderable = false,
}: UseTreeControllerOptions): TreeInstance<TreeItemData> => {
    // Headless-tree requires a root item; build it here so the consumer never sees
    // it and `assembleTreeState` can use `parent.children` as the single source of
    // truth for ordering.
    const itemsWithRoot = useMemo<TreeItemData[]>(
        () => [
            {
                id: ROOT_ID,
                name: ROOT_NAME,
                isFolder: true,
                children: items.filter((item) => !item.parentId || item.parentId === ROOT_ID).map((item) => item.id),
            },
            ...items,
        ],
        [items],
    );

    const structureKey = useMemo(() => getStructureKey(itemsWithRoot), [itemsWithRoot]);
    const itemsById = useMemo(() => new Map(itemsWithRoot.map((item) => [item.id, item])), [itemsWithRoot]);

    const expandedItems = useMemo(
        () => itemsWithRoot.filter((item) => item.isExpanded).map((item) => item.id),
        [itemsWithRoot],
    );
    const checkedItems = useMemo(
        () => itemsWithRoot.filter((item) => item.isSelected).map((item) => item.id),
        [itemsWithRoot],
    );

    // Focus is tracked internally only — headless-tree's TreeFeatureDef requires it in state
    // for keyboard navigation, but consumers don't see it via `onChange`. Initialized to the
    // first non-root item so the row gets `tabIndex=0` on mount; without it, the roving
    // tabindex pattern leaves every row at `-1` and the tree is skipped by Tab.
    const [internalFocusedItem, setInternalFocusedItem] = useState<string | undefined>(() => items[0]?.id);

    const treeState = useMemo<FlatTreeState>(
        () => ({ expandedItems, checkedItems, focusedItem: internalFocusedItem }),
        [expandedItems, checkedItems, internalFocusedItem],
    );

    // Headless-tree may fire multiple setters within a single user event (e.g. a row
    // click triggers both setSelectedItems and setFocusedItem). Each setter must build
    // on the previous one's changes — using `treeState` directly would make the second
    // emit overwrite the first because React hasn't re-rendered yet. Threading a shared
    // `pendingState` through them composes the changes correctly.
    let pendingState: FlatTreeState = treeState;
    const emit = (next: FlatTreeState) => {
        pendingState = next;
        onChange?.(assembleTreeState(itemsWithRoot, next, ROOT_ID));
    };

    const fireDiff = (
        prev: string[],
        next: string[],
        getHandler: (item: TreeItemData) => ((value: boolean) => void) | undefined,
    ) => {
        const { added, removed } = diffSelection(prev, next);
        for (const id of added) {
            const item = itemsById.get(id);
            if (item) {
                getHandler(item)?.(true);
            }
        }
        for (const id of removed) {
            const item = itemsById.get(id);
            if (item) {
                getHandler(item)?.(false);
            }
        }
    };

    const setExpandedItems = (updater: Updater<string[]>) => {
        const nextExpanded = resolveUpdater(updater, pendingState.expandedItems);
        fireDiff(pendingState.expandedItems, nextExpanded, (item) => item.onExpandChange);
        emit({ ...pendingState, expandedItems: nextExpanded });
    };

    const setCheckedItems = (updater: Updater<string[]>) => {
        const nextChecked = resolveUpdater(updater, pendingState.checkedItems);
        fireDiff(pendingState.checkedItems, nextChecked, (item) => item.onSelectChange);
        emit({ ...pendingState, checkedItems: nextChecked });
    };

    const setFocusedItem = (updater: Updater<string | null>) => {
        const next = resolveUpdater(updater, pendingState.focusedItem ?? null) ?? undefined;
        pendingState = { ...pendingState, focusedItem: next };
        setInternalFocusedItem(next);
    };

    const onDrop = (draggedItems: ItemInstance<TreeItemData>[], target: DragTarget<TreeItemData>) => {
        const draggedIds = draggedItems.map((item) => item.getId());
        const targetParentId = target.item.getId();
        const targetParent = itemsById.get(targetParentId);
        if (!targetParent) {
            return;
        }
        const currentChildren = targetParent.children ?? [];
        const insertIndex = isOrderedDragTarget(target) ? target.insertionIndex : currentChildren.length;
        const next = moveItems(itemsWithRoot, draggedIds, targetParentId, insertIndex);
        onChange?.(assembleTreeState(next, treeState, ROOT_ID));
    };

    const tree = useTree<TreeItemData>({
        rootItemId: ROOT_ID,
        getItemName: (item) => item.getItemData().name,
        isItemFolder: (item) => Boolean(item.getItemData().isFolder),
        canReorder: reorderable,
        onDrop: reorderable ? onDrop : undefined,
        dataLoader: {
            getItem: (itemId) => itemsById.get(itemId) as TreeItemData,
            getChildren: (itemId) => itemsById.get(itemId)?.children ?? [],
        },
        state: treeState,
        setExpandedItems,
        setCheckedItems,
        setFocusedItem,
        canCheckFolders: true,
        propagateCheckedState: true,
        indent: 1,
        features: [
            syncDataLoaderFeature,
            checkboxesFeature,
            hotkeysCoreFeature,
            ...(reorderable ? [dragAndDropFeature, keyboardDragAndDropFeature] : []),
        ],
    });

    useEffect(() => {
        tree.rebuildTree();
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [structureKey]);

    return tree;
};
