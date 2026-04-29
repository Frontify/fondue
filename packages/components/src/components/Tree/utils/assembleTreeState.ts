/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Item, type TreeChangeState, type TreeNodeState } from '../types';

type FlatTreeState = {
    expandedItems: string[];
    selectedItems: string[];
    focusedItem?: string;
};

export const assembleTreeState = (items: Item[], state: FlatTreeState, parentId: string): TreeChangeState => {
    const byId = new Map(items.map((item) => [item.id, item]));
    const buildNode = (id: string): TreeNodeState | null => {
        const item = byId.get(id);
        if (!item) {
            return null;
        }
        const node: TreeNodeState = {
            id: item.id,
            name: item.name,
            isFolder: Boolean(item.isFolder),
            isSelected: state.selectedItems.includes(item.id),
            isFocused: state.focusedItem === item.id,
        };
        if (item.isFolder) {
            node.isExpanded = state.expandedItems.includes(item.id);
            node.children = (item.children ?? [])
                .map(buildNode)
                .filter((child): child is TreeNodeState => child !== null);
        }
        return node;
    };

    const parent = byId.get(parentId);
    const childIds = parent?.children ?? items.filter((item) => item.parentId === parentId).map((item) => item.id);
    return childIds
        .map(buildNode)
        .filter((child): child is TreeNodeState => child !== null);
};

export type { FlatTreeState };
