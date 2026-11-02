/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode, type NodeType as PmNodeType, type Schema } from 'prosemirror-model';
import { liftListItem, sinkListItem, splitListItem as pmSplitListItem, wrapInList } from 'prosemirror-schema-list';
import { type Command, type EditorState, type Transaction } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi, type PluginRegistry } from '#/core';

import { EXTRA_ATTR, mapChildren, RAW_ATTR, UNKNOWN_BLOCK } from './documentConversion';
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

/** The raw block of every unknown block in the document, those within `spared` left out. */
const unknownBlocks = (doc: PmNode, spared?: { from: number; to: number }): unknown[] => {
    const found: unknown[] = [];
    doc.descendants((node, pos) => {
        if (node.type.name !== UNKNOWN_BLOCK) {
            return true;
        }
        if (spared === undefined || pos >= spared.to || pos + node.nodeSize <= spared.from) {
            found.push(node.attrs[RAW_ATTR]);
        }
        return false;
    });
    return found;
};

/** Each unknown block in `before` is still in `after`, unchanged, wherever it now stands. */
const keepsUnknownBlocks = (before: PmNode, after: PmNode, spared?: { from: number; to: number }): boolean => {
    const previous = unknownBlocks(before, spared);
    // The usual document has none, and then the result need not be walked.
    if (previous.length === 0) {
        return true;
    }
    const standing = unknownBlocks(after);
    for (const raw of previous) {
        const index = standing.indexOf(raw);
        if (index === -1) {
            return false;
        }
        standing.splice(index, 1);
    }
    return true;
};

/**
 * Block commands take every child of a list for an item, so with an unknown
 * block among them they can drop it or throw. Runs the command aside and
 * applies it only if no such block is lost. A refused command reports false, or
 * true with `handleRefusal`, for a key whose fallback to the baseline keymap
 * would run the same change unguarded. With `spareSelected`, blocks inside the
 * selection are not tracked: the user is deleting them.
 */
export const keepingUnknownBlocks =
    (
        command: Command,
        { handleRefusal = false, spareSelected = false }: { handleRefusal?: boolean; spareSelected?: boolean } = {},
    ): Command =>
    (state, dispatch, view) => {
        const captured: Transaction[] = [];
        try {
            if (!command(state, (transaction) => captured.push(transaction), view)) {
                return false;
            }
        } catch {
            return handleRefusal;
        }
        const [transaction] = captured;
        if (transaction === undefined) {
            return true;
        }
        let spared: { from: number; to: number } | undefined;
        if (spareSelected) {
            spared = state.selection;
        }
        if (!keepsUnknownBlocks(state.doc, transaction.doc, spared)) {
            return handleRefusal;
        }
        dispatch?.(transaction);
        return true;
    };

/** Drops the undeclared stored keys of the block at `pos`: a block a split makes is new, and those keys stay with the one it came from. */
export const clearExtrasAt = (transaction: Transaction, pos: number): void => {
    const node = transaction.doc.nodeAt(pos);
    if (node !== null && node.attrs[EXTRA_ATTR] !== null && node.attrs[EXTRA_ATTR] !== undefined) {
        transaction.setNodeMarkup(pos, undefined, { ...node.attrs, [EXTRA_ATTR]: null });
    }
};

/**
 * Where a split put the new block, as the engine does it: Enter at the start
 * of a block whose text runs on past the selection opens an empty one above,
 * which is the new one; anywhere else the half after the caret is.
 */
export const newBlockSide = (state: EditorState): 'before' | 'after' => {
    const { $from, $to } = state.selection;
    if ($from.parentOffset === 0 && $to.parentOffset < $to.parent.content.size) {
        return 'before';
    }
    return 'after';
};

