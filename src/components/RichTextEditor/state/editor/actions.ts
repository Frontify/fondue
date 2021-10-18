import { assign } from "@xstate/immer";
import { DoneInvokeEvent } from "xstate";
import { EditorContext, EditorEventDataTypes } from "./machine";
import { hasEditorState } from "./typeguards";

export const updateEditorState = assign<EditorContext, DoneInvokeEvent<EditorEventDataTypes>>((context, { data }) => {
    if (hasEditorState(data)) {
        context.editorState = data.editorState;
    }
});
