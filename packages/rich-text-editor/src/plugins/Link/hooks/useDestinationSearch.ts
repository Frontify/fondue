/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import { type LinkDestination, type LinkSearch } from '../helpers/destination';
import { allowsHref, type LinkPolicy } from '../helpers/policy';

/**
 * How long the author must pause before a search runs.
 */
const SEARCH_DELAY_MS = 200;

export type DestinationSearch = {
    results: readonly LinkDestination[];
    status: 'idle' | 'searching' | 'done' | 'failed';
};

/**
 * The answer to one query; `null` results mean the search failed.
 */
type Answer = { query: string; results: readonly LinkDestination[] | null };

/**
 * The destinations matching a query, once the author pauses typing. A newer
 * query aborts the request before it, and destinations the policy refuses are
 * dropped so they are never offered.
 */
export const useDestinationSearch = (
    search: LinkSearch | undefined,
    query: string,
    policy: LinkPolicy,
): DestinationSearch => {
    const wanted = query.trim();
    // Tagged with its query, so an answer is never shown for a query that has since changed.
    const [answer, setAnswer] = useState<Answer | null>(null);

    useEffect(() => {
        if (search === undefined || wanted === '') {
            return;
        }
        const controller = new AbortController();
        const lookUp = async (): Promise<void> => {
            let results: readonly LinkDestination[] | null = null;
            try {
                results = await search(wanted, controller.signal);
            } catch {
                // Left null: the search failed.
            }
            if (!controller.signal.aborted) {
                setAnswer({ query: wanted, results });
            }
        };
        const timer = setTimeout(() => {
            lookUp().catch(() => undefined);
        }, SEARCH_DELAY_MS);
        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [search, wanted]);

    if (search === undefined || wanted === '') {
        return { results: [], status: 'idle' };
    }
    if (answer?.query !== wanted) {
        return { results: [], status: 'searching' };
    }
    if (answer.results === null) {
        return { results: [], status: 'failed' };
    }
    return { results: answer.results.filter((found) => allowsHref(policy, found.href)), status: 'done' };
};
