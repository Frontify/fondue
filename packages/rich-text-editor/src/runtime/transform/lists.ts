/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type Node, type NodeType, type ResolvedPos, Slice } from 'prosemirror-model';
import { liftListItem, splitListItem } from 'prosemirror-schema-list';
import { type Command, type EditorState, type Transaction } from 'prosemirror-state';
import { ReplaceAroundStep } from 'prosemirror-transform';

import { breakBefore } from '../statePlugins/keys';

import { inCodeTextblock } from './positions';
import { carrySelection, take, transactionOf } from './transactions';

/** Whether `item` is the item of `list`: a block whose default content is `item`, which is no block, as `list_item` is. */
const holdsItems = (list: NodeType, item: NodeType) =>
    list.isInGroup('block') && !item.isInGroup('block') && list.contentMatch.defaultType === item;

/** The innermost list around `$pos`, at the selection's depth, or `undefined` outside every list. */
export const listAround = ($pos: ResolvedPos): { list: Node; depth: number } | undefined => {
    for (let depth = $pos.depth - 1; depth >= 0; depth -= 1) {
        const list = $pos.node(depth);
        if (holdsItems(list.type, $pos.node(depth + 1).type)) {
            return { list, depth };
        }
    }

    return undefined;
};

/** The type of the item whose own block holds `$pos`, or `undefined` when its textblock sits in no item. */
export const itemAt = ($pos: ResolvedPos): NodeType | undefined => {
    if ($pos.depth < 2 || !holdsItems($pos.node(-2).type, $pos.node(-1).type)) {
        return undefined;
    }

    return $pos.node(-1).type;
};

/** Whether `$pos` is at the start of the first textblock of its item. */
export const atItemStart = ($pos: ResolvedPos): boolean => $pos.parentOffset === 0 && $pos.index(-1) === 0;

/**
 * Lifts the selected items out of their list, as `liftListItem` does for a top-level list, but also out of a list nested
 * in an item of another list type, where `liftListItem` would make them items of the outer list.
 */
export const liftItems =
    (item: NodeType): Command =>
    (state, dispatch) => {
        const { $from, $to } = state.selection;
        const range = $from.blockRange($to, (node) => node.childCount > 0 && node.firstChild?.type === item);
        // The rest is `liftOutOfList` from prosemirror-schema-list, unexported, so copied to run on a nested list.
        if (
            range === null ||
            $from.node(range.depth - 1).type !== item ||
            $from.node(range.depth - 2).type === range.parent.type
        ) {
            return liftListItem(item)(state, dispatch);
        }

        const { parent: list } = range;
        const transaction = state.tr;
        // Merge the selected items into one, so a single step strips them out of the list.
        for (let pos = range.end, index = range.endIndex - 1; index > range.startIndex; index -= 1) {
            pos -= list.child(index).nodeSize;
            transaction.delete(pos - 1, pos + 1);
        }

        const $start = transaction.doc.resolve(range.start);
        const merged = $start.nodeAfter;
        if (merged === null || transaction.mapping.map(range.end) !== range.start + merged.nodeSize) {
            return false;
        }

        const atStart = range.startIndex === 0;
        const atEnd = range.endIndex === list.childCount;
        const outer = $start.node(-1);
        const indexBefore = $start.index(-1);
        let rest = Fragment.empty;
        if (!atEnd) {
            rest = Fragment.from(list);
        }

        if (!outer.canReplace(indexBefore + Number(!atStart), indexBefore + 1, merged.content.append(rest))) {
            return false;
        }

        let closed = Fragment.empty;
        if (!atStart) {
            closed = Fragment.from(list.copy(Fragment.empty));
        }

        if (!atEnd) {
            closed = closed.append(Fragment.from(list.copy(Fragment.empty)));
        }

        const start = $start.pos;
        const end = start + merged.nodeSize;
        transaction.step(
            new ReplaceAroundStep(
                start - Number(atStart),
                end + Number(atEnd),
                start + 1,
                end - 1,
                new Slice(closed, Number(!atStart), Number(!atEnd)),
                Number(!atStart),
            ),
        );
        dispatch?.(transaction.scrollIntoView());

        return true;
    };

/** Runs `command` while `stillApplies` holds after it, as one transaction, or returns `undefined` when it changes nothing. */
export const repeatWhile = (
    state: EditorState,
    command: Command,
    stillApplies: (state: EditorState) => boolean,
): Transaction | undefined => {
    const transaction = state.tr;
    let current = state;
    do {
        const next = transactionOf(current, command);
        if (next === undefined) {
            break;
        }

        current = take(transaction, current, next);
    } while (stillApplies(current));

    if (!transaction.docChanged) {
        return undefined;
    }

    return transaction.setSelection(carrySelection(transaction.doc, current.selection)).scrollIntoView();
};

/**
 * Splits the item at the caret. ProseMirror's split copies `checked` into the new item, so a new task item is unchecked
 * in the split's own transaction, and the `node-ids` normalizer gives it a new `nodeId`. A split at the end of the
 * text makes the new paragraph from the default type, so it takes the attributes of the paragraph it split, but its `nodeId`.
 * A split at the very start of an item's text leaves the new, empty item before it, as the normalizer reads it.
 */
export const splitItem =
    (item: NodeType): Command =>
    (state, dispatch) => {
        const { $from, $to } = state.selection;
        const before = atItemStart($from) && $to.parentOffset < $to.parent.content.size;

        return splitListItem(item)(state, (transaction) => {
            const $at = transaction.selection.$from;
            let at = $at.before(-1);
            if (before) {
                at = $at.posAtIndex($at.index(-2) - 1, -2);
            }

            if (transaction.doc.nodeAt(at)?.attrs.checked === true) {
                transaction.setNodeAttribute(at, 'checked', false);
            }

            const created = $at.parent;
            if (!before && created.type === $from.parent.type) {
                for (const [name, value] of Object.entries($from.parent.attrs)) {
                    if (name !== 'nodeId' && created.attrs[name] !== value) {
                        transaction.setNodeAttribute($at.before(), name, value);
                    }
                }
            }

            dispatch?.(transaction);
        });
    };

/** Outdent for an empty caret at the start of an item of `item` that no break precedes, the rule of Backspace there. */
export const outdentAtStart = (item: NodeType, state: EditorState): boolean => {
    const { $from, empty } = state.selection;

    return empty && atItemStart($from) && itemAt($from) === item && breakBefore(state) === undefined;
};

/** Enter in an item of `item`: a newline in code, a lift from the only, empty textblock of an item, else a split. */
export const enterItem =
    (item: NodeType): Command =>
    (state, dispatch) => {
        const { $from, empty } = state.selection;
        if (itemAt($from) !== item || inCodeTextblock($from)) {
            return false;
        }

        if (empty && $from.parent.content.size === 0 && $from.node(-1).childCount === 1) {
            return liftListItem(item)(state, dispatch);
        }

        return splitItem(item)(state, dispatch);
    };
