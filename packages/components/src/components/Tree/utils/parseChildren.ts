/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';

import { type TreeFolderProps, type TreeItemData, type TreeItemProps, type TreeLoadingProps } from '../types';

export type ParsedChildren = {
    items: TreeItemData[];
    /**
     * `<Tree.Loading>` info for the parent context being parsed. Folder recursions fold
     * this into the folder's own `TreeItemData`; the top-level call exposes it to
     * `TreeRoot` so the root-level loading row can be rendered.
     */
    parentIsLoading: boolean;
    parentLoadingLabel: string | undefined;
};

const isTreeItemElement = (element: ReactElement): element is ReactElement<TreeItemProps> =>
    (element.type as { displayName?: string })?.displayName === 'Tree.Item';

const isTreeFolderElement = (element: ReactElement): element is ReactElement<TreeFolderProps> =>
    (element.type as { displayName?: string })?.displayName === 'Tree.Folder';

const isTreeLoadingElement = (element: ReactElement): element is ReactElement<TreeLoadingProps> =>
    (element.type as { displayName?: string })?.displayName === 'Tree.Loading';

/**
 * Walks the JSX children of <Tree.Root> and produces a flat TreeItemData[] for headless-tree's
 * dataLoader. A `<Tree.Loading>` child sets `isLoading`/`loadingLabel` on the parent folder
 * (or, at the top level, surfaces via `parentIsLoading`/`parentLoadingLabel` for TreeRoot to
 * render the root loading row). Components are matched by displayName (not identity) so HMR
 * component swaps don't break the tree.
 */
export const parseChildren = (children: ReactNode, parentId: string = 'root'): ParsedChildren => {
    const items: TreeItemData[] = [];
    let parentIsLoading = false;
    let parentLoadingLabel: string | undefined;
    for (const child of Children.toArray(children)) {
        if (!isValidElement(child)) {
            continue;
        }
        if (isTreeLoadingElement(child)) {
            parentIsLoading = true;
            parentLoadingLabel = child.props.label;
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
                isLoading: descendants.parentIsLoading,
                loadingLabel: descendants.parentLoadingLabel,
            });
            items.push(...descendants.items);
        }
    }
    return { items, parentIsLoading, parentLoadingLabel };
};
