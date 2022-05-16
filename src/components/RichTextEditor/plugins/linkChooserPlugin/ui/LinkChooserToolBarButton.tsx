import { someNode, useEventPlateId, usePlateEditorState, withPlateEventProvider } from "@udecode/plate-core";
import { ToolbarButton, ToolbarButtonProps } from "@udecode/plate-ui-toolbar";
import React from "react";
import { getAndUpsertLink } from "../transforms/getAndUpsertLink";
import { LinkPlugin } from "../types";

export interface LinkToolbarButtonProps extends ToolbarButtonProps {
    getChosenLink?: LinkPlugin["getChosenLink"];
}

export const LinkChooserToolBarButton = withPlateEventProvider(
    ({ id, getChosenLink, type, ...props }: LinkToolbarButtonProps) => {
        id = useEventPlateId(id);
        const editor = usePlateEditorState(id)!;

        const isLink = !!editor?.selection && someNode(editor, { match: { type } });

        return (
            <ToolbarButton
                active={isLink}
                onMouseDown={async (event) => {
                    if (!editor) {
                        return;
                    }

                    event.preventDefault();
                    if (getChosenLink) {
                        getAndUpsertLink(editor, getChosenLink);
                    }
                }}
                {...props}
            />
        );
    },
);
