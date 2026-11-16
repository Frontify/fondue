/* (c) Copyright Frontify Ltd., all rights reserved. */

const warnedKeys = new Set<string>();

/**
 * Dev-only warning, once per key; production stays silent.
 *
 * @param key - What makes this warning the same one again, such as `unknown-block:callout`.
 * @param detail - Logged after the message when given.
 */
export const warnOnce = (key: string, message: string, detail?: unknown): void => {
    if (process.env.NODE_ENV === 'production' || warnedKeys.has(key)) {
        return;
    }
    warnedKeys.add(key);
    if (detail === undefined) {
        console.warn(message);
        return;
    }
    console.warn(message, detail);
};
