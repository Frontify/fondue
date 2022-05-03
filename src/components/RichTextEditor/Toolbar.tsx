/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconBold,
    IconItalic,
    IconLink,
    IconListBullets,
    IconListChecklist,
    IconListNumbers,
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
    PlateEditor,
    usePlateEditorRef,
} from "@udecode/plate";
import React, { FC, ReactElement } from "react";
import { ELEMENT_CHECK_ITEM } from "./plugins/checkboxListPlugin";
import { TextStyleDropdown } from "./TextStyleDropdown/TextStyleDropdown";
import { defaultActions, EditorActions } from "./utils/actions";
import { TextStyleType } from "./utils/getTextStyles";

type ToolbarProps = {
    editorId?: string;
    textStyles?: TextStyleType[];
    actions?: EditorActions[][];
};

const toolbarComponents = (
    editor: PlateEditor,
    editorId?: string,
    textStyles?: TextStyleType[],
): Record<EditorActions, ReactElement> => {
    const classNames = {
        root: "overwrite-hover-color tw-text-black-80 tw-ml-0.5 hover:tw-bg-base-alt",
        active: "overwrite-color tw-bg-base-alt tw-rounded",
    };
    const styles = { root: { width: "32px", height: "32px" }, active: {} }; //: { background: "#6449C4", text:"#6449C4", color:"#6449C4 !important" }};
    return {
        [EditorActions.TEXT_STYLES]: <TextStyleDropdown editorId={editorId} textStyles={textStyles} />,
        [EditorActions.ALIGN_LEFT]: (
            <AlignToolbarButton value="left" icon={<IconTextAlignLeft />} classNames={classNames} styles={styles} />
        ),
        [EditorActions.ALIGN_CENTER]: (
            <AlignToolbarButton value="center" icon={<IconTextAlignCenter />} classNames={classNames} styles={styles} />
        ),
        [EditorActions.ALIGN_RIGHT]: (
            <AlignToolbarButton value="right" icon={<IconTextAlignRight />} classNames={classNames} styles={styles} />
        ),
        [EditorActions.ALIGN_JUSTIFY]: (
            <AlignToolbarButton
                value="justify"
                icon={<IconTextAlignJustify />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.BOLD]: (
            <MarkToolbarButton
                type={getPluginType(editor, MARK_BOLD)}
                icon={<IconBold />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.ITALIC]: (
            <MarkToolbarButton
                type={getPluginType(editor, MARK_ITALIC)}
                icon={<IconItalic />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.UNDERLINE]: (
            <MarkToolbarButton
                type={getPluginType(editor, MARK_UNDERLINE)}
                icon={<IconUnderline />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.STRIKETHROUGH]: (
            <MarkToolbarButton
                type={getPluginType(editor, MARK_STRIKETHROUGH)}
                icon={<IconStrikethrough />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.CODE]: (
            <MarkToolbarButton
                type={getPluginType(editor, MARK_CODE)}
                icon={<IconStrikethrough />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.CHECK_ITEM]: (
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_CHECK_ITEM)}
                icon={<IconListChecklist />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.LINK]: <LinkToolbarButton icon={<IconLink />} />,
        [EditorActions.ORDERED_LIST]: (
            <ListToolbarButton
                type={getPluginType(editor, ELEMENT_OL)}
                icon={<IconListNumbers />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.UNORDERED_LIST]: (
            <ListToolbarButton
                type={getPluginType(editor, ELEMENT_UL)}
                icon={<IconListBullets />}
                classNames={classNames}
                styles={styles}
            />
        ),
    };
};

const css = `
    .overwrite-color {
        color: #6449C4 !important;
}
    .overwrite-hover-color:hover {
        color: #6449C4 !important;
}`;

export const Toolbar: FC<ToolbarProps> = ({ editorId, textStyles, actions = [] }) => {
    const editor = usePlateEditorRef(editorId);
    const toolbarActions = actions.length > 0 ? actions : defaultActions;

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
                {toolbarActions.map((actions, index) => (
                    <div
                        key={index}
                        data-test-id={`toolbar-group-${index}`}
                        className="tw-flex tw-items-center tw-border-r last:tw-border-r-0 tw-px-3 tw-py-2 tw-border-black-5"
                    >
                        {actions.map((action, index) => (
                            <React.Fragment key={index}>
                                {toolbarComponents(editor, editorId, textStyles)[action]}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
            {/* this overwrites default color value */}
            <style>{css}</style>
        </BalloonToolbar>
    );
};
