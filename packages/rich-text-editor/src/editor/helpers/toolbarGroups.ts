/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ToolbarEntry } from '#/core';

/** `id` is undefined for the entries of plugins with no group. */
export type ToolbarEntryGroup = {
    id: string | undefined;
    entries: readonly ToolbarEntry[];
};

/** Equal orders keep first-seen order; entries of plugins with no group come last, together. */
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
    const ordered = [...grouped.entries()].sort(([, a], [, b]) => a.order - b.order);
    const groups: ToolbarEntryGroup[] = ordered.map(([id, drawn]) => ({ id, entries: drawn.entries }));
    if (ungrouped.length > 0) {
        groups.push({ id: undefined, entries: ungrouped });
    }
    return groups;
};
