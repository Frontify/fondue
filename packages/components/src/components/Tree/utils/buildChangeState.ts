/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TreeChangeState, type TreeItemData, type TreeNodeState } from '../types';

import { computeCheckedStates } from './computeCheckedStates';

/** Flat state mirror of the headless-tree internal model. */
export type FlatTreeState = {
    expandedItems: string[];
    checkedItems: string[];
    selectedItems?: string[];
    focusedItem?: string;
};

/**
 * Rebuilds the hierarchical `TreeChangeState` for `onChange` from the flat items plus
 * the current state. `parent.children` dictates ordering; orphan ids drop silently.
 *
 * `isSelected` merges two mutually exclusive feature paths: in multi-select it derives
 * via `computeCheckedStates` (the same derivation that renders the checkboxes, so report
 * and screen always agree); in single-select it mirrors the one highlighted row and
 * `'indeterminate'` never occurs.
 */
export const buildChangeState = (
    items: readonly TreeItemData[],
    state: FlatTreeState,
    rootId: string,
): TreeChangeState => {
    const byId = new Map(items.map((item) => [item.id, item]));
    const expanded = new Set(state.expandedItems);
    const selected = new Set(state.selectedItems ?? []);
    const checkedStates = computeCheckedStates(items, new Set(state.checkedItems));

    const buildNode = (id: string): TreeNodeState | null => {
        const item = byId.get(id);
        if (!item) {
            return null;
        }
        const derived = checkedStates.get(id) ?? false;
        const isSelected = selected.has(id) ? true : derived;
        if (item.isFolder) {
            return {
                id: item.id,
                name: item.name,
                isFolder: true,
                isExpanded: expanded.has(item.id),
                isSelected,
                tags: item.tags,
                children: (item.children ?? [])
                    .map(buildNode)
                    .filter((child): child is TreeNodeState => child !== null),
            };
        }
        return {
            id: item.id,
            name: item.name,
            isFolder: false,
            isSelected,
            tags: item.tags,
        };
    };

    const root = byId.get(rootId);
    return (root?.children ?? []).map(buildNode).filter((child): child is TreeNodeState => child !== null);
};
