/* (c) Copyright Frontify Ltd., all rights reserved. */

import { closeHistory, history, isHistoryTransaction, redo, redoDepth, undo, undoDepth } from 'prosemirror-history';
import { keydownHandler } from 'prosemirror-keymap';
import { type Command, EditorState, Plugin, type Transaction } from 'prosemirror-state';

export { isHistoryTransaction, redo, undo };

// The root transaction after one that carries this meta starts a new undo group (SPEC-rich-text-runtime/AC-053).
const CLOSES_NEXT = 'rte.closes-next';

/**
 * The undo history: 100 steps, and adjacent edits within 500 ms in one step (SPEC-rich-text-runtime/AC-051), with
 * `keys` in the `history` phase, such as Backspace right after an input rule (SPEC-rich-text-editing, Key precedence).
 */
export const historyPlugin = (keys: Readonly<Record<string, Command>>): Plugin => {
    const stock = history({ depth: 100, newGroupDelay: 500 });
    return new Plugin({ ...stock.spec, props: { ...stock.spec.props, handleKeyDown: keydownHandler(keys) } });
};

export const canUndo = (state: EditorState): boolean => undoDepth(state) > 0;
export const canRedo = (state: EditorState): boolean => redoDepth(state) > 0;

/** Ends the open undo group before `transaction`, and makes the root transaction after it start a new one too. */
export const closeGroup = (transaction: Transaction): Transaction =>
    closeHistory(transaction).setMeta(CLOSES_NEXT, true);

/** Ends the open undo group before `root`, as the batch before it asked. */
export const startGroup = (root: Transaction): Transaction => closeHistory(root);

/**
 * Whether the root after a batch starts a new undo group: the batch closed one, or changed the document outside
 * history, which `prosemirror-history` would otherwise keep the open group across (SPEC-rich-text-runtime/AC-056).
 */
export const closesNext = (transactions: readonly Transaction[]): boolean =>
    transactions.some(
        (transaction) =>
            transaction.getMeta(CLOSES_NEXT) === true ||
            (transaction.docChanged && transaction.getMeta('addToHistory') === false),
    );

/** A new state with the same plugins and an empty history (SPEC-rich-text-runtime/AC-052). */
export const reset = (state: EditorState): EditorState =>
    EditorState.create({ doc: state.doc, selection: state.selection, plugins: state.plugins });
