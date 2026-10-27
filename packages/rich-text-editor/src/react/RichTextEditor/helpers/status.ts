/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type createSaveCoordinator, type Rejection } from '#/persistence/coordinator';
import { type SaveStatus } from '#/runtime/port';

type Key = `RichTextEditor_${string}`;
type State = SaveStatus['state'];
type SaveCauses = Pick<ReturnType<typeof createSaveCoordinator>, 'rejection' | 'committed'>;

/** The coordinator readers of each managed session, by its handle, which `SaveStatus` does not carry. */
export const causesByHandle = new WeakMap<object, SaveCauses>();

/** Lets the status of the session behind `handle` read why its save state is what it is. */
export const registerSaveCauses = (handle: object, causes: SaveCauses) => {
    causesByHandle.set(handle, causes);
};

// Unsaved, saving, saved, retrying, offline, conflict and failed.
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

// Each rejection names its recovery.
const REJECTION_KEYS: Readonly<Record<Rejection, Key>> = {
    forbidden: 'RichTextEditor_saveForbidden',
    invalid: 'RichTextEditor_saveInvalid',
    'incompatible-writer': 'RichTextEditor_saveIncompatible',
};

// A change to one of these is announced.
const ANNOUNCED: ReadonlySet<State> = new Set(['uncertain', 'offline', 'conflict', 'error']);

// The `clean` after one of these is announced.
const RECOVERING: ReadonlySet<State> = new Set(['uncertain', 'offline', 'error']);

/** The text key a save state shows, `null` when it shows none: an unmanaged session or a record no save has reached. */
export const keyOf = (status: SaveStatus, causes: SaveCauses | undefined): Key | null => {
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
export type Seen = {
    state: State;
    generation: number;
    key: Key | null;
};
/** What the announcements remember between changes. */
export type Memory = {
    /** A `clean` now ends an outage or a failure, so it is announced. */
    recovering: boolean;
    /** The retrying or offline state last announced, which a replay in between does not announce again. */
    outage: State | null;
};
export const QUIET: Memory = { recovering: false, outage: null };

/** The key a change from `previous` to `next` announces, if any, and what to remember. */
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
    const endsOutage =
        next.state === 'clean' || next.state === 'dirty' || next.state === 'conflict' || next.state === 'error';
    if (endsOutage) {
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
