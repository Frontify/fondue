/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin } from 'prosemirror-state';

/**
 * The document format stores no marks on inline elements, so the editor strips
 * any they pick up (inheriting a caret's marks, a mark toggled over a range,
 * pasted HTML). That keeps what the editor holds equal to what `onChange`
 * reports.
 */
export const inlineElementsCarryNoMarksPlugin = (): Plugin =>
    new Plugin({
        appendTransaction(transactions, _oldState, newState) {
            if (!transactions.some((transaction) => transaction.docChanged)) {
                return null;
            }
            const tr = newState.tr;
            newState.doc.descendants((node, pos) => {
                if (node.isInline && !node.isText && node.marks.length > 0) {
                    tr.removeMark(pos, pos + node.nodeSize, null);
                }
            });
            return tr.docChanged ? tr : null;
        },
    });
