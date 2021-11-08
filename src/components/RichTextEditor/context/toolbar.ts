/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from "react";
import { DoneInvokeEvent, Interpreter } from "xstate";
import { ToolbarContext as ToolbarFSMContext, ToolbarData } from "../state/toolbar/machine";

type ToolbarContextValue = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    machineRef: Interpreter<ToolbarFSMContext, any, DoneInvokeEvent<ToolbarData>> | null;
};

export const ToolbarContext = createContext<ToolbarContextValue>({
    machineRef: null,
});
