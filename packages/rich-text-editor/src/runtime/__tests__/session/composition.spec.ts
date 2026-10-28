/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createComposition } from '../../session/state/composition';

describe('createComposition', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    const make = (composing = false) => {
        const onSettled = vi.fn();
        const composition = createComposition({
            composing: () => composing,
            onSettled,
            onActiveChange: () => undefined,
            notifications: () => 0,
        });

        return { composition, onSettled };
    };

    it('exposes the settling plugin and reports no composition at rest', () => {
        const { composition } = make();
        expect(composition.plugin).toBeDefined();
        expect(composition.active()).toBe(false);
    });

    it('is active while the view composes', () => {
        expect(make(true).composition.active()).toBe(true);
    });

    it('answers a waiter with the outcome that resolves it, once', () => {
        const { composition } = make();
        const settled = vi.fn();
        composition.wait(settled, 1000);
        composition.resolve('settled');
        composition.resolve('disposed');
        vi.advanceTimersByTime(2000);
        expect(settled).toHaveBeenCalledTimes(1);
        expect(settled).toHaveBeenCalledWith('settled');
    });

    it('answers every waiter and a disposed outcome reaches them all', () => {
        const { composition } = make();
        const first = vi.fn();
        const second = vi.fn();
        composition.wait(first, 1000);
        composition.wait(second, 1000);
        composition.resolve('disposed');
        expect(first).toHaveBeenCalledWith('disposed');
        expect(second).toHaveBeenCalledWith('disposed');
    });

    it('answers with timeout when nothing resolves it in time, then ignores a later resolve', () => {
        const { composition } = make();
        const settled = vi.fn();
        composition.wait(settled, 500);
        vi.advanceTimersByTime(499);
        expect(settled).not.toHaveBeenCalled();
        vi.advanceTimersByTime(1);
        expect(settled).toHaveBeenCalledWith('timeout');
        composition.resolve('settled');
        expect(settled).toHaveBeenCalledTimes(1);
    });

    it('lets a waiter added while resolving wait for the next resolve', () => {
        const { composition } = make();
        const late = vi.fn();
        composition.wait(() => composition.wait(late, 1000), 1000);
        composition.resolve('settled');
        expect(late).not.toHaveBeenCalled();
        composition.resolve('settled');
        expect(late).toHaveBeenCalledWith('settled');
    });
});
