/* (c) Copyright Frontify Ltd., all rights reserved. */

// Every English word the link plugin adds, in one place until they move to the locale files.
// Separate constants rather than one object, so the reading view carries only the new-tab note.

export const TEXT_LABEL = 'Text';

export const COPY_LINK_LABEL = 'Copy link';

export const LINK_COPIED = 'Link copied';

export const COPY_FAILED = 'Could not copy the link';

export const SEARCHING = 'Searching';

export const SEARCH_FAILED = 'Search failed';

export const NO_RESULTS = 'No results';

/** The accessible name of the list of found pages. */
export const RESULTS_LABEL = 'Pages';

/** Heard only by a screen reader, after the text of a link that opens in a new tab. */
export const NEW_TAB_NOTE = ' (opens in new tab)';

/** The policy allows no host except the site the editor runs on. */
export const SAME_SITE_ONLY = 'Enter a link within this site.';

const joinOr = (items: readonly string[]): string => {
    if (items.length < 2) {
        return items.join('');
    }
    return `${items.slice(0, -1).join(', ')} or ${items[items.length - 1]}`;
};

export const resultCount = (count: number): string => {
    if (count === 1) {
        return '1 result';
    }
    return `${count} results`;
};

export const hostAndSubdomains = (host: string): string => `${host} (or a subdomain)`;

export const hostsAllowed = (hosts: readonly string[]): string => `Enter a link to ${joinOr(hosts)}.`;

export const schemesAllowed = (schemes: readonly string[]): string => `Links may use ${joinOr(schemes)}.`;
