/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from "react";
import { Interpreter } from "xstate";
import { DropdownContext as DropdownFSMContext } from "../state/dropdown/machine";

type DropdownContextValue = {
    dropdownMachineRef: Interpreter<DropdownFSMContext> | null;
};

export const DropdownContext = createContext<DropdownContextValue>({
    dropdownMachineRef: null,
});
