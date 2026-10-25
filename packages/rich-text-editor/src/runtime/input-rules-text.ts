/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ResolvedPos } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';

import { type QuotesRule, type TextReplaceRule } from '#/definition';
import { OBJECT_REPLACEMENT } from '#/model/values';

import { holdsCode, WORD } from './input-rules-common';

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

/**
 * Replaces the text that `match` finds before the caret; a `boundary` rule matches before the typed character, which
 * must be no word character and stays, so `--brand` keeps its hyphens.
 */
export const textReplace = (rule: TextReplaceRule, state: EditorState, $cursor: ResolvedPos, before: string) => {
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
    // A boundary rule replaces a whole run, so `a --- b` keeps its three hyphens, and `<!-- ` and `<-- ` stay as typed.
    const lead = text.charAt(found.index - 1);
    if (rule.boundary && (lead === found[0].charAt(0) || lead === '<' || lead === '!')) {
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
export const quotes = (rule: QuotesRule, state: EditorState, $cursor: ResolvedPos, before: string) => {
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
    const typed = before.slice(0, -1);
    const previous = Array.from(typed).at(-1) ?? '';
    // An inner quote that the text before opened and did not close closes after a letter; otherwise that is an apostrophe.
    const [innerOpen, innerClose] = marks.secondary;
    const depth = typed.split(innerOpen).length - typed.split(innerClose).length;
    // French nests « » in « », so an inner quote is open only inside an open outer one.
    let innerOpened = depth > 0;
    if (innerOpen === marks.primary[0]) {
        innerOpened = depth > 1;
    }
    let quote = close;
    if (previous === '' || OPENS_AFTER.test(previous) || previous === marks.primary[0] || previous === innerOpen) {
        quote = open;
    } else if (rule.marker === "'" && WORD.test(previous) && !innerOpened) {
        quote = marks.apostrophe;
    }
    return state.tr.insertText(quote, $cursor.pos - 1, $cursor.pos);
};
