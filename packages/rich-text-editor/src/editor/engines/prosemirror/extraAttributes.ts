/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isHistoryTransaction } from 'prosemirror-history';
import { type Node as PmNode } from 'prosemirror-model';
import { Plugin, type Transaction } from 'prosemirror-state';

import { EXTRA_ATTR } from './documentConversion';

// Undeclared stored keys (`EXTRA_ATTR`) through edits: they stay with the block
// they were stored on, and a block an edit makes or copies starts without them.

const clearExtrasAt = (transaction: Transaction, pos: number): void => {
    const node = transaction.doc.nodeAt(pos);
    if (node !== null && node.attrs[EXTRA_ATTR] !== null && node.attrs[EXTRA_ATTR] !== undefined) {
        transaction.setNodeMarkup(pos, undefined, { ...node.attrs, [EXTRA_ATTR]: null });
    }
};

/**
 * Where a block's first text starts, or a void block's own position. An edit
 * that cuts a block in two leaves its keys on the part holding this point, so
 * Enter at the very start of a block leaves them with its text.
 */
const anchorOf = (node: PmNode, pos: number): number => {
    if (node.isAtom) {
        return pos;
    }
    let anchor = pos + 1;
    let found = false;
    node.descendants((child, offset) => {
        if (found) {
            return false;
        }
        if (child.isTextblock) {
            anchor = pos + 1 + offset + 1;
            found = true;
            return false;
        }
        return true;
    });
    return anchor;
};

const holds = (node: PmNode, pos: number, point: number): boolean => {
    if (node.isAtom) {
        return point === pos;
    }
    return pos < point && point < pos + node.nodeSize;
};

type Holder = { node: PmNode; pos: number };

/**
 * Clears the keys an edit copied. A copy shares its original's extras object,
 * so an object held by more blocks than in `before` has copies: the blocks that
 * hold none of the originals' mapped anchors are those, and past them the last
 * holders are. An object `before` lacks is never a copy: pasted and dropped
 * blocks come in without one. Only blocks hold one, so the walks stop at blocks of text.
 */
const dropCopiedExtras = (before: PmNode, edits: readonly Transaction[], transaction: Transaction): void => {
    const counts = new Map<unknown, number>();
    const anchors = new Map<unknown, number[]>();
    before.descendants((node, pos) => {
        const extras: unknown = node.attrs[EXTRA_ATTR];
        if (extras !== null && extras !== undefined) {
            counts.set(extras, (counts.get(extras) ?? 0) + 1);
            const anchor = edits.reduce((mapped, edit) => edit.mapping.map(mapped), anchorOf(node, pos));
            anchors.set(extras, [...(anchors.get(extras) ?? []), anchor]);
        }
        return !node.isTextblock;
    });
    const holders = new Map<unknown, Holder[]>();
    transaction.doc.descendants((node, pos) => {
        const extras: unknown = node.attrs[EXTRA_ATTR];
        if (counts.has(extras)) {
            holders.set(extras, [...(holders.get(extras) ?? []), { node, pos }]);
        }
        return !node.isTextblock;
    });
    for (const [extras, found] of holders) {
        const copies = found.length - (counts.get(extras) ?? 0);
        if (copies <= 0) {
            continue;
        }
        const points = anchors.get(extras) ?? [];
        const isOriginal = ({ node, pos }: Holder): boolean => points.some((point) => holds(node, pos, point));
        const unmatched = found.filter((holder) => !isOriginal(holder)).reverse();
        const matched = found.filter(isOriginal).reverse();
        for (const { pos } of [...unmatched, ...matched].slice(0, copies)) {
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
