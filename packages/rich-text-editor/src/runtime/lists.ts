/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node, type NodeType, type ResolvedPos } from 'prosemirror-model';
import { splitListItem } from 'prosemirror-schema-list';
import { type Command, type EditorState, type Transaction } from 'prosemirror-state';

import { appendSteps, carrySelection } from './transactions';

/** Whether `item` is the item of `list`: a block whose default content is `item`, which is no block, as `list_item` is. */
const holdsItems = (list: NodeType, item: NodeType) =>
    list.isInGroup('block') && !item.isInGroup('block') && list.contentMatch.defaultType === item;

/** The innermost list around `$pos`, at the selection's depth, or `undefined` outside every list. */
export const listAround = ($pos: ResolvedPos): { readonly list: Node; readonly depth: number } | undefined => {
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

/** Runs `command` while `again` holds after it, as one transaction, or returns `undefined` when it changes nothing. */
export const repeated = (
    state: EditorState,
    command: Command,
    again: (state: EditorState) => boolean,
): Transaction | undefined => {
    const transaction = state.tr;
    let current = state;
    do {
        const built: Transaction[] = [];
        command(current, (next) => built.push(next));
        const [next] = built;
        if (next === undefined || !next.docChanged) {
            break;
        }
        appendSteps(transaction, next);
        current = current.apply(next);
    } while (again(current));
    if (!transaction.docChanged) {
        return undefined;
    }
    return transaction.setSelection(carrySelection(transaction.doc, current.selection)).scrollIntoView();
};

/**
 * Splits the item at the caret. ProseMirror's split copies `checked` into the new item, so a new task item is unchecked
 * in the split's own transaction, and the `node-ids` normalizer gives it a new `nodeId`.
 * A split at the very start of an item's text leaves the new, empty item before it, as the normalizer reads it.
 */
export const splitItem =
    (item: NodeType): Command =>
    (state, dispatch) => {
        const { $from } = state.selection;
        const before = $from.parentOffset === 0 && $from.parent.content.size > 0 && $from.index(-1) === 0;
        return splitListItem(item)(state, (transaction) => {
            const $at = transaction.selection.$from;
            let at = $at.before(-1);
            if (before) {
                at = $at.posAtIndex($at.index(-2) - 1, -2);
            }
            if (transaction.doc.nodeAt(at)?.attrs.checked === true) {
                transaction.setNodeAttribute(at, 'checked', false);
            }
            dispatch?.(transaction);
        });
    };
