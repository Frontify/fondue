import React, { FC, MouseEvent, ReactElement, ReactNode } from "react";
import { RichUtils } from "draft-js";
import { InlineToolbarChildrenProps } from "../components/InlineToolbar";
import { merge } from "@utilities/merge";

interface CreateInlineStyleButtonProp {
    style: string;
    children: ReactNode;
}

export default function createInlineStyleButton({
    style,
    children,
}: CreateInlineStyleButtonProp): FC<InlineToolbarChildrenProps> {
    return function InlineStyleButton(props: InlineToolbarChildrenProps): ReactElement<InlineToolbarChildrenProps> {
        const { setEditorState, editorState, onClick } = props;

        const toggleStyle = (event: MouseEvent): void => {
            event.preventDefault();
            setEditorState(RichUtils.toggleInlineStyle(editorState, style));
            onClick();
        };

        const preventBubblingUp = (event: MouseEvent): void => {
            event.preventDefault();
        };

        const styleIsActive = (): boolean => editorState && editorState.getCurrentInlineStyle().has(style);

        return (
            <button
                className={merge([
                    "tw-flex tw-w-6 tw-h-6 tw-items-center tw-justify-center tw-border-0 tw-bg-white tw-rounded tw-text-black-95 tw-cursor-pointer",
                    styleIsActive() && "hover:tw-bg-black-10 focus-within:tw-bg-black-10",
                ])}
                onClick={toggleStyle}
                onMouseDown={preventBubblingUp}
            >
                {children}
            </button>
        );
    };
}
