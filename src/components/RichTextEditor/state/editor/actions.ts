import { assign } from "@xstate/immer";
import { EditorState } from "draft-js";
import { DoneInvokeEvent } from "xstate";
import { EditorContext, EditorEventDataTypes } from "./machine";
import { hasEditorState } from "./typeguards";

export const updateEditorState = assign<EditorContext, DoneInvokeEvent<EditorEventDataTypes>>((context, { data }) => {
    if (hasEditorState(data)) {
        const selection = data.editorState.getSelection();
        context.editorState = EditorState.forceSelection(data.editorState, selection);
    }
});
