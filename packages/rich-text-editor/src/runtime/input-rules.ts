/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ResolvedPos } from 'prosemirror-model';
import { type Command, type EditorState, Plugin, PluginKey, TextSelection, type Transaction } from 'prosemirror-state';
import { ReplaceStep } from 'prosemirror-transform';

import {
    type CompiledInputRule,
    type LineStartRule,
    type MarkDelimiterRule,
    ORIGIN_META,
    type PluginImplementation,
} from '#/definition';
import { INPUT_RULES_PLUGIN } from '#/model/capabilities';

import { closeGroup, isHistoryTransaction, undo } from './history';

// As `prosemirror-inputrules`, a rule reads at most this much text before the caret.
const MAX_MATCH = 500;
// One character per inline leaf, so an offset in the text is an offset in the block.
const LEAF = '￼';
const WORD = /[\p{L}\p{M}\p{N}]/u;

/** Whether the last batch fired a rule and nothing moved or changed since, which Backspace then undoes. */
const firedKey = new PluginKey<boolean>(INPUT_RULES_PLUGIN.id);

/** Where the text a typed root inserted ends, or `undefined` for any other root, an undo from `beforeinput` included. */
const typedEnd = (root: Transaction): number | undefined => {
    const [step] = root.steps;
    if (root.getMeta(ORIGIN_META) !== 'input' || isHistoryTransaction(root) || root.steps.length !== 1) {
        return undefined;
    }
    if (!(step instanceof ReplaceStep)) {
        return undefined;
    }
    const { content } = step.slice;
    if (content.childCount !== 1 || content.firstChild === null || !content.firstChild.isText) {
        return undefined;
    }
    return step.from + step.slice.size;
};

/** Runs the rule's command, then removes its marker, so the block keeps the text after the caret. */
const lineStart = (rule: LineStartRule, state: EditorState, $cursor: ResolvedPos, before: string) => {
    if (before !== `${rule.marker} ` || before.length !== $cursor.parentOffset) {
        return null;
    }
    const dispatched: Transaction[] = [];
    if (!rule.run(state, (transaction) => dispatched.push(transaction), rule.payload)) {
        return null;
    }
    const [built] = dispatched;
    if (built === undefined) {
        return null;
    }
    return built.delete(built.mapping.map($cursor.start()), built.mapping.map($cursor.pos));
};

/**
 * Marks the text between the delimiters and removes them, when the opening one follows a space, punctuation other
 * than a delimiter character or the block start, no word character follows the caret, and the text neither starts
 * nor ends with a space (SPEC-rich-text-editing/AC-076).
 */
const markDelimiter = (
    rule: MarkDelimiterRule,
    state: EditorState,
    $cursor: ResolvedPos,
    before: string,
    after: string,
) => {
    const { open, close, mark } = rule;
    if (!before.endsWith(close) || WORD.test(after) || !$cursor.parent.type.allowsMarkType(mark)) {
        return null;
    }
    const closeAt = before.length - close.length;
    const openAt = before.lastIndexOf(open, closeAt - open.length - 1);
    const text = before.slice(openAt + open.length, closeAt);
    const previous = before.charAt(openAt - 1);
    if (
        openAt < 0 ||
        text === '' ||
        text.trim() !== text ||
        WORD.test(previous) ||
        (previous !== '' && open.includes(previous))
    ) {
        return null;
    }
    const start = $cursor.pos - before.length;
    const from = start + openAt;
    return state.tr
        .delete(start + closeAt, $cursor.pos)
        .addMark(from + open.length, start + closeAt, mark.create())
        .delete(from, from + open.length)
        .removeStoredMark(mark);
};

/** The change of the first rule that matches the text typed at the caret, outside code. */
const fire = (rules: readonly CompiledInputRule[], state: EditorState, end: number): Transaction | null => {
    const { selection } = state;
    if (!(selection instanceof TextSelection) || selection.$cursor === null || selection.$cursor.pos !== end) {
        return null;
    }
    const { $cursor } = selection;
    const { parent, parentOffset } = $cursor;
    if (parent.type.spec.code === true || $cursor.marks().some((mark) => mark.type.spec.code === true)) {
        return null;
    }
    const before = parent.textBetween(Math.max(0, parentOffset - MAX_MATCH), parentOffset, undefined, LEAF);
    const after = parent.textBetween(parentOffset, Math.min(parent.content.size, parentOffset + 1), undefined, LEAF);
    for (const rule of rules) {
        let change: Transaction | null;
        if (rule.kind === 'line-start') {
            change = lineStart(rule, state, $cursor, before);
        } else {
            change = markDelimiter(rule, state, $cursor, before, after);
        }
        if (change !== null) {
            return change;
        }
    }
    return null;
};

/**
 * The package's rule engine (DR-064): the root transaction inserts the typed text, and a rule's change follows as an
 * appended transaction that closes the undo group before and after it, so the first undo restores the typed text
 * (SPEC-rich-text-editing/AC-100). Text that arrives any other way, such as by paste or a command, fires no rule (AC-040).
 */
export const inputRulesPlugin: PluginImplementation = ({ inputRules }) =>
    new Plugin<boolean>({
        key: firedKey,
        state: {
            init: () => false,
            apply: (transaction, fired) => {
                if (transaction.getMeta(firedKey) === true) {
                    return true;
                }
                // A repair appended after the rule, such as a new `nodeId`, leaves the rule the last change.
                if (
                    transaction.getMeta('appendedTransaction') === undefined &&
                    (transaction.docChanged || transaction.selectionSet)
                ) {
                    return false;
                }
                return fired;
            },
        },
        appendTransaction: (transactions, _old, state) => {
            const [root] = transactions;
            if (transactions.length !== 1 || root === undefined || root.getMeta('appendedTransaction') !== undefined) {
                return null;
            }
            const end = typedEnd(root);
            if (end === undefined) {
                return null;
            }
            const change = fire(inputRules, state, end);
            if (change === null) {
                return null;
            }
            return closeGroup(change.setMeta(firedKey, true));
        },
    });

/** Undoes the rule that the last batch fired through history, restoring the typed text (SPEC-rich-text-editing/AC-041). */
export const undoInputRule: Command = (state, dispatch) => firedKey.getState(state) === true && undo(state, dispatch);
