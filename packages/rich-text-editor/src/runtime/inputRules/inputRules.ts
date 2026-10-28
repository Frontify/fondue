/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Command, type EditorState, Plugin, PluginKey, TextSelection, type Transaction } from 'prosemirror-state';
import { ReplaceStep } from 'prosemirror-transform';

import { INPUT_RULES_PLUGIN, OBJECT_REPLACEMENT } from '#/model/internal';
import {
    COMMAND_META,
    type CompiledInputRule,
    NORMALIZE_META,
    ORIGIN_META,
    type PluginImplementation,
} from '#/runtime/definition';

import { closeGroup, isHistoryTransaction, undo } from '../history';

import { blockStart, lineStart } from './inputRulesBlock';
import { markDelimiter, markPattern } from './inputRulesMarks';
import { quotes, textReplace } from './inputRulesText';

// As `prosemirror-inputrules`, a rule reads at most this much text before the caret.
const MAX_MATCH = 500;

/** Whether the last batch fired a rule and nothing moved or changed since, which Backspace then undoes. */
const firedKey = new PluginKey<boolean>(INPUT_RULES_PLUGIN.id);
// The root meta that applies a typed root again with no rule, once the batch with its rule was refused.
const RULES_OFF = 'rte.input-rules-off';
// The root meta with the rules that one typed root may not fire.
const RULES_SETTING = 'rte.input-rules-setting';
/** The meta of the empty root that Enter dispatches, on which the rules that Enter ends fire. */
export const ENTER_RULES_META = 'rte.enter-rules';
/** Whether a rule fired in a batch. */
export const firedRule = (transactions: readonly Transaction[]): boolean =>
    transactions.some((transaction) => transaction.getMeta(firedKey) === true);

/**
 * Marks a root so no rule fires for it: a rule fires only when the policy and the limits allow its result, so the
 * typed text lands either way.
 */
export const withoutRules = (root: Transaction): Transaction => root.setMeta(RULES_OFF, true);

/** What the host's `inputRules` prop and the authoring policy turn off when a typed root arrives. */
export type RuleSetting = {
    /** Rule IDs the host's `inputRules` prop excludes. */
    exclude: readonly string[];
    /** Features whose policy forbids creating, whose rules never fire. */
    refused: readonly string[];
};

/** Marks a typed root with the rules it may not fire, read on each input, so no plugin is rebuilt. */
export const withRuleSetting = (root: Transaction, setting: RuleSetting): Transaction =>
    root.setMeta(RULES_SETTING, setting);

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

/**
 * The change of the first rule that matches the text typed at the caret, outside code; on `enter`, of the first mark
 * rule that Enter ends, which reads Enter as a line break after the text.
 */
const fire = (
    rules: readonly CompiledInputRule[],
    state: EditorState,
    end: number,
    enter = false,
): Transaction | null => {
    const { selection } = state;
    if (!(selection instanceof TextSelection) || selection.$cursor === null || selection.$cursor.pos !== end) {
        return null;
    }

    const { $cursor } = selection;
    const { parent, parentOffset } = $cursor;
    if (parent.type.spec.code === true || $cursor.marks().some((mark) => mark.type.spec.code === true)) {
        return null;
    }

    const before = parent.textBetween(
        Math.max(0, parentOffset - MAX_MATCH),
        parentOffset,
        undefined,
        OBJECT_REPLACEMENT,
    );
    const after = parent.textBetween(
        parentOffset,
        Math.min(parent.content.size, parentOffset + 1),
        undefined,
        OBJECT_REPLACEMENT,
    );
    if (enter) {
        for (const rule of rules) {
            let change: Transaction | null = null;
            if (rule.kind === 'mark-rule' && rule.onEnter) {
                change = markPattern(rule, state, $cursor, before, '\n');
            }

            if (change !== null) {
                return change;
            }
        }

        return null;
    }

    for (const rule of rules) {
        let change: Transaction | null;
        if (rule.kind === 'line-start') {
            change = lineStart(rule, state, $cursor, before);
        } else if (rule.kind === 'block-rule') {
            change = blockStart(rule, state, $cursor, before);
        } else if (rule.kind === 'mark-rule') {
            change = rule.onInput ? markPattern(rule, state, $cursor, before) : null;
        } else if (rule.kind === 'mark-delimiter') {
            change = markDelimiter(rule, state, $cursor, before, after);
        } else if (rule.kind === 'text-replace') {
            change = textReplace(rule, state, $cursor, before);
        } else {
            change = quotes(rule, state, $cursor, before);
        }

        if (change !== null) {
            return change;
        }
    }

    return null;
};

/**
 * The package's rule engine: the root transaction inserts the typed text, and a rule's change follows as an
 * appended transaction that closes the undo group before and after it, so the first undo restores the typed text.
 * Text that arrives any other way, such as by paste or a command, fires no rule.
 */
export const typedRulesPlugin: PluginImplementation = ({ inputRules }) =>
    new Plugin<boolean>({
        key: firedKey,
        state: {
            init: () => false,
            apply: (transaction, fired) => {
                if (transaction.getMeta(firedKey) === true) {
                    return true;
                }

                // A repair appended after the rule, such as a new `nodeId`, leaves the rule the last change.
                if (transaction.getMeta('appendedTransaction') !== undefined) {
                    return fired;
                }

                // A stored mark or a command at the caret is another change too.
                const changes = transaction.docChanged || transaction.selectionSet || transaction.storedMarksSet;
                if (changes || transaction.getMeta(COMMAND_META) !== undefined) {
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

            // Composed text never fires a rule, which would rewrite the composing range.
            const composed = root.getMeta('composition') !== undefined || root.getMeta(NORMALIZE_META) === 'later';
            if (composed || root.getMeta(RULES_OFF) === true) {
                return null;
            }

            const enter = root.getMeta(ENTER_RULES_META) === true;
            let end = typedEnd(root);
            if (enter) {
                end = state.selection.head;
            }

            if (end === undefined) {
                return null;
            }

            let rules = inputRules;
            const setting = root.getMeta(RULES_SETTING) as RuleSetting | undefined;
            if (setting !== undefined) {
                rules = rules.filter(
                    ({ id, featureId }) => !setting.exclude.includes(id) && !setting.refused.includes(featureId),
                );
            }

            const change = fire(rules, state, end, enter);
            if (change === null) {
                return null;
            }

            return closeGroup(change.setMeta(firedKey, true));
        },
    });

/**
 * Enter's own step before its action: when a rule that Enter ends matches at the caret, dispatches the empty root that
 * the rules fire on, then lets Enter's action run, as ProseMirror's input rules see only typed text.
 */
export const enterRules =
    (rules: readonly CompiledInputRule[]): Command =>
    (state, dispatch) => {
        const enders = rules.filter((rule) => rule.kind === 'mark-rule' && rule.onEnter);
        if (dispatch !== undefined && enders.length > 0 && fire(enders, state, state.selection.head, true) !== null) {
            dispatch(state.tr.setMeta(ENTER_RULES_META, true));
        }

        return false;
    };

/** Undoes the rule that the last batch fired through history, restoring the typed text. */
export const undoInputRule: Command = (state, dispatch) => firedKey.getState(state) === true && undo(state, dispatch);
