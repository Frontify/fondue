/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CUSTOM_LINK_ID, MAX_STORED_ITEMS, QUERIES_STORAGE_KEY } from "@components/LinkChooser/LinkChooser";
import { assign, DoneInvokeEvent } from "xstate";
import { LinkChooserContext, LinkChooserEventData, SearchResult } from "../types";
import { createCustomLink } from "../utils/helpers";

export const updateQueryFromString = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    query: (_context, { data }) => data.query ?? "",
});

export const updateQueryFromObject = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    query: (_context, { data }) => data.selectedResult?.title ?? "",
});

export const updateCustomLink = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    searchResults: (context) =>
        context.query
            ? [
                  ...context.searchResults.filter((result) => result.id !== CUSTOM_LINK_ID),
                  ...[createCustomLink(context.query)],
              ]
            : context.searchResults,
});

export const setSelectedSearchResult = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    selectedResult: (_, { data }) => data.selectedResult ?? null,
});

export const retrieveRecentQueries = (): SearchResult[] => {
    const recentQueries = JSON.parse(localStorage.getItem(QUERIES_STORAGE_KEY) || "null");
    return recentQueries || [];
};

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
        const retrievedQueries = retrieveRecentQueries();
        const retrievedItem = retrievedQueries.find((item: SearchResult) => item.id === selectedResult?.id);
        const updatedQueries = retrievedItem
            ? [
                  { ...selectedResult },
                  ...retrievedQueries.filter((item: SearchResult) => item.id !== selectedResult?.id),
              ]
            : retrievedQueries.length < MAX_STORED_ITEMS
            ? [{ ...selectedResult }, ...retrievedQueries]
            : [{ ...selectedResult }, ...retrievedQueries.slice(0, -1)];
        localStorage.setItem(QUERIES_STORAGE_KEY, JSON.stringify(updatedQueries));
    }
};

export const emitSelectSearchResult = (context: LinkChooserContext): void => {
    context.onLinkChange(context.selectedResult);
};

export const clearSelectedResult = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    selectedResult: null,
});

export const copyLinkToClipboard = ({ copyToClipboard, selectedResult }: LinkChooserContext): void => {
    selectedResult?.link && copyToClipboard.writeText(selectedResult.link);
};

export const openPreview = ({ openPreview, selectedResult }: LinkChooserContext): void => {
    selectedResult?.link && openPreview(selectedResult.link, "_blank");
};

export const updateDropdownSearchResults = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    searchResults: (_context, { data }) => data.searchResults ?? [],
});

export const fetchGlobalSearchResults = async (context: LinkChooserContext): Promise<LinkChooserEventData> => {
    const results = context.query ? await context.getGlobalByQuery(context.query) : retrieveRecentQueries();
    return { searchResults: results };
};

export const fetchTemplateSearchResults = async (context: LinkChooserContext): Promise<LinkChooserEventData> => {
    const results = await context.getTemplatesByQuery(context.query);
    return { searchResults: results };
};
