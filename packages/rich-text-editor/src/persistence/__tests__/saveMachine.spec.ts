/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type RichTextDocument } from '#/model';
import { diagnostic } from '#/model/internal';
import {
    gate,
    initial,
    next,
    outcomeUnknown,
    refusal,
    statusOf,
    unsavedOf,
    type Effect,
    type EventInput,
    type Facts,
    type SaveEvent,
    type SaveMachine,
    type SaveState,
    type Step,
} from '#/persistence/saveMachine';
import { type SaveRequest, type SaveResponse } from '#/persistence/types';
import { type DocumentStamp } from '#/runtime/types';

const SESSION = { documentId: 'doc', sessionId: 'session', generation: 1 };
const stampAt = (sequence: number): DocumentStamp => ({ ...SESSION, sequence });
const DOCUMENT: RichTextDocument = {
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: { id: 'model', version: 1 },
    requiredCapabilities: [],
    content: { type: 'doc', content: [] },
};
const requestAt = (sequence: number): SaveRequest => ({
    operationId: `op-${sequence}`,
    stamp: stampAt(sequence),
    baseRevision: 'r1',
    document: DOCUMENT,
    writer: { build: '1.0.0', formatVersion: 1, model: DOCUMENT.model, capabilities: [] },
});
const REQUEST = requestAt(1);
const ACK = { operationId: 'op-1', stamp: stampAt(1), revision: 'r2' };
const SAVED: SaveResponse = { status: 'saved', acknowledgment: ACK };
const FACTS: Facts = {
    now: 1000,
    online: true,
    phase: 'ready',
    composing: false,
    sequence: 1,
    session: SESSION,
    options: undefined,
};

const BASE = initial({ revision: 'r1', unsavedOnMount: false, carried: undefined }, SESSION);

/** One machine per state, each as the transport would leave it with one change at sequence 1 waiting. */
const MACHINE_BY_STATE: Record<SaveState, SaveMachine> = {
    clean: { ...BASE, acknowledged: 1, latest: 1, accepted: ACK },
    dirty: { ...BASE, state: 'dirty', latest: 1 },
    saving: {
        ...BASE,
        state: 'saving',
        latest: 1,
        flight: { request: REQUEST, started: 900, serial: 1 },
        unresolved: REQUEST,
        writes: 1,
    },
    uncertain: { ...BASE, state: 'uncertain', latest: 1, unresolved: REQUEST, retrying: true, writes: 1 },
    offline: { ...BASE, state: 'offline', latest: 1 },
    conflict: { ...BASE, state: 'conflict', latest: 1 },
    error: { ...BASE, state: 'error', latest: 1, rejection: 'invalid' },
};
const STATES = Object.keys(MACHINE_BY_STATE) as SaveState[];

const step = (machine: SaveMachine, event: EventInput, facts: Partial<Facts> = {}): Step =>
    next(machine, { ...event, facts: { ...FACTS, ...facts } } as SaveEvent);
const types = (result: Step) => result.effects.map((effect) => effect.type);
const effectOf = <EffectType extends Effect['type']>(result: Step, type: EffectType) =>
    result.effects.find((effect): effect is Extract<Effect, { type: EffectType }> => effect.type === type);

type Outcome = readonly [SaveState, readonly Effect['type'][]];
type Row = {
    event: EventInput;
    setup?: Partial<SaveMachine>;
    facts?: Partial<Facts>;
    outcomes: Record<SaveState, Outcome>;
};

/** Every state stays as it is and the event gives the same effects. */
const unchanged = (effects: readonly Effect['type'][]): Record<SaveState, Outcome> => ({
    clean: ['clean', effects],
    dirty: ['dirty', effects],
    saving: ['saving', effects],
    uncertain: ['uncertain', effects],
    offline: ['offline', effects],
    conflict: ['conflict', effects],
    error: ['error', effects],
});
/** Every state moves to `state` and the event gives the same effects. */
const moves = (state: SaveState, effects: readonly Effect['type'][]): Record<SaveState, Outcome> => ({
    clean: [state, effects],
    dirty: [state, effects],
    saving: [state, effects],
    uncertain: [state, effects],
    offline: [state, effects],
    conflict: [state, effects],
    error: [state, effects],
});

const WRITE: readonly Effect['type'][] = ['open', 'publish', 'save'];
const DEBOUNCE: readonly Effect['type'][] = ['clear', 'arm', 'arm', 'refresh'];
const replays = (): Record<SaveState, Outcome> => ({
    ...unchanged([]),
    saving: ['saving', WRITE],
    uncertain: ['saving', WRITE],
});

