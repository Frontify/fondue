import { useActor } from "@xstate/react";
import React, { FC } from "react";
import { DoneInvokeEvent, Interpreter } from "xstate";
import { ToolbarContext, ToolbarStateData } from "./state/toolbar/machine";

type ToolbarProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    machineRef: Interpreter<ToolbarContext, any, DoneInvokeEvent<ToolbarStateData>>;
};

export const Toolbar: FC<ToolbarProps> = ({ machineRef }) => {
    const [state, send] = useActor(machineRef);
    console.log(state, send);

    return <>Toolbar</>;
};
