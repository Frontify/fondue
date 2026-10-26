/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { createLifecycle } from '../session/lifecycle';
import { type EditorSummary } from '../types';

type Phase = EditorSummary['phase'];

const PHASES: readonly Phase[] = ['mounting', 'ready', 'transitioning', 'faulted', 'disposed'];
const LEGAL: Readonly<Record<Phase, readonly Phase[]>> = {
    mounting: ['ready', 'faulted', 'disposed'],
    ready: ['transitioning', 'faulted', 'disposed'],
    transitioning: ['ready', 'faulted', 'disposed'],
    faulted: ['faulted', 'disposed'],
    disposed: [],
};
/** The shortest legal path from `mounting` to each phase. */
const PATH: Readonly<Record<Phase, readonly Phase[]>> = {
    mounting: [],
    ready: ['ready'],
    transitioning: ['ready', 'transitioning'],
    faulted: ['faulted'],
    disposed: ['disposed'],
};

const reach = (phase: Phase) => {
    const lifecycle = createLifecycle();
    for (const step of PATH[phase]) {
        lifecycle.to(step);
    }

    return lifecycle;
};

const PAIRS = PHASES.flatMap((from) => PHASES.map((to) => [from, to] as const));

afterEach(() => {
    vi.unstubAllEnvs();
});

describe('the session lifecycle machine', () => {
    it('starts mounting with a live ended signal', () => {
        const lifecycle = createLifecycle();

        expect(lifecycle.phase()).toBe('mounting');
        expect(lifecycle.isDisposed()).toBe(false);
        expect(lifecycle.ended.aborted).toBe(false);
    });

    it('answers is for any of the phases it is given', () => {
        const lifecycle = reach('faulted');

        expect(lifecycle.is('faulted', 'disposed')).toBe(true);
        expect(lifecycle.is('ready', 'mounting')).toBe(false);
    });

    it.each(PAIRS)('moves from %s to %s as the table says in development', (from, to) => {
        const lifecycle = reach(from);

        if (LEGAL[from].includes(to)) {
            lifecycle.to(to);
            expect(lifecycle.phase()).toBe(to);
        } else {
            expect(() => lifecycle.to(to)).toThrow(`from ${from} to ${to}`);
            expect(lifecycle.phase()).toBe(from);
        }
    });

    it.each(PAIRS)('moves from %s to %s as the table says in production, ignoring an illegal move', (from, to) => {
        vi.stubEnv('NODE_ENV', 'production');
        const lifecycle = reach(from);

        lifecycle.to(to);

        if (LEGAL[from].includes(to)) {
            expect(lifecycle.phase()).toBe(to);
        } else {
            expect(lifecycle.phase()).toBe(from);
        }
    });

    it('aborts ended on disposed, and on no other move', () => {
        for (const phase of PHASES) {
            expect(reach(phase).ended.aborted).toBe(phase === 'disposed');
        }

        expect(reach('disposed').isDisposed()).toBe(true);
    });
});
