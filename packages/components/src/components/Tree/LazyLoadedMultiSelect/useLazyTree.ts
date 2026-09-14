/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { createFolderContents, type FolderContents } from './createFolderNode';
import { type LazyLoadedMultiSelectProps } from './types';

type Callbacks = Pick<LazyLoadedMultiSelectProps, 'loadChildren' | 'onSelectChange' | 'onLoadError'>;

const createLazyTree = (callbacksRef: { current: Callbacks }) => {
    const listeners = new Set<() => void>();
    let version = 0;
    const notify = () => {
        version += 1;
        for (const listener of listeners) {
            listener();
        }
    };

    // Nodes live across renders, so they reach the consumer's callbacks through `callbacksRef`
    // instead of capturing the ones from the first render.
    const root = createFolderContents(null, {
        notify,
        loadChildren: (parentId) => callbacksRef.current.loadChildren(parentId),
        onSelectChange: (node, isSelected) => callbacksRef.current.onSelectChange?.(node, isSelected),
        onLoadError: (parentId, error) => callbacksRef.current.onLoadError?.(parentId, error),
    });
    root.load();

    return {
        root,
        subscribe: (listener: () => void) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        getSnapshot: () => version,
    };
};

/**
 * Owns the top-level contents and re-renders the caller whenever any node reports a change.
 * Nothing is computed here — the nodes own their state; this only relays the change tick.
 */
export const useLazyTree = (callbacks: Callbacks): FolderContents => {
    const callbacksRef = useRef(callbacks);
    useEffect(() => {
        callbacksRef.current = callbacks;
    });
    const [tree] = useState(() => createLazyTree(callbacksRef));
    useSyncExternalStore(tree.subscribe, tree.getSnapshot);
    return tree.root;
};
