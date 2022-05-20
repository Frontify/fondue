import { ToolbarButton, ToolbarButtonProps, unwrapNodes } from "@udecode/plate";
import React from "react";
import { ELEMENT_LINK_CHOOSER } from "../types";

export const RemoveLinkChooserButton = ({ editor, icon }: ToolbarButtonProps) => {
    return (
        <div
            onMouseDown={() => {
                if (!editor.selection) {
                    return;
                }
                unwrapNodes(editor, {
                    at: editor.selection,
                    match: { type: ELEMENT_LINK_CHOOSER },
                });
            }}
        >
            <ToolbarButton icon={icon} />
        </div>
    );
};
