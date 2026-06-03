/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';

import { type TreeFolderProps, type TreeItemData, type TreeItemProps } from '../types';

const isTreeItemElement = (element: ReactElement): element is ReactElement<TreeItemProps> =>
    (element.type as { displayName?: string })?.displayName === 'Tree.Item';

const isTreeFolderElement = (element: ReactElement): element is ReactElement<TreeFolderProps> =>
    (element.type as { displayName?: string })?.displayName === 'Tree.Folder';

/**
 * Walks the JSX children of <Tree.Root> and produces a flat TreeItemData[] for headless-tree's
 * dataLoader. Components are matched by displayName (not identity) so HMR component swaps
 * don't break the tree.
 */
export const parseChildren = (children: ReactNode, parentId: string = 'root'): TreeItemData[] => {
    const result: TreeItemData[] = [];
    for (const child of Children.toArray(children)) {
        if (!isValidElement(child)) {
            continue;
        }
        if (isTreeItemElement(child)) {
            const { id, label, isSelected, onSelectChange, isActive, onClick, onMove } = child.props;
            result.push({
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
            const directChildIds = descendants.filter((item) => item.parentId === id).map((item) => item.id);
            result.push({
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
            result.push(...descendants);
        }
    }
    return result;
};
