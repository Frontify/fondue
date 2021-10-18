import { EditorState } from "draft-js";
import { createMachine, DoneInvokeEvent } from "xstate";
import { toolbarMachine } from "../toolbar/machine";
import { updateEditorState } from "./actions";

export type EditorContext = {
    locked: boolean;
    editorState: EditorState;
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
        initial: "readonly",
        states: {
            [States.Readonly]: {
                on: {
                    FOCUS: {
                        target: "editing",
                        cond: "canEdit",
                    },
                },
            },
            [States.Editing]: {
                on: {
                    CONTENT_CHANGED: {
                        actions: "updateEditorState",
                    },
                },
            },
            [States.Styling]: {
                invoke: toolbarMachine,
            },
        },
    },
    {
        guards: {
            canEdit: ({ locked }) => !locked,
        },
        actions: {
            updateEditorState,
        },
    },
);
