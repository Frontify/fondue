/* (c) Copyright Frontify Ltd., all rights reserved. */

import { diagnostic } from '#/model/internal';
import { sameStamp } from '#/runtime/saves';
import { type CommitResult, type DocumentStamp, type ServerRevision, type SessionToken } from '#/runtime/types';

import {
    DISPOSED,
    NOT_SENT,
    timing,
    unsavedOf,
    type Draft,
    type Facts,
    type Mutable,
    type SaveMachine,
} from './saveState';
import { type SaveRequest } from './types';

/** Starts from a loaded record: at mount, and in the new generation of a replacement. */
export const load = (
    m: Mutable<SaveMachine>,
    loaded: ServerRevision | null,
    unsavedAtLoad: boolean,
    session: SessionToken,
) => {
    m.latest = 0;
    // A new record starts below the first sequence, an existing one at it.
    m.acknowledged = 0;
    if (loaded === null) {
        m.acknowledged = -1;
    }
    m.unsavedOnMount = unsavedAtLoad;
    m.state = 'clean';
    if (unsavedAtLoad) {
        m.state = 'dirty';
    }
    m.revision = loaded;
    m.accepted = undefined;
    m.committed = false;
    if (loaded !== null && !unsavedAtLoad) {
        m.accepted = { operationId: null, stamp: { ...session, sequence: 0 }, revision: loaded };
    }
};

const paused = (m: SaveMachine) => m.state === 'conflict' || m.state === 'error';

// A faulted session writes only what `requestCommit` pinned, and a replacement writes its `save`.
const writable = (m: SaveMachine, facts: Facts) =>
    facts.phase === 'ready' || facts.phase === 'transitioning' || (facts.phase === 'faulted' && m.pinned.length > 0);

export const publish = (d: Draft) => {
    d.fx.push({ type: 'publish' });
};

/** Sets state `offline` while the browser reports no network; `true` when it did. */
export const parkOffline = (d: Draft) => {
    if (d.facts.online) {
        return false;
    }
    d.m.state = 'offline';
    publish(d);
    return true;
};

export const idle = (d: Draft) => {
    d.m.state = 'clean';
    if (unsavedOf(d.m, d.facts.sequence)) {
        d.m.state = 'dirty';
    }
};

export const stopTimers = (d: Draft) => {
    d.fx.push({ type: 'clear', timers: ['delay', 'longest'] });
    d.m.longest = false;
};

/** The write the latest change makes due: `delayMs` after it, or `maxWaitMs` after the first unsaved one. */
export const schedule = (d: Draft) => {
    const { m, facts } = d;
    if (timing(facts, 'autosave') === 'off' || paused(m)) {
        return;
    }
    d.fx.push({ type: 'clear', timers: ['delay'] }, { type: 'arm', timer: 'delay', ms: timing(facts, 'delayMs') });
    if (!m.longest) {
        m.longest = true;
        d.fx.push({ type: 'arm', timer: 'longest', ms: timing(facts, 'maxWaitMs') });
    }
};

export const endFlight = (d: Draft) => {
    d.fx.push({ type: 'clear', timers: ['timeout'] });
    d.m.flight = undefined;
};

export const answer = (d: Draft, calls: readonly number[], result: CommitResult) => {
    if (calls.length > 0) {
        d.fx.push({ type: 'answer', calls, result });
    }
};

/** Takes a call off its pin, so a later call there is not held by it; returns that pin. */
export const leave = (m: Mutable<SaveMachine>, call: number) => {
    const held = m.pinned.find((pin) => pin.calls.includes(call));
    m.pinned = m.pinned.map((pin) => {
        if (pin === held) {
            return { ...pin, calls: pin.calls.filter((other) => other !== call) };
        }
        return pin;
    });
    return held;
};

/** The oldest pin when `request` writes it. */
export const checkpointOf = (m: SaveMachine, request: SaveRequest) => {
    const [pin] = m.pinned;
    if (pin !== undefined && sameStamp(pin.stamp, request.stamp)) {
        return pin;
    }
    return undefined;
};

/** `unknown` once a write carried the snapshot of `stamp`, which the server may have stored. */
export const outcomeOf = (m: SaveMachine, stamp: DocumentStamp | undefined): 'not-sent' | 'unknown' => {
    if (stamp !== undefined && m.unresolved !== undefined && sameStamp(m.unresolved.stamp, stamp)) {
        return 'unknown';
    }
    return 'not-sent';
};

