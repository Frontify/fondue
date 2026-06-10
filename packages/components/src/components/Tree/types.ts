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
    /**
     * Echoes back the `tags` the consumer attached to this row. Intrinsic per-row
     * metadata (e.g. used by `accepts` drop predicates) — included here so consumers
     * can re-render straight from `TreeChangeState` without maintaining a parallel
     * id→tags lookup.
     */
    tags?: string[];
};

export type TreeNodeState = TreeNodeBase & {
    children?: TreeNodeState[];
};

export type TreeChangeState = TreeNodeState[];

/**
 * One dragged row passed to a folder's (or the root's) `accepts` predicate. Carries
 * only what's needed to decide whether the drop should be allowed — identity for
 * special-casing and the row's `tags` for tag-based rules. The full hierarchical
 * shape is intentionally not exposed; consumers can look up richer state themselves
 * via `id` if they need it.
 */
export type TreeDropCandidate = {
    id: string;
    label: string;
    isFolder: boolean;
    tags: string[];
};

type TreeRowSharedProps = {
    id: string;
    /**
     * Marks the row as selected. With `<Tree.Root multiSelect>` this checks the row's
     * checkbox; without `multiSelect` it highlights the row's background. Always
     * sets `aria-selected="true"` on the row. The Tree tracks single-select state
     * internally, so consumers can simply read it back from `onChange` instead of
     * keeping a parallel `selectedId`.
     */
    isSelected?: boolean;
    onSelectChange?: (isSelected: boolean) => void;
    /**
     * Switches the row's label to an inline text input for renaming. Fully controlled:
     * renaming can only be started through this prop (typically from a 'Rename' entry
     * in a `<Tree.Action>` overflow menu). Enter or clicking away commits the edit,
     * Escape cancels it; either way `onRenamingChange(false)` fires so the consumer
     * can reset the flag.
     */
    isRenaming?: boolean;
    onRenamingChange?: (isRenaming: boolean) => void;
    /**
     * Fires when an inline rename is committed with a changed, non-empty name. The
     * global `Tree.Root` `onChange` is also emitted with the row's new `name`. The
     * Tree never stores the name itself — re-render with the updated `<Tree.Label>`
     * to apply it.
     */
    onRename?: (newName: string) => void;
    /**
     * Fires when the row is activated by mouse click or keyboard (Enter / Space on a
     * focused row). For folders this fires alongside the expand-toggle that the click
     * also triggers.
     */
    onClick?: MouseEventHandler<HTMLDivElement>;
    /** Fires after this item is repositioned via drag-and-drop. */
    onMove?: (info: TreeMoveInfo) => void;
    /**
     * Arbitrary consumer-defined labels attached to this row. Passed to a target
     * folder's (or the root's) `accepts` predicate so drop rules can be expressed
     * in terms of tags (e.g. only allow rows tagged `image` into an `images/`
     * folder). Has no built-in visual effect.
     */
    tags?: string[];
};

export type TreeItemProps = TreeRowSharedProps & {
    /**
     * Row anatomy parts: `<Tree.Label>` (required — the row's text), an optional
     * `<Tree.Icon>` rendered before the label (rows have no icon otherwise), and an
     * optional `<Tree.Action>` rendering trailing controls (e.g. an overflow menu).
     */
    children: ReactNode;
};

export type TreeFolderProps = TreeRowSharedProps & {
    /**
     * A `<Tree.FolderHeader>` declaring the folder's own row (its `<Tree.Label>`,
     * optional `<Tree.Icon>` and `<Tree.Action>`), followed by the nested rows
     * (`<Tree.Item>` / `<Tree.Folder>` / `<Tree.Loading>`).
     */
    children: ReactNode;
    isExpanded?: boolean;
    onExpandChange?: (isExpanded: boolean) => void;
    /**
     * Predicate called during drag to decide whether the candidate items can be
     * dropped into this folder. Returning `false` suppresses the drop indicator,
     * shows the browser's "no-drop" cursor, and prevents `onMove` / `onChange`
     * from firing. Called with every dragged item in a multi-item drag — return
     * `true` only if all of them are welcome. When omitted, the folder accepts
     * anything (current default).
     */
    accepts?: (items: TreeDropCandidate[]) => boolean;
};

export type TreeActionProps = {
    children: ReactNode;
};

export type TreeIconProps = {
    children: ReactNode;
};

export type TreeLabelProps = {
    /**
     * Plain text only: the label doubles as the row's accessible name, the `name`
     * reported through `onChange`, and the initial value of the rename input.
     */
    children: string;
};

export type TreeFolderHeaderProps = {
    children: ReactNode;
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
    isRenaming?: boolean;
    onRenamingChange?: (isRenaming: boolean) => void;
    onRename?: (newName: string) => void;
    onClick?: MouseEventHandler<HTMLDivElement>;
    onMove?: (info: TreeMoveInfo) => void;
    icon?: ReactNode;
    actions?: ReactNode;
    isLoading?: boolean;
    tags?: string[];
    accepts?: (items: TreeDropCandidate[]) => boolean;
};
