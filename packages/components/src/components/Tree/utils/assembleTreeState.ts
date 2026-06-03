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
 *
 * `isSelected` is a leaf-only fact in our model — `checkedItems` only ever contains leaf
 * ids. For folders we derive `isSelected = every leaf descendant is checked`, so consumers
 * can read the emitted state to know whether a folder is fully selected without walking
 * its children themselves.
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
        if (item.isFolder) {
            const children = (item.children ?? [])
                .map(buildNode)
                .filter((child): child is TreeNodeState => child !== null);
            const hasChildren = children.length > 0;
            return {
                id: item.id,
                name: item.name,
                isFolder: true,
                isExpanded: expanded.has(item.id),
                isSelected: hasChildren && children.every((child) => child.isSelected),
                isActive: Boolean(item.isActive),
                children,
            };
        }
        return {
            id: item.id,
            name: item.name,
            isFolder: false,
            isSelected: checked.has(item.id),
            isActive: Boolean(item.isActive),
        };
    };

    const root = byId.get(rootId);
    return (root?.children ?? []).map(buildNode).filter((child): child is TreeNodeState => child !== null);
};
