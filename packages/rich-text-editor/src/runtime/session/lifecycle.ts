/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorSummary } from '../types';

type Phase = EditorSummary['phase'];

const TRANSITIONS: Readonly<Record<Phase, readonly Phase[]>> = {
    mounting: ['ready', 'faulted', 'disposed'],
    ready: ['transitioning', 'faulted', 'disposed'],
    transitioning: ['ready', 'faulted', 'disposed'],
    faulted: ['faulted', 'disposed'],
    disposed: [],
};

export interface Lifecycle {
    phase(): Phase;
    is(...phases: readonly Phase[]): boolean;
    isDisposed(): boolean;
    /** Aborts when the session is disposed, which ends its own service calls. */
    readonly ended: AbortSignal;
    /** Moves to `next`; an illegal move throws outside production and is ignored in production. */
    to(next: Phase): void;
}

export const createLifecycle = (): Lifecycle => {
    const end = new AbortController();
    let current: Phase = 'mounting';
    return {
        phase: () => current,
        is: (...phases) => phases.includes(current),
        isDisposed: () => current === 'disposed',
        ended: end.signal,
        to: (next) => {
            if (!TRANSITIONS[current].includes(next)) {
                if (process.env.NODE_ENV !== 'production') {
                    throw new Error(`Illegal session phase move from ${current} to ${next}.`);
                }
                return;
            }
            current = next;
            if (next === 'disposed') {
                end.abort();
            }
        },
    };
};
