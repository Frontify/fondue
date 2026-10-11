/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { Selection, type Transaction } from 'prosemirror-state';

/** Appends every step of `inner` onto `outer`, in order. */
export const appendSteps = (outer: Transaction, inner: Transaction): void => {
    for (const step of inner.steps) {
        outer.step(step);
    }
};

/** `selection` rebound onto `doc` after steps from another transaction have been appended. */
export const carrySelection = (doc: Node, selection: Selection): Selection =>
    Selection.fromJSON(doc, selection.toJSON());
