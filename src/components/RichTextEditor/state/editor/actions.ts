import { assign } from "@xstate/immer";
import { DoneInvokeEvent } from "xstate";
import { EditorContext, EditorEventDataTypes, EditorStateData } from "./machine";

const hasEditorState = (data: EditorEventDataTypes): data is EditorStateData =>
    data && (data as EditorStateData).editorState !== undefined;

export const updateEditorState = assign<EditorContext, DoneInvokeEvent<EditorEventDataTypes>>((context, { data }) => {
    if (hasEditorState(data)) {
        context.editorState = data.editorState;
    }
});
