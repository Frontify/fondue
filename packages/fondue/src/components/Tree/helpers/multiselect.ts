/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from '@components/Checkbox';

import { type TreeItemMultiselectProps } from '../types';

import { ROOT_ID } from './constants';

export type TreeItemMultiselectWithNodes = TreeItemMultiselectProps & {
    id: string;
    parentId: string;
    extendedId?: string;
    nodes?: TreeItemMultiselectWithNodes[];
    numChildNodes?: number;
    onSelect?: (id: string) => void;
};

export const getMultiselectCheckBoxState = (isSelected: boolean, isPartialSelected: boolean) => {
    let theCheckboxState = CheckboxState.Unchecked;
    if (isSelected) {
        theCheckboxState = CheckboxState.Checked;
    } else if (isPartialSelected) {
        theCheckboxState = CheckboxState.Mixed;
    }

    return theCheckboxState;
};

export const getSelectedChildrenItems = (
    tree: TreeItemMultiselectWithNodes[],
    selectedIds: string[],
    onlyPartial = false,
) => {
    return tree
        .filter(
            (item) =>
                (onlyPartial ? false : selectedIds.includes(getExtendedId(item))) ||
                selectedIds.includes(convertToPartialSelectedId([getExtendedId(item)])[0]),
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
    if (!itemChecked) {
        return newSelectedItems;
    }

    const itemCheckedExtendedId = getExtendedId(itemChecked);
    const childrenSelectedItems = getSelectedChildrenItems(itemChecked?.nodes ?? [], newSelectedItems);
    const childrenCount = itemChecked?.nodes?.length ?? 0;

    // Select/unselect children
    if (childrenCount) {
        const childrenIds = itemChecked?.nodes?.map((item) => getExtendedId(item)) ?? [];

        newSelectedItems = newSelectedItems.includes(itemCheckedExtendedId)
            ? addSelectedIds(newSelectedItems, childrenIds, false)
            : removeSelectedIds(newSelectedItems, childrenIds, false);

        if (childrenSelectedItems.length === 0) {
            newSelectedItems = removeSelectedIds(newSelectedItems, [itemCheckedExtendedId], true);
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
    const parentExtendedId = getExtendedId(parent);
    const isParentSelected = newSelectedItems.includes(parentExtendedId);
    const siblingsSelectedItems = getSelectedChildrenItems(parent?.nodes ?? [], newSelectedItems);
    const siblingsPartiallySelectedItems = getSelectedChildrenItems(parent?.nodes ?? [], newSelectedItems, true);
    const siblingsCount = parent?.nodes?.length ?? 0;

    // Select/unselect parent
    if (siblingsSelectedItems.length === 0) {
        newSelectedItems = isParentSelected
            ? removeSelectedIds(newSelectedItems, [parentExtendedId], false)
            : newSelectedItems;
        newSelectedItems = removeSelectedIds(newSelectedItems, [parentExtendedId], true);
    } else if (siblingsSelectedItems.length === siblingsCount && siblingsPartiallySelectedItems.length === 0) {
        newSelectedItems = !isParentSelected
            ? addSelectedIds(newSelectedItems, [parentExtendedId], false)
            : newSelectedItems;

        newSelectedItems = removeSelectedIds(newSelectedItems, [parentExtendedId], true);
    } else if (parent?.id) {
        // flag parent as partial checked and unselect it
        newSelectedItems = addSelectedIds(newSelectedItems, [parentExtendedId], true);
        newSelectedItems = removeSelectedIds(newSelectedItems, [parentExtendedId], false);
    }

    return newSelectedItems;
};

export const cleanOrphanSelectedIds = (selectIds: string[]) => {
    const orphans: string[] = [];
    let newSelectedIds: string[] = selectIds;

    const cleanSelectedIds = selectIds.map((extendedId) => extendedId.split('/').pop());

    for (const extendedId of selectIds) {
        const parentId = extendedId.split('/').shift();
        if (parentId === ROOT_ID || parentId === convertToPartialSelectedId([ROOT_ID])[0]) {
            continue;
        }
        if (
            !cleanSelectedIds.includes(parentId) &&
            !cleanSelectedIds.includes(removePartialFlagSelectedId([parentId ?? ''])[0] ?? '')
        ) {
            orphans.push(extendedId);
        }
    }

    if (orphans.length > 0) {
        newSelectedIds = removeSelectedIds(selectIds, orphans, false);
        newSelectedIds = cleanOrphanSelectedIds(newSelectedIds);
    }

    return newSelectedIds;
};

export const convertToPartialSelectedId = (ids: string[]) => ids.map((id) => `*${id}`);
export const removePartialFlagSelectedId = (ids: string[]) => ids.map((id) => id.replace(/^\*/, ''));
export const getExtendedId = (item: TreeItemMultiselectWithNodes) => item.extendedId ?? `${item.parentId}/${item.id}`;

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

    const itemToChecked = getSelectedTreeItem(treeItems, id);
    if (!itemToChecked) {
        return selectedIds;
    }

    const extendedId = getExtendedId(itemToChecked);

    if (selectedIds.includes(extendedId) && !ignoreRemoveSelected) {
        newSelectedItems = removeSelectedIds(selectedIds, [extendedId], false);
    } else {
        newSelectedItems = addSelectedIds(selectedIds, [extendedId], false);
        newSelectedItems = removeSelectedIds(newSelectedItems, [extendedId], true);
    }

    newSelectedItems = addSelectedItemsFromSelection(treeItems, id, newSelectedItems);
    return cleanOrphanSelectedIds(newSelectedItems);
};
