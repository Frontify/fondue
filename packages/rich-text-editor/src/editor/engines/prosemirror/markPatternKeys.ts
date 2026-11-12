/* (c) Copyright Frontify Ltd., all rights reserved. */

import { closeHistory, undo } from 'prosemirror-history';
import { type InputRule } from 'prosemirror-inputrules';
import { type Mark as PmMark, type MarkType as PmMarkType, type Node as PmNode, type Schema } from 'prosemirror-model';
import { type EditorState, Plugin, PluginKey, type Plugin as PmPlugin, type Transaction } from 'prosemirror-state';

import { INLINE_PLACEHOLDER, type PluginRegistry, type RteMarkPatternTrim, WORD_START_CONTEXT } from '#/core';

import { valueAttrsFor } from './documentConversion';
import {
    isInExcludedMark,
    type RuleContext,
    type RuleHandler,
    type RuleOfKind,
    ruleContext,
    toInputRule,
    withoutStateFlags,
} from './ruleContext';

const count = (text: string, character: string): number => text.split(character).length - 1;

/** Whether the text ends in a closing bracket with no opening one left for it to close. */
const endsInUnbalancedBracket = (text: string, pairs: RteMarkPatternTrim['pairs']): boolean => {
    const closing = text.slice(-1);
    const opening = pairs[closing];
    if (opening === undefined) {
        return false;
    }
    return count(text, closing) > count(text, opening);
};

/** Matches `trim.punctuation` at the end of a token. */
const trailingPunctuation = ({ punctuation }: RteMarkPatternTrim): RegExp =>
    new RegExp(`(?:${punctuation.source})$`, withoutStateFlags(punctuation));

/** Drops the trailing punctuation a rule declares, and a trailing closing bracket only while it has no opening one to close. */
export const trimTrailingPunctuation = (token: string, trim: RteMarkPatternTrim): string => {
    const trailing = trailingPunctuation(trim);
    let trimmed = token;
    for (;;) {
        let next = trimmed.replace(trailing, '');
        if (endsInUnbalancedBracket(next, trim.pairs)) {
            next = next.slice(0, -1);
        }
        if (next === trimmed) {
            return trimmed;
        }
        trimmed = next;
    }
};

