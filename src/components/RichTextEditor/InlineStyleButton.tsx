/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from "@utilities/merge";
import { useActor } from "@xstate/react";
import { RichUtils } from "draft-js";
import React, { FC, useCallback, useContext } from "react";
import { ToolbarContext } from "./context/toolbar";

interface InlineStyleButtonProps {
    style: string;
}

export const InlineStyleButton: FC<InlineStyleButtonProps> = ({ style, children }) => {
    const { machineRef } = useContext(ToolbarContext);

    if (!machineRef) {
        return null;
    }

    const [{ context }, send] = useActor(machineRef);
    const { editorState } = context;
    const styleIsActive = useCallback(
        (): boolean => editorState && editorState.getCurrentInlineStyle().has(style),
        [editorState],
    );

    return (
        <button
            data-test-id={`inline-style-button-${style}`}
            className={merge([
                "tw-flex tw-w-6 tw-h-6 tw-items-center tw-justify-center tw-border-0 tw-bg-white tw-rounded tw-text-black-95 tw-cursor-pointer",
                styleIsActive() && "tw-bg-black-10",
            ])}
            onClick={(event) => {
                event.preventDefault();
                send({
                    type: "STYLE_SELECTED",
                    data: { editorState: RichUtils.toggleInlineStyle(editorState, style) },
                });
            }}
            onMouseDown={(event) => event.preventDefault()}
        >
            {children}
        </button>
    );
};
