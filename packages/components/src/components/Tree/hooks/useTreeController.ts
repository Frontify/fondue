/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    checkboxesFeature,
    dragAndDropFeature,
    hotkeysCoreFeature,
    keyboardDragAndDropFeature,
    renamingFeature,
    selectionFeature,
    syncDataLoaderFeature,
    type TreeInstance,
    type Updater,
} from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { useEffect, useMemo, useRef, useState } from 'react';

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
 * - Inline renaming is consumer-controlled: the `isRenaming` prop is the only entry
 *   point (the feature's F2 hotkey is disabled), edge-synced into the feature so the
 *   tree can still end a rename (Enter/blur/Escape) on its own. Committing fires the
 *   item's `onRename` and the global `onChange` with the new name patched in — the
 *   Tree never stores names itself.
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
    // `isSelected === true` deliberately: a round-tripped 'indeterminate' is derived
    // folder output, never an input, and must not count as checked/selected.
    const checkedItems = useMemo(
        () =>
            multiSelect
                ? itemsWithRoot.filter((item) => item.isSelected === true && !item.isFolder).map((item) => item.id)
                : [],
        [itemsWithRoot, multiSelect],
    );
    const selectedItems = useMemo(
        () =>
            multiSelect
                ? []
                : itemsWithRoot.filter((item) => item.isSelected === true && item.id !== ROOT_ID).map((item) => item.id),
        [itemsWithRoot, multiSelect],
    );

    // Focus is tracked internally only — headless-tree's TreeFeatureDef requires it in
    // state for keyboard navigation, but consumers don't see it via `onChange`. Initialized
    // to the first non-root item so the row gets `tabIndex=0` on mount; without it, the
    // roving tabindex pattern leaves every row at `-1` and the tree is skipped by Tab.
    const [internalFocusedItem, setInternalFocusedItem] = useState<string | undefined>(() => items[0]?.id);

    // Renaming is *started* exclusively by the consumer's `isRenaming` prop (no hotkey,
    // no double-click), but *ended* by the tree (Enter/blur commit, Escape abort), which
    // must take effect before the consumer re-renders with the prop cleared. The internal
    // state is therefore the source of truth and the prop is edge-synced into it below.
    const [renamingItem, setRenamingItem] = useState<string | null>(null);
    const [renamingValue, setRenamingValue] = useState<string>('');

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

    // Fires `onRenamingChange(false)` only for the item whose rename session ends.
    // Starts are never echoed: the consumer's `isRenaming` prop is the only way to
    // start a rename, so an `onRenamingChange(true)` would just repeat what the
    // consumer already knows — mirroring how prop-driven isExpanded/isSelected
    // changes don't fire their change callbacks either.
    const handleSetRenamingItem = (updater: Updater<string | null | undefined>) => {
        const next = resolveUpdater(updater, renamingItem) ?? null;
        if (next !== renamingItem && renamingItem) {
            itemsById.get(renamingItem)?.onRenamingChange?.(false);
        }
        setRenamingItem(next);
    };

    // Commit handler for the renaming feature. Renames never touch the Tree's own
    // state (the name lives in the consumer's `<Tree.Label>`), so this only notifies:
    // the item's `onRename` plus the global `onChange` with the new name patched in —
    // same pattern as `createDropHandler`. Unchanged or empty names are a no-op.
    const handleRename = (item: { getId: () => string }, value: string) => {
        const data = itemsById.get(item.getId());
        const nextName = value.trim();
        if (!data || nextName === '' || nextName === data.name) {
            return;
        }
        data.onRename?.(nextName);
        const nextItems = itemsWithRoot.map((entry) => (entry.id === data.id ? { ...entry, name: nextName } : entry));
        onChange?.(buildChangeState(nextItems, pendingState, ROOT_ID));
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
        state: { ...treeState, renamingItem, renamingValue },
        setExpandedItems,
        setCheckedItems,
        setSelectedItems: multiSelect ? undefined : setSelectedItems,
        setFocusedItem,
        setRenamingItem: handleSetRenamingItem,
        setRenamingValue: (updater) => setRenamingValue((prev) => resolveUpdater(updater, prev) ?? ''),
        canRename: (item) => Boolean(item.getItemData().onRename),
        onRename: handleRename,
        // Renaming is consumer-controlled via the `isRenaming` prop only; suppress the
        // feature's built-in F2 hotkey so the tree can't start a rename on its own.
        // `hotkey` must be repeated: the matcher reads the raw override entry (not a
        // preset-merged one), and an entry without `hotkey` throws during matching,
        // breaking every later hotkey in the list — including Enter-to-commit.
        hotkeys: {
            renameItem: { hotkey: 'F2', isEnabled: () => false },
        },
        canCheckFolders: false,
        propagateCheckedState: true,
        indent: INDENT_STEP_PX,
        features: [
            syncDataLoaderFeature,
            checkboxesFeature,
            hotkeysCoreFeature,
            ...(multiSelect ? [] : [selectionFeature]),
            ...(reorderable ? [dragAndDropFeature, keyboardDragAndDropFeature] : []),
            renamingFeature,
        ],
    });

    useEffect(() => {
        tree.rebuildTree();
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [structureKey]);

    // Edge-sync the consumer's `isRenaming` prop into the renaming feature: react only
    // to prop *transitions* (tracked via ref), not to every render. The tree itself ends
    // renames (commit/abort) before the consumer clears the prop, so a still-`true` prop
    // with no active rename must not re-enter rename mode.
    const propRenamingItem = useMemo(() => items.find((item) => item.isRenaming)?.id ?? null, [items]);
    const lastPropRenamingItemRef = useRef<string | null>(null);
    useEffect(() => {
        if (propRenamingItem === lastPropRenamingItemRef.current) {
            return;
        }
        lastPropRenamingItemRef.current = propRenamingItem;
        if (propRenamingItem) {
            // Gated by `canRename` so items without `onRename` are a no-op, matching
            // `startRenaming`'s own guard.
            const instance = tree.getItemInstance(propRenamingItem);
            if (instance?.canRename()) {
                // The renaming feature ends every rename (Enter, Escape, blur) by moving
                // DOM focus back to the tree's focused item. A rename started from a row
                // action never focused its row (action clicks don't bubble to the row),
                // so without this the focused item would still be the mount-time default
                // — the first row — and focus would jump there on commit.
                instance.setFocused();
                instance.startRenaming();
            }
        } else if (tree.isRenamingItem()) {
            tree.abortRenaming();
        }
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [propRenamingItem]);

    return tree;
};
