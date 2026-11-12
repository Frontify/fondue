/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode, type NodeType as PmNodeType, type Schema } from 'prosemirror-model';
import { liftListItem, sinkListItem, splitListItem as pmSplitListItem, wrapInList } from 'prosemirror-schema-list';
import { type Command, type EditorState, type Selection, TextSelection, type Transaction } from 'prosemirror-state';
import { Mapping } from 'prosemirror-transform';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi, type PluginRegistry } from '#/core';

import { type Dispatch } from './dispatch';
import { mapChildren } from './documentConversion';
import { warnUnknownType } from './warnings';

/**
 * Lists: which list the caret is in, the commands that edit one, and the keys
 * that only mean something inside one. Which blocks are lists comes from the
 * registry's `itemTypeByList`; where the keys rank among others is set in `keystrokes.ts`.
 */

// Where the caret is

/** The innermost ancestor that is a list of items, with the position it sits at. */
const findList = (state: EditorState, itemTypeByList: Map<string, string>): { node: PmNode; pos: number } | null => {
    const { $from } = state.selection;
    for (let depth = $from.depth; depth > 0; depth--) {
        const node = $from.node(depth);
        if (itemTypeByList.has(node.type.name)) {
            return { node, pos: $from.before(depth) };
        }
    }
    return null;
};

/** The item type of the innermost list the selection sits in — what the list commands need. */
const findItemType = (state: EditorState, itemTypeByList: Map<string, string>, schema: Schema): PmNodeType | null => {
    const list = findList(state, itemTypeByList);
    const itemName = list ? itemTypeByList.get(list.node.type.name) : undefined;
    return (itemName ? schema.nodes[itemName] : undefined) ?? null;
};

/** A caret in an empty block — where Enter in a list means "leave it" rather than "split it". */
const inEmptyBlock = (state: EditorState): boolean => {
    const { $from, empty } = state.selection;
    return empty && $from.parent.isTextblock && $from.parent.content.size === 0;
};

// The list half of the control API

/** Implements `EditorControlApi['lists']` against the live view. */
export const createListApi = (
    getView: () => EditorView,
    schema: Schema,
    { itemTypeByList }: PluginRegistry,
    dispatch: Dispatch,
): EditorControlApi['lists'] => {
    /** Run one of the engine's list commands against the item type in scope. */
    const runListCommand = (command: (itemType: PmNodeType) => Command): boolean => {
        const view = getView();
        const itemType = findItemType(view.state, itemTypeByList, schema);
        if (!itemType) {
            return false;
        }
        return command(itemType)(view.state, dispatch, view);
    };

    return {
        toggle(type) {
            const listType = schema.nodes[type];
            const itemName = itemTypeByList.get(type);
            const itemType = itemName ? schema.nodes[itemName] : undefined;
            if (!listType || !itemType) {
                warnUnknownType('lists.toggle', type);
                return;
            }
            const view = getView();
            const current = findList(view.state, itemTypeByList);

            if (!current) {
                wrapInList(listType)(view.state, dispatch);
            } else if (current.node.type === listType) {
                runListCommand(liftListItem);
            } else {
                // One step: a list holding items of another list's type
                // is invalid content, so converting in two steps would throw.
                const converted = listType.create(
                    current.node.attrs,
                    mapChildren(current.node, (item) =>
                        item.type === itemType ? item : itemType.create(item.attrs, item.content),
                    ),
                );
                dispatch(view.state.tr.replaceWith(current.pos, current.pos + current.node.nodeSize, converted));
            }
            view.focus();
        },
        indent: () => runListCommand(sinkListItem),
        outdent: () => runListCommand(liftListItem),
        split() {
            if (runListCommand(pmSplitListItem)) {
                return true;
            }
            // The engine's split refuses an empty top-level item, which Enter leaves the list from instead.
            if (inEmptyBlock(getView().state)) {
                return runListCommand(liftListItem);
            }
            return false;
        },
    };
};

// Leaving lists

/** More than any realistic nesting: a guard so a command that never settles cannot hang the editor. */
const MAX_NESTING = 32;

