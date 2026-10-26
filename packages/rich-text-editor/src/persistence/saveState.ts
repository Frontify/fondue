/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic, type RichTextDocument } from '#/model';
import {
    type CommitResult,
    type DocumentStamp,
    type EditorSummary,
    type SaveAcknowledgment,
    type SaveStatus,
    type ServerRevision,
    type SessionToken,
} from '#/runtime/types';

import { type PersistenceOptions, type SaveRequest, type SaveResponse } from './types';

export type SaveState = Exclude<SaveStatus['state'], 'unmanaged'>;
/** The code of a rejected write, which `SaveStatus` does not carry. */
export type Rejection = Extract<SaveResponse, { status: 'rejected' }>['code'];
export type Timer = 'delay' | 'longest' | 'retry' | 'timeout';

type Timing = Required<Omit<PersistenceOptions, 'onConflict' | 'unloadGuard'>>;
const DEFAULTS: Timing = {
    autosave: 'debounced',
    delayMs: 500,
    maxWaitMs: 5000,
    timeoutMs: 30_000,
    maxRetries: 5,
    backoffMs: 1000,
};

export const DISPOSED: CommitResult = { status: 'failed', code: 'disposed', outcome: 'unknown' };
export const CONFLICT: CommitResult = { status: 'blocked', code: 'conflict' };
export const NOT_SENT: CommitResult = { status: 'failed', code: 'transport', outcome: 'not-sent' };

/** What the transport observed when it fed the event. */
export type Facts = {
    now: number;
    online: boolean;
    phase: EditorSummary['phase'];
    composing: boolean;
    sequence: number;
    session: SessionToken;
    /** Read at each event, so the host's newest options apply. */
    options: PersistenceOptions | undefined;
};

/** The one write in flight: the `serial` tells its answer from a late answer of an earlier write. */
export type Flight = {
    request: SaveRequest;
    started: number;
    serial: number;
};

/** A snapshot `requestCommit` pinned, which is written as it is, ahead of any later autosave. */
export type Pin = {
    stamp: DocumentStamp;
    document: RichTextDocument;
    /** The calls that share its next result; a call after that result waits for a later one. */
    calls: readonly number[];
};

export type SaveMachine = {
    state: SaveState;
    latest: number;
    acknowledged: number;
    /** Cleared by the first accepted acknowledgment, which saves what the session mounted with. */
    unsavedOnMount: boolean;
    revision: ServerRevision | null;
    /** What `requestCommit` answers with while it holds for the current stamp. */
    accepted: SaveAcknowledgment | undefined;
    rejection: Rejection | null;
    committed: boolean;
    problem: Diagnostic | null;
    flight: Flight | undefined;
    /** The write whose outcome is not known yet, which every later try replays unchanged. */
    unresolved: SaveRequest | undefined;
    /** The write a failed session left behind: its acknowledgment saves none of this session's sequences. */
    carried: SaveRequest | undefined;
    replays: number;
    /** A write came due while a write in flight, a replay, the network or unsettled input held it. */
    due: boolean;
    /** In call order; the oldest stays until its write is answered. */
    pinned: readonly Pin[];
    writes: number;
    ended: boolean;
    /** A session that never became ready, such as StrictMode's throwaway mount, leaves nothing the author saw unsaved. */
    shown: boolean;
    retrying: boolean;
    longest: boolean;
};

export type Pinned = {
    stamp: DocumentStamp;
    document: RichTextDocument;
};

export type SaveEvent = { facts: Facts } & (
    | { type: 'mounted' }
    | { type: 'changed' }
    | { type: 'flush' }
    | { type: 'send' }
    | { type: 'retryDue' }
    | { type: 'ready' }
    | { type: 'online' }
    | { type: 'serviceChanged' }
    | { type: 'dispose' }
    | { type: 'failed'; serial: number; code: 'timeout' | 'transport' }
    | { type: 'answered'; serial: number; response: SaveResponse }
    | { type: 'prepared'; request: SaveRequest }
    | { type: 'pin'; call: number }
    | {
          type: 'pinned';
          call: number;
          stamp: DocumentStamp;
          document: RichTextDocument;
      }
    | { type: 'callTimedOut'; call: number }
    | { type: 'replaced'; revision: ServerRevision | null; previous: DocumentStamp }
);

