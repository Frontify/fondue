/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createMachine, DoneInvokeEvent } from "xstate";
import { LinkChooserContext, LinkChooserEventData } from "../types";
import { isFetching } from "../utils/helpers";
import {
    clearSelectedResult,
    copyLinkToClipboard,
    emitSelectSearchResult,
    fetchGlobalSearchResults,
    fetchTemplateSearchResults,
    openPreview,
    populateDropdownSearchResultsWithRecentQueries,
    retrieveRecentQueries,
    setSelectedSearchResult,
    storeNewSelectedResult,
    updateCustomLink,
    updateDropdownSearchResults,
    updateQueryFromObject,
    updateQueryFromString,
    interruptFetching,
    resolveFetching,
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

const DEBOUNCE_TIMEOUT = 500;

const typingAction = {
    TYPING: {
        target: SectionState.Typing,
        internal: false,
        actions: ["updateQueryFromString"],
    },
};

const selectionActions = [
    "storeNewSelectedResult",
    "updateQueryFromObject",
    "updateCustomLink",
    "setSelectedSearchResult",
    "emitSelectSearchResult",
];

const sharedActions = {
    CLEARING: {
        actions: ["clearSelectedResult", "updateQueryFromString", "emitSelectSearchResult"],
    },
    OPEN_PREVIEW: {
        actions: ["openPreview"],
    },
    COPY_TO_CLIPBOARD: {
        actions: ["copyLinkToClipboard"],
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
                ...typingAction,
            },
        },
        [SectionState.Typing]: {
            after: {
                [DEBOUNCE_TIMEOUT]: { target: SectionState.Fetching },
            },
            on: {
                ...typingAction,
            },
        },
        [SectionState.Fetching]: {
            invoke: {
                id,
                src,
                onDone: [
                    {
                        target: SectionState.Loaded,
                        actions: ["updateDropdownSearchResults", "updateCustomLink", "resolveFetching"],
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
                ...typingAction,
            },
        },
        [SectionState.Error]: {
            on: {
                ...typingAction,
            },
        },
    },
});

export const linkChooserMachine = createMachine<LinkChooserContext, DoneInvokeEvent<LinkChooserEventData>>(
    {
        id: "link-chooser",
        initial: LinkChooserState.Idle,
        states: {
            [LinkChooserState.Idle]: {
                on: {
                    OPEN_DROPDOWN: [
                        {
                            target: LinkChooserState.Focused,
                            actions: ["populateDropdownSearchResultsWithRecentQueries"],
                            cond: "isQueryEmpty",
                        },
                        {
                            target: LinkChooserState.Focused,
                            actions: ["updateCustomLink"],
                        },
                    ],
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
                    CLOSE_DROPDOWN: [
                        {
                            target: LinkChooserState.Idle,
                            actions: [...selectionActions, "interruptFetching"],
                            cond: "shouldRefetch",
                        },
                        {
                            target: LinkChooserState.Idle,
                            actions: [...selectionActions],
                        },
                    ],
                    SET_SELECTED_SEARCH_RESULT: {
                        target: LinkChooserState.Idle,
                        actions: [...selectionActions],
                    },
                    ...sharedActions,
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
            shouldRefetch: (context, event, meta) => isFetching(meta.state.matches) && !!context.query,
            isQueryEmpty: (context) => !context.query,
        },
        actions: {
            clearSelectedResult,
            copyLinkToClipboard,
            emitSelectSearchResult,
            fetchGlobalSearchResults,
            fetchTemplateSearchResults,
            openPreview,
            populateDropdownSearchResultsWithRecentQueries,
            retrieveRecentQueries,
            setSelectedSearchResult,
            storeNewSelectedResult,
            updateCustomLink,
            updateDropdownSearchResults,
            updateQueryFromObject,
            updateQueryFromString,
            interruptFetching,
            resolveFetching,
        },
    },
);
