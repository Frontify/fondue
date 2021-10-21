/* (c) Copyright Frontify Ltd., all rights reserved. */

import { debounce } from "@utilities/debounce";
import { assign } from "@xstate/immer";
import { convertToRaw, EditorState, SelectionState } from "draft-js";
import { DoneInvokeEvent } from "xstate";
import { EditorContext, EditorEventDataTypes } from "./machine";
import { hasEditorState } from "./typeguards";

const NOTIFICATION_DEBOUNCE_IN_MS = 250;

export const updateEditorState = assign<EditorContext, DoneInvokeEvent<EditorEventDataTypes>>((context, { data }) => {
    if (hasEditorState(data)) {
        context.editorState = data.editorState;
    }
});

export const notifyContentChanged = debounce(
    (context, { data }) =>
        context.onContentChanged && context.onContentChanged(convertToRaw(data.editorState.getCurrentContent())),
    NOTIFICATION_DEBOUNCE_IN_MS,
);

export const resetSelection = assign<EditorContext, DoneInvokeEvent<EditorEventDataTypes>>((context, { data }) => {
    context.editorState = EditorState.forceSelection(data.editorState, new SelectionState());
});