/** The characters core says may precede a word, as a class body that also compiles under the `v` flag, where a bracket must be escaped. */
const WORD_START_CLASS_BODY = WORD_START_CONTEXT.replaceAll(/[([{]/g, String.raw`\$&`);

/** What may come right before a token: a word start, or an inline element. */
const TOKEN_OPENERS = `${WORD_START_CLASS_BODY}${INLINE_PLACEHOLDER}`;

/** How much text before the caret a rule reads, as the engine's input rules do. */
const MAX_MATCH = 500;

/** The range a token covers, and the mark it gets. */
type MarkRange = { from: number; to: number; mark: PmMark };

type MarkPatternMatcher = {
    markType: PmMarkType;
    pattern: RegExp;
    /** The range to mark and the mark, or null when the token is no match, already carries a mark, or the rule refuses it. */
    find: (state: EditorState, match: RegExpMatchArray, start: number) => MarkRange | null;
};

/**
 * What typing a space and pressing Enter share: the pattern that finds a token
 * before the caret, and where it sits once found. The pattern ends in the
 * terminator being typed, which is not in the document yet. An inline element
 * ends a token as whitespace does.
 */
const markPatternMatcher = (rule: RuleOfKind<'markPattern'>, context: RuleContext): MarkPatternMatcher | null => {
    const markType = context.schema.marks[rule.mark];
    if (!markType) {
        return null;
    }
    const flags = withoutStateFlags(rule.pattern);
    const token = new RegExp(`^(?:${rule.pattern.source})$`, flags);
    const pattern = new RegExp(String.raw`(?:^|[${TOKEN_OPENERS}])((?:${rule.pattern.source}))\s$`, flags);

    const find = (state: EditorState, match: RegExpMatchArray, start: number): MarkRange | null => {
        // A token pattern may match across an inline element: only what follows the last one counts.
        const typed = match[1]?.split(INLINE_PLACEHOLDER).pop();
        if (!typed) {
            return null;
        }
        let trimmed = typed;
        if (rule.trim !== undefined) {
            trimmed = trimTrailingPunctuation(typed, rule.trim);
        }
        if (!token.test(trimmed)) {
            return null;
        }
        // The match is the token plus the terminator, and maybe the whitespace before the token.
        const from = start + (match[0].length - 1 - typed.length);
        const to = from + trimmed.length;
        if ([markType, ...context.excludedMarks].some((type) => state.doc.rangeHasMark(from, to, type))) {
            return null;
        }
        const value = rule.value(trimmed);
        if (value === null) {
            return null;
        }
        return { from, to, mark: markType.create(valueAttrsFor(value)) };
    };
    return { markType, pattern, find };
};

/**
 * A token followed by a space gets the rule's mark, the space does not.
 * Punctuation right before the space is left out of the mark when the rule
 * declares a `trim`. A token that already carries the mark, or one that opts
 * out of rules, stays as typed.
 */
export const markPatternRule = (rule: RuleOfKind<'markPattern'>, context: RuleContext): InputRule | null => {
    const matcher = markPatternMatcher(rule, context);
    if (!matcher) {
        return null;
    }
    const { markType, pattern, find } = matcher;
    const handler: RuleHandler = (state, match, start, end) => {
        const found = find(state, match, start);
        if (!found) {
            return null;
        }
        // One space follows the token, whatever sits there now: nothing, the
        // composed space, or the selection the typed space replaces.
        return state.tr
            .addMark(found.from, found.to, found.mark)
            .replaceWith(start + match[0].length - 1, end, state.schema.text(' '))
            .removeStoredMark(markType);
    };
    return toInputRule({ pattern, handler }, context);
};

/** A token found before the caret, with the text it had then. */
type PendingToken = MarkRange & { text: string };

/** What reading a token before the caret needs. */
type TokenMatcher = {
    matchers: readonly MarkPatternMatcher[];
    excludedMarks: readonly PmMarkType[];
};

const markTokenKey = new PluginKey<boolean>('markTokenOnEnter');

const tokenBeforeCaret = (
    state: EditorState,
    { matchers, excludedMarks }: TokenMatcher,
    composing: boolean,
): PendingToken | null => {
    const { $from, empty } = state.selection;
    if (!empty || !$from.parent.isTextblock || composing) {
        return null;
    }
    if (isInExcludedMark(state, excludedMarks, $from.pos)) {
        return null;
    }
    const textBefore = $from.parent.textBetween(
        Math.max(0, $from.parentOffset - MAX_MATCH),
        $from.parentOffset,
        undefined,
        INLINE_PLACEHOLDER,
    );
    for (const { pattern, find } of matchers) {
        const match = pattern.exec(`${textBefore} `);
        if (!match) {
            continue;
        }
        const found = find(state, match, $from.pos - (match[0].length - 1));
        if (found) {
            return { ...found, text: state.doc.textBetween(found.from, found.to) };
        }
    }
    return null;
};

/** The token as its own history step, so the first undo takes back the token and keeps the new line. */
const markTransaction = (state: EditorState, token: PendingToken, focused: boolean): Transaction | null => {
    if (token.to > state.doc.content.size || state.doc.textBetween(token.from, token.to) !== token.text) {
        return null;
    }
    // Backspace takes the token back only while the author is still in the editor.
    return closeHistory(state.tr.addMark(token.from, token.to, token.mark)).setMeta(markTokenKey, focused);
};

/**
 * Enter and Shift-Enter end a token as a space does: the keypress carries on
 * (always "not handled") to split the block or break the line, and the token
 * before the caret is marked right after, as its own history step. Backspace
 * right after takes the token back and keeps the text.
 */
export const markTokenOnEnter = (registry: PluginRegistry, schema: Schema): PmPlugin[] => {
    const context = ruleContext(registry, schema);
    const matchers = registry.inputRules.flatMap((rule) => {
        if (rule.kind !== 'markPattern') {
            return [];
        }
        return markPatternMatcher(rule, context) ?? [];
    });
    if (matchers.length === 0) {
        return [];
    }
    const tokenMatcher: TokenMatcher = { matchers, excludedMarks: context.excludedMarks };

    // Set only by the key handler and its fallback: a state can be applied and thrown away (`blocks.setType`).
    let pending: { token: PendingToken; doc: PmNode } | null = null;

    const plugin = new Plugin<boolean>({
        key: markTokenKey,
        state: {
            init: () => false,
            // True while nothing has happened since the token was added.
            apply: (transaction, justMarked) => {
                const meta: unknown = transaction.getMeta(markTokenKey);
                if (typeof meta === 'boolean') {
                    return meta;
                }
                if (transaction.docChanged || transaction.selectionSet || transaction.storedMarksSet) {
                    return false;
                }
                return justMarked;
            },
        },
        props: {
            handleDOMEvents: {
                blur: (view) => {
                    if (markTokenKey.getState(view.state) === true) {
                        view.dispatch(view.state.tr.setMeta(markTokenKey, false));
                    }
                    return false;
                },
            },
            handleKeyDown: (view, event) => {
                const modified = event.altKey || event.ctrlKey || event.metaKey;
                if (
                    event.key === 'Backspace' &&
                    !modified &&
                    !event.shiftKey &&
                    markTokenKey.getState(view.state) === true
                ) {
                    return undo(view.state, view.dispatch);
                }
                if (event.key !== 'Enter' || modified) {
                    return false;
                }
                const token = tokenBeforeCaret(view.state, tokenMatcher, view.composing);
                if (!token) {
                    return false;
                }
                const { doc } = view.state;
                pending = { token, doc };
                // A key that changes nothing (Enter that blurs a single-line editor) still marks the token.
                queueMicrotask(() => {
                    if (pending?.token !== token) {
                        return;
                    }
                    pending = null;
                    if (view.isDestroyed || view.state.doc !== doc) {
                        return;
                    }
                    const transaction = markTransaction(view.state, token, view.hasFocus());
                    if (transaction) {
                        view.dispatch(transaction);
                    }
                });
                return false;
            },
        },
        appendTransaction: (transactions, oldState, newState) => {
            // Only the key's own change: later ones start from another document.
            if (pending === null || pending.doc !== oldState.doc) {
                return null;
            }
            if (!transactions.some((transaction) => transaction.docChanged)) {
                return null;
            }
            const { token } = pending;
            let { from, to } = token;
            for (const transaction of transactions) {
                from = transaction.mapping.map(from, 1);
                to = transaction.mapping.map(to, -1);
            }
            return markTransaction(newState, { ...token, from, to }, true);
        },
    });
    return [plugin];
};
