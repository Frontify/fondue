/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useCallback, useContext, useRef, useSyncExternalStore } from 'react';

import { type EditorPort } from '#/runtime/port';

import { useRenderMark } from './devChecks';
import { useClientLayoutEffect } from './session/hooks/useClientLayoutEffect';

/** The session of the editor around a hook once it is ready. */
export const SessionContext = createContext<EditorPort | undefined>(undefined);
SessionContext.displayName = 'RichTextEditorSessionContext';

/**
 * `read` of the session through one selector store, so the component rerenders only when `isEqual` finds a new value;
 * `read` gets `undefined` until the session is ready.
 */
export const useSessionValue = <T>(
    read: (runtime: EditorPort | undefined) => T,
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
    const cacheRef = useRef<{ value: T } | undefined>(undefined);
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
