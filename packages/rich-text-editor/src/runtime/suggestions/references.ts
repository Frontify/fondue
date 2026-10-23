/* (c) Copyright Frontify Ltd., all rights reserved. */

import { checkHref } from '#/model';

import { type SuggestionItem } from './plugin';

// The most options a reference list shows, however many pages it loads.
export const MAX_ITEMS = 200;
export const KINDS: ReadonlySet<string> = new Set(['user', 'group', 'everyone']);

/** One page of a reference search as the list shows it: the items it keeps, and the cursor of the next page. */
export interface ReferenceResults {
    readonly items: readonly SuggestionItem[];
    readonly nextCursor: string | null;
}

/** Whether `value` passes `checkHref` as an absolute `https:` URL, the only avatar the list loads. */
export const isHttpsUrl = (value: string): boolean => {
    const checked = checkHref(value);
    if (!checked.ok || checked.href !== value) {
        return false;
    }
    try {
        return new URL(value).protocol === 'https:';
    } catch {
        // A relative reference parses against no base.
        return false;
    }
};

// No result has an empty key, and Load more and Retry never show together, so they share it.
const ACTION_KEY = '';

/** The option that asks for the failed page again. */
export const RETRY: SuggestionItem = { key: ACTION_KEY, label: '', glyph: null, payload: {}, action: 'retry' };

/** A list's own options: what its pages answered, without the options that ask again. */
export const resultsOf = (items: readonly SuggestionItem[]): readonly SuggestionItem[] =>
    items.filter((item) => item.action === undefined);

/**
 * The options after a page: those `shown` before it, the page's own once per key, up to 200 in all, then Load more
 * when the page names a next one and the list has room.
 */
export const afterPage = (shown: readonly SuggestionItem[], results: ReferenceResults): readonly SuggestionItem[] => {
    const keys = new Set(shown.map((item) => item.key));
    const items = [...shown];
    for (const item of results.items) {
        if (!keys.has(item.key)) {
            keys.add(item.key);
            items.push(item);
        }
    }
    items.splice(MAX_ITEMS);
    if (results.nextCursor !== null && items.length < MAX_ITEMS) {
        items.push({
            key: ACTION_KEY,
            label: '',
            glyph: null,
            payload: {},
            action: 'more',
            cursor: results.nextCursor,
        });
    }
    return items;
};

/** The options after a failed page: those `shown` before it, then Retry. */
export const afterFailure = (shown: readonly SuggestionItem[]): readonly SuggestionItem[] => [...shown, RETRY];
