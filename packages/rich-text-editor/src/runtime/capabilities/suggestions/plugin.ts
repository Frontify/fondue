/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, Plugin, PluginKey, TextSelection, type Transaction } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { COMMAND_META, type EngineSuggestion, type PluginImplementation } from '#/definition';
import { type JsonObject } from '#/model';
import { SUGGESTIONS_PLUGIN } from '#/model/capabilities';
import { type SuggestionPage, type SuggestionRules } from '#/model/declarations';

import { isHistoryTransaction } from '../../history';

import { suggestionHosts } from './host';
import { afterFailure, afterPage, isHttpsUrl, KINDS, type ReferenceResults, resultsOf } from './references';
import { SEARCH_DELAY_MS } from './search';

/** One option of a suggestion list. */
export interface SuggestionItem {
    /** Unique within one result list. */
    readonly key: string;
    readonly label: string;
    /** What the option shows before its label, such as the emoji itself. */
    readonly glyph: string | null;
    /** What the list's command receives when the option is accepted. */
    readonly payload: JsonObject;
    /** What the option shows after its label, such as a mention's resource type. */
    readonly detail?: string;
    /** An image that passed `checkHref`, such as an avatar. */
    readonly imageUrl?: string;
    /** The icon an option shows without an image. */
    readonly kind?: 'user' | 'group' | 'everyone';
    /** An option that asks again instead of running the command: the next page, or the failed page once more. */
    readonly action?: 'more' | 'retry';
    /** The cursor of the page a `more` option asks for. */
    readonly cursor?: string;
}

/** The open suggestion list: what was typed, the range an accepted option replaces, and the options so far. */
export interface ActiveSuggestion {
    /** The feature that declares the list. */
    readonly featureId: string;
    readonly trigger: string;
    /** The list's accessible name: a package string key, or translations by language tag. */
    readonly name: string | Readonly<Record<string, string>>;
    readonly command: string;
    /** The trigger's start. */
    readonly from: number;
    /** The caret, at the end of the query. */
    readonly to: number;
    readonly query: string;
    /** `loading` keeps the previous query's options shown until the new ones arrive. */
    readonly status: 'loading' | 'ready' | 'failed';
    readonly items: readonly SuggestionItem[];
    /** The active option, which Enter and Tab accept. */
    readonly index: number;
    /** The request the current options answer, so a late result for an older query is dropped. */
    readonly request: number;
    /** The cursor of the page the request asks for, `null` for a query's first page. */
    readonly page: string | null;
}

interface SuggestionsState {
    readonly active: ActiveSuggestion | null;
    /** The trigger position whose list Escape closed, which stays closed until its text no longer matches. */
    readonly dismissed: number | null;
    /** Counts requests across lists. */
    readonly requests: number;
}

type SuggestionsMeta =
    | {
          readonly kind: 'results';
          readonly request: number;
          readonly results: ReferenceResults;
      }
    | { readonly kind: 'failed'; readonly request: number }
    | { readonly kind: 'move'; readonly index: number }
    | { readonly kind: 'more'; readonly cursor: string }
    | { readonly kind: 'retry' }
    | { readonly kind: 'dismiss' }
    | { readonly kind: 'close' };

interface Match {
    readonly suggestion: EngineSuggestion;
    readonly from: number;
    readonly to: number;
    readonly query: string;
}

// What `textBetween` writes for an inline leaf, such as a hard break, which also starts a word.
const LEAF = '\uFFFC';
const BREAK_BEFORE = /[\s\uFFFC]$/u;
const PUNCTUATION_BEFORE = /\p{P}$/u;
const BREAK_INSIDE = /[\s\uFFFC]/u;
const LINE_BREAK_INSIDE = /[\n\r\u2028\u2029\uFFFC]/u;
// Paste, drop and cut name their event; only typed text opens a list.
const NOT_TYPED = new Set(['paste', 'drop', 'cut']);

const key = new PluginKey<SuggestionsState>(SUGGESTIONS_PLUGIN.id);

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
const matchAt = (state: EditorState, suggestions: readonly EngineSuggestion[]): Match | null => {
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
            const startsWord =
                (at === 0 && windowStart === 0) ||
                (at > 0 &&
                    (BREAK_BEFORE.test(preceding) || (rules.afterPunctuation && PUNCTUATION_BEFORE.test(preceding))));
            const query = before.slice(at + trigger.length);
            if (startsWord && takesQuery(rules, query)) {
                best = { suggestion, from, to: $cursor.pos, query };
                break;
            }
        }
    }
    return best;
};

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

