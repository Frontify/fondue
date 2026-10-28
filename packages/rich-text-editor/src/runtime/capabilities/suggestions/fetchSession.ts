/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';

import { type SuggestionPage } from '#/model/internal';
import { type EngineSuggestion } from '#/runtime/definition';

import { dismissSuggestion } from './actions';
import { suggestionHosts } from './host';
import { isHttpsUrl, KINDS, type ReferenceResults } from './references';
import { SEARCH_DELAY_MS } from './search';
import { activeSuggestion, withMeta } from './state';
import { type ActiveSuggestion, type SuggestionItem, type SuggestionsMeta } from './types';

/** The search one suggestion list has asked for, and the timer and abort of the ask in flight. */
type FetchContext = {
    suggestions: readonly EngineSuggestion[];
    asked: number;
    timer: ReturnType<typeof setTimeout> | undefined;
    abort: (() => void) | undefined;
    /** The list the last update showed, whose query a further page or a retry asks for again. */
    seen: ActiveSuggestion | null;
};

/** A context that has not asked yet, for the lists `suggestions` can search. */
export const createFetchContext = (suggestions: readonly EngineSuggestion[]): FetchContext => ({
    suggestions,
    asked: 0,
    timer: undefined,
    abort: undefined,
    seen: null,
});

/** The options of a search's page: each result's own fields, without an empty key, which Load more and Retry take, and with only a safe avatar and a known icon. */
const optionsOf = (page: SuggestionPage): ReferenceResults => {
    const items: SuggestionItem[] = [];
    for (const { key: itemKey, label, glyph, payload, detail, imageUrl, kind, group } of page.items) {
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

        if (group !== undefined) {
            item = { ...item, group };
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
const answer = (view: EditorView, request: number, answered: { page: SuggestionPage } | undefined) => {
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

export const stopFetch = (context: FetchContext) => {
    clearTimeout(context.timer);
    context.timer = undefined;
    context.abort?.();
    context.abort = undefined;
};

/** Closes a list that cannot search, as Escape does, once the transaction that opened it has applied. */
const closeLater = (current: EditorView, request: number) => {
    queueMicrotask(() => {
        if (!current.isDestroyed && activeSuggestion(current.state)?.request === request) {
            dismissSuggestion(current);
        }
    });
};

/** Asks for the active list's page, at once when it continues the list already shown and otherwise after the keystroke delay. */
export const fetchSuggestions = (context: FetchContext, current: EditorView): void => {
    const active = activeSuggestion(current.state);
    const previous = context.seen;
    context.seen = active;
    if (active === null) {
        stopFetch(context);

        return;
    }

    if (active.status !== 'loading' || active.request === context.asked) {
        return;
    }

    const host = suggestionHosts.get(current);
    if (host === undefined) {
        return;
    }

    context.asked = active.request;
    stopFetch(context);
    const suggestion = context.suggestions.find(({ trigger }) => trigger === active.trigger);
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
        context.timer = undefined;
        const cancel = host.search({ key: `suggestions:${trigger}`, featureId, command, run }, (answered) =>
            answer(current, request, answered),
        );
        context.abort = () => {
            stopped = true;
            cancel();
        };
    };

    // A new request for the query the list already showed is a further page or a retry.
    if (previous !== null && previous.from === active.from && previous.query === query) {
        start();

        return;
    }

    context.timer = setTimeout(start, SEARCH_DELAY_MS);
};
