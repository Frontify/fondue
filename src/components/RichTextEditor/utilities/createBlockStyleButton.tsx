import React, { FC, MouseEvent, ReactElement, ReactNode } from "react";
import { RichUtils } from "draft-js";
import { InlineToolbarChildrenProps } from "../components/InlineToolbar";
import { merge } from "@utilities/merge";

interface CreateBlockStyleButtonProps {
    blockType: string;
    children: ReactNode;
}

export default function createBlockStyleButton({
    blockType,
    children,
}: CreateBlockStyleButtonProps): FC<InlineToolbarChildrenProps> {
    return function BlockStyleButton(props: InlineToolbarChildrenProps): ReactElement<InlineToolbarChildrenProps> {
        const { setEditorState, editorState, onClick } = props;

        const toggleStyle = (event: MouseEvent): void => {
            event.preventDefault();
            setEditorState(RichUtils.toggleBlockType(editorState, blockType));
            onClick();
        };

        const preventBubblingUp = (event: MouseEvent): void => {
            event.preventDefault();
        };

        const blockTypeIsActive = (): boolean => {
            if (!editorState) {
                return false;
            }

            const type = editorState
                .getCurrentContent()
                .getBlockForKey(editorState.getSelection().getStartKey())
                .getType();
            return type === blockType;
        };

        return (
            <button
                className={merge([
                    "tw-flex tw-w-6 tw-h-6 tw-items-center tw-justify-center tw-border-0 tw-bg-white tw-rounded tw-text-black-95 tw-cursor-pointer",
                    blockTypeIsActive() && "tw-bg-black-10",
                ])}
                onClick={toggleStyle}
                onMouseDown={preventBubblingUp}
            >
                {children}
            </button>
        );
    };
}
