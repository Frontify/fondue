/* (c) Copyright Frontify Ltd., all rights reserved. */

import { diagnostic } from '#/model/internal';
import { sameStamp } from '#/runtime/reporting/saves';
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
    machine: Mutable<SaveMachine>,
    loaded: ServerRevision | null,
    unsavedAtLoad: boolean,
    session: SessionToken,
) => {
    machine.latest = 0;
    // A new record starts below the first sequence, an existing one at it.
    machine.acknowledged = 0;
    if (loaded === null) {
        machine.acknowledged = -1;
    }

    machine.unsavedOnMount = unsavedAtLoad;
    machine.state = 'clean';
    if (unsavedAtLoad) {
        machine.state = 'dirty';
    }

    machine.revision = loaded;
    machine.accepted = undefined;
    machine.committed = false;
    if (loaded !== null && !unsavedAtLoad) {
        machine.accepted = { operationId: null, stamp: { ...session, sequence: 0 }, revision: loaded };
    }
};

const paused = (machine: SaveMachine) => machine.state === 'conflict' || machine.state === 'error';

// A faulted session writes only what `requestCommit` pinned, and a replacement writes its `save`.
const writable = (machine: SaveMachine, facts: Facts) =>
    facts.phase === 'ready' ||
    facts.phase === 'transitioning' ||
    (facts.phase === 'faulted' && machine.pinned.length > 0);

/** Asks the transport to publish the status. */
export const publish = (draft: Draft) => {
    draft.effects.push({ type: 'publish' });
};

/** Sets state `offline` while the browser reports no network; `true` when it did. */
export const parkOffline = (draft: Draft) => {
    if (draft.facts.online) {
        return false;
    }

    draft.machine.state = 'offline';
    publish(draft);

    return true;
};

/** Settles to `clean`, or `dirty` when changes remain unsaved. */
export const idle = (draft: Draft) => {
    draft.machine.state = 'clean';
    if (unsavedOf(draft.machine, draft.facts.sequence)) {
        draft.machine.state = 'dirty';
    }
};

/** Clears the autosave timers and forgets that the longest wait is running. */
export const stopTimers = (draft: Draft) => {
    draft.effects.push({ type: 'clear', timers: ['delay', 'longest'] });
    draft.machine.longest = false;
};

/** The write the latest change makes due: `delayMs` after it, or `maxWaitMs` after the first unsaved one. */
export const schedule = (draft: Draft) => {
    const { machine, facts } = draft;
    if (timing(facts, 'autosave') === 'off' || paused(machine)) {
        return;
    }

    draft.effects.push(
        { type: 'clear', timers: ['delay'] },
        { type: 'arm', timer: 'delay', milliseconds: timing(facts, 'delayMs') },
    );
    if (!machine.longest) {
        machine.longest = true;
        draft.effects.push({ type: 'arm', timer: 'longest', milliseconds: timing(facts, 'maxWaitMs') });
    }
};

/** Drops the in-flight write and its timeout; the write stays unresolved until answered. */
export const endFlight = (draft: Draft) => {
    draft.effects.push({ type: 'clear', timers: ['timeout'] });
    draft.machine.flight = undefined;
};

/** Answers the given checkpoint calls; no effect when there are none. */
export const answer = (draft: Draft, calls: readonly number[], result: CommitResult) => {
    if (calls.length > 0) {
        draft.effects.push({ type: 'answer', calls, result });
    }
};

/** Takes a call off its pin, so a later call there is not held by it; returns that pin. */
export const leave = (machine: Mutable<SaveMachine>, call: number) => {
    const held = machine.pinned.find((pin) => pin.calls.includes(call));
    machine.pinned = machine.pinned.map((pin) => {
        if (pin === held) {
            return { ...pin, calls: pin.calls.filter((other) => other !== call) };
        }

        return pin;
    });

    return held;
};

/** The oldest pin when `request` writes it. */
export const checkpointOf = (machine: SaveMachine, request: SaveRequest) => {
    const [pin] = machine.pinned;
    if (pin !== undefined && sameStamp(pin.stamp, request.stamp)) {
        return pin;
    }

    return undefined;
};

/** `unknown` once a write carried the snapshot of `stamp`, which the server may have stored. */
export const outcomeOf = (machine: SaveMachine, stamp: DocumentStamp | undefined): 'not-sent' | 'unknown' => {
    if (stamp !== undefined && machine.unresolved !== undefined && sameStamp(machine.unresolved.stamp, stamp)) {
        return 'unknown';
    }

    return 'not-sent';
};

/** Starts a write for `request`: opens its timeout, publishes `saving` and sends it to the service. */
export const write = (draft: Draft, request: SaveRequest) => {
    const { machine, facts } = draft;
    machine.writes += 1;
    machine.flight = { request, started: facts.now, serial: machine.writes };
    machine.state = 'saving';
    draft.effects.push(
        { type: 'open', serial: machine.writes, timeoutMs: timing(facts, 'timeoutMs') },
        { type: 'publish' },
        { type: 'save', request, serial: machine.writes },
    );
};

