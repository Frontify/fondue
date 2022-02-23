/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconBold,
    IconCallout,
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
    BlockToolbarButton,
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
import { ELEMENT_CUSTOM1 } from "./editor-config";

type ButtonGroupProps = {
    testId?: string;
    children: JSX.Element | JSX.Element[];
};

export const Toolbar: FC = () => {
    const editor = usePlateEditorRef();

    const ButtonGroup: FC<ButtonGroupProps> = ({ testId, children }) => (
        <div data-test-id={testId} className="tw-flex tw-items-center tw-border-r tw-px-3 tw-py-2 tw-border-black-5">
            {children}
        </div>
    );

    return (
        <div
            data-test-id="toolbar"
            className="tw-flex tw-p-0.5 tw-items-center tw-bg-white tw-rounded tw-shadow-mid tw-gap-0.5"
        >
            <ButtonGroup testId="text-style-buttons">
                <BlockToolbarButton type={getPluginType(editor, ELEMENT_CUSTOM1)} icon={<IconCallout />} />
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
            </ButtonGroup>
        </div>
    );
};
