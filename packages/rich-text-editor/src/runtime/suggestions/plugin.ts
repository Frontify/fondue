/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, Plugin, PluginKey, TextSelection, type Transaction } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { COMMAND_META, type PluginImplementation } from '#/definition';
import { type JsonObject } from '#/model';
import { SUGGESTIONS_PLUGIN } from '#/model/capabilities';
import { type CompiledSuggestion } from '#/model/compile';
import { type SuggestionSource } from '#/model/declarations';

import { isHistoryTransaction } from '../history';

import { loadEmoji, searchEmoji } from './emoji';
import { suggestionHosts } from './host';

/** One option of a suggestion list. */
export interface SuggestionItem {
    /** Unique within one result list. */
    readonly key: string;
    readonly label: string;
    /** What the option shows before its label, such as the emoji itself. */
    readonly glyph: string | null;
    /** What the list's command receives when the option is accepted. */
    readonly payload: JsonObject;
}

/** The open suggestion list: what was typed, the range an accepted option replaces, and the options so far. */
export interface ActiveSuggestion {
    /** The feature that declares the list. */
    readonly featureId: string;
    readonly trigger: string;
    readonly source: SuggestionSource;
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
}

interface SuggestionsState {
    readonly active: ActiveSuggestion | null;
    /** The trigger position whose list Escape closed, which stays closed until its text no longer matches. */
    readonly dismissed: number | null;
    /** Counts requests across lists. */
    readonly requests: number;
}

type SuggestionsMeta =
    | { readonly kind: 'results'; readonly request: number; readonly items: readonly SuggestionItem[] }
    | { readonly kind: 'failed'; readonly request: number }
    | { readonly kind: 'move'; readonly index: number }
    | { readonly kind: 'dismiss' }
    | { readonly kind: 'close' };

interface Match {
    readonly suggestion: CompiledSuggestion;
    readonly from: number;
    readonly to: number;
    readonly query: string;
}

/** What a search reads besides its query: the editor's locale, and a signal that aborts when a newer query or a closed list replaces it. */
interface SearchContext {
    readonly locale: string;
    readonly signal: AbortSignal;
}

type SourceSearch = (query: string, context: SearchContext) => Promise<readonly SuggestionItem[]>;

// Longer text after a trigger is a sentence, not a query.
const MAX_QUERY = 32;
// Enough for a list that scrolls, few enough to rank well.
const EMOJI_LIMIT = 50;
// What `textBetween` writes for an inline leaf, such as a hard break, which also starts a word.
const LEAF = '\uFFFC';
const BREAK_BEFORE = /[\s\uFFFC]$/u;
const BREAK_INSIDE = /[\s\uFFFC]/u;
// An emoji list opens at two letters, so a time such as `12:30` or a smiley such as `:)` opens none.
const EMOJI_QUERY = /^\p{L}{2}/u;
// Paste, drop and cut name their event; only typed text opens a list.
const NOT_TYPED = new Set(['paste', 'drop', 'cut']);

const key = new PluginKey<SuggestionsState>(SUGGESTIONS_PLUGIN.id);

const emojiSearch: SourceSearch = async (query, { locale }) => {
    const entries = await loadEmoji(locale);
    return searchEmoji(entries, query, EMOJI_LIMIT).map((entry) => ({
        key: entry.emoji,
        label: entry.label,
        glyph: entry.emoji,
        payload: { text: entry.emoji },
    }));
};

// A source with no search here, such as `references` before its feature lands, never opens a list.
const SEARCHES: Readonly<Partial<Record<SuggestionSource, SourceSearch>>> = { emoji: emojiSearch };

const opensOn = (source: SuggestionSource, query: string): boolean => {
    if (source === 'emoji') {
        return EMOJI_QUERY.test(query);
    }
    return true;
};

