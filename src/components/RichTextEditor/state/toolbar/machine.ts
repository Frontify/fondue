/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Editor, Text, Transforms } from "slate";
import { createMachine, DoneInvokeEvent } from "xstate";
import { BlockElement, FormattedText } from "../../RichTextEditor";

export type ToolbarContext = {
    selectedText: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ToolbarStateData = {
    type: FormattedText | BlockElement;
    editor: Editor;
};

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
                BLOCK_TYPE_SELECTED: {
                    actions: (_, { data }) => {
                        const { editor, type } = data;
                        Transforms.setNodes(editor, { type }, { match: (n) => Editor.isBlock(editor, n) });
                    },
                },
                INLINE_STYLE_SELECTED: {
                    actions: (_, { data }) => {
                        const { editor, type } = data;
                        Transforms.setNodes(editor, { [type]: true }, { match: (n) => Text.isText(n), split: true });
                    },
                },
                LINK_CHOOSER_SELECTED: States.LinkChooser,
            },
        },
        [States.LinkChooser]: {
            entry: () => console.log("entering link chooser"),
        },
    },
});
