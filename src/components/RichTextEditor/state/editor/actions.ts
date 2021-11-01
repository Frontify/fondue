/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DoneInvokeEvent } from "xstate";
import { EditorContext, EditorEventDataTypes } from "./machine";

export const callOnSave = ({ onSave }: EditorContext, { data }: DoneInvokeEvent<EditorEventDataTypes>): void => {
    if (onSave && data.value) {
        onSave(JSON.stringify(data.value));
    }
};