const nextState = (
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

const withMeta = (state: EditorState, meta: SuggestionsMeta): Transaction =>
    state.tr.setMeta(key, meta).setMeta('addToHistory', false);

/** Makes option `index` the active one, as a pointer over an option does. */
export const moveSuggestion = (view: EditorView, index: number): void => {
    if (showsOptions(view.state)) {
        view.dispatch(withMeta(view.state, { kind: 'move', index }));
    }
};

/** Closes the open list and keeps its text. */
export const dismissSuggestion = (view: EditorView): void => {
    if (activeSuggestion(view.state) !== null) {
        view.dispatch(withMeta(view.state, { kind: 'dismiss' }));
    }
};

/** Replaces the trigger and query with option `index`'s result; a command the session refuses closes the list and keeps the text. */
export const acceptSuggestion = (view: EditorView, index: number): void => {
    const active = activeSuggestion(view.state);
    const item = active?.items[index];
    const host = suggestionHosts.get(view);
    if (active === null || item === undefined || host === undefined) {
        return;
    }
    // A policy update since the list opened refuses its feature; the list closes and the text stays.
    if (!host.creates(active.featureId)) {
        dismissSuggestion(view);
        return;
    }
    if (item.action === 'more' && item.cursor !== undefined) {
        view.dispatch(withMeta(view.state, { kind: 'more', cursor: item.cursor }));
        return;
    }
    if (item.action === 'retry') {
        view.dispatch(withMeta(view.state, { kind: 'retry' }));
        return;
    }
    const result = host.accept({ from: active.from, to: active.to }, active.command, item.payload);
    if (result.status !== 'rejected') {
        return;
    }
    // Right after a composition ends, or inside another command, the session waits; the list stays for the next press.
    if (result.code === 'composition-active' || result.code === 'busy') {
        return;
    }
    dismissSuggestion(view);
};

const hasModifier = (event: KeyboardEvent): boolean => event.ctrlKey || event.metaKey || event.altKey;

const handleKeyDown = (view: EditorView, event: KeyboardEvent): boolean => {
    const active = activeSuggestion(view.state);
    if (active === null || event.isComposing || hasModifier(event)) {
        return false;
    }
    // A list also shows its loading, empty and failed rows, which Escape closes like options.
    if (event.key === 'Escape') {
        dismissSuggestion(view);
        return true;
    }
    if (active.items.length === 0) {
        return false;
    }
    if (event.key === 'ArrowDown') {
        moveSuggestion(view, active.index + 1);
        return true;
    }
    if (event.key === 'ArrowUp') {
        moveSuggestion(view, active.index - 1);
        return true;
    }
    // Tab accepts as Enter does; Shift+Tab is left to the browser in `keydown` below.
    if ((event.key === 'Enter' || event.key === 'Tab') && !event.shiftKey) {
        acceptSuggestion(view, active.index);
        return true;
    }
    return false;
};

/** Shift+Tab closes the list and returns true without `preventDefault`, so the browser moves focus to the previous element. */
const handleShiftTab = (view: EditorView, event: KeyboardEvent): boolean => {
    if (event.key !== 'Tab' || !event.shiftKey || !showsOptions(view.state)) {
        return false;
    }
    dismissSuggestion(view);
    return true;
};

/** The options of a search's page: each result's own fields, without an empty key, which Load more and Retry take, and with only a safe avatar and a known icon. */
const optionsOf = (page: SuggestionPage): ReferenceResults => {
    const items: SuggestionItem[] = [];
    for (const { key: itemKey, label, glyph, payload, detail, imageUrl, kind } of page.items) {
        if (itemKey === '') {
            continue;
        }
        let item: SuggestionItem = { key: itemKey, label, glyph: glyph ?? null, payload };
        if (detail !== undefined) {
            item = { ...item, detail };
        }
        if (imageUrl !== undefined && isHttpsUrl(imageUrl)) {
            item = { ...item, imageUrl };
        }
        if (kind !== undefined && KINDS.has(kind)) {
            item = { ...item, kind };
        }
        items.push(item);
    }
    let nextCursor: string | null = null;
    if (typeof page.nextCursor === 'string' && page.nextCursor !== '') {
        nextCursor = page.nextCursor;
    }
    return { items, nextCursor };
};

/** Dispatches what search `request` answered: its options, or its failure. */
const answer = (view: EditorView, request: number, answered: { readonly page: SuggestionPage } | undefined) => {
    if (view.isDestroyed) {
        return;
    }
    let meta: SuggestionsMeta = { kind: 'failed', request };
    if (answered !== undefined) {
        try {
            meta = { kind: 'results', request, results: optionsOf(answered.page) };
        } catch {
            // A page of another shape fails as a rejected search does.
        }
    }
    view.dispatch(withMeta(view.state, meta));
};

/**
 * Asks the list's search for the options of a new query once, 200 ms after the last keystroke, and for a further page
 * or a retry at once, each as one operation of the session's coordinator under the list's key, which a newer ask
 * supersedes.
 */
const createFetcher = (view: EditorView, suggestions: readonly EngineSuggestion[]) => {
    let asked = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let abort: (() => void) | undefined;
    // The list the last update showed, whose query a further page or a retry asks for again.
    let seen: ActiveSuggestion | null = null;
    const stop = () => {
        clearTimeout(timer);
        timer = undefined;
        abort?.();
        abort = undefined;
    };
    /** Closes a list that cannot search, as Escape does, once the transaction that opened it has applied. */
    const closeLater = (current: EditorView, request: number) => {
        queueMicrotask(() => {
            if (!current.isDestroyed && activeSuggestion(current.state)?.request === request) {
                dismissSuggestion(current);
            }
        });
    };
    const fetchFor = (current: EditorView): void => {
        const active = activeSuggestion(current.state);
        const previous = seen;
        seen = active;
        if (active === null) {
            stop();
            return;
        }
        if (active.status !== 'loading' || active.request === asked) {
            return;
        }
        const host = suggestionHosts.get(current);
        if (host === undefined) {
            return;
        }
        asked = active.request;
        stop();
        const suggestion = suggestions.find(({ trigger }) => trigger === active.trigger);
        if (
            suggestion === undefined ||
            !host.creates(active.featureId) ||
            !suggestion.available({ view: current, host: host.commandHost })
        ) {
            closeLater(current, active.request);
            return;
        }
        const { featureId, command, trigger, query, page, request } = active;
        let stopped = false;
        // A search that throws instead of rejecting fails the same way.
        const run = async (signal: AbortSignal) => {
            // An abort the list did not ask for, such as a change of host services, fails the search.
            signal.addEventListener('abort', () => {
                if (!stopped) {
                    queueMicrotask(() => answer(current, request, undefined));
                }
            });
            try {
                return {
                    page: await suggestion.search(query, {
                        view: current,
                        host: host.commandHost,
                        signal,
                        cursor: page,
                    }),
                };
            } catch {
                return undefined;
            }
        };
        const start = () => {
            timer = undefined;
            const cancel = host.search({ key: `suggestions:${trigger}`, featureId, command, run }, (answered) =>
                answer(current, request, answered),
            );
            abort = () => {
                stopped = true;
                cancel();
            };
        };
        // A new request for the query the list already showed is a further page or a retry.
        if (previous !== null && previous.from === active.from && previous.query === query) {
            start();
            return;
        }
        timer = setTimeout(start, SEARCH_DELAY_MS);
    };
    // The view runs this during its constructor, before the runtime registers the view's host, so the first search waits a microtask.
    queueMicrotask(() => {
        if (!view.isDestroyed) {
            fetchFor(view);
        }
    });
    return {
        update: fetchFor,
        destroy: stop,
    };
};

/**
 * The suggestion lists of the definition: typing a trigger at a word start opens its list, the surface keeps focus,
 * the list's keys act before any other key, and an accepted option replaces the trigger and query in one undo step.
 */
export const suggestionsPlugin: PluginImplementation = ({ suggestions }) =>
    new Plugin<SuggestionsState>({
        key,
        state: {
            init: () => ({ active: null, dismissed: null, requests: 0 }),
            apply: (transaction, value, _old, state) => nextState(transaction, value, state, suggestions),
        },
        view: (view) => createFetcher(view, suggestions),
        props: {
            handleKeyDown,
            handleDOMEvents: {
                keydown: handleShiftTab,
                // Leaving the surface closes the list; typing there again reopens it, unlike Escape.
                blur: (view) => {
                    if (activeSuggestion(view.state) !== null) {
                        view.dispatch(withMeta(view.state, { kind: 'close' }));
                    }
                    return false;
                },
            },
        },
    });
