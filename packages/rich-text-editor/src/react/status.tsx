/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useContext, useEffect, useRef, useSyncExternalStore } from 'react';

import { useAnnounce } from '#/bridge/announcer';
import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { SessionContext } from '#/bridge/hooks';
import { type CodecContext } from '#/model';
import { type createSaveCoordinator, type Rejection } from '#/persistence/coordinator';
import { type SaveStatus } from '#/runtime/types';

import styles from './styles/status.module.scss';

type Key = `RichTextEditor_${string}`;
type State = SaveStatus['state'];
type SaveCauses = Pick<ReturnType<typeof createSaveCoordinator>, 'rejection' | 'committed'>;

/** The coordinator readers of each managed session, by its handle, which `SaveStatus` does not carry. */
const causesByHandle = new WeakMap<object, SaveCauses>();

/** Lets the status of the session behind `handle` read why its save state is what it is. */
export const registerSaveCauses = (handle: object, causes: SaveCauses) => {
    causesByHandle.set(handle, causes);
};

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

/** One save state as the status saw it: the state, the session generation it belongs to and the key it shows. */
export interface Seen {
    readonly state: State;
    readonly generation: number;
    readonly key: Key | null;
}
/** What the announcements remember between changes. */
export interface Memory {
    /** A `clean` now ends an outage or a failure, so it is announced (AC-047). */
    readonly recovering: boolean;
    /** The retrying or offline state last announced, which a replay in between does not announce again (AC-046). */
    readonly outage: State | null;
}
export const QUIET: Memory = { recovering: false, outage: null };

/** The key a change from `previous` to `next` announces, if any, and what to remember (SPEC-rich-text-persistence/AC-046, AC-047). */
export const announcementOf = (
    memory: Memory,
    previous: Seen,
    next: Seen,
    committed: boolean,
): readonly [Memory, Key | null] => {
    // A replacement, such as a form reset, discards what the old generation held, so nothing of it is saved.
    if (next.generation !== previous.generation) {
        return [QUIET, null];
    }
    if (next.state === previous.state) {
        return [memory, null];
    }
    let { recovering, outage } = memory;
    if (RECOVERING.has(previous.state)) {
        recovering = true;
    }
    // A settled write, a conflict or a failure ends the outage, so a later one is new.
    if (next.state === 'clean' || next.state === 'dirty' || next.state === 'conflict' || next.state === 'error') {
        outage = null;
    }
    if (ANNOUNCED.has(next.state)) {
        if (previous.state === 'saving' && next.state === outage) {
            return [{ recovering, outage }, null];
        }
        if (next.state === 'uncertain' || next.state === 'offline') {
            outage = next.state;
        }
        return [{ recovering, outage }, next.key];
    }
    if (next.state !== 'clean') {
        return [{ recovering, outage }, null];
    }
    if (!recovering && !committed) {
        return [{ recovering, outage }, null];
    }
    return [{ recovering: false, outage }, next.key];
};

/**
 * The session's save state as text, which changes silently during autosave and is announced through the editor's
 * polite live region only for the states that need the author (SPEC-rich-text-persistence/AC-046, AC-047).
 */
export const SaveStatusText = ({ t, testId }: { readonly t: CodecContext['t']; readonly testId: string }) => {
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
