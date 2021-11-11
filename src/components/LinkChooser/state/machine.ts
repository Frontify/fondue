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
    Typing = "typing",
    Fetching = "fetching",
    Error = "error",
}

const typingAction = (target?: string) => ({
    TYPING: {
        ...(target ? { target } : {}),
        actions: ["updateQueryFromString"],
    },
});

const sharedActions = {
    CLEARING: {
        actions: ["clearSelectedResult", "updateQueryFromString", "emitSelectSearchResult"],
    },
    OPEN_PREVIEW: {
        actions: ["openPreview"],
    },
};

const initializeSectionState = (
    initial: string,
    id: string,
    src: (context: LinkChooserContext) => Promise<LinkChooserEventData>,
) => ({
    initial,
    states: {
        [SectionState.Loaded]: {
            on: {
                ...typingAction(SectionState.Fetching),
            },
        },
        [SectionState.Typing]: {
            on: {
                SEARCHING: {
                    target: SectionState.Fetching,
                },
            },
        },
        [SectionState.Fetching]: {
            invoke: {
                id,
                src,
                onDone: [
                    {
                        target: SectionState.Loaded,
                        actions: ["updateDropdownSearchResults", "updateCustomLink"],
                        cond: "isDefaultSection",
                    },
                    {
                        target: SectionState.Loaded,
                        actions: ["updateDropdownSearchResults"],
                    },
                ],
                onError: SectionState.Error,
            },
            on: {
                ...typingAction(SectionState.Typing),
            },
        },
        [SectionState.Error]: {},
    },
});

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
                        ...initializeSectionState(SectionState.Loaded, "fetchGlobal", fetchGlobalSearchResults),
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
                                target: `${DropdownState.Default}.${SectionState.Fetching}`,
                            },
                        },
                    },
                    [DropdownState.Projects]: {
                        on: {
                            GO_TO_DEFAULT: {
                                target: `${DropdownState.Default}.${SectionState.Fetching}`,
                            },
                        },
                    },
                    [DropdownState.Templates]: {
                        ...initializeSectionState(SectionState.Fetching, "fetchTemplates", fetchTemplateSearchResults),
                        on: {
                            GO_TO_DEFAULT: {
                                target: `${DropdownState.Default}.${SectionState.Fetching}`,
                            },
                        },
                    },
                },
                on: {
                    CLOSE_DROPDOWN: {
                        target: LinkChooserState.Idle,
                    },
                    SET_SELECTED_SEARCH_RESULT: {
                        target: LinkChooserState.Idle,
                        actions: [
                            "storeNewSelectedResult",
                            "updateQueryFromObject",
                            "setSelectedSearchResult",
                            "emitSelectSearchResult",
                        ],
                    },
                    UPDATE_DROPDOWN_SEARCH_RESULTS: {
                        actions: ["updateDropdownSearchResults"],
                    },
                    ...sharedActions,
                    ...typingAction(),
                },
            },
        },
    },
    {
        guards: {
            isDefaultSection: (context, event, meta) =>
                Object.values(SectionState).some((state) =>
                    meta.state.matches(`${LinkChooserState.Focused}.${DropdownState.Default}.${state}`),
                ),
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