/** The outermost lists the selection touches, each with the part of the selection inside it, last first. */
const touchedLists = (
    doc: PmNode,
    { from, to }: Selection,
    itemTypeByList: Map<string, string>,
): { from: number; to: number }[] => {
    const parts: { from: number; to: number }[] = [];
    doc.nodesBetween(from, to, (node, pos) => {
        if (!itemTypeByList.has(node.type.name)) {
            return true;
        }
        parts.unshift({ from: Math.max(from, pos + 1), to: Math.min(to, pos + node.nodeSize - 1) });
        return false;
    });
    return parts;
};

/**
 * One lift of the selected items of a list out one level, in the last touched list that has some; null when none has.
 * The list command works on a single list, so each sees only the part of the selection inside it.
 */
const liftOnce = (
    state: EditorState,
    selection: Selection,
    itemTypeByList: Map<string, string>,
    itemTypes: readonly PmNodeType[],
): Transaction | null => {
    for (const part of touchedLists(state.doc, selection, itemTypeByList)) {
        const inside = TextSelection.between(state.doc.resolve(part.from), state.doc.resolve(part.to));
        const narrowed = state.apply(state.tr.setSelection(inside));
        for (const itemType of itemTypes) {
            const lifts: Transaction[] = [];
            if (liftListItem(itemType)(narrowed, (transaction) => lifts.push(transaction))) {
                return lifts[0] ?? null;
            }
        }
    }
    return null;
};

/**
 * The transactions that take every list item the selection touches out of its
 * list, nested levels included and across as many lists as it spans, in the
 * order they apply. Empty when the selection is in no list. The caller decides
 * whether to dispatch them, so a follow-up edit can share one undo step with
 * them.
 */
export const liftOutOfLists = (
    state: EditorState,
    { itemTypeByList }: PluginRegistry,
    schema: Schema,
): Transaction[] => {
    const itemTypes = [...new Set(itemTypeByList.values())].flatMap((name) => schema.nodes[name] ?? []);
    const transactions: Transaction[] = [];
    const mapping = new Mapping();
    let current = state;
    for (let round = 0; round < MAX_NESTING; round++) {
        // The selection the caller had, moved past the lifts so far.
        const selection = state.selection.map(current.doc, mapping);
        const lifted = liftOnce(current, selection, itemTypeByList, itemTypes);
        if (lifted === null) {
            break;
        }
        transactions.push(lifted);
        for (const step of lifted.steps) {
            mapping.appendMap(step.getMap());
        }
        current = current.apply(lifted);
    }
    if (transactions.length > 0) {
        // Back on what the caller had selected, whatever the lifts left selected.
        transactions.push(current.tr.setSelection(state.selection.map(current.doc, mapping)));
    }
    return transactions;
};

// The keys that only mean something inside a list

/**
 * The caret sits at the very start of a list item's first block — where
 * Backspace means "this is no longer a list item" rather than "join with what
 * is before".
 */
const atItemStart = (state: EditorState, itemTypeByList: Map<string, string>): boolean => {
    const { $from, empty } = state.selection;
    if (!empty || $from.parentOffset !== 0 || $from.depth < 2) {
        return false;
    }
    const item = $from.node(-1);
    return [...itemTypeByList.values()].includes(item.type.name) && $from.index(-1) === 0;
};

/**
 * Enter, Tab, Shift-Tab and Backspace inside a list. They belong to being in a
 * list, so any feature declaring `content: { items }` gets them. Outside a list
 * they report "not handled" and the baseline keymap takes over.
 */
export const listKeys = (api: EditorControlApi, itemTypeByList: Map<string, string>): Record<string, Command> => ({
    // Refuses a range across blocks or a selected node; those go to the baseline keymap.
    Enter: () => api.lists.split(),
    Tab: () => api.lists.indent(),
    'Shift-Tab': () => api.lists.outdent(),
    // At the start of an item, lift it out one level (out of the list at the
    // top) — the engine's own Backspace would join it into the item above as a
    // bare paragraph.
    Backspace: (state) => atItemStart(state, itemTypeByList) && api.lists.outdent(),
});