/** The list the text before the caret opens: the trigger closest to the caret, at a word start, before a query with no space. */
const matchAt = (state: EditorState, suggestions: readonly CompiledSuggestion[]): Match | null => {
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
    const windowStart = Math.max(0, $cursor.parentOffset - MAX_QUERY - 2);
    const before = parent.textBetween(windowStart, $cursor.parentOffset, undefined, LEAF);
    let best: Match | null = null;
    let bestAt = -1;
    for (const suggestion of suggestions) {
        const at = before.lastIndexOf(suggestion.trigger);
        if (at <= bestAt || SEARCHES[suggestion.source] === undefined) {
            continue;
        }
        const startsWord = (at === 0 && windowStart === 0) || (at > 0 && BREAK_BEFORE.test(before.slice(0, at)));
        const query = before.slice(at + suggestion.trigger.length);
        if (!startsWord || query.length > MAX_QUERY || BREAK_INSIDE.test(query) || !opensOn(suggestion.source, query)) {
            continue;
        }
        best = { suggestion, from: $cursor.pos - (before.length - at), to: $cursor.pos, query };
        bestAt = at;
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

/** The open list after a transaction that kept its trigger and query, with the meta's results or move applied. */
const keptList = (active: ActiveSuggestion, match: Match, meta: SuggestionsMeta | undefined): ActiveSuggestion => {
    let { status, items, index } = active;
    if (meta?.kind === 'results' && meta.request === active.request) {
        status = 'ready';
        items = meta.items;
        index = 0;
    }
    if (meta?.kind === 'failed' && meta.request === active.request) {
        status = 'failed';
        items = [];
        index = 0;
    }
    if (meta?.kind === 'move') {
        index = wrapped(meta.index, items.length);
    }
    return {
        featureId: active.featureId,
        trigger: active.trigger,
        source: active.source,
        command: active.command,
        from: match.from,
        to: match.to,
        query: active.query,
        status,
        items,
        index,
        request: active.request,
    };
};

/** A list for a new trigger or query, which keeps the options it showed until the new request answers. */
const requestedList = (match: Match, previous: ActiveSuggestion | null, request: number): ActiveSuggestion => {
    let items: readonly SuggestionItem[] = [];
    if (previous !== null && previous.from === match.from) {
        items = previous.items;
    }
    return {
        featureId: match.suggestion.featureId,
        trigger: match.suggestion.trigger,
        source: match.suggestion.source,
        command: match.suggestion.command,
        from: match.from,
        to: match.to,
        query: match.query,
        status: 'loading',
        items,
        index: 0,
        request,
    };
};

const nextState = (
    transaction: Transaction,
    value: SuggestionsState,
    state: EditorState,
    suggestions: readonly CompiledSuggestion[],
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

// An `id` holds no white space; other characters outside letters, digits, `-` and `_` become their code point.
const ID_UNSAFE = /[^\w-]/gu;

/**
 * The `id` of the option with `key` in the list `listId`, which `aria-activedescendant` names. It follows the option, not its
 * place, so new results at the active place change the attribute and a screen reader announces the new option.
 */
export const suggestionOptionId = (listId: string, key: string): string =>
    `${listId}-option-${key.replaceAll(ID_UNSAFE, (character) => (character.codePointAt(0) ?? 0).toString(16))}`;

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
    if (active === null || active.items.length === 0 || event.isComposing || hasModifier(event)) {
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
    if (event.key === 'Escape') {
        dismissSuggestion(view);
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

/** Dispatches a search's options, or its failure, unless the request was replaced or the view is gone. */
const deliver = async (
    view: EditorView,
    searched: Promise<readonly SuggestionItem[]>,
    request: number,
    signal: AbortSignal,
): Promise<void> => {
    let meta: SuggestionsMeta;
    try {
        meta = { kind: 'results', request, items: await searched };
    } catch {
        meta = { kind: 'failed', request };
    }
    if (!signal.aborted && !view.isDestroyed) {
        view.dispatch(withMeta(view.state, meta));
    }
};

/** Asks the list's source for the options of a new query once, and dispatches them unless a newer query replaced it. */
const createFetcher = (view: EditorView) => {
    let asked = 0;
    let controller: AbortController | undefined;
    const fetchFor = (current: EditorView): void => {
        const active = activeSuggestion(current.state);
        if (active === null) {
            controller?.abort();
            controller = undefined;
            return;
        }
        if (active.status !== 'loading' || active.request === asked) {
            return;
        }
        const search = SEARCHES[active.source];
        const host = suggestionHosts.get(current);
        if (search === undefined || host === undefined || !host.creates(active.featureId)) {
            return;
        }
        asked = active.request;
        controller?.abort();
        const own = new AbortController();
        controller = own;
        const searched = search(active.query, { locale: host.locale(), signal: own.signal });
        // A view whose dispatch throws, such as a faulted session, drops the options.
        deliver(current, searched, active.request, own.signal).catch(() => undefined);
    };
    // The view runs this during its constructor, before the runtime registers the view's host, so the first search waits a microtask.
    queueMicrotask(() => {
        if (!view.isDestroyed) {
            fetchFor(view);
        }
    });
    return {
        update: fetchFor,
        destroy: () => controller?.abort(),
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
        view: createFetcher,
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
