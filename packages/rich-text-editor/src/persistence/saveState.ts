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
export type Rejection = Extract<SaveResponse, { readonly status: 'rejected' }>['code'];
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
export interface Facts {
    readonly now: number;
    readonly online: boolean;
    readonly phase: EditorSummary['phase'];
    readonly composing: boolean;
    readonly sequence: number;
    readonly session: SessionToken;
    /** Read at each event, so the host's newest options apply. */
    readonly options: PersistenceOptions | undefined;
}

/** The one write in flight: the `serial` tells its answer from a late answer of an earlier write. */
export interface Flight {
    readonly request: SaveRequest;
    readonly started: number;
    readonly serial: number;
}

/** A snapshot `requestCommit` pinned, which is written as it is, ahead of any later autosave. */
export interface Pin {
    readonly stamp: DocumentStamp;
    readonly document: RichTextDocument;
    /** The calls that share its next result; a call after that result waits for a later one. */
    readonly calls: readonly number[];
}

export interface SaveMachine {
    readonly state: SaveState;
    readonly latest: number;
    readonly acknowledged: number;
    /** Cleared by the first accepted acknowledgment, which saves what the session mounted with. */
    readonly unsavedOnMount: boolean;
    readonly revision: ServerRevision | null;
    /** What `requestCommit` answers with while it holds for the current stamp. */
    readonly accepted: SaveAcknowledgment | undefined;
    readonly rejection: Rejection | null;
    readonly committed: boolean;
    readonly problem: Diagnostic | null;
    readonly flight: Flight | undefined;
    /** The write whose outcome is not known yet, which every later try replays unchanged. */
    readonly unresolved: SaveRequest | undefined;
    /** The write a failed session left behind: its acknowledgment saves none of this session's sequences. */
    readonly carried: SaveRequest | undefined;
    readonly replays: number;
    /** A write came due while a write in flight, a replay, the network or unsettled input held it. */
    readonly due: boolean;
    /** In call order; the oldest stays until its write is answered. */
    readonly pinned: readonly Pin[];
    readonly writes: number;
    readonly ended: boolean;
    /** A session that never became ready, such as StrictMode's throwaway mount, leaves nothing the author saw unsaved. */
    readonly shown: boolean;
    readonly retrying: boolean;
    readonly longest: boolean;
}

export interface Pinned {
    readonly stamp: DocumentStamp;
    readonly document: RichTextDocument;
}

export type SaveEvent = { readonly facts: Facts } & (
    | { readonly type: 'mounted' }
    | { readonly type: 'changed' }
    | { readonly type: 'flush' }
    | { readonly type: 'send' }
    | { readonly type: 'retryDue' }
    | { readonly type: 'ready' }
    | { readonly type: 'online' }
    | { readonly type: 'serviceChanged' }
    | { readonly type: 'dispose' }
    | { readonly type: 'failed'; readonly serial: number; readonly code: 'timeout' | 'transport' }
    | { readonly type: 'answered'; readonly serial: number; readonly response: SaveResponse }
    | { readonly type: 'prepared'; readonly request: SaveRequest }
    | { readonly type: 'pin'; readonly call: number }
    | {
          readonly type: 'pinned';
          readonly call: number;
          readonly stamp: DocumentStamp;
          readonly document: RichTextDocument;
      }
    | { readonly type: 'callTimedOut'; readonly call: number }
    | { readonly type: 'replaced'; readonly revision: ServerRevision | null; readonly previous: DocumentStamp }
);

type Distribute<E> = E extends unknown ? Omit<E, 'facts'> : never;
/** An event before the transport adds its facts. */
export type EventInput = Distribute<SaveEvent>;

export type Effect =
    | { readonly type: 'publish' }
    | { readonly type: 'refresh' }
    | { readonly type: 'send' }
    | { readonly type: 'end' }
    | { readonly type: 'abort' }
    | { readonly type: 'readRemote' }
    | { readonly type: 'captureWaiting' }
    | { readonly type: 'report'; readonly diagnostic: Diagnostic }
    | { readonly type: 'measure'; readonly started: number; readonly code: string | null }
    | { readonly type: 'arm'; readonly timer: 'delay' | 'longest'; readonly ms: number }
    | { readonly type: 'backoff'; readonly ms: number }
    | { readonly type: 'clear'; readonly timers: readonly Timer[] }
    | { readonly type: 'open'; readonly serial: number; readonly timeoutMs: number }
    | { readonly type: 'save'; readonly request: SaveRequest; readonly serial: number }
    | { readonly type: 'prepare'; readonly source: Pinned | undefined }
    | { readonly type: 'snapshot'; readonly call: number }
    | { readonly type: 'answer'; readonly calls: readonly number[]; readonly result: CommitResult }
    | { readonly type: 'answerWaiting'; readonly result: CommitResult };

export interface Step {
    readonly state: SaveMachine;
    readonly effects: readonly Effect[];
}

export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

/** A copy of the machine and the effects a handler appends, so `next` never changes its input. */
export interface Draft {
    readonly m: Mutable<SaveMachine>;
    readonly fx: Effect[];
    readonly facts: Facts;
}

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
