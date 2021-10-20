/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from "react";
import { DoneInvokeEvent, Interpreter } from "xstate";
import { ToolbarContext as ToolbarFSMContext, ToolbarStateData } from "../state/toolbar/machine";

type ToolbarContextValue = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    machineRef: Interpreter<ToolbarFSMContext, any, DoneInvokeEvent<ToolbarStateData>> | null;
};

export const ToolbarContext = createContext<ToolbarContextValue>({
    machineRef: null,
});
