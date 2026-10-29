/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic } from '#/model';

import { createInputSettling, type InputSettling } from '../../dom/settle';
import { pluginError } from '../../reporting/events';

import { type InputOutcome } from './types';

export type Composition = {
    /** Calls `settled` once input settles after the composition that runs now, or with `timeout` after `timeoutMs`. */
    wait(settled: (outcome: InputOutcome) => void, timeoutMs: number): void;
    /** Answers every waiter with the outcome, as the settle and `dispose` do. */
    resolve(outcome: InputOutcome): void;
} & InputSettling;

export const createComposition = (args: {
    composing: () => boolean;
    onSettled: () => void;
    onActiveChange: () => void;
    /** How many times selector stores have been told to read. */
    notifications: () => number;
    report: (found: Diagnostic) => void;
}): Composition => {
    // What waits for input to settle outside the queue, such as a form's settled value.
    const waiters = new Set<(outcome: InputOutcome) => void>();

    return {
        ...createInputSettling(args.composing, args.onSettled, args.onActiveChange, args.notifications),
        wait: (settled, timeoutMs) => {
            // Whichever comes first, the settle, the timeout or `dispose`, answers; the others find nothing.
            const waiter = (outcome: InputOutcome) => {
                if (!waiters.delete(waiter)) {
                    return;
                }

                clearTimeout(timer);
                try {
                    settled(outcome);
                } catch (error) {
                    args.report(pluginError(error, undefined));
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
