import React, { FC } from "react";
import { DoneInvokeEvent, Interpreter } from "xstate";
import { EditorContext, EditorStateData } from "./state/editor/machine";

type ToolbarProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    machineRef: Interpreter<EditorContext, any, DoneInvokeEvent<EditorStateData>>;
};

export const Toolbar: FC<ToolbarProps> = ({}) => {
    return <>Toolbar</>;
};
