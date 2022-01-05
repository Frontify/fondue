/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CUSTOM_LINK_ID, QUERIES_STORAGE_KEY } from "@components/LinkChooser/LinkChooser";
import { assign, DoneInvokeEvent } from "xstate";
import { LinkChooserContext, LinkChooserEventData } from "../types";
import { createCustomLink, mergeResultWithRecentQueries, retrieveRecentQueries } from "../utils/transformers";

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
    selectedResult: (_, { data }) => {
        console.log(data.selectedResult);
        return data.selectedResult ?? null;
    },
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

export const fetchGuidelineSearchResults = async (context: LinkChooserContext): Promise<LinkChooserEventData> => {
    const results = await context.getGuidelinesByQuery(context.query);
    return { searchResults: results };
};

export const interruptFetching = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    interruptedFetch: () => true,
});

export const resolveFetching = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    interruptedFetch: () => false,
});
