/* (c) Copyright Frontify Ltd., all rights reserved. */

// Subpixel layout rounds an exact fit either way.
const TOLERANCE = 0.5;

/**
 * How many leading slots of a one-row toolbar fit in its width. Groups sit
 * `gap` apart and their slots touch; when not every slot fits, More and the gap
 * before it are reserved at the row's end.
 */
export const fittingSlotCount = ({
    groups,
    gap,
    more,
    available,
}: {
    /** Each group's slot widths, in drawing order. */
    groups: readonly (readonly number[])[];
    gap: number;
    /** The More button's width. */
    more: number;
    available: number;
}): number => {
    let total = 0;
    let count = 0;
    for (const [index, group] of groups.entries()) {
        if (index > 0) {
            total += gap;
        }
        for (const width of group) {
            total += width;
            count += 1;
        }
    }
    if (total <= available + TOLERANCE) {
        return count;
    }

    const limit = available - gap - more;
    let used = 0;
    let shown = 0;
    for (const group of groups) {
        for (const [index, width] of group.entries()) {
            let needed = width;
            if (index === 0 && shown > 0) {
                needed += gap;
            }
            if (used + needed > limit + TOLERANCE) {
                return shown;
            }
            used += needed;
            shown += 1;
        }
    }
    return shown;
};

export type SlotGroup<Item> = { key: string; items: readonly Item[] };

/** The first `shown` slots for the row and the rest for More, each side keeping the groups and their order. */
export const splitGroups = <Item>(
    groups: readonly SlotGroup<Item>[],
    shown: number,
): { row: SlotGroup<Item>[]; overflow: SlotGroup<Item>[] } => {
    const row: SlotGroup<Item>[] = [];
    const overflow: SlotGroup<Item>[] = [];
    let left = shown;
    for (const group of groups) {
        const kept = group.items.slice(0, Math.max(left, 0));
        const moved = group.items.slice(kept.length);
        if (kept.length > 0) {
            row.push({ key: group.key, items: kept });
        }
        if (moved.length > 0) {
            overflow.push({ key: group.key, items: moved });
        }
        left -= kept.length;
    }
    return { row, overflow };
};
