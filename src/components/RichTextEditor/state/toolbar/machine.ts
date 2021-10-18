import { createMachine } from "xstate";

export const toolbarMachine = createMachine({
    id: "toolbar",
    states: {
        overview: {},
        link_chooser: {},
    },
});