/** The transition table, row by row: the next state and the effect types of each event in each state. */
const TABLE: Record<SaveEvent['type'], Row> = {
    mounted: { event: { type: 'mounted' }, outcomes: unchanged([]) },
    changed: {
        event: { type: 'changed' },
        facts: { sequence: 2 },
        outcomes: {
            ...unchanged(DEBOUNCE),
            clean: ['dirty', DEBOUNCE],
            conflict: ['conflict', ['refresh']],
            error: ['error', ['refresh']],
        },
    },
    flush: {
        event: { type: 'flush' },
        outcomes: {
            ...unchanged(['clear']),
            dirty: ['dirty', ['clear', 'prepare']],
            offline: ['offline', ['clear', 'prepare']],
        },
    },
    send: {
        event: { type: 'send' },
        setup: { due: true },
        outcomes: { ...unchanged([]), dirty: ['dirty', ['prepare']], offline: ['offline', ['prepare']] },
    },
    retryDue: { event: { type: 'retryDue' }, outcomes: replays() },
    ready: { event: { type: 'ready' }, outcomes: replays() },
    online: {
        event: { type: 'online' },
        outcomes: { ...unchanged([]), offline: ['dirty', ['publish', 'send']] },
    },
    serviceChanged: {
        event: { type: 'serviceChanged' },
        outcomes: { ...unchanged([]), saving: ['saving', ['clear', 'abort', ...WRITE]] },
    },
    dispose: {
        event: { type: 'dispose' },
        outcomes: {
            ...unchanged(['end', 'clear', 'captureWaiting']),
            saving: ['saving', ['end', 'clear', 'clear', 'abort', 'refresh', 'captureWaiting']],
        },
    },
    failed: {
        event: { type: 'failed', serial: 1, code: 'transport' },
        outcomes: {
            ...unchanged([]),
            saving: ['uncertain', ['clear', 'abort', 'publish', 'measure', 'backoff']],
        },
    },
    answered: {
        event: { type: 'answered', serial: 1, response: SAVED },
        outcomes: { ...unchanged([]), saving: ['clean', ['clear', 'publish', 'measure', 'send']] },
    },
    prepared: { event: { type: 'prepared', request: requestAt(2) }, outcomes: moves('saving', WRITE) },
    pin: {
        event: { type: 'pin', call: 1 },
        outcomes: { ...unchanged(['snapshot']), conflict: ['conflict', ['answer']] },
    },
    pinned: {
        event: { type: 'pinned', call: 1, stamp: stampAt(2), document: DOCUMENT },
        facts: { sequence: 2 },
        outcomes: {
            ...unchanged(['prepare']),
            saving: ['saving', []],
            uncertain: ['uncertain', []],
            conflict: ['conflict', []],
        },
    },
    callTimedOut: { event: { type: 'callTimedOut', call: 1 }, outcomes: unchanged(['answer']) },
    replaced: {
        event: { type: 'replaced', revision: 'r2', previous: stampAt(1) },
        outcomes: moves('clean', ['clear', 'answerWaiting', 'refresh']),
    },
};

const CELLS = Object.entries(TABLE).flatMap(([name, row]) =>
    STATES.map((state) => [name, state, row.outcomes[state]] as const),
);

describe('the save machine transition table', () => {
    it('has a row for every event and a cell for every state', () => {
        expect(CELLS).toHaveLength(16 * 7);
    });

    it.each(CELLS)(
        '%s while %s moves as the table says and leaves its input untouched',
        (name, state, [after, effects]) => {
            const row = TABLE[name as SaveEvent['type']];
            const before = Object.freeze({ ...MACHINE_BY_STATE[state], ...row.setup, pinned: Object.freeze([]) });
            const result = step(before, row.event, row.facts);

            expect(result.state.state).toBe(after);
            expect(types(result)).toEqual(effects);
            expect(result.state).not.toBe(before);
            expect(before.state).toBe(state);
            expect(before.pinned).toEqual([]);
        },
    );
});

