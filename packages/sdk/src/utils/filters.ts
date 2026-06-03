/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Helpers for evaluating user-supplied filter clauses against bundled data. */

/** Normalize a `value | value[] | undefined` filter clause into a readonly array (or undefined). */
export const toArray = <T>(value: T | readonly T[] | undefined): readonly T[] | undefined => {
    if (value === undefined) {
        return undefined;
    }
    return Array.isArray(value) ? (value as readonly T[]) : [value as T];
};

/** Case-insensitive substring match against any of the candidate strings. */
export const textIncludes = (text: string, candidates: readonly (string | undefined)[]): boolean => {
    const lower = text.toLowerCase();
    return candidates.some((candidate) => candidate?.toLowerCase().includes(lower));
};

/** True if `prefix` is undefined, or the dot-joined keyPath starts with it. */
export const matchesKeyPathPrefix = (keyPath: readonly string[], prefix: string | undefined): boolean => {
    if (!prefix) {
        return true;
    }
    return keyPath.join('.').startsWith(prefix);
};
