/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TreeChangeState, type TreeItemData, type TreeNodeState } from '../types';

/** Flat state mirror of the headless-tree internal model. */
export type FlatTreeState = {
    expandedItems: string[];
    checkedItems: string[];
    selectedItems?: string[];
    focusedItem?: string;
};

/**
 * Rebuilds the hierarchical `TreeChangeState` emitted to `onChange` from the flat item
 * list plus the current selection/expansion state. `parent.children` is the single source
 * of truth for child ordering; orphaned ids are dropped silently.
 *
 * `isSelected` collapses two feature paths into one consumer-facing flag:
 * - In multi-select mode, `checkedItems` carries leaf checkbox state. A folder is
 *   reported as selected when every leaf descendant is checked, so consumers can react
 *   to "folder fully selected" without walking children themselves.
 * - In single-select mode, `selectedItems` carries the single highlighted row (folder
 *   or leaf). It feeds directly into `isSelected`.
 *
 * The two paths are mutually exclusive at the feature level (the controller only wires
 * the selection feature when `multiSelect` is off), so an OR is enough.
 */
export const buildChangeState = (
    items: readonly TreeItemData[],
    state: FlatTreeState,
    rootId: string,
): TreeChangeState => {
    const byId = new Map(items.map((item) => [item.id, item]));
    const expanded = new Set(state.expandedItems);
    const checked = new Set(state.checkedItems);
    const selected = new Set(state.selectedItems ?? []);

    const buildNode = (id: string): TreeNodeState | null => {
        const item = byId.get(id);
        if (!item) {
            return null;
        }
        if (item.isFolder) {
            const children = (item.children ?? [])
                .map(buildNode)
                .filter((child): child is TreeNodeState => child !== null);
            const hasChildren = children.length > 0;
            const allLeavesChecked = hasChildren && children.every((child) => child.isSelected);
            return {
                id: item.id,
                name: item.name,
                isFolder: true,
                isExpanded: expanded.has(item.id),
                isSelected: allLeavesChecked || selected.has(item.id),
                tags: item.tags,
                children,
            };
        }
        return {
            id: item.id,
            name: item.name,
            isFolder: false,
            isSelected: checked.has(item.id) || selected.has(item.id),
            tags: item.tags,
        };
    };

    const root = byId.get(rootId);
    return (root?.children ?? []).map(buildNode).filter((child): child is TreeNodeState => child !== null);
};
