/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AsyncOperation } from './async';
import { type AsyncEvent, type AsyncMachine, type AsyncStep, type Draft } from './asyncState';

export { initial, type AsyncEffect, type AsyncEvent, type AsyncEventInput, type AsyncFacts } from './asyncState';
export type { AsyncMachine, AsyncStep } from './asyncState';

const forget = (d: Draft, operation: AsyncOperation) => {
    d.m.operations.delete(operation.id);
    d.fx.push({ type: 'unregister', operation });
};

const end = (d: Draft, operation: AsyncOperation) => {
    forget(d, operation);
    if (d.m.captured.delete(operation) && operation.target !== null) {
        d.fx.push({ type: 'release', target: operation.target });
    }
    const pool = d.m.pools.get(operation);
    if (pool === undefined) {
        return;
    }
    d.m.pools.delete(operation);
    const queued = d.m.waiting.get(pool.name) ?? [];
    const at = queued.findIndex((entry) => entry.operation === operation);
    if (at >= 0) {
        queued.splice(at, 1);
    }
    if (d.m.running.get(pool.name)?.delete(operation) === true) {
        d.fx.push({ type: 'pump', name: pool.name });
    }
};

const discard = (d: Draft, reason: string) => {
    d.fx.push({ type: 'discard', reason });
};

const abortWhere = (d: Draft, aborts: (operation: AsyncOperation) => boolean) => {
    for (const operation of [...d.m.operations.values()]) {
        if (aborts(operation)) {
            end(d, operation);
            d.fx.push({ type: 'abort', operation });
        }
    }
};

/** Starts one waiting operation of pool `name` if it has room, then asks for the next. */
const pump = (d: Draft, name: string) => {
    if (d.facts.aborting || d.facts.disposed) {
        return;
    }
    const queued = d.m.waiting.get(name) ?? [];
    const busy = d.m.running.get(name) ?? new Set<AsyncOperation>();
    d.m.running.set(name, busy);
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
    d.fx.push({ type: 'call', operation: entry.operation, request: entry.request });
    d.fx.push({ type: 'pump', name });
};

const arrive = (d: Draft, operation: AsyncOperation, result: unknown) => {
    const { facts, m } = d;
    if (facts.disposed) {
        return;
    }
    // Checked first, since a replacement also aborts and unregisters what the old generation started.
    if (
        operation.session.sessionId !== facts.session.sessionId ||
        operation.session.generation !== facts.session.generation
    ) {
        end(d, operation);
        discard(d, 'wrong-session');
        return;
    }
    // A newer request on its key aborts and unregisters an older one, whose result is then ignored.
    if (m.operations.get(operation.id) !== operation) {
        discard(d, 'superseded');
        return;
    }
    if (facts.faulted) {
        end(d, operation);
        d.fx.push({ type: 'abort', operation });
        discard(d, 'not-ready');
        return;
    }
    if (facts.holding) {
        m.held.push({ operation, result });
        return;
    }
    forget(d, operation);
    d.fx.push({ type: 'deliver', operation, result });
};

type Of<T extends AsyncEvent['type']> = Extract<AsyncEvent, { readonly type: T }>;

/** The transition table: what each event does to a machine in any state. */
const TRANSITIONS: { readonly [T in AsyncEvent['type']]: (d: Draft, event: Of<T>) => void } = {
    start: (d, { request, reply }) => {
        const { deliver } = request;
        let target = null;
        let capture = false;
        if (!d.facts.disposed) {
            target = request.target ?? null;
            capture = target === null && deliver === undefined;
        }
        d.fx.push({
            type: 'build',
            request,
            reply,
            target,
            capture,
            sequence: (d.m.requests.get(request.key) ?? 0) + 1,
        });
    },
    built: (d, { operation, request, owned }) => {
        // A session that is not ready starts nothing: the operation is aborted and unregistered.
        if (d.facts.disposed || (operation.target === null && operation.deliver === undefined)) {
            d.fx.push({ type: 'abort', operation });
            return;
        }
        d.m.requests.set(operation.key, operation.request);
        d.fx.push({ type: 'supersede', operation, request, owned });
    },
    admit: (d, { operation, request, owned }) => {
        if (owned) {
            d.m.captured.add(operation);
        }
        d.m.operations.set(operation.id, operation);
        d.fx.push({ type: 'register', operation });
        const { pool } = request;
        if (pool === undefined) {
            d.fx.push({ type: 'call', operation, request });
            return;
        }
        d.m.pools.set(operation, pool);
        const queued = d.m.waiting.get(pool.name) ?? [];
        queued.push({ operation, request });
        d.m.waiting.set(pool.name, queued);
        d.fx.push({ type: 'pump', name: pool.name });
    },
    abortWhere: (d, { aborts }) => {
        abortWhere(d, aborts);
    },
    dispose: (d) => {
        d.m.held.length = 0;
        abortWhere(d, () => true);
    },
    resume: (d) => {
        for (const name of d.m.waiting.keys()) {
            d.fx.push({ type: 'pump', name });
        }
    },
    pump: (d, { name }) => {
        pump(d, name);
    },
    arrive: (d, { operation, result }) => {
        arrive(d, operation, result);
    },
    delivered: (d, { operation, code }) => {
        // The captured target stays until the result has applied through it.
        end(d, operation);
        if (code !== undefined) {
            discard(d, code);
        }
    },
    rejected: (d, { operation, request, error, aborted }) => {
        const live = d.m.operations.get(operation.id) === operation && !aborted;
        end(d, operation);
        if (live) {
            d.fx.push({ type: 'fail', request, error });
        }
    },
    settle: (d) => {
        for (const { operation, result } of d.m.held.splice(0)) {
            d.fx.push({ type: 'replay', operation, result });
        }
    },
};

const apply = <T extends AsyncEvent['type']>(d: Draft, event: Of<T>) => {
    TRANSITIONS[event.type](d, event);
};

const thaw = (state: AsyncMachine, event: AsyncEvent): Draft => ({
    m: {
        operations: new Map(state.operations),
        requests: new Map(state.requests),
        held: [...state.held],
        captured: new Set(state.captured),
        running: new Map([...state.running].map(([name, busy]) => [name, new Set(busy)])),
        waiting: new Map([...state.waiting].map(([name, queued]) => [name, [...queued]])),
        pools: new Map(state.pools),
    },
    fx: [],
    facts: event.facts,
});

/**
 * The coordinator's bookkeeping as one pure function: `next(machine, event)` returns the machine after the event and the
 * effects a transport runs, in order. It starts no call, timer or abort, so a transport passes in what it observed as
 * `facts` and feeds every result back as an event.
 */
export const next = (state: AsyncMachine, event: AsyncEvent): AsyncStep => {
    const d = thaw(state, event);
    apply(d, event);
    return { state: d.m, effects: d.fx };
};
