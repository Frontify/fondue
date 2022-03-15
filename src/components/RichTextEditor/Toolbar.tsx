/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconBold,
    IconItalic,
    IconLink,
    IconListBullets,
    IconListChecklist,
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
    BalloonToolbar,
    ELEMENT_OL,
    ELEMENT_UL,
    getPluginType,
    LinkToolbarButton,
    ListToolbarButton,
    MarkToolbarButton,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    usePlateEditorRef,
} from "@udecode/plate";
import React, { FC } from "react";
import { ELEMENT_CHECK_LIST } from "./plugins/checkboxListPlugin";
import { TextStyleDropdown } from "./TextStyleDropdown/TextStyleDropdown";
import { TextStyleType } from "./utils/getTextStyles";

type ToolbarProps = {
    editorId?: string;
    textStyles?: TextStyleType[];
};

type ButtonGroupProps = {
    testId?: string;
    children: JSX.Element | JSX.Element[];
};

export const Toolbar: FC<ToolbarProps> = ({ editorId, textStyles }) => {
    const editor = usePlateEditorRef(editorId);

    const ButtonGroup: FC<ButtonGroupProps> = ({ testId, children }) => (
        <div
            data-test-id={testId}
            className="tw-flex tw-items-center tw-border-r last:tw-border-r-0 tw-px-3 tw-py-2 tw-border-black-5"
        >
            {children}
        </div>
    );

    return (
        <BalloonToolbar
            theme={"light"}
            popperOptions={{
                modifiers: [
                    { name: "offset", options: { offset: [0, 12] } },
                    { name: "flip", options: { fallbackPlacements: ["bottom", "right"] } },
                ],
            }}
            styles={{ root: { border: "none", background: "#ffffff" } }}
        >
            <div
                data-test-id="toolbar"
                className="tw-flex tw-p-0.5 tw-items-center tw-bg-white tw-rounded tw-shadow-mid tw-gap-0.5"
            >
                <ButtonGroup testId="text-style-buttons">
                    <TextStyleDropdown editorId={editorId} textStyles={textStyles} />
                </ButtonGroup>
                <ButtonGroup testId="text-alignment-buttons">
                    <AlignToolbarButton value="left" icon={<IconTextAlignLeft />} />
                    <AlignToolbarButton value="center" icon={<IconTextAlignCenter />} />
                    <AlignToolbarButton value="right" icon={<IconTextAlignRight />} />
                    <AlignToolbarButton value="justify" icon={<IconTextAlignJustify />} />
                </ButtonGroup>

                <ButtonGroup testId="text-mark-buttons">
                    <MarkToolbarButton type={getPluginType(editor, MARK_BOLD)} icon={<IconBold />} />
                    <MarkToolbarButton type={getPluginType(editor, MARK_ITALIC)} icon={<IconItalic />} />
                    <MarkToolbarButton type={getPluginType(editor, MARK_UNDERLINE)} icon={<IconUnderline />} />
                    <MarkToolbarButton type={getPluginType(editor, MARK_STRIKETHROUGH)} icon={<IconStrikethrough />} />
                    <MarkToolbarButton type={getPluginType(editor, MARK_CODE)} icon={<IconSnippet />} />
                </ButtonGroup>

                <ButtonGroup testId="text-element-buttons">
                    <LinkToolbarButton icon={<IconLink />} />
                    <ListToolbarButton type={getPluginType(editor, ELEMENT_UL)} icon={<IconListBullets />} />
                    <ListToolbarButton type={getPluginType(editor, ELEMENT_OL)} icon={<IconListNumbers />} />
                    <ListToolbarButton type={getPluginType(editor, ELEMENT_CHECK_LIST)} icon={<IconListChecklist />} />
                </ButtonGroup>
            </div>
        </BalloonToolbar>
    );
};
