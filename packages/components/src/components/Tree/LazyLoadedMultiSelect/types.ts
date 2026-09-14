/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type TreeRootProps } from '../Tree';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** One row as returned by `loadChildren`. */
export type LazyTreeNode = {
    id: string;
    name: string;
    isFolder: boolean;
    /** Frozen row: cannot be selected or unselected, not even by a folder cascade. */
    isDisabled?: boolean;
    /**
     * Leaves: whether the row is selected.
     *
     * Folders: the server's summary of the folder's contents, so a collapsed folder renders
     * correctly before they are loaded — `true` when every selectable descendant is selected,
     * `'indeterminate'` when only some are, `false` / omitted when none is. A folder reported
     * `'indeterminate'` loads its children right away, since a mixed state can only be backed
     * by real rows. Once loaded, the folder derives its checkbox from its children and this
     * value is no longer used.
     *
     * The summary has to use the same definition as the Tree's derivation. With the Tree's
     * default (`countDisabledInFolderState=false`) disabled descendants do not count, so a
     * folder with an unselected disabled child can still be `true`.
     */
    isSelected?: boolean | 'indeterminate';
};

/** Optional row parts, rendered into `<Tree.Icon>`, `<Tree.Decorator>` and `<Tree.Action>`. */
export type RowRenderers = {
    renderIcon?: (node: LazyTreeNode) => ReactNode;
    renderDecorator?: (node: LazyTreeNode) => ReactNode;
    renderAction?: (node: LazyTreeNode) => ReactNode;
};

export type LazyLoadedMultiSelectProps = Omit<TreeRootProps, 'children' | 'multiSelect'> &
    RowRenderers & {
        /**
         * Fetches the direct children of a folder — `null` for the top level. Called at most
         * once per folder: when it is first expanded, or immediately for a folder reported as
         * `'indeterminate'`. A rejected promise leaves the folder unloaded so expanding it
         * again retries.
         */
        loadChildren: (parentId: string | null) => Promise<LazyTreeNode[]>;
        /**
         * Fires for every row whose selected state changes, whether by its own checkbox, a
         * folder cascade, or a selection carried over to children when they finish loading.
         * A folder reports itself only while it has no loaded children (it is checkable as its
         * own entity then); afterwards its state is derived — read it from `onChange`.
         */
        onSelectChange?: (node: LazyTreeNode, isSelected: boolean) => void;
        onLoadError?: (parentId: string | null, error: unknown) => void;
    };

// ---------------------------------------------------------------------------
// Internal node model
// ---------------------------------------------------------------------------

/** What a node needs from its owner: the callbacks and a way to request a re-render. */
export type NodeContext = Pick<LazyLoadedMultiSelectProps, 'loadChildren' | 'onSelectChange' | 'onLoadError'> & {
    notify: () => void;
};

/** What every row exposes to its parent. */
export type TreeNode = {
    setSelected: (isSelected: boolean) => void;
    render: (renderers: RowRenderers) => ReactNode;
};
