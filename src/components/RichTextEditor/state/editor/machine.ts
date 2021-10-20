import { assign } from "@xstate/immer";
import { EditorState, RawDraftContentState, SelectionState } from "draft-js";
import { createMachine, DoneInvokeEvent } from "xstate";
import { toolbarMachine } from "../toolbar/machine";
import { updateEditorState } from "./actions";
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
                },
            },
            [States.Editing]: {
                on: {
                    CHANGE: [
                        {
                            target: States.Styling,
                            cond: "hasSelection",
                            actions: "updateEditorState",
                        },
                        {
                            actions: "updateEditorState",
                        },
                    ],
                },
            },
            [States.Styling]: {
                invoke: {
                    id: "toolbar",
                    src: toolbarMachine,
                    data: ({ editorState }) => ({
                        editorState,
                    }),
                },
                on: {
                    CHANGE: [
                        {
                            target: States.Styling,
                            cond: "hasSelection",
                            actions: "updateEditorState",
                        },
                        {
                            target: States.Editing,
                            actions: ["updateEditorState"],
                        },
                    ],
                },
                exit: assign<EditorContext, DoneInvokeEvent<EditorEventDataTypes>>((context) => {
                    context.editorState = EditorState.forceSelection(context.editorState, new SelectionState());
                }),
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
        },
    },
);
