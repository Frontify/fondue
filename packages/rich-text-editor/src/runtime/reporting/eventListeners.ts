/* (c) Copyright Frontify Ltd., all rights reserved. */

import { diagnostic } from '#/model/internal';

import { type Unsubscribe } from '../types';

import { type RuntimeEvents } from './events';

/** A listener that threw, with the event it was called for and the name of the error. */
type Thrower = {
    listener: object;
    event: string;
    name: string;
};

type Watcher = {
    read: () => unknown;
    isEqual: (previous: unknown, next: unknown) => boolean;
    listener: (value: unknown) => void;
    value: unknown;
};

type ListenerSets = {
    [EventName in keyof RuntimeEvents]: Set<(value: RuntimeEvents[EventName]) => void>;
};

/** The listeners and selector stores of one runtime, and whether its session is disposed. */
type EventBusContext = {
    listeners: ListenerSets;
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

const listenerSets = (): ListenerSets => ({
    ready: new Set(),
    documentChange: new Set(),
    selectionChange: new Set(),
    saveStatusChange: new Set(),
    diagnostic: new Set(),
    operationMetric: new Set(),
    replaced: new Set(),
    disposed: new Set(),
});

/** Empty listeners and selector stores for a runtime `isDisposed` can end. */
export const createEventBusContext = (isDisposed: () => boolean): EventBusContext => ({
    listeners: listenerSets(),
    watchers: new Set(),
    isDisposed,
});

/** Calls one listener and returns the name of what it threw, or `undefined` when it returned. */
const callListener = <Value>(listener: (value: Value) => void, value: Value) => {
    try {
        listener(value);

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
        for (const listener of [...context.listeners.diagnostic]) {
            // A diagnostic listener that throws on this report gets no report of it, so reporting never recurses.
            if (listener !== thrower.listener) {
                callListener(listener, listenerError);
            }
        }
    }
};

/** Calls the listeners of `event`, then reports any that threw. */
export const deliverListeners = <EventName extends keyof RuntimeEvents>(
    context: EventBusContext,
    event: EventName,
    value: RuntimeEvents[EventName],
) => {
    const throwers: Thrower[] = [];
    for (const listener of [...context.listeners[event]]) {
        // A listener that disposed the session ends every notification but `disposed` and a diagnostic,
        // which dispose itself reports after the phase has changed.
        if (context.isDisposed() && event !== 'disposed' && event !== 'diagnostic') {
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
            throwers.push({ listener: watcher.listener, event: 'selector', name: nameOf(error) });
            continue;
        }

        if (!watcher.isEqual(watcher.value, next)) {
            watcher.value = next;
            const name = callListener(watcher.listener, next);
            if (name !== undefined) {
                throwers.push({ listener: watcher.listener, event: 'selector', name });
            }
        }
    }

    reportThrows(context, throwers);
};

export const addListener = <EventName extends keyof RuntimeEvents>(
    context: EventBusContext,
    event: EventName,
    listener: (value: RuntimeEvents[EventName]) => void,
): Unsubscribe => {
    if (context.isDisposed()) {
        return () => undefined;
    }

    const subscribed = context.listeners[event];
    subscribed.add(listener);
    busResources.subscriptions += 1;

    return () => {
        if (subscribed.delete(listener)) {
            busResources.subscriptions -= 1;
        }
    };
};

export const addSelector = <Value>(
    context: EventBusContext,
    read: () => Value,
    isEqual: (previous: Value, next: Value) => boolean,
    listener: (value: Value) => void,
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
    for (const set of Object.values(context.listeners)) {
        busResources.subscriptions -= set.size;
        set.clear();
    }

    busResources.selectors -= context.watchers.size;
    context.watchers.clear();
};
