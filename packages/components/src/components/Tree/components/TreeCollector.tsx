/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext, useId, useLayoutEffect, type ReactNode } from 'react';

import { ROOT_ID } from '../constants';
import { type TreeFolderProps, type TreeItemData, type TreeItemProps } from '../types';
import { type ParsedChildren, toFolderRowData, toItemData } from '../utils/parseChildren';

export const COLLECT_ATTR = 'data-tree-collect-key';

type CollectedEntry =
    | { kind: 'item'; parentId: string; props: TreeItemProps }
    | { kind: 'folder'; parentId: string; props: TreeFolderProps }
    | { kind: 'loading'; parentId: string };

export type CollectStore = {
    entries: Map<string, CollectedEntry>;
    requestFlush: () => void;
};

const TreeCollectContext = createContext<CollectStore | null>(null);
export const TreeParentContext = createContext<string>(ROOT_ID);

/**
 * Registers a row rendered inside the collect pass. Returns the marker key, or `null`
 * outside a collect pass, where Tree parts stay inert markers read by `parseChildren`.
 */
export const useCollectedEntry = (
    build: (parentId: string) => CollectedEntry,
): { key: string; isCollecting: boolean } => {
    const store = useContext(TreeCollectContext);
    const parentId = useContext(TreeParentContext);
    const key = useId();
    useLayoutEffect(() => {
        if (!store) {
            return;
        }
        store.entries.set(key, build(parentId));
        store.requestFlush();
        return () => {
            store.entries.delete(key);
            store.requestFlush();
        };
    });
    return { key, isCollecting: store !== null };
};

export const TreeCollector = ({
    store,
    containerRef,
    children,
}: {
    store: CollectStore;
    containerRef: React.RefObject<HTMLDivElement>;
    children: ReactNode;
}) => (
    <div ref={containerRef} hidden aria-hidden="true">
        <TreeCollectContext.Provider value={store}>{children}</TreeCollectContext.Provider>
    </div>
);

/** Builds the flat item list from the markers' document order. */
export const buildCollectedItems = (container: HTMLElement, entries: Map<string, CollectedEntry>): ParsedChildren => {
    const loadingParents = new Set<string>();
    for (const entry of entries.values()) {
        if (entry.kind === 'loading') {
            loadingParents.add(entry.parentId);
        }
    }
    const ordered: CollectedEntry[] = [];
    for (const marker of container.querySelectorAll(`[${COLLECT_ATTR}]`)) {
        const entry = entries.get(marker.getAttribute(COLLECT_ATTR) ?? '');
        if (entry && entry.kind !== 'loading') {
            ordered.push(entry);
        }
    }
    const childIdsByParent = new Map<string, string[]>();
    for (const entry of ordered) {
        if (entry.kind === 'loading') {
            continue;
        }
        const siblings = childIdsByParent.get(entry.parentId) ?? [];
        siblings.push(entry.props.id);
        childIdsByParent.set(entry.parentId, siblings);
    }
    const items: TreeItemData[] = ordered.map((entry) => {
        if (entry.kind === 'folder') {
            return toFolderRowData(
                entry.props,
                entry.parentId,
                childIdsByParent.get(entry.props.id) ?? [],
                loadingParents.has(entry.props.id),
            );
        }
        if (entry.kind === 'item') {
            return toItemData(entry.props, entry.parentId);
        }
        throw new Error('unreachable');
    });
    return { items, parentIsLoading: loadingParents.has(ROOT_ID), hasForeignRows: true };
};
