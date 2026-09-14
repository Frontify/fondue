/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { Tree } from '../Tree';

import { createItemNode } from './createItemNode';
import { renderRowParts } from './renderRowParts';
import { type LazyTreeNode, type NodeContext, type RowRenderers, type TreeNode } from './types';

type LoadStatus = 'unloaded' | 'loading' | 'loaded';

/** The lazily loaded rows inside a folder — or at the top level, for `folderId === null`. */
export type FolderContents = {
    load: () => void;
    hasLoadedChildren: () => boolean;
    /** Cascades to the loaded children, or remembers the decision for when they arrive. */
    setSelected: (isSelected: boolean) => void;
    render: (renderers: RowRenderers) => ReactNode[];
};

export const createFolderContents = (folderId: string | null, context: NodeContext): FolderContents => {
    const { loadChildren, onLoadError, notify } = context;

    let status: LoadStatus = 'unloaded';
    let children: TreeNode[] = [];
    /**
     * A decision taken before the contents were known (the folder was checked or unchecked
     * while unloaded). Applied to the children as soon as they arrive, so the derived state
     * matches what the user saw. Children of an untouched folder keep their server state.
     */
    let pendingSelection: boolean | null = null;

    const receiveChildren = (rows: LazyTreeNode[]): void => {
        children = rows.map((row) => createNode(row, context));
        status = 'loaded';
        if (pendingSelection !== null) {
            for (const child of children) {
                child.setSelected(pendingSelection);
            }
            pendingSelection = null;
        }
        notify();
    };

    // Back to unloaded, so the next expansion retries.
    const failLoading = (error: unknown): void => {
        status = 'unloaded';
        notify();
        onLoadError?.(folderId, error);
    };

    const load = (): void => {
        if (status !== 'unloaded') {
            return;
        }
        status = 'loading';
        notify();
        loadChildren(folderId).then(receiveChildren).catch(failLoading);
    };

    const setSelected = (next: boolean): void => {
        if (status !== 'loaded') {
            pendingSelection = next;
        }
        for (const child of children) {
            child.setSelected(next);
        }
    };

    const hasLoadedChildren = (): boolean => children.length > 0;

    // An array, not a fragment: the Tree flattens arrays when it reads rows from the JSX,
    // whereas a fragment would hide them behind one opaque element.
    const render = (renderers: RowRenderers): ReactNode[] => [
        status === 'loading' ? <Tree.Loading key="loading" /> : null,
        ...children.map((child) => child.render(renderers)),
    ];

    return { load, hasLoadedChildren, setSelected, render };
};

export const createFolderNode = (data: LazyTreeNode, context: NodeContext): TreeNode => {
    const { notify, onSelectChange } = context;
    const contents = createFolderContents(data.id, context);

    let isExpanded = false;
    /**
     * What the checkbox shows while the folder has no loaded children: the server's summary
     * at first, then whatever was clicked. Once children are loaded the Tree derives the
     * folder's state from them and ignores this value.
     */
    let placeholder: boolean | 'indeterminate' = data.isSelected ?? false;

    const setExpanded = (next: boolean): void => {
        isExpanded = next;
        notify();
        if (next) {
            contents.load();
        }
    };

    /**
     * From the Tree while the folder is a checkable unit (no loaded children — the Tree
     * cascades into loaded children itself, so this never fires for them), or from a
     * parent's carry-over. With loaded children the carry-over cascades one level further.
     */
    const setSelected = (next: boolean): void => {
        const changed = placeholder !== next;
        placeholder = next;
        contents.setSelected(next);
        if (changed) {
            notify();
            // Mirrors the Tree: a folder reports its own state only while it is a unit.
            if (!contents.hasLoadedChildren()) {
                onSelectChange?.(data, next);
            }
        }
    };

    const render = (renderers: RowRenderers): ReactNode => (
        <Tree.Folder
            key={data.id}
            id={data.id}
            isExpanded={isExpanded}
            onExpandChange={setExpanded}
            isSelected={placeholder}
            isDisabled={data.isDisabled}
            onSelectChange={setSelected}
        >
            <Tree.FolderHeader>{renderRowParts(data, renderers)}</Tree.FolderHeader>
            {contents.render(renderers)}
        </Tree.Folder>
    );

    // A partial selection is only a placeholder until the real children back it, so those
    // load right away — at initial load for root folders, and whenever a parent reveals one
    // deeper down. The folder stays collapsed; the Tree derives the checkbox from loaded
    // children whether or not they are visible.
    if (placeholder === 'indeterminate') {
        contents.load();
    }

    return { setSelected, render };
};

const createNode = (row: LazyTreeNode, context: NodeContext): TreeNode =>
    row.isFolder ? createFolderNode(row, context) : createItemNode(row, context);
