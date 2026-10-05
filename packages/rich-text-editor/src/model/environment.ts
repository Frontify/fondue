/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Injected clock, ID source, random source and scheduler.
 * Declared here so every entry can take an ID source; `.` and `./testing` re-export it.
 */
export interface RuntimeEnvironment {
    readonly clock: {
        now(): number;
        setTimeout(callback: () => void, ms: number): number;
        clearTimeout(handle: number): void;
    };
    readonly ids: { next(kind: 'node' | 'operation' | 'session' | 'target'): string };
    /** Uniform in [0, 1). */
    readonly random: () => number;
    readonly scheduler: {
        microtask(callback: () => void): void;
        frame(callback: () => void): number;
        cancelFrame(handle: number): void;
        idle(callback: () => void): number;
        cancelIdle(handle: number): void;
    };
}

/** Where new `nodeId`s come from; the package default draws random UUIDs. */
export type IdSource = RuntimeEnvironment['ids'];

const version4Uuid = (): string => {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    const version = bytes[6] ?? 0;
    const variant = bytes[8] ?? 0;
    bytes[6] = (version & 0x0f) | 0x40;
    bytes[8] = (variant & 0x3f) | 0x80;
    const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

/**
 * The ID source that code taking an `ids` option uses when none is passed.
 * It falls back on pages that are not secure contexts.
 */
export const defaultIdSource: IdSource = {
    next: () => (typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : version4Uuid()),
};
