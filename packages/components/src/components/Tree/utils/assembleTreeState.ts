/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Item, type TreeChangeState, type TreeNodeState } from '../types';

type FlatTreeState = {
    expandedItems: string[];
    selectedItems: string[];
    focusedItem?: string;
};

export const assembleTreeState = (items: Item[], state: FlatTreeState, parentId: string): TreeChangeState =>
    items
        .filter((item) => item.parentId === parentId)
        .map((item): TreeNodeState => {
            const node: TreeNodeState = {
                id: item.id,
                name: item.name,
                isFolder: Boolean(item.isFolder),
                isSelected: state.selectedItems.includes(item.id),
                isFocused: state.focusedItem === item.id,
            };
            if (item.isFolder) {
                node.isExpanded = state.expandedItems.includes(item.id);
                node.children = assembleTreeState(items, state, item.id);
            }
            return node;
        });

export type { FlatTreeState };
