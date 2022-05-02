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
import { ELEMENT_CHECK_ITEM } from "./plugins/checkboxListPlugin";
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

const ButtonGroup: FC<ButtonGroupProps> = ({ testId, children }) => (
    <div
        data-test-id={testId}
        className="tw-flex tw-items-center tw-border-l tw-w-flex tw-px-3 tw-py-2 tw-border-black-5 tw-h-12 tw-border-b"
    >
        {children}
    </div>
);

const classNames = {
    root: "overwrite-hover-color tw-text-black-80 tw-ml-0.5 hover:tw-bg-base-alt",
    active: "overwrite-color tw-bg-base-alt tw-rounded",
};
const styles = { root: { width: "32px", height: "32px" }, active: {} }; //: { background: "#6449C4", text:"#6449C4", color:"#6449C4 !important" }};
const css = `
    .overwrite-color {
        color: #6449C4 !important;
} 
    .overwrite-hover-color:hover {
        color: #6449C4 !important;
}`;

export const Toolbar: FC<ToolbarProps> = ({ editorId, textStyles }) => {
    const editor = usePlateEditorRef(editorId);

    return (
        <BalloonToolbar
            theme="light"
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
                className="tw-flex tw-flex-wrap tw-items-center tw-bg-base tw-rounded tw-shadow-mid tw-gap-0.5"
            >
                <ButtonGroup testId="text-style-buttons">
                    <TextStyleDropdown editorId={editorId} textStyles={textStyles} />
                </ButtonGroup>

                <ButtonGroup testId="text-mark-buttons">
                    <MarkToolbarButton
                        type={getPluginType(editor, MARK_BOLD)}
                        icon={<IconBold />}
                        classNames={classNames}
                        styles={styles}
                    />
                    <MarkToolbarButton
                        type={getPluginType(editor, MARK_ITALIC)}
                        icon={<IconItalic />}
                        classNames={classNames}
                        styles={styles}
                    />
                    <MarkToolbarButton
                        type={getPluginType(editor, MARK_UNDERLINE)}
                        icon={<IconUnderline />}
                        classNames={classNames}
                        styles={styles}
                    />
                    <MarkToolbarButton
                        type={getPluginType(editor, MARK_STRIKETHROUGH)}
                        icon={<IconStrikethrough />}
                        classNames={classNames}
                        styles={styles}
                    />
                    <LinkToolbarButton icon={<IconLink />} classNames={classNames} styles={styles} />
                    <MarkToolbarButton
                        type={getPluginType(editor, MARK_CODE)}
                        icon={<IconSnippet />}
                        classNames={classNames}
                        styles={styles}
                    />
                </ButtonGroup>

                <ButtonGroup testId="text-alignment-and-lists-buttons">
                    <AlignToolbarButton
                        value="left"
                        icon={<IconTextAlignLeft />}
                        classNames={classNames}
                        styles={styles}
                    />
                    <AlignToolbarButton
                        value="center"
                        icon={<IconTextAlignCenter />}
                        classNames={classNames}
                        styles={styles}
                    />
                    <AlignToolbarButton
                        value="right"
                        icon={<IconTextAlignRight />}
                        classNames={classNames}
                        styles={styles}
                    />
                    <AlignToolbarButton
                        value="justify"
                        icon={<IconTextAlignJustify />}
                        classNames={classNames}
                        styles={styles}
                    />
                    <ListToolbarButton
                        type={getPluginType(editor, ELEMENT_UL)}
                        icon={<IconListBullets />}
                        classNames={classNames}
                        styles={styles}
                    />
                    <BlockToolbarButton
                        type={getPluginType(editor, ELEMENT_CHECK_ITEM)}
                        icon={<IconListChecklist />}
                        classNames={classNames}
                        styles={styles}
                    />
                    <ListToolbarButton
                        type={getPluginType(editor, ELEMENT_OL)}
                        icon={<IconListNumbers />}
                        classNames={classNames}
                        styles={styles}
                    />
                </ButtonGroup>
            </div>
            {/* this overwrites default color value */}
            <style>{css}</style>
        </BalloonToolbar>
    );
};
