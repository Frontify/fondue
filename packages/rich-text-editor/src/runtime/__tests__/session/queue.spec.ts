/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type Diagnostic } from '#/model';

import { createBusy } from '../../session/busy';
import { createLifecycle } from '../../session/lifecycle';
import { createQueue } from '../../session/queue';
import { type Route } from '../../session/types';
import { type CommandResult } from '../../types';

const applied = { status: 'applied' } as unknown as CommandResult;

const setup = (run?: (id: string, payload: unknown, options: unknown, route: Route) => CommandResult) => {
    const calls: string[] = [];
    const reported: Diagnostic[] = [];
    const state = { composing: false };
    const resources = { intents: 0 };
    const lifecycle = createLifecycle();
    lifecycle.to('ready');
    const busy = createBusy();
    const service = createQueue({
        lifecycle,
        busy,
        composition: { active: () => state.composing },
        run:
            run ??
            ((id, _payload, _options, route) => {
                calls.push(`${id}:${route}`);
                return applied;
            }),
        report: (found) => reported.push(found),
        resources,
    });
    busy.afterEach(service.drain);
    return { service, calls, reported, state, resources, lifecycle, busy };
};

describe('createQueue', () => {
    it('runs an intent at once on the queue route when nothing holds it back', async () => {
        const { service, calls, resources } = setup();
        await expect(service.enqueue('a')).resolves.toBe(applied);
        expect(calls).toEqual(['a:queue']);
        expect(resources.intents).toBe(0);
    });

    it('holds intents while busy and runs them in call order at the exit', async () => {
        const { service, calls, busy, resources } = setup();
        let both: Promise<unknown> = Promise.resolve();
        busy.run(() => {
            both = Promise.all([service.enqueue('a'), service.enqueue('b')]);
            expect(calls).toEqual([]);
            expect(resources.intents).toBe(2);
        });
        await both;
        expect(calls).toEqual(['a:queue', 'b:queue']);
        expect(resources.intents).toBe(0);
    });

    it('holds intents during a composition until drain runs', async () => {
        const { service, calls, state } = setup();
        state.composing = true;
        const pending = service.enqueue('a');
        expect(calls).toEqual([]);
        state.composing = false;
        service.drain();
        await pending;
        expect(calls).toEqual(['a:queue']);
    });

    it('rejects at once as not-ready once faulted', async () => {
        const { service, calls, lifecycle, resources } = setup();
        lifecycle.to('faulted');
        await expect(service.enqueue('a')).resolves.toEqual({ status: 'rejected', code: 'not-ready' });
        expect(calls).toEqual([]);
        expect(resources.intents).toBe(0);
    });

    it('settles what waits with the code', async () => {
        const { service, calls, state, resources } = setup();
        state.composing = true;
        const first = service.enqueue('a');
        const second = service.enqueue('b');
        service.settle('wrong-session');
        await expect(first).resolves.toEqual({ status: 'rejected', code: 'wrong-session' });
        await expect(second).resolves.toEqual({ status: 'rejected', code: 'wrong-session' });
        expect(resources.intents).toBe(0);
        state.composing = false;
        service.drain();
        expect(calls).toEqual([]);
    });

    it('runs what an intent enqueues after it, never inside it', async () => {
        const order: string[] = [];
        let queued: Promise<CommandResult> | undefined;
        const { service } = setup((id) => {
            order.push(`start:${id}`);
            if (id === 'a') {
                queued = service.enqueue('b');
            }
            order.push(`end:${id}`);
            return applied;
        });
        await service.enqueue('a');
        await queued;
        expect(order).toEqual(['start:a', 'end:a', 'start:b', 'end:b']);
    });

    it('rejects intents past the depth limit as busy and warns once', async () => {
        const results: Promise<CommandResult>[] = [];
        const { service, reported } = setup(() => {
            results.push(service.enqueue('loop'));
            return applied;
        });
        const first = service.enqueue('loop');
        const settled = await Promise.all([first, ...results]);
        expect(settled.at(-1)).toEqual({ status: 'rejected', code: 'busy' });
        expect(reported.map(({ code }) => code)).toEqual(['runtime.enqueue-loop']);
    });
});
