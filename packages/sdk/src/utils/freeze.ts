/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Recursively freeze a value in place. The SDK's data is a static snapshot,
 * so freezing at build time makes the documented immutability real: mutating
 * a shared collection (e.g. sorting `list()` in place) throws instead of
 * silently corrupting every other consumer in the process.
 */
export const deepFreeze = <T>(value: T): T => {
    if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
        Object.freeze(value);
        for (const key of Object.getOwnPropertyNames(value)) {
            deepFreeze((value as Record<string, unknown>)[key]);
        }
    }
    return value;
};
