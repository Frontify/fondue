import { createMachine, DoneInvokeEvent } from "xstate";

// eslint-disable-next-line @typescript-eslint/ban-types
export type ToolbarContext = {};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ToolbarStateData = {};

export enum States {
    Overview = "overview",
    LinkChooser = "link_chooser",
}

export const toolbarMachine = createMachine<ToolbarContext, DoneInvokeEvent<ToolbarStateData>>({
    id: "toolbar",
    initial: States.Overview,
    states: {
        [States.Overview]: {
            on: {
                SELECT_LINK_CHOOSER: States.LinkChooser,
            },
        },
        [States.LinkChooser]: {
            entry: () => console.log("entering link chooser"),
        },
    },
});
