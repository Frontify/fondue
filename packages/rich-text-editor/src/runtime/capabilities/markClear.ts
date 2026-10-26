/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkType } from 'prosemirror-model';
import { type EditorState, type Transaction } from 'prosemirror-state';

import { enclosingRange, type Extend, extendOf } from './markRanges';
import { markableText } from './markToggle';
import { type CapabilityImplementation, markTypesOf, selectedTextblocks } from './shared';

/** The selected range, or at a caret the whole textblocks around it. */
const blockRanges = (state: EditorState): { from: number; to: number }[] => {
    if (!state.selection.empty) {
        return [{ from: state.selection.from, to: state.selection.to }];
    }

    const blocks = selectedTextblocks(state);
    if (blocks.length > 0) {
        return blocks.map(({ node, pos }) => ({ from: pos + 1, to: pos + 1 + node.content.size }));
    }

    const { $from } = state.selection;
    if ($from.parent.isTextblock) {
        return [{ from: $from.start(), to: $from.end() }];
    }

    return [{ from: state.selection.from, to: state.selection.to }];
};

/** Removes every mark of `types` from the selected range, or at a caret from the whole textblock and the stored marks. */
const clearBlockMarks = (
    state: EditorState,
    dispatch: ((transaction: Transaction) => void) | undefined,
    types: readonly MarkType[],
): boolean => {
    const transaction = state.tr;
    for (const { from, to } of blockRanges(state)) {
        if (from === to) {
            continue;
        }

        for (const type of types) {
            transaction.removeMark(from, to, type);
        }
    }

    if (state.selection.empty) {
        const stored = state.storedMarks ?? state.selection.$from.marks();
        const kept = stored.filter((mark) => !types.includes(mark.type));
        if (kept.length !== stored.length) {
            transaction.setStoredMarks(kept);
        }
    }

    if (!transaction.docChanged && !transaction.storedMarksSet) {
        return false;
    }

    dispatch?.(transaction.scrollIntoView());

    return true;
};

/** Removes every mark of `types` from the selected text, or from the stored marks at a caret. */
export const clearMarks = (
    state: EditorState,
    dispatch: ((transaction: Transaction) => void) | undefined,
    types: readonly MarkType[],
    extend: Extend,
): boolean => {
    if (state.selection.empty) {
        const stored = state.storedMarks ?? state.selection.$from.marks();
        const held = types.flatMap((type) => {
            const range = extend === false ? undefined : enclosingRange(state, type, extend);
            if (range === undefined && type.isInSet(stored) === undefined) {
                return [];
            }

            return [{ type, range }];
        });
        if (held.length === 0) {
            return false;
        }

        if (dispatch !== undefined) {
            const transaction = state.tr;
            for (const { type, range } of held) {
                if (range === undefined) {
                    transaction.removeStoredMark(type);
                } else {
                    transaction.removeMark(range.from, range.to, type);
                }
            }

            dispatch(transaction.scrollIntoView());
        }

        return true;
    }

    const ranges = types.flatMap((type) => {
        const run = extend === false ? undefined : enclosingRange(state, type, extend);
        if (run !== undefined) {
            return [{ ...run, type }];
        }

        return markableText(state, type)
            .filter((text) => text.marked)
            .map((text) => ({ ...text, type }));
    });
    if (ranges.length === 0) {
        return false;
    }

    if (dispatch !== undefined) {
        const transaction = state.tr;
        for (const { from, to, type } of ranges) {
            transaction.removeMark(from, to, type);
        }

        dispatch(transaction.scrollIntoView());
    }

    return true;
};

/** Removes the listed marks the model installs as one undo step. */
export const removeMark: CapabilityImplementation = (args, schema) => {
    const types = markTypesOf(args.installed, schema);
    const extend = extendOf(args.extendToMarkRange);

    return {
        run: (state, dispatch) => {
            if (args.wholeBlocks === true) {
                return clearBlockMarks(state, dispatch, types);
            }

            return clearMarks(state, dispatch, types, extend);
        },
        active: () => false,
    };
};