export const write = (d: Draft, request: SaveRequest) => {
    const { m, facts } = d;
    m.writes += 1;
    m.flight = { request, started: facts.now, serial: m.writes };
    m.state = 'saving';
    d.fx.push(
        { type: 'open', serial: m.writes, timeoutMs: timing(facts, 'timeoutMs') },
        { type: 'publish' },
        { type: 'save', request, serial: m.writes },
    );
};

/** Sends the oldest pinned checkpoint, else the latest snapshot, once nothing holds it. */
export const send = (d: Draft) => {
    const { m, facts } = d;
    // A write in flight stays unresolved until its answer, so this keeps at most one in flight.
    if (m.ended || m.unresolved !== undefined || m.state === 'conflict') {
        return;
    }
    const [pin] = m.pinned;
    if (pin !== undefined) {
        if (writable(m, facts) && !parkOffline(d)) {
            d.fx.push({ type: 'prepare', source: { stamp: pin.stamp, document: pin.document } });
        }
        return;
    }
    if (!m.due || paused(m)) {
        return;
    }
    if (facts.phase !== 'ready' || facts.composing) {
        return;
    }
    if (!unsavedOf(m, facts.sequence)) {
        m.due = false;
        return;
    }
    if (parkOffline(d)) {
        return;
    }
    m.due = false;
    d.fx.push({ type: 'prepare', source: undefined });
};

export const replay = (d: Draft) => {
    const { m, facts } = d;
    m.retrying = false;
    if (m.unresolved === undefined || m.ended || !writable(m, facts)) {
        return;
    }
    if (parkOffline(d)) {
        return;
    }
    m.replays += 1;
    write(d, m.unresolved);
};

export const online = (d: Draft) => {
    const { m, facts } = d;
    if (m.ended || m.state !== 'offline') {
        return;
    }
    // The write whose outcome the network left unknown goes first, unchanged.
    if (m.unresolved !== undefined) {
        if (writable(m, facts)) {
            write(d, m.unresolved);
        }
        return;
    }
    idle(d);
    publish(d);
    d.fx.push({ type: 'send' });
};

export const serviceChanged = (d: Draft) => {
    const { m, facts } = d;
    if (m.flight === undefined || m.unresolved === undefined) {
        return;
    }
    // The old service's answer no longer counts; the same operation goes to the new one.
    endFlight(d);
    d.fx.push({ type: 'abort' });
    if (!writable(m, facts)) {
        m.state = 'uncertain';
        publish(d);
        return;
    }
    write(d, m.unresolved);
};

export const replaced = (
    d: Draft,
    { revision, previous }: { readonly revision: ServerRevision | null; readonly previous: DocumentStamp },
) => {
    const { m, facts } = d;
    stopTimers(d);
    m.due = false;
    // A checkpoint held offline was never sent, and the next document does not hold it.
    for (const held of m.pinned) {
        answer(d, held.calls, NOT_SENT);
    }
    m.pinned = [];
    // A call that has not captured yet answers for the old generation, never with the next document.
    let old: CommitResult = NOT_SENT;
    if (m.accepted !== undefined && sameStamp(m.accepted.stamp, previous)) {
        old = { status: 'acknowledged', acknowledgment: m.accepted };
    }
    d.fx.push({ type: 'answerWaiting', result: old });
    // The operation that spent its retries in `error` is dropped with the document it carried.
    m.unresolved = undefined;
    m.replays = 0;
    m.problem = null;
    load(m, revision, false, facts.session);
    d.fx.push({ type: 'refresh' });
};

export const dispose = (d: Draft) => {
    const { m } = d;
    if (m.ended) {
        return;
    }
    m.ended = true;
    m.longest = false;
    d.fx.push({ type: 'end' }, { type: 'clear', timers: ['delay', 'longest', 'retry'] });
    if (m.flight !== undefined) {
        endFlight(d);
        d.fx.push({ type: 'abort' }, { type: 'refresh' });
    }
    for (const held of m.pinned) {
        answer(d, held.calls, DISPOSED);
    }
    m.pinned = [];
    // With the machine ended, each waiting call's capture answers `disposed`.
    d.fx.push({ type: 'captureWaiting' });
    // A session that leaves unsaved changes says so and starts no write.
    if (m.shown && unsavedOf(m, d.facts.sequence)) {
        d.fx.push({
            type: 'report',
            diagnostic: diagnostic('persistence.disposed-dirty', undefined, undefined, 'warning'),
        });
    }
};