/** How many nodes hold each extras object. */
const extrasCounts = (doc: PmNode): Map<unknown, number> => {
    const counts = new Map<unknown, number>();
    doc.descendants((node) => {
        const extras: unknown = node.attrs[EXTRA_ATTR];
        if (extras !== null && extras !== undefined) {
            counts.set(extras, (counts.get(extras) ?? 0) + 1);
        }
        return true;
    });
    return counts;
};

/**
 * Clears the keys a command copied: a copy shares its original's extras
 * object, so one held by more nodes than before the command is a copy, and
 * the first holders keep it. Blocks a host repeats were shared before, and stay.
 */
const dropCopiedExtras = (transaction: Transaction): void => {
    const before = extrasCounts(transaction.before);
    const seen = new Map<unknown, number>();
    transaction.doc.descendants((node, pos) => {
        const extras: unknown = node.attrs[EXTRA_ATTR];
        if (extras === null || extras === undefined) {
            return true;
        }
        const count = (seen.get(extras) ?? 0) + 1;
        seen.set(extras, count);
        if (count > (before.get(extras) ?? 0)) {
            transaction.setNodeMarkup(pos, undefined, { ...node.attrs, [EXTRA_ATTR]: null });
        }
        return true;
    });
};

/** A command whose copies of a node leave the undeclared keys on the first one only. */
const withoutCopiedExtras =
    (command: Command): Command =>
    (state, dispatch, view) =>
        command(
            state,
            dispatch &&
                ((transaction) => {
                    dropCopiedExtras(transaction);
                    dispatch(transaction);
                }),
            view,
        );

/** The engine's split, except that the item it starts, and the block in it, carry none of the undeclared keys it copies. */
const splitListItem =
    (itemType: PmNodeType): Command =>
    (state, dispatch, view) => {
        let side = newBlockSide(state);
        // Past the item's first block the engine splits after it: the item before is the original.
        if (state.selection.$from.index(-1) > 0) {
            side = 'after';
        }
        return pmSplitListItem(itemType)(
            state,
            dispatch &&
                ((transaction) => {
                    const { $from: caret } = transaction.selection;
                    if (caret.depth >= 2 && caret.node(-1).type === itemType) {
                        if (side === 'before') {
                            const item = transaction.doc.resolve(caret.before(-1)).nodeBefore;
                            if (item !== null) {
                                const itemPos = caret.before(-1) - item.nodeSize;
                                clearExtrasAt(transaction, itemPos);
                                clearExtrasAt(transaction, itemPos + 1);
                            }
                        } else {
                            clearExtrasAt(transaction, caret.before(-1));
                            clearExtrasAt(transaction, caret.before());
                        }
                    }
                    dispatch(transaction);
                }),
            view,
        );
    };

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
        // Lifting an item out of the middle closes the list and opens a copy of it after.
        return keepingUnknownBlocks(withoutCopiedExtras(command(itemType)))(view.state, view.dispatch, view);
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
                    mapChildren(current.node, (item) => {
                        if (item.type === itemType || item.type.name === UNKNOWN_BLOCK) {
                            return item;
                        }
                        return itemType.create(item.attrs, item.content);
                    }),
                );
                view.dispatch(view.state.tr.replaceWith(current.pos, current.pos + current.node.nodeSize, converted));
            }
            view.focus();
        },
        indent: () => runListCommand(sinkListItem),
        outdent: () => runListCommand(liftListItem),
        split: () => runListCommand(splitListItem),
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
                mapChildren(list, (item) => {
                    // An unknown block among the items is not an item: it stands as a sibling.
                    if (item.type.name === UNKNOWN_BLOCK) {
                        return [[item]];
                    }
                    return mapChildren(item, (child) =>
                        itemTypeByList.has(child.type.name) ? contentOf(child) : [child],
                    );
                }).flat(2);
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
    try {
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
            dropCopiedExtras(lifted);
            transactions.push(lifted);
            current = current.apply(lifted);
        }
    } catch {
        return [];
    }
    // The composed result decides, as for a single command.
    if (!keepsUnknownBlocks(state.doc, current.doc)) {
        return [];
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
