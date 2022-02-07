/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Editor } from "slate";
import { createMachine, DoneInvokeEvent } from "xstate";
import { TextAlignTypes } from "../../renderer/renderBlockStyles";
import { BlockElement, FormattedText } from "../../RichTextEditor";
import { updateBlockType, updateInlineStyle } from "./actions";

export type ToolbarContext = {
    selectedText: string;
};

export type BlockTypeData = {
    active: boolean;
    type: BlockElement["type"];
    editor: Editor;
    textAlign?: TextAlignTypes;
};

export type InlineStyleData = {
    style: Omit<keyof FormattedText, "text">;
    value: boolean;
    editor: Editor;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ToolbarData = InlineStyleData | BlockTypeData;

export enum States {
    Initial = "initial",
}

export const toolbarMachine = createMachine<ToolbarContext, DoneInvokeEvent<ToolbarData>>(
    {
        id: "toolbar",
        initial: States.Initial,
        states: {
            [States.Initial]: {
                on: {
                    BLOCK_TYPE_SELECTED: {
                        actions: "updateBlockType",
                    },
                    INLINE_STYLE_SELECTED: {
                        actions: "updateInlineStyle",
                    },
                },
            },
        },
    },
    {
        actions: { updateBlockType, updateInlineStyle },
    },
);
