/* (c) Copyright Frontify Ltd., all rights reserved. */

import { assign } from "@xstate/immer";
import { convertToRaw, EditorState, SelectionState } from "draft-js";
import { DoneInvokeEvent } from "xstate";
import { EditorContext, EditorEventDataTypes } from "./machine";
import { hasEditorState } from "./typeguards";

export const updateEditorState = assign<EditorContext, DoneInvokeEvent<EditorEventDataTypes>>((context, { data }) => {
    if (hasEditorState(data)) {
        context.editorState = data.editorState;
        context.onContentChanged && context.onContentChanged(convertToRaw(context.editorState.getCurrentContent()));
    }
});

export const resetSelection = assign<EditorContext, DoneInvokeEvent<EditorEventDataTypes>>((context, { data }) => {
    context.editorState = EditorState.forceSelection(data.editorState, new SelectionState());
});
