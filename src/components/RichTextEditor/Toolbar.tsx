/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconBold,
    IconItalic,
    IconLink,
    IconListBullets,
    IconListNumbers,
    IconSnippet,
    IconStrikethrough,
    IconTextAlignCenter,
    IconTextAlignJustify,
    IconTextAlignLeft,
    IconTextAlignRight,
    IconUnderline,
} from "@foundation/Icon";
import {
    AlignToolbarButton,
    getPluginType,
    LinkToolbarButton,
    MarkToolbarButton,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    toggleIndentList,
    ToolbarButton,
    usePlateEditorRef,
} from "@udecode/plate";
import React, { FC } from "react";

export const Toolbar: FC = () => {
    const editor = usePlateEditorRef();

    const ButtonGroup: FC<React.ReactNode> = ({ children }) => (
        <div className="tw-flex tw-items-center tw-border-r tw-px-3 tw-py-2 tw-border-black-5">{children}</div>
    );

    return (
        <div
            data-test-id="toolbar"
            className="tw-flex tw-p-0.5 tw-items-center tw-bg-white tw-rounded tw-shadow-mid tw-gap-0.5"
        >
            <ButtonGroup>
                <AlignToolbarButton value="left" icon={<IconTextAlignLeft />} />
                <AlignToolbarButton value="center" icon={<IconTextAlignCenter />} />
                <AlignToolbarButton value="right" icon={<IconTextAlignRight />} />
                <AlignToolbarButton value="justify" icon={<IconTextAlignJustify />} />
            </ButtonGroup>

            <ButtonGroup>
                <MarkToolbarButton type={getPluginType(editor, MARK_BOLD)} icon={<IconBold />} />
                <MarkToolbarButton type={getPluginType(editor, MARK_ITALIC)} icon={<IconItalic />} />
                <MarkToolbarButton type={getPluginType(editor, MARK_UNDERLINE)} icon={<IconUnderline />} />
                <MarkToolbarButton type={getPluginType(editor, MARK_STRIKETHROUGH)} icon={<IconStrikethrough />} />
                <MarkToolbarButton type={getPluginType(editor, MARK_CODE)} icon={<IconSnippet />} />
            </ButtonGroup>

            <ButtonGroup>
                <LinkToolbarButton icon={<IconLink />} />
                <ToolbarButton
                    onMouseDown={(e) => {
                        e.preventDefault();
                        toggleIndentList(editor, {
                            listStyleType: "disc",
                        });
                    }}
                    icon={<IconListBullets />}
                />
                <ToolbarButton
                    onMouseDown={(e) => {
                        e.preventDefault();
                        toggleIndentList(editor, {
                            listStyleType: "decimal",
                        });
                    }}
                    icon={<IconListNumbers />}
                />
            </ButtonGroup>
        </div>
    );
};
