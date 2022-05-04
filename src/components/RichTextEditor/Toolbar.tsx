/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconLink,
    IconListBullets,
    IconListChecklist,
    IconListNumbers,
    IconSize,
    IconSnippet,
    IconTextAlignCenter,
    IconTextAlignJustify,
    IconTextAlignLeft,
    IconTextAlignRight,
    IconTextFormatBold,
    IconTextFormatItalic,
    IconTextFormatStrikethrough,
    IconTextFormatUnderline,
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

const classNames = {
    root: "tw-text-black-80 tw-ml-0.5 hover:tw-bg-base-alt hover:!tw-text-violet-70",
    active: "tw-bg-base-alt tw-rounded !tw-text-violet-70",
};
const styles = { root: { width: "32px", height: "32px" } };

const toolbarComponents = (
    editor: PlateEditor,
    editorId?: string,
    textStyles?: TextStyleType[],
): Record<EditorActions, ReactElement> => {
    return {
        [EditorActions.TEXT_STYLES]: <TextStyleDropdown editorId={editorId} textStyles={textStyles} />,
        [EditorActions.ALIGN_LEFT]: (
            <AlignToolbarButton
                value="left"
                icon={<IconTextAlignLeft size={IconSize.Size24} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.ALIGN_CENTER]: (
            <AlignToolbarButton
                value="center"
                icon={<IconTextAlignCenter size={IconSize.Size24} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.ALIGN_RIGHT]: (
            <AlignToolbarButton
                value="right"
                icon={<IconTextAlignRight size={IconSize.Size24} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.ALIGN_JUSTIFY]: (
            <AlignToolbarButton
                value="justify"
                icon={<IconTextAlignJustify size={IconSize.Size24} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.BOLD]: (
            <MarkToolbarButton
                type={getPluginType(editor, MARK_BOLD)}
                icon={<IconTextFormatBold size={IconSize.Size24} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.ITALIC]: (
            <MarkToolbarButton
                type={getPluginType(editor, MARK_ITALIC)}
                icon={<IconTextFormatItalic size={IconSize.Size24} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.UNDERLINE]: (
            <MarkToolbarButton
                type={getPluginType(editor, MARK_UNDERLINE)}
                icon={<IconTextFormatUnderline size={IconSize.Size24} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.STRIKETHROUGH]: (
            <MarkToolbarButton
                type={getPluginType(editor, MARK_STRIKETHROUGH)}
                icon={<IconTextFormatStrikethrough size={IconSize.Size24} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.CODE]: (
            <MarkToolbarButton
                type={getPluginType(editor, MARK_CODE)}
                icon={<IconSnippet size={IconSize.Size24} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.CHECK_ITEM]: (
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_CHECK_ITEM)}
                icon={<IconListChecklist size={IconSize.Size24} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.LINK]: (
            <LinkToolbarButton icon={<IconLink size={IconSize.Size24} />} classNames={classNames} styles={styles} />
        ),
        [EditorActions.ORDERED_LIST]: (
            <ListToolbarButton
                type={getPluginType(editor, ELEMENT_OL)}
                icon={<IconListNumbers size={IconSize.Size24} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.UNORDERED_LIST]: (
            <ListToolbarButton
                type={getPluginType(editor, ELEMENT_UL)}
                icon={<IconListBullets size={IconSize.Size24} />}
                classNames={classNames}
                styles={styles}
            />
        ),
    };
};

export const Toolbar: FC<ToolbarProps> = ({ editorId, textStyles, actions = [] }) => {
    const editor = usePlateEditorRef(editorId);
    const toolbarActions = actions.length > 0 ? actions : defaultActions;

    return (
        <BalloonToolbar
            popperOptions={{
                modifiers: [
                    { name: "offset", options: { offset: [0, 12] } },
                    { name: "flip", options: { fallbackPlacements: ["bottom", "right"] } },
                ],
            }}
            styles={{ root: { border: "none", background: "#ffffff", margin: "8px" } }}
        >
            <div
                data-test-id="toolbar"
                className="tw-flex tw-flex-wrap tw-content-start tw-shadow-lg tw-border tw-bg-base tw-rounded tw-border-black-10 tw-min-h-12"
            >
                {toolbarActions.map((actions, index) => (
                    <div
                        key={index}
                        data-test-id={`toolbar-group-${index}`}
                        className="tw-flex tw-items-center tw-border-l tw-border-b last:tw-border-b-0 tw-px-3 tw-py-2 tw-border-black-10 tw-h-12"
                    >
                        {actions.map((action, index) => (
                            <React.Fragment key={index}>
                                {toolbarComponents(editor, editorId, textStyles)[action]}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </BalloonToolbar>
    );
};