describe('the machine at load', () => {
    it('starts clean at the loaded revision, with that record acknowledged', () => {
        expect(BASE).toMatchObject({ state: 'clean', acknowledged: 0, revision: 'r1', unresolved: undefined });
        expect(BASE.accepted).toEqual({ operationId: null, stamp: stampAt(0), revision: 'r1' });
    });

    it('starts below the first sequence for a new record', () => {
        const created = initial({ revision: null, unsavedOnMount: false, carried: undefined }, SESSION);
        expect(created).toMatchObject({ acknowledged: -1, revision: null, accepted: undefined });
    });

    it('starts dirty and arms the debounce when the session mounts with unsaved changes', () => {
        const dirty = initial({ revision: 'r1', unsavedOnMount: true, carried: REQUEST }, SESSION);
        expect(dirty).toMatchObject({ state: 'dirty', unresolved: REQUEST, carried: REQUEST, accepted: undefined });
        const result = step(dirty, { type: 'mounted' });
        expect(result.effects).toEqual([
            { type: 'clear', timers: ['delay'] },
            { type: 'arm', timer: 'delay', milliseconds: 500 },
            { type: 'arm', timer: 'longest', milliseconds: 5000 },
        ]);
        expect(result.state.longest).toBe(true);
    });
});

describe('changed', () => {
    it('records the sequence, arms the delay, and arms the longest wait once', () => {
        const first = step(MACHINE_BY_STATE.clean, { type: 'changed' }, { sequence: 2 });
        expect(first.state).toMatchObject({ state: 'dirty', latest: 2, longest: true });
        expect(first.effects).toEqual([
            { type: 'clear', timers: ['delay'] },
            { type: 'arm', timer: 'delay', milliseconds: 500 },
            { type: 'arm', timer: 'longest', milliseconds: 5000 },
            { type: 'refresh' },
        ]);
        const second = step(first.state, { type: 'changed' }, { sequence: 3 });
        expect(second.effects).toEqual([
            { type: 'clear', timers: ['delay'] },
            { type: 'arm', timer: 'delay', milliseconds: 500 },
            { type: 'refresh' },
        ]);
    });

    it('takes the delays from the host options', () => {
        const options = { delayMs: 10, maxWaitMs: 20 };
        const result = step(MACHINE_BY_STATE.clean, { type: 'changed' }, { sequence: 2, options });
        expect(result.effects).toContainEqual({ type: 'arm', timer: 'delay', milliseconds: 10 });
        expect(result.effects).toContainEqual({ type: 'arm', timer: 'longest', milliseconds: 20 });
    });

    it('arms nothing with autosave off', () => {
        const result = step(MACHINE_BY_STATE.clean, { type: 'changed' }, { sequence: 2, options: { autosave: 'off' } });
        expect(result.state.state).toBe('dirty');
        expect(types(result)).toEqual(['refresh']);
    });

    it('does nothing once ended', () => {
        const ended = step(MACHINE_BY_STATE.dirty, { type: 'dispose' }).state;
        const result = step(ended, { type: 'changed' }, { sequence: 2 });
        expect(result.state).toEqual(ended);
        expect(result.effects).toEqual([]);
    });
});

describe('flush and send', () => {
    it('writes the latest snapshot once, then waits for the answer', () => {
        const flushed = step(MACHINE_BY_STATE.dirty, { type: 'flush' });
        expect(flushed.state).toMatchObject({ due: false, longest: false });
        expect(flushed.effects).toEqual([
            { type: 'clear', timers: ['delay', 'longest'] },
            { type: 'prepare', source: undefined },
        ]);
        const prepared = step(flushed.state, { type: 'prepared', request: REQUEST });
        expect(prepared.state).toMatchObject({ state: 'saving', unresolved: REQUEST, replays: 0, writes: 1 });
        expect(prepared.state.flight).toEqual({ request: REQUEST, started: 1000, serial: 1 });
        expect(prepared.effects).toEqual([
            { type: 'open', serial: 1, timeoutMs: 30_000 },
            { type: 'publish' },
            { type: 'save', request: REQUEST, serial: 1 },
        ]);
    });

    it.each([
        ['composition is open', { composing: true }],
        ['the session is not ready', { phase: 'transitioning' as const }],
    ])('holds a due write while %s', (_name, facts) => {
        const result = step(MACHINE_BY_STATE.dirty, { type: 'send' }, facts);
        expect(result.effects).toEqual([]);
        const due = step({ ...MACHINE_BY_STATE.dirty, due: true }, { type: 'send' }, facts);
        expect(due.state.due).toBe(true);
        expect(due.effects).toEqual([]);
    });

    it('parks the session offline instead of writing while the browser has no network', () => {
        const result = step({ ...MACHINE_BY_STATE.dirty, due: true }, { type: 'send' }, { online: false });
        expect(result.state).toMatchObject({ state: 'offline', due: true });
        expect(types(result)).toEqual(['publish']);
    });

    it('drops a due write when nothing is unsaved', () => {
        const result = step({ ...MACHINE_BY_STATE.clean, due: true }, { type: 'send' });
        expect(result.state.due).toBe(false);
        expect(result.effects).toEqual([]);
    });

    it('sends the oldest pinned checkpoint as it was pinned, ahead of a due autosave', () => {
        const pin = { stamp: stampAt(3), document: DOCUMENT, calls: [7] };
        const result = step({ ...MACHINE_BY_STATE.dirty, due: true, pinned: [pin] }, { type: 'send' });
        expect(result.effects).toEqual([{ type: 'prepare', source: { stamp: stampAt(3), document: DOCUMENT } }]);
        expect(result.state.due).toBe(true);
    });

    it('writes a pinned checkpoint of a faulted session, and nothing else', () => {
        const pin = { stamp: stampAt(3), document: DOCUMENT, calls: [7] };
        expect(
            types(step({ ...MACHINE_BY_STATE.dirty, pinned: [pin] }, { type: 'send' }, { phase: 'faulted' })),
        ).toEqual(['prepare']);
        expect(types(step({ ...MACHINE_BY_STATE.dirty, due: true }, { type: 'send' }, { phase: 'faulted' }))).toEqual(
            [],
        );
    });
});

