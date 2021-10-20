/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from "@utilities/merge";
import { useActor } from "@xstate/react";
import { RichUtils } from "draft-js";
import React, { FC, useCallback, useContext } from "react";
import { ToolbarContext } from "./context/toolbar";

interface BlockStyleButtonProps {
    blockType: string;
}

export const BlockStyleButton: FC<BlockStyleButtonProps> = ({ blockType, children }) => {
    const { machineRef } = useContext(ToolbarContext);

    if (!machineRef) {
        return null;
    }

    const [{ context }, send] = useActor(machineRef);
    const { editorState } = context;

    const blockTypeIsActive = useCallback((): boolean => {
        if (!editorState) {
            return false;
        }

        const type = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType();
        return type === blockType;
    }, [editorState, blockType]);

    return (
        <button
            className={merge([
                "tw-flex tw-w-6 tw-h-6 tw-items-center tw-justify-center tw-border-0 tw-bg-white tw-rounded tw-text-black-95 tw-cursor-pointer",
                blockTypeIsActive() && "tw-bg-black-10",
            ])}
            onClick={(event) => {
                event.preventDefault();
                send({
                    type: "STYLE_SELECTED",
                    data: { editorState: RichUtils.toggleBlockType(editorState, blockType) },
                });
            }}
            onMouseDown={(event) => event.preventDefault()}
        >
            {children}
        </button>
    );
};
