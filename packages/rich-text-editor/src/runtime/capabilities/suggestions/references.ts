/* (c) Copyright Frontify Ltd., all rights reserved. */

import { checkHref } from '#/model';
import { holdsControls, withoutBidiControls } from '#/model/references';
import { isRecord, isStoredId } from '#/model/values';

import { type SuggestionItem } from '../../port-types';
import { type ReferenceValue } from '../../types';

// A person picker shows a page of this many, and stops paging at the total.
export const MAX_PAGE_ITEMS = 50;
export const MAX_ITEMS = 200;
// A longer cursor is no page token; the list offers no further page.
const MAX_CURSOR = 1024;
// A label longer than a name is no name a list shows.
const MAX_LABEL = 256;
// C0 and C1 control characters, which no shown label holds.
const CONTROL = /[\u0000-\u001F\u007F-\u009F]/u;
export const KINDS: ReadonlySet<string> = new Set(['user', 'group', 'everyone']);

/** One page of a reference search as the list shows it: the items it keeps, and the cursor of the next page. */
export interface ReferenceResults {
    readonly items: readonly SuggestionItem[];
    readonly nextCursor: string | null;
}

const nonEmpty = (value: unknown): value is string => typeof value === 'string' && value !== '';

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

/** A host result as the session keeps it, or `undefined` when its type, IDs or label cannot be stored or shown. */
const valueOf = (
    value: unknown,
    resourceTypes: readonly string[],
    maxAttributeLength: number,
): ReferenceValue | undefined => {
    if (!isRecord(value)) {
        return undefined;
    }
    const { resourceType, resourceId, imageUrl, kind } = value;
    if (!nonEmpty(resourceType) || !isStoredId(resourceType) || holdsControls(resourceType)) {
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
    let kept: ReferenceValue = { resourceType, resourceId, labelSnapshot };
    if (typeof value.href === 'string') {
        kept = { ...kept, href: value.href };
    }
    if (typeof imageUrl === 'string' && isHttpsUrl(imageUrl)) {
        kept = { ...kept, imageUrl };
    }
    if (typeof kind === 'string' && KINDS.has(kind)) {
        kept = { ...kept, kind: kind as NonNullable<ReferenceValue['kind']> };
    }
    return kept;
};

const pageOf = (page: unknown, resourceTypes: readonly string[], maxAttributeLength: number) => {
    if (!isRecord(page) || !Array.isArray(page.items)) {
        return undefined;
    }
    const items: ReferenceValue[] = [];
    const keys = new Set<string>();
    for (const value of (page.items as readonly unknown[]).slice(0, MAX_PAGE_ITEMS)) {
        const kept = valueOf(value, resourceTypes, maxAttributeLength);
        if (kept === undefined) {
            continue;
        }
        const resource = `${kept.resourceType}:${kept.resourceId}`;
        if (!keys.has(resource)) {
            keys.add(resource);
            items.push(kept);
        }
    }
    let nextCursor: string | null = null;
    if (nonEmpty(page.nextCursor) && page.nextCursor.length <= MAX_CURSOR) {
        nextCursor = page.nextCursor;
    }
    return { items, nextCursor };
};

/**
 * The values of a search page the session keeps: of its first 50 items, each whose `resourceType` is a `StoredId` the
 * request asked for (any type for an empty list), whose IDs and label are not empty, whose `resourceId` fits
 * `maxAttributeLength` and whose label, without bidirectional controls, is at most 256 characters with no control
 * character, once per resource, with an avatar only over `https:`; `undefined` for a page of another shape or one
 * that throws while it is read.
 */
export const referenceValues = (
    page: unknown,
    resourceTypes: readonly string[],
    maxAttributeLength: number,
): { readonly items: readonly ReferenceValue[]; readonly nextCursor: string | null } | undefined => {
    try {
        return pageOf(page, resourceTypes, maxAttributeLength);
    } catch {
        return undefined;
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
