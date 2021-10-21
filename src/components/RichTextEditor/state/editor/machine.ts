/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, RawDraftContentState } from "draft-js";
import { createMachine, DoneInvokeEvent } from "xstate";
import { toolbarMachine } from "../toolbar/machine";
import { notifyContentChanged, resetSelection, updateEditorState } from "./actions";
import { hasEditorState } from "./typeguards";

export type EditorContext = {
    locked: boolean;
    editorState: EditorState;
    onContentChanged?: (content: RawDraftContentState) => void;
};

export type EditorStateData = {
    editorState: EditorState;
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
                    // The CHANGE needs to be handled in readonly to initialize the editor
                    CHANGE: {
                        actions: "updateEditorState",
                        cond: "canEdit",
                    },
                },
            },
            [States.Editing]: {
                on: {
                    CHANGE: [
                        {
                            target: States.Styling,
                            cond: "hasSelection",
                            actions: ["updateEditorState", "notifyContentChanged"],
                        },
                        {
                            target: States.Editing,
                            actions: ["updateEditorState", "notifyContentChanged"],
                        },
                    ],
                },
            },
            [States.Styling]: {
                invoke: {
                    id: "toolbar",
                    src: toolbarMachine,
                    data: ({ editorState }) => ({ editorState }),
                },
                on: {
                    CHANGE: [
                        {
                            target: States.Styling,
                            actions: ["updateEditorState", "notifyContentChanged"],
                            cond: "hasSelection",
                        },
                        {
                            target: States.Editing,
                            actions: ["updateEditorState", "notifyContentChanged", "resetSelection"],
                        },
                    ],
                },
            },
        },
    },
    {
        guards: {
            canEdit: ({ locked }) => !locked,
            hasSelection: ({ locked }, { data }) => {
                const selection = data.editorState.getSelection();
                return !locked && hasEditorState(data) && selection.getHasFocus() && !selection.isCollapsed();
            },
        },
        actions: {
            updateEditorState,
            resetSelection,
            notifyContentChanged,
        },
    },
);
