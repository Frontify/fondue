/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Descendant, Editor } from "slate";
import { createMachine, DoneInvokeEvent } from "xstate";
import { toolbarMachine } from "../toolbar/machine";
import { callOnBlur, callOnTextChange, setLocked } from "./actions";

export type EditorContext = {
    locked: boolean;
    onTextChange?: (value: string) => void;
    onBlur?: (value: string) => void;
};

export type EditorStateData = {
    editor?: Editor;
    value?: Descendant[];
    locked?: boolean;
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
                    SET_LOCKED: {
                        actions: "setLocked",
                    },
                },
            },
            [States.Editing]: {
                on: {
                    TEXT_UPDATED: {
                        actions: "callOnTextChange",
                    },
                    TEXT_SELECTED: {
                        target: States.Styling,
                        cond: "hasTextSelection",
                    },
                    BLUR: {
                        target: States.Readonly,
                        actions: "callOnBlur",
                    },
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
                            cond: "hasTextSelection",
                        },
                        States.Editing,
                    ],
                    TEXT_DESELECTED: States.Editing,
                    BLUR: {
                        target: States.Readonly,
                        actions: "callOnBlur",
                    },
                },
            },
        },
    },
    {
        guards: {
            canEdit: ({ locked }) => !locked,
            hasTextSelection: (_, { data }) => {
                const { editor } = data;
                return editor?.selection ? Editor.string(editor, editor.selection).trim().length > 0 : false;
            },
        },
        actions: {
            callOnTextChange,
            callOnBlur,
            setLocked,
        },
    },
);
