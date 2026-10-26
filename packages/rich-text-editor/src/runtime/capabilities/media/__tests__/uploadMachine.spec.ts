/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type AsyncOperation } from '#/runtime/async';
import {
    type Effect,
    fresh,
    isActive,
    isKept,
    isRetryable,
    next,
    type NodeFacts,
    type Phase,
    type SlotEvent,
    type SlotState,
    statusOf,
} from '#/runtime/capabilities/media/uploads/machine';

const OP = { id: 'op-1' } as AsyncOperation;
const OTHER = { id: 'op-2' } as AsyncOperation;
const ASSET = { assetId: 'asset-1', mediaType: 'image/png', labelSnapshot: 'a.png' };
const BASE = fresh('slot', 'insert', { file: new File(['x'], 'a.png'), name: 'a.png', width: 10, height: 20 });

/** One slot per phase, as the transport leaves it: a running upload holds its operation, the rest none. */
const IN: Record<Phase, SlotState> = {
    pending: BASE,
    queued: { ...BASE, phase: 'queued', operation: OP, operationId: 'op-1' },
    running: { ...BASE, phase: 'running', operation: OP, operationId: 'op-1' },
    failed: { ...BASE, phase: 'failed', operationId: 'op-1' },
    stopped: { ...BASE, phase: 'stopped', operationId: 'op-1' },
    done: { ...BASE, phase: 'done', file: undefined, operationId: 'op-1' },
};
const PHASES = Object.keys(IN) as Phase[];

type Outcome = readonly [Phase, readonly Effect['type'][]];
type Row = {
    readonly event: SlotEvent;
    readonly setup?: Partial<SlotState>;
    readonly outcomes: Record<Phase, Outcome>;
};

/** Every phase stays as it is and the event gives the same effects. */
const each = (effects: readonly Effect['type'][]): Record<Phase, Outcome> => ({
    pending: ['pending', effects],
    queued: ['queued', effects],
    running: ['running', effects],
    failed: ['failed', effects],
    stopped: ['stopped', effects],
    done: ['done', effects],
});
/** Every phase moves to `phase` and the event gives the same effects. */
const into = (phase: Phase, effects: readonly Effect['type'][]): Record<Phase, Outcome> => ({
    pending: [phase, effects],
    queued: [phase, effects],
    running: [phase, effects],
    failed: [phase, effects],
    stopped: [phase, effects],
    done: [phase, effects],
});
/** The slots that hold an operation (queued, running) get `held`; the others get `idle`. */
const byOperation = (held: Outcome[1], idle: Outcome[1], phase?: Phase): Record<Phase, Outcome> => ({
    ...each(idle),
    queued: [phase ?? 'queued', held],
    running: [phase ?? 'running', held],
});

const NODE: NodeFacts = { assetId: null, labelSnapshot: 'a.png', width: 10, height: 20 };
const committed = (facts: Partial<Extract<SlotEvent, { type: 'committed' }>>): SlotEvent => ({
    type: 'committed',
    history: false,
    node: NODE,
    reset: false,
    cached: true,
    ...facts,
});
const failure: readonly Effect['type'][] = ['release', 'changed', 'reportFailure', 'announce', 'reply'];

