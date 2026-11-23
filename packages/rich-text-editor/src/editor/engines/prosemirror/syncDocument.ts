/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ArrayChange, diffArrays } from 'diff';
import { Mark, type Node as PmNode } from 'prosemirror-model';
import { type Transaction } from 'prosemirror-state';

import { setChangedAttributes } from './attributes';
import { withoutDrafts } from './documentConversion';

const graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

/** Stands for each inline atom in a block's text, so text offsets equal positions. */
const INLINE_ATOM_STAND_IN = '￼';

/** Distance from `offset` to the end of the character it splits in `textblock` (an emoji, an accented letter), 0 when none. */
const graphemeRemainder = (textblock: PmNode, offset: number): number => {
    const text = textblock.textBetween(0, textblock.content.size, undefined, INLINE_ATOM_STAND_IN);
    const containing = graphemes.segment(text).containing(offset);
    if (containing === undefined || containing.index === offset) {
        return 0;
    }

    return containing.index + containing.segment.length - offset;
};

/** Past this many children, a stretch is replaced whole but for the child holding the caret: each child synced is a step. */
const PAIR_LIMIT = 100;

/** Past this many inserted and removed children, two stretches are not matched up: matching costs the square of it. */
const MATCH_LIMIT = 100;

/** `items[index]`, which the caller has already bounded: a miss is a bug in the diff, not a case to handle. */
const at = <T>(items: readonly T[], index: number): T => {
    const item = items[index];
    if (item === undefined) {
        throw new Error(`No item at index ${index} of ${items.length}.`);
    }

    return item;
};

/** Index pairs of the unchanged children in `changes`, offset by `head` into the children. */
const equalPairs = (changes: readonly ArrayChange<PmNode>[], head: number): [number, number][] => {
    const pairs: [number, number][] = [];
    let oldIndex = head;
    let newIndex = head;

    for (const change of changes) {
        if (change.added) {
            newIndex += change.count;
            continue;
        }

        if (change.removed) {
            oldIndex += change.count;
            continue;
        }

        for (let offset = 0; offset < change.count; offset++) {
            pairs.push([oldIndex + offset, newIndex + offset]);
        }

        oldIndex += change.count;
        newIndex += change.count;
    }

    return pairs;
};

/** Index pairs of equal children, in order. A draft (an inline still being made) does not make a child differ. */
const equalChildren = (before: readonly PmNode[], after: readonly PmNode[]): [number, number][] => {
    const comparable = before.map(withoutDrafts);
    const same = (i: number, j: number): boolean => at(comparable, i).eq(at(after, j));

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

    const changes = diffArrays(comparable.slice(head, before.length - tail), after.slice(head, after.length - tail), {
        comparator: (left, right) => left.eq(right),
        maxEditLength: MATCH_LIMIT,
    });
    if (changes !== undefined) {
        pairs.push(...equalPairs(changes, head));
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
 * Which children of a changed stretch are synced one by one, as offsets into it.
 * All of them, or past `PAIR_LIMIT` only the one holding `head`; `starts` holds each child's start, then the end.
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

/** One child into another, restyled in place when its content fits so a caret inside stays. */
const syncChild = (transaction: Transaction, pos: number, transition: Transition): void => {
    const { current, target } = transition;

    // A draft (an inline still being made) is in no host document, so it alone is no change.
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

/** Turns `transaction`'s document into `next`, touching only what differs, so the caret and undo history map through. */
export const syncDocument = (transaction: Transaction, next: PmNode): void => {
    syncContent(transaction, 0, { current: transaction.doc, target: next });
};
