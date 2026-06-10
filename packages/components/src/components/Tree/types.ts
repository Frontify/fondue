/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MouseEventHandler, type ReactNode } from 'react';

/** New position of a moved item: the id of its new parent folder (`'root'` for top-level) and its index within it. */
export type TreeMoveInfo = {
    parentId: string;
    index: number;
};

type TreeNodeBase = {
    id: string;
    name: string;
    isFolder: boolean;
    isExpanded?: boolean;
    /** `'indeterminate'` is reported on folders in multi-select mode when only some leaf descendants are checked. */
    isSelected?: boolean | 'indeterminate';
    /** Echoes back the `tags` attached to this row. */
    tags?: string[];
};

export type TreeNodeState = TreeNodeBase & {
    children?: TreeNodeState[];
};

export type TreeChangeState = TreeNodeState[];

/** One dragged row, as passed to an `accepts` predicate. */
export type TreeDropCandidate = {
    id: string;
    label: string;
    isFolder: boolean;
    tags: string[];
};

type TreeRowSharedProps = {
    id: string;
    /**
     * Selects the row: checks its checkbox (`multiSelect`) or highlights it (single-select).
     * In multi-select mode a folder's `isSelected` is ignored — folder selection is derived
     * from its contents and reported via `onChange` (`'indeterminate'` is output-only).
     */
    isSelected?: boolean | 'indeterminate';
    onSelectChange?: (isSelected: boolean) => void;
    /**
     * Shows an inline rename input for the row (fully controlled). Enter/blur commits,
     * Escape cancels; both fire `onRenamingChange(false)`.
     */
    isRenaming?: boolean;
    onRenamingChange?: (isRenaming: boolean) => void;
    /**
     * Fires when a rename commits with a changed, non-empty name. The Tree never stores
     * names — re-render with the updated `<Tree.Label>` to apply it.
     */
    onRename?: (newName: string) => void;
    /** Fires when the row is activated by click or keyboard (Enter / Space). */
    onClick?: MouseEventHandler<HTMLDivElement>;
    /** Fires after this item is repositioned via drag-and-drop. */
    onMove?: (info: TreeMoveInfo) => void;
    /** Consumer-defined labels passed to `accepts` drop predicates. No visual effect. */
    tags?: string[];
    /**
     * Freezes the row at its prop-driven state: it can't be selected/checked (not even
     * by a folder cascade), dragged, renamed, or dropped into, and `onClick` is
     * suppressed. Folders stay expandable and only their own row is frozen — descendants
     * remain interactive unless disabled themselves. The frozen state still counts
     * toward ancestor folders' checkbox state, so a folder holding a disabled-unchecked
     * leaf shows 'indeterminate' once its other leaves are checked.
     */
    isDisabled?: boolean;
};

export type TreeItemProps = TreeRowSharedProps & {
    /** `<Tree.Label>` (required), plus an optional `<Tree.Icon>`, `<Tree.Decorator>` and `<Tree.Action>`. */
    children: ReactNode;
};

export type TreeFolderProps = TreeRowSharedProps & {
    /** A `<Tree.FolderHeader>` for the folder's own row, followed by its nested rows. */
    children: ReactNode;
    isExpanded?: boolean;
    onExpandChange?: (isExpanded: boolean) => void;
    /**
     * Decides whether the dragged items may be dropped into this folder. Return `true`
     * only if all candidates are welcome. Omitted = accepts anything.
     */
    accepts?: (items: TreeDropCandidate[]) => boolean;
};

export type TreeActionProps = {
    children: ReactNode;
};

/**
 * Passive decorators (badges, status icons) rendered right after the label, hugging the
 * text. Clicks inside it bubble to the row (activating it) — interactive controls belong
 * in `<Tree.Action>` instead. Hidden while the row is renaming.
 */
export type TreeDecoratorProps = {
    children: ReactNode;
};

export type TreeIconProps = {
    children: ReactNode;
};

export type TreeLabelProps = {
    /** Plain text only: doubles as the row's accessible name, the `name` in `onChange`, and the rename input's initial value. */
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
    isSelected?: boolean | 'indeterminate';
    onSelectChange?: (isSelected: boolean) => void;
    isRenaming?: boolean;
    onRenamingChange?: (isRenaming: boolean) => void;
    onRename?: (newName: string) => void;
    onClick?: MouseEventHandler<HTMLDivElement>;
    onMove?: (info: TreeMoveInfo) => void;
    icon?: ReactNode;
    decorator?: ReactNode;
    actions?: ReactNode;
    isLoading?: boolean;
    tags?: string[];
    accepts?: (items: TreeDropCandidate[]) => boolean;
    isDisabled?: boolean;
};
