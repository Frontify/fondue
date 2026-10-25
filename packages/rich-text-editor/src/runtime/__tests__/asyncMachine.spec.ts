/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type AsyncOperation, type AsyncRequest } from '../async';
import {
    initial,
    next,
    type AsyncEffect,
    type AsyncEvent,
    type AsyncEventInput,
    type AsyncFacts,
    type AsyncMachine,
} from '../asyncMachine';
import { type SelectionHandle } from '../types';

import { EXPECTED } from './asyncMachine.table';

const SESSION = { documentId: 'doc', sessionId: 'session', generation: 1 };
const FACTS: AsyncFacts = { disposed: false, faulted: false, holding: false, session: SESSION, aborting: false };
const HANDLE = { id: 'handle' } as unknown as SelectionHandle;

const requestOf = (key: string, extra: Partial<AsyncRequest> = {}): AsyncRequest => ({
    key,
    service: 'search',
    featureId: 'feature',
    action: 'create',
    command: 'command',
    run: () => Promise.resolve(undefined),
    ...extra,
});
const operationOf = (id: string, extra: Partial<AsyncOperation> = {}): AsyncOperation => ({
    id,
    session: SESSION,
    target: HANDLE,
    policyRevision: 1,
    controller: new AbortController(),
    key: 'k',
    request: 1,
    service: 'search',
    featureId: 'feature',
    action: 'create',
    command: 'command',
    ...extra,
});

const POOL = { name: 'p', limit: 1 };
const A = operationOf('a');
const B = operationOf('b');
const N = operationOf('n', { key: 'other' });
const LONE = operationOf('lone', { target: null, deliver: () => undefined });
const UNREADY = operationOf('unready', { target: null });
const STRANGER = operationOf('stranger');
const OTHER_SESSION = operationOf('foreign', { session: { ...SESSION, generation: 0 } });
const REQUEST_A = requestOf('k');
const REQUEST_B = requestOf('k', { pool: POOL });

const copyOf = (partial: Partial<Record<keyof AsyncMachine, unknown>>): AsyncMachine => ({
    ...initial(),
    ...(partial as Partial<AsyncMachine>),
});

/** One machine per state, each as the transport would leave it. */
const IN: Record<string, AsyncMachine> = {
    empty: initial(),
    running: copyOf({ operations: new Map([['a', A]]), requests: new Map([['k', 1]]) }),
    owned: copyOf({
        operations: new Map([['a', A]]),
        requests: new Map([['k', 1]]),
        captured: new Set([A]),
    }),
    pooled: copyOf({
        operations: new Map([
            ['a', A],
            ['b', B],
        ]),
        requests: new Map([['k', 2]]),
        running: new Map([['p', new Set([A])]]),
        waiting: new Map([['p', [{ operation: B, request: REQUEST_B }]]]),
        pools: new Map([
            [A, POOL],
            [B, POOL],
        ]),
    }),
    room: copyOf({
        operations: new Map([['b', B]]),
        requests: new Map([['k', 2]]),
        running: new Map([['p', new Set()]]),
        waiting: new Map([['p', [{ operation: B, request: REQUEST_B }]]]),
        pools: new Map([[B, POOL]]),
    }),
    held: copyOf({
        operations: new Map([['a', A]]),
        requests: new Map([['k', 1]]),
        held: [{ operation: A, result: 'late' }],
    }),
};

const reply = () => undefined;

