/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RuntimeEnvironment } from '#/model';

/** A `RuntimeEnvironment` that runs scheduled work only inside its flush calls. */
export interface TestEnvironment extends RuntimeEnvironment {
    advance(ms: number): void;
    flushMicrotasks(): Promise<void>;
    flushFrames(): void;
    flushIdle(): void;
}

type IdKind = Parameters<RuntimeEnvironment['ids']['next']>[0];

type Timer = { readonly handle: number; readonly due: number; readonly callback: () => void };

// prosemirror-history reads a previous event time of 0 as no previous event.
const START_TIME = 1_000_000;

const assertValidSeed = (seed: number): void => {
    if (!Number.isInteger(seed) || seed < 0 || seed > 0xffff_ffff) {
        throw new RangeError('seed must be an integer in the range [0, 4294967295]');
    }
};

// mulberry32: a small seedable generator, uniform enough for tests.
const createRandom = (seed: number): (() => number) => {
    let state = seed >>> 0;
    return () => {
        state = (state + 0x6d2b79f5) >>> 0;
        let value = Math.imul(state ^ (state >>> 15), state | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
    };
};

const createBatch = () => {
    const callbacks = new Map<number, () => void>();
    let nextHandle = 1;

    return {
        add: (callback: () => void): number => {
            const handle = nextHandle;
            nextHandle += 1;
            callbacks.set(handle, callback);
            return handle;
        },
        cancel: (handle: number): void => {
            callbacks.delete(handle);
        },
        // Runs what was queued before the call; work queued while it runs waits for the next one.
        flush: (): void => {
            for (const handle of [...callbacks.keys()]) {
                const callback = callbacks.get(handle);
                if (callback !== undefined) {
                    callbacks.delete(handle);
                    callback();
                }
            }
        },
    };
};

export const createTestEnvironment = ({ seed }: { readonly seed: number }): TestEnvironment => {
    assertValidSeed(seed);
    let now = START_TIME;
    let nextTimerHandle = 1;
    const timers = new Map<number, Timer>();
    const microtasks: (() => void)[] = [];
    const frames = createBatch();
    const idle = createBatch();
    const idCounts = new Map<IdKind, number>();

    const nextDueTimer = (until: number): Timer | undefined => {
        let next: Timer | undefined;
        for (const timer of timers.values()) {
            if (timer.due > until) {
                continue;
            }
            if (next === undefined || timer.due < next.due) {
                next = timer;
            }
        }
        return next;
    };

    return {
        clock: {
            now: () => now,
            setTimeout: (callback, ms) => {
                const handle = nextTimerHandle;
                nextTimerHandle += 1;
                timers.set(handle, { handle, due: now + Math.max(0, ms), callback });
                return handle;
            },
            clearTimeout: (handle) => {
                timers.delete(handle);
            },
        },
        ids: {
            next: (kind) => {
                const count = (idCounts.get(kind) ?? 0) + 1;
                idCounts.set(kind, count);
                return `${kind}-${count}`;
            },
        },
        random: createRandom(seed),
        scheduler: {
            microtask: (callback) => {
                microtasks.push(callback);
            },
            frame: frames.add,
            cancelFrame: frames.cancel,
            idle: idle.add,
            cancelIdle: idle.cancel,
        },
        advance: (ms) => {
            const until = now + ms;
            let timer = nextDueTimer(until);
            while (timer !== undefined) {
                timers.delete(timer.handle);
                now = timer.due;
                timer.callback();
                timer = nextDueTimer(until);
            }
            now = Math.max(now, until);
        },
        flushMicrotasks: async () => {
            let callback = microtasks.shift();
            while (callback !== undefined) {
                callback();
                // Lets promise continuations that the callback started run before the next one.
                await Promise.resolve();
                callback = microtasks.shift();
            }
        },
        flushFrames: frames.flush,
        flushIdle: idle.flush,
    };
};
