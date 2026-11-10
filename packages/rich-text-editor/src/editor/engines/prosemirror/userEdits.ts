/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, Plugin, PluginKey, type Transaction } from 'prosemirror-state';

type StepMap = Transaction['mapping']['maps'][number];

/** A stretch of the current document an undoable change wrote, empty where it only deleted. */
type Range = { from: number; to: number };

const userEditsKey = new PluginKey<readonly Range[]>('rte-user-edits');

/** Widens over text inserted at either edge, so the check below errs towards forgetting the history. */
const mapRange = (map: StepMap, { from, to }: Range): Range => ({ from: map.map(from, -1), to: map.map(to, 1) });

const withRange = (ranges: readonly Range[], added: Range): Range[] => {
    let { from, to } = added;
    const kept: Range[] = [];
    for (const range of ranges) {
        if (range.to < from || range.from > to) {
            kept.push(range);
            continue;
        }
        from = Math.min(from, range.from);
        to = Math.max(to, range.to);
    }
    kept.push({ from, to });
    return kept;
};

const rangesOf = (state: EditorState): readonly Range[] => {
    const ranges = userEditsKey.getState(state);
    if (ranges === undefined) {
        throw new Error('The editor state has no user edits plugin.');
    }
    return ranges;
};

/**
 * Tracks where the changes the undo history holds wrote to the document: every
 * transaction except those kept out of the history. Touching runs merge, so
 * typing a word is one range.
 */
export const userEditsPlugin = (): Plugin<readonly Range[]> =>
    new Plugin({
        key: userEditsKey,
        state: {
            init: (): readonly Range[] => [],
            apply(transaction, ranges) {
                if (!transaction.docChanged) {
                    return ranges;
                }
                const undoable = transaction.getMeta('addToHistory') !== false;
                let next = ranges;
                for (const map of transaction.mapping.maps) {
                    next = next.map((range) => mapRange(map, range));
                    if (undoable) {
                        // oxlint-disable-next-line unicorn/no-array-for-each -- StepMap.forEach is ProseMirror's only way to read a step's ranges.
                        map.forEach((_oldStart, _oldEnd, newStart, newEnd) => {
                            next = withRange(next, { from: newStart, to: newEnd });
                        });
                    }
                }
                return next;
            },
        },
    });

/**
 * Whether `transaction`, built on `state`, rewrites something the user's
 * undoable changes wrote or deleted. Their undo steps then map onto the new
 * text and would take it out instead of the user's own.
 */
export const rewritesUserEdits = (state: EditorState, transaction: Transaction): boolean => {
    let ranges = rangesOf(state);
    for (const map of transaction.mapping.maps) {
        let rewrites = false;
        // oxlint-disable-next-line unicorn/no-array-for-each -- StepMap.forEach is ProseMirror's only way to read a step's ranges.
        map.forEach((oldStart, oldEnd) => {
            if (ranges.some((range) => oldStart < range.to && oldEnd > range.from)) {
                rewrites = true;
            }
        });
        if (rewrites) {
            return true;
        }
        ranges = ranges.map((range) => mapRange(map, range));
    }
    return false;
};
