/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, PluginKey, type Transaction } from 'prosemirror-state';

import { COMMAND_META, type EngineSuggestion } from '#/definition';
import { SUGGESTIONS_PLUGIN } from '#/model/capabilities';

import { isHistoryTransaction } from '../../history';

import { matchAt } from './match';
import { resultsOf, afterFailure, afterPage } from './references';
import {
    type ActiveSuggestion,
    type Match,
    type SuggestionItem,
    type SuggestionsMeta,
    type SuggestionsState,
} from './types';

// Paste, drop and cut name their event; only typed text opens a list.
const NOT_TYPED = new Set(['paste', 'drop', 'cut']);

export const key = new PluginKey<SuggestionsState>(SUGGESTIONS_PLUGIN.id);

/** Text the author typed, not a command, an undo, a paste or a drop. */
const isTyped = (transaction: Transaction): boolean => {
    if (
        !transaction.docChanged ||
        transaction.getMeta(COMMAND_META) !== undefined ||
        isHistoryTransaction(transaction)
    ) {
        return false;
    }
    const event: unknown = transaction.getMeta('uiEvent');
    return typeof event !== 'string' || !NOT_TYPED.has(event);
};

const mappedDismissal = (transaction: Transaction, dismissed: number | null): number | null => {
    if (dismissed === null) {
        return null;
    }
    const mapped = transaction.mapping.mapResult(dismissed, 1);
    if (mapped.deleted) {
        return null;
    }
    return mapped.pos;
};

const wrapped = (index: number, length: number): number => {
    if (length === 0) {
        return 0;
    }
    return ((index % length) + length) % length;
};

/** The options a request's results or failure give the list. */
const answered = (
    active: ActiveSuggestion,
    meta: SuggestionsMeta | undefined,
): Pick<ActiveSuggestion, 'status' | 'items' | 'index'> | undefined => {
    if (meta?.kind === 'results' && meta.request === active.request) {
        if (active.page === null) {
            return { status: 'ready', items: afterPage([], meta.results), index: 0 };
        }
        // A further page keeps what the list showed, with the first new option active where Load more was, or the last.
        const shown = resultsOf(active.items);
        const items = afterPage(shown, meta.results);
        return { status: 'ready', items, index: Math.max(0, Math.min(shown.length, items.length - 1)) };
    }
    if (meta?.kind === 'failed' && meta.request === active.request) {
        // A failed search offers Retry, after the options of the pages before a failed further page.
        let shown: readonly SuggestionItem[] = [];
        if (active.page !== null) {
            shown = resultsOf(active.items);
        }
        return { status: 'failed', items: afterFailure(shown), index: shown.length };
    }
    return undefined;
};

/** The open list after a transaction that kept its trigger and query, with the meta's results or move applied. */
const keptList = (active: ActiveSuggestion, match: Match, meta: SuggestionsMeta | undefined): ActiveSuggestion => {
    let { status, items, index } = active;
    const answer = answered(active, meta);
    if (answer !== undefined) {
        ({ status, items, index } = answer);
    }
    if (meta?.kind === 'move') {
        index = wrapped(meta.index, items.length);
    }
    return {
        featureId: active.featureId,
        trigger: active.trigger,
        name: active.name,
        command: active.command,
        from: match.from,
        to: match.to,
        query: active.query,
        status,
        items,
        index,
        request: active.request,
        page: active.page,
    };
};

/** A list for a new trigger or query, which keeps the options it showed until the new request answers. */
const requestedList = (match: Match, previous: ActiveSuggestion | null, request: number): ActiveSuggestion => {
    let items: readonly SuggestionItem[] = [];
    if (previous !== null && previous.from === match.from) {
        items = resultsOf(previous.items);
    }
    const { suggestion } = match;
    let name: ActiveSuggestion['name'] = suggestion.labelKey ?? '';
    if (suggestion.label !== undefined) {
        name = suggestion.label;
    }
    return {
        featureId: suggestion.featureId,
        trigger: suggestion.trigger,
        name,
        command: suggestion.command,
        from: match.from,
        to: match.to,
        query: match.query,
        status: 'loading',
        items,
        index: 0,
        request,
        page: null,
    };
};

/**
 * The same query asked again: for the page a `more` option names, which stays shown until the page arrives, or for
 * the page that failed, whose Retry goes.
 */
const askedAgain = (active: ActiveSuggestion, match: Match, page: string | null, request: number): ActiveSuggestion => {
    let { items, index } = active;
    if (active.status === 'failed') {
        items = resultsOf(items);
        index = Math.max(0, Math.min(index, items.length - 1));
    }
    return { ...active, from: match.from, to: match.to, status: 'loading', items, index, request, page };
};

export const nextState = (
    transaction: Transaction,
    value: SuggestionsState,
    state: EditorState,
    suggestions: readonly EngineSuggestion[],
): SuggestionsState => {
    const meta = transaction.getMeta(key) as SuggestionsMeta | undefined;
    const dismissed = mappedDismissal(transaction, value.dismissed);
    const { requests } = value;
    if (meta?.kind === 'close') {
        return { active: null, dismissed, requests };
    }
    if (meta?.kind === 'dismiss') {
        if (value.active === null) {
            return { active: null, dismissed, requests };
        }
        return { active: null, dismissed: transaction.mapping.map(value.active.from), requests };
    }
    const match = matchAt(state, suggestions);
    if (match === null) {
        // A selection across the trigger keeps an Escape; an edit that ends the match forgets it.
        if (transaction.docChanged) {
            return { active: null, dismissed: null, requests };
        }
        return { active: null, dismissed, requests };
    }
    if (match.from === dismissed) {
        return { active: null, dismissed, requests };
    }
    const previous = value.active;
    let kept = false;
    if (previous !== null && previous.trigger === match.suggestion.trigger) {
        kept = transaction.mapping.map(previous.from) === match.from;
    }
    if (!kept && !isTyped(transaction)) {
        return { active: null, dismissed, requests };
    }
    if (kept && previous !== null && previous.query === match.query) {
        if (meta?.kind === 'more') {
            return {
                active: askedAgain(previous, match, meta.cursor, requests + 1),
                dismissed,
                requests: requests + 1,
            };
        }
        if (meta?.kind === 'retry' && previous.status === 'failed') {
            return {
                active: askedAgain(previous, match, previous.page, requests + 1),
                dismissed,
                requests: requests + 1,
            };
        }
        return { active: keptList(previous, match, meta), dismissed, requests };
    }
    let mappedPrevious: ActiveSuggestion | null = null;
    if (kept) {
        mappedPrevious = previous;
    }
    return { active: requestedList(match, mappedPrevious, requests + 1), dismissed, requests: requests + 1 };
};

/** The open suggestion list of `state`, or `null`. */
export const activeSuggestion = (state: EditorState): ActiveSuggestion | null => key.getState(state)?.active ?? null;

/** Whether the open list shows options, which the keys and the surface's ARIA attributes act on. */
export const showsOptions = (state: EditorState): boolean => {
    const active = activeSuggestion(state);
    return active !== null && active.items.length > 0;
};

export const withMeta = (state: EditorState, meta: SuggestionsMeta): Transaction =>
    state.tr.setMeta(key, meta).setMeta('addToHistory', false);
