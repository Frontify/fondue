/* (c) Copyright Frontify Ltd., all rights reserved. */

import { diagnostic } from '#/model/internal';
import { sameStamp } from '#/runtime/saves';
import { type CommitResult, type SaveAcknowledgment, type ServerRevision } from '#/runtime/types';

import {
    CONFLICT,
    refusal,
    timing,
    type Draft,
    type Effect,
    type Flight,
    type Mutable,
    type Pinned,
    type SaveMachine,
} from './saveState';
import {
    answer,
    checkpointOf,
    endFlight,
    idle,
    leave,
    outcomeOf,
    parkOffline,
    publish,
    replay,
    send,
    stopTimers,
} from './saveSteps';
import { type SaveResponse } from './types';

const saved = (d: Draft, current: Flight, acknowledgment: SaveAcknowledgment) => {
    const { m } = d;
    // Only the in-flight request's own acknowledgment counts; any other leaves it in flight until its timeout.
    if (
        acknowledgment.operationId !== current.request.operationId ||
        !sameStamp(acknowledgment.stamp, current.request.stamp)
    ) {
        d.fx.push({
            type: 'report',
            diagnostic: diagnostic('persistence.ack-mismatch', undefined, undefined, 'warning'),
        });

        return;
    }

    endFlight(d);
    m.unresolved = undefined;
    m.revision = acknowledgment.revision;
    // A failed session's write saved a sequence of that session, so what this one mounted with stays unsaved.
    if (current.request !== m.carried) {
        m.acknowledged = acknowledgment.stamp.sequence;
        m.accepted = acknowledgment;
        m.unsavedOnMount = false;
    }

    const pin = checkpointOf(m, current.request);
    m.committed = pin !== undefined;
    if (pin !== undefined) {
        m.pinned = m.pinned.slice(1);
        answer(d, pin.calls, { status: 'acknowledged', acknowledgment });
    }

    m.problem = null;
    // A newer change keeps the session dirty, and the next write takes this revision as its base.
    idle(d);
    d.fx.push({ type: 'publish' }, { type: 'measure', started: current.started, code: null }, { type: 'send' });
};

const conflicted = (d: Draft, current: Flight, currentRevision: ServerRevision) => {
    const { m } = d;
    // Only replacement leaves a conflict, so no pinned checkpoint is written.
    for (const pin of m.pinned) {
        answer(d, pin.calls, CONFLICT);
    }

    m.pinned = [];
    m.state = 'conflict';
    const problem = diagnostic('persistence.conflict', undefined, { currentRevision }, 'error');
    m.problem = problem;
    d.fx.push(
        { type: 'publish' },
        { type: 'report', diagnostic: problem },
        { type: 'measure', started: current.started, code: 'conflict' },
        { type: 'readRemote' },
    );
};

const rejected = (d: Draft, current: Flight, response: Extract<SaveResponse, { status: 'rejected' }>) => {
    const { m } = d;
    const pin = checkpointOf(m, current.request);
    if (pin !== undefined) {
        m.pinned = m.pinned.slice(1);
        let refused: CommitResult = { status: 'blocked', code: 'forbidden' };
        if (response.code !== 'forbidden') {
            refused = { status: 'failed', code: response.code, outcome: 'rejected' };
        }

        answer(d, pin.calls, refused);
    }

    m.state = 'error';
    m.rejection = response.code;
    m.problem = response.diagnostics[0] ?? null;
    publish(d);
    for (const reported of response.diagnostics) {
        d.fx.push({ type: 'report', diagnostic: reported });
    }

    // A later pinned checkpoint is a `requestCommit` call, which `error` lets through.
    d.fx.push({ type: 'measure', started: current.started, code: response.code }, { type: 'send' });
};

export const answered = (d: Draft, { serial, response }: { serial: number; response: SaveResponse }) => {
    const { m } = d;
    const current = m.flight;
    if (current === undefined || current.serial !== serial) {
        return;
    }

    if (response.status === 'saved') {
        saved(d, current, response.acknowledgment);

        return;
    }

    endFlight(d);
    m.unresolved = undefined;
    m.due = false;
    stopTimers(d);
    if (response.status === 'conflict') {
        conflicted(d, current, response.currentRevision);

        return;
    }

    rejected(d, current, response);
};

/** A write with an unknown outcome: replayed after a backoff while online, after the `online` event while offline. */
export const failed = (d: Draft, { serial, code }: { serial: number; code: 'timeout' | 'transport' }) => {
    const { m, facts } = d;
    const current = m.flight;
    if (current === undefined || current.serial !== serial) {
        return;
    }

    endFlight(d);
    d.fx.push({ type: 'abort' });
    const pin = checkpointOf(m, current.request);
    if (pin !== undefined) {
        answer(d, pin.calls, { status: 'failed', code, outcome: 'unknown' });
        // The pin stays for the write, which answers no call twice.
        m.pinned = [{ ...pin, calls: [] }, ...m.pinned.slice(1)];
    }

    const measure: Effect = { type: 'measure', started: current.started, code };
    if (parkOffline(d)) {
        d.fx.push(measure);

        return;
    }

    if (m.replays >= timing(facts, 'maxRetries')) {
        m.state = 'error';
        m.rejection = null;
        const problem = diagnostic('persistence.retries-exhausted', undefined, { retries: m.replays }, 'error');
        m.problem = problem;
        d.fx.push({ type: 'publish' }, { type: 'report', diagnostic: problem }, measure);

        return;
    }

    m.state = 'uncertain';
    m.retrying = true;
    d.fx.push({ type: 'publish' }, measure, { type: 'backoff', ms: timing(facts, 'backoffMs') * 2 ** m.replays });
};

export const capture = (d: Draft, { call }: { call: number }) => {
    const refused = refusal(d.m);
    if (refused !== undefined) {
        answer(d, [call], refused);

        return;
    }

    d.fx.push({ type: 'snapshot', call });
};

const join = (m: Mutable<SaveMachine>, call: number, held: Pinned) => {
    const last = m.pinned.at(-1);
    if (last === undefined || !sameStamp(last.stamp, held.stamp)) {
        m.pinned = [...m.pinned, { stamp: held.stamp, document: held.document, calls: [call] }];

        return;
    }

    m.pinned = [...m.pinned.slice(0, -1), { ...last, calls: [...last.calls, call] }];
};

export const pinned = (d: Draft, { call, stamp, document }: { call: number } & Pinned) => {
    const { m, facts } = d;
    if (m.accepted !== undefined && sameStamp(m.accepted.stamp, stamp)) {
        answer(d, [call], { status: 'acknowledged', acknowledgment: m.accepted });

        return;
    }

    join(m, call, { stamp, document });
    // The write a fault, the network or spent retries left unresolved goes first, unchanged.
    if (m.unresolved !== undefined && m.flight === undefined && !m.retrying) {
        replay(d);
    }

    send(d);
    // Only this call answers at once; the others keep waiting for the write.
    if (!facts.online) {
        leave(m, call);
        answer(d, [call], { status: 'failed', code: 'transport', outcome: outcomeOf(m, stamp) });
    }
};

export const callTimedOut = (d: Draft, { call }: { call: number }) => {
    const { m } = d;
    const held = leave(m, call);
    // Past the timeout the call resolves, while its pinned checkpoint stays for the write.
    answer(d, [call], { status: 'failed', code: 'timeout', outcome: outcomeOf(m, held?.stamp) });
};
