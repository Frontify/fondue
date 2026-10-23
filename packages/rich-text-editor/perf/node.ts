/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Bench } from 'vitest';

import { record, SETTINGS } from './measure';

/**
 * Runs each part of a Node row with the warm-up and iteration counts of `method.json`, and records the retained
 * samples. `time: 0` makes the counts exact, since a run would otherwise go on until a time budget ends.
 */
export const measureNode = async (
    bench: Bench,
    id: string,
    parts: Readonly<Record<string, () => unknown>>,
): Promise<void> => {
    const measured: Record<string, readonly number[]> = {};
    for (const [name, run] of Object.entries(parts)) {
        const result = await bench(name, run).run({
            warmupIterations: SETTINGS.warmup,
            iterations: SETTINGS.samples,
            time: 0,
            warmupTime: 0,
        });
        const samples = result.latency.samples ?? [];
        if (samples.length !== SETTINGS.samples) {
            throw new Error(`${id} ${name} retained ${samples.length} samples, not ${SETTINGS.samples}.`);
        }
        measured[name] = samples;
    }
    record(id, measured);
};
