/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { createLifecycle } from '../session/state/lifecycle';
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

    it.each(PAIRS)('moves from %s to %s as the table says in development and in production', (from, to) => {
        const development = reach(from);
        const legal = LEGAL[from].includes(to);
        if (legal) {
            development.to(to);
            expect(development.phase()).toBe(to);
        } else {
            expect(() => development.to(to)).toThrow(`from ${from} to ${to}`);
            expect(development.phase()).toBe(from);
        }

        vi.stubEnv('NODE_ENV', 'production');
        const production = reach(from);
        production.to(to);
        expect(production.phase()).toBe(legal ? to : from);
    });

    it('aborts ended on disposed, and on no other move', () => {
        for (const phase of PHASES) {
            expect(reach(phase).ended.aborted).toBe(phase === 'disposed');
        }

        expect(reach('disposed').isDisposed()).toBe(true);
    });
});
