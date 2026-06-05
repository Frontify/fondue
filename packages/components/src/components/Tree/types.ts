/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MouseEventHandler, type ReactNode } from 'react';

/**
 * Fired after this item has been moved via drag-and-drop. `parentId` is the id of the
 * folder it now lives under (or `'root'` for top-level), `index` is its position within
 * that folder's children. Listening per-item is a convenience when only a few rows in the
 * tree need to react to their own position changing; the global `Tree.Root` `onChange` is
 * still emitted with the full new state.
 */
export type TreeMoveInfo = {
    parentId: string;
    index: number;
};

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

type TreeRowSharedProps = {
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
    /**
     * Fires when the row is activated by mouse click or keyboard (Enter / Space on a
     * focused row). For folders this fires alongside the expand-toggle that the click
     * also triggers.
     */
    onClick?: MouseEventHandler<HTMLDivElement>;
    /** Fires after this item is repositioned via drag-and-drop. */
    onMove?: (info: TreeMoveInfo) => void;
};

export type TreeItemProps = TreeRowSharedProps & {
    /**
     * Accepts `<Tree.ItemAction>` to render trailing controls (e.g. an action button
     * or overflow menu) at the end of the row.
     */
    children?: ReactNode;
};

export type TreeFolderProps = TreeRowSharedProps & {
    /**
     * Nested rows (`<Tree.Item>` / `<Tree.Folder>` / `<Tree.Loading>`) plus an optional
     * `<Tree.ItemAction>` that renders at the end of the folder's own row.
     */
    children: ReactNode;
    isExpanded?: boolean;
    onExpandChange?: (isExpanded: boolean) => void;
};

export type TreeItemActionProps = {
    children: ReactNode;
};

export type TreeLoadingProps = {
    /**
     * Text shown next to the spinner. Defaults to the translated "Loading…" string.
     * Useful when a more specific message ("Loading reports…") communicates better.
     */
    label?: string;
};

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
    onClick?: MouseEventHandler<HTMLDivElement>;
    onMove?: (info: TreeMoveInfo) => void;
    actions?: ReactNode;
    isLoading?: boolean;
    loadingLabel?: string;
};
