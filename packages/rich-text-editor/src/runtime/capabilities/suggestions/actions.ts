/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';

import { suggestionHosts } from './host';
import { activeSuggestion, showsOptions, withMeta } from './state';

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
