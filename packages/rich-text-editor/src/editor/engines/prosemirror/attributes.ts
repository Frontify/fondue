/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode } from 'prosemirror-model';
import { type Transaction } from 'prosemirror-state';

/** A node of the document and where it sits. */
export type NodeAt = { pos: number; node: PmNode };

/**
 * Sets each of `attributes` that `target` declares and holds differently: one step per attribute, so an undo reverts
 * only what changed.
 */
export const setChangedAttributes = (
    transaction: Transaction,
    { pos, node }: NodeAt,
    attributes: Readonly<Record<string, unknown>>,
): void => {
    for (const [name, value] of Object.entries(attributes)) {
        if (name in node.attrs && node.attrs[name] !== value) {
            transaction.setNodeAttribute(pos, name, value);
        }
    }
};
