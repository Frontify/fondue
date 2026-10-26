/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReferenceValue, type ServiceContext } from '#/runtime/types';

const PAGE_SIZE = 20;

/** The `ReferenceService` shape the fake meets: one `search` that pages through its items. */
export type FakeReferenceService = {
    search(
        request: { query: string; resourceTypes: readonly string[]; cursor: string | null },
        context: ServiceContext,
    ): Promise<{ items: readonly ReferenceValue[]; nextCursor: string | null }>;
};

const aborted = () => new DOMException('The search was aborted.', 'AbortError');

/**
 * An in-memory `ReferenceService` over `items`: a search lists, in order, the items whose `labelSnapshot` contains the
 * query, case aside, of the requested types (any type for an empty list), `pageSize` at a time with the next page's
 * cursor, and rejects with an `AbortError` once its signal aborts. It keeps nothing between calls.
 */
export const createFakeReferenceService = (
    items: readonly ReferenceValue[],
    options: { pageSize?: number } = {},
): FakeReferenceService => {
    const pageSize = options.pageSize ?? PAGE_SIZE;

    return {
        search: ({ query, resourceTypes, cursor }, { signal }) => {
            if (signal.aborted) {
                return Promise.reject(aborted());
            }

            const needle = query.toLocaleLowerCase();
            const matching = items.filter(
                (item) =>
                    item.labelSnapshot.toLocaleLowerCase().includes(needle) &&
                    (resourceTypes.length === 0 || resourceTypes.includes(item.resourceType)),
            );
            let start = 0;
            if (cursor !== null) {
                start = Math.max(0, Number.parseInt(cursor, 10) || 0);
            }

            const end = start + pageSize;
            let nextCursor: string | null = null;
            if (end < matching.length) {
                nextCursor = String(end);
            }

            return Promise.resolve({ items: matching.slice(start, end), nextCursor });
        },
    };
};
