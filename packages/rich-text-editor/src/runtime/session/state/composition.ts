/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createInputSettling, type InputSettling } from '../../dom/settle';

import { type InputOutcome } from './types';

export type Composition = {
    /** Calls `settled` once input settles after the composition that runs now, or with `timeout` after `timeoutMs`. */
    wait(settled: (outcome: InputOutcome) => void, timeoutMs: number): void;
    /** Answers every waiter with the outcome, as the settle and `dispose` do. */
    resolve(outcome: InputOutcome): void;
} & InputSettling;

export const createComposition = (args: { composing: () => boolean; onSettled: () => void }): Composition => {
    // What waits for input to settle outside the queue, such as a form's settled value.
    const waiters = new Set<(outcome: InputOutcome) => void>();

    return {
        ...createInputSettling(args.composing, args.onSettled),
        wait: (settled, timeoutMs) => {
            // Whichever comes first, the settle, the timeout or `dispose`, answers; the others find nothing.
            const waiter = (outcome: InputOutcome) => {
                if (waiters.delete(waiter)) {
                    clearTimeout(timer);
                    settled(outcome);
                }
            };

            const timer = setTimeout(() => waiter('timeout'), timeoutMs);
            waiters.add(waiter);
        },
        resolve: (outcome) => {
            for (const settled of [...waiters]) {
                settled(outcome);
            }
        },
    };
};
