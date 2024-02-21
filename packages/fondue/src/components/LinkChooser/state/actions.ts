/* (c) Copyright Frontify Ltd., all rights reserved. */

import { QUERIES_STORAGE_KEY } from '@components/LinkChooser/LinkChooser';
import { DoneInvokeEvent, assign } from 'xstate';
import { defaultSection } from '../sections';
import { LinkChooserContext, LinkChooserEventData, SearchResult } from '../types';
import { isCustomLink } from '../utils/helpers';
import { createCustomLink, mergeResultWithRecentQueries, retrieveRecentQueries } from '../utils/transformers';
import { DropdownState, LinkChooserState, SectionState } from './types';

export const updateQueryFromString = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    query: (_context, { data }) => data.query ?? '',
});

export const updateQueryFromObject = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    query: (_context, { data }) => data.selectedResult?.title ?? '',
});

export const replaceCustomLink = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    searchResults: (context) => {
        const customLinkSelected = isCustomLink(context.selectedResult);
        const updatedCustomLink =
            customLinkSelected && context.selectedResult?.title === context.query
                ? context.selectedResult
                : createCustomLink(context.query);

        return context.query
            ? [...context.searchResults.filter((results) => !isCustomLink(results)), updatedCustomLink]
            : context.searchResults;
    },
});

export const replaceCustomLinkWithSelected = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    searchResults: (context, { data }, meta) => {
        const { selectedResult } = data;
        if (!context.query || !selectedResult) {
            return context.searchResults;
        }

        const isSelectedCustomLink = isCustomLink(selectedResult);
        const resultsWithoutCustomLinks = context.searchResults.filter((result) => !isCustomLink(result));

        const defaultResultsHaveLoaded = meta.state?.matches(
            `${LinkChooserState.Focused}.${DropdownState.Default}.${SectionState.Loaded}`,
        );

        const isDisplayingLocalStorage =
            (!context.searchResults || context.searchResults.some((results) => results.local)) &&
            defaultResultsHaveLoaded;

        if (isDisplayingLocalStorage) {
            return context.searchResults;
        }
        if (isSelectedCustomLink) {
            return [...resultsWithoutCustomLinks, selectedResult];
        } else {
            return [...resultsWithoutCustomLinks, createCustomLink(context.query)];
        }
    },
});

export const setExtraResultsByQuery = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    getExtraResultsByQuery: (_, { data }) => data.getExtraResultsByQuery ?? null,
});

export const setCurrentSectionId = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    currentSectionId: (_, { data }) => data.currentSectionId ?? defaultSection.id,
});

export const setSelectedSearchResult = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    selectedResult: (_, { data }) => data.selectedResult ?? null,
});

export const populateDropdownSearchResultsWithRecentQueries = assign<
    LinkChooserContext,
    DoneInvokeEvent<LinkChooserEventData>
>({
    searchResults: () => retrieveRecentQueries(),
});

export const storeNewSelectedResult = (
    _context: LinkChooserContext,
    { data }: DoneInvokeEvent<LinkChooserEventData>,
): void => {
    const { selectedResult } = data;
    if (selectedResult) {
        const updatedQueries = mergeResultWithRecentQueries(selectedResult);
        localStorage.setItem(QUERIES_STORAGE_KEY, JSON.stringify(updatedQueries));
    }
};

export const fillResultsWithNewRecentQueries = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    searchResults: (_context: LinkChooserContext, { data }: DoneInvokeEvent<LinkChooserEventData>) =>
        data.selectedResult ? mergeResultWithRecentQueries(data.selectedResult) : retrieveRecentQueries(),
});

export const emitSelectSearchResult = (context: LinkChooserContext): void => {
    context.onLinkChange(context.selectedResult);
};

export const clearSelectedResult = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    selectedResult: null,
});

export const copyLinkToClipboard = ({ clipboardOptions, selectedResult }: LinkChooserContext): void => {
    selectedResult?.link && clipboardOptions.writeText(selectedResult.link);
};

export const openPreviewContext = ({ openPreview, selectedResult }: LinkChooserContext): void => {
    selectedResult?.link && openPreview(selectedResult.link, '_blank');
};

export const updateDropdownSearchResults = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    searchResults: (_context, { data }) => data.searchResults ?? [],
});

export const fetchGlobalSearchResults = async (context: LinkChooserContext): Promise<LinkChooserEventData> => {
    const results = context.query ? await context.getGlobalByQuery(context.query) : retrieveRecentQueries();
    return { searchResults: results };
};

export const fetchExtraSectionResults = async (context: LinkChooserContext): Promise<LinkChooserEventData> => {
    let results: SearchResult[] = [];

    if (context.getExtraResultsByQuery !== null) {
        results = await context.getExtraResultsByQuery(context.query);
    }

    return { searchResults: results };
};

export const interruptFetching = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    interruptedFetch: () => true,
});

export const resolveFetching = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    interruptedFetch: () => false,
});
