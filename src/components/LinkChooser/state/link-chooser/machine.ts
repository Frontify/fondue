/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from "@components/Checkbox/Checkbox";
import { SearchResult, Section } from "src";
import { createMachine, DoneInvokeEvent } from "xstate";
import {
    openPreview,
    setOpenInNewTab,
    setSelectedSearchResult,
    retrieveRecentQueries,
    storeNewSelectedResult,
    emitSelectSearchResult,
    clearSelectedResult,
    updateDropdownSearchResults,
    updateCustomLink,
    updateQueryFromString,
    updateQueryFromObject,
    fetchGlobalSearchResults,
    fetchTemplateSearchResults,
    populateDropdownSearchResultsWithRecentQueries,
} from "./actions";

export enum LinkChooserState {
    Idle = "idle",
    Focused = "focused",
}

export enum DropdownState {
    Default = "default",
    Guidelines = "guidelines",
    Projects = "projects",
    Templates = "templates",
}

export enum SectionState {
    Loaded = "loaded",
    Fetching = "fetching",
    Error = "error",
}

export type LinkChooserContext = {
    searchResults: SearchResult[];
    selectedResult: SearchResult | null;
    query: string;
    openInNewTab: CheckboxState;
    onOpenInNewTabChange: (value: boolean) => void;
    readonly getGlobalByQuery: (query: string) => Promise<SearchResult[]>; // context.getTemplateByQuery
    readonly getTemplatesByQuery: (query: string) => Promise<SearchResult[]>; // context.getTemplateByQuery
};

type LinkChooserEventData = {
    searchResults?: SearchResult[];
    selectedResult?: SearchResult | null;
};

const sharedActions = {
    CLEARING: {
        actions: ["clearSelectedResult", "updateQueryFromString"], // clearSelectedResult, updateQueryFromString, emitSelectSearchResult
    },
    OPEN_PREVIEW: {
        actions: ["openPreview"],
    },
};

export const linkChooserMachine = createMachine<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>(
    {
        id: "link-chooser",
        initial: LinkChooserState.Idle,
        states: {
            [LinkChooserState.Idle]: {
                on: {
                    OPEN_DROPDOWN: {
                        target: LinkChooserState.Focused,
                        actions: ["populateDropdownSearchResultsWithRecentQueries"],
                    },
                    SET_NEW_TAB: {
                        actions: ["setOpenInNewTab"],
                    },
                    ...sharedActions,
                },
            },
            [LinkChooserState.Focused]: {
                initial: DropdownState.Default,
                states: {
                    [DropdownState.Default]: {
                        initial: SectionState.Loaded,
                        states: {
                            [SectionState.Loaded]: {
                                on: {
                                    SEARCHING: {
                                        target: SectionState.Fetching,
                                    },
                                },
                            },
                            [SectionState.Fetching]: {
                                invoke: {
                                    id: "fetchGlobal",
                                    src: fetchGlobalSearchResults,
                                    onDone: {
                                        target: SectionState.Loaded,
                                        actions: ["updateDropdownSearchResults"],
                                    },
                                    onError: SectionState.Error,
                                },
                            },
                            [SectionState.Error]: {},
                        },
                        on: {
                            GO_TO_GUIDELINES: {
                                target: DropdownState.Guidelines,
                            },
                            GO_TO_PROJECTS: {
                                target: DropdownState.Projects,
                            },
                            GO_TO_TEMPLATES: {
                                target: DropdownState.Templates,
                            },
                        },
                    },
                    [DropdownState.Guidelines]: {
                        on: {
                            GO_TO_DEFAULT: {
                                target: DropdownState.Default,
                            },
                        },
                    },
                    [DropdownState.Projects]: {
                        on: {
                            GO_TO_DEFAULT: {
                                target: DropdownState.Default,
                            },
                        },
                    },
                    [DropdownState.Templates]: {
                        on: {
                            GO_TO_DEFAULT: {
                                target: DropdownState.Default,
                            },
                        },
                    },
                },
                on: {
                    CLOSE_DROPDOWN: {
                        target: LinkChooserState.Idle,
                    },
                    TYPING: [
                        {
                            actions: ["updateQueryFromString", "updateCustomLink"],
                            cond: "isDefaultSection",
                        },
                        {
                            actions: ["updateQueryFromString"],
                        },
                    ],
                    SET_SELECTED_SEARCH_RESULT: {
                        target: LinkChooserState.Idle,
                        actions: ["storeNewSelectedResult", "updateQueryFromObject", "", "setSelectedSearchResult", ""], // storeNewSelectedResult, updateQueryFromObject, updateDropdownSearchResults, setSelectedSearchResult, emitSelectSearchResult
                    },
                    UPDATE_DROPDOWN_SEARCH_RESULTS: {
                        actions: ["updateDropdownSearchResults"],
                    },
                    ...sharedActions,
                },
            },
        },
    },
    {
        guards: {
            isTextInputEmpty: (context) => !context.query,
            isDefaultSection: (context, event, meta) =>
                meta.state.value[LinkChooserState.Focused] === DropdownState.Default,
        },
        actions: {
            setOpenInNewTab,
            updateQueryFromString,
            updateQueryFromObject,
            updateCustomLink,
            setSelectedSearchResult,
            retrieveRecentQueries,
            storeNewSelectedResult,
            emitSelectSearchResult,
            clearSelectedResult,
            openPreview,
            updateDropdownSearchResults,
            fetchGlobalSearchResults,
            fetchTemplateSearchResults,
            populateDropdownSearchResultsWithRecentQueries,
        },
    },
);
