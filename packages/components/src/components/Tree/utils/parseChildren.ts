/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';

import { ROOT_ID } from '../constants';
import {
    type TreeActionProps,
    type TreeDecoratorProps,
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
     * `true` when a `<Tree.Loading>` child appears in the parsed context. Folder
     * recursions fold it into the folder's `isLoading`; the top-level call surfaces it
     * for `TreeRoot`'s root loading row.
     */
    parentIsLoading: boolean;
};

const TREE_DISPLAY_NAMES = new Set([
    'Tree.Item',
    'Tree.Folder',
    'Tree.Loading',
    'Tree.Action',
    'Tree.Decorator',
    'Tree.Icon',
    'Tree.Label',
    'Tree.FolderHeader',
]);

const getDisplayName = (element: ReactElement): string | undefined =>
    (element.type as { displayName?: string })?.displayName;

const hasDisplayName =
    <Props>(displayName: string) =>
    (node: ReactNode): node is ReactElement<Props> =>
        isValidElement(node) && getDisplayName(node) === displayName;

const isTreeElement = (element: ReactElement): boolean => TREE_DISPLAY_NAMES.has(getDisplayName(element) ?? '');

const isTreeItemElement = hasDisplayName<TreeItemProps>('Tree.Item');
const isTreeFolderElement = hasDisplayName<TreeFolderProps>('Tree.Folder');
const isTreeLoadingElement = hasDisplayName<Record<string, never>>('Tree.Loading');
const isTreeActionElement = hasDisplayName<TreeActionProps>('Tree.Action');
const isTreeDecoratorElement = hasDisplayName<TreeDecoratorProps>('Tree.Decorator');
const isTreeIconElement = hasDisplayName<TreeIconProps>('Tree.Icon');
const isTreeLabelElement = hasDisplayName<TreeLabelProps>('Tree.Label');
const isTreeFolderHeaderElement = hasDisplayName<TreeFolderHeaderProps>('Tree.FolderHeader');

/**
 * Flattens `children` into the nodes the Tree cares about. Tree elements and
 * non-element nodes are kept as-is; every other element — a fragment, a DOM wrapper, a
 * context provider, any component receiving rows as `children` — is replaced by its own
 * `children`, recursively, so rows don't have to be direct children of their parent.
 * Wrappers are never rendered; only their nesting is seen through. A component that
 * *renders* Tree elements from its body cannot be seen — the parse runs before render.
 */
const flattenTreeChildren = (children: ReactNode): ReactNode[] => {
    const flat: ReactNode[] = [];
    for (const child of Children.toArray(children)) {
        if (isValidElement<{ children?: ReactNode }>(child) && !isTreeElement(child)) {
            flat.push(...flattenTreeChildren(child.props.children));
            continue;
        }
        flat.push(child);
    }
    return flat;
};

type RowParts = {
    /** Text from `<Tree.Label>`; empty string when the part is missing. */
    name: string;
    icon: ReactNode;
    decorator: ReactNode;
    action: ReactNode;
    rest: ReactNode[];
};

/**
 * Pulls the anatomy parts (Label, Icon, Decorator, Action) out of a row's JSX children;
 * everything else — for folders, the nested rows — returns as `rest`. The last
 * occurrence of a repeated part wins.
 */
const extractRowParts = (children: ReactNode): RowParts => {
    let name = '';
    let icon: ReactNode = undefined;
    let decorator: ReactNode = undefined;
    let action: ReactNode = undefined;
    const rest: ReactNode[] = [];
    for (const child of flattenTreeChildren(children)) {
        if (isTreeLabelElement(child)) {
            name = child.props.children;
            continue;
        }
        if (isTreeIconElement(child)) {
            icon = child.props.children;
            continue;
        }
        if (isTreeDecoratorElement(child)) {
            decorator = child.props.children;
            continue;
        }
        if (isTreeActionElement(child)) {
            action = child.props.children;
            continue;
        }
        rest.push(child);
    }
    return { name, icon, decorator, action, rest };
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
    isDisabled: props.isDisabled,
});

const toItemData = (props: TreeItemProps, parentId: string): TreeItemData => {
    const { name, icon, decorator, action } = extractRowParts(props.children);
    return {
        ...sharedRowData(props, parentId),
        name,
        isFolder: false,
        icon,
        decorator,
        actions: action,
    };
};

type FolderParse = {
    folder: TreeItemData;
    descendants: TreeItemData[];
};

const toFolderData = (props: TreeFolderProps, parentId: string): FolderParse => {
    // Row parts live in `<Tree.FolderHeader>`; everything else is nested rows.
    const nodes = flattenTreeChildren(props.children);
    const headerElement = nodes.find(isTreeFolderHeaderElement);
    const { name, icon, decorator, action } = extractRowParts(headerElement?.props.children);
    const rows = nodes.filter((node) => !isTreeFolderHeaderElement(node));
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
            decorator,
            actions: action,
            isLoading: nested.parentIsLoading,
            accepts: props.accepts,
        },
        descendants: nested.items,
    };
};

/**
 * Walks the JSX children of `<Tree.Root>` into a flat `TreeItemData[]` for headless-
 * tree's data loader. Anatomy parts sit inside `<Tree.Item>`, or inside
 * `<Tree.FolderHeader>` for a folder's own row; `<Tree.Loading>` marks its context
 * loading. Rows and parts may be nested in fragments or wrapper elements — see
 * `flattenTreeChildren`. Components are matched by `displayName` — not identity — so
 * HMR swaps don't break the tree.
 */
export const parseChildren = (children: ReactNode, parentId: string = ROOT_ID): ParsedChildren => {
    const items: TreeItemData[] = [];
    let parentIsLoading = false;

    for (const child of flattenTreeChildren(children)) {
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
