/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Mark, type Node as PmNode } from 'prosemirror-model';
import { type Transaction } from 'prosemirror-state';

import { setChangedAttributes } from './attributes';
import { withoutDrafts } from './documentConversion';

const graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

/** Stands for each inline atom in a block's text, so text offsets equal positions. */
const INLINE_ATOM_STAND_IN = '￼';

/** How far `offset` sits from the end of the character it splits in `textblock` (an emoji sequence, a letter and its accent), 0 when it splits none. */
const graphemeRemainder = (textblock: PmNode, offset: number): number => {
    const text = textblock.textBetween(0, textblock.content.size, undefined, INLINE_ATOM_STAND_IN);
    const containing = graphemes.segment(text).containing(offset);
    if (containing === undefined || containing.index === offset) {
        return 0;
    }
    return containing.index + containing.segment.length - offset;
};

/** Past this many inserted and removed children, a changed stretch is replaced whole rather than matched up: matching costs the square of it. */
const MATCH_LIMIT = 100;

/** Past this many children, a changed stretch is replaced whole but for the child holding the caret: each child synced is a step over the whole document. */
const PAIR_LIMIT = 100;

/** `items[index]`, which the caller has already bounded: a miss is a bug in the diff, not a case to handle. */
const at = <T>(items: readonly T[], index: number): T => {
    const item = items[index];
    if (item === undefined) {
        throw new Error(`No item at index ${index} of ${items.length}.`);
    }
    return item;
};

/** The furthest index into `before` reached on `diagonal`, in a frontier row centred on its middle. */
const reach = (row: readonly number[], diagonal: number): number => at(row, (row.length - 1) / 2 + diagonal);

/** Whether the edit path reaching `diagonal` with `count` changes comes from `diagonal + 1` rather than `diagonal - 1`. */
const fromHigherDiagonal = (row: readonly number[], count: number, diagonal: number): boolean =>
    diagonal === -count || (diagonal !== count && reach(row, diagonal - 1) < reach(row, diagonal + 1));

/** Whether child `x` of one stretch equals child `y` of the other. */
type Same = (x: number, y: number) => boolean;

/**
 * Myers' forward pass over `lengthA` and `lengthB` children: the frontier before each number of changes, the last
 * one reaching both ends, or none when that takes more than `MATCH_LIMIT` changes.
 */
const frontierRows = (lengthA: number, lengthB: number, same: Same): number[][] => {
    const limit = Math.min(lengthA + lengthB, MATCH_LIMIT);
    const centre = limit + 1;
    const frontier = Array.from({ length: 2 * centre + 1 }, () => 0);
    const rows: number[][] = [];
    for (let count = 0; count <= limit; count++) {
        rows.push([...frontier]);
        for (let diagonal = -count; diagonal <= count; diagonal += 2) {
            let x = reach(frontier, diagonal - 1) + 1;
            if (fromHigherDiagonal(frontier, count, diagonal)) {
                x = reach(frontier, diagonal + 1);
            }
            let y = x - diagonal;
            while (x < lengthA && y < lengthB && same(x, y)) {
                x += 1;
                y += 1;
            }
            frontier[centre + diagonal] = x;
            if (x >= lengthA && y >= lengthB) {
                return rows;
            }
        }
    }
    return [];
};

/** Myers' backward pass: the equal pairs on the edit path the rows describe, from the ends back to the start. */
const pathPairs = (rows: readonly number[][], lengthA: number, lengthB: number): [number, number][] => {
    const matched: [number, number][] = [];
    let x = lengthA;
    let y = lengthB;
    for (let count = rows.length - 1; count > 0; count--) {
        const row = at(rows, count);
        const diagonal = x - y;
        let previous = diagonal - 1;
        if (fromHigherDiagonal(row, count, diagonal)) {
            previous = diagonal + 1;
        }
        const previousX = reach(row, previous);
        const previousY = previousX - previous;
        while (x > previousX && y > previousY) {
            matched.push([x - 1, y - 1]);
            x -= 1;
            y -= 1;
        }
        x = previousX;
        y = previousY;
    }
    while (x > 0 && y > 0) {
        matched.push([x - 1, y - 1]);
        x -= 1;
        y -= 1;
    }
    return matched;
};

/**
 * The equal children of two stretches, as index pairs in order, by Myers' diff: its cost grows with the number of
 * changes rather than the length, so a few changes in a long document stay cheap.
 */
const matchStretch = (lengthA: number, lengthB: number, same: Same): [number, number][] => {
    if (lengthA === 0 || lengthB === 0) {
        return [];
    }
    const rows = frontierRows(lengthA, lengthB, same);
    if (rows.length === 0) {
        return [];
    }
    const matched = pathPairs(rows, lengthA, lengthB);
    matched.reverse();
    return matched;
};

/** Index pairs of equal children, in order. A draft (an inline still being made) does not make a child differ. */
const equalChildren = (before: readonly PmNode[], after: readonly PmNode[]): [number, number][] => {
    const comparable = before.map(withoutDrafts);
    const same: Same = (i, j) => at(comparable, i).eq(at(after, j));
    // The shared start and end match directly, so only the changed stretch between them goes through the diff.
    let head = 0;
    while (head < before.length && head < after.length && same(head, head)) {
        head += 1;
    }
    let tail = 0;
    while (
        tail < before.length - head &&
        tail < after.length - head &&
        same(before.length - 1 - tail, after.length - 1 - tail)
    ) {
        tail += 1;
    }
    const pairs: [number, number][] = [];
    for (let index = 0; index < head; index++) {
        pairs.push([index, index]);
    }
    const stretch = matchStretch(before.length - tail - head, after.length - tail - head, (x, y) =>
        same(head + x, head + y),
    );
    for (const [x, y] of stretch) {
        pairs.push([head + x, head + y]);
    }
    for (let offset = tail; offset > 0; offset--) {
        pairs.push([before.length - offset, after.length - offset]);
    }
    return pairs;
};

