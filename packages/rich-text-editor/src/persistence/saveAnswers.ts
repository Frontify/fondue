/* (c) Copyright Frontify Ltd., all rights reserved. */

import { diagnostic } from '#/model/internal';
import { sameStamp } from '#/runtime/reporting/saves';
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

const saved = (draft: Draft, current: Flight, acknowledgment: SaveAcknowledgment) => {
    const { machine } = draft;
    // Only the in-flight request's own acknowledgment counts; any other leaves it in flight until its timeout.
    if (
        acknowledgment.operationId !== current.request.operationId ||
        !sameStamp(acknowledgment.stamp, current.request.stamp)
    ) {
        draft.effects.push({
            type: 'report',
            diagnostic: diagnostic('persistence.ack-mismatch', undefined, undefined, 'warning'),
        });

        return;
    }

    endFlight(draft);
    machine.unresolved = undefined;
    machine.revision = acknowledgment.revision;
    // A failed session's write saved a sequence of that session, so what this one mounted with stays unsaved.
    if (current.request !== machine.carried) {
        machine.acknowledged = acknowledgment.stamp.sequence;
        machine.accepted = acknowledgment;
        machine.unsavedOnMount = false;
    }

    const pin = checkpointOf(machine, current.request);
    machine.committed = pin !== undefined;
    if (pin !== undefined) {
        machine.pinned = machine.pinned.slice(1);
        answer(draft, pin.calls, { status: 'acknowledged', acknowledgment });
    }

    machine.problem = null;
    // A newer change keeps the session dirty, and the next write takes this revision as its base.
    idle(draft);
    draft.effects.push(
        { type: 'publish' },
        { type: 'measure', started: current.started, code: null },
        { type: 'send' },
    );
};

const conflicted = (draft: Draft, current: Flight, currentRevision: ServerRevision) => {
    const { machine } = draft;
    // Only replacement leaves a conflict, so no pinned checkpoint is written.
    for (const pin of machine.pinned) {
        answer(draft, pin.calls, CONFLICT);
    }

    machine.pinned = [];
    machine.state = 'conflict';
    const problem = diagnostic('persistence.conflict', undefined, { currentRevision }, 'error');
    machine.problem = problem;
    draft.effects.push(
        { type: 'publish' },
        { type: 'report', diagnostic: problem },
        { type: 'measure', started: current.started, code: 'conflict' },
        { type: 'readRemote' },
    );
};

const rejected = (draft: Draft, current: Flight, response: Extract<SaveResponse, { status: 'rejected' }>) => {
    const { machine } = draft;
    const pin = checkpointOf(machine, current.request);
    if (pin !== undefined) {
        machine.pinned = machine.pinned.slice(1);
        let refused: CommitResult = { status: 'blocked', code: 'forbidden' };
        if (response.code !== 'forbidden') {
            refused = { status: 'failed', code: response.code, outcome: 'rejected' };
        }

        answer(draft, pin.calls, refused);
    }

    machine.state = 'error';
    machine.rejection = response.code;
    machine.problem = response.diagnostics[0] ?? null;
    publish(draft);
    for (const reported of response.diagnostics) {
        draft.effects.push({ type: 'report', diagnostic: reported });
    }

    // A later pinned checkpoint is a `requestCommit` call, which `error` lets through.
    draft.effects.push({ type: 'measure', started: current.started, code: response.code }, { type: 'send' });
};

/** Applies the service's answer to the in-flight write; an answer for any other write is ignored. */
export const answered = (draft: Draft, { serial, response }: { serial: number; response: SaveResponse }) => {
    const { machine } = draft;
    const current = machine.flight;
    if (current === undefined || current.serial !== serial) {
        return;
    }

    if (response.status === 'saved') {
        saved(draft, current, response.acknowledgment);

        return;
    }

    endFlight(draft);
    machine.unresolved = undefined;
    machine.due = false;
    stopTimers(draft);
    if (response.status === 'conflict') {
        conflicted(draft, current, response.currentRevision);

        return;
    }

    rejected(draft, current, response);
};

/** A write with an unknown outcome: replayed after a backoff while online, after the `online` event while offline. */
export const failed = (draft: Draft, { serial, code }: { serial: number; code: 'timeout' | 'transport' }) => {
    const { machine, facts } = draft;
    const current = machine.flight;
    if (current === undefined || current.serial !== serial) {
        return;
    }

    endFlight(draft);
    draft.effects.push({ type: 'abort' });
    const pin = checkpointOf(machine, current.request);
    if (pin !== undefined) {
        answer(draft, pin.calls, { status: 'failed', code, outcome: 'unknown' });
        // The pin stays for the write, which answers no call twice.
        machine.pinned = [{ ...pin, calls: [] }, ...machine.pinned.slice(1)];
    }

    const measure: Effect = { type: 'measure', started: current.started, code };
    if (parkOffline(draft)) {
        draft.effects.push(measure);

        return;
    }

    if (machine.replays >= timing(facts, 'maxRetries')) {
        machine.state = 'error';
        machine.rejection = null;
        const problem = diagnostic('persistence.retries-exhausted', undefined, { retries: machine.replays }, 'error');
        machine.problem = problem;
        draft.effects.push({ type: 'publish' }, { type: 'report', diagnostic: problem }, measure);

        return;
    }

    machine.state = 'uncertain';
    machine.retrying = true;
    draft.effects.push({ type: 'publish' }, measure, {
        type: 'backoff',
        milliseconds: timing(facts, 'backoffMs') * 2 ** machine.replays,
    });
};

/** Answers a checkpoint call at once when saving is refused, else asks the transport to snapshot the document. */
export const capture = (draft: Draft, { call }: { call: number }) => {
    const refused = refusal(draft.machine);
    if (refused !== undefined) {
        answer(draft, [call], refused);

        return;
    }

    draft.effects.push({ type: 'snapshot', call });
};

const join = (machine: Mutable<SaveMachine>, call: number, held: Pinned) => {
    const last = machine.pinned.at(-1);
    if (last === undefined || !sameStamp(last.stamp, held.stamp)) {
        machine.pinned = [...machine.pinned, { stamp: held.stamp, document: held.document, calls: [call] }];

        return;
    }

    machine.pinned = [...machine.pinned.slice(0, -1), { ...last, calls: [...last.calls, call] }];
};

/** Pins a snapshot to a checkpoint call and sends it; the call answers at once when the session is offline. */
export const pinned = (draft: Draft, { call, stamp, document }: { call: number } & Pinned) => {
    const { machine, facts } = draft;
    if (machine.accepted !== undefined && sameStamp(machine.accepted.stamp, stamp)) {
        answer(draft, [call], { status: 'acknowledged', acknowledgment: machine.accepted });

        return;
    }

    join(machine, call, { stamp, document });
    // The write a fault, the network or spent retries left unresolved goes first, unchanged.
    if (machine.unresolved !== undefined && machine.flight === undefined && !machine.retrying) {
        replay(draft);
    }

    send(draft);
    // Only this call answers at once; the others keep waiting for the write.
    if (!facts.online) {
        leave(machine, call);
        answer(draft, [call], { status: 'failed', code: 'transport', outcome: outcomeOf(machine, stamp) });
    }
};

/** Resolves a checkpoint call that outlived its timeout, leaving its pinned snapshot for the write. */
export const callTimedOut = (draft: Draft, { call }: { call: number }) => {
    const { machine } = draft;
    const held = leave(machine, call);
    // Past the timeout the call resolves, while its pinned checkpoint stays for the write.
    answer(draft, [call], { status: 'failed', code: 'timeout', outcome: outcomeOf(machine, held?.stamp) });
};
