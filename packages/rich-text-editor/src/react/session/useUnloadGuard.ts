/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect } from 'react';

import { type EditorPort } from '#/runtime/port';

import { memberOf } from './helpers';
import { type Defined } from './types';

/** While a managed session holds changes the service has not acknowledged, asks the browser to confirm leaving and saves on `pagehide`. */
export const useUnloadGuard = (live: EditorPort | undefined, props: Defined) => {
    const managed = memberOf(props.services, 'persistence') !== undefined;
    const enabled = managed && props.persistenceOptions?.unloadGuard !== false;
    useEffect(() => {
        if (live === undefined || !enabled) {
            return undefined;
        }
        const { handle } = live;
        const confirmLeave = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = '';
        };
        const saveOnHide = () => {
            // A write in flight already carries what it can.
            if (handle.getSaveStatus().state !== 'saving') {
                handle.requestCommit({ reason: 'navigate' }).catch(() => undefined);
            }
        };
        let held = false;
        const sync = () => {
            const { state } = handle.getSaveStatus();
            const pending = state !== 'clean' && state !== 'unmanaged';
            if (pending === held) {
                return;
            }
            held = pending;
            if (pending) {
                window.addEventListener('beforeunload', confirmLeave);
                window.addEventListener('pagehide', saveOnHide);
                return;
            }
            window.removeEventListener('beforeunload', confirmLeave);
            window.removeEventListener('pagehide', saveOnHide);
        };
        sync();
        const unsubscribe = handle.subscribe('saveStatusChange', sync);
        return () => {
            unsubscribe();
            window.removeEventListener('beforeunload', confirmLeave);
            window.removeEventListener('pagehide', saveOnHide);
        };
    }, [live, enabled]);
};
