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
import { getCheckedUnitIds, isCheckableUnit } from '../utils/computeCheckedStates';
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
 * Wraps headless-tree's `useTree` with this component's conventions:
 *
 * - A synthetic root is injected; `parent.children` is the source of truth for order.
 * - `checkedItems` holds checkable units only: leaves plus leafless folders (checkable
 *   as their own entity). Folder-with-children ids must stay out — they would
 *   short-circuit `getCheckedState` and stick on "checked" — so the setter filters
 *   them; `canCheckFolders` is on only so cascades reach leafless folders. Rendered
 *   checkbox states come from `computeCheckedStates` (shared with `buildChangeState`),
 *   not headless-tree's leaf-only derivation.
 * - `isSelected` maps to `checkboxesFeature` (multi-select) or `selectionFeature`
 *   (single-select); the single-select setter pins to one id so modifier hotkeys
 *   can't escalate into multi-selection.
 * - Setters batched within one user event thread a shared `pendingState` (React hasn't
 *   re-rendered between them), and their emits coalesce into a single microtask flush —
 *   `onChange` fires at most once per interaction, and never for no-op interactions.
 * - Per-item `onSelectChange`/`onExpandChange` fan out from a diff per setter call.
 * - Disabled rows are frozen: the setters revert changes to their ids (cascades skip
 *   them silently), `canDrag`/`canRename` reject them, and their frozen state still
 *   counts toward ancestors' derived checkbox state.
 * - Renaming starts only via the `isRenaming` prop (F2 disabled) but is ended by the
 *   tree (Enter/blur commit, Escape abort); commits fire `onRename` plus `onChange`
 *   with the new name patched in — the Tree never stores names.
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

    const disabledIds = useMemo(
        () => new Set(itemsWithRoot.filter((item) => item.isDisabled).map((item) => item.id)),
        [itemsWithRoot],
    );

    const expandedItems = useMemo(
        () => itemsWithRoot.filter((item) => item.isExpanded).map((item) => item.id),
        [itemsWithRoot],
    );
    const checkedItems = useMemo(
        () => (multiSelect ? getCheckedUnitIds(itemsWithRoot) : []),
        [itemsWithRoot, multiSelect],
    );
    const selectedItems = useMemo(
        () =>
            multiSelect
                ? []
                : itemsWithRoot
                      // `=== true`: a round-tripped 'indeterminate' is output-only and must not count.
                      .filter((item) => item.isSelected === true && item.id !== ROOT_ID)
                      .map((item) => item.id),
        [itemsWithRoot, multiSelect],
    );

    // Focus is internal-only (not in `onChange`), seeded to the first item so one row
    // gets `tabIndex=0` — otherwise the roving tabindex leaves the tree unreachable by Tab.
    const [internalFocusedItem, setInternalFocusedItem] = useState<string | undefined>(() => items[0]?.id);

    // Renames are started by the `isRenaming` prop but ended by the tree, which must take
    // effect before the consumer clears the prop — so internal state is the source of
    // truth and the prop is edge-synced into it below.
    const [renamingItem, setRenamingItem] = useState<string | null>(null);
    const [renamingValue, setRenamingValue] = useState<string>('');

    const treeState = useMemo<FlatTreeState>(
        () => ({ expandedItems, checkedItems, selectedItems, focusedItem: internalFocusedItem }),
        [expandedItems, checkedItems, selectedItems, internalFocusedItem],
    );

    // Emits are coalesced: one user event can hit several setters (a folder click sets
    // selection *and* expansion), so `onChange` flushes once per microtask — and not at
    // all when the result equals the prop-derived input state (e.g. re-clicking the
    // selected row). Per-item callbacks still fire synchronously per setter.
    let pendingState: FlatTreeState = treeState;
    let flushScheduled = false;
    const sameIds = (a: readonly string[], b: readonly string[]) =>
        a.length === b.length && a.every((id) => b.includes(id));
    const emit = (next: FlatTreeState) => {
        pendingState = next;
        if (flushScheduled) {
            return;
        }
        flushScheduled = true;
        queueMicrotask(() => {
            flushScheduled = false;
            const isUnchanged =
                sameIds(pendingState.expandedItems, treeState.expandedItems) &&
                sameIds(pendingState.checkedItems, treeState.checkedItems) &&
                sameIds(pendingState.selectedItems ?? [], treeState.selectedItems ?? []);
            if (!isUnchanged) {
                onChange?.(buildChangeState(itemsWithRoot, pendingState, ROOT_ID));
            }
        });
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

    // Disabled freeze: a disabled id's membership never changes from interaction —
    // newly added disabled ids are dropped, removed ones re-added — so cascades skip
    // them and `fireDiff` never echoes `onSelectChange` for untouchable rows.
    const setCheckedItems = (updater: Updater<string[]>) => {
        // Cascades include every descendant folder id (`canCheckFolders`); only unit ids
        // may live in `checkedItems`, so the surplus is dropped here.
        const resolved = resolveUpdater(updater, pendingState.checkedItems).filter((id) => {
            const item = itemsById.get(id);
            return item !== undefined && isCheckableUnit(item);
        });
        const resolvedSet = new Set(resolved);
        const prevChecked = new Set(pendingState.checkedItems);
        const nextChecked = [
            ...resolved.filter((id) => !disabledIds.has(id) || prevChecked.has(id)),
            ...pendingState.checkedItems.filter((id) => disabledIds.has(id) && !resolvedSet.has(id)),
        ];
        fireDiff(pendingState.checkedItems, nextChecked, (item) => item.onSelectChange);
        emit({ ...pendingState, checkedItems: nextChecked });
    };

    // Single-select pin: collapse to the most recent id so `selectionFeature`'s
    // modifier hotkeys (Shift/Ctrl-click, Ctrl+A) can't escalate into multi-selection.
    const setSelectedItems = (updater: Updater<string[]>) => {
        const resolved = resolveUpdater(updater, pendingState.selectedItems ?? []);
        // Clicking a disabled row keeps the current highlight instead of clearing it.
        const allowed = resolved.filter((id) => !disabledIds.has(id));
        const nextSelected =
            resolved.length > 0 && allowed.length === 0 ? (pendingState.selectedItems ?? []) : allowed.slice(-1);
        fireDiff(pendingState.selectedItems ?? [], nextSelected, (item) => item.onSelectChange);
        emit({ ...pendingState, selectedItems: nextSelected });
    };

    const setFocusedItem = (updater: Updater<string | null>) => {
        const next = resolveUpdater(updater, pendingState.focusedItem ?? null) ?? undefined;
        pendingState = { ...pendingState, focusedItem: next };
        setInternalFocusedItem(next);
    };

    // Fires `onRenamingChange(false)` only when a rename session ends. Starts are never
    // echoed — they can only come from the consumer's own `isRenaming` prop.
    const handleSetRenamingItem = (updater: Updater<string | null | undefined>) => {
        const next = resolveUpdater(updater, renamingItem) ?? null;
        if (next !== renamingItem && renamingItem) {
            itemsById.get(renamingItem)?.onRenamingChange?.(false);
        }
        setRenamingItem(next);
    };

    // Rename commit: the name lives in the consumer's `<Tree.Label>`, so this only
    // notifies — `onRename` plus `onChange` with the new name patched in. Unchanged or
    // empty names are a no-op.
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
        canDrag: reorderable ? (items) => items.every((item) => !item.getItemData().isDisabled) : undefined,
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
        canRename: (item) => Boolean(item.getItemData().onRename) && !item.getItemData().isDisabled,
        onRename: handleRename,
        // Suppress the feature's F2 hotkey — renames start only via the `isRenaming`
        // prop. `hotkey` must be repeated: an override entry without it throws during
        // matching and breaks every later hotkey, including Enter-to-commit.
        hotkeys: {
            renameItem: { hotkey: 'F2', isEnabled: () => false },
        },
        // Lets cascades include folder ids — the only path for a leafless folder's own
        // id into `checkedItems`. Other folder ids are filtered out in `setCheckedItems`.
        canCheckFolders: true,
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

    // Edge-sync the `isRenaming` prop: react to transitions only (tracked via ref). The
    // tree ends renames before the consumer clears the prop, so a still-`true` prop with
    // no active rename must not re-enter rename mode.
    const propRenamingItem = useMemo(() => items.find((item) => item.isRenaming)?.id ?? null, [items]);
    const lastPropRenamingItemRef = useRef<string | null>(null);
    useEffect(() => {
        if (propRenamingItem === lastPropRenamingItemRef.current) {
            return;
        }
        lastPropRenamingItemRef.current = propRenamingItem;
        if (propRenamingItem) {
            // `canRename` gate: items without `onRename` are a no-op.
            const instance = tree.getItemInstance(propRenamingItem);
            if (instance?.canRename()) {
                // Ending a rename refocuses the tree's focused item. A rename started
                // from a row action never focused its row, so focus it now or the
                // commit would jump focus to the mount-time default (the first row).
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
