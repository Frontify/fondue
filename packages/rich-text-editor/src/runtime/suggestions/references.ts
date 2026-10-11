/* (c) Copyright Frontify Ltd., all rights reserved. */

import { checkHref } from '#/model';
import { holdsControls, withoutBidiControls } from '#/model/references';
import { isRecord, isValidValue } from '#/model/values';

import { type SuggestionItem } from './plugin';

/** The `ReferenceService.search` interactions of the `@` list and of the mention search dialog, which run side by side. */
export const MENTION_LIST_SEARCH = 'mention-search:list';
export const MENTION_DIALOG_SEARCH = 'mention-search:dialog';
// A person picker shows a page of this many, and stops paging at the total.
export const MAX_PAGE_ITEMS = 50;
export const MAX_ITEMS = 200;
// A longer cursor is no page token; the list offers no further page.
const MAX_CURSOR = 1024;
// A label longer than a name is no name a list shows.
const MAX_LABEL = 256;
// C0 and C1 control characters, which no shown label holds.
const CONTROL = /[\u0000-\u001F\u007F-\u009F]/u;
const KINDS = new Set(['user', 'group', 'everyone']);
const STORED_ID = { type: 'id' } as const;

/** One page of a reference search as the list shows it: the items it keeps, and the cursor of the next page. */
export interface ReferenceResults {
    readonly items: readonly SuggestionItem[];
    readonly nextCursor: string | null;
}

const nonEmpty = (value: unknown): value is string => typeof value === 'string' && value !== '';

/** Whether `value` passes `checkHref` as an absolute `https:` URL, the only avatar the list loads. */
const isHttpsUrl = (value: string): boolean => {
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

/** A host result as an option, or `undefined` when its type, IDs or label cannot be stored or shown. */
const itemOf = (
    value: unknown,
    resourceTypes: readonly string[],
    maxAttributeLength: number,
): SuggestionItem | undefined => {
    if (!isRecord(value)) {
        return undefined;
    }
    const { resourceType, resourceId, imageUrl, kind } = value;
    if (!nonEmpty(resourceType) || !isValidValue(STORED_ID, resourceType) || holdsControls(resourceType)) {
        return undefined;
    }
    if (resourceTypes.length > 0 && !resourceTypes.includes(resourceType)) {
        return undefined;
    }
    if (!nonEmpty(resourceId) || resourceId.length > maxAttributeLength || holdsControls(resourceId)) {
        return undefined;
    }
    let labelSnapshot: unknown = value.labelSnapshot;
    if (typeof labelSnapshot === 'string') {
        labelSnapshot = withoutBidiControls(labelSnapshot);
    }
    if (!nonEmpty(labelSnapshot) || labelSnapshot.length > MAX_LABEL || CONTROL.test(labelSnapshot)) {
        return undefined;
    }
    let shown: Pick<SuggestionItem, 'imageUrl' | 'kind'> = {};
    if (typeof imageUrl === 'string' && isHttpsUrl(imageUrl)) {
        shown = { imageUrl };
    }
    if (typeof kind === 'string' && KINDS.has(kind)) {
        shown = { ...shown, kind: kind as NonNullable<SuggestionItem['kind']> };
    }
    return {
        key: `${resourceType}:${resourceId}`,
        label: labelSnapshot,
        glyph: null,
        detail: resourceType,
        ...shown,
        payload: { resourceType, resourceId, labelSnapshot },
    };
};

const pageOf = (page: unknown, resourceTypes: readonly string[], maxAttributeLength: number) => {
    if (!isRecord(page) || !Array.isArray(page.items)) {
        return undefined;
    }
    const items: SuggestionItem[] = [];
    const keys = new Set<string>();
    for (const value of (page.items as readonly unknown[]).slice(0, MAX_PAGE_ITEMS)) {
        const item = itemOf(value, resourceTypes, maxAttributeLength);
        if (item !== undefined && !keys.has(item.key)) {
            keys.add(item.key);
            items.push(item);
        }
    }
    let nextCursor: string | null = null;
    if (nonEmpty(page.nextCursor) && page.nextCursor.length <= MAX_CURSOR) {
        nextCursor = page.nextCursor;
    }
    return { items, nextCursor };
};

/**
 * The options of a search page: of its first 50 items, each whose `resourceType` is a `StoredId` the request asked for
 * (any type for an empty list), whose IDs and label are not empty, whose `resourceId` fits `maxAttributeLength` and
 * whose label, without bidirectional controls, is at most 256 characters with no control character, once per resource;
 * `undefined` for a page of another shape or one that throws while it is read.
 */
export const referenceResults = (
    page: unknown,
    resourceTypes: readonly string[],
    maxAttributeLength: number,
): ReferenceResults | undefined => {
    try {
        return pageOf(page, resourceTypes, maxAttributeLength);
    } catch {
        return undefined;
    }
};

/** The option that asks for the failed page again. */
export const RETRY: SuggestionItem = { key: 'retry', label: '', glyph: null, payload: {}, action: 'retry' };

/** A list's own options: what its pages answered, without the options that ask again. */
export const resultsOf = (items: readonly SuggestionItem[]): readonly SuggestionItem[] =>
    items.filter((item) => item.action === undefined);

/**
 * The options after a page: those `shown` before it, the page's own once per key, up to 200 in all, then Load more
 * when the page names a next one and the list has room.
 */
export const afterPage = (shown: readonly SuggestionItem[], results: ReferenceResults): readonly SuggestionItem[] => {
    const keys = new Set(shown.map((item) => item.key));
    const items = [...shown, ...results.items.filter((item) => !keys.has(item.key))].slice(0, MAX_ITEMS);
    if (results.nextCursor !== null && items.length < MAX_ITEMS) {
        items.push({
            key: 'load-more',
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
