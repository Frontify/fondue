/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Slack for subpixel layout, which rounds an exact fit either way. */
const TOLERANCE = 0.5;

export type FittingSlotCountParams = {
    /** Each group's slot widths, in drawing order. */
    groups: readonly (readonly number[])[];
    /** The space between two groups, which is also reserved before More: the divider and the gaps either side of it. */
    gap: number;
    itemGap: number;
    /** The More button's width. */
    more: number;
    available: number;
};

const gapBefore = (firstInGroup: boolean, drawnBefore: number, gap: number, itemGap: number): number => {
    if (drawnBefore === 0) {
        return 0;
    }
    if (firstInGroup) {
        return gap;
    }
    return itemGap;
};

/** Each slot's width plus the gap before it, in drawing order; a slot of no width takes no space and no gap. */
const slotAdvances = (groups: readonly (readonly number[])[], gap: number, itemGap: number): number[] => {
    const advances: number[] = [];
    let drawnBefore = 0;
    for (const group of groups) {
        let drawnInGroup = 0;
        for (const width of group) {
            if (width === 0) {
                advances.push(0);
                continue;
            }
            advances.push(width + gapBefore(drawnInGroup === 0, drawnBefore, gap, itemGap));
            drawnInGroup += 1;
            drawnBefore += 1;
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
 * and the gap before it are reserved at the row's end. A slot of width 0 takes
 * no space and no gap, and does not count as a slot before the next one, so a
 * group of such slots adds nothing.
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
