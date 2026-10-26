/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, TextSelection } from 'prosemirror-state';

import { type EngineSuggestion } from '#/definition';
import { type SuggestionRules } from '#/model/internal';

import { type Match } from './types';

// What `textBetween` writes for an inline leaf, such as a hard break, which also starts a word.
const LEAF = '\uFFFC';
const BREAK_BEFORE = /[\s\uFFFC]$/u;
const PUNCTUATION_BEFORE = /\p{P}$/u;
const BREAK_INSIDE = /[\s\uFFFC]/u;
const LINE_BREAK_INSIDE = /[\n\r\u2028\u2029\uFFFC]/u;

// Built once per count, since the lists read it on every keystroke.
const LEADING_LETTERS = new Map<number, RegExp>();

const leadingLetters = (count: number): RegExp => {
    let pattern = LEADING_LETTERS.get(count);
    if (pattern === undefined) {
        pattern = new RegExp(`^\\p{L}{${count}}`, 'u');
        LEADING_LETTERS.set(count, pattern);
    }

    return pattern;
};

/** Whether `query` after a trigger at a word start, or after punctuation for `afterPunctuation`, opens a list of `rules`. */
const takesQuery = (rules: SuggestionRules, query: string): boolean => {
    if (query.length > rules.maxQuery) {
        return false;
    }

    if ((rules.spaces ? LINE_BREAK_INSIDE : BREAK_INSIDE).test(query)) {
        return false;
    }

    return leadingLetters(rules.leadingLetters).test(query);
};

/** The list the text before the caret opens: the trigger closest to the caret, at a word start, before a query its source takes. */
export const matchAt = (state: EditorState, suggestions: readonly EngineSuggestion[]): Match | null => {
    const { selection } = state;
    if (!(selection instanceof TextSelection) || selection.$cursor === null) {
        return null;
    }

    const $cursor = selection.$cursor;
    const { parent } = $cursor;
    if (!parent.inlineContent || parent.type.spec.code === true) {
        return null;
    }

    if ($cursor.marks().some((mark) => mark.type.spec.code === true)) {
        return null;
    }

    let best: Match | null = null;
    for (const suggestion of suggestions) {
        const { trigger, rules } = suggestion;
        // The character before the trigger tells whether it starts a word.
        const windowStart = Math.max(0, $cursor.parentOffset - rules.maxQuery - trigger.length - 1);
        const before = parent.textBetween(windowStart, $cursor.parentOffset, undefined, LEAF);
        // The nearest trigger that starts a word and whose query the source takes, past ones inside the query.
        for (let at = before.lastIndexOf(trigger); at >= 0; at = at > 0 ? before.lastIndexOf(trigger, at - 1) : -1) {
            const from = $cursor.pos - (before.length - at);
            if (best !== null && from <= best.from) {
                break;
            }

            const preceding = before.slice(0, at);
            let startsWord =
                (at === 0 && windowStart === 0) ||
                (at > 0 &&
                    (BREAK_BEFORE.test(preceding) || (rules.afterPunctuation && PUNCTUATION_BEFORE.test(preceding))));
            if (rules.emptyBlock === true) {
                startsWord =
                    at === 0 &&
                    windowStart === 0 &&
                    parent.type.name === 'paragraph' &&
                    parent.content.size === $cursor.parentOffset;
            }

            const query = before.slice(at + trigger.length);
            if (startsWord && takesQuery(rules, query)) {
                best = { suggestion, from, to: $cursor.pos, query };
                break;
            }
        }
    }

    return best;
};
