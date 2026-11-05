/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isHistoryTransaction } from 'prosemirror-history';
import { type Node as PmNode } from 'prosemirror-model';
import { Plugin, type Transaction } from 'prosemirror-state';

import { EXTRA_ATTR } from './documentConversion';

// Undeclared stored keys (`EXTRA_ATTR`) through edits: they stay with the block
// they were stored on, and a block an edit makes or copies starts without them.

type Holder = { node: PmNode; pos: number };

/** Blocks by the extras object they hold. Each block loads with its own, so a shared one means an edit copied it. */
const holdersByExtras = (doc: PmNode): Map<unknown, Holder[]> => {
    const holders = new Map<unknown, Holder[]>();
    doc.descendants((node, pos) => {
        const extras: unknown = node.attrs[EXTRA_ATTR];
        if (extras !== null && extras !== undefined) {
            holders.set(extras, [...(holders.get(extras) ?? []), { node, pos }]);
        }
        return !node.isTextblock;
    });
    return holders;
};

/** No text and no void content: the block Enter opens next to the one it cuts. Text nodes count as atoms. */
const isEmpty = (node: PmNode): boolean => {
    if (node.isAtom) {
        return false;
    }
    let empty = true;
    node.descendants((child) => {
        if (child.isAtom) {
            empty = false;
        }
        return empty;
    });
    return empty;
};

/**
 * The holder that keeps the keys: never the copy a drop just made, then the
 * first one with content, so Enter at a block's start leaves them with its text.
 */
const keeperOf = (holders: Holder[], isDropped: (holder: Holder) => boolean): Holder | undefined => {
    let pool = holders.filter((holder) => !isDropped(holder));
    if (pool.length === 0) {
        pool = holders;
    }
    return pool.find((holder) => !isEmpty(holder.node)) ?? pool[0];
};

/**
 * After every edit, the undeclared keys it copied stay on one block only: a
 * split, a lift out of the middle of a list, a block inserted mid-paragraph and
 * a copy-drag all give the blocks they make the same attributes. A host's own
 * document is left as it is, and so is an undo or redo, which brings back a
 * document that already held to this.
 */
export const copiedExtrasPlugin = (isHostChange: (transaction: Transaction) => boolean): Plugin =>
    new Plugin({
        appendTransaction(transactions, _oldState, newState) {
            if (!transactions.some((transaction) => transaction.docChanged)) {
                return null;
            }
            if (transactions.some(isHostChange) || transactions.some(isHistoryTransaction)) {
                return null;
            }
            // A drop leaves what it brought selected.
            const isDrop = transactions.some((transaction) => transaction.getMeta('uiEvent') === 'drop');
            const { from, to } = newState.selection;
            const isDropped = ({ node, pos }: Holder): boolean => isDrop && pos < to && pos + node.nodeSize > from;
            const transaction = newState.tr;
            for (const holders of holdersByExtras(newState.doc).values()) {
                if (holders.length < 2) {
                    continue;
                }
                const keeper = keeperOf(holders, isDropped);
                for (const holder of holders) {
                    if (holder !== keeper) {
                        transaction.setNodeMarkup(holder.pos, undefined, { ...holder.node.attrs, [EXTRA_ATTR]: null });
                    }
                }
            }
            if (!transaction.docChanged) {
                return null;
            }
            return transaction;
        },
    });
