/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AsyncOperation } from './async';
import { type AsyncEvent, type AsyncMachine, type AsyncStep, type Draft } from './asyncState';

export { initial, type AsyncEffect, type AsyncEvent, type AsyncEventInput, type AsyncFacts } from './asyncState';
export type { AsyncMachine, AsyncStep } from './asyncState';

const forget = (draft: Draft, operation: AsyncOperation) => {
    draft.machine.operations.delete(operation.id);
    draft.effects.push({ type: 'unregister', operation });
};

/** Unregisters `operation`, releases the target it captured, and leaves its pool, which then starts the next waiting one. */
const end = (draft: Draft, operation: AsyncOperation) => {
    forget(draft, operation);
    if (draft.machine.captured.delete(operation) && operation.target !== null) {
        draft.effects.push({ type: 'release', target: operation.target });
    }

    const pool = draft.machine.pools.get(operation);
    if (pool === undefined) {
        return;
    }

    draft.machine.pools.delete(operation);
    const queued = draft.machine.waiting.get(pool.name) ?? [];
    const at = queued.findIndex((entry) => entry.operation === operation);
    if (at >= 0) {
        queued.splice(at, 1);
    }

    if (draft.machine.running.get(pool.name)?.delete(operation) === true) {
        draft.effects.push({ type: 'pump', name: pool.name });
    }
};

const discard = (draft: Draft, reason: string) => {
    draft.effects.push({ type: 'discard', reason });
};

const abortWhere = (draft: Draft, aborts: (operation: AsyncOperation) => boolean) => {
    for (const operation of [...draft.machine.operations.values()]) {
        if (aborts(operation)) {
            end(draft, operation);
            draft.effects.push({ type: 'abort', operation });
        }
    }
};

/** Starts one waiting operation of pool `name` if it has room, then asks for the next. */
const pump = (draft: Draft, name: string) => {
    if (draft.facts.aborting || draft.facts.disposed) {
        return;
    }

    const queued = draft.machine.waiting.get(name) ?? [];
    const busy = draft.machine.running.get(name) ?? new Set<AsyncOperation>();
    draft.machine.running.set(name, busy);
    const entry = queued[0];
    if (entry === undefined) {
        return;
    }

    const { pool } = entry.request;
    let limit = 0;
    if (pool !== undefined) {
        limit = pool.limit;
    }

    if (busy.size >= limit) {
        return;
    }

    queued.shift();
    busy.add(entry.operation);
    draft.effects.push({ type: 'call', operation: entry.operation, request: entry.request });
    draft.effects.push({ type: 'pump', name });
};

/** Decides what a result does: delivered now, held while input is composing, or discarded as stale, superseded or not ready. */
const arrive = (draft: Draft, operation: AsyncOperation, result: unknown) => {
    const { facts, machine } = draft;
    if (facts.disposed) {
        return;
    }

    // Checked first, since a replacement also aborts and unregisters what the old generation started.
    if (
        operation.session.sessionId !== facts.session.sessionId ||
        operation.session.generation !== facts.session.generation
    ) {
        end(draft, operation);
        discard(draft, 'wrong-session');

        return;
    }

    // A newer request on its key aborts and unregisters an older one, whose result is then ignored.
    if (machine.operations.get(operation.id) !== operation) {
        discard(draft, 'superseded');

        return;
    }

    if (facts.faulted) {
        end(draft, operation);
        draft.effects.push({ type: 'abort', operation });
        discard(draft, 'not-ready');

        return;
    }

    if (facts.holding) {
        machine.held.push({ operation, result });

        return;
    }

    forget(draft, operation);
    draft.effects.push({ type: 'deliver', operation, result });
};

type EventOf<EventName extends AsyncEvent['type']> = Extract<AsyncEvent, { type: EventName }>;

/** The transition table: what each event does to a machine in any state. */
const TRANSITIONS: { readonly [EventName in AsyncEvent['type']]: (draft: Draft, event: EventOf<EventName>) => void } = {
    start: (draft, { request, reply }) => {
        const { deliver } = request;
        let target = null;
        let capture = false;
        if (!draft.facts.disposed) {
            target = request.target ?? null;
            capture = target === null && deliver === undefined;
        }

        draft.effects.push({
            type: 'build',
            request,
            reply,
            target,
            capture,
            sequence: (draft.machine.requests.get(request.key) ?? 0) + 1,
        });
    },
    built: (draft, { operation, request, owned }) => {
        // A session that is not ready starts nothing: the operation is aborted and unregistered.
        if (draft.facts.disposed || (operation.target === null && operation.deliver === undefined)) {
            draft.effects.push({ type: 'abort', operation });

            return;
        }

        draft.machine.requests.set(operation.key, operation.request);
        draft.effects.push({ type: 'supersede', operation, request, owned });
    },
    admit: (draft, { operation, request, owned }) => {
        if (owned) {
            draft.machine.captured.add(operation);
        }

        draft.machine.operations.set(operation.id, operation);
        draft.effects.push({ type: 'register', operation });
        const { pool } = request;
        if (pool === undefined) {
            draft.effects.push({ type: 'call', operation, request });

            return;
        }

        draft.machine.pools.set(operation, pool);
        const queued = draft.machine.waiting.get(pool.name) ?? [];
        queued.push({ operation, request });
        draft.machine.waiting.set(pool.name, queued);
        draft.effects.push({ type: 'pump', name: pool.name });
    },
    abortWhere: (draft, { aborts }) => {
        abortWhere(draft, aborts);
    },
    dispose: (draft) => {
        draft.machine.held.length = 0;
        abortWhere(draft, () => true);
    },
    resume: (draft) => {
        for (const name of draft.machine.waiting.keys()) {
            draft.effects.push({ type: 'pump', name });
        }
    },
    pump: (draft, { name }) => {
        pump(draft, name);
    },
    arrive: (draft, { operation, result }) => {
        arrive(draft, operation, result);
    },
    delivered: (draft, { operation, code }) => {
        // The captured target stays until the result has applied through it.
        end(draft, operation);
        if (code !== undefined) {
            discard(draft, code);
        }
    },
    rejected: (draft, { operation, request, error, aborted }) => {
        const live = draft.machine.operations.get(operation.id) === operation && !aborted;
        end(draft, operation);
        if (live) {
            draft.effects.push({ type: 'fail', request, error });
        }
    },
    settle: (draft) => {
        for (const { operation, result } of draft.machine.held.splice(0)) {
            draft.effects.push({ type: 'replay', operation, result });
        }
    },
};

const apply = <EventName extends AsyncEvent['type']>(draft: Draft, event: EventOf<EventName>) => {
    TRANSITIONS[event.type](draft, event);
};

const thaw = (state: AsyncMachine, event: AsyncEvent): Draft => ({
    machine: {
        operations: new Map(state.operations),
        requests: new Map(state.requests),
        held: [...state.held],
        captured: new Set(state.captured),
        running: new Map([...state.running].map(([name, busy]) => [name, new Set(busy)])),
        waiting: new Map([...state.waiting].map(([name, queued]) => [name, [...queued]])),
        pools: new Map(state.pools),
    },
    effects: [],
    facts: event.facts,
});

/**
 * The coordinator's bookkeeping as one pure function: `next(machine, event)` returns the machine after the event and the
 * effects a transport runs, in order. It starts no call, timer or abort, so a transport passes in what it observed as
 * `facts` and feeds every result back as an event.
 */
export const next = (state: AsyncMachine, event: AsyncEvent): AsyncStep => {
    const draft = thaw(state, event);
    apply(draft, event);

    return { state: draft.machine, effects: draft.effects };
};
