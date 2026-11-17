/* (c) Copyright Frontify Ltd., all rights reserved. */

// Every English word the link plugin adds, in one place until they move to the locale files.

export const TEXT_LABEL = 'Text';

export const SEARCHING = 'Searching';

export const SEARCH_FAILED = 'Search failed';

export const NO_RESULTS = 'No results';

/** The accessible name of the list of found pages. */
export const RESULTS_LABEL = 'Pages';

/** Heard only by a screen reader, after the target in the link panel, which opens in a new tab. */
export const NEW_TAB_NOTE = ' (opens in new tab)';

export const resultCount = (count: number): string => {
    if (count === 1) {
        return '1 result';
    }
    return `${count} results`;
};
