/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from "@components/Checkbox/Checkbox";
import { createMachine } from "xstate";
import { dropdownMachine } from "../dropdown/machine";

export enum LinkChooserState {
    Idle = "idle",
    Focused = "focused",
}

type LinkChooserContext = {
    selectMenuBlocks: any;
    templateMenuBlocks: any;
    selectedMenuBlock: any;
    newTab: CheckboxState;
    onOpenInNewTabChange: any;
};

export const linkChooserMachine = createMachine<LinkChooserContext, any>({
    id: "link-chooser",
    initial: LinkChooserState.Idle,
    states: {
        [LinkChooserState.Idle]: {
            on: {
                OPEN_DROPDOWN: {
                    target: LinkChooserState.Focused,
                },
            },
        },
        [LinkChooserState.Focused]: {
            invoke: {
                id: "dropdown",
                src: dropdownMachine,
                data: (context) => context,
            },
            on: {
                CLOSE_DROPDOWN: {
                    target: LinkChooserState.Idle,
                },
            },
        },
    },
});