describe('replays', () => {
    it('counts the replay and writes the same request again', () => {
        const result = step({ ...MACHINE_BY_STATE.uncertain, replays: 2 }, { type: 'retryDue' });
        expect(result.state).toMatchObject({ state: 'saving', replays: 3, retrying: false, writes: 2 });
        expect(effectOf(result, 'save')).toEqual({ type: 'save', request: REQUEST, serial: 2 });
    });

    it('waits for the network while offline, without counting', () => {
        const result = step(MACHINE_BY_STATE.uncertain, { type: 'retryDue' }, { online: false });
        expect(result.state).toMatchObject({ state: 'offline', replays: 0, retrying: false });
        expect(types(result)).toEqual(['publish']);
    });

    it('does nothing while the session cannot write', () => {
        const result = step(MACHINE_BY_STATE.uncertain, { type: 'retryDue' }, { phase: 'mounting' });
        expect(result.state.retrying).toBe(false);
        expect(result.effects).toEqual([]);
    });

    it('marks the session shown on ready, and replays what a failed session left', () => {
        const result = step({ ...MACHINE_BY_STATE.clean, unresolved: REQUEST }, { type: 'ready' });
        expect(result.state).toMatchObject({ shown: true, state: 'saving' });
        expect(types(result)).toEqual(WRITE);
    });

    it('sends a flush that landed before the session was ready', () => {
        const started = initial({ revision: 'r1', unsavedOnMount: true, carried: undefined }, SESSION);
        const mounted = step(started, { type: 'mounted' }, { phase: 'mounting' });
        const flushed = step(mounted.state, { type: 'flush' }, { phase: 'mounting' });
        const ready = step(flushed.state, { type: 'ready' }, { phase: 'ready' });
        const flushedWhenReady = step(mounted.state, { type: 'flush' }, { phase: 'ready' });

        expect(types(ready)).toEqual(types(flushedWhenReady).filter((type) => type !== 'clear'));
        expect(ready.state.due).toBe(false);
    });

    it('resumes from the network: replays an unresolved write, else sends on', () => {
        const offline = { ...MACHINE_BY_STATE.offline, unresolved: REQUEST };
        const result = step(offline, { type: 'online' });
        expect(result.state).toMatchObject({ state: 'saving', replays: 0 });
        expect(types(result)).toEqual(WRITE);
        expect(types(step(offline, { type: 'online' }, { phase: 'mounting' }))).toEqual([]);
    });

    it('sends the same operation to the new service, and parks it when the session cannot write', () => {
        const result = step(MACHINE_BY_STATE.saving, { type: 'serviceChanged' });
        expect(result.state.flight).toEqual({ request: REQUEST, started: 1000, serial: 2 });
        const parked = step(MACHINE_BY_STATE.saving, { type: 'serviceChanged' }, { phase: 'mounting' });
        expect(parked.state).toMatchObject({ state: 'uncertain', flight: undefined });
        expect(types(parked)).toEqual(['clear', 'abort', 'publish']);
    });
});

