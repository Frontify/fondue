/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ToolbarEntry } from '#/core';

/** The entries of one toolbar group, in mount order; `id` is undefined for the entries of plugins with no group. */
export type ToolbarEntryGroup = {
    id: string | undefined;
    entries: readonly ToolbarEntry[];
};

/**
 * The entries by toolbar group in drawing order: lowest `order` first, entries in the order given inside their group.
 * Groups with equal `order` keep the order their ids first appear in; entries of plugins with no group come last, together.
 */
export const toolbarGroupsOf = (entries: readonly ToolbarEntry[]): ToolbarEntryGroup[] => {
    const grouped = new Map<string, { order: number; entries: ToolbarEntry[] }>();
    const ungrouped: ToolbarEntry[] = [];
    for (const entry of entries) {
        const { group } = entry;
        if (group === undefined) {
            ungrouped.push(entry);
            continue;
        }
        const drawn = grouped.get(group.id);
        if (drawn === undefined) {
            grouped.set(group.id, { order: group.order, entries: [entry] });
        } else {
            drawn.entries.push(entry);
        }
    }
    // A stable sort: equal orders keep the order the ids were first seen in.
    const ordered = [...grouped.entries()].sort(([, a], [, b]) => a.order - b.order);
    const groups: ToolbarEntryGroup[] = ordered.map(([id, drawn]) => ({ id, entries: drawn.entries }));
    if (ungrouped.length > 0) {
        groups.push({ id: undefined, entries: ungrouped });
    }
    return groups;
};
