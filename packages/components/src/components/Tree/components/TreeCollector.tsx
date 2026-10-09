/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';

import { ROOT_ID } from '../constants';
import { type TreeFolderProps, type TreeItemData, type TreeItemProps } from '../types';
import { type ParsedChildren, toFolderRowData, toItemData } from '../utils/parseChildren';

export const COLLECT_ATTR = 'data-tree-collect-key';

type CollectedEntry =
    | { kind: 'item'; parentId: string; props: TreeItemProps }
    | { kind: 'folder'; parentId: string; props: TreeFolderProps }
    | { kind: 'loading'; parentId: string };

type RowEntry = Exclude<CollectedEntry, { kind: 'loading' }>;

export type CollectStore = {
    entries: Map<string, CollectedEntry>;
    requestFlush: () => void;
};

const TreeCollectContext = createContext<CollectStore | null>(null);
TreeCollectContext.displayName = 'TreeCollectContext';
export const TreeParentContext = createContext<string>(ROOT_ID);
TreeParentContext.displayName = 'TreeParentContext';

/**
 * Registers a row rendered inside the collect pass. Returns the marker key and whether a
 * collect pass is active; outside one, Tree parts stay inert markers read by `parseChildren`.
 */
export const useCollectedEntry = (
    build: (parentId: string) => CollectedEntry,
): { key: string; isCollecting: boolean } => {
    const store = useContext(TreeCollectContext);
    const parentId = useContext(TreeParentContext);
    const markerId = useId();
    useLayoutEffect(() => {
        if (!store) {
            return;
        }
        store.entries.set(markerId, build(parentId));
        store.requestFlush();
        return () => {
            store.entries.delete(markerId);
            store.requestFlush();
        };
    });
    return { key: markerId, isCollecting: store !== null };
};

export const TreeCollector = ({
    onCollect,
    children,
}: {
    onCollect: (parsed: ParsedChildren) => void;
    children: ReactNode;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<MutationObserver | null>(null);
    const onCollectRef = useRef(onCollect);
    const [flushTick, setFlushTick] = useState(0);
    const store = useMemo<CollectStore>(
        () => ({ entries: new Map(), requestFlush: () => setFlushTick((tick) => tick + 1) }),
        [],
    );

    useLayoutEffect(() => {
        onCollectRef.current = onCollect;
    });

    useLayoutEffect(() => {
        if (!containerRef.current) {
            return;
        }
        onCollectRef.current(buildCollectedItems(containerRef.current, store.entries));
        // Mutations this build already covered must not trigger another flush.
        observerRef.current?.takeRecords();
    }, [flushTick, store]);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }
        // Rows reordered with unchanged props move their markers without re-rendering; flush before paint.
        // eslint-disable-next-line @eslint-react/dom-no-flush-sync
        const observer = new MutationObserver(() => flushSync(() => store.requestFlush()));
        observer.observe(container, { childList: true, subtree: true });
        observerRef.current = observer;
        return () => {
            observer.disconnect();
            observerRef.current = null;
        };
    }, [store]);

    return (
        <div ref={containerRef} hidden aria-hidden="true">
            <TreeCollectContext.Provider value={store}>{children}</TreeCollectContext.Provider>
        </div>
    );
};

/** Builds the flat item list from the markers' document order. */
export const buildCollectedItems = (container: HTMLElement, entries: Map<string, CollectedEntry>): ParsedChildren => {
    const loadingParents = new Set<string>();
    for (const entry of entries.values()) {
        if (entry.kind === 'loading') {
            loadingParents.add(entry.parentId);
        }
    }
    const ordered: RowEntry[] = [];
    for (const marker of container.querySelectorAll(`[${COLLECT_ATTR}]`)) {
        const entry = entries.get(marker.getAttribute(COLLECT_ATTR) ?? '');
        if (entry && entry.kind !== 'loading') {
            ordered.push(entry);
        }
    }
    const childIdsByParent = new Map<string, string[]>();
    for (const entry of ordered) {
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
        return toItemData(entry.props, entry.parentId);
    });
    return { items, parentIsLoading: loadingParents.has(ROOT_ID), hasForeignRows: true };
};
