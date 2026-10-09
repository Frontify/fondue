/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType } from 'react';

import { type RuntimeEnvironment } from '#/model';
import { liveResources } from '#/runtime/runtime';

import { type NodeViewState } from './define';

/** One node view's chrome: the slot it renders into and the state it reads, whose context the portal host adds. */
export interface PortalEntry {
    readonly key: string;
    readonly slot: HTMLElement;
    readonly component: ComponentType<object>;
    readonly state: Omit<NodeViewState<object>, 'context'>;
}

/** The portals of one editor, which one host component reads (SPEC-rich-text-react/AC-007). */
export interface PortalStore {
    readonly subscribe: (listener: () => void) => () => void;
    readonly getSnapshot: () => readonly PortalEntry[];
    set(entry: PortalEntry): void;
    remove(key: string): void;
    /** Drops every entry and takes no more, once a node view threw (SPEC-rich-text-runtime/AC-014). */
    close(): void;
}

const EMPTY: readonly PortalEntry[] = [];

export const createPortalStore = (scheduler: RuntimeEnvironment['scheduler']): PortalStore => {
    const entries = new Map<string, PortalEntry>();
    const listeners = new Set<() => void>();
    let snapshot = EMPTY;
    let scheduled = false;
    let closed = false;
    // However many views a transaction creates, updates or destroys, listeners hear once per microtask (SPEC-rich-text-react/AC-008).
    const changed = () => {
        if (scheduled) {
            return;
        }
        scheduled = true;
        scheduler.microtask(() => {
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
