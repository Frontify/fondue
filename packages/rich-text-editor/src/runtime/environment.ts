/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defaultIdSource, type RuntimeEnvironment } from '#/model';

// Safari has no `requestIdleCallback`, so idle work runs after this timeout there (SPEC-rich-text-quality, Environment seams).
const IDLE_FALLBACK_MS = 50;

/** The environment a mounted editor uses when the host passes none: the browser clock, scheduler and random UUIDs. */
export const browserEnvironment: RuntimeEnvironment = {
    clock: {
        now: () => Date.now(),
        setTimeout: (callback, ms) => window.setTimeout(callback, ms),
        clearTimeout: (handle) => window.clearTimeout(handle),
    },
    ids: defaultIdSource,
    random: () => Math.random(),
    scheduler: {
        microtask: (callback) => queueMicrotask(callback),
        frame: (callback) => requestAnimationFrame(callback),
        cancelFrame: (handle) => cancelAnimationFrame(handle),
        idle: (callback) => {
            if (typeof requestIdleCallback === 'function') {
                return requestIdleCallback(callback);
            }
            return window.setTimeout(callback, IDLE_FALLBACK_MS);
        },
        cancelIdle: (handle) => {
            if (typeof cancelIdleCallback === 'function') {
                cancelIdleCallback(handle);
                return;
            }
            window.clearTimeout(handle);
        },
    },
};
