/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';

import { type Item, type TreeFolderProps, type TreeItemProps } from '../types';

const isTreeItemElement = (element: ReactElement): element is ReactElement<TreeItemProps> =>
    (element.type as { displayName?: string })?.displayName === 'Tree.Item';

const isTreeFolderElement = (element: ReactElement): element is ReactElement<TreeFolderProps> =>
    (element.type as { displayName?: string })?.displayName === 'Tree.Folder';

// Walks the JSX children of <Tree.Root> and produces a flat Item[] for headless-tree's dataLoader.
// Components are matched by displayName (not identity) so HMR component swaps don't break the tree.
export const parseChildren = (children: ReactNode, parentId: string = 'root'): Item[] => {
    return Children.toArray(children).reduce<Item[]>((acc, child) => {
        if (!isValidElement(child)) {
            return acc;
        }
        if (isTreeItemElement(child)) {
            const { id, children: name, isSelected, onSelectChange, isFocused, onFocusChange } = child.props;
            acc.push({
                id,
                name: typeof name === 'string' ? name : '',
                isFolder: false,
                parentId,
                isSelected,
                onSelectChange,
                isFocused,
                onFocusChange,
            });
        }
        if (isTreeFolderElement(child)) {
            const {
                id,
                name,
                children: folderChildren,
                isExpanded,
                onExpandChange,
                isSelected,
                onSelectChange,
                isFocused,
                onFocusChange,
            } = child.props;
            const parsedChildren = parseChildren(folderChildren, id);
            acc.push({
                id,
                name,
                isFolder: true,
                children: parsedChildren.filter((item) => item.parentId === id).map((item) => item.id),
                parentId,
                isExpanded,
                onExpandChange,
                isSelected,
                onSelectChange,
                isFocused,
                onFocusChange,
            });
            for (const descendant of parsedChildren) {
                acc.push(descendant);
            }
        }
        return acc;
    }, []);
};
