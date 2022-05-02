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

export const Toolbar: FC<ToolbarProps> = ({ editorId, textStyles, actions = [] }) => {
    const editor = usePlateEditorRef(editorId);
    const toolbarActions = actions.length > 0 ? actions : defaultActions;
    const toolbarComponents: Record<EditorActions, ReactElement> = {
        [EditorActions.TEXT_STYLES]: <TextStyleDropdown editorId={editorId} textStyles={textStyles} />,
        [EditorActions.ALIGN_LEFT]: <AlignToolbarButton value="left" icon={<IconTextAlignLeft />} />,
        [EditorActions.ALIGN_CENTER]: <AlignToolbarButton value="center" icon={<IconTextAlignCenter />} />,
        [EditorActions.ALIGN_RIGHT]: <AlignToolbarButton value="right" icon={<IconTextAlignRight />} />,
        [EditorActions.ALIGN_JUSTIFY]: <AlignToolbarButton value="justify" icon={<IconTextAlignJustify />} />,
        [EditorActions.BOLD]: <MarkToolbarButton type={getPluginType(editor, MARK_BOLD)} icon={<IconBold />} />,
        [EditorActions.ITALIC]: <MarkToolbarButton type={getPluginType(editor, MARK_ITALIC)} icon={<IconItalic />} />,
        [EditorActions.UNDERLINE]: (
            <MarkToolbarButton type={getPluginType(editor, MARK_UNDERLINE)} icon={<IconUnderline />} />
        ),
        [EditorActions.STRIKETHROUGH]: (
            <MarkToolbarButton type={getPluginType(editor, MARK_STRIKETHROUGH)} icon={<IconStrikethrough />} />
        ),
        [EditorActions.CODE]: (
            <MarkToolbarButton type={getPluginType(editor, MARK_CODE)} icon={<IconStrikethrough />} />
        ),
        [EditorActions.CHECK_ITEM]: (
            <BlockToolbarButton type={getPluginType(editor, ELEMENT_CHECK_ITEM)} icon={<IconListChecklist />} />
        ),
        [EditorActions.LINK]: <LinkToolbarButton icon={<IconLink />} />,
        [EditorActions.ORDERED_LIST]: (
            <ListToolbarButton type={getPluginType(editor, ELEMENT_OL)} icon={<IconListNumbers />} />
        ),
        [EditorActions.UNORDERED_LIST]: (
            <ListToolbarButton type={getPluginType(editor, ELEMENT_UL)} icon={<IconListBullets />} />
        ),
    };

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
                {toolbarActions.map((actions, index) => (
                    <div
                        key={index}
                        data-test-id={`toolbar-group-${index}`}
                        className="tw-flex tw-items-center tw-border-r last:tw-border-r-0 tw-px-3 tw-py-2 tw-border-black-5"
                    >
                        {actions.map((action, index) => (
                            <React.Fragment key={index}>{toolbarComponents[action]}</React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </BalloonToolbar>
    );
};