/** The transition table, row by row: the next phase and the effect types of each event in each phase. */
const TABLE: Record<string, Row> = {
    'send with a service': {
        event: { type: 'send', announce: true, service: true },
        outcomes: { ...into('queued', ['start']), done: ['stopped', ['changed']] },
    },
    'send without a service': {
        event: { type: 'send', announce: true, service: false },
        outcomes: into('stopped', ['changed']),
    },
    started: {
        event: { type: 'started', operation: OTHER, aborted: false, announce: true },
        outcomes: each(['watch', 'announce', 'changed']),
    },
    'started, announced by its gesture': {
        event: { type: 'started', operation: OTHER, aborted: false, announce: false },
        outcomes: each(['watch', 'changed']),
    },
    'started after an abort': {
        event: { type: 'started', operation: OTHER, aborted: true, announce: true },
        outcomes: into('stopped', ['changed']),
    },
    'running, own operation': {
        event: { type: 'running', own: OP },
        outcomes: into('running', ['changed']),
    },
    'running, another operation': {
        event: { type: 'running', own: OTHER },
        outcomes: { ...into('running', ['changed']), queued: ['queued', []], running: ['running', []] },
    },
    progress: {
        event: { type: 'progress', fraction: 0.5, aborted: false },
        outcomes: { ...each([]), running: ['running', ['changed']] },
    },
    'progress at the same percent': {
        event: { type: 'progress', fraction: 0.5, aborted: false },
        setup: { progress: 50 },
        outcomes: each([]),
    },
    'progress after an abort': {
        event: { type: 'progress', fraction: 0.5, aborted: true },
        outcomes: each([]),
    },
    'progress that is not a number': {
        event: { type: 'progress', fraction: Number.NaN, aborted: false },
        outcomes: each([]),
    },
    'answered with no operation': {
        event: { type: 'answered', own: undefined, value: {} },
        outcomes: each(['reply']),
    },
    'answered, own operation': {
        event: { type: 'answered', own: OP, value: {} },
        outcomes: byOperation(['parse'], ['release', 'reply']),
    },
    'answered, another operation': {
        event: { type: 'answered', own: OTHER, value: {} },
        outcomes: each(['release', 'reply']),
    },
    'parsed with no asset': {
        event: { type: 'parsed', asset: undefined },
        outcomes: into('failed', failure),
    },
    'parsed with an asset': {
        event: { type: 'parsed', asset: ASSET },
        outcomes: each(['fill']),
    },
    filled: {
        event: { type: 'filled', asset: ASSET, code: undefined, intent: 'meaningful' },
        outcomes: { ...into('done', ['announce', 'changed', 'reply']), ...doneWithCache() },
    },
    'filled, refused': {
        event: { type: 'filled', asset: ASSET, code: 'rejected', intent: undefined },
        outcomes: into('failed', ['release', 'changed', 'announce', 'reply']),
    },
    'failed, own operation': {
        event: { type: 'failed', own: OP },
        outcomes: byOperation(['changed', 'reportFailure', 'announce'], [], 'failed'),
    },
    'failed, no operation': {
        event: { type: 'failed', own: undefined },
        outcomes: {
            ...into('failed', ['changed', 'reportFailure', 'announce']),
            queued: ['queued', []],
            running: ['running', []],
        },
    },
    'aborted, own operation': {
        event: { type: 'aborted', operation: OP },
        outcomes: byOperation(['release', 'changed', 'announce'], ['release'], 'stopped'),
    },
    'committed, nothing changed': { event: committed({}), outcomes: each([]) },
    'committed, asset reset': { event: committed({ reset: true }), outcomes: byOperation(['end'], []) },
    'committed, node removed': { event: committed({ node: null }), outcomes: byOperation(['end'], []) },
    'committed by history, cached': {
        event: committed({ history: true }),
        outcomes: { ...each(['refill']), pending: ['pending', []], queued: ['queued', []], running: ['running', []] },
    },
    'committed by history, node removed': {
        event: committed({ history: true, node: null }),
        outcomes: byOperation(['end'], []),
    },
    'committed by history, node holds an asset': {
        event: committed({ history: true, node: { ...NODE, assetId: 'a1' } }),
        outcomes: each([]),
    },
    'committed by history, node shows another start': {
        event: committed({ history: true, node: { ...NODE, labelSnapshot: 'b.png' } }),
        outcomes: each([]),
    },
    'committed by history, not cached': {
        event: committed({ history: true, cached: false }),
        outcomes: each([]),
    },
    'reset, document replaced': {
        event: { type: 'reset', keeps: false, present: true },
        outcomes: each(['drop']),
    },
    'reset, document kept': {
        event: { type: 'reset', keeps: true, present: true },
        outcomes: { ...each([]), done: ['done', ['drop']] },
    },
    'reset, document kept without the node': {
        event: { type: 'reset', keeps: true, present: false },
        outcomes: each(['drop']),
    },
};

/** A completion of a slot that holds an operation writes the cache first. */
function doneWithCache(): Partial<Record<Phase, Outcome>> {
    const effects: Outcome[1] = ['cache', 'announce', 'changed', 'reply'];
    return { queued: ['done', effects], running: ['done', effects] };
}

