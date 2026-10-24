/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { createBusy } from '../../session/busy';

describe('createBusy', () => {
    it('returns the work result and is busy only while it runs', () => {
        const busy = createBusy();
        expect(busy.isBusy()).toBe(false);
        expect(busy.run(() => busy.isBusy())).toBe(true);
        expect(busy.isBusy()).toBe(false);
    });

    it('stays busy through nested runs and runs idle hooks once at the outermost exit, in order', () => {
        const busy = createBusy();
        const calls: string[] = [];
        busy.onIdle(
            () => calls.push('a'),
            () => calls.push('b'),
        );
        busy.onIdle(() => calls.push('c'));
        busy.run(() => {
            busy.run(() => calls.push('inner'));
            expect(busy.isBusy()).toBe(true);
            calls.push('outer');
        });
        expect(calls).toEqual(['inner', 'outer', 'a', 'b', 'c']);
    });

    it('runs after-each hooks on every exit, after the idle hooks', () => {
        const busy = createBusy();
        const calls: string[] = [];
        busy.onIdle(() => calls.push('idle'));
        busy.afterEach(() => calls.push('after'));
        busy.run(() => busy.run(() => calls.push('work')));
        expect(calls).toEqual(['work', 'after', 'idle', 'after']);
    });

    it('runs the hooks and rethrows when the work throws', () => {
        const busy = createBusy();
        const calls: string[] = [];
        busy.onIdle(() => calls.push('idle'));
        busy.afterEach(() => calls.push('after'));
        expect(() =>
            busy.run(() => {
                throw new Error('boom');
            }),
        ).toThrow('boom');
        expect(busy.isBusy()).toBe(false);
        expect(calls).toEqual(['idle', 'after']);
    });

    it('lets a hook run work while the count is back at zero', () => {
        const busy = createBusy();
        const seen: boolean[] = [];
        busy.afterEach(() => seen.push(busy.isBusy()));
        busy.run(() => undefined);
        expect(seen).toEqual([false]);
    });
});
