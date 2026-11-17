/* (c) Copyright Frontify Ltd., all rights reserved. */

import { keymap } from 'prosemirror-keymap';
import { type Node as PmNode, type NodeSpec as PmNodeSpec, type NodeType as PmNodeType } from 'prosemirror-model';
import {
    type Command,
    EditorState,
    Plugin as PmPlugin,
    type Selection as PmSelection,
    type Transaction,
} from 'prosemirror-state';
// Renamed: the rest of the editor speaks of grids and slots.
import {
    addColumnAfter,
    addColumnBefore,
    addRowAfter as addRowBelow,
    addRowBefore as addRowAbove,
    CellSelection as SlotSelection,
    deleteColumn as removeColumns,
    deleteRow as removeRows,
    deleteTable as removeGrid,
    goToNextCell as goToNextSlot,
    isInTable as isInGrid,
    selectedRect,
    tableEditing as engineGridEditing,
    TableMap as GridMap,
    toggleHeader,
} from 'prosemirror-tables';
import { type EditorView } from 'prosemirror-view';

import {
    type BlockDefinition,
    type EditorControlApi,
    type GridRole,
    gridSpanOf,
    type PluginRegistry,
    type RteSelectionSnapshot,
} from '#/core';

import { HOST_DOC } from './transactionMeta';

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
    // One transaction, so one undo step. The move is found on a bare state:
    // `state.apply` would also run other plugins' appended changes.
    return addRowBelow(state, (added) => {
        const bare = EditorState.create({ doc: added.doc, selection: added.selection });
        goToNextSlot(1)(bare, (moved) => added.setSelection(moved.selection));
        dispatch(added);
    });
};

export const gridKeys = (): PmPlugin => keymap({ Tab: nextSlot, 'Shift-Tab': goToNextSlot(-1) });

/** In a slot, Tab and Shift-Tab belong to the grid keys, even the Shift-Tab they leave to the browser. */
export const outsideGrids =
    (command: Command): Command =>
    (state, dispatch, view) =>
        !isInGrid(state) && command(state, dispatch, view);

export const gridEditing = (): PmPlugin[] => [engineGridEditing(), keepHeaderScopes()];

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

const isHeaderSlot = (node: PmNode | null | undefined): boolean => node?.type.spec.tableRole === ENGINE_ROLE.headerSlot;

/** A header slot labels its column when its whole row is header slots, else its row. */
const setRowScopes = (transaction: Transaction, row: PmNode, rowPosition: number): void => {
    let scope = 'row';
    if (row.children.every(isHeaderSlot)) {
        scope = 'col';
    }
    let position = rowPosition + 1;
    for (const slot of row.children) {
        if (isHeaderSlot(slot) && 'scope' in (slot.type.spec.attrs ?? {}) && slot.attrs.scope !== scope) {
            transaction.setNodeAttribute(position, 'scope', scope);
        }
        position += slot.nodeSize;
    }
};

/** Calls `visit` for each grid row in `current` that is not the same node as before. */
const forChangedRows = (
    before: PmNode | undefined,
    current: PmNode,
    offset: number,
    visit: (row: PmNode, position: number) => void,
): void => {
    let position = offset;
    for (let index = 0; index < current.childCount; index++) {
        const child = current.child(index);
        const old = before?.maybeChild(index);
        if (child !== old && child.type.spec.tableRole === ENGINE_ROLE.row) {
            visit(child, position);
        } else if (child !== old && !child.isTextblock && !child.isLeaf) {
            forChangedRows(old?.type === child.type ? old : undefined, child, position + 1, visit);
        }
        position += child.nodeSize;
    }
};

/**
 * Keeps header scopes right after any user change to a grid: a toggle, an
 * added row or column, Tab adding a row. A document the host sets is left as
 * it came, so the editor never changes it without telling the host.
 */
const keepHeaderScopes = (): PmPlugin =>
    new PmPlugin({
        appendTransaction: (transactions, oldState, state) => {
            const userChanged = transactions.some(
                (transaction) => transaction.docChanged && transaction.getMeta(HOST_DOC) !== true,
            );
            if (!userChanged) {
                return null;
            }
            const transaction = state.tr;
            forChangedRows(oldState.doc, state.doc, 0, (row, position) => setRowScopes(transaction, row, position));
            if (!transaction.docChanged) {
                return null;
            }
            return transaction;
        },
    });

const ADD = {
    row: { before: addRowAbove, after: addRowBelow },
    column: { before: addColumnBefore, after: addColumnAfter },
};

const REMOVE_SELECTED = { row: removeRows, column: removeColumns };

export const createGridApi = (getView: () => EditorView): EditorControlApi['grid'] => {
    const run = (command: Command): boolean => {
        const view = getView();
        const changed = command(view.state, view.dispatch);
        if (changed) {
            view.focus();
        }
        return changed;
    };

    return {
        shape() {
            const { state } = getView();
            if (!isInGrid(state)) {
                return null;
            }
            // A caret's slot counts with all the rows and columns it spans.
            const { map, table, top, bottom, left, right } = selectedRect(state);
            const allHeaders = (width: number, height: number): boolean =>
                map
                    .cellsInRect({ left: 0, top: 0, right: width, bottom: height })
                    .every((cell) => isHeaderSlot(table.nodeAt(cell)));
            return {
                rows: map.height,
                columns: map.width,
                selectedRows: bottom - top,
                selectedColumns: right - left,
                headerRow: allHeaders(map.width, 1),
                headerColumn: allHeaders(1, map.height),
            };
        },
        add: (axis, side) => run(ADD[axis][side]),
        removeSelected: (axis) => run(REMOVE_SELECTED[axis]),
        removeGrid: () => run(removeGrid),
        toggleHeader: (axis) => run(toggleHeader(axis)),
    };
};