describe('upload machine', () => {
    for (const [name, row] of Object.entries(TABLE)) {
        describe(name, () => {
            it.each(PHASES)('in phase %s', (phase) => {
                const [expected, effects] = row.outcomes[phase];
                const result = next({ ...IN[phase], ...row.setup }, row.event);
                expect(result.state.phase).toBe(expected);
                expect(result.effects.map((effect) => effect.type)).toEqual(effects);
            });
        });
    }

    it('covers every event type', () => {
        const covered = new Set(Object.values(TABLE).map(({ event }) => event.type));
        expect([...covered].sort()).toEqual(
            [
                'send',
                'started',
                'running',
                'progress',
                'answered',
                'parsed',
                'filled',
                'failed',
                'aborted',
                'committed',
                'reset',
            ].sort(),
        );
    });

    it('never changes the state it is given', () => {
        const before = { ...IN.running };
        next(IN.running, { type: 'aborted', operation: OP });
        expect(IN.running).toEqual(before);
    });

    describe('what a transition sets', () => {
        it('queues a send with no operation and no progress', () => {
            const { state } = next({ ...IN.failed, progress: 40 }, { type: 'send', announce: true, service: true });
            expect(state).toMatchObject({ phase: 'queued', progress: null, operation: undefined });
        });

        it('keeps the file of a failed or stopped slot, and drops it once done', () => {
            expect(next(IN.running, { type: 'failed', own: OP }).state.file).toBe(BASE.file);
            expect(next(IN.running, { type: 'aborted', operation: OP }).state.file).toBe(BASE.file);
            const done = next(IN.running, { type: 'filled', asset: ASSET, code: undefined, intent: 'decorative' });
            expect(done.state).toMatchObject({ phase: 'done', file: undefined, operation: undefined });
        });

        it('records the operation a start returned, which the cache is read with', () => {
            const { state } = next(IN.queued, { type: 'started', operation: OTHER, aborted: false, announce: true });
            expect(state).toMatchObject({ operation: OTHER, operationId: 'op-2' });
        });

        it('keeps the operation ID after a stop', () => {
            expect(next(IN.running, { type: 'aborted', operation: OP }).state).toMatchObject({
                operation: undefined,
                operationId: 'op-1',
            });
        });

        it('rounds progress to a whole percent within 0 and 100', () => {
            const percent = (fraction: number) =>
                next(IN.running, { type: 'progress', fraction, aborted: false }).state.progress;
            expect([percent(0.499), percent(1.5), percent(-1), percent(0)]).toEqual([50, 100, 0, 0]);
        });
    });

    describe('what an effect carries', () => {
        const filled = (state: SlotState, intent: unknown) =>
            next(state, { type: 'filled', asset: ASSET, code: undefined, intent }).effects;

        it('caches the completion by the operation ID', () => {
            expect(filled(IN.running, 'meaningful')[0]).toEqual({ type: 'cache', operationId: 'op-1', asset: ASSET });
        });

        it('announces an insert that has no alternative text as missing it, with no review', () => {
            expect(filled(IN.running, undefined)).toContainEqual({
                type: 'announce',
                event: { kind: 'completed', name: 'a.png', altMissing: true, review: false },
            });
        });

        it('asks a replacement that kept its alternative text for a review, and records its asset', () => {
            const replace = { ...IN.running, kind: 'replace' } as const;
            const effects = filled(replace, 'meaningful');
            expect(effects).toContainEqual({
                type: 'announce',
                event: { kind: 'completed', name: 'a.png', altMissing: false, review: true },
            });
            expect(effects).toContainEqual({ type: 'replaced', assetId: 'asset-1' });
        });

        it('asks a replacement with no alternative text for none', () => {
            const effects = filled({ ...IN.running, kind: 'replace' }, undefined);
            expect(effects.map((effect) => effect.type)).not.toContain('replaced');
        });

        it('answers a refused completion with the refusal code', () => {
            const { effects } = next(IN.running, { type: 'filled', asset: ASSET, code: 'rejected', intent: 'x' });
            expect(effects.at(-1)).toEqual({ type: 'reply', code: 'rejected' });
        });

        it('answers a payload with no asset as invalid and a stale answer as superseded', () => {
            const invalid = next(IN.running, { type: 'parsed', asset: undefined }).effects;
            expect(invalid.at(-1)).toEqual({ type: 'reply', code: 'invalid-payload' });
            const stale = next(IN.running, { type: 'answered', own: OTHER, value: {} }).effects;
            expect(stale.at(-1)).toEqual({ type: 'reply', code: 'superseded' });
        });

        it('hands the value to the parse, the asset to the fill, and the operation to the end', () => {
            const value = { assetId: 'x' };
            expect(next(IN.running, { type: 'answered', own: OP, value }).effects).toEqual([{ type: 'parse', value }]);
            expect(next(IN.running, { type: 'parsed', asset: ASSET }).effects).toEqual([
                { type: 'fill', asset: ASSET },
            ]);
            expect(next(IN.running, committed({ reset: true })).effects).toEqual([{ type: 'end', operation: OP }]);
        });

        it('announces a cancel and a start by the slot name', () => {
            expect(next(IN.running, { type: 'aborted', operation: OP }).effects).toContainEqual({
                type: 'announce',
                event: { kind: 'cancelled', name: 'a.png' },
            });
            expect(
                next(IN.pending, { type: 'started', operation: OP, aborted: false, announce: true }).effects,
            ).toContainEqual({
                type: 'announce',
                event: { kind: 'started', name: 'a.png' },
            });
        });
    });

    describe('what the chrome and the commands read', () => {
        const FLAGS: Record<Phase, readonly [active: boolean, kept: boolean, retryable: boolean]> = {
            pending: [true, true, false],
            queued: [true, true, false],
            running: [true, true, false],
            failed: [false, true, true],
            stopped: [false, true, true],
            done: [false, false, false],
        };

        it.each(PHASES)('reads %s', (phase) => {
            const slot = IN[phase];
            expect([isActive(slot), isKept(slot), isRetryable(slot)]).toEqual(FLAGS[phase]);
        });

        it('keeps a slot without its file from a retry', () => {
            expect(isRetryable({ ...IN.failed, file: undefined })).toBe(false);
        });

        it('shows a status once the slot starts and until it completes', () => {
            expect(PHASES.map((phase) => statusOf({ ...IN[phase], progress: 30 })?.state)).toEqual([
                undefined,
                'queued',
                'running',
                'failed',
                'stopped',
                undefined,
            ]);
            expect(statusOf({ ...IN.running, progress: 30 })).toEqual({
                state: 'running',
                progress: 30,
                name: 'a.png',
            });
        });
    });
});
