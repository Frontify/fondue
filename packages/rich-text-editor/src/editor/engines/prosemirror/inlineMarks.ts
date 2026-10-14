/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin, type Transaction } from 'prosemirror-state';

type Step = Transaction['steps'][number];

/**
 * A step adding or removing a mark over a range, which moves nothing — its map
 * is empty, so the range has to be read off the step.
 */
const markStepRange = (step: Step): { from: number; to: number } | null =>
    'mark' in step && 'from' in step && 'to' in step && typeof step.from === 'number' && typeof step.to === 'number'
        ? { from: step.from, to: step.to }
        : null;

/** The ranges of the final document that the transactions wrote to. */
const changedRanges = (transactions: readonly Transaction[]): [number, number][] => {
    const ranges: [number, number][] = [];
    for (const transaction of transactions) {
        // What earlier transactions wrote, moved to where it is now.
        for (const range of ranges) {
            range[0] = transaction.mapping.map(range[0], -1);
            range[1] = transaction.mapping.map(range[1], 1);
        }
        for (const [index, step] of transaction.steps.entries()) {
            const later = transaction.mapping.slice(index + 1);
            const add = (from: number, to: number): void => {
                ranges.push([later.map(from, -1), later.map(to, 1)]);
            };
            // A step map, not an array: `forEach` is the only way to read its ranges.
            // eslint-disable-next-line unicorn/no-array-for-each
            step.getMap().forEach((_oldStart, _oldEnd, newStart, newEnd) => add(newStart, newEnd));
            const marked = markStepRange(step);
            if (marked !== null) {
                add(marked.from, marked.to);
            }
        }
    }
    return ranges;
};

/**
 * The document format stores no marks on inline elements (mentions), so strip
 * any they pick up (caret marks, a mark toggled over a range, pasted HTML);
 * the editor then holds exactly what `onChange` reports. Only ranges the
 * transactions touched are scanned, since this runs on every keystroke.
 */
export const inlineElementsCarryNoMarksPlugin = (): Plugin =>
    new Plugin({
        appendTransaction(transactions, _oldState, newState) {
            if (!transactions.some((transaction) => transaction.docChanged)) {
                return null;
            }
            const tr = newState.tr;
            const size = newState.doc.content.size;
            for (const [from, to] of changedRanges(transactions)) {
                newState.doc.nodesBetween(Math.max(0, from), Math.min(size, to), (node, pos) => {
                    if (node.isInline && !node.isText && node.marks.length > 0) {
                        tr.removeMark(pos, pos + node.nodeSize, null);
                    }
                });
            }
            return tr.docChanged ? tr : null;
        },
    });
