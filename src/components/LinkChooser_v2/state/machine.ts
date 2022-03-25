/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Key } from "react";
import { createMachine, DoneInvokeEvent } from "xstate";
import { ExtraSection, SearchResult } from "../types";
import {
    fetchExtraSectionResults,
    filterResults,
    setSearchResults,
    setSearchTerm,
    setSectionId,
    setSelectedResultId,
} from "./actions";

export const DEFAULT_SECTION_ID = "default";

export enum LinkChooserState {
    Idle = "idle",
    Open = "focused",
    Fetching = "fetching",
    Error = "error",
}

export type LinkChooserContext = {
    searchResults: SearchResult[];
    selectedKey: Key | null;
    searchTerm: string;
    extraSections: ExtraSection[];
    currentSectionId: string;
    onLinkChange: (value: SearchResult | null) => void;
    getGlobalByQuery: (query: string) => Promise<SearchResult[]>;
};

export type LinkChooserEventData = {
    searchResults?: SearchResult[];
    selectedKey?: Key | null;
    searchTerm?: string;
    extraSections?: ExtraSection[];
    currentSectionId?: string;
};

export const linkChooserMachine = createMachine<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>(
    {
        id: "link-chooser-machine",
        initial: LinkChooserState.Idle,
        states: {
            [LinkChooserState.Idle]: {
                on: {
                    CLICK: {
                        target: LinkChooserState.Open,
                    },
                    CLEAR: {
                        actions: "setSelectedResultId(null)",
                    },
                },
            },
            [LinkChooserState.Open]: {
                on: {
                    TYPING: [
                        {
                            actions: [
                                "setSearchTerm(term)",
                                "setSectionId('default')",
                                "filterResults(searchTerm)",
                                "fetchExtraSectionResults",
                            ],
                            cond: "isDefaultSection",
                            target: LinkChooserState.Fetching,
                        },
                        {
                            actions: ["setSearchTerm(term)", "setSectionId(sectionId)", "fetchExtraSectionResults"],
                            target: LinkChooserState.Fetching,
                        },
                    ],
                    SELECT: {
                        actions: "setSelectedResultId(id)",
                        target: LinkChooserState.Idle,
                    },
                    CLEAR: {
                        actions: "setSelectedResultId(null)",
                    },
                },
            },
            [LinkChooserState.Fetching]: {
                on: {
                    DONE: [
                        {
                            cond: "fetchingFailed",
                            target: LinkChooserState.Error,
                        },
                        {
                            actions: "setResults(results)",
                            target: LinkChooserState.Open,
                        },
                    ],
                },
            },
            [LinkChooserState.Error]: {
                on: {
                    TYPING: {
                        actions: "setSearchTerm(term)",
                        target: LinkChooserState.Fetching,
                    },
                },
            },
        },
    },
    {
        guards: {
            isDefaultSection: (context) => context.currentSectionId === DEFAULT_SECTION_ID,
            fetchingFailed: () => false,
        },
        actions: {
            setSearchTerm,
            setSectionId,
            filterResults,
            fetchExtraSectionResults,
            setSelectedResultId,
            setSearchResults,
        },
    },
);
