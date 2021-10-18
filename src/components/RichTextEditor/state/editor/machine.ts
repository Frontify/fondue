import { EditorState } from "draft-js";
import { createMachine, DoneInvokeEvent } from "xstate";
import { toolbarMachine } from "../toolbar/machine";
import { updateEditorState } from "./actions";
import { hasEditorState } from "./typeguards";

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
                    CHANGED: [
                        {
                            target: States.Styling,
                            cond: "hasSelection",
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
                    src: "toolbarMachine",
                },
            },
        },
    },
    {
        guards: {
            canEdit: ({ locked }) => !locked,
            hasSelection: (_, { data }) => {
                const selection = data.editorState.getSelection();
                return hasEditorState(data) && selection.getHasFocus() && !selection.isCollapsed();
            },
        },
        actions: {
            updateEditorState,
        },
        services: {
            toolbarMachine,
        },
    },
);
