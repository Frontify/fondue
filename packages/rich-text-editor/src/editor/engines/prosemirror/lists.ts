/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode, type NodeType as PmNodeType, type Schema, type Slice } from 'prosemirror-model';
import { liftListItem, sinkListItem, splitListItem as pmSplitListItem, wrapInList } from 'prosemirror-schema-list';
import { type Command, type EditorState, Plugin, type Transaction } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi, type PluginRegistry } from '#/core';

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

// Splitting a list

/**
 * Gives the second half of each list that `transactions` split its type's
 * default attributes: it is a new list, and the engine's split copies the
 * first half's (a numbered list's start) onto it. Of the lists a list with
 * attributes became, the first keeps them, even when its first item was
 * taken out.
 */
const restartSplitLists = (
    before: PmNode,
    transactions: readonly Transaction[],
    transaction: Transaction,
    itemTypeByList: Map<string, string>,
): Transaction | null => {
    const attributed: { list: PmNode; pos: number }[] = [];
    before.descendants((node, pos) => {
        if (itemTypeByList.has(node.type.name) && !node.hasMarkup(node.type)) {
            attributed.push({ list: node, pos });
        }
        return !node.isTextblock;
    });
    const map = (pos: number, assoc: number): number =>
        transactions.reduce((mapped, each) => each.mapping.map(mapped, assoc), pos);
    const { doc } = transaction;
    for (const { list, pos } of attributed) {
        // A split leaves the halves where the list stood, at its depth.
        const depth = before.resolve(pos).depth;
        let first = true;
        doc.nodesBetween(map(pos, 1), map(pos + list.nodeSize, -1), (node, at) => {
            if (!node.hasMarkup(list.type, list.attrs) || doc.resolve(at).depth !== depth) {
                return !node.isTextblock;
            }
            if (!first) {
                // The same size, so the other positions stay valid.
                transaction.setNodeMarkup(at, undefined, null);
            }
            first = false;
            return false;
        });
    }
    if (!transaction.docChanged) {
        return null;
    }
    return transaction;
};

/** Only a replace whose slice opens or closes a node can split one; typing never does. */
const mightSplit = (transaction: Transaction): boolean =>
    transaction.steps.some((step) => {
        // The replace steps are the ones with a slice; the step classes live in a package this one does not depend on.
        const { slice } = step as { slice?: Slice };
        return slice !== undefined && (slice.openStart > 0 || slice.openEnd > 0);
    });

/** Restarts the lists any change splits: list commands, a block inserted or pasted inside a list. */
export const restartSplitListsPlugin = (itemTypeByList: Map<string, string>): Plugin =>
    new Plugin({
        appendTransaction: (transactions, oldState, newState) => {
            if (!transactions.some(mightSplit)) {
                return null;
            }
            return restartSplitLists(oldState.doc, transactions, newState.tr, itemTypeByList);
        },
    });

// The list half of the control API

/** Implements `EditorControlApi['lists']` against the live view. */
export const createListApi = (
    getView: () => EditorView,
    schema: Schema,
    { itemTypeByList }: PluginRegistry,
): EditorControlApi['lists'] => {
    /** Run one of the engine's list commands against the item type in scope. */
    const runListCommand = (command: (itemType: PmNodeType) => Command): boolean => {
        const view = getView();
        const itemType = findItemType(view.state, itemTypeByList, schema);
        if (!itemType) {
            return false;
        }
        return command(itemType)(view.state, view.dispatch, view);
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
                wrapInList(listType)(view.state, view.dispatch);
            } else if (current.node.type === listType) {
                runListCommand(liftListItem);
            } else {
                // One step: a check list holding bullet items (or the reverse)
                // is invalid content, so converting in two steps would throw.
                const converted = listType.create(
                    current.node.attrs,
                    mapChildren(current.node, (item) =>
                        item.type === itemType ? item : itemType.create(item.attrs, item.content),
                    ),
                );
                view.dispatch(view.state.tr.replaceWith(current.pos, current.pos + current.node.nodeSize, converted));
            }
            view.focus();
        },
        indent: () => runListCommand(sinkListItem),
        outdent: () => runListCommand(liftListItem),
        split: () => runListCommand(pmSplitListItem),
        unwrapAll() {
            const view = getView();
            const { from, to } = view.state.selection;
            const lists: { node: PmNode; pos: number }[] = [];
            view.state.doc.nodesBetween(from, to, (node, pos) => {
                if (!itemTypeByList.has(node.type.name)) {
                    return true;
                }
                // Outermost lists only: their nested ones come along below.
                lists.push({ node, pos });
                return false;
            });
            if (lists.length === 0) {
                return false;
            }

            const transaction = view.state.tr;
            const contentOf = (list: PmNode): PmNode[] =>
                mapChildren(list, (item) =>
                    mapChildren(item, (child) => (itemTypeByList.has(child.type.name) ? contentOf(child) : [child])),
                ).flat(2);
            // From the end backwards, so the earlier positions stay valid.
            for (const { node, pos } of [...lists].reverse()) {
                transaction.replaceWith(pos, pos + node.nodeSize, contentOf(node));
            }
            view.dispatch(transaction);
            view.focus();
            return true;
        },
    };
};

// Leaving lists

/** More than any realistic nesting: a guard so a command that never settles cannot hang the editor. */
const MAX_NESTING = 32;

/**
 * The transactions that take every list item the selection touches out of its
 * list, nested levels included, in the order they apply. Empty when the
 * selection is in no list. The caller decides whether to dispatch them, so a
 * follow-up edit can share one undo step with them.
 */
export const liftOutOfLists = (
    state: EditorState,
    { itemTypeByList }: PluginRegistry,
    schema: Schema,
): Transaction[] => {
    const itemTypes = [...new Set(itemTypeByList.values())].flatMap((name) => schema.nodes[name] ?? []);
    const transactions: Transaction[] = [];
    let current = state;
    for (let round = 0; round < MAX_NESTING; round++) {
        let lifted: Transaction | null = null;
        for (const itemType of itemTypes) {
            if (liftListItem(itemType)(current, (transaction) => (lifted = transaction))) {
                break;
            }
        }
        if (lifted === null) {
            break;
        }
        transactions.push(lifted);
        current = current.apply(lifted);
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

/** A caret in an empty block — where Enter in a list means "leave it" rather than "split it". */
const inEmptyBlock = (state: EditorState): boolean => {
    const { $from, empty } = state.selection;
    return empty && $from.parent.isTextblock && $from.parent.content.size === 0;
};

/**
 * Enter, Tab, Shift-Tab and Backspace inside a list. They belong to being in a
 * list, so any feature declaring `content: { items }` gets them. Outside a list
 * they report "not handled" and the baseline keymap takes over.
 */
export const listKeys = (api: EditorControlApi, itemTypeByList: Map<string, string>): Record<string, Command> => ({
    // The engine's own split deliberately refuses on an empty item at the top
    // level, leaving it to be lifted out of the list instead. It also refuses
    // a range across blocks or a selected node; those go to the baseline keymap.
    Enter: (state) => api.lists.split() || (inEmptyBlock(state) && api.lists.outdent()),
    Tab: () => api.lists.indent(),
    'Shift-Tab': () => api.lists.outdent(),
    // At the start of an item, lift it out one level (out of the list at the
    // top) — the engine's own Backspace would join it into the item above as a
    // bare paragraph.
    Backspace: (state) => atItemStart(state, itemTypeByList) && api.lists.outdent(),
});
