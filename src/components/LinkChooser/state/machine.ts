/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createMachine, DoneInvokeEvent } from "xstate";
import { LinkChooserContext, LinkChooserEventData } from "../types";
import {
    clearSelectedResult,
    emitSelectSearchResult,
    fetchGlobalSearchResults,
    fetchTemplateSearchResults,
    openPreview,
    populateDropdownSearchResultsWithRecentQueries,
    retrieveRecentQueries,
    setOpenInNewTab,
    setSelectedSearchResult,
    storeNewSelectedResult,
    updateCustomLink,
    updateDropdownSearchResults,
    updateQueryFromObject,
    updateQueryFromString,
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

const sharedActions = {
    CLEARING: {
        actions: ["clearSelectedResult", "updateQueryFromString", "emitSelectSearchResult"], // clearSelectedResult, updateQueryFromString, emitSelectSearchResult
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
                        actions: ["populateDropdownSearchResultsWithRecentQueries", (context) => console.log(context)],
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
                        actions: [
                            "storeNewSelectedResult",
                            "updateQueryFromObject",
                            "",
                            "setSelectedSearchResult",
                            "emitSelectSearchResult",
                        ], // storeNewSelectedResult, updateQueryFromObject, updateDropdownSearchResults, setSelectedSearchResult, emitSelectSearchResult
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
                meta.state.matches(`${LinkChooserState.Focused}.${DropdownState.Default}.${SectionState.Loaded}`),
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
