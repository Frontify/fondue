/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useContext, useEffect, useRef, useSyncExternalStore } from 'react';

import { SessionContext } from '#/bridge/session/helpers/sessionContext';
import { useAnnounce } from '#/bridge/session/hooks/useAnnounce';
import { useClientLayoutEffect } from '#/bridge/session/hooks/useClientLayoutEffect';
import { type CodecContext } from '#/model';
import { type SaveStatus } from '#/runtime/port';

import { causesByHandle, announcementOf, keyOf, QUIET, type Seen } from '../helpers/status';
import styles from '../styles/status.module.scss';

export type SaveStatusTextProps = { t: CodecContext['t']; testId: string };

/**
 * The session's save state as text, which changes silently during autosave and is announced through the editor's
 * polite live region only for the states that need the author.
 */
export const SaveStatusText = ({ t, testId }: SaveStatusTextProps) => {
    const runtime = useContext(SessionContext);
    // The shown key only, so a save status that changes on each keystroke rerenders nothing.
    const subscribe = useCallback(
        (changed: () => void) => {
            if (runtime === undefined) {
                return () => undefined;
            }

            return runtime.handle.subscribe('saveStatusChange', changed);
        },
        [runtime],
    );
    const read = () => {
        if (runtime === undefined) {
            return null;
        }

        return keyOf(runtime.handle.getSaveStatus(), causesByHandle.get(runtime.handle));
    };

    const key = useSyncExternalStore(subscribe, read, read);
    const announce = useAnnounce();
    const tRef = useRef(t);
    useClientLayoutEffect(() => {
        tRef.current = t;
    });

    // Each change is heard from the event itself, so a render that batches two changes still announces both.
    useEffect(() => {
        if (runtime === undefined) {
            return undefined;
        }

        const causes = causesByHandle.get(runtime.handle);
        const seen = (status: SaveStatus): Seen => ({
            state: status.state,
            generation: runtime.handle.getSummary().session.generation,
            key: keyOf(status, causes),
        });
        let previous = seen(runtime.handle.getSaveStatus());
        let memory = QUIET;

        return runtime.handle.subscribe('saveStatusChange', (status: SaveStatus) => {
            const next = seen(status);
            const [kept, announced] = announcementOf(memory, previous, next, causes?.committed() === true);
            memory = kept;
            previous = next;
            if (announced !== null) {
                announce(tRef.current(announced));
            }
        });
    }, [runtime, announce]);

    let text = '';
    if (key !== null) {
        text = t(key);
    }

    return (
        <div className={styles.status} data-test-id={`${testId}-status`}>
            {text}
        </div>
    );
};

SaveStatusText.displayName = 'SaveStatusText';
