import { EditorState } from "draft-js";
import { createMachine, DoneInvokeEvent, sendParent } from "xstate";

export type ToolbarContext = {
    editorState: EditorState;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ToolbarStateData = {};

export enum States {
    Initial = "initial",
    LinkChooser = "link_chooser",
}

export const toolbarMachine = createMachine<ToolbarContext, DoneInvokeEvent<ToolbarStateData>>({
    id: "toolbar",
    initial: States.Initial,
    states: {
        [States.Initial]: {
            on: {
                STYLE_SELECTED: {
                    actions: sendParent("CHANGED"),
                },
                SELECT_LINK_CHOOSER: States.LinkChooser,
            },
        },
        [States.LinkChooser]: {
            entry: () => console.log("entering link chooser"),
        },
    },
});
