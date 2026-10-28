/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';

import { type EngineSuggestion } from '#/runtime/definition';

import { createFetchContext, fetchSuggestions, stopFetch } from './fetchSession';

/**
 * Asks the list's search for the options of a new query once, 200 ms after the last keystroke, and for a further page
 * or a retry at once, each as one operation of the session's coordinator under the list's key, which a newer ask
 * supersedes.
 */
export const createFetcher = (view: EditorView, suggestions: readonly EngineSuggestion[]) => {
    const context = createFetchContext(suggestions);
    // The view runs this during its constructor, before the runtime registers the view's host, so the first search waits a microtask.
    queueMicrotask(() => {
        if (!view.isDestroyed) {
            fetchSuggestions(context, view);
        }
    });

    return {
        update: (current: EditorView) => fetchSuggestions(context, current),
        destroy: () => stopFetch(context),
    };
};
