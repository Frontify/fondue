/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode } from 'prosemirror-model';
import { type EditorState, Plugin, type Transaction } from 'prosemirror-state';

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

/** How many blocks hold each extras object. Only blocks hold one, so the walk stops at blocks of text. */
const extrasCounts = (doc: PmNode): Map<unknown, number> => {
    const counts = new Map<unknown, number>();
    doc.descendants((node) => {
        const extras: unknown = node.attrs[EXTRA_ATTR];
        if (extras !== null && extras !== undefined) {
            counts.set(extras, (counts.get(extras) ?? 0) + 1);
        }
        return !node.isTextblock;
    });
    return counts;
};

/**
 * Clears the keys an edit copied: a copy shares its original's extras object,
 * so one held by more blocks than in `before` is a copy, and the first holders
 * keep it.
 */
const dropCopiedExtras = (before: PmNode, transaction: Transaction): void => {
    const counts = extrasCounts(before);
    const seen = new Map<unknown, number>();
    transaction.doc.descendants((node, pos) => {
        const extras: unknown = node.attrs[EXTRA_ATTR];
        if (extras !== null && extras !== undefined) {
            const count = (seen.get(extras) ?? 0) + 1;
            seen.set(extras, count);
            if (count > (counts.get(extras) ?? 0)) {
                transaction.setNodeMarkup(pos, undefined, { ...node.attrs, [EXTRA_ATTR]: null });
            }
        }
        return !node.isTextblock;
    });
};

/**
 * After every edit, the undeclared keys it copied stay on the first block
 * only: a split, a lift out of the middle of a list, a block inserted
 * mid-paragraph and a paste all copy the attributes of the block they cut in
 * two. A host's own document is left as it is, repeated blocks included.
 */
export const copiedExtrasPlugin = (isHostChange: (transaction: Transaction) => boolean): Plugin =>
    new Plugin({
        appendTransaction(transactions, oldState, newState) {
            if (!transactions.some((transaction) => transaction.docChanged) || transactions.some(isHostChange)) {
                return null;
            }
            const transaction = newState.tr;
            dropCopiedExtras(oldState.doc, transaction);
            if (!transaction.docChanged) {
                return null;
            }
            return transaction;
        },
    });
