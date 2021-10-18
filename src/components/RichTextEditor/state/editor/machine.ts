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

export const editorMachine = createMachine<EditorContext, DoneInvokeEvent<EditorEventDataTypes>>(
    {
        id: "editor",
        initial: "readonly",
        states: {
            readonly: {
                on: {
                    FOCUS: {
                        target: "editing",
                        cond: "canEdit",
                    },
                },
            },
            editing: {
                on: {
                    CONTENT_CHANGED: {
                        actions: "updateEditorState",
                    },
                },
            },
            styling: {
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
