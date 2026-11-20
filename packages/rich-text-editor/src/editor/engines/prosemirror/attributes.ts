/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode } from 'prosemirror-model';
import { type Transaction } from 'prosemirror-state';

export type NodeAt = { pos: number; node: PmNode };

/** Sets only the attributes the node declares and holds differently, one step each, so an undo reverts only what changed. */
export const setChangedAttributes = (
    transaction: Transaction,
    { pos, node }: NodeAt,
    attributes: Readonly<Record<string, unknown>>,
): void => {
    for (const [name, value] of Object.entries(attributes)) {
        // An attribute is cleared with `null` or `undefined`, so both count as the same value.
        let wanted = value;
        if (wanted === undefined) {
            wanted = null;
        }

        if (name in node.attrs && node.attrs[name] !== wanted) {
            transaction.setNodeAttribute(pos, name, wanted);
        }
    }
};
