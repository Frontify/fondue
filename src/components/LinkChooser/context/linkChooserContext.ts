/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from "react";
import { Interpreter } from "xstate";
import { LinkChooserContext as LinkChooserFSMContext } from "../state/link-chooser/machine";

type LinkChooserContextValue = {
    linkChooserMachineRef: Interpreter<LinkChooserFSMContext> | null;
};

export const LinkChooserContext = createContext<LinkChooserContextValue>({
    linkChooserMachineRef: null,
});
