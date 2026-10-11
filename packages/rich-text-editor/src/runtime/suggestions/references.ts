/* (c) Copyright Frontify Ltd., all rights reserved. */

import { checkHref } from '#/model';
import { isRecord, isValidValue } from '#/model/values';

import { type SuggestionItem } from './plugin';

/** The `ReferenceService.search` interaction whose newer query supersedes an older one. */
export const MENTION_SEARCH = 'mention-search';
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

/** A host result as an option, or `undefined` when its type, IDs or label cannot be stored or shown. */
const itemOf = (
    value: unknown,
    resourceTypes: readonly string[],
    maxAttributeLength: number,
): SuggestionItem | undefined => {
    if (!isRecord(value)) {
        return undefined;
    }
    const { resourceType, resourceId, labelSnapshot, imageUrl, kind } = value;
    if (!nonEmpty(resourceType) || !isValidValue(STORED_ID, resourceType)) {
        return undefined;
    }
    if (resourceTypes.length > 0 && !resourceTypes.includes(resourceType)) {
        return undefined;
    }
    if (!nonEmpty(resourceId) || resourceId.length > maxAttributeLength) {
        return undefined;
    }
    if (!nonEmpty(labelSnapshot) || labelSnapshot.length > MAX_LABEL || CONTROL.test(labelSnapshot)) {
        return undefined;
    }
    let shown: Pick<SuggestionItem, 'imageUrl' | 'kind'> = {};
    if (typeof imageUrl === 'string') {
        const checked = checkHref(imageUrl);
        if (checked.ok) {
            shown = { imageUrl: checked.href };
        }
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

/**
 * The options of a search page: each item whose `resourceType` is a `StoredId` the request asked for (any type for an
 * empty list), whose IDs and label are not empty, whose `resourceId` fits `maxAttributeLength` and whose label is at
 * most 256 characters with no control character, once per resource; `undefined` for a page of another shape.
 */
export const referenceResults = (
    page: unknown,
    resourceTypes: readonly string[],
    maxAttributeLength: number,
): ReferenceResults | undefined => {
    if (!isRecord(page) || !Array.isArray(page.items)) {
        return undefined;
    }
    const items: SuggestionItem[] = [];
    const keys = new Set<string>();
    for (const value of page.items as readonly unknown[]) {
        const item = itemOf(value, resourceTypes, maxAttributeLength);
        if (item !== undefined && !keys.has(item.key)) {
            keys.add(item.key);
            items.push(item);
        }
    }
    let nextCursor: string | null = null;
    if (nonEmpty(page.nextCursor)) {
        nextCursor = page.nextCursor;
    }
    return { items, nextCursor };
};
