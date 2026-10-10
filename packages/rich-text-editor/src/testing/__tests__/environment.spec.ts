/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { createTestEnvironment } from '#/testing';

const draw = (random: () => number, count: number): number[] => Array.from({ length: count }, () => random());

describe('createTestEnvironment', () => {
    it('starts the clock above 0', () => {
        expect(createTestEnvironment({ seed: 1 }).clock.now()).toBeGreaterThan(0);
    });

    it('rejects seeds outside [0, 4294967295]', () => {
        expect(() => createTestEnvironment({ seed: 0.5 })).toThrow(RangeError);
        expect(() => createTestEnvironment({ seed: -1 })).toThrow(RangeError);
        expect(() => createTestEnvironment({ seed: 2 ** 32 })).toThrow(RangeError);
    });

    it('does not move the clock backwards when advance is re-entered from a timer', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const start = environment.clock.now();
        environment.clock.setTimeout(() => environment.advance(500), 10);
        environment.advance(100);
        expect(environment.clock.now() - start).toBeGreaterThanOrEqual(510);
    });

    it('runs each kind of callback only inside its flush call', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const ran: string[] = [];
        environment.clock.setTimeout(() => ran.push('timer'), 10);
        environment.scheduler.microtask(() => ran.push('microtask'));
        environment.scheduler.frame(() => ran.push('frame'));
        environment.scheduler.idle(() => ran.push('idle'));

        expect(ran).toEqual([]);
        environment.flushFrames();
        expect(ran).toEqual(['frame']);
        environment.flushIdle();
        expect(ran).toEqual(['frame', 'idle']);
        await environment.flushMicrotasks();
        expect(ran).toEqual(['frame', 'idle', 'microtask']);
        environment.advance(9);
        expect(ran).toEqual(['frame', 'idle', 'microtask']);
        environment.advance(1);
        expect(ran).toEqual(['frame', 'idle', 'microtask', 'timer']);
    });

    it('runs interleaved timers in due-time order, then in scheduling order', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const start = environment.clock.now();
        const ran: string[] = [];
        environment.clock.setTimeout(() => ran.push(`late@${environment.clock.now() - start}`), 30);
        environment.clock.setTimeout(() => {
            ran.push(`early@${environment.clock.now() - start}`);
            environment.clock.setTimeout(() => ran.push(`nested@${environment.clock.now() - start}`), 5);
        }, 10);
        environment.clock.setTimeout(() => ran.push(`tie-a@${environment.clock.now() - start}`), 15);
        environment.clock.setTimeout(() => ran.push(`tie-b@${environment.clock.now() - start}`), 15);
        const cancelled = environment.clock.setTimeout(() => ran.push('cancelled'), 20);
        environment.clock.clearTimeout(cancelled);

        environment.advance(40);

        expect(ran).toEqual(['early@10', 'tie-a@15', 'tie-b@15', 'nested@15', 'late@30']);
        expect(environment.clock.now() - start).toBe(40);
    });

    it('runs microtasks, frames and idle callbacks in scheduling order', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const ran: string[] = [];
        environment.scheduler.microtask(() => {
            ran.push('m1');
            environment.scheduler.microtask(() => ran.push('m3'));
        });
        environment.scheduler.microtask(() => ran.push('m2'));
        let cancelledByFirst = 0;
        environment.scheduler.frame(() => {
            ran.push('f1');
            environment.scheduler.cancelFrame(cancelledByFirst);
            environment.scheduler.frame(() => ran.push('f3'));
        });
        environment.scheduler.cancelFrame(environment.scheduler.frame(() => ran.push('cancelled')));
        environment.scheduler.frame(() => ran.push('f2'));
        cancelledByFirst = environment.scheduler.frame(() => ran.push('cancelled'));
        environment.scheduler.idle(() => ran.push('i1'));
        environment.scheduler.cancelIdle(environment.scheduler.idle(() => ran.push('cancelled')));

        await environment.flushMicrotasks();
        environment.flushFrames();
        environment.flushIdle();
        expect(ran).toEqual(['m1', 'm2', 'm3', 'f1', 'f2', 'i1']);
        environment.flushFrames();
        expect(ran).toEqual(['m1', 'm2', 'm3', 'f1', 'f2', 'i1', 'f3']);
    });

    it('counts IDs per kind and repeats random values per seed', () => {
        const first = createTestEnvironment({ seed: 7 });
        const second = createTestEnvironment({ seed: 7 });
        const other = createTestEnvironment({ seed: 8 });

        expect([first.ids.next('node'), first.ids.next('node'), first.ids.next('target')]).toEqual([
            'node-1',
            'node-2',
            'target-1',
        ]);
        expect([second.ids.next('node'), second.ids.next('node'), second.ids.next('target')]).toEqual([
            'node-1',
            'node-2',
            'target-1',
        ]);

        const sequence = draw(first.random, 100);
        expect(draw(second.random, 100)).toEqual(sequence);
        expect(draw(other.random, 100)).not.toEqual(sequence);
        for (const value of sequence) {
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThan(1);
        }
    });
});