describe('failed', () => {
    it('backs off twice as long for each replay', () => {
        const result = step({ ...MACHINE_BY_STATE.saving, replays: 2 }, { type: 'failed', serial: 1, code: 'timeout' });
        expect(effectOf(result, 'backoff')).toEqual({ type: 'backoff', milliseconds: 4000 });
        expect(result.state).toMatchObject({ state: 'uncertain', retrying: true, flight: undefined });
        expect(effectOf(result, 'measure')).toEqual({ type: 'measure', started: 900, code: 'timeout' });
    });

    it('ends in error with a diagnostic once the retries are spent', () => {
        const result = step(
            { ...MACHINE_BY_STATE.saving, replays: 5 },
            { type: 'failed', serial: 1, code: 'transport' },
        );
        expect(result.state).toMatchObject({ state: 'error', rejection: null });
        expect(result.state.problem).toMatchObject({ code: 'persistence.retries-exhausted', details: { retries: 5 } });
        expect(types(result)).toEqual(['clear', 'abort', 'publish', 'report', 'measure']);
    });

    it('answers a commit pinned after the retries were spent when its write fails', () => {
        const exhausted = step(
            { ...MACHINE_BY_STATE.saving, replays: 1 },
            { type: 'failed', serial: 1, code: 'transport' },
            { options: { maxRetries: 1 } },
        );
        const replayed = step(exhausted.state, {
            type: 'pinned',
            call: 7,
            stamp: stampAt(2),
            document: DOCUMENT,
        });
        const result = step(
            replayed.state,
            { type: 'failed', serial: 2, code: 'transport' },
            { options: { maxRetries: 1 } },
        );

        expect(effectOf(result, 'answer')).toEqual({
            type: 'answer',
            calls: [7],
            result: { status: 'failed', code: 'transport', outcome: 'not-sent' },
        });
        expect(result.state.pinned).toEqual([{ stamp: stampAt(2), document: DOCUMENT, calls: [] }]);
    });

    it('takes the retry limit from the host options', () => {
        const result = step(
            { ...MACHINE_BY_STATE.saving, replays: 1 },
            { type: 'failed', serial: 1, code: 'transport' },
            { options: { maxRetries: 1 } },
        );
        expect(result.state.state).toBe('error');
    });

    it('parks the session offline, keeping the write for the online event', () => {
        const result = step(
            MACHINE_BY_STATE.saving,
            { type: 'failed', serial: 1, code: 'transport' },
            { online: false },
        );
        expect(result.state).toMatchObject({ state: 'offline', unresolved: REQUEST, retrying: false });
        expect(types(result)).toEqual(['clear', 'abort', 'publish', 'measure']);
    });

    it('answers the pinned call of the failed write with an unknown outcome, and keeps the pin', () => {
        const pin = { stamp: stampAt(1), document: DOCUMENT, calls: [4] };
        const result = step(
            { ...MACHINE_BY_STATE.saving, pinned: [pin] },
            { type: 'failed', serial: 1, code: 'timeout' },
        );
        expect(result.effects[2]).toEqual({
            type: 'answer',
            calls: [4],
            result: { status: 'failed', code: 'timeout', outcome: 'unknown' },
        });
        expect(result.state.pinned).toEqual([{ ...pin, calls: [] }]);
    });

    it('ignores the failure of a write that is no longer in flight', () => {
        const result = step(MACHINE_BY_STATE.saving, { type: 'failed', serial: 9, code: 'transport' });
        expect(result.state).toEqual(MACHINE_BY_STATE.saving);
        expect(result.effects).toEqual([]);
    });
});