/** Every event type, with the facts it is fed under. */
const EVENTS: Record<string, { readonly event: AsyncEventInput; readonly facts?: Partial<AsyncFacts> }> = {
    'start with a target': { event: { type: 'start', request: requestOf('k', { target: HANDLE }), reply } },
    'start to capture': { event: { type: 'start', request: REQUEST_A, reply } },
    'start to deliver': { event: { type: 'start', request: requestOf('k', { deliver: () => undefined }), reply } },
    'start disposed': {
        event: { type: 'start', request: requestOf('k', { target: HANDLE }), reply },
        facts: { disposed: true },
    },
    'built ready': { event: { type: 'built', operation: N, request: REQUEST_A, owned: false } },
    'built delivering': { event: { type: 'built', operation: LONE, request: REQUEST_A, owned: false } },
    'built not ready': { event: { type: 'built', operation: UNREADY, request: REQUEST_A, owned: false } },
    'built disposed': {
        event: { type: 'built', operation: N, request: REQUEST_A, owned: false },
        facts: { disposed: true },
    },
    admit: { event: { type: 'admit', operation: N, request: REQUEST_A, owned: false } },
    'admit owned': { event: { type: 'admit', operation: N, request: REQUEST_A, owned: true } },
    'admit pooled': {
        event: { type: 'admit', operation: N, request: requestOf('other', { pool: POOL }), owned: false },
    },
    'abortWhere key': { event: { type: 'abortWhere', aborts: (operation) => operation.key === 'k' } },
    'abortWhere none': { event: { type: 'abortWhere', aborts: () => false } },
    dispose: { event: { type: 'dispose' } },
    resume: { event: { type: 'resume' } },
    pump: { event: { type: 'pump', name: 'p' } },
    'pump aborting': { event: { type: 'pump', name: 'p' }, facts: { aborting: true } },
    'pump disposed': { event: { type: 'pump', name: 'p' }, facts: { disposed: true } },
    arrive: { event: { type: 'arrive', operation: A, result: 'ok' } },
    'arrive disposed': { event: { type: 'arrive', operation: A, result: 'ok' }, facts: { disposed: true } },
    'arrive from another generation': { event: { type: 'arrive', operation: OTHER_SESSION, result: 'ok' } },
    'arrive faulted': { event: { type: 'arrive', operation: A, result: 'ok' }, facts: { faulted: true } },
    'arrive holding': { event: { type: 'arrive', operation: A, result: 'ok' }, facts: { holding: true } },
    'arrive unregistered': { event: { type: 'arrive', operation: STRANGER, result: 'ok' } },
    delivered: { event: { type: 'delivered', operation: A, code: undefined } },
    'delivered with a code': { event: { type: 'delivered', operation: A, code: 'invalid-payload' } },
    rejected: { event: { type: 'rejected', operation: A, request: REQUEST_A, error: 'boom', aborted: false } },
    'rejected after abort': {
        event: { type: 'rejected', operation: A, request: REQUEST_A, error: 'boom', aborted: true },
    },
    'rejected unregistered': {
        event: { type: 'rejected', operation: STRANGER, request: REQUEST_A, error: 'boom', aborted: false },
    },
    settle: { event: { type: 'settle' } },
};

const effectLabel = (effect: AsyncEffect) => {
    if (effect.type === 'discard') {
        return `discard:${effect.reason}`;
    }
    if (effect.type === 'pump') {
        return `pump:${effect.name}`;
    }
    if (effect.type === 'build') {
        return `build:${effect.capture ? 'capture' : String(effect.target !== null)}#${effect.sequence}`;
    }
    if (effect.type === 'release') {
        return 'release';
    }
    if ('operation' in effect) {
        return `${effect.type}:${effect.operation.id}`;
    }
    return effect.type;
};

const names = (map: ReadonlyMap<string, unknown>) => [...map.keys()].join(',');
const summary = (state: AsyncMachine) =>
    [
        `ops=${names(state.operations)}`,
        `requests=${[...state.requests].map(([key, sequence]) => `${key}${sequence}`).join(',')}`,
        `held=${state.held.map((entry) => entry.operation.id).join(',')}`,
        `owned=${[...state.captured].map((operation) => operation.id).join(',')}`,
        `running=${[...state.running].map(([name, busy]) => `${name}:${[...busy].map((o) => o.id).join('+')}`).join(',')}`,
        `waiting=${[...state.waiting].map(([name, queued]) => `${name}:${queued.map((e) => e.operation.id).join('+')}`).join(',')}`,
        `pools=${[...state.pools.keys()].map((operation) => operation.id).join(',')}`,
    ].join(' ');

const run = (machine: AsyncMachine, name: string) => {
    const { event, facts } = EVENTS[name] ?? { event: { type: 'settle' } as const };
    return next(machine, { ...event, facts: { ...FACTS, ...facts } } as AsyncEvent);
};

describe('async machine', () => {
    describe.each(Object.keys(IN))('from the %s state', (state) => {
        it.each(Object.keys(EVENTS))('on %s', (name) => {
            const machine = IN[state] as AsyncMachine;
            const before = summary(machine);
            const step = run(machine, name);
            const effects = step.effects.map(effectLabel).join(' ');
            expect(`${effects} | ${summary(step.state)}`).toBe(EXPECTED[state]?.[name]);
            expect(summary(machine)).toBe(before);
        });
    });

    it('covers every state against every event', () => {
        expect(Object.keys(EXPECTED)).toEqual(Object.keys(IN));
        for (const state of Object.keys(IN)) {
            expect(Object.keys(EXPECTED[state] ?? {})).toEqual(Object.keys(EVENTS));
        }
    });

    it('has a case for every event type', () => {
        const types = new Set(Object.values(EVENTS).map(({ event }) => event.type));
        expect([...types].sort()).toEqual(
            [
                'abortWhere',
                'admit',
                'arrive',
                'built',
                'delivered',
                'dispose',
                'pump',
                'rejected',
                'resume',
                'settle',
                'start',
            ].sort(),
        );
    });
});
