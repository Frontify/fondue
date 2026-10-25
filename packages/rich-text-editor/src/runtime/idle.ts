/* (c) Copyright Frontify Ltd., all rights reserved. */

const tasks = new Set<() => void>();
let cancelWait: (() => void) | undefined;

const run = () => {
    cancelWait = undefined;
    const due = [...tasks];
    tasks.clear();
    for (const task of due) {
        task();
    }
};

/**
 * Runs `task` once the page is idle. Tasks asked for before then share one idle callback; the returned function
 * removes a task that has not run, and the callback with the last one.
 */
export const whenIdle = (task: () => void): (() => void) => {
    tasks.add(task);
    if (cancelWait === undefined) {
        if (typeof requestIdleCallback === 'function') {
            const id = requestIdleCallback(run);
            cancelWait = () => cancelIdleCallback(id);
        } else {
            const id = setTimeout(run, 0);
            cancelWait = () => clearTimeout(id);
        }
    }
    return () => {
        tasks.delete(task);
        if (tasks.size === 0) {
            cancelWait?.();
            cancelWait = undefined;
        }
    };
};
