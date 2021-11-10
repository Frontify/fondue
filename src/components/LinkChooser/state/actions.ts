import { CheckboxState } from "@components/Checkbox/Checkbox";
import {
    CUSTOM_LINK_ID,
    DEFAULT_ICON,
    MAX_STORED_ITEMS,
    QUERIES_STORAGE_KEY,
} from "@components/LinkChooser/LinkChooser";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { assign, DoneInvokeEvent } from "xstate";
import { LinkChooserContext, LinkChooserEventData, SearchResult } from "../types";

export const setOpenInNewTab = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    openInNewTab: (_context, { data }) => data.openInNewTab ?? CheckboxState.Unchecked,
});

export const updateQueryFromString = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    query: (_context, { data }) => data.query ?? "",
});

export const updateQueryFromObject = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    query: (_context, { data }) => data.selectedResult?.title ?? "",
});

export const updateCustomLink = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    searchResults: (context, { data }) => [
        ...context.searchResults.filter((result) => result.id !== CUSTOM_LINK_ID),
        ...(data.query
            ? [
                  {
                      id: CUSTOM_LINK_ID,
                      title: data.query,
                      link: data.query,
                      icon: DEFAULT_ICON,
                      size: MenuItemContentSize.Large,
                  } as SearchResult,
              ]
            : []),
    ],
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
    const retrievedQueries = retrieveRecentQueries();
    const retrievedItem = retrievedQueries.find((item: SearchResult) => item.id === selectedResult?.id);
    const updatedQueries = retrievedItem
        ? [{ ...selectedResult }, ...retrievedQueries.filter((item: SearchResult) => item.id !== selectedResult?.id)]
        : retrievedQueries.length < MAX_STORED_ITEMS
        ? [{ ...selectedResult }, ...retrievedQueries]
        : [{ ...selectedResult }, ...retrievedQueries.slice(0, -1)];
    localStorage.setItem(QUERIES_STORAGE_KEY, JSON.stringify(updatedQueries));
};

export const emitSelectSearchResult = (context: LinkChooserContext): void => {
    context.selectedResult && context.onLinkChange(context.selectedResult);
};

export const clearSelectedResult = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    selectedResult: null,
});

export const openPreview = ({ selectedResult }: LinkChooserContext): void => {
    selectedResult?.link && window.open(selectedResult.link, "_blank");
};

export const updateDropdownSearchResults = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
    searchResults: (_context, { data }) => data.searchResults ?? [],
});

export const fetchGlobalSearchResults = async (context: LinkChooserContext): Promise<LinkChooserEventData> => {
    const results = context.query ? await context.getGlobalByQuery(context.query) : retrieveRecentQueries();
    return { searchResults: results };
};

export const fetchTemplateSearchResults = async (context: LinkChooserContext): Promise<LinkChooserEventData> => {
    const results = context.query ? await context.getTemplatesByQuery(context.query) : retrieveRecentQueries();
    return { searchResults: results };
};
