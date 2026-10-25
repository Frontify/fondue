/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic } from '#/model';
import { diagnostic } from '#/model/internal';

import {
    type DocumentChange,
    type OperationMetric,
    type SaveStatus,
    type SelectionSummary,
    type SessionToken,
    type Unsubscribe,
} from './types';

/** The events a runtime emits; the handle accepts the other `EditorEventMap` names, which later layers emit. */
export interface RuntimeEvents {
    readonly ready: SessionToken;
    readonly documentChange: DocumentChange;
    readonly selectionChange: SelectionSummary;
    readonly saveStatusChange: SaveStatus;
    readonly diagnostic: Diagnostic;
    readonly operationMetric: OperationMetric;
    readonly replaced: SessionToken;
    readonly disposed: SessionToken;
}
export type Listener = (value: never) => void;

/** The event and selector subscriptions of every live runtime, which the `src/testing` probe reads. */
export const busResources = { subscriptions: 0, selectors: 0 };

/** A listener that threw, with the event it was called for and the name of the error. */
interface Thrower {
    readonly listener: Listener;
    readonly event: string;
    readonly name: string;
}

/** The error's name, never its message, which may hold document text. */
export const nameOf = (error: unknown) => (error instanceof Error ? error.name : 'unknown');

interface Watcher {
    readonly read: () => unknown;
    readonly isEqual: (previous: unknown, next: unknown) => boolean;
    readonly listener: (value: unknown) => void;
    value: unknown;
}

export interface EventBusOptions {
    /** Whether the session is disposed, which ends a notification. */
    readonly isDisposed: () => boolean;
    /** Runs one notification, so the runtime counts it as busy. */
    readonly around: (work: () => void) => void;
}

/** A runtime's event listeners and selector stores, where a throwing listener or selector never stops the others. */
export const createEventBus = ({ isDisposed, around }: EventBusOptions) => {
    const listeners = new Map<string, Set<Listener>>();
    const watchers = new Set<Watcher>();

    /** Calls one listener and returns the name of what it threw, or `undefined` when it returned. */
    const call = (listener: Listener, value: unknown) => {
        try {
            (listener as (value: unknown) => void)(value);
            return undefined;
        } catch (error) {
            return nameOf(error);
        }
    };

    /** Reports each listener that threw once, to every diagnostic listener but that one. */
    const reportThrows = (throwers: readonly Thrower[]) => {
        for (const thrower of throwers) {
            // The bus knows no feature ID of a subscriber, so the report names the event and the error name.
            const listenerError = diagnostic(
                'runtime.listener-error',
                undefined,
                { event: thrower.event, name: thrower.name },
                'error',
            );
            for (const listener of [...(listeners.get('diagnostic') ?? [])]) {
                // A diagnostic listener that throws on this report gets no report of it, so reporting never recurses.
                if (listener !== thrower.listener) {
                    call(listener, listenerError);
                }
            }
        }
    };

    const emit = <K extends keyof RuntimeEvents>(event: K, value: RuntimeEvents[K]) =>
        around(() => {
            const throwers: Thrower[] = [];
            for (const listener of [...(listeners.get(event) ?? [])]) {
                // A listener that disposed the session ends every notification but the `disposed` one itself.
                if (isDisposed() && event !== 'disposed') {
                    break;
                }
                const name = call(listener, value);
                if (name !== undefined) {
                    throwers.push({ listener, event, name });
                }
            }
            reportThrows(throwers);
        });

    /** Gives each selector store whose value changed under its equality function the new value. */
    const notify = () => {
        const throwers: Thrower[] = [];
        for (const watcher of [...watchers]) {
            if (isDisposed()) {
                break;
            }
            let next: unknown;
            try {
                next = watcher.read();
            } catch (error) {
                // A selector that throws is reported as its listener, and the commit goes on.
                throwers.push({ listener: watcher.listener as Listener, event: 'selector', name: nameOf(error) });
                continue;
            }
            if (!watcher.isEqual(watcher.value, next)) {
                watcher.value = next;
                const name = call(watcher.listener as Listener, next);
                if (name !== undefined) {
                    throwers.push({ listener: watcher.listener as Listener, event: 'selector', name });
                }
            }
        }
        reportThrows(throwers);
    };

    const subscribe = (event: string, listener: Listener): Unsubscribe => {
        if (isDisposed()) {
            return () => undefined;
        }
        let set = listeners.get(event);
        if (set === undefined) {
            set = new Set();
            listeners.set(event, set);
        }
        const subscribed = set;
        subscribed.add(listener);
        busResources.subscriptions += 1;
        return () => {
            if (subscribed.delete(listener)) {
                busResources.subscriptions -= 1;
            }
        };
    };

    const watch = <T>(read: () => T, isEqual: (previous: T, next: T) => boolean, listener: (value: T) => void) => {
        if (isDisposed()) {
            return () => undefined;
        }
        const watcher = { read, isEqual, listener, value: read() } as Watcher;
        watchers.add(watcher);
        busResources.selectors += 1;
        return () => {
            if (watchers.delete(watcher)) {
                busResources.selectors -= 1;
            }
        };
    };

    /** Removes every listener and selector; an unsubscribe a host kept then finds nothing and counts nothing twice. */
    const clear = () => {
        for (const set of listeners.values()) {
            busResources.subscriptions -= set.size;
            set.clear();
        }
        listeners.clear();
        busResources.selectors -= watchers.size;
        watchers.clear();
    };

    return { emit, notify, subscribe, watch, clear };
};
