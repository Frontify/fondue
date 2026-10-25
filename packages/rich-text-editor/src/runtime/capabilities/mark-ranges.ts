/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Mark, type MarkType, type Node } from 'prosemirror-model';
import { type EditorState, TextSelection, type Transaction } from 'prosemirror-state';

import { OBJECT_REPLACEMENT } from '#/model/internal';

import { markRunAt } from '../mark-runs';

/**
 * The range of the run of text with one mark of `type`, equal attributes included, that holds the caret or starts at
 * it, so a neighbouring passage with other attributes stays outside.
 */
const markRangeAt = (
    state: EditorState,
    type: MarkType,
): { readonly from: number; readonly to: number } | undefined => {
    const { $from } = state.selection;
    const { parent } = $from;
    const index = $from.index();
    if (index >= parent.childCount) {
        return undefined;
    }
    const mark = type.isInSet(parent.child(index).marks);
    if (mark === undefined) {
        return undefined;
    }
    const holds = (at: number) => at >= 0 && at < parent.childCount && mark.isInSet(parent.child(at).marks);
    let first = index;
    while (holds(first - 1)) {
        first -= 1;
    }
    let last = index;
    while (holds(last + 1)) {
        last += 1;
    }
    let from = $from.start();
    for (let child = 0; child < first; child += 1) {
        from += parent.child(child).nodeSize;
    }
    let to = from;
    for (let child = first; child <= last; child += 1) {
        to += parent.child(child).nodeSize;
    }
    return { from, to };
};

/** How far a mark command reaches: the selection, the whole run around it, or that run also from its trailing edge. */
export type Extend = boolean | 'touching';

export const extendOf = (value: unknown): Extend => {
    if (value === 'touching') {
        return value;
    }
    return value === true;
};

/**
 * The whole run of `type` that the selection lies in, a caret or a range inside it, or `undefined` when the selection
 * leaves that run or holds no such mark.
 */
export const enclosingRange = (
    state: EditorState,
    type: MarkType,
    extend: Extend,
): { readonly from: number; readonly to: number } | undefined => {
    // A caret at the trailing edge of a `touching` run still edits that run, as a bubble on it shows; any other run's end stays outside.
    const range = extend === 'touching' ? markRunAt(state, type) : markRangeAt(state, type);
    const { from, to } = state.selection;
    if (range === undefined || from < range.from || to > range.to) {
        return undefined;
    }
    return range;
};

/** The marks other than `type` that every text node between `from` and `to` carries. */
const sharedMarks = (doc: Node, from: number, to: number, type: MarkType): readonly Mark[] => {
    let shared: readonly Mark[] | undefined;
    doc.nodesBetween(from, to, (node) => {
        if (node.isText) {
            const own = node.marks.filter((mark) => mark.type !== type);
            shared = shared === undefined ? own : shared.filter((mark) => mark.isInSet(own));
        }
    });
    return shared ?? [];
};

/**
 * Puts `mark` on `from` to `to`. Visible `text` that differs from the text there replaces it, with the marks that
 * covered all of it, so text kept as it was keeps its inner marks; text across blocks is never replaced.
 */
export const markRange = (transaction: Transaction, from: number, to: number, mark: Mark, text: string | undefined) => {
    const { doc } = transaction;
    const $from = doc.resolve(from);
    // A hard break or other leaf in the range counts as nothing too, as the popover prefills the text without it.
    const replaces =
        text !== undefined &&
        text !== '' &&
        $from.sameParent(doc.resolve(to)) &&
        doc.textBetween(from, to, undefined, OBJECT_REPLACEMENT) !== text &&
        doc.textBetween(from, to, undefined, '') !== text;
    if (!replaces) {
        transaction.addMark(from, to, mark);
        return;
    }
    const marks = mark.addToSet(sharedMarks(doc, from, to, mark.type));
    transaction.replaceWith(from, to, mark.type.schema.text(text, marks));
    transaction.setSelection(TextSelection.create(transaction.doc, from, from + text.length));
};
