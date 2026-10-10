/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ResolvedPos } from 'prosemirror-model';
import { type Command, type EditorState, Plugin, PluginKey, TextSelection, type Transaction } from 'prosemirror-state';
import { ReplaceStep } from 'prosemirror-transform';

import {
    COMMAND_META,
    type CompiledInputRule,
    type LineStartRule,
    type MarkDelimiterRule,
    NORMALIZE_META,
    ORIGIN_META,
    type PluginImplementation,
    type QuotesRule,
    type TextReplaceRule,
} from '#/definition';
import { INPUT_RULES_PLUGIN } from '#/model/capabilities';
import { OBJECT_REPLACEMENT } from '#/model/values';

import { closeGroup, isHistoryTransaction, undo } from './history';

// As `prosemirror-inputrules`, a rule reads at most this much text before the caret.
const MAX_MATCH = 500;
const WORD = /[\p{L}\p{M}\p{N}]/u;

/** Whether the last batch fired a rule and nothing moved or changed since, which Backspace then undoes. */
const firedKey = new PluginKey<boolean>(INPUT_RULES_PLUGIN.id);
// The root meta that applies a typed root again with no rule, once the batch with its rule was refused.
const RULES_OFF = 'rte.input-rules-off';
// The root meta with the rules that one typed root may not fire.
const RULES_SETTING = 'rte.input-rules-setting';
/** A language's quotation marks, opening and closing, and its apostrophe. */
interface Quotes {
    readonly primary: readonly [string, string];
    readonly secondary: readonly [string, string];
    readonly apostrophe: string;
}
const quotesOf = (primary: string, secondary: string): Quotes => ({
    primary: [primary.charAt(0), primary.charAt(1)],
    secondary: [secondary.charAt(0), secondary.charAt(1)],
    apostrophe: '’',
});
// The quotation marks of CLDR 48's delimiters data by language tag; a regional tag with the same marks as its language
// has no row.
const ENGLISH = quotesOf('“”', '‘’');
const QUOTES: Readonly<Record<string, Quotes>> = {
    en: ENGLISH,
    de: quotesOf('„“', '‚‘'),
    es: quotesOf('“”', '‘’'),
    fr: quotesOf('«»', '«»'),
    'fr-CH': quotesOf('«»', '‹›'),
    it: quotesOf('«»', '“”'),
    ja: quotesOf('「」', '『』'),
    nl: quotesOf('‘’', '‘’'),
    pl: quotesOf('„”', '«»'),
    pt: quotesOf('“”', '‘’'),
    'pt-PT': quotesOf('«»', '“”'),
};
// Before these, as after a space, a line break or at the block start, a typed quote opens (Tiptap's Typography rules).
const OPENS_AFTER = new RegExp(`[\\s([{<'"${OBJECT_REPLACEMENT}]`, 'u');

/** Whether a rule fired in a batch. */
export const firedRule = (transactions: readonly Transaction[]): boolean =>
    transactions.some((transaction) => transaction.getMeta(firedKey) === true);

/**
 * Marks a root so no rule fires for it: a rule fires only when the policy and the limits allow its result, so the
 * typed text lands either way (SPEC-rich-text-editing/AC-037).
 */
export const withoutRules = (root: Transaction): Transaction => root.setMeta(RULES_OFF, true);

/** What the host's `inputRules` prop and the authoring policy turn off when a typed root arrives. */
export interface RuleSetting {
    /** Rule IDs the host's `inputRules` prop excludes (SPEC-rich-text-editing/AC-101). */
    readonly exclude: readonly string[];
    /** Features whose policy forbids creating, whose rules never fire (SPEC-rich-text-editing/AC-037). */
    readonly refused: readonly string[];
}

/** Marks a typed root with the rules it may not fire, read on each input, so no plugin is rebuilt (AC-042, AC-101). */
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

/** Whether text between `from` and `to` carries a code mark, so a match there never fires (SPEC-rich-text-editing/AC-039). */
const holdsCode = (state: EditorState, from: number, to: number) => {
    let code = false;
    state.doc.nodesBetween(from, to, (node) => {
        code ||= node.marks.some((mark) => mark.type.spec.code === true);
    });
    return code;
};

