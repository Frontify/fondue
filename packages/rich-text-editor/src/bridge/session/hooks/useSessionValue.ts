/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useContext, useRef, useSyncExternalStore } from 'react';

import { type EditorPort } from '#/runtime/port';

import { SessionContext } from '../helpers/sessionContext';

import { useClientLayoutEffect } from './useClientLayoutEffect';
import { useRenderMark } from './useRenderMark';

/**
 * `read` of the session through one selector store, so the component rerenders only when `isEqual` finds a new value;
 * `read` gets `undefined` until the session is ready.
 */
export const useSessionValue = <Value>(
    read: (runtime: EditorPort | undefined) => Value,
    isEqual: (previous: Value, next: Value) => boolean,
): Value => {
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
    const cacheRef = useRef<{ value: Value } | undefined>(undefined);
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
