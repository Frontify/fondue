/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EMPTY_VALUE } from "@components/RichTextEditor/utils/editor/parseRawContent";
import { DoneInvokeEvent } from "xstate";
import { EditorContext, EditorEventDataTypes } from "./machine";

export const resetText = ({ onTextChange }: EditorContext): void => {
    if (onTextChange) {
        onTextChange(JSON.stringify(EMPTY_VALUE));
    }
};

export const callOnTextChange = (
    { onTextChange }: EditorContext,
    { data }: DoneInvokeEvent<EditorEventDataTypes>,
): void => {
    if (onTextChange && data.value) {
        onTextChange(JSON.stringify(data.value));
    }
};

export const callOnBlur = ({ onBlur }: EditorContext, { data }: DoneInvokeEvent<EditorEventDataTypes>): void => {
    if (onBlur && data.value) {
        onBlur(JSON.stringify(data.value));
    }
};

export const setLocked = (context: EditorContext, { data }: DoneInvokeEvent<EditorEventDataTypes>): void => {
    context.locked = data.locked ?? context.locked;
};
