/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeItemMultiselectProps } from '../types';

export type TreeItemMultiselectWithNodes = TreeItemMultiselectProps & {
    id: string;
    nodes?: TreeItemMultiselectWithNodes[];
    numChildNodes?: number;
    onSelect?: (id: string) => void;
};

export const getSelectedChildrenItems = (
    tree: TreeItemMultiselectWithNodes[],
    selectedIds: string[],
    onlyPartial = false,
) => {
    return tree
        .filter(
            (item) =>
                (onlyPartial ? false : selectedIds.includes(item.id)) ||
                selectedIds.includes(convertToPartialSelectedId([item.id])[0]),
        )
        .map((item) => item.id);
};

export const getSelectedTreeItem = (
    tree: TreeItemMultiselectWithNodes[],
    id: string,
): TreeItemMultiselectWithNodes | null => {
    for (const item of tree) {
        if (item.id === id) {
            return item;
        }
        if (item.nodes && item.nodes?.length > 0) {
            const deepItem = getSelectedTreeItem(item.nodes, id);
            if (deepItem) {
                return deepItem;
            }
        }
    }

    return null;
};

export const getParentSelectedTreeItem = (
    tree: TreeItemMultiselectWithNodes[],
    id: string,
    parent: TreeItemMultiselectWithNodes | null,
): TreeItemMultiselectWithNodes | null => {
    for (const item of tree) {
        if (parent !== null && item.id === id) {
            return parent;
        }
        if (item.nodes && item.nodes?.length > 0) {
            const deepItem = getParentSelectedTreeItem(item.nodes, id, item);
            if (deepItem) {
                return deepItem;
            }
        }
    }
    return null;
};

export const addSelectedItemsFromSelection = (
    treeItems: TreeItemMultiselectWithNodes[],
    id: string,
    newSelectedItems: string[],
) => {
    const parentItemChecked = getParentSelectedTreeItem(treeItems, id, null);
    newSelectedItems = parentItemChecked?.id
        ? fixParentSelectionState(parentItemChecked, newSelectedItems)
        : newSelectedItems;

    const itemChecked = getSelectedTreeItem(treeItems, id);
    const childrenSelectedItems = getSelectedChildrenItems(itemChecked?.nodes ?? [], newSelectedItems);
    const childrenCount = itemChecked?.nodes?.length ?? 0;

    // Select/unselect children
    if (childrenCount) {
        const childrenIds = itemChecked?.nodes?.map((item) => item.id) ?? [];

        newSelectedItems = newSelectedItems.includes(id)
            ? addSelectedIds(newSelectedItems, childrenIds, false)
            : removeSelectedIds(newSelectedItems, childrenIds, false);

        if (childrenSelectedItems.length === 0) {
            newSelectedItems = removeSelectedIds(newSelectedItems, [id], true);
        }
    }

    // tree down
    for (const child of itemChecked?.nodes ?? []) {
        newSelectedItems = addSelectedItemsFromSelection(treeItems, child.id, newSelectedItems);
    }

    // tree up
    let parent = parentItemChecked;
    const treeBranch: TreeItemMultiselectWithNodes[] = [];
    while (parent !== null) {
        treeBranch.push(parent);
        parent = getParentSelectedTreeItem(treeItems, parent.id, null);
    }
    for (const item of treeBranch) {
        newSelectedItems = fixParentSelectionState(item, newSelectedItems);
    }

    return newSelectedItems;
};

export const fixParentSelectionState = (parent: TreeItemMultiselectWithNodes, newSelectedItems: string[]) => {
    const isParentSelected = newSelectedItems.includes(parent?.id ?? '');
    const siblingsSelectedItems = getSelectedChildrenItems(parent?.nodes ?? [], newSelectedItems);
    const siblingsPartiallySelectedItems = getSelectedChildrenItems(parent?.nodes ?? [], newSelectedItems, true);
    const siblingsCount = parent?.nodes?.length ?? 0;

    // Select/unselect parent
    if (siblingsSelectedItems.length === 0) {
        newSelectedItems = isParentSelected
            ? removeSelectedIds(newSelectedItems, [parent?.id ?? ''], false)
            : newSelectedItems;
        newSelectedItems = removeSelectedIds(newSelectedItems, [parent?.id ?? ''], true);
    } else if (siblingsSelectedItems.length === siblingsCount && siblingsPartiallySelectedItems.length === 0) {
        newSelectedItems = !isParentSelected
            ? addSelectedIds(newSelectedItems, [parent?.id ?? ''], false)
            : newSelectedItems;

        newSelectedItems = removeSelectedIds(newSelectedItems, [parent?.id ?? ''], true);
    } else if (parent?.id) {
        // flag parent as partial checked and unselect it
        newSelectedItems = addSelectedIds(newSelectedItems, [parent?.id ?? ''], true);
        newSelectedItems = removeSelectedIds(newSelectedItems, [parent?.id ?? ''], false);
    }

    return newSelectedItems;
};

export const convertToPartialSelectedId = (ids: string[]) => ids.map((id) => `*${id}`);

export const removeSelectedIds = (ids: string[], idsToRemove: string[], partial: boolean): string[] => {
    idsToRemove = partial ? convertToPartialSelectedId(idsToRemove) : idsToRemove;
    return [...new Set(idsToRemove.length > 0 ? ids.filter((itemId: string) => !idsToRemove.includes(itemId)) : ids)];
};
export const addSelectedIds = (ids: string[], idsToAdd: string[], partial: boolean) => {
    idsToAdd = (partial ? convertToPartialSelectedId(idsToAdd) : idsToAdd).filter((id) => id !== '');
    return [...new Set(idsToAdd.length > 0 ? [...ids, ...idsToAdd] : ids)];
};

export const getNewSelectedItems = (
    id: string,
    selectedIds: string[],
    treeItems: TreeItemMultiselectWithNodes[],
    ignoreRemoveSelected = false,
) => {
    let newSelectedItems = [];

    if (selectedIds.includes(id) && !ignoreRemoveSelected) {
        newSelectedItems = removeSelectedIds(selectedIds, [id], false);
    } else {
        newSelectedItems = addSelectedIds(selectedIds, [id], false);
    }

    newSelectedItems = addSelectedItemsFromSelection(treeItems, id, newSelectedItems);

    return newSelectedItems;
};
