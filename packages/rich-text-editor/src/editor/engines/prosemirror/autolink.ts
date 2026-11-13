/* (c) Copyright Frontify Ltd., all rights reserved. */

import { closeHistory, undo } from 'prosemirror-history';
import { type InputRule } from 'prosemirror-inputrules';
import { type Mark as PmMark, type MarkType as PmMarkType, type Node as PmNode, type Schema } from 'prosemirror-model';
import { type EditorState, Plugin, PluginKey, type Plugin as PmPlugin, type Transaction } from 'prosemirror-state';

import { INLINE_PLACEHOLDER, type PluginRegistry } from '#/core';

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

/** Punctuation that ends a sentence rather than a link, though a link may contain it. */
const TRAILING_PUNCTUATION = /[.,;:!?]+$/;

const count = (text: string, character: string): number => text.split(character).length - 1;

/** Drops trailing punctuation, and a trailing `)` only while it has no `(` to close. */
const trimTrailingPunctuation = (address: string): string => {
    let trimmed = address;
    for (;;) {
        const next = trimmed.replace(TRAILING_PUNCTUATION, '');
        const unbalanced = next.endsWith(')') && count(next, ')') > count(next, '(');
        if (!unbalanced && next === trimmed) {
            return trimmed;
        }
        trimmed = unbalanced ? next.slice(0, -1) : next;
    }
};

/** How much text before the caret a rule reads, as the engine's input rules do. */
const MAX_MATCH = 500;

/** The range a token covers, and the mark it gets. */
type MarkRange = { from: number; to: number; mark: PmMark };

type MarkPatternMatcher = {
    markType: PmMarkType;
    pattern: RegExp;
    /** The range to mark and the mark, or null when the token is no match or already carries a mark. */
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
    const pattern = new RegExp(`(?:^|[\\s${INLINE_PLACEHOLDER}])((?:${rule.pattern.source}))\\s$`, flags);

    const find = (state: EditorState, match: RegExpMatchArray, start: number): MarkRange | null => {
        // A token pattern may match across an inline element: only what follows the last one counts.
        const typed = match[1]?.split(INLINE_PLACEHOLDER).pop();
        if (!typed) {
            return null;
        }
        const linked = trimTrailingPunctuation(typed);
        if (!token.test(linked)) {
            return null;
        }
        // The match is the token plus the terminator, and maybe the whitespace before the token.
        const from = start + (match[0].length - 1 - typed.length);
        const to = from + linked.length;
        if ([markType, ...context.excludedMarks].some((type) => state.doc.rangeHasMark(from, to, type))) {
            return null;
        }
        return { from, to, mark: markType.create(valueAttrsFor(rule.value(linked))) };
    };
    return { markType, pattern, find };
};

/**
 * `https://example.com ` -> the address carries the mark, the space does not.
 * Punctuation right before the space is left out of the mark. A token that
 * already carries the mark, or one that opts out of rules, stays as typed.
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
type PendingLink = MarkRange & { text: string };

/** What reading an address before the caret needs. */
type Autolinker = {
    matchers: readonly MarkPatternMatcher[];
    excludedMarks: readonly PmMarkType[];
};

const autolinkKey = new PluginKey<boolean>('autolinkOnEnter');

const addressBeforeCaret = (
    state: EditorState,
    { matchers, excludedMarks }: Autolinker,
    composing: boolean,
): PendingLink | null => {
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

/** The link as its own history step, so the first undo takes back the link and keeps the new line. */
const linkTransaction = (state: EditorState, link: PendingLink, focused: boolean): Transaction | null => {
    if (link.to > state.doc.content.size || state.doc.textBetween(link.from, link.to) !== link.text) {
        return null;
    }
    // Backspace takes the link back only while the author is still in the editor.
    return closeHistory(state.tr.addMark(link.from, link.to, link.mark)).setMeta(autolinkKey, focused);
};

/**
 * Enter and Shift-Enter end a token as a space does: the keypress carries on
 * (always "not handled") to split the block or break the line, and the address
 * before the caret is linked right after, as its own history step. Backspace
 * right after takes the link back and keeps the text.
 */
export const autolinkOnEnter = (registry: PluginRegistry, schema: Schema): PmPlugin[] => {
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
    const autolinker: Autolinker = { matchers, excludedMarks: context.excludedMarks };

    // Set only by the key handler and its fallback: a state can be applied and thrown away (`blocks.setType`).
    let pending: { link: PendingLink; doc: PmNode } | null = null;

    const plugin = new Plugin<boolean>({
        key: autolinkKey,
        state: {
            init: () => false,
            // True while nothing has happened since the link was added.
            apply: (transaction, justLinked) => {
                const meta: unknown = transaction.getMeta(autolinkKey);
                if (typeof meta === 'boolean') {
                    return meta;
                }
                if (transaction.docChanged || transaction.selectionSet || transaction.storedMarksSet) {
                    return false;
                }
                return justLinked;
            },
        },
        props: {
            handleDOMEvents: {
                blur: (view) => {
                    if (autolinkKey.getState(view.state) === true) {
                        view.dispatch(view.state.tr.setMeta(autolinkKey, false));
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
                    autolinkKey.getState(view.state) === true
                ) {
                    return undo(view.state, view.dispatch);
                }
                if (event.key !== 'Enter' || modified) {
                    return false;
                }
                const link = addressBeforeCaret(view.state, autolinker, view.composing);
                if (!link) {
                    return false;
                }
                const { doc } = view.state;
                pending = { link, doc };
                // A key that changes nothing (Enter that blurs a single-line editor) still links.
                queueMicrotask(() => {
                    if (pending?.link !== link) {
                        return;
                    }
                    pending = null;
                    if (view.isDestroyed || view.state.doc !== doc) {
                        return;
                    }
                    const transaction = linkTransaction(view.state, link, view.hasFocus());
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
            const { link } = pending;
            let { from, to } = link;
            for (const transaction of transactions) {
                from = transaction.mapping.map(from, 1);
                to = transaction.mapping.map(to, -1);
            }
            return linkTransaction(newState, { ...link, from, to }, true);
        },
    });
    return [plugin];
};
