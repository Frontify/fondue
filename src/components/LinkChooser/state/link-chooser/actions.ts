import {
    CUSTOM_LINK_ID,
    DEFAULT_ICON,
    MAX_STORED_ITEMS,
    QUERIES_STORAGE_KEY,
    SearchResult,
} from "@components/LinkChooser/LinkChooser";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { assign } from "@xstate/immer";
import { DoneInvokeEvent } from "xstate";
import { LinkChooserContext } from "./machine";

export const setOpenInNewTab = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>((context, { data }) => {
    context.openInNewTab = data.openInNewTab;
});

export const updateQueryFromString = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>(
    (context, { data }) => {
        context.query = data.query;
    },
);

export const updateQueryFromObject = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>(
    (context, { data }) => {
        context.query = data.selectedResult?.title ?? "";
    },
);

export const updateCustomLink = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>((context, { data }) => {
    const strippedSearchResults = context.searchResults.filter((result) => result.id !== CUSTOM_LINK_ID);
    context.searchResults = [
        ...strippedSearchResults,
        ...(data.query && [
            {
                id: CUSTOM_LINK_ID,
                title: data.query,
                link: data.query,
                iconLabel: DEFAULT_ICON,
                size: MenuItemContentSize.Large,
            },
        ]),
    ];
});

export const setSelectedSearchResult = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>(
    (context, { data }) => {
        //TODO: Ask Marco why
        context.selectedResult = data.selectedResult;
    },
);

export const retrieveRecentQueries = (): SearchResult[] => {
    const recentQueries = JSON.parse(localStorage.getItem(QUERIES_STORAGE_KEY) || "null");
    return recentQueries || [];
};

export const populateDropdownSearchResultsWithRecentQueries = assign<
    LinkChooserContext,
    DoneInvokeEvent<LinkChooserContext>
>((context) => {
    const recentQueries = retrieveRecentQueries();
    context.searchResults = recentQueries;
});

export const storeNewSelectedResult = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>(
    (context, { data }) => {
        const { selectedResult } = data;
        const retrievedQueries = retrieveRecentQueries();
        const retrievedItem = retrievedQueries.find((item: SearchResult) => item.id === selectedResult.id);
        const updatedQueries = retrievedItem
            ? [{ ...selectedResult }, ...retrievedQueries.filter((item: SearchResult) => item.id !== selectedResult.id)]
            : retrievedQueries.length < MAX_STORED_ITEMS
            ? [{ ...selectedResult }, ...retrievedQueries]
            : [{ ...selectedResult }, ...retrievedQueries.slice(0, -1)];
        localStorage.setItem(QUERIES_STORAGE_KEY, JSON.stringify(updatedQueries));
        return updatedQueries;
    },
);

export const emitSelectSearchResult = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>(
    (context, { data }) => {},
);

export const clearSelectedResult = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>((context) => {
    //TODO: Ask Marco why
    context.selectedResult = null;
});

export const openPreview = ({ selectedResult }: LinkChooserContext): void => {
    selectedResult?.link && window.open(selectedResult.link, "_blank");
};

export const updateDropdownSearchResults = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>(
    (context, { data }) => {
        context.searchResults = data.searchResults;
    },
);

export const fetchGlobalSearchResults = async (context) => {
    const results = await context.getGlobalByQuery(context.query);
    return { searchResults: results };
};

export const fetchTemplateSearchResults = async (context) => {
    const results = await context.getTemplatesByQuery(context.query);
    return { searchResults: results };
};
