/* (c) Copyright Frontify Ltd., all rights reserved. */

import { autoJoin } from 'prosemirror-commands';
import {
    type Attrs,
    type Node as PmNode,
    type NodeType as PmNodeType,
    type ResolvedPos,
    type Schema,
} from 'prosemirror-model';
import { liftListItem, sinkListItem, splitListItem as pmSplitListItem, wrapInList } from 'prosemirror-schema-list';
import { type Command, type EditorState, Selection, type Transaction } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi, type PluginRegistry } from '#/core';

import { withCarriedAttrs } from './carriedAttrs';
import { mapChildren } from './documentConversion';
import { warnUnknownType } from './warnings';

/**
 * Lists: which list the caret is in, the commands that edit one, and the keys
 * that only mean something inside one. Which blocks are lists comes from the
 * registry's `itemTypeByList`; where the keys rank among others is set in `keystrokes.ts`.
 */

// Where the caret is

/** A node and the position it sits at. */
type NodeAt = { node: PmNode; pos: number };

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

// Splitting

type MarkupChange = { pos: number; attrs: Attrs };

/** The innermost ancestor of a position that is an item of `itemType`, with the position it sits at. */
const findItem = ($pos: ResolvedPos, itemType: PmNodeType): NodeAt | null => {
    for (let depth = $pos.depth; depth > 0; depth--) {
        const node = $pos.node(depth);
        if (node.type === itemType) {
            return { node, pos: $pos.before(depth) };
        }
    }
    return null;
};

/** Where the item a split made sits: above the caret's item after a split at its very start, else the caret's item. */
const newItemPos = (doc: PmNode, item: NodeAt, splitAtItemStart: boolean): number => {
    const block = item.node.firstChild;
    const previous = doc.resolve(item.pos).nodeBefore;
    // Split at the very start, the text stays in the caret's item and the empty one above is new.
    if (splitAtItemStart && block !== null && block.content.size > 0 && previous !== null) {
        return item.pos - previous.nodeSize;
    }
    return item.pos;
};

/** The item at `pos` back to its type's default attributes, or null when it has them already. */
const resetToDefaults = (doc: PmNode, pos: number): MarkupChange | null => {
    const item = doc.nodeAt(pos);
    if (!item) {
        return null;
    }
    const defaults = item.type.create().attrs;
    if (item.hasMarkup(item.type, defaults, item.marks)) {
        return null;
    }
    return { pos, attrs: defaults };
};

/** The item's first text block with the attributes every text block carries, or null when it has them already. */
const carryIntoFirstBlock = (registry: PluginRegistry, item: NodeAt, source: PmNode): MarkupChange | null => {
    const block = item.node.firstChild;
    if (!block?.isTextblock) {
        return null;
    }
    const attrs = withCarriedAttrs(registry, block, source);
    if (!attrs) {
        return null;
    }
    return { pos: item.pos + 1, attrs };
};

/**
 * `splitListItem`, except the new item starts from its type's default
 * attributes (an unchecked to-do, not a copy of the checked one) and its first
 * text block keeps the attributes every text block carries (alignment).
 */
const splitListItem =
    (registry: PluginRegistry, itemType: PmNodeType): Command =>
    (state, dispatch) => {
        const split = pmSplitListItem(itemType);
        if (!dispatch) {
            return split(state);
        }
        const source = state.selection.$from.parent;
        const { $from: caret } = state.selection;
        // The first child only: at a later child's start the item above still holds earlier content.
        const splitAtItemStart = caret.depth >= 2 && caret.parentOffset === 0 && caret.index(-1) === 0;
        return split(state, (transaction) => {
            const item = findItem(transaction.selection.$from, itemType);
            if (item) {
                const newPos = newItemPos(transaction.doc, item, splitAtItemStart);
                const changes = [resetToDefaults(transaction.doc, newPos)];
                if (newPos === item.pos) {
                    changes.push(carryIntoFirstBlock(registry, item, source));
                }
                for (const change of changes) {
                    if (change) {
                        transaction.setNodeMarkup(change.pos, undefined, change.attrs);
                    }
                }
            }
            dispatch(transaction);
        });
    };

/** Same-type lists left side by side join, so numbering carries on; a join keeps only the first list's attributes. */
const joiningLists = (command: Command, itemTypeByList: Map<string, string>): Command =>
    autoJoin(command, (before, after) => itemTypeByList.has(before.type.name) && before.sameMarkup(after));

// The list half of the control API

/** Implements `EditorControlApi['lists']` against the live view. */
export const createListApi = (
    getView: () => EditorView,
    schema: Schema,
    registry: PluginRegistry,
): EditorControlApi['lists'] => {
    const { itemTypeByList } = registry;
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
                joiningLists(wrapInList(listType), itemTypeByList)(view.state, view.dispatch);
            } else if (current.node.type === listType) {
                runListCommand(liftListItem);
            } else {
                joiningLists((state, dispatch) => {
                    // One step: a check list holding bullet items (or the reverse)
                    // is invalid content, so converting in two steps would throw.
                    const converted = listType.create(
                        current.node.attrs,
                        mapChildren(current.node, (item) =>
                            item.type === itemType ? item : itemType.create(item.attrs, item.content),
                        ),
                    );
                    const transaction = state.tr.replaceWith(
                        current.pos,
                        current.pos + current.node.nodeSize,
                        converted,
                    );
                    // Same structure and size, so the selection's positions still hold; mapped, it would leave the replaced list.
                    transaction.setSelection(Selection.fromJSON(transaction.doc, state.selection.toJSON()));
                    dispatch?.(transaction);
                    return true;
                }, itemTypeByList)(view.state, view.dispatch);
            }
            view.focus();
        },
        indent: () => runListCommand(sinkListItem),
        outdent: () => runListCommand(liftListItem),
        split: () => runListCommand((itemType) => splitListItem(registry, itemType)),
        unwrapAll() {
            const view = getView();
            const { from, to } = view.state.selection;
            const lists: NodeAt[] = [];
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
