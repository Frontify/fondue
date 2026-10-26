/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type PluginImplementation } from '#/runtime/definition';

import { dismissSuggestion, acceptSuggestion, moveSuggestion } from './actions';
import { createFetcher } from './fetcher';
import { activeSuggestion, key, nextState, showsOptions, withMeta } from './state';
import { type SuggestionsState } from './types';

export { acceptSuggestion, dismissSuggestion, moveSuggestion } from './actions';
export { activeSuggestion, showsOptions } from './state';
export type { ActiveSuggestion, SuggestionItem } from './types';

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
