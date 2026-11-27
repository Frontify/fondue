/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isHistoryTransaction } from 'prosemirror-history';
import { type Node as PmNode } from 'prosemirror-model';
import { Plugin as PmPlugin, type Transaction } from 'prosemirror-state';

import { type PluginRegistry } from '#/core';

import { HOST_DOC } from './transactionMeta';

/** The start positions of the separator blocks that stand first in the document or right after a block of their own type. */
const misplacedSeparators = (doc: PmNode, registry: PluginRegistry): Set<number> => {
    const misplaced = new Set<number>();
    doc.descendants((node, position) => {
        if (node.isTextblock) {
            return false;
        }
        if (registry.blocks.get(node.type.name)?.separator !== true) {
            return true;
        }

        const $position = doc.resolve(position);
        const isFirst = $position.depth === 0 && $position.index() === 0;
        if (isFirst || $position.nodeBefore?.type === node.type) {
            misplaced.add(position);
        }

        return true;
    });

    return misplaced;
};

/** Whether the transaction leaves a misplaced separator that the document did not already hold. */
const createsMisplacedSeparator = (transaction: Transaction, oldDoc: PmNode, registry: PluginRegistry): boolean => {
    const kept = new Set<number>();
    for (const position of misplacedSeparators(oldDoc, registry)) {
        const mapped = transaction.mapping.mapResult(position);
        if (!mapped.deleted) {
            kept.add(mapped.pos);
        }
    }

    for (const position of misplacedSeparators(transaction.doc, registry)) {
        if (!kept.has(position)) {
            return true;
        }
    }

    return false;
};

/**
 * Refuses every edit that would put a separator block first in the document or right after another block of its
 * type. A stored document that already breaks this keeps loading and stays editable.
 */
export const separatorPlacementPlugin = (registry: PluginRegistry): PmPlugin =>
    new PmPlugin({
        filterTransaction(transaction, state) {
            if (!transaction.docChanged) {
                return true;
            }
            // The host's own document and an undo or redo bring back a document that was already accepted.
            if (transaction.getMeta(HOST_DOC) === true || isHistoryTransaction(transaction)) {
                return true;
            }

            return !createsMisplacedSeparator(transaction, state.doc, registry);
        },
    });
