/* (c) Copyright Frontify Ltd., all rights reserved. */

import { assign } from "@xstate/immer";
import { DoneInvokeEvent } from "xstate";
import { EditorContext, EditorEventDataTypes } from "./machine";

export const updateLastSelectedText = assign<EditorContext, DoneInvokeEvent<EditorEventDataTypes>>(
    (context, { data }) => {
        context.lastSelectedText = data.selectedText;
    },
);
