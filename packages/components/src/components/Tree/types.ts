/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

type TreeNodeBase = {
    id: string;
    name: string;
    isFolder: boolean;
    isExpanded?: boolean;
    isSelected?: boolean;
    isActive?: boolean;
};

export type TreeNodeState = TreeNodeBase & {
    children?: TreeNodeState[];
};

export type TreeChangeState = TreeNodeState[];

/**
 * Internal flat representation consumed by the headless-tree data loader. Built from JSX
 * by `parseChildren`; not part of the public API.
 */
export type TreeItemData = {
    id: string;
    name: string;
    isFolder: boolean;
    parentId?: string;
    children?: string[];
    isExpanded?: boolean;
    onExpandChange?: (isExpanded: boolean) => void;
    isSelected?: boolean;
    onSelectChange?: (isSelected: boolean) => void;
    isActive?: boolean;
};

export type TreeRootProps = {
    children: ReactNode;
    onChange?: (state: TreeChangeState) => void;
    /**
     * Renders a checkbox in each row for multi-selection. Folder checkboxes show an
     * indeterminate state when some descendants are checked and cascade-toggle their
     * descendants on click.
     * @default false
     */
    multiSelect?: boolean;
    /**
     * Enables drag-and-drop reordering of items. When false, items are static and
     * no drag handle is rendered.
     * @default false
     */
    reorderable?: boolean;
};

export type TreeItemProps = {
    id: string;
    label: string;
    isSelected?: boolean;
    onSelectChange?: (isSelected: boolean) => void;
    /**
     * Marks this item as the currently active one (e.g. the active route when
     * the Tree is used as a navigation menu). Purely declarative — the consumer
     * owns the value and toggles it (typically in response to a route change).
     */
    isActive?: boolean;
};

export type TreeFolderProps = {
    children: ReactNode;
    id: string;
    label: string;
    isExpanded?: boolean;
    onExpandChange?: (isExpanded: boolean) => void;
    isSelected?: boolean;
    onSelectChange?: (isSelected: boolean) => void;
    isActive?: boolean;
};
