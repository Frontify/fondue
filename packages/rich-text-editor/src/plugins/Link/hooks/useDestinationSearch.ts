/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import { type LinkDestination, type LinkSearch } from '../helpers/destination';
import { allowsHref, type LinkPolicy } from '../helpers/policy';

/**
 * How long the author must pause before a search runs.
 */
const SEARCH_DELAY_MS = 200;

export type DestinationSearch =
    | { status: 'done'; results: readonly LinkDestination[] }
    | { status: 'idle' | 'searching' | 'failed' };

/**
 * The answer to one query.
 */
type Answer =
    | { query: string; status: 'done'; results: readonly LinkDestination[] }
    | { query: string; status: 'failed' };

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
            let found: Answer = { query: wanted, status: 'failed' };
            try {
                found = { query: wanted, status: 'done', results: await search(wanted, controller.signal) };
            } catch {
                // Left failed.
            }
            if (!controller.signal.aborted) {
                setAnswer(found);
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
        return { status: 'idle' };
    }
    if (answer?.query !== wanted) {
        return { status: 'searching' };
    }
    if (answer.status === 'failed') {
        return { status: 'failed' };
    }
    return { status: 'done', results: answer.results.filter((found) => allowsHref(policy, found.href)) };
};
