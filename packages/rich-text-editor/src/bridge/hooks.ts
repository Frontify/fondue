/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useCallback, useContext, useRef, useSyncExternalStore } from 'react';

import { type EditorRuntime } from '#/runtime/runtime';
import {
    type CommandArgs,
    type CommandKey,
    type CommandState,
    type SelectionSummary,
    type ShippedCommands,
} from '#/runtime/types';

import { useClientLayoutEffect } from './client-layout-effect';
import { useRenderMark } from './dev-checks';

/** The session of the editor around a hook once it is ready. */
export const SessionContext = createContext<EditorRuntime | undefined>(undefined);
SessionContext.displayName = 'RichTextEditorSessionContext';

/**
 * `read` of the session through one selector store, so the component rerenders only when `isEqual` finds a new value;
 * `read` gets `undefined` until the session is ready (SPEC-rich-text-react/AC-025).
 */
export const useSessionValue = <T>(
    read: (runtime: EditorRuntime | undefined) => T,
    isEqual: (previous: T, next: T) => boolean,
): T => {
    useRenderMark();
    const runtime = useContext(SessionContext);
    const latestRef = useRef({ read, isEqual });
    useClientLayoutEffect(() => {
        latestRef.current = { read, isEqual };
    });
    const subscribe = useCallback(
        (changed: () => void) => {
            if (runtime === undefined) {
                return () => undefined;
            }
            return runtime.watch(
                () => latestRef.current.read(runtime),
                (previous, next) => latestRef.current.isEqual(previous, next),
                changed,
            );
        },
        [runtime],
    );
    // An equal value keeps the object React last rendered, which `useSyncExternalStore` then compares by identity.
    const cacheRef = useRef<{ readonly value: T } | undefined>(undefined);
    const getSnapshot = () => {
        const next = read(runtime);
        if (cacheRef.current !== undefined && isEqual(cacheRef.current.value, next)) {
            return cacheRef.current.value;
        }
        cacheRef.current = { value: next };
        return next;
    };
    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};

// What the selection reads before the session is ready, as during `mounting` (SPEC-rich-text-runtime/AC-088).
const NO_SELECTION: SelectionSummary = { kind: 'none', collapsed: true, blockType: null, selectedNodeId: null };

const selectionOf = (runtime: EditorRuntime | undefined): SelectionSummary => {
    if (runtime === undefined) {
        return NO_SELECTION;
    }
    return runtime.handle.getSummary().selection;
};

/** A value selected from the editor's selection, which rerenders the caller only when `isEqual` finds it changed. */
export const useEditorSelection = <T>(
    select: (selection: SelectionSummary) => T,
    isEqual: (a: T, b: T) => boolean = Object.is,
): T => useSessionValue((runtime) => select(selectionOf(runtime)), isEqual);

// What a command reads before the session is ready, as `query` answers during `mounting`.
const NOT_READY: CommandState = { enabled: false, active: false, disabledReason: 'not-ready' };

const sameCommandState = (a: CommandState, b: CommandState) =>
    a.enabled === b.enabled && a.active === b.active && a.disabledReason === b.disabledReason;

/** A command's state for `args`, which rerenders the caller only when the state changes (SPEC-rich-text-react/AC-024). */
export const useCommandQuery = (id: string, ...args: readonly unknown[]): CommandState =>
    useSessionValue((runtime) => {
        if (runtime === undefined) {
            return NOT_READY;
        }
        return runtime.handle.query(id, ...args);
    }, sameCommandState);

/** The typed `useCommandState` of the public entry. */
export const useCommandState = <C extends object = ShippedCommands, K extends CommandKey<C> = CommandKey<C>>(
    id: K,
    ...args: CommandArgs<C, K>
): CommandState => useCommandQuery(id, ...args);
