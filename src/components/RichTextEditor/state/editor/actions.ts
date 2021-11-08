/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DoneInvokeEvent } from "xstate";
import { EditorContext, EditorEventDataTypes } from "./machine";

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