/** Runs the rule's command, then removes its marker, so the block keeps the text after the caret. */
const lineStart = (rule: LineStartRule, state: EditorState, $cursor: ResolvedPos, before: string) => {
    if (before !== `${rule.marker} ` || before.length !== $cursor.parentOffset) {
        return null;
    }
    // A block that already is the rule's target keeps the marker as text, so `> ` in a quote never lifts it out.
    if (holdsCode(state, $cursor.start(), $cursor.pos) || rule.command.active(state, rule.payload) === true) {
        return null;
    }
    const dispatched: Transaction[] = [];
    if (!rule.command.run(state, (transaction) => dispatched.push(transaction), rule.payload)) {
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
    if (holdsCode(state, from, $cursor.pos)) {
        return null;
    }
    return state.tr
        .delete(start + closeAt, $cursor.pos)
        .addMark(from + open.length, start + closeAt, mark.create())
        .delete(from, from + open.length)
        .removeStoredMark(mark);
};

/**
 * Replaces the text that `match` finds before the caret; a `boundary` rule matches before the typed character, which
 * must be no word character and stays, so `--brand` keeps its hyphens (SPEC-rich-text-editing/AC-102).
 */
const textReplace = (rule: TextReplaceRule, state: EditorState, $cursor: ResolvedPos, before: string) => {
    let text = before;
    let kept = '';
    if (rule.boundary) {
        kept = Array.from(before).at(-1) ?? '';
        // A longer dash run or an arrow such as `-->` stays as typed.
        if (kept === '' || WORD.test(kept) || kept === '-' || kept === '>') {
            return null;
        }
        text = before.slice(0, -kept.length);
    }
    const found = rule.match.exec(text);
    if (found === null) {
        return null;
    }
    // A boundary rule replaces a whole run, so `a --- b` keeps its three hyphens.
    if (rule.boundary && text.charAt(found.index - 1) === found[0].charAt(0)) {
        return null;
    }
    const from = $cursor.pos - before.length + found.index;
    if (holdsCode(state, from, $cursor.pos)) {
        return null;
    }
    const replacement = text.replace(rule.match, rule.replace).slice(found.index);
    return state.tr.insertText(replacement, from, $cursor.pos - kept.length);
};

/** The language at the caret: a passage's `language` mark, else the nearest block or the document `lang`. */
const langAt = ($cursor: ResolvedPos): string => {
    for (const mark of $cursor.marks()) {
        if (typeof mark.attrs.lang === 'string') {
            return mark.attrs.lang;
        }
    }
    for (let depth = $cursor.depth; depth >= 0; depth -= 1) {
        const { lang } = $cursor.node(depth).attrs;
        if (typeof lang === 'string') {
            return lang;
        }
    }
    return 'en';
};

/** Turns a typed quote into the opening or closing quote of the language at the caret, and `'` after a letter into its apostrophe. */
const quotes = (rule: QuotesRule, state: EditorState, $cursor: ResolvedPos, before: string) => {
    if (!before.endsWith(rule.marker)) {
        return null;
    }
    const lang = langAt($cursor);
    let marks = QUOTES[lang];
    if (marks === undefined) {
        marks = QUOTES[lang.split('-')[0] ?? ''];
    }
    if (marks === undefined) {
        marks = ENGLISH;
    }
    let [open, close] = marks.primary;
    if (rule.marker === "'") {
        [open, close] = marks.secondary;
    }
    const previous = Array.from(before.slice(0, -1)).at(-1) ?? '';
    let quote = close;
    if (previous === '' || OPENS_AFTER.test(previous) || [...marks.primary, ...marks.secondary].includes(previous)) {
        quote = open;
    } else if (rule.marker === "'" && WORD.test(previous)) {
        quote = marks.apostrophe;
    }
    return state.tr.insertText(quote, $cursor.pos - 1, $cursor.pos);
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
    for (const rule of rules) {
        let change: Transaction | null;
        if (rule.kind === 'line-start') {
            change = lineStart(rule, state, $cursor, before);
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
                if (transaction.getMeta('appendedTransaction') !== undefined) {
                    return fired;
                }
                // A stored mark or a command at the caret is another change too (SPEC-rich-text-editing/AC-041).
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
            // Composed text never fires a rule, which would rewrite the composing range (SPEC-rich-text-editing/AC-038).
            const composed = root.getMeta('composition') !== undefined || root.getMeta(NORMALIZE_META) === 'later';
            if (composed || root.getMeta(RULES_OFF) === true) {
                return null;
            }
            const end = typedEnd(root);
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
            const change = fire(rules, state, end);
            if (change === null) {
                return null;
            }
            return closeGroup(change.setMeta(firedKey, true));
        },
    });

/** Undoes the rule that the last batch fired through history, restoring the typed text (SPEC-rich-text-editing/AC-041). */
export const undoInputRule: Command = (state, dispatch) => firedKey.getState(state) === true && undo(state, dispatch);
