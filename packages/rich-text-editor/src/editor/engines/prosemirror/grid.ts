/* (c) Copyright Frontify Ltd., all rights reserved. */

import { keymap } from 'prosemirror-keymap';
import { type Node as PmNode, type NodeSpec as PmNodeSpec, type NodeType as PmNodeType } from 'prosemirror-model';
import { type Command, type Plugin as PmPlugin, type Selection as PmSelection } from 'prosemirror-state';
// Renamed: the rest of the editor speaks of grids and slots.
import {
    addRowAfter as addRowBelow,
    CellSelection as SlotSelection,
    goToNextCell as goToNextSlot,
    isInTable as isInGrid,
    tableEditing as engineGridEditing,
    TableMap as GridMap,
} from 'prosemirror-tables';

import {
    type BlockDefinition,
    type GridRole,
    gridSpanOf,
    type PluginRegistry,
    type RteSelectionSnapshot,
} from '#/core';

/**
 * Blocks laid out in rows and columns (`gridRole`), edited as one: a selection
 * that spans slots, keys that move between them, and a grid kept rectangular.
 * Only this file reaches the engine library that does it.
 */

const ENGINE_ROLE: Record<GridRole, string> = {
    grid: 'table',
    row: 'row',
    slot: 'cell',
    headerSlot: 'header_cell',
};

const isSlot = (role: GridRole | undefined): boolean => role === 'slot' || role === 'headerSlot';

/** The attributes a slot needs while editing, whether or not the block stores them. */
const SLOT_ATTRS: PmNodeSpec['attrs'] = {
    colspan: { default: 1 },
    rowspan: { default: 1 },
};

/** The caret and joins never cross the edge of a grid or a slot; a row has nothing to isolate. */
export const gridNodeSpec = (definition: BlockDefinition): Partial<PmNodeSpec> => {
    const role = definition.gridRole;
    if (role === undefined) {
        return {};
    }
    return { tableRole: ENGINE_ROLE[role], isolating: role !== 'row' };
};

/** A slot's spans, under the attributes the block declares itself. */
export const gridSlotAttrs = (definition: BlockDefinition): NonNullable<PmNodeSpec['attrs']> =>
    isSlot(definition.gridRole) ? { ...SLOT_ATTRS } : {};

/** A span beyond what a grid allows would grow every other row to match. */
export const withSpansInRange = (nodeType: PmNodeType, attrs: Record<string, unknown>): Record<string, unknown> => {
    const role: unknown = nodeType.spec.tableRole;
    if (role !== ENGINE_ROLE.slot && role !== ENGINE_ROLE.headerSlot) {
        return attrs;
    }
    return { ...attrs, colspan: gridSpanOf(attrs.colspan), rowspan: gridSpanOf(attrs.rowspan) };
};

export const hasGrids = (registry: PluginRegistry): boolean =>
    [...registry.blocks.values()].some((block) => block.gridRole === 'grid');

/**
 * Tab in the last slot adds a row first. Shift-Tab in the first slot is left
 * to the browser, so focus leaves the editor, even from a list (`outsideGrids`).
 */
const nextSlot: Command = (state, dispatch) => {
    if (goToNextSlot(1)(state, dispatch)) {
        return true;
    }
    if (!isInGrid(state)) {
        return false;
    }
    if (dispatch === undefined) {
        return addRowBelow(state);
    }
    // One transaction, so one undo step.
    return addRowBelow(state, (added) => {
        goToNextSlot(1)(state.apply(added), (moved) => added.setSelection(moved.selection));
        dispatch(added);
    });
};

export const gridKeys = (): PmPlugin => keymap({ Tab: nextSlot, 'Shift-Tab': goToNextSlot(-1) });

/** In a slot, Tab and Shift-Tab belong to the grid keys, even the Shift-Tab they leave to the browser. */
export const outsideGrids =
    (command: Command): Command =>
    (state, dispatch, view) =>
        !isInGrid(state) && command(state, dispatch, view);

export const gridEditing = (): PmPlugin => engineGridEditing();

/** Counted from 0, both ends included; null unless slots are selected. */
export const gridOfSelection = (selection: PmSelection): RteSelectionSnapshot['grid'] => {
    if (!(selection instanceof SlotSelection)) {
        return null;
    }
    const grid = selection.$anchorCell.node(-1);
    const start = selection.$anchorCell.start(-1);
    const rect = GridMap.get(grid).rectBetween(selection.$anchorCell.pos - start, selection.$headCell.pos - start);
    return {
        rows: { from: rect.top, to: rect.bottom - 1 },
        columns: { from: rect.left, to: rect.right - 1 },
    };
};

/** In document order: a selection made upward or leftward lists its ranges from where it started. */
export const textOfSelectedSlots = (doc: PmNode, selection: PmSelection): string =>
    // A copy, since `sort` sorts in place.
    [...selection.ranges]
        .sort((left, right) => left.$from.pos - right.$from.pos)
        .map((range) => doc.textBetween(range.$from.pos, range.$to.pos, ' '))
        .join(' ');
