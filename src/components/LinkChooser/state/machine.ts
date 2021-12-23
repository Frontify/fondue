/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createMachine, DoneInvokeEvent } from "xstate";
import { LinkChooserContext, LinkChooserEventData } from "../types";
import { isFetching } from "../utils/state";
import {
    clearSelectedResult,
    copyLinkToClipboard,
    emitSelectSearchResult,
    fetchGlobalSearchResults,
    fetchGuidelineSearchResults,
    fetchTemplateSearchResults,
    interruptFetching,
    openPreview,
    populateDropdownSearchResultsWithRecentQueries,
    resolveFetching,
    setSelectedSearchResult,
    storeNewSelectedResult,
    updateCustomLink,
    updateDropdownGuidelineNodes,
    updateDropdownSearchResults,
    updateQueryFromObject,
    updateQueryFromString,
} from "./actions";

export enum LinkChooserState {
    Idle = "Idle",
    Focused = "Focused",
}

export enum DropdownState {
    Default = "Default",
    Guidelines = "Guidelines",
    Templates = "Templates",
}

export enum SectionState {
    Loaded = "Loaded",
    Typing = "Typing",
    Fetching = "Fetching",
    Error = "Error",
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
                [DEBOUNCE_TIMEOUT]: SectionState.Fetching,
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
                        actions: ["updateDropdownGuidelineNodes"],
                        cond: "isGuidelinesSection",
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
                            GO_TO_GUIDELINES: DropdownState.Guidelines,
                            GO_TO_TEMPLATES: DropdownState.Templates,
                        },
                    },
                    [DropdownState.Guidelines]: {
                        ...initializeSectionState(
                            SectionState.Fetching,
                            "fetchGuidelines",
                            fetchGuidelineSearchResults,
                        ),
                        on: {
                            GO_TO_DEFAULT: `${DropdownState.Default}.${SectionState.Fetching}`,
                        },
                    },
                    [DropdownState.Templates]: {
                        ...initializeSectionState(SectionState.Fetching, "fetchTemplates", fetchTemplateSearchResults),
                        on: {
                            GO_TO_DEFAULT: `${DropdownState.Default}.${SectionState.Fetching}`,
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
            isGuidelinesSection: (context, event, meta) =>
                Object.values(SectionState).some((state) =>
                    meta.state.matches(`${LinkChooserState.Focused}.${DropdownState.Guidelines}.${state}`),
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
            fetchGuidelineSearchResults,
            openPreview,
            populateDropdownSearchResultsWithRecentQueries,
            setSelectedSearchResult,
            storeNewSelectedResult,
            updateCustomLink,
            updateDropdownSearchResults,
            updateDropdownGuidelineNodes,
            updateQueryFromObject,
            updateQueryFromString,
            interruptFetching,
            resolveFetching,
        },
    },
);
