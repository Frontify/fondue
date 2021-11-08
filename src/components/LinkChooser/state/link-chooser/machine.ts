/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from "@components/Checkbox/Checkbox";
import { SearchResult } from "src";
import { createMachine, DoneInvokeEvent } from "xstate";
import { dropdownMachine } from "../dropdown/machine";
import { openPreview, updateQuery, setOpenInNewTab, setSelectedResult, clearSelectedResult } from "./actions";

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
                    // share actions with both states?
                    CLEARING: {
                        target: LinkChooserState.Idle,
                        actions: ["clearSelectedResult"],
                    },
                    // share actions with both states?
                    OPEN_PREVIEW: {
                        target: LinkChooserState.Idle,
                        actions: ["openPreview"],
                    },
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
                    TYPING: {
                        target: LinkChooserState.Focused,
                        actions: ["updateQuery"],
                    },
                    SET_SELECTED_RESULT: {
                        target: LinkChooserState.Idle,
                        actions: ["setSelectedResult"],
                    },
                    // share actions with both states?
                    CLEARING: {
                        target: LinkChooserState.Focused,
                        actions: ["clearSelectedResult"],
                    },
                    // share actions with both states?
                    OPEN_PREVIEW: {
                        target: LinkChooserState.Focused,
                        actions: ["openPreview"],
                    },
                },
            },
        },
    },
    {
        actions: {
            setOpenInNewTab,
            updateQuery,
            setSelectedResult,
            clearSelectedResult,
            openPreview,
        },
    },
);
