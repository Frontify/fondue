/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TreeChangeState, type TreeItemData, type TreeNodeState } from '../types';

export type FlatTreeState = {
    expandedItems: string[];
    checkedItems: string[];
    focusedItem?: string;
};

/**
 * Rebuilds the hierarchical `TreeChangeState` emitted to `onChange` from the flat item
 * list plus the current selection/expansion state. `parent.children` is the single source
 * of truth for child ordering; orphaned ids are dropped silently.
 */
export const assembleTreeState = (
    items: readonly TreeItemData[],
    state: FlatTreeState,
    rootId: string,
): TreeChangeState => {
    const byId = new Map(items.map((item) => [item.id, item]));
    const expanded = new Set(state.expandedItems);
    const checked = new Set(state.checkedItems);

    const buildNode = (id: string): TreeNodeState | null => {
        const item = byId.get(id);
        if (!item) {
            return null;
        }
        const node: TreeNodeState = {
            id: item.id,
            name: item.name,
            isFolder: Boolean(item.isFolder),
            isSelected: checked.has(item.id),
            isActive: Boolean(item.isActive),
        };
        if (item.isFolder) {
            node.isExpanded = expanded.has(item.id);
            node.children = (item.children ?? [])
                .map(buildNode)
                .filter((child): child is TreeNodeState => child !== null);
        }
        return node;
    };

    const root = byId.get(rootId);
    return (root?.children ?? []).map(buildNode).filter((child): child is TreeNodeState => child !== null);
};
