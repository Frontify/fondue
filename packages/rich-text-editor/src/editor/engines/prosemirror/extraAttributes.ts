/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode } from 'prosemirror-model';
import { type Command, type EditorState, type Transaction } from 'prosemirror-state';

import { EXTRA_ATTR } from './documentConversion';

// Undeclared stored keys (`EXTRA_ATTR`) through edits: they stay with the block
// they were stored on, and a block an edit makes or copies starts without them.

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
export const dropCopiedExtras = (transaction: Transaction): void => {
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
export const withoutCopiedExtras =
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
