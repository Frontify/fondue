/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isHistoryTransaction } from 'prosemirror-history';
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

/**
 * Clears the keys an edit copied. A copy shares its original's extras object,
 * so an object held by more blocks than in `before` has copies: the blocks no
 * holder in `before` maps to are those, and past them the last holders are.
 * An object `before` lacks is never a copy: pasted and dropped blocks come in
 * without one. Only blocks hold one, so the walks stop at blocks of text.
 */
const dropCopiedExtras = (before: PmNode, edits: readonly Transaction[], transaction: Transaction): void => {
    const counts = new Map<unknown, number>();
    const originals = new Set<number>();
    before.descendants((node, pos) => {
        const extras: unknown = node.attrs[EXTRA_ATTR];
        if (extras !== null && extras !== undefined) {
            counts.set(extras, (counts.get(extras) ?? 0) + 1);
            originals.add(edits.reduce((mapped, edit) => edit.mapping.map(mapped), pos));
        }
        return !node.isTextblock;
    });
    const holders = new Map<unknown, number[]>();
    transaction.doc.descendants((node, pos) => {
        const extras: unknown = node.attrs[EXTRA_ATTR];
        if (counts.has(extras)) {
            holders.set(extras, [...(holders.get(extras) ?? []), pos]);
        }
        return !node.isTextblock;
    });
    for (const [extras, positions] of holders) {
        const copies = positions.length - (counts.get(extras) ?? 0);
        if (copies <= 0) {
            continue;
        }
        const unmatched = positions.filter((pos) => !originals.has(pos)).reverse();
        const matched = positions.filter((pos) => originals.has(pos)).reverse();
        for (const pos of [...unmatched, ...matched].slice(0, copies)) {
            clearExtrasAt(transaction, pos);
        }
    }
};

/**
 * After every edit, the undeclared keys it copied stay on the original block
 * only: a split, a lift out of the middle of a list, a block inserted
 * mid-paragraph and a paste all copy the attributes of the block they cut in
 * two. A host's own document is left as it is, repeated blocks included, and so
 * is an undo or redo, which brings back a document that already held to this.
 */
export const copiedExtrasPlugin = (isHostChange: (transaction: Transaction) => boolean): Plugin =>
    new Plugin({
        appendTransaction(transactions, oldState, newState) {
            if (!transactions.some((transaction) => transaction.docChanged)) {
                return null;
            }
            if (transactions.some(isHostChange) || transactions.some(isHistoryTransaction)) {
                return null;
            }
            const transaction = newState.tr;
            dropCopiedExtras(oldState.doc, transactions, transaction);
            if (!transaction.docChanged) {
                return null;
            }
            return transaction;
        },
    });
