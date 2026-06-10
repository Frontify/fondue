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
 * - In multi-select mode, `checkedItems` carries leaf checkbox state. Folder state is
 *   derived from *leaf descendants*, mirroring headless-tree's `getCheckedState` (which
 *   drives the rendered checkbox): `true` when every leaf is checked, `'indeterminate'`
 *   when only some are, `false` otherwise. Empty folders are `false` and contribute no
 *   leaves to their ancestors — so they never block an ancestor's "all checked".
 * - In single-select mode, `selectedItems` carries the single highlighted row (folder
 *   or leaf). It feeds directly into `isSelected`; `'indeterminate'` never occurs.
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

    type BuiltNode = { node: TreeNodeState; leafCount: number; checkedLeafCount: number };

    const buildNode = (id: string): BuiltNode | null => {
        const item = byId.get(id);
        if (!item) {
            return null;
        }
        if (item.isFolder) {
            const builtChildren = (item.children ?? [])
                .map(buildNode)
                .filter((child): child is BuiltNode => child !== null);
            const leafCount = builtChildren.reduce((sum, child) => sum + child.leafCount, 0);
            const checkedLeafCount = builtChildren.reduce((sum, child) => sum + child.checkedLeafCount, 0);
            const allLeavesChecked = leafCount > 0 && checkedLeafCount === leafCount;
            const someLeavesChecked = checkedLeafCount > 0 && !allLeavesChecked;
            let isSelected: boolean | 'indeterminate' = allLeavesChecked || selected.has(item.id);
            if (!isSelected && someLeavesChecked) {
                isSelected = 'indeterminate';
            }
            return {
                node: {
                    id: item.id,
                    name: item.name,
                    isFolder: true,
                    isExpanded: expanded.has(item.id),
                    isSelected,
                    tags: item.tags,
                    children: builtChildren.map((child) => child.node),
                },
                leafCount,
                checkedLeafCount,
            };
        }
        const isChecked = checked.has(item.id);
        return {
            node: {
                id: item.id,
                name: item.name,
                isFolder: false,
                isSelected: isChecked || selected.has(item.id),
                tags: item.tags,
            },
            leafCount: 1,
            checkedLeafCount: isChecked ? 1 : 0,
        };
    };

    const root = byId.get(rootId);
    return (root?.children ?? [])
        .map(buildNode)
        .filter((child): child is BuiltNode => child !== null)
        .map((child) => child.node);
};
