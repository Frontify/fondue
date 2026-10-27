/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ListboxOption } from '#/bridge/chrome/components/Listbox';
import { type SuggestionItem } from '#/runtime/port';

import { type ReferenceListStrings } from './referenceStrings';

/** How many of `items` are results of the search, without Load more and Retry. */
export const resultCount = (items: readonly SuggestionItem[]) =>
    items.filter((item) => item.action === undefined).length;

/** An option as the listbox shows it: Load more and Retry by their localized label, a reference with its icon. */
export const listOption = (item: SuggestionItem, strings: ReferenceListStrings): ListboxOption => {
    if (item.action === 'more') {
        return { key: item.key, label: strings.loadMore, glyph: null };
    }

    if (item.action === 'retry') {
        return { key: item.key, label: strings.retry, glyph: null };
    }

    if (item.glyph !== null || item.detail === undefined) {
        return item;
    }

    // A reference result with no image and no kind shows the person icon.
    let lead: Pick<ListboxOption, 'imageUrl' | 'kind'> = { kind: item.kind ?? 'user' };
    if (item.imageUrl !== undefined) {
        lead = { imageUrl: item.imageUrl };
    }

    return { key: item.key, label: item.label, glyph: null, detail: item.detail, ...lead };
};

/**
 * The place of option `index` that a screen reader hears: a result among the results, so Load more adds no place to
 * them, and Load more or Retry among every option.
 */
export const placeOf = (items: readonly SuggestionItem[], index: number) => {
    let total = items.length;
    if (items[index]?.action === undefined) {
        total = resultCount(items);
    }

    return { position: index + 1, total };
};

/** What the active option of `items` says, with its place, or `undefined` with none. */
export const spokenOption = (
    items: readonly SuggestionItem[],
    index: number,
    strings: ReferenceListStrings,
): string | undefined => {
    const option = items[index];
    if (option === undefined) {
        return undefined;
    }

    const { position, total } = placeOf(items, index);

    return strings.option(listOption(option, strings), position, total);
};
