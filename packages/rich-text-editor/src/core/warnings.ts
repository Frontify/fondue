/* (c) Copyright Frontify Ltd., all rights reserved. */

const warnedKeys = new Set<string>();

/**
 * Dev-only warning, once per key. Give a key that names the warning and what it is about, so two warnings never share one; production stays silent.
 *
 * @param key - What makes this warning the same one again, such as `unknown-block:callout`.
 * @param detail - What was thrown or received, logged after the message when there is one.
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
