/* (c) Copyright Frontify Ltd., all rights reserved. */

import { keymap } from 'prosemirror-keymap';
import { type Node as PmNode, type NodeSpec as PmNodeSpec, type NodeType as PmNodeType } from 'prosemirror-model';
import { type Command, type Plugin as PmPlugin, type Selection as PmSelection } from 'prosemirror-state';
// Renamed on the way in: the rest of the editor speaks of grids and slots.
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
 * The engine library that does this is reached from this file only; nothing
 * of it leaves here.
 *
 * - `gridNodeSpec`: what a block's role adds to its engine node.
 * - `gridKeys` / `gridEditing`: the keys and the editing plugin, only present
 *   when a grid exists.
 * - `gridOfSelection`: what the selection snapshot reports for a selection of slots.
 */

/** The engine library's name for each role. */
const ENGINE_ROLE: Record<GridRole, string> = {
    grid: 'table',
    row: 'row',
    slot: 'cell',
    headerSlot: 'header_cell',
};

/** Whether a slot role, which carries spans. */
const isSlot = (role: GridRole | undefined): boolean => role === 'slot' || role === 'headerSlot';

/** The attributes a slot needs while editing, whether or not the block stores them. */
const SLOT_ATTRS: PmNodeSpec['attrs'] = {
    colspan: { default: 1 },
    rowspan: { default: 1 },
    colwidth: { default: null },
};

/**
 * What a block's grid role adds to its node: the role, isolation (the caret
 * and joins never cross a slot's or the grid's edge), and a slot's spans.
 */
export const gridNodeSpec = (definition: BlockDefinition): Partial<PmNodeSpec> => {
    const role = definition.gridRole;
    if (role === undefined) {
        return {};
    }
    return {
        tableRole: ENGINE_ROLE[role],
        ...(role === 'row' ? {} : { isolating: true }),
    };
};

/** A slot's spans, under the attributes the block declares itself. */
export const gridSlotAttrs = (definition: BlockDefinition): NonNullable<PmNodeSpec['attrs']> =>
    isSlot(definition.gridRole) ? { ...SLOT_ATTRS } : {};

/**
 * A slot's attributes with its spans in range, as a stored document comes in:
 * a span beyond what a grid allows would grow every other row to match.
 */
export const withSpansInRange = (nodeType: PmNodeType, attrs: Record<string, unknown>): Record<string, unknown> => {
    const role: unknown = nodeType.spec.tableRole;
    if (role !== ENGINE_ROLE.slot && role !== ENGINE_ROLE.headerSlot) {
        return attrs;
    }
    return { ...attrs, colspan: gridSpanOf(attrs.colspan), rowspan: gridSpanOf(attrs.rowspan) };
};

/** Whether any mounted block is a grid. */
export const hasGrids = (registry: PluginRegistry): boolean =>
    [...registry.blocks.values()].some((block) => block.gridRole === 'grid');

/**
 * Tab and Shift-Tab move to the next and the previous slot. Tab in the last
 * slot adds a row first. Shift-Tab in the first slot is left alone, so focus
 * leaves the editor the way it does anywhere else, even from a list in that
 * slot (see `outsideGrids`).
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
    // The new row and the move into it are one transaction, so one undo step.
    return addRowBelow(state, (added) => {
        goToNextSlot(1)(state.apply(added), (moved) => added.setSelection(moved.selection));
        dispatch(added);
    });
};

export const gridKeys = (): PmPlugin => keymap({ Tab: nextSlot, 'Shift-Tab': goToNextSlot(-1) });

/**
 * A command that does nothing in a grid. In a slot, Tab and Shift-Tab belong
 * to the grid keys, so a list there must not take the Shift-Tab they leave to
 * the browser.
 */
export const outsideGrids =
    (command: Command): Command =>
    (state, dispatch, view) =>
        !isInGrid(state) && command(state, dispatch, view);

/** Selecting across slots, keeping each grid rectangular, clearing selected slots on Backspace and Delete. */
export const gridEditing = (): PmPlugin => engineGridEditing();

/**
 * The rows and columns a selection of slots covers, counted from 0, both ends
 * included; null for any other selection.
 */
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

/** The text each selected slot holds, slots apart. */
export const textOfSelectedSlots = (doc: PmNode, selection: PmSelection): string =>
    // In document order: a selection made upward or leftward lists its slots from where it started.
    [...selection.ranges]
        .sort((left, right) => left.$from.pos - right.$from.pos)
        .map((range) => doc.textBetween(range.$from.pos, range.$to.pos, ' '))
        .join(' ');
