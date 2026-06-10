/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TreeItemData } from '../types';

export type RowCheckedState = boolean | 'indeterminate';

/**
 * A checkable unit may live in `checkedItems`: any leaf, plus any folder with no loaded
 * children (empty, or collapsed while lazy-loading) — checkable as its own entity since
 * there is nothing to cascade to. Folders with children are never units; their state is
 * derived from descendant units.
 */
export const isCheckableUnit = (item: TreeItemData): boolean => !item.isFolder || (item.children ?? []).length === 0;

/** The ids allowed in `checkedItems`, read from the items' `isSelected` props. */
export const getCheckedUnitIds = (items: readonly TreeItemData[]): string[] =>
    // `=== true`: a round-tripped 'indeterminate' is output-only and must not count.
    items.filter((item) => item.isSelected === true && isCheckableUnit(item)).map((item) => item.id);

/**
 * Derives every row's checkbox state: units report their own membership; folders with
 * children aggregate descendant units — `true` when all checked, `'indeterminate'` when
 * some. Single source of truth for `TreeRoot`'s rendering and `buildChangeState`'s
 * report, so checkboxes and the `onChange` payload can never disagree (headless-tree's
 * own `getCheckedState` counts only leaves and would render leafless folders unchecked).
 */
export const computeCheckedStates = (
    items: readonly TreeItemData[],
    checkedIds: ReadonlySet<string>,
): Map<string, RowCheckedState> => {
    const byId = new Map(items.map((item) => [item.id, item]));
    const states = new Map<string, RowCheckedState>();

    type UnitCount = { units: number; checkedUnits: number };
    const counts = new Map<string, UnitCount>();

    const visit = (id: string): UnitCount => {
        const cached = counts.get(id);
        if (cached) {
            return cached;
        }
        const item = byId.get(id);
        if (!item) {
            // Orphan ids in parent.children contribute nothing.
            return { units: 0, checkedUnits: 0 };
        }
        let count: UnitCount;
        if (isCheckableUnit(item)) {
            const isChecked = checkedIds.has(id);
            count = { units: 1, checkedUnits: isChecked ? 1 : 0 };
            states.set(id, isChecked);
        } else {
            count = { units: 0, checkedUnits: 0 };
            for (const childId of item.children ?? []) {
                const childCount = visit(childId);
                count.units += childCount.units;
                count.checkedUnits += childCount.checkedUnits;
            }
            const allChecked = count.units > 0 && count.checkedUnits === count.units;
            states.set(id, allChecked ? true : count.checkedUnits > 0 ? 'indeterminate' : false);
        }
        counts.set(id, count);
        return count;
    };

    for (const item of items) {
        visit(item.id);
    }
    return states;
};