type Distribute<E> = E extends unknown ? Omit<E, 'facts'> : never;
/** An event before the transport adds its facts. */
export type EventInput = Distribute<SaveEvent>;

export type Effect =
    | { type: 'publish' }
    | { type: 'refresh' }
    | { type: 'send' }
    | { type: 'end' }
    | { type: 'abort' }
    | { type: 'readRemote' }
    | { type: 'captureWaiting' }
    | { type: 'report'; diagnostic: Diagnostic }
    | { type: 'measure'; started: number; code: string | null }
    | { type: 'arm'; timer: 'delay' | 'longest'; ms: number }
    | { type: 'backoff'; ms: number }
    | { type: 'clear'; timers: readonly Timer[] }
    | { type: 'open'; serial: number; timeoutMs: number }
    | { type: 'save'; request: SaveRequest; serial: number }
    | { type: 'prepare'; source: Pinned | undefined }
    | { type: 'snapshot'; call: number }
    | { type: 'answer'; calls: readonly number[]; result: CommitResult }
    | { type: 'answerWaiting'; result: CommitResult };

export type Step = {
    state: SaveMachine;
    effects: readonly Effect[];
};

export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

/** A copy of the machine and the effects a handler appends, so `next` never changes its input. */
export type Draft = {
    m: Mutable<SaveMachine>;
    fx: Effect[];
    facts: Facts;
};

export const timing = <K extends keyof Timing>(facts: Facts, name: K): Timing[K] => {
    const { options } = facts;
    if (options === undefined || options[name] === undefined) {
        return DEFAULTS[name];
    }

    return options[name] as Timing[K];
};

/** A new record that nobody changed has nothing to save. */
export const unsavedOf = (m: SaveMachine, sequence: number) =>
    (sequence > m.acknowledged && sequence > 0) || m.unsavedOnMount;

/** Whether a write's outcome is unknown, in flight or waiting for replay. */
export const outcomeUnknown = (m: SaveMachine) =>
    m.flight !== undefined || (m.unresolved !== undefined && (m.state === 'uncertain' || m.state === 'offline'));

export const statusOf = (m: SaveMachine): SaveStatus => {
    let inFlightOperationId: string | null = null;
    if (m.flight !== undefined) {
        inFlightOperationId = m.flight.request.operationId;
    }

    return {
        state: m.state,
        latestSequence: m.latest,
        acknowledgedSequence: m.acknowledged,
        revision: m.revision,
        inFlightOperationId,
        diagnostic: m.problem,
    };
};

/** Why `requestCommit` answers at once with no capture. */
export const refusal = (m: SaveMachine): CommitResult | undefined => {
    if (m.ended) {
        return DISPOSED;
    }

    if (m.state === 'conflict') {
        return CONFLICT;
    }

    return undefined;
};

/** Why `commit` answers before it waits for anything. */
export const gate = (
    m: SaveMachine,
    facts: Facts,
    composition: 'wait' | 'reject' | undefined,
): CommitResult | undefined => {
    // A faulted session still saves its last published snapshot, and the runtime refuses a host call while `transitioning`.
    if (facts.phase === 'mounting' || facts.phase === 'disposed') {
        return { status: 'blocked', code: 'not-ready' };
    }

    // A listener of what `dispose` reported may call this while the phase is still `ready`.
    const refused = refusal(m);
    if (refused !== undefined) {
        return refused;
    }

    if (facts.composing && composition === 'reject') {
        return { status: 'blocked', code: 'composition-active' };
    }

    return undefined;
};
