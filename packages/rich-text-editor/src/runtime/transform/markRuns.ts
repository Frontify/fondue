/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Mark, type MarkType, type ResolvedPos } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';

import { OBJECT_REPLACEMENT } from '#/model/internal';

/** A whole run of one mark: where it starts and ends, its text and its attributes. */
export type MarkRun = {
    from: number;
    to: number;
    text: string;
    attrs: Readonly<Record<string, unknown>>;
};

/** The run around child `index` of `$pos`'s parent whose text all carries `mark`. */
const runOf = ($pos: ResolvedPos, index: number, mark: Mark): MarkRun => {
    const { parent } = $pos;
    const holds = (at: number) => at >= 0 && at < parent.childCount && mark.isInSet(parent.child(at).marks);
    let first = index;
    while (holds(first - 1)) {
        first -= 1;
    }

    let last = index;
    while (holds(last + 1)) {
        last += 1;
    }

    let from = $pos.start();
    for (let child = 0; child < first; child += 1) {
        from += parent.child(child).nodeSize;
    }

    let to = from;
    for (let child = first; child <= last; child += 1) {
        to += parent.child(child).nodeSize;
    }

    const text = parent.textBetween(from - $pos.start(), to - $pos.start(), undefined, OBJECT_REPLACEMENT);

    return { from, to, text, attrs: mark.attrs };
};

/** The run of `type` that touches `$pos`, after it, inside it or right before it, preferring the text after. */
const runAround = ($pos: ResolvedPos, type: MarkType): MarkRun | undefined => {
    if (!$pos.parent.inlineContent) {
        return undefined;
    }

    const index = $pos.index();
    const { parent } = $pos;
    for (const at of [index, index - 1]) {
        // Inside a text node both sides are the same child.
        if (at < 0 || at >= parent.childCount || (at === index - 1 && $pos.textOffset > 0)) {
            continue;
        }

        const mark = type.isInSet(parent.child(at).marks);
        if (mark !== undefined) {
            return runOf($pos, at, mark);
        }
    }

    return undefined;
};

/**
 * The whole run of `type` the selection lies in: a caret inside a run or at either edge of one, or a range inside one
 * run; `undefined` when the selection holds no such run or leaves it.
 */
export const markRunAt = (state: EditorState, type: MarkType): MarkRun | undefined => {
    const { selection } = state;
    const run = runAround(selection.$from, type);
    if (run === undefined || selection.from < run.from || selection.to > run.to) {
        return undefined;
    }

    return run;
};

/** The whole run of `type` that starts at or holds `pos`, such as the start of a clicked element. */
export const markRunAtPos = (state: EditorState, pos: number, type: MarkType): MarkRun | undefined => {
    if (pos < 0 || pos > state.doc.content.size) {
        return undefined;
    }

    return runAround(state.doc.resolve(pos), type);
};
