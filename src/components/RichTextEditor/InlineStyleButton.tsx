/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from "@utilities/merge";
import { useActor } from "@xstate/react";
import React, { FC, useContext } from "react";
import { Editor } from "slate";
import { useSlate } from "slate-react";
import { ToolbarContext } from "./context/toolbar";

interface InlineStyleButtonProps {
    style: string;
}

export const InlineStyleButton: FC<InlineStyleButtonProps> = ({ style, children }) => {
    const { machineRef } = useContext(ToolbarContext);

    if (!machineRef) {
        return null;
    }

    const editor = useSlate();
    const [styleIsActive] = Editor.nodes(editor, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        match: (n: any) => n[style] === true,
    });

    const [, send] = useActor(machineRef);

    return (
        <button
            data-test-id={`inline-style-button-${style}`}
            className={merge([
                "tw-flex tw-w-6 tw-h-6 tw-items-center tw-justify-center tw-border-0 tw-bg-white tw-rounded tw-text-black-95 tw-cursor-pointer",
                styleIsActive && "tw-bg-black-10",
            ])}
            onClick={(event) => {
                event.preventDefault();
                send({
                    type: "INLINE_STYLE_SELECTED",
                    data: { style, editor, value: !styleIsActive },
                });
            }}
            onMouseDown={(event) => event.preventDefault()}
        >
            {children}
        </button>
    );
};
