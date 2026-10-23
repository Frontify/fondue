/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type Command, type EditorState, Selection, type Transaction } from 'prosemirror-state';

/** Appends every step of `inner` onto `outer`, in order. */
export const appendSteps = (outer: Transaction, inner: Transaction): void => {
    for (const step of inner.steps) {
        outer.step(step);
    }
};

/** `selection` rebound onto `doc` after steps from another transaction have been appended. */
export const carrySelection = (doc: Node, selection: Selection): Selection =>
    Selection.fromJSON(doc, selection.toJSON());

/** The transaction `command` dispatches against `state`, or `undefined` when it dispatches none or changes no document. */
export const transactionOf = (state: EditorState, command: Command): Transaction | undefined => {
    const built: Transaction[] = [];
    command(state, (next) => {
        built.push(next);
    });
    const [next] = built;
    if (next === undefined || !next.docChanged) {
        return undefined;
    }
    return next;
};

/** Appends `next` onto `outer` and returns `current` after it, or `current` itself when `next` changes nothing. */
export const take = (outer: Transaction, current: EditorState, next: Transaction | undefined): EditorState => {
    if (next === undefined || !next.docChanged) {
        return current;
    }
    appendSteps(outer, next);
    return current.apply(next);
};
