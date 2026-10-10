/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, useCallback, useContext, useEffect, useRef, useSyncExternalStore } from 'react';

import { useAnnounce } from '#/bridge/announcer';
import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { SessionContext } from '#/bridge/hooks';
import { type CodecContext } from '#/model';
import { type Rejection } from '#/persistence/coordinator';
import { type SaveStatus } from '#/runtime/types';

import styles from './styles/status.module.scss';

type Key = `RichTextEditor_${string}`;
type State = SaveStatus['state'];

/** What the status reads from the save coordinator beside `SaveStatus`. */
export interface SaveCauses {
    readonly rejection: () => Rejection | null;
    readonly committed: () => boolean;
}

// SPEC-rich-text-persistence/AC-048: unsaved, saving, saved, retrying, offline, conflict and failed.
const STATE_KEYS: Readonly<Record<State, Key | null>> = {
    unmanaged: null,
    clean: 'RichTextEditor_saveSaved',
    dirty: 'RichTextEditor_saveUnsaved',
    saving: 'RichTextEditor_saveSaving',
    uncertain: 'RichTextEditor_saveRetrying',
    offline: 'RichTextEditor_saveOffline',
    conflict: 'RichTextEditor_saveConflict',
    error: 'RichTextEditor_saveFailed',
};
// SPEC-rich-text-persistence/AC-062: each rejection names its recovery.
const REJECTION_KEYS: Readonly<Record<Rejection, Key>> = {
    forbidden: 'RichTextEditor_saveForbidden',
    invalid: 'RichTextEditor_saveInvalid',
    'incompatible-writer': 'RichTextEditor_saveIncompatible',
};
// SPEC-rich-text-persistence/AC-046: a change to one of these is announced.
const ANNOUNCED: ReadonlySet<State> = new Set(['uncertain', 'offline', 'conflict', 'error']);
// SPEC-rich-text-persistence/AC-047: the `clean` after one of these is announced.
const RECOVERING: ReadonlySet<State> = new Set(['uncertain', 'offline', 'error']);

const keyOf = (status: SaveStatus, causes: SaveCauses | undefined): Key | null => {
    if (status.state === 'error' && causes !== undefined) {
        const rejection = causes.rejection();
        if (rejection !== null) {
            return REJECTION_KEYS[rejection];
        }
    }
    // Saved means a revision the host acknowledged, so a record no save has reached says nothing.
    if (status.state === 'clean' && status.revision === null) {
        return null;
    }
    return STATE_KEYS[status.state];
};

/**
 * The session's save state as text, which changes silently during autosave and is announced through the editor's
 * polite live region only for the states that need the author (SPEC-rich-text-persistence/AC-046, AC-047).
 */
export const SaveStatusText = ({
    t,
    causes,
    testId,
}: {
    readonly t: CodecContext['t'];
    readonly causes: MutableRefObject<SaveCauses | undefined>;
    readonly testId: string;
}) => {
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
        return keyOf(runtime.handle.getSaveStatus(), causes.current);
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
        let shown = runtime.handle.getSaveStatus().state;
        let { generation } = runtime.handle.getSummary().session;
        let recovering = false;
        // The retrying or offline state last announced, which a replay in between does not announce again (AC-046).
        let outage: State | null = null;
        const say = (message: Key | null) => {
            if (message !== null) {
                announce(tRef.current(message));
            }
        };
        return runtime.handle.subscribe('saveStatusChange', (next: SaveStatus) => {
            const previous = shown;
            shown = next.state;
            if (previous === next.state) {
                return;
            }
            // A replacement, such as a form reset, discards what the old generation held, so nothing of it is saved.
            const current = runtime.handle.getSummary().session.generation;
            if (current !== generation) {
                generation = current;
                recovering = false;
                outage = null;
                return;
            }
            if (RECOVERING.has(previous)) {
                recovering = true;
            }
            if (next.state === 'clean' || next.state === 'dirty') {
                outage = null;
            }
            const message = keyOf(next, causes.current);
            if (ANNOUNCED.has(next.state)) {
                // Only replacement leaves a conflict, and the record it loads has nothing to recover.
                if (next.state === 'conflict') {
                    recovering = false;
                }
                if (previous === 'saving' && next.state === outage) {
                    return;
                }
                if (next.state === 'uncertain' || next.state === 'offline') {
                    outage = next.state;
                }
                say(message);
                return;
            }
            if (next.state !== 'clean') {
                return;
            }
            const heard = recovering || causes.current?.committed() === true;
            recovering = false;
            if (heard) {
                say(message);
            }
        });
    }, [runtime, causes, announce]);
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