describe('answered', () => {
    it('leaves a newer change dirty, with the next write based on the acknowledged revision', () => {
        const result = step(MACHINE_BY_STATE.saving, { type: 'answered', serial: 1, response: SAVED }, { sequence: 2 });
        expect(result.state).toMatchObject({ state: 'dirty', revision: 'r2', acknowledged: 1, unresolved: undefined });
        expect(result.state.accepted).toEqual(ACK);
    });

    it('acknowledges the pinned call and records that the commit was answered', () => {
        const pin = { stamp: stampAt(1), document: DOCUMENT, calls: [4, 5] };
        const result = step(
            { ...MACHINE_BY_STATE.saving, pinned: [pin] },
            { type: 'answered', serial: 1, response: SAVED },
        );
        expect(result.state).toMatchObject({ committed: true, pinned: [] });
        expect(effectOf(result, 'answer')).toEqual({
            type: 'answer',
            calls: [4, 5],
            result: { status: 'acknowledged', acknowledgment: ACK },
        });
    });

    it('keeps what the session mounted with unsaved when a failed session left the write', () => {
        const mounted = { ...MACHINE_BY_STATE.saving, carried: REQUEST, unsavedOnMount: true, acknowledged: 0 };
        const result = step(mounted, { type: 'answered', serial: 1, response: SAVED }, { sequence: 0 });
        expect(result.state).toMatchObject({ acknowledged: 0, unsavedOnMount: true, state: 'dirty' });
        expect(result.state.accepted).toBe(BASE.accepted);
    });

    it('leaves the write in flight when the acknowledgment is for another operation', () => {
        const other = { status: 'saved', acknowledgment: { ...ACK, operationId: 'other' } } as const;
        const result = step(MACHINE_BY_STATE.saving, { type: 'answered', serial: 1, response: other });
        expect(result.state).toEqual(MACHINE_BY_STATE.saving);
        expect(result.effects).toMatchObject([{ type: 'report', diagnostic: { code: 'persistence.ack-mismatch' } }]);
    });

    it('pauses on a conflict, answers every pinned call, and reads the server copy last', () => {
        const pins = [
            { stamp: stampAt(1), document: DOCUMENT, calls: [4] },
            { stamp: stampAt(2), document: DOCUMENT, calls: [5] },
        ];
        const response = { status: 'conflict', currentRevision: 'r9' } as const;
        const result = step(
            { ...MACHINE_BY_STATE.saving, pinned: pins, due: true },
            { type: 'answered', serial: 1, response },
        );
        expect(result.state).toMatchObject({ state: 'conflict', pinned: [], due: false, unresolved: undefined });
        expect(result.state.problem).toMatchObject({
            code: 'persistence.conflict',
            details: { currentRevision: 'r9' },
        });
        expect(types(result)).toEqual([
            'clear',
            'clear',
            'answer',
            'answer',
            'publish',
            'report',
            'measure',
            'readRemote',
        ]);
    });

    it.each([
        ['forbidden', { status: 'blocked', code: 'forbidden' }],
        ['invalid', { status: 'failed', code: 'invalid', outcome: 'rejected' }],
        ['incompatible-writer', { status: 'failed', code: 'incompatible-writer', outcome: 'rejected' }],
    ] as const)('pauses in error on a %s rejection and answers the pinned call', (code, expected) => {
        const pin = { stamp: stampAt(1), document: DOCUMENT, calls: [4] };
        const diagnostics = [diagnostic('persistence.conflict', undefined, undefined, 'error')];
        const response: SaveResponse = { status: 'rejected', code, diagnostics };
        const result = step({ ...MACHINE_BY_STATE.saving, pinned: [pin] }, { type: 'answered', serial: 1, response });
        expect(result.state).toMatchObject({ state: 'error', rejection: code, problem: diagnostics[0], pinned: [] });
        expect(effectOf(result, 'answer')).toEqual({ type: 'answer', calls: [4], result: expected });
        expect(types(result).slice(-3)).toEqual(['report', 'measure', 'send']);
    });

    it('ignores the answer of a write that is no longer in flight', () => {
        const result = step(MACHINE_BY_STATE.saving, { type: 'answered', serial: 2, response: SAVED });
        expect(result.state).toEqual(MACHINE_BY_STATE.saving);
        expect(result.effects).toEqual([]);
    });
});

