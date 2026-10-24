/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GapCursor } from 'prosemirror-gapcursor';
import { Fragment, type Node, type NodeType, type ResolvedPos } from 'prosemirror-model';
import { type EditorState, Selection, TextSelection, type Transaction } from 'prosemirror-state';

/** A range `from`–`to` in one parent that a block replaces; an empty range inserts it there. */
interface BlockSpot {
    readonly from: number;
    readonly to: number;
}

/**
 * Where a block goes, in order of preference: in place of the empty textblock at a caret, before a textblock with the
 * caret at its start, then after the block that holds the selection end at the deepest level that takes it; with
 * `topLevel`, only after the top-level block. A selection between blocks, such as a selected node, is that spot.
 */
const blockSpots = (state: EditorState, topLevel: boolean): BlockSpot[] => {
    const { selection } = state;
    const $end = selection.$to;
    const spots: BlockSpot[] = [];
    if (!$end.parent.inlineContent) {
        if (topLevel && $end.depth > 0) {
            return [{ from: $end.after(1), to: $end.after(1) }];
        }
        spots.push({ from: $end.pos, to: $end.pos });
    } else if (!topLevel && selection.empty) {
        if ($end.parent.content.size === 0) {
            spots.push({ from: $end.before(), to: $end.after() });
        } else if ($end.parentOffset === 0) {
            spots.push({ from: $end.before(), to: $end.before() });
        }
    }
    for (let depth = $end.depth; depth >= 1; depth -= 1) {
        if (!topLevel || depth === 1) {
            spots.push({ from: $end.after(depth), to: $end.after(depth) });
        }
    }
    return spots;
};

/** Whether `type` may replace the range of `spot`. */
const takes = (doc: Node, spot: BlockSpot, type: NodeType) => {
    const $from = doc.resolve(spot.from);
    let end = $from.index();
    if (spot.to > spot.from) {
        end += 1;
    }
    return $from.parent.canReplaceWith($from.index(), end, type);
};

// The pinned prosemirror-gapcursor declares `GapCursor.valid` internal, so its types leave it out.
const gapCursorValid = ($pos: ResolvedPos): boolean =>
    (GapCursor as unknown as { readonly valid: (at: ResolvedPos) => boolean }).valid($pos);

/**
 * Puts `node` at `spot`, adds an empty paragraph after it when it ends up last, and puts the selection after it: a
 * caret in a textblock that follows, else a gap cursor, so typing never replaces a selected leaf such as a column break.
 */
const insertBlock = (state: EditorState, spot: BlockSpot, node: Node | Fragment): Transaction => {
    const transaction = state.tr.replaceWith(spot.from, spot.to, node);
    const after = spot.from + (node instanceof Fragment ? node.size : node.nodeSize);
    const $after = transaction.doc.resolve(after);
    if ($after.nodeAfter !== null) {
        if (!$after.nodeAfter.isTextblock && gapCursorValid($after)) {
            return transaction.setSelection(new GapCursor($after)).scrollIntoView();
        }
        return transaction.setSelection(Selection.near($after, 1)).scrollIntoView();
    }
    const paragraph = $after.parent.contentMatchAt($after.index()).defaultType;
    if (paragraph === null || !paragraph.isTextblock) {
        return transaction.setSelection(Selection.near($after, -1)).scrollIntoView();
    }
    transaction.insert(after, paragraph.create());
    return transaction.setSelection(TextSelection.create(transaction.doc, after + 1)).scrollIntoView();
};

/** Whether a block of `type` has a spot at the selection, as `insertNode` finds one; with `topLevel`, after the top-level block. */
export const placesBlock = (state: EditorState, type: NodeType, topLevel = false): boolean =>
    blockSpots(state, topLevel).some((spot) => takes(state.doc, spot, type));

/**
 * Puts block `node`, or blocks of one type, where `insertNode` puts a block, or `undefined` where no spot at the
 * selection takes it; with `topLevel`, only after the top-level block.
 */
export const placeBlock = (state: EditorState, node: Node | Fragment, topLevel = false): Transaction | undefined => {
    const type = node instanceof Fragment ? node.firstChild?.type : node.type;
    const spot = blockSpots(state, topLevel).find(
        (candidate) => type !== undefined && takes(state.doc, candidate, type),
    );
    if (spot === undefined) {
        return undefined;
    }
    return insertBlock(state, spot, node);
};
