/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';

import {
    type TreeFolderProps,
    type TreeItemData,
    type TreeItemProps,
    type TreeLoadingEntry,
    type TreeLoadingProps,
} from '../types';

export type ParsedChildren = {
    items: TreeItemData[];
    /**
     * Loading placeholders keyed by their parent id (`'root'` for top-level). They
     * are kept out of `items` so headless-tree never sees them — see TreeLoadingEntry.
     */
    loadingByParent: Map<string, TreeLoadingEntry[]>;
};

const isTreeItemElement = (element: ReactElement): element is ReactElement<TreeItemProps> =>
    (element.type as { displayName?: string })?.displayName === 'Tree.Item';

const isTreeFolderElement = (element: ReactElement): element is ReactElement<TreeFolderProps> =>
    (element.type as { displayName?: string })?.displayName === 'Tree.Folder';

const isTreeLoadingElement = (element: ReactElement): element is ReactElement<TreeLoadingProps> =>
    (element.type as { displayName?: string })?.displayName === 'Tree.Loading';

const appendLoading = (map: Map<string, TreeLoadingEntry[]>, parentId: string, entry: TreeLoadingEntry) => {
    const existing = map.get(parentId);
    if (existing) {
        existing.push(entry);
    } else {
        map.set(parentId, [entry]);
    }
};

/**
 * Walks the JSX children of <Tree.Root> and produces a flat TreeItemData[] for headless-tree's
 * dataLoader, plus a map of `Tree.Loading` placeholders keyed by their parent id. Components
 * are matched by displayName (not identity) so HMR component swaps don't break the tree.
 */
export const parseChildren = (children: ReactNode, parentId: string = 'root'): ParsedChildren => {
    const items: TreeItemData[] = [];
    const loadingByParent = new Map<string, TreeLoadingEntry[]>();
    for (const child of Children.toArray(children)) {
        if (!isValidElement(child)) {
            continue;
        }
        if (isTreeLoadingElement(child)) {
            appendLoading(loadingByParent, parentId, { label: child.props.label });
            continue;
        }
        if (isTreeItemElement(child)) {
            const { id, label, isSelected, onSelectChange, isActive, onClick, onMove } = child.props;
            items.push({
                id,
                name: label,
                isFolder: false,
                parentId,
                isSelected,
                onSelectChange,
                isActive,
                onClick,
                onMove,
            });
            continue;
        }
        if (isTreeFolderElement(child)) {
            const {
                id,
                label,
                children: nested,
                isExpanded,
                onExpandChange,
                isSelected,
                onSelectChange,
                isActive,
                onClick,
                onMove,
            } = child.props;
            const descendants = parseChildren(nested, id);
            const directChildIds = descendants.items.filter((item) => item.parentId === id).map((item) => item.id);
            items.push({
                id,
                name: label,
                isFolder: true,
                parentId,
                children: directChildIds,
                isExpanded,
                onExpandChange,
                isSelected,
                onSelectChange,
                isActive,
                onClick,
                onMove,
            });
            items.push(...descendants.items);
            for (const [nestedParentId, entries] of descendants.loadingByParent) {
                for (const entry of entries) {
                    appendLoading(loadingByParent, nestedParentId, entry);
                }
            }
        }
    }
    return { items, loadingByParent };
};
