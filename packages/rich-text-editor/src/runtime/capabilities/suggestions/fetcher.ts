/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';

import { type EngineSuggestion } from '#/definition';
import { type SuggestionPage } from '#/model/internal';

import { dismissSuggestion } from './actions';
import { suggestionHosts } from './host';
import { isHttpsUrl, KINDS, type ReferenceResults } from './references';
import { SEARCH_DELAY_MS } from './search';
import { activeSuggestion, withMeta } from './state';
import { type ActiveSuggestion, type SuggestionItem, type SuggestionsMeta } from './types';

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
export const createFetcher = (view: EditorView, suggestions: readonly EngineSuggestion[]) => {
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