/** Whether two nodes are of one type with the same marks, so only their attributes and content can differ. */
const sameKind = (a: PmNode, b: PmNode): boolean => a.type === b.type && Mark.sameSet(a.marks, b.marks);

/** Whether both are the same inline element with the same marks, so only its value changed. */
const sameInlineElement = (node: PmNode, replacement: PmNode | null): replacement is PmNode =>
    replacement !== null && !node.isText && sameKind(node, replacement);

/** Whether `current` can become `target` in place: the same kind, or a retype whose type still holds its content. */
const canRestyle = (current: PmNode, target: PmNode): boolean => {
    if (sameKind(current, target)) {
        return true;
    }
    return !current.isText && !target.isText && target.type.validContent(current.content);
};

type SyncedRange = { from: number; to: number };

/**
 * Which children of a changed stretch are synced one by one, as offsets into it: all of them, or past `PAIR_LIMIT`
 * only the one holding `head`. `starts` holds each child's start, then the stretch's end.
 */
const syncedRange = (starts: readonly number[], head: number): SyncedRange => {
    const count = starts.length - 1;
    if (count <= PAIR_LIMIT) {
        return { from: 0, to: count };
    }
    for (let index = 0; index < count; index++) {
        if (at(starts, index) < head && head < at(starts, index + 1)) {
            return { from: index, to: index + 1 };
        }
    }
    return { from: count, to: count };
};

/** A node of the document and the node it becomes. */
type Transition = { current: PmNode; target: PmNode };

/** Text block content: one replace over what differs, so a caret outside it, or before it in the block, stays put. */
const syncInline = (transaction: Transaction, from: number, { current, target }: Transition): void => {
    const start = current.content.findDiffStart(target.content, from);
    const end = current.content.findDiffEnd(target.content, from + current.content.size, from + target.content.size);
    if (start === null || end === null) {
        return;
    }
    let { a: endA, b: endB } = end;
    const replacement = target.nodeAt(start - from);
    const element = transaction.doc.nodeAt(start);
    if (endA - start === 1 && endB - start === 1 && element !== null && sameInlineElement(element, replacement)) {
        // An inline element whose value alone changed keeps its view and any selection on it.
        setChangedAttributes(transaction, { pos: start, node: element }, replacement.attrs);
        return;
    }
    // The ends can cross when the change is a repeat of its neighbours.
    const overlap = start - Math.min(endA, endB);
    if (overlap > 0) {
        endA += overlap;
        endB += overlap;
    }
    // A caret inside the change maps to its end, so the end must not split a character the user sees.
    const remainder = graphemeRemainder(target, endB - from);
    endA += remainder;
    endB += remainder;
    transaction.replace(start, endA, target.slice(start - from, endB - from));
};

/** One child into another: restyled in place when its content still fits, so a caret inside stays, then its content synced. */
const syncChild = (transaction: Transaction, pos: number, transition: Transition): void => {
    const { current, target } = transition;
    // A draft (an inline still being made) is in no document the host holds, so it alone is no change.
    if (current.eq(target) || withoutDrafts(current).eq(target)) {
        return;
    }
    if (!canRestyle(current, target)) {
        transaction.replaceWith(pos, pos + current.nodeSize, target);
        return;
    }
    if (sameKind(current, target)) {
        setChangedAttributes(transaction, { pos, node: current }, target.attrs);
    } else {
        transaction.setNodeMarkup(pos, target.type, target.attrs, target.marks);
    }
    if (!current.content.eq(target.content)) {
        syncContent(transaction, pos + 1, transition);
    }
};

/** The content of `current`, starting at `from`, into that of `target`. */
const syncContent = (transaction: Transaction, from: number, transition: Transition): void => {
    const { current, target } = transition;
    if (current.inlineContent) {
        syncInline(transaction, from, transition);
        return;
    }
    const before = current.children;
    const after = target.children;
    const starts = [from];
    for (const child of before) {
        starts.push(at(starts, starts.length - 1) + child.nodeSize);
    }
    // Unchanged children anchor the change; going last to first keeps earlier positions valid.
    const bounds = equalChildren(before, after);
    bounds.reverse();
    bounds.push([-1, -1]);
    let endA = before.length;
    let endB = after.length;
    for (const [anchorA, anchorB] of bounds) {
        const startA = anchorA + 1;
        const startB = anchorB + 1;
        if (endA - startA === endB - startB) {
            const synced = syncedRange(starts.slice(startA, endA + 1), transaction.selection.head);
            transaction.replaceWith(
                at(starts, startA + synced.to),
                at(starts, endA),
                after.slice(startB + synced.to, endB),
            );
            for (let offset = synced.to - 1; offset >= synced.from; offset--) {
                syncChild(transaction, at(starts, startA + offset), {
                    current: at(before, startA + offset),
                    target: at(after, startB + offset),
                });
            }
            transaction.replaceWith(
                at(starts, startA),
                at(starts, startA + synced.from),
                after.slice(startB, startB + synced.from),
            );
        } else {
            transaction.replaceWith(at(starts, startA), at(starts, endA), after.slice(startB, endB));
        }
        endA = anchorA;
        endB = anchorB;
    }
};

/**
 * Turns the content of `transaction`'s document into `next`'s, touching only the children that differ, so the caret
 * and the user's undo history map through and stay put.
 */
export const syncDocument = (transaction: Transaction, next: PmNode): void => {
    syncContent(transaction, 0, { current: transaction.doc, target: next });
};
