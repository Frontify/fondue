import { CheckboxState } from "@components/Checkbox/Checkbox";
import { createMachine } from "xstate";

export enum State {
    Default = "default",
    Guidelines = "guidelines",
    Projects = "projects",
    Templates = "templates",
}

export type DropdownContext = {
    selectMenuBlocks: any;
    templateMenuBlocks: any;
    selectedMenuBlock: any;
    newTab: CheckboxState;
    onOpenInNewTabChange: any;
};

export const dropdownMachine = createMachine<DropdownContext, any>({
    id: "link-chooser",
    initial: State.Default,
    states: {
        [State.Default]: {
            on: {
                GO_TO_GUIDELINES: {
                    target: State.Guidelines,
                },
                GO_TO_PROJECTS: {
                    target: State.Projects,
                },
                GO_TO_TEMPLATES: {
                    target: State.Templates,
                },
            },
        },
        [State.Guidelines]: {
            on: {
                GO_TO_DEFAULT: {
                    target: State.Default,
                },
            },
        },
        [State.Projects]: {
            on: {
                GO_TO_DEFAULT: {
                    target: State.Default,
                },
            },
        },
        [State.Templates]: {
            on: {
                GO_TO_DEFAULT: {
                    target: State.Default,
                },
            },
        },
    },
});
