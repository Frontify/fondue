import { assign } from "@xstate/immer";
import { convertToRaw } from "draft-js";
import { DoneInvokeEvent } from "xstate";
import { EditorContext, EditorEventDataTypes } from "./machine";
import { hasEditorState } from "./typeguards";

export const updateEditorState = assign<EditorContext, DoneInvokeEvent<EditorEventDataTypes>>((context, { data }) => {
    if (hasEditorState(data)) {
        context.editorState = data.editorState;
        context.onContentChanged && context.onContentChanged(convertToRaw(context.editorState.getCurrentContent()));
    }
});
