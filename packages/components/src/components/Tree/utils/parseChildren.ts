/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';

import { ROOT_ID } from '../constants';
import {
    type TreeActionProps,
    type TreeFolderHeaderProps,
    type TreeFolderProps,
    type TreeIconProps,
    type TreeItemData,
    type TreeItemProps,
    type TreeLabelProps,
} from '../types';

export type ParsedChildren = {
    items: TreeItemData[];
    /**
     * `true` when a `<Tree.Loading>` child appears in the parent context being parsed.
     * Folder recursions fold this into the folder's own `TreeItemData.isLoading`; the
     * top-level call exposes it via `parentIsLoading` so `TreeRoot` can render the
     * root-level loading row.
     */
    parentIsLoading: boolean;
};

const hasDisplayName =
    <Props>(displayName: string) =>
    (element: ReactElement): element is ReactElement<Props> =>
        (element.type as { displayName?: string })?.displayName === displayName;

const isTreeItemElement = hasDisplayName<TreeItemProps>('Tree.Item');
const isTreeFolderElement = hasDisplayName<TreeFolderProps>('Tree.Folder');
const isTreeLoadingElement = hasDisplayName<Record<string, never>>('Tree.Loading');
const isTreeActionElement = hasDisplayName<TreeActionProps>('Tree.Action');
const isTreeIconElement = hasDisplayName<TreeIconProps>('Tree.Icon');
const isTreeLabelElement = hasDisplayName<TreeLabelProps>('Tree.Label');
const isTreeFolderHeaderElement = hasDisplayName<TreeFolderHeaderProps>('Tree.FolderHeader');

type RowParts = {
    /** Text from `<Tree.Label>`; empty string when the part is missing. */
    name: string;
    icon: ReactNode;
    action: ReactNode;
    rest: ReactNode[];
};

/**
 * Pulls the anatomy parts (`<Tree.Label>`, `<Tree.Icon>`, `<Tree.Action>`) out of a row's
 * JSX children. The remaining children — for folders, the nested rows — are returned as
 * `rest`. The last occurrence of a repeated part wins; non-part, non-row children are
 * passed through in `rest` where the folder/row parsing decides their fate.
 */
const extractRowParts = (children: ReactNode): RowParts => {
    let name = '';
    let icon: ReactNode = undefined;
    let action: ReactNode = undefined;
    const rest: ReactNode[] = [];
    for (const child of Children.toArray(children)) {
        if (!isValidElement(child)) {
            rest.push(child);
            continue;
        }
        if (isTreeLabelElement(child)) {
            name = child.props.children;
            continue;
        }
        if (isTreeIconElement(child)) {
            icon = child.props.children;
            continue;
        }
        if (isTreeActionElement(child)) {
            action = child.props.children;
            continue;
        }
        rest.push(child);
    }
    return { name, icon, action, rest };
};

const sharedRowData = (props: TreeItemProps | TreeFolderProps, parentId: string) => ({
    id: props.id,
    parentId,
    isSelected: props.isSelected,
    onSelectChange: props.onSelectChange,
    isRenaming: props.isRenaming,
    onRenamingChange: props.onRenamingChange,
    onRename: props.onRename,
    onClick: props.onClick,
    onMove: props.onMove,
    tags: props.tags,
});

const toItemData = (props: TreeItemProps, parentId: string): TreeItemData => {
    const { name, icon, action } = extractRowParts(props.children);
    return {
        ...sharedRowData(props, parentId),
        name,
        isFolder: false,
        icon,
        actions: action,
    };
};

type FolderParse = {
    folder: TreeItemData;
    descendants: TreeItemData[];
};

const toFolderData = (props: TreeFolderProps, parentId: string): FolderParse => {
    // The folder's own row parts live inside `<Tree.FolderHeader>`; everything else
    // under the folder is its nested rows.
    const headerElement = Children.toArray(props.children).filter(isValidElement).find(isTreeFolderHeaderElement);
    const { name, icon, action } = extractRowParts(headerElement?.props.children);
    const rows = Children.toArray(props.children).filter(
        (child) => !(isValidElement(child) && isTreeFolderHeaderElement(child)),
    );
    const nested = parseChildren(rows, props.id);
    return {
        folder: {
            ...sharedRowData(props, parentId),
            name,
            isFolder: true,
            children: nested.items.filter((item) => item.parentId === props.id).map((item) => item.id),
            isExpanded: props.isExpanded,
            onExpandChange: props.onExpandChange,
            icon,
            actions: action,
            isLoading: nested.parentIsLoading,
            accepts: props.accepts,
        },
        descendants: nested.items,
    };
};

/**
 * Walks the JSX children of `<Tree.Root>` and produces a flat `TreeItemData[]` for
 * headless-tree's data loader. Rows declare their content via anatomy parts:
 * `<Tree.Label>` (plain text), `<Tree.Icon>`, and `<Tree.Action>` — placed directly
 * inside `<Tree.Item>`, or inside `<Tree.FolderHeader>` for a folder's own row.
 * A `<Tree.Loading>` child sets `isLoading` on the surrounding folder (or surfaces via
 * `parentIsLoading` at the top level for `TreeRoot` to render the root loading row).
 * Components are matched by `displayName` — not identity — so HMR component swaps
 * don't break the tree.
 */
export const parseChildren = (children: ReactNode, parentId: string = ROOT_ID): ParsedChildren => {
    const items: TreeItemData[] = [];
    let parentIsLoading = false;

    for (const child of Children.toArray(children)) {
        if (!isValidElement(child)) {
            continue;
        }
        if (isTreeLoadingElement(child)) {
            parentIsLoading = true;
            continue;
        }
        if (isTreeItemElement(child)) {
            items.push(toItemData(child.props, parentId));
            continue;
        }
        if (isTreeFolderElement(child)) {
            const { folder, descendants } = toFolderData(child.props, parentId);
            items.push(folder, ...descendants);
        }
    }

    return { items, parentIsLoading };
};
