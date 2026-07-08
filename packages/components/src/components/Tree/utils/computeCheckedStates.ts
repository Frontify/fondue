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
 *
 * By default disabled units are excluded from their ancestor folders' totals. A frozen
 * descendant can never be toggled by a cascade, so counting it would trap the folder at
 * `'indeterminate'` and make its checkbox impossible to switch off. Set
 * `countDisabledInFolderState` to include them, so the folder reads `'indeterminate'`
 * while any disabled descendant stays unchecked.
 *
 * A childless folder may also carry an explicit `isSelected: 'indeterminate'` from props
 * to restore a partial selection whose descendants have not loaded yet. That is a
 * display-only state: a live `checked` membership always wins, and once children load the
 * folder derives from them like any other. A childless indeterminate folder counts as a
 * partial unit, so every ancestor reads `'indeterminate'` and none can reach fully-checked.
 */
export type ComputeCheckedStatesOptions = {
    /**
     * Count disabled descendants toward a folder's checkbox state. Off by default so a
     * frozen descendant never traps its ancestor folder at `'indeterminate'`.
     */
    countDisabledInFolderState?: boolean;
};

export const computeCheckedStates = (
    items: readonly TreeItemData[],
    checkedIds: ReadonlySet<string>,
    { countDisabledInFolderState = false }: ComputeCheckedStatesOptions = {},
): Map<string, RowCheckedState> => {
    const byId = new Map(items.map((item) => [item.id, item]));
    const states = new Map<string, RowCheckedState>();

    type UnitCount = { units: number; checkedUnits: number; hasIndeterminate: boolean };
    const counts = new Map<string, UnitCount>();

    const visit = (id: string): UnitCount => {
        const cached = counts.get(id);
        if (cached) {
            return cached;
        }
        const item = byId.get(id);
        if (!item) {
            // Orphan ids in parent.children contribute nothing.
            return { units: 0, checkedUnits: 0, hasIndeterminate: false };
        }
        let count: UnitCount;
        if (isCheckableUnit(item)) {
            const isChecked = checkedIds.has(id);
            // Only a childless folder honors an explicit indeterminate; leaves are binary.
            const isIndeterminate = !isChecked && item.isFolder === true && item.isSelected === 'indeterminate';
            count =
                item.isDisabled && !countDisabledInFolderState
                    ? { units: 0, checkedUnits: 0, hasIndeterminate: false }
                    : { units: 1, checkedUnits: isChecked ? 1 : 0, hasIndeterminate: isIndeterminate };
            states.set(id, isChecked ? true : isIndeterminate ? 'indeterminate' : false);
        } else {
            count = { units: 0, checkedUnits: 0, hasIndeterminate: false };
            for (const childId of item.children ?? []) {
                const childCount = visit(childId);
                count.units += childCount.units;
                count.checkedUnits += childCount.checkedUnits;
                count.hasIndeterminate ||= childCount.hasIndeterminate;
            }
            const allChecked = count.units > 0 && count.checkedUnits === count.units && !count.hasIndeterminate;
            const isPartial = count.checkedUnits > 0 || count.hasIndeterminate;
            if (allChecked) {
                states.set(id, true);
            } else if (isPartial) {
                states.set(id, 'indeterminate');
            } else {
                states.set(id, false);
            }
        }
        counts.set(id, count);
        return count;
    };

    for (const item of items) {
        visit(item.id);
    }
    return states;
};
