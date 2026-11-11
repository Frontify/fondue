/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Slack for subpixel layout, which rounds an exact fit either way. */
const TOLERANCE = 0.5;

export type FittingSlotCountParams = {
    /** Each group's slot widths, in drawing order. */
    groups: readonly (readonly number[])[];
    gap: number;
    itemGap: number;
    /** The More button's width. */
    more: number;
    available: number;
};

const gapBefore = (indexInGroup: number, slotsBefore: number, gap: number, itemGap: number): number => {
    if (slotsBefore === 0) {
        return 0;
    }
    if (indexInGroup === 0) {
        return gap;
    }
    return itemGap;
};

/** Each slot's width plus the gap before it, in drawing order. */
const slotAdvances = (groups: readonly (readonly number[])[], gap: number, itemGap: number): number[] => {
    const advances: number[] = [];
    for (const group of groups) {
        for (const [index, width] of group.entries()) {
            advances.push(width + gapBefore(index, advances.length, gap, itemGap));
        }
    }
    return advances;
};

/** How many leading advances fit under the limit. */
const leadingCount = (advances: readonly number[], limit: number): number => {
    let used = 0;
    let count = 0;
    for (const advance of advances) {
        if (used + advance > limit + TOLERANCE) {
            return count;
        }
        used += advance;
        count += 1;
    }
    return count;
};

/**
 * How many leading slots of a one-row toolbar fit in its width. Groups sit
 * `gap` apart and their slots `itemGap` apart; when not every slot fits, More
 * and the gap before it are reserved at the row's end.
 */
export const fittingSlotCount = ({ groups, gap, itemGap, more, available }: FittingSlotCountParams): number => {
    const advances = slotAdvances(groups, gap, itemGap);
    if (leadingCount(advances, available) === advances.length) {
        return advances.length;
    }
    return leadingCount(advances, available - gap - more);
};

export type SlotGroup<TItem> = { key: string; items: readonly TItem[] };

export type GroupSplit<TItem> = { row: SlotGroup<TItem>[]; overflow: SlotGroup<TItem>[] };

/** The first `shown` slots for the row and the rest for More, each side keeping the groups and their order. */
export const splitGroups = <TItem>(groups: readonly SlotGroup<TItem>[], shown: number): GroupSplit<TItem> => {
    const row: SlotGroup<TItem>[] = [];
    const overflow: SlotGroup<TItem>[] = [];
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
