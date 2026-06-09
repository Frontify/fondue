/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    checkboxesFeature,
    dragAndDropFeature,
    hotkeysCoreFeature,
    keyboardDragAndDropFeature,
    selectionFeature,
    syncDataLoaderFeature,
    type TreeInstance,
    type Updater,
} from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { useEffect, useMemo, useState } from 'react';

import { INDENT_STEP_PX, ROOT_ID, ROOT_NAME } from '../constants';
import { type TreeChangeState, type TreeDropCandidate, type TreeItemData } from '../types';
import { buildChangeState, type FlatTreeState } from '../utils/buildChangeState';
import { createCanDrop } from '../utils/createCanDrop';
import { createDropHandler } from '../utils/createDropHandler';
import { diffSelection } from '../utils/diffSelection';
import { getStructureKey } from '../utils/getStructureKey';

type UseTreeControllerOptions = {
    items: TreeItemData[];
    onChange?: (state: TreeChangeState) => void;
    multiSelect?: boolean;
    reorderable?: boolean;
    rootAccepts?: (items: TreeDropCandidate[]) => boolean;
};

const resolveUpdater = <T>(updater: Updater<T>, prev: T): T =>
    typeof updater === 'function' ? (updater as (old: T) => T)(prev) : updater;

/**
 * Wraps headless-tree's `useTree` with the conventions this Tree component relies on:
 *
 * - A synthetic root item is injected so consumers never have to declare one and
 *   `parent.children` becomes the single source of truth for ordering.
 * - Folders are excluded from `checkedItems`; their checked state is derived from
 *   descendants. Pushing a folder id into `checkedItems` would make `getCheckedState`
 *   short-circuit and leave ancestors stuck on "checked" after unchecking a child.
 * - `isSelected` is one prop on the consumer side but is fanned out to two
 *   headless-tree features depending on mode: `checkboxesFeature` in multi-select,
 *   `selectionFeature` in single-select. The single-select setter pins to a single
 *   id so the feature's modifier hotkeys (Shift/Ctrl-click, Ctrl+A) can't escalate
 *   into multi-selection.
 * - Headless-tree batches multiple setter calls inside a single user event (e.g. a
 *   row click triggers both setSelectedItems and setFocusedItem). Each setter must
 *   build on the previous one's changes, so a shared `pendingState` is threaded
 *   through them — without it the second emit would overwrite the first because
 *   React hasn't re-rendered yet.
 * - Per-item `onSelectChange` / `onExpandChange` callbacks are fanned out from
 *   batched setter calls via a diff against the previous flat state.
 */
export const useTreeController = ({
    items,
    onChange,
    multiSelect = false,
    reorderable = false,
    rootAccepts,
}: UseTreeControllerOptions): TreeInstance<TreeItemData> => {
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

    const itemsById = useMemo(() => new Map(itemsWithRoot.map((item) => [item.id, item])), [itemsWithRoot]);
    const structureKey = useMemo(() => getStructureKey(itemsWithRoot), [itemsWithRoot]);

    const expandedItems = useMemo(
        () => itemsWithRoot.filter((item) => item.isExpanded).map((item) => item.id),
        [itemsWithRoot],
    );
    const checkedItems = useMemo(
        () =>
            multiSelect
                ? itemsWithRoot.filter((item) => item.isSelected && !item.isFolder).map((item) => item.id)
                : [],
        [itemsWithRoot, multiSelect],
    );
    const selectedItems = useMemo(
        () =>
            multiSelect
                ? []
                : itemsWithRoot.filter((item) => item.isSelected && item.id !== ROOT_ID).map((item) => item.id),
        [itemsWithRoot, multiSelect],
    );

    // Focus is tracked internally only — headless-tree's TreeFeatureDef requires it in
    // state for keyboard navigation, but consumers don't see it via `onChange`. Initialized
    // to the first non-root item so the row gets `tabIndex=0` on mount; without it, the
    // roving tabindex pattern leaves every row at `-1` and the tree is skipped by Tab.
    const [internalFocusedItem, setInternalFocusedItem] = useState<string | undefined>(() => items[0]?.id);

    const treeState = useMemo<FlatTreeState>(
        () => ({ expandedItems, checkedItems, selectedItems, focusedItem: internalFocusedItem }),
        [expandedItems, checkedItems, selectedItems, internalFocusedItem],
    );

    let pendingState: FlatTreeState = treeState;
    const emit = (next: FlatTreeState) => {
        pendingState = next;
        onChange?.(buildChangeState(itemsWithRoot, next, ROOT_ID));
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

    // Single-select pin: `selectionFeature` accepts Shift/Ctrl modifier clicks and
    // Ctrl+A to multi-select, but in this controller's single-select mode we always
    // collapse to the most recently selected id. The default plain-click handler in
    // `selectionFeature` already sets the array to `[itemId]`, so this guard only
    // affects modifier-driven escalations.
    const setSelectedItems = (updater: Updater<string[]>) => {
        const resolved = resolveUpdater(updater, pendingState.selectedItems ?? []);
        const nextSelected = resolved.slice(-1);
        fireDiff(pendingState.selectedItems ?? [], nextSelected, (item) => item.onSelectChange);
        emit({ ...pendingState, selectedItems: nextSelected });
    };

    const setFocusedItem = (updater: Updater<string | null>) => {
        const next = resolveUpdater(updater, pendingState.focusedItem ?? null) ?? undefined;
        pendingState = { ...pendingState, focusedItem: next };
        setInternalFocusedItem(next);
    };

    const canDrop = useMemo(() => createCanDrop({ itemsById }), [itemsById]);
    const onDrop = useMemo(
        () => createDropHandler({ items: itemsWithRoot, itemsById, treeState, rootId: ROOT_ID, onChange }),
        [itemsWithRoot, itemsById, treeState, onChange],
    );

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
        setSelectedItems: multiSelect ? undefined : setSelectedItems,
        setFocusedItem,
        canCheckFolders: false,
        propagateCheckedState: true,
        indent: INDENT_STEP_PX,
        features: [
            syncDataLoaderFeature,
            checkboxesFeature,
            hotkeysCoreFeature,
            ...(multiSelect ? [] : [selectionFeature]),
            ...(reorderable ? [dragAndDropFeature, keyboardDragAndDropFeature] : []),
        ],
    });

    useEffect(() => {
        tree.rebuildTree();
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [structureKey]);

    return tree;
};
