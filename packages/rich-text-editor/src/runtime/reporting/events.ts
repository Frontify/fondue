/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic } from '#/model';

import {
    type DocumentChange,
    type OperationMetric,
    type SaveStatus,
    type SelectionSummary,
    type SessionToken,
    type Unsubscribe,
} from '../types';

import {
    addListener,
    addSelector,
    clearBus,
    createEventBusContext,
    deliverListeners,
    notifySelectors,
} from './eventListeners';

export { busResources, nameOf } from './eventListeners';

/** The events a runtime emits; the handle accepts the other `EditorEventMap` names, which later layers emit. */
export type RuntimeEvents = {
    ready: SessionToken;
    documentChange: DocumentChange;
    selectionChange: SelectionSummary;
    saveStatusChange: SaveStatus;
    diagnostic: Diagnostic;
    operationMetric: OperationMetric;
    replaced: SessionToken;
    disposed: SessionToken;
};
/** A listener of any event, typed `never` so one map holds listeners of every event's value. */
export type Listener = (value: never) => void;

export type EventBusOptions = {
    /** Whether the session is disposed, which ends a notification. */
    isDisposed: () => boolean;
    /** Runs one notification, so the runtime counts it as busy. */
    around: (work: () => void) => void;
};

/** A runtime's event listeners and selector stores, where a throwing listener or selector never stops the others. */
export const createEventBus = ({ isDisposed, around }: EventBusOptions) => {
    const context = createEventBusContext(isDisposed);

    return {
        emit: <K extends keyof RuntimeEvents>(event: K, value: RuntimeEvents[K]) =>
            around(() => deliverListeners(context, event, value)),
        notify: () => notifySelectors(context),
        subscribe: (event: string, listener: Listener): Unsubscribe => addListener(context, event, listener),
        watch: <T>(read: () => T, isEqual: (previous: T, next: T) => boolean, listener: (value: T) => void) =>
            addSelector(context, read, isEqual, listener),
        clear: () => clearBus(context),
    };
};
