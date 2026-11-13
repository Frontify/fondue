/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The words the link plugin says, visibly or to assistive technology, that a host can translate. A host passes the
 * ones it changes (`labels` on `linkPlugin`); the rest stay English.
 */
export type LinkLabels = {
    /** The name of the Text field in the form for a new link. */
    text: string;
    /** The panel button that copies the link's target. */
    copyLink: string;
    /** Announced after the target was copied. */
    linkCopied: string;
    /** Announced when the target could not be copied. */
    copyFailed: string;
    /** Announced while a search for pages runs. */
    searching: string;
    /** Announced when a search for pages failed. */
    searchFailed: string;
    /** Announced when a search found no page. */
    noResults: string;
    /** Announced when a search found pages. */
    resultCount: (count: number) => string;
    /** The accessible name of the list of found pages. */
    results: string;
    /** The text only a screen reader hears after a link that opens in a new tab. Start it with a space. */
    newTabNote: string;
    /** A host the policy allows together with its subdomains, as it is named in a message. */
    hostAndSubdomains: (host: string) => string;
    /** Tells the author which hosts the policy allows. The hosts are never empty. */
    hostsAllowed: (hosts: readonly string[]) => string;
    /** Tells the author the policy allows no host except the editor's own site. */
    sameSiteOnly: string;
    /** Tells the author which schemes the policy allows. The schemes are never empty. */
    schemesAllowed: (schemes: readonly string[]) => string;
};

/**
 * The items as an English list that ends in "or": `a`, `a or b`, `a, b or c`.
 */
const joinOr = (items: readonly string[]): string => {
    if (items.length < 2) {
        return items.join('');
    }
    return `${items.slice(0, -1).join(', ')} or ${items[items.length - 1]}`;
};

const DEFAULT_LABELS: LinkLabels = {
    text: 'Text',
    copyLink: 'Copy link',
    linkCopied: 'Link copied',
    copyFailed: 'Could not copy the link',
    searching: 'Searching',
    searchFailed: 'Search failed',
    noResults: 'No results',
    resultCount: (count) => {
        if (count === 1) {
            return '1 result';
        }
        return `${count} results`;
    },
    results: 'Pages',
    newTabNote: ' (opens in new tab)',
    hostAndSubdomains: (host) => `${host} (or a subdomain)`,
    hostsAllowed: (hosts) => `Enter a link to ${joinOr(hosts)}.`,
    sameSiteOnly: 'Enter a link within this site.',
    schemesAllowed: (schemes) => `Links may use ${joinOr(schemes)}.`,
};

/**
 * The labels a host passes, with English for every one it leaves out.
 */
export const resolveLinkLabels = (labels: Partial<LinkLabels> = {}): LinkLabels => ({ ...DEFAULT_LABELS, ...labels });
