/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Compares two id lists and returns the entries that were added or removed.
 * Used to fan a single batched setter call out into per-item `onSelectChange`
 * / `onExpandChange` callbacks.
 */
export const diffSelection = (
    prev: readonly string[],
    next: readonly string[],
): { added: string[]; removed: string[] } => {
    const prevSet = new Set(prev);
    const nextSet = new Set(next);
    const added: string[] = [];
    const removed: string[] = [];
    for (const id of nextSet) {
        if (!prevSet.has(id)) {
            added.push(id);
        }
    }
    for (const id of prevSet) {
        if (!nextSet.has(id)) {
            removed.push(id);
        }
    }
    return { added, removed };
};
