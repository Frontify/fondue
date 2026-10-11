/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Mark, type ResolvedPos } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';

import { OBJECT_REPLACEMENT } from '#/model/values';

/** A whole link run: where it starts and ends, its text and its attributes. */
export interface LinkRun {
    readonly from: number;
    readonly to: number;
    readonly text: string;
    readonly attrs: Readonly<Record<string, unknown>>;
}

/** The run around child `index` of `$pos`'s parent whose text all carries `mark`. */
const runOf = ($pos: ResolvedPos, index: number, mark: Mark): LinkRun => {
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

/** The link that touches `$pos`, after it, inside it or right before it, preferring the text after. */
const linkAround = ($pos: ResolvedPos): LinkRun | undefined => {
    const type = $pos.doc.type.schema.marks.link;
    if (type === undefined || !$pos.parent.inlineContent) {
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
 * The whole link the selection lies in: a caret inside a link or at either edge of one, or a range inside one link;
 * `undefined` when the selection holds no link or leaves it.
 */
export const linkAt = (state: EditorState): LinkRun | undefined => {
    const { selection } = state;
    const run = linkAround(selection.$from);
    if (run === undefined || selection.from < run.from || selection.to > run.to) {
        return undefined;
    }
    return run;
};

/** The whole link that starts at or holds `pos`, such as the start of a clicked link's element. */
export const linkAtPos = (state: EditorState, pos: number): LinkRun | undefined => {
    if (pos < 0 || pos > state.doc.content.size) {
        return undefined;
    }
    return linkAround(state.doc.resolve(pos));
};
