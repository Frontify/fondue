/* (c) Copyright Frontify Ltd., all rights reserved. */

import { assign, DoneInvokeEvent } from "xstate";
import { SearchResult } from "../types";
import { LinkChooserContext, LinkChooserEventData } from "./machine";

export const setSearchTerm = () =>
    assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
        searchTerm: (_context, { data }) => data.searchTerm ?? "",
    });

export const setSectionId = () =>
    assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
        currentSectionId: (_context, { data }) => data.currentSectionId ?? "",
    });

export const setSelectedResultId = () =>
    assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
        selectedResultId: (_context, { data }) => data.selectedResultId ?? "",
    });

export const setSearchResults = () =>
    assign<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>({
        searchResults: (_context, { data }) => data.searchResults ?? [],
    });

export const filterResults = () => {
    console.warn("implement filterResults");
};

export const fetchExtraSectionResults = async (context: LinkChooserContext): Promise<LinkChooserEventData> => {
    let results: SearchResult[] = [];
    const extraSection = context.extraSections.find(({ id }) => id === context.currentSectionId) || null;

    if (extraSection?.getResults) {
        results = await extraSection.getResults(context.searchTerm);
    }

    return { searchResults: results };
};
