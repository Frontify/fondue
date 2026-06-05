/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';

import { ROOT_ID } from '../constants';
import { type TreeFolderProps, type TreeItemActionProps, type TreeItemData, type TreeItemProps } from '../types';

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
const isTreeItemActionElement = hasDisplayName<TreeItemActionProps>('Tree.ItemAction');

/**
 * Pulls a single `<Tree.ItemAction>` out of an item/folder's JSX children. Returns the
 * action's rendered content (so the row can render it directly) and the remaining
 * children, which for folders are the nested rows.
 */
const extractItemAction = (children: ReactNode): { action: ReactNode; rest: ReactNode[] } => {
    let action: ReactNode = undefined;
    const rest: ReactNode[] = [];
    for (const child of Children.toArray(children)) {
        if (isValidElement(child) && isTreeItemActionElement(child)) {
            action = child.props.children;
            continue;
        }
        rest.push(child);
    }
    return { action, rest };
};

const toItemData = (props: TreeItemProps, parentId: string): TreeItemData => {
    const { action } = extractItemAction(props.children);
    return {
        id: props.id,
        name: props.label,
        isFolder: false,
        parentId,
        isSelected: props.isSelected,
        onSelectChange: props.onSelectChange,
        isActive: props.isActive,
        onClick: props.onClick,
        onMove: props.onMove,
        actions: action,
        tags: props.tags,
    };
};

type FolderParse = {
    folder: TreeItemData;
    descendants: TreeItemData[];
};

const toFolderData = (props: TreeFolderProps, parentId: string): FolderParse => {
    const { action, rest } = extractItemAction(props.children);
    const nested = parseChildren(rest, props.id);
    return {
        folder: {
            id: props.id,
            name: props.label,
            isFolder: true,
            parentId,
            children: nested.items.filter((item) => item.parentId === props.id).map((item) => item.id),
            isExpanded: props.isExpanded,
            onExpandChange: props.onExpandChange,
            isSelected: props.isSelected,
            onSelectChange: props.onSelectChange,
            isActive: props.isActive,
            onClick: props.onClick,
            onMove: props.onMove,
            actions: action,
            isLoading: nested.parentIsLoading,
            tags: props.tags,
            accepts: props.accepts,
        },
        descendants: nested.items,
    };
};

/**
 * Walks the JSX children of `<Tree.Root>` and produces a flat `TreeItemData[]` for
 * headless-tree's data loader. A `<Tree.Loading>` child sets `isLoading` on the
 * surrounding folder (or surfaces via `parentIsLoading` at the top level for `TreeRoot`
 * to render the root loading row). Components are matched by `displayName` — not
 * identity — so HMR component swaps don't break the tree.
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