describe('commit calls', () => {
    it('refuses a pin once ended or in conflict, and asks for the snapshot otherwise', () => {
        const ended = step(MACHINE_BY_STATE.dirty, { type: 'dispose' }).state;
        expect(step(ended, { type: 'pin', call: 1 }).effects).toEqual([
            { type: 'answer', calls: [1], result: { status: 'failed', code: 'disposed', outcome: 'unknown' } },
        ]);
        expect(step(MACHINE_BY_STATE.conflict, { type: 'pin', call: 1 }).effects).toEqual([
            { type: 'answer', calls: [1], result: { status: 'blocked', code: 'conflict' } },
        ]);
        expect(step(MACHINE_BY_STATE.dirty, { type: 'pin', call: 1 }).effects).toEqual([{ type: 'snapshot', call: 1 }]);
    });

    it('answers at once with the acknowledgment that already covers the stamp', () => {
        const result = step(MACHINE_BY_STATE.clean, { type: 'pinned', call: 1, stamp: stampAt(1), document: DOCUMENT });
        expect(result.state.pinned).toEqual([]);
        expect(result.effects).toEqual([
            { type: 'answer', calls: [1], result: { status: 'acknowledged', acknowledgment: ACK } },
        ]);
    });

    it('lets calls on the same stamp share one pin, and starts another pin for a later stamp', () => {
        const event = { type: 'pinned', call: 1, stamp: stampAt(2), document: DOCUMENT } as const;
        const first = step(MACHINE_BY_STATE.saving, event, { sequence: 2 });
        const second = step(first.state, { ...event, call: 2 }, { sequence: 2 });
        expect(second.state.pinned).toEqual([{ stamp: stampAt(2), document: DOCUMENT, calls: [1, 2] }]);
        const third = step(second.state, { ...event, call: 3, stamp: stampAt(3) }, { sequence: 3 });
        expect(third.state.pinned.map(({ calls }) => calls)).toEqual([[1, 2], [3]]);
    });

    it('replays the write a fault left before it sends the pin', () => {
        const result = step(
            { ...MACHINE_BY_STATE.dirty, unresolved: REQUEST },
            { type: 'pinned', call: 1, stamp: stampAt(2), document: DOCUMENT },
            { sequence: 2 },
        );
        expect(result.state).toMatchObject({ state: 'saving', replays: 1 });
        expect(types(result)).toEqual(WRITE);
    });

    it('answers a call at once while offline, with an outcome that says whether the write may have landed', () => {
        const event = { type: 'pinned', call: 1, stamp: stampAt(1), document: DOCUMENT } as const;
        const unsent = step(MACHINE_BY_STATE.dirty, event, { online: false, sequence: 1 });
        expect(unsent.state).toMatchObject({ state: 'offline', pinned: [{ calls: [] }] });
        expect(types(unsent)).toEqual(['publish', 'answer']);
        expect(effectOf(unsent, 'answer')?.result).toEqual({
            status: 'failed',
            code: 'transport',
            outcome: 'not-sent',
        });
        const sent = step({ ...MACHINE_BY_STATE.uncertain, retrying: true }, event, { online: false, sequence: 1 });
        expect(effectOf(sent, 'answer')?.result).toEqual({ status: 'failed', code: 'transport', outcome: 'unknown' });
    });

    it('times a call out with unknown when a write carried its snapshot, and takes it off its pin', () => {
        const pin = { stamp: stampAt(1), document: DOCUMENT, calls: [4, 5] };
        const result = step({ ...MACHINE_BY_STATE.saving, pinned: [pin] }, { type: 'callTimedOut', call: 4 });
        expect(result.state.pinned).toEqual([{ ...pin, calls: [5] }]);
        expect(result.effects).toEqual([
            { type: 'answer', calls: [4], result: { status: 'failed', code: 'timeout', outcome: 'unknown' } },
        ]);
    });

    it('times a call out with not-sent when no write carried its snapshot', () => {
        const pin = { stamp: stampAt(2), document: DOCUMENT, calls: [4] };
        const result = step({ ...MACHINE_BY_STATE.saving, pinned: [pin] }, { type: 'callTimedOut', call: 4 });
        expect(effectOf(result, 'answer')?.result).toEqual({ status: 'failed', code: 'timeout', outcome: 'not-sent' });
        expect(result.state.pinned).toEqual([{ ...pin, calls: [] }]);
    });
});

