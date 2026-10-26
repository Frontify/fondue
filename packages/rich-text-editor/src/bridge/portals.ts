/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType } from 'react';

import { liveResources } from '#/runtime/runtime';

import { type NodeViewState } from './define';

/** One node view's chrome: the slot it renders into and the state it reads, whose context the portal host adds. */
export type PortalEntry = {
    key: string;
    slot: HTMLElement;
    component: ComponentType<object>;
    state: Omit<NodeViewState<object>, 'context' | 'pending'>;
    /** Moves the node's editable content into the element the chrome renders for it, or back on `null`. */
    place: (element: HTMLElement | null) => void;
};

/** The portals of one editor, which one host component reads. */
export type PortalStore = {
    subscribe: (listener: () => void) => () => void;
    getSnapshot: () => readonly PortalEntry[];
    set(entry: PortalEntry): void;
    remove(key: string): void;
    /** Drops every entry and takes no more, once a node view threw. */
    close(): void;
};

const EMPTY: readonly PortalEntry[] = [];

export const createPortalStore = (): PortalStore => {
    const entries = new Map<string, PortalEntry>();
    const listeners = new Set<() => void>();
    let snapshot = EMPTY;
    let scheduled = false;
    let closed = false;
    // However many views a transaction creates, updates or destroys, listeners hear once per microtask.
    const changed = () => {
        if (scheduled) {
            return;
        }

        scheduled = true;
        queueMicrotask(() => {
            scheduled = false;
            snapshot = [...entries.values()];
            for (const listener of [...listeners]) {
                listener();
            }
        });
    };

    return {
        subscribe: (listener) => {
            listeners.add(listener);

            return () => {
                listeners.delete(listener);
            };
        },
        getSnapshot: () => snapshot,
        set: (entry) => {
            if (closed) {
                return;
            }

            if (!entries.has(entry.key)) {
                liveResources.portals += 1;
            }

            entries.set(entry.key, entry);
            changed();
        },
        remove: (key) => {
            if (entries.delete(key)) {
                liveResources.portals -= 1;
                changed();
            }
        },
        close: () => {
            closed = true;
            liveResources.portals -= entries.size;
            entries.clear();
            changed();
        },
    };
};
