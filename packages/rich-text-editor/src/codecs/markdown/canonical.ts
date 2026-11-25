/* (c) Copyright Frontify Ltd., all rights reserved. */

// Comparing the values a document and a form store.

/** How deep a document's blocks, and the values stored in it, are followed before the rest is a loss. */
export const MAX_DEPTH = 100;

/** What a value nested deeper than `MAX_DEPTH` canonicalizes to, which is equal to nothing. */
const TOO_DEEP = Symbol('too deep');

const canonicalAt = (value: unknown, depth: number): unknown => {
    if (depth > MAX_DEPTH) {
        return TOO_DEEP;
    }

    if (Array.isArray(value)) {
        const items = value.map((item) => canonicalAt(item, depth + 1));
        if (items.includes(TOO_DEEP)) {
            return TOO_DEEP;
        }

        return items;
    }

    if (typeof value === 'object' && value !== null) {
        const entries = Object.entries(value)
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([key, item]) => [key, canonicalAt(item, depth + 1)]);
        if (entries.some(([, item]) => item === TOO_DEEP)) {
            return TOO_DEEP;
        }

        return Object.fromEntries(entries);
    }

    return value;
};

/** The value with its keys in order at every depth, so two equal values give the same JSON. */
export const canonicalOf = (value: unknown): unknown => canonicalAt(value, 0);

/** Whether the values hold the same data, whatever the order of their keys. The values are JSON data, so none is cyclic; one nested deeper than `MAX_DEPTH` is never the same. */
export const sameValue = (left: unknown, right: unknown): boolean => {
    const canonicalLeft = canonicalOf(left);
    const canonicalRight = canonicalOf(right);
    if (canonicalLeft === TOO_DEEP || canonicalRight === TOO_DEEP) {
        return false;
    }

    return JSON.stringify(canonicalLeft) === JSON.stringify(canonicalRight);
};
