/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ListboxOption } from '#/bridge/pluginApi/define';
import { type ReferenceValue } from '#/bridge/pluginApi/plugin';
import { type CodecContext, type SuggestionResult } from '#/model';

// The suggestion list's total, which the dialog's pages stop at too.
const MAX_ITEMS = 200;
// No result has an empty key, and Load more and Retry never show together, so they share it.
const ACTION_KEY = '';

/** An option of the search dialog: a result, or one that asks again for the next page or the failed one. */
export type ResultItem = {
    action?: 'more' | 'retry';
    /** The cursor of the page a `more` option asks for. */
    cursor?: string;
} & SuggestionResult;

/** One page of results, and the cursor of the next page. */
export type ResultPage = {
    items: readonly ResultItem[];
    nextCursor: string | null;
};

/** What a list says about its search, in the UI locale. */
export type ReferenceListStrings = {
    label: string;
    loading: string;
    noResults: string;
    failed: string;
    loadMore: string;
    retry: string;
    results: (count: number) => string;
    /** The active option with its place, and its type when it has one, so a user and a group of one name differ. */
    option: (option: ListboxOption, position: number, total: number) => string;
    /** Two messages as one announcement, so the second does not cut the first off. */
    both: (first: string, second: string) => string;
};

/** The list strings from the chrome's `translate`, which the mention list says too. */
export const referenceListStrings = (translate: CodecContext['translate']): ReferenceListStrings => ({
    label: translate('RichTextEditor_mentionSuggestions'),
    loading: translate('RichTextEditor_mentionLoading'),
    noResults: translate('RichTextEditor_mentionNoResults'),
    failed: translate('RichTextEditor_mentionFailed'),
    loadMore: translate('RichTextEditor_mentionLoadMore'),
    retry: translate('RichTextEditor_retry'),
    results: (count) => translate('RichTextEditor_mentionResults', { count }),
    option: ({ label, detail }, position, total) => {
        // The live region writes a value between U+2068 and U+2069 into a `bdi` of its own.
        const quoted = `\u2068${label}\u2069`;
        if (detail === undefined) {
            return translate('RichTextEditor_suggestionOption', { label: quoted, position, total });
        }

        return translate('RichTextEditor_mentionOption', { label: quoted, type: detail, position, total });
    },
    both: (first, second) => translate('RichTextEditor_announceBoth', { first, second }),
});

/** A reference the session kept as an option, which inserts its type, ID and label, and shows its type after it. */
export const resultOf = ({
    resourceType,
    resourceId,
    labelSnapshot,
    imageUrl,
    kind,
}: ReferenceValue): SuggestionResult => {
    let result: SuggestionResult = {
        key: `${resourceType}:${resourceId}`,
        label: labelSnapshot,
        glyph: null,
        detail: resourceType,
        payload: { resourceType, resourceId, labelSnapshot },
    };
    if (imageUrl !== undefined) {
        result = { ...result, imageUrl };
    }

    if (kind !== undefined) {
        result = { ...result, kind };
    }

    return result;
};

/** The dialog's own options: what its pages answered, without the options that ask again. */
export const resultsOf = (items: readonly ResultItem[]): readonly ResultItem[] =>
    items.filter((item) => item.action === undefined);

/**
 * The options after a page: those `shown` before it, the page's own once per key, up to 200 in all, then Load more
 * when the page names a next one and the list has room.
 */
export const afterPage = (shown: readonly ResultItem[], results: ResultPage): readonly ResultItem[] => {
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
export const afterFailure = (shown: readonly ResultItem[]): readonly ResultItem[] => [
    ...shown,
    { key: ACTION_KEY, label: '', glyph: null, payload: {}, action: 'retry' },
];

/** An option as the listbox shows it: Load more and Retry by their localized label, a reference with its icon. */
export const listOption = (item: ResultItem, strings: ReferenceListStrings): ListboxOption => {
    if (item.action === 'more') {
        return { key: item.key, label: strings.loadMore, glyph: null };
    }

    if (item.action === 'retry') {
        return { key: item.key, label: strings.retry, glyph: null };
    }

    if (item.detail === undefined) {
        return { ...item, glyph: item.glyph ?? null };
    }

    // A reference result with no image and no kind shows the person icon.
    let lead: Pick<ListboxOption, 'imageUrl' | 'kind'> = { kind: item.kind ?? 'user' };
    if (item.imageUrl !== undefined) {
        lead = { imageUrl: item.imageUrl };
    }

    return { key: item.key, label: item.label, glyph: null, detail: item.detail, ...lead };
};

/**
 * What the active option of `items` says, with its place, or `undefined` with none: a result among the results, so
 * Load more adds no place to them, and Load more or Retry among every option.
 */
export const spokenOption = (
    items: readonly ResultItem[],
    index: number,
    strings: ReferenceListStrings,
): string | undefined => {
    const option = items[index];
    if (option === undefined) {
        return undefined;
    }

    let total = items.length;
    if (option.action === undefined) {
        total = resultsOf(items).length;
    }

    return strings.option(listOption(option, strings), index + 1, total);
};
