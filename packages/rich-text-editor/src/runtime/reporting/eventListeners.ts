/* (c) Copyright Frontify Ltd., all rights reserved. */

import { diagnostic } from '#/model/internal';

import { type Unsubscribe } from '../types';

import { type Listener, type RuntimeEvents } from './events';

/** A listener that threw, with the event it was called for and the name of the error. */
type Thrower = {
    listener: Listener;
    event: string;
    name: string;
};

type Watcher = {
    read: () => unknown;
    isEqual: (previous: unknown, next: unknown) => boolean;
    listener: (value: unknown) => void;
    value: unknown;
};

/** The listeners and selector stores of one runtime, and whether its session is disposed. */
type EventBusContext = {
    listeners: Map<string, Set<Listener>>;
    watchers: Set<Watcher>;
    isDisposed: () => boolean;
};

/** The event and selector subscriptions of every live runtime, which the `src/testing` probe reads. */
export const busResources = { subscriptions: 0, selectors: 0 };

/** The error's name, never its message, which may hold document text. */
export const nameOf = (error: unknown) => {
    if (error instanceof Error) {
        return error.name;
    }

    return 'unknown';
};

/** Empty listeners and selector stores for a runtime `isDisposed` can end. */
export const createEventBusContext = (isDisposed: () => boolean): EventBusContext => ({
    listeners: new Map(),
    watchers: new Set(),
    isDisposed,
});

/** Calls one listener and returns the name of what it threw, or `undefined` when it returned. */
const callListener = (listener: Listener, value: unknown) => {
    try {
        (listener as (value: unknown) => void)(value);

        return undefined;
    } catch (error) {
        return nameOf(error);
    }
};

/** Reports each listener that threw once, to every diagnostic listener but that one. */
const reportThrows = (context: EventBusContext, throwers: readonly Thrower[]) => {
    for (const thrower of throwers) {
        // The bus knows no feature ID of a subscriber, so the report names the event and the error name.
        const listenerError = diagnostic(
            'runtime.listener-error',
            undefined,
            { event: thrower.event, name: thrower.name },
            'error',
        );
        for (const listener of [...(context.listeners.get('diagnostic') ?? [])]) {
            // A diagnostic listener that throws on this report gets no report of it, so reporting never recurses.
            if (listener !== thrower.listener) {
                callListener(listener, listenerError);
            }
        }
    }
};

/** Calls the listeners of `event`, then reports any that threw. */
export const deliverListeners = <K extends keyof RuntimeEvents>(
    context: EventBusContext,
    event: K,
    value: RuntimeEvents[K],
) => {
    const throwers: Thrower[] = [];
    for (const listener of [...(context.listeners.get(event) ?? [])]) {
        // A listener that disposed the session ends every notification but the `disposed` one itself.
        if (context.isDisposed() && event !== 'disposed') {
            break;
        }

        const name = callListener(listener, value);
        if (name !== undefined) {
            throwers.push({ listener, event, name });
        }
    }

    reportThrows(context, throwers);
};

/** Gives each selector store whose value changed under its equality function the new value. */
export const notifySelectors = (context: EventBusContext) => {
    const throwers: Thrower[] = [];
    for (const watcher of [...context.watchers]) {
        if (context.isDisposed()) {
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
            const name = callListener(watcher.listener as Listener, next);
            if (name !== undefined) {
                throwers.push({ listener: watcher.listener as Listener, event: 'selector', name });
            }
        }
    }

    reportThrows(context, throwers);
};

export const addListener = (context: EventBusContext, event: string, listener: Listener): Unsubscribe => {
    if (context.isDisposed()) {
        return () => undefined;
    }

    let set = context.listeners.get(event);
    if (set === undefined) {
        set = new Set();
        context.listeners.set(event, set);
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

export const addSelector = <T>(
    context: EventBusContext,
    read: () => T,
    isEqual: (previous: T, next: T) => boolean,
    listener: (value: T) => void,
) => {
    if (context.isDisposed()) {
        return () => undefined;
    }

    const watcher = { read, isEqual, listener, value: read() } as Watcher;
    context.watchers.add(watcher);
    busResources.selectors += 1;

    return () => {
        if (context.watchers.delete(watcher)) {
            busResources.selectors -= 1;
        }
    };
};

/** Removes every listener and selector; an unsubscribe a host kept then finds nothing and counts nothing twice. */
export const clearBus = (context: EventBusContext) => {
    for (const set of context.listeners.values()) {
        busResources.subscriptions -= set.size;
        set.clear();
    }

    context.listeners.clear();
    busResources.selectors -= context.watchers.size;
    context.watchers.clear();
};