describe('replaced and dispose', () => {
    it('drops the write and pins of the old document and starts again from the loaded record', () => {
        const pin = { stamp: stampAt(2), document: DOCUMENT, calls: [4] };
        const old = {
            ...MACHINE_BY_STATE.error,
            pinned: [pin],
            unresolved: REQUEST,
            replays: 3,
            problem: null,
            latest: 5,
        };
        const result = step(
            old,
            { type: 'replaced', revision: 'r5', previous: stampAt(1) },
            { session: { ...SESSION, generation: 2 } },
        );
        expect(result.state).toMatchObject({
            state: 'clean',
            latest: 0,
            acknowledged: 0,
            revision: 'r5',
            unresolved: undefined,
            replays: 0,
            pinned: [],
            committed: false,
        });
        expect(result.state.accepted).toEqual({
            operationId: null,
            stamp: { ...SESSION, generation: 2, sequence: 0 },
            revision: 'r5',
        });
        expect(result.effects).toEqual([
            { type: 'clear', timers: ['delay', 'longest'] },
            { type: 'answer', calls: [4], result: { status: 'failed', code: 'transport', outcome: 'not-sent' } },
            { type: 'answerWaiting', result: { status: 'failed', code: 'transport', outcome: 'not-sent' } },
            { type: 'refresh' },
        ]);
    });

    it('starts a new record below the first sequence, and a waiting call answers for the old generation', () => {
        const result = step(MACHINE_BY_STATE.clean, { type: 'replaced', revision: null, previous: stampAt(1) });
        expect(result.state).toMatchObject({ acknowledged: -1, revision: null, accepted: undefined });
        expect(effectOf(result, 'answerWaiting')?.result).toEqual({ status: 'acknowledged', acknowledgment: ACK });
    });

    it('ends once: answers every pinned call disposed, and reports a dirty shown session', () => {
        const pin = { stamp: stampAt(2), document: DOCUMENT, calls: [4] };
        const shown = { ...MACHINE_BY_STATE.dirty, shown: true, pinned: [pin] };
        const result = step(shown, { type: 'dispose' });
        expect(result.state).toMatchObject({ ended: true, pinned: [] });
        expect(result.effects).toMatchObject([
            { type: 'end' },
            { type: 'clear', timers: ['delay', 'longest', 'retry'] },
            { type: 'answer', calls: [4], result: { status: 'failed', code: 'disposed', outcome: 'unknown' } },
            { type: 'captureWaiting' },
            { type: 'report', diagnostic: { code: 'persistence.disposed-dirty' } },
        ]);
        expect(step(result.state, { type: 'dispose' }).effects).toEqual([]);
    });

    it('reports nothing for a session that never became ready', () => {
        expect(types(step(MACHINE_BY_STATE.dirty, { type: 'dispose' }))).not.toContain('report');
    });
});

describe('reads of a machine', () => {
    it('builds the status from the machine, with the operation in flight', () => {
        expect(statusOf(MACHINE_BY_STATE.saving)).toEqual({
            state: 'saving',
            latestSequence: 1,
            acknowledgedSequence: 0,
            revision: 'r1',
            inFlightOperationId: 'op-1',
            diagnostic: null,
        });
        expect(statusOf(MACHINE_BY_STATE.dirty).inFlightOperationId).toBeNull();
    });

    it('counts a change as unsaved once its sequence passes the acknowledged one', () => {
        expect(unsavedOf(MACHINE_BY_STATE.clean, 1)).toBe(false);
        expect(unsavedOf(MACHINE_BY_STATE.clean, 2)).toBe(true);
        expect(unsavedOf(BASE, 0)).toBe(false);
        expect(unsavedOf({ ...BASE, unsavedOnMount: true }, 0)).toBe(true);
    });

    it('treats a write as unknown while in flight, or unresolved in uncertain or offline', () => {
        expect(STATES.map((state) => outcomeUnknown(MACHINE_BY_STATE[state]))).toEqual([
            false,
            false,
            true,
            true,
            false,
            false,
            false,
        ]);
        expect(outcomeUnknown({ ...MACHINE_BY_STATE.offline, unresolved: REQUEST })).toBe(true);
        expect(outcomeUnknown({ ...MACHINE_BY_STATE.error, unresolved: REQUEST })).toBe(false);
    });

    it('refuses a commit once ended or in conflict', () => {
        expect(refusal(MACHINE_BY_STATE.dirty)).toBeUndefined();
        expect(refusal(MACHINE_BY_STATE.conflict)).toEqual({ status: 'blocked', code: 'conflict' });
        expect(refusal({ ...MACHINE_BY_STATE.conflict, ended: true })).toEqual({
            status: 'failed',
            code: 'disposed',
            outcome: 'unknown',
        });
    });

    it('gates a commit by phase, refusal and composition', () => {
        expect(gate(MACHINE_BY_STATE.dirty, FACTS, undefined)).toBeUndefined();
        expect(gate(MACHINE_BY_STATE.dirty, { ...FACTS, phase: 'mounting' }, undefined)).toEqual({
            status: 'blocked',
            code: 'not-ready',
        });
        expect(gate(MACHINE_BY_STATE.dirty, { ...FACTS, phase: 'disposed' }, undefined)).toEqual({
            status: 'blocked',
            code: 'not-ready',
        });
        expect(gate(MACHINE_BY_STATE.conflict, FACTS, undefined)).toEqual({ status: 'blocked', code: 'conflict' });
        expect(gate(MACHINE_BY_STATE.dirty, { ...FACTS, composing: true }, 'wait')).toBeUndefined();
        expect(gate(MACHINE_BY_STATE.dirty, { ...FACTS, composing: true }, 'reject')).toEqual({
            status: 'blocked',
            code: 'composition-active',
        });
    });
});
