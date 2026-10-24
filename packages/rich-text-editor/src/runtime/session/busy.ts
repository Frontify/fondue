/* (c) Copyright Frontify Ltd., all rights reserved. */

export interface Busy {
    run<T>(work: () => T): T;
    isBusy(): boolean;
    onIdle(...hooks: (() => void)[]): void;
    afterEach(...hooks: (() => void)[]): void;
}

export const createBusy = (): Busy => {
    const idle: (() => void)[] = [];
    const after: (() => void)[] = [];
    let depth = 0;
    const run = <T>(work: () => T): T => {
        depth += 1;
        try {
            return work();
        } finally {
            depth -= 1;
            if (depth === 0) {
                for (const hook of idle) {
                    hook();
                }
            }
            for (const hook of after) {
                hook();
            }
        }
    };
    return {
        run,
        isBusy: () => depth > 0,
        onIdle: (...hooks) => idle.push(...hooks),
        afterEach: (...hooks) => after.push(...hooks),
    };
};
