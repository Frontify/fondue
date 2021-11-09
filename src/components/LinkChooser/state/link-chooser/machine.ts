/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from "@components/Checkbox/Checkbox";
import { SearchResult } from "src";
import { createMachine, DoneInvokeEvent } from "xstate";
import { dropdownMachine } from "../dropdown/machine";
import {
    openPreview,
    updateQuery,
    setOpenInNewTab,
    setSelectedSearchResult,
    retrieveRecentQueries,
    storeNewSelectedResult,
    emitSelectSearchResult,
    clearSelectedResult,
    updateDropdownSearchResults,
    updateCustomLink,
} from "./actions";

export enum LinkChooserState {
    Idle = "idle",
    Focused = "focused",
}

export type LinkChooserContext = {
    searchResults: SearchResult[];
    selectedResult: SearchResult | null;
    query: string;
    openInNewTab: CheckboxState;
    onOpenInNewTabChange: (value: boolean) => void;
};

const sharedActions = {
    CLEARING: {
        actions: ["clearSelectedResult", "updateQuery"], // clearSelectedResult, updateQuery, emitSelectSearchResult
    },
    OPEN_PREVIEW: {
        actions: ["openPreview"],
    },
};

export const linkChooserMachine = createMachine<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>(
    {
        id: "link-chooser",
        initial: LinkChooserState.Idle,
        states: {
            [LinkChooserState.Idle]: {
                on: {
                    OPEN_DROPDOWN: {
                        target: LinkChooserState.Focused,
                    },
                    SET_NEW_TAB: {
                        actions: ["setOpenInNewTab"],
                    },
                    ...sharedActions,
                },
            },
            [LinkChooserState.Focused]: {
                invoke: {
                    id: "dropdown",
                    src: dropdownMachine,
                    data: (context) => context,
                },
                on: {
                    CLOSE_DROPDOWN: {
                        target: LinkChooserState.Idle,
                    },
                    TYPING: [
                        {
                            actions: ["updateQuery", "updateCustomLink"],
                            cond: "isDefaultSection",
                        },
                        {
                            actions: ["updateQuery"],
                        },
                    ],
                    RETRIEVE_RECENT_QUERIES: {
                        actions: ["retrieveRecentQueries"],
                    },
                    SET_SELECTED_SEARCH_RESULT: {
                        target: LinkChooserState.Idle,
                        actions: ["storeNewSelectedResult", "", "setSelectedSearchResult", ""], // storeNewSelectedResult, updateDropdownSearchResults, setSelectedSearchResult, emitSelectSearchResult
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
            isDefaultSection: (context, event) => {
                // check if child state value is equal to the default zone/section
                return true;
            },
        },
        actions: {
            setOpenInNewTab,
            updateQuery,
            updateCustomLink,
            setSelectedSearchResult,
            retrieveRecentQueries,
            storeNewSelectedResult,
            emitSelectSearchResult,
            clearSelectedResult,
            openPreview,
            updateDropdownSearchResults,
        },
    },
);
