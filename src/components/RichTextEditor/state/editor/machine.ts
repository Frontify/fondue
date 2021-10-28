/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createMachine, DoneInvokeEvent } from "xstate";
import { toolbarMachine } from "../toolbar/machine";
import { updateLastSelectedText } from "./actions";

export type EditorContext = {
    locked: boolean;
    lastSelectedText: string | null;
};

export type EditorStateData = {
    selectedText: string;
};

export type EditorEventDataTypes = EditorStateData;

export enum States {
    Readonly = "readonly",
    Editing = "editing",
    Styling = "styling",
}

export const editorMachine = createMachine<EditorContext, DoneInvokeEvent<EditorEventDataTypes>>(
    {
        id: "editor",
        initial: States.Readonly,
        states: {
            [States.Readonly]: {
                on: {
                    FOCUSED: {
                        target: States.Editing,
                        cond: "canEdit",
                    },
                },
            },
            [States.Editing]: {
                on: {
                    TEXT_SELECTED: [
                        {
                            target: States.Styling,
                            actions: ["updateLastSelectedText"],
                        },
                    ],
                },
            },
            [States.Styling]: {
                invoke: {
                    id: "toolbar",
                    src: toolbarMachine,
                },
                on: {
                    TEXT_SELECTED: [
                        {
                            target: States.Styling,
                            actions: ["updateLastSelectedText"],
                        },
                    ],
                },
            },
        },
    },
    {
        guards: {
            canEdit: ({ locked }) => !locked,
        },
        actions: {
            updateLastSelectedText,
        },
    },
);