/** Sends the oldest pinned checkpoint, else the latest snapshot, once nothing holds it. */
export const send = (draft: Draft) => {
    const { machine, facts } = draft;
    // A write in flight stays unresolved until its answer, so this keeps at most one in flight.
    if (machine.ended || machine.unresolved !== undefined || machine.state === 'conflict') {
        return;
    }

    const [pin] = machine.pinned;
    if (pin !== undefined) {
        if (writable(machine, facts) && !parkOffline(draft)) {
            draft.effects.push({ type: 'prepare', source: { stamp: pin.stamp, document: pin.document } });
        }

        return;
    }

    if (!machine.due || paused(machine)) {
        return;
    }

    if (facts.phase !== 'ready' || facts.composing) {
        return;
    }

    if (!unsavedOf(machine, facts.sequence)) {
        machine.due = false;

        return;
    }

    if (parkOffline(draft)) {
        return;
    }

    machine.due = false;
    draft.effects.push({ type: 'prepare', source: undefined });
};

/** Sends the unresolved write again, unchanged, unless the machine cannot write or is offline. */
export const replay = (draft: Draft) => {
    const { machine, facts } = draft;
    machine.retrying = false;
    if (machine.unresolved === undefined || machine.ended || !writable(machine, facts)) {
        return;
    }

    if (parkOffline(draft)) {
        return;
    }

    machine.replays += 1;
    write(draft, machine.unresolved);
};

/** Resumes writing once the network is back, replaying an unresolved write first. */
export const online = (draft: Draft) => {
    const { machine, facts } = draft;
    if (machine.ended || machine.state !== 'offline') {
        return;
    }

    // The write whose outcome the network left unknown goes first, unchanged.
    if (machine.unresolved !== undefined) {
        if (writable(machine, facts)) {
            write(draft, machine.unresolved);
        }

        return;
    }

    idle(draft);
    publish(draft);
    draft.effects.push({ type: 'send' });
};

/** Sends the unresolved in-flight write to the new service, which makes the old service's answer void. */
export const serviceChanged = (draft: Draft) => {
    const { machine, facts } = draft;
    if (machine.flight === undefined || machine.unresolved === undefined) {
        return;
    }

    // The old service's answer no longer counts; the same operation goes to the new one.
    endFlight(draft);
    draft.effects.push({ type: 'abort' });
    if (!writable(machine, facts)) {
        machine.state = 'uncertain';
        publish(draft);

        return;
    }

    write(draft, machine.unresolved);
};

/** Ends the old generation for a document replacement: answers its calls and loads the next record. */
export const replaced = (
    draft: Draft,
    { revision, previous }: { revision: ServerRevision | null; previous: DocumentStamp },
) => {
    const { machine, facts } = draft;
    stopTimers(draft);
    machine.due = false;
    // A checkpoint held offline was never sent, and the next document does not hold it.
    for (const held of machine.pinned) {
        answer(draft, held.calls, NOT_SENT);
    }

    machine.pinned = [];
    // A call that has not captured yet answers for the old generation, never with the next document.
    let old: CommitResult = NOT_SENT;
    if (machine.accepted !== undefined && sameStamp(machine.accepted.stamp, previous)) {
        old = { status: 'acknowledged', acknowledgment: machine.accepted };
    }

    draft.effects.push({ type: 'answerWaiting', result: old });
    // The operation that spent its retries in `error` is dropped with the document it carried.
    machine.unresolved = undefined;
    machine.replays = 0;
    machine.problem = null;
    load(machine, revision, false, facts.session);
    draft.effects.push({ type: 'refresh' });
};

/** Ends the machine: answers pinned calls as disposed and reports changes left unsaved. */
export const dispose = (draft: Draft) => {
    const { machine } = draft;
    if (machine.ended) {
        return;
    }

    machine.ended = true;
    machine.longest = false;
    draft.effects.push({ type: 'end' }, { type: 'clear', timers: ['delay', 'longest', 'retry'] });
    if (machine.flight !== undefined) {
        endFlight(draft);
        draft.effects.push({ type: 'abort' }, { type: 'refresh' });
    }

    for (const held of machine.pinned) {
        answer(draft, held.calls, DISPOSED);
    }

    machine.pinned = [];
    // With the machine ended, each waiting call's capture answers `disposed`.
    draft.effects.push({ type: 'captureWaiting' });
    // A session that leaves unsaved changes says so and starts no write.
    if (machine.shown && unsavedOf(machine, draft.facts.sequence)) {
        draft.effects.push({
            type: 'report',
            diagnostic: diagnostic('persistence.disposed-dirty', undefined, undefined, 'warning'),
        });
    }
};
