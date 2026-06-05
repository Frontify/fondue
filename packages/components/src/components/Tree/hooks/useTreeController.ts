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

import { type TreeChangeState, type TreeDropCandidate, type TreeItemData } from '../types';
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
    rootAccepts?: (items: TreeDropCandidate[]) => boolean;
};

const resolveUpdater = <T>(updater: Updater<T>, prev: T): T =>
    typeof updater === 'function' ? (updater as (old: T) => T)(prev) : updater;

export const useTreeController = ({
    items,
    onChange,
    reorderable = false,
    rootAccepts,
}: UseTreeControllerOptions): TreeInstance<TreeItemData> => {
    // Headless-tree requires a root item; build it here so the consumer never sees
    // it and `assembleTreeState` can use `parent.children` as the single source of
    // truth for ordering. The optional `accepts` predicate is attached here too so
    // `canDrop` can look it up uniformly for root and nested folders.
    const itemsWithRoot = useMemo<TreeItemData[]>(
        () => [
            {
                id: ROOT_ID,
                name: ROOT_NAME,
                isFolder: true,
                children: items.filter((item) => !item.parentId || item.parentId === ROOT_ID).map((item) => item.id),
                accepts: rootAccepts,
            },
            ...items,
        ],
        [items, rootAccepts],
    );

    const structureKey = useMemo(() => getStructureKey(itemsWithRoot), [itemsWithRoot]);
    const itemsById = useMemo(() => new Map(itemsWithRoot.map((item) => [item.id, item])), [itemsWithRoot]);

    const expandedItems = useMemo(
        () => itemsWithRoot.filter((item) => item.isExpanded).map((item) => item.id),
        [itemsWithRoot],
    );
    // Only leaves can be in `checkedItems`. Folders are always derived from descendants via
    // `getCheckedState` — see the comment on `canCheckFolders` below.
    const checkedItems = useMemo(
        () => itemsWithRoot.filter((item) => item.isSelected && !item.isFolder).map((item) => item.id),
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

    const toCandidate = (item: ItemInstance<TreeItemData>): TreeDropCandidate => {
        const data = item.getItemData();
        return {
            id: data.id,
            label: data.name,
            isFolder: data.isFolder,
            tags: data.tags ?? [],
        };
    };

    const canDrop = (draggedItems: ItemInstance<TreeItemData>[], target: DragTarget<TreeItemData>) => {
        // `target.item` is the prospective parent: the folder (or root) being dropped INTO
        // for unordered targets, or the container of the insertion slot for ordered targets.
        // A non-folder target.item means the user is dropping directly onto a leaf item, which
        // we never allow — items don't have children.
        const targetData = itemsById.get(target.item.getId());
        if (!targetData?.isFolder) {
            return false;
        }
        const candidates = draggedItems.map(toCandidate);
        // Bypass-loophole guard: at outer indent immediately below an expanded folder's
        // header, headless-tree resolves the target to "after that folder at the parent
        // level" — visually it sits inside the folder's body. If the folder itself would
        // reject the items, also reject here so the user can't sneak past its `accepts`
        // by clipping the boundary. Only fires when the folder has visible children
        // (otherwise there's no visual overlap to disambiguate).
        if (isOrderedDragTarget(target)) {
            const siblings = targetData.children ?? [];
            const aboveId = siblings[target.insertionIndex - 1];
            const above = aboveId ? itemsById.get(aboveId) : undefined;
            if (
                above?.isFolder &&
                above.isExpanded &&
                (above.children?.length ?? 0) > 0 &&
                above.accepts &&
                !above.accepts(candidates)
            ) {
                return false;
            }
        }
        if (!targetData.accepts) {
            return true;
        }
        return targetData.accepts(candidates);
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

        const nextChildren = next.find((item) => item.id === targetParentId)?.children ?? [];
        for (const draggedId of draggedIds) {
            const item = itemsById.get(draggedId);
            const index = nextChildren.indexOf(draggedId);
            if (item?.onMove && index !== -1) {
                item.onMove({ parentId: targetParentId, index });
            }
        }

        onChange?.(assembleTreeState(next, treeState, ROOT_ID));
    };

    const tree = useTree<TreeItemData>({
        rootItemId: ROOT_ID,
        getItemName: (item) => item.getItemData().name,
        isItemFolder: (item) => Boolean(item.getItemData().isFolder),
        canReorder: reorderable,
        canDrop: reorderable ? canDrop : undefined,
        onDrop: reorderable ? onDrop : undefined,
        dataLoader: {
            getItem: (itemId) => itemsById.get(itemId) as TreeItemData,
            getChildren: (itemId) => itemsById.get(itemId)?.children ?? [],
        },
        state: treeState,
        setExpandedItems,
        setCheckedItems,
        setFocusedItem,
        // Folders are derived from their descendants — never put into `checkedItems` themselves.
        // With `canCheckFolders: true` and propagation on, checking a folder pushes the folder
        // id into `checkedItems`, after which `getCheckedState` short-circuits to `"checked"` and
        // unchecking a descendant leaves the ancestor stuck — never showing indeterminate again.
        canCheckFolders: false,
        propagateCheckedState: true,
        // Pixels per indent level — matches the 1rem step used by `.indent` in tree.module.scss.
        // Headless-tree uses this both for `getDragLineData`'s leftOffset (so the dragline
        // visually communicates the drop depth) and for hit-testing reparent gestures.
        indent: 16,
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
